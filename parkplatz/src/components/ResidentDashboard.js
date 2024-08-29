import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import axios from 'axios';
import Modal from './Modal';

// Configura la instancia de Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api', // Ruta base del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

const ResidentDashboard = () => {
    const [assignedDept, setAssignedDept] = useState('');
    const [newVisit, setNewVisit] = useState({ name: '', dpi: '', numCompanions: '', date: '', observaciones: '' });
    const [visits, setVisits] = useState([]);
    const [residentInfo, setResidentInfo] = useState(null);
    const [modalImage, setModalImage] = useState(null); // Estado para controlar la imagen en el modal
    const navigate = useNavigate();

    // Obtener el nombre del residente desde localStorage
    const nameResident = localStorage.getItem('nameResident');

    useEffect(() => {
        const fetchResidentData = async () => {
            try {
                const response = await axiosInstance.post('/residents/loggedin', { nameResident });
        
                if (response.data && response.data.residents && response.data.residents.length > 0) {
                    setAssignedDept(response.data.numberDept);
                    setResidentInfo(response.data.residents[0]);
                } else {
                    console.error('Error: No se obtuvo ningún dato de residente o la estructura es incorrecta.');
                }
            } catch (error) {
                console.error('Error al obtener la información del residente logueado:', error);
            }
        };
        fetchResidentData();
    }, [nameResident]);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axiosInstance.get(`/visitors?numberDept=${assignedDept}`);
                if (response.data && response.data.length > 0) {
                    const filteredVisits = response.data.filter(visit => visit.numberDept === assignedDept && visit.status === 'Pendiente');
                    setVisits(filteredVisits);
                } else {
                    console.error('Error: No se obtuvieron visitas o la estructura es incorrecta.');
                }
            } catch (error) {
                console.error('Error al obtener las visitas pendientes:', error);
            }
        };

        if (assignedDept) {
            fetchVisits();
        }
    }, [assignedDept]);

    if (!nameResident) {
        return <p>Error: No se ha identificado al residente.</p>;
    }

    if (!residentInfo) return <p>Cargando...</p>;

    const handleAccept = async (visitId) => {
        try {
            const response = await axiosInstance.post(`/visitors/${visitId}/accept`, { status: 'Aceptada' });
            if (response.data) {
                setVisits(prevVisits => prevVisits.map(visit => visit._id === visitId ? { ...visit, status: 'Aceptada' } : visit));
                console.log("Visit Accepted:", response.data);
            }
        } catch (error) {
            console.error('Error al aceptar la visita:', error);
        }
    };

    const handleReject = async (visitId) => {
        try {
            const response = await axiosInstance.post(`/visitors/${visitId}/reject`, { status: 'Rechazada' });
            if (response.data) {
                setVisits(prevVisits => prevVisits.map(visit => visit._id === visitId ? { ...visit, status: 'Rechazada' } : visit));
                console.log("Visit Rejected:", response.data);
            }
        } catch (error) {
            console.error('Error al rechazar la visita:', error);
        }
    };

    const handleScheduleVisit = async () => {
        if (!newVisit.name || !newVisit.dpi || !newVisit.numCompanions || !newVisit.date) {
            console.error('Todos los campos son obligatorios.');
            return;
        }
    
        try {
            const response = await axiosInstance.post('/visitors/schedule', {
                name: newVisit.name,
                numberDept: assignedDept,
                dpi: newVisit.dpi,
                companions: newVisit.numCompanions,
                date: newVisit.date,
                status: 'Pendiente',
                observaciones: newVisit.observaciones,
            });
            setVisits([...visits, response.data]);
            setNewVisit({ name: '', dpi: '', numCompanions: '', date: '', observaciones: '' });
            console.log("Visit Scheduled:", response.data);
        } catch (error) {
            console.error('Error scheduling visit:', error);
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('nameResident');
        navigate('/login'); 
    };

    const handleViewPhoto = (image) => {
        setModalImage(image); // Abre el modal con la imagen seleccionada
    };

    const closeModal = () => {
        setModalImage(null); // Cierra el modal
    };

    return (
        <div className="dashboard-container">
            <div className="welcome-panel">
                <h1 className="dashboard-header">
                    {residentInfo ? (
                        `Bienvenido ${residentInfo.nameResident}, Apartamento ${assignedDept}`
                    ) : (
                        'Bienvenido, Apartamento No asignado'
                    )}
                </h1>
                <button className="dashboard-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="dashboard-content">
                <h2 className="dashboard-header">Visitas Pendientes</h2>
                <div className="contTable">
                    <table className="table table-bordered table-hover bg-white tableStyle">
                        <thead className="colorTable">
                            <tr>
                                <th className="text-center text-white lead">Depto a visitar</th>
                                <th className="text-center text-white lead">Nombre Visitante</th>
                                <th className="text-center text-white lead">DPI</th>
                                <th className="text-center text-white lead">N° Acompañantes</th>
                                <th className="text-center text-white lead">Fecha</th>
                                <th className="text-center text-white lead">Hora</th>
                                <th className="text-center text-white lead">Foto</th>
                                <th className="text-center text-white lead">Estado</th>
                                <th className="text-center text-white lead">Acciones</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {visits.length > 0 ? (
                                visits.map(visit => (
                                    <tr key={visit._id}>
                                        <td className="text-center">{visit.numberDept}</td>
                                        <td className="text-center">{visit.name}</td>
                                        <td className="text-center">{visit.dpi}</td>
                                        <td className="text-center">{visit.companions}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleDateString('es-CL')}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleTimeString('es-CL')}</td>
                                        <td className="text-center">{visit.registeredBy}</td> {/* Campo agregado para mostrar quién registró la visita */}
                                        <td className="text-center">
                                            <button className="btn btn-warning text-white shadowStyle" onClick={() => handleViewPhoto(visit.image)}>Ver</button>
                                        </td>
                                        <td className="text-center">{visit.status}</td>
                                        <td className="text-center">
                                            <button className="btn btn-success text-white shadowStyle" onClick={() => handleAccept(visit._id)}>Aceptar</button>
                                            <button className="btn btn-danger text-white shadowStyle" onClick={() => handleReject(visit._id)}>Rechazar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No hay visitas pendientes</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-content">
                <h2 className="dashboard-header">Agendar Nueva Visita</h2>
                <input
                    type="text"
                    placeholder="Nombre del visitante"
                    value={newVisit.name}
                    onChange={(e) => setNewVisit({ ...newVisit, name: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="text"
                    placeholder="DPI del visitante"
                    value={newVisit.dpi}
                    onChange={(e) => setNewVisit({ ...newVisit, dpi: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="text"
                    placeholder="Número de acompañantes"
                    value={newVisit.numCompanions}
                    onChange={(e) => setNewVisit({ ...newVisit, numCompanions: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha y hora de la visita"
                    value={newVisit.date}
                    onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="text"
                    placeholder="Observaciones"
                    value={newVisit.observaciones}
                    onChange={(e) => setNewVisit({ ...newVisit, observaciones: e.target.value })}
                    className="dashboard-input"
                />
                <button onClick={handleScheduleVisit} className="dashboard-button">Agendar Visita</button>
            </div>

            {modalImage && <Modal image={modalImage} onClose={closeModal} />} {/* Incluir el Modal */}
        </div>
    );
};

export default ResidentDashboard;
