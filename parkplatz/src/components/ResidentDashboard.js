import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import axiosInstance from '../api/axiosInstance';

const ResidentDashboard = () => {
    const [assignedDept, setAssignedDept] = useState('');
    const [newVisit, setNewVisit] = useState({ name: '', dpi: '', numCompanions: '', date: '', observaciones: '' });
    const [visits, setVisits] = useState([]);
    const [residentInfo, setResidentInfo] = useState(null);
    const navigate = useNavigate();

    // Obtener el nombre del residente desde localStorage
    const nameResident = localStorage.getItem('nameResident');

    useEffect(() => {
        const fetchResidentData = async () => {
            try {
                const response = await axiosInstance.get('/api/residents/loggedin', {
                    params: { nameResident }
                });

                if (response.data && response.data.residents && response.data.residents.length > 0) {
                    setAssignedDept(response.data.numberDept);
                    setResidentInfo(response.data.residents[0]);

                    console.log('Número de apartamento capturado:', response.data.numberDept);
                    console.log('Nombre del residente capturado:', response.data.residents[0].nameResident);
                } else {
                    console.error('Error: No se obtuvo ningún dato de residente o la estructura es incorrecta.');
                }
            } catch (error) {
                console.error('Error al obtener la información del residente logueado:', error);
            }
        };

        fetchResidentData();
    }, [nameResident]);

    if (!nameResident) {
        return <p>Error: No se ha identificado al residente.</p>;
    }

    if (!residentInfo) return <p>Cargando...</p>;

    const handleAccept = async (visitId) => {
        try {
            const response = await axiosInstance.post(`/visits/${visitId}/accept`);
            setVisits(prevVisits => prevVisits.map(visit => visit._id === visitId ? { ...visit, status: 'Aceptada' } : visit));
            console.log("Visit Accepted:", response.data);
        } catch (error) {
            console.error('Error accepting visit:', error);
        }
    };

    const handleReject = async (visitId) => {
        try {
            await axiosInstance.post(`/visits/${visitId}/reject`);
            setVisits(prevVisits => prevVisits.map(visit => visit._id === visitId ? { ...visit, status: 'Rechazada' } : visit));
            console.log("Visit Rejected:", visitId);
        } catch (error) {
            console.error('Error rejecting visit:', error);
        }
    };

    const handleScheduleVisit = async () => {
        try {
            const response = await axiosInstance.post('/visits/schedule', {
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
        if (window.view && typeof window.view.photoVisitModal === 'function') {
            window.view.photoVisitModal(image);
        } else {
            console.error("El método 'photoVisitModal' no está definido en 'window.view'.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="welcome-panel">
                {residentInfo ? (
                    <h1 className="dashboard-header">
                        Bienvenido {residentInfo.nameResident}, Apartamento {assignedDept}
                    </h1>
                ) : (
                    <h1 className="dashboard-header">Bienvenido, Apartamento No asignado</h1>
                )}
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
                                        <td className="text-center">{assignedDept}</td>
                                        <td className="text-center">{visit.name}</td>
                                        <td className="text-center">{visit.dpi}</td>
                                        <td className="text-center">{visit.companions}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleDateString('es-CL')}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleTimeString('es-CL')}</td>
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
                                    <td colSpan="9" className="text-center">No hay visitas pendientes</td>
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
        </div>
    );
};

export default ResidentDashboard;
