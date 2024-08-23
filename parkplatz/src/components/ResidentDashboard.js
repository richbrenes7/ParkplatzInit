import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'; 
import axiosInstance from '../api/axiosInstance';
import useAxios from '../hooks/useAxios';

const ResidentDashboard = ({ numberDept="2" }) => {
    // Asegúrate de que numberDept siempre tenga un valor
    const [assignedDept, setAssignedDept] = useState("numberDept" || "");
    const [newVisit, setNewVisit] = useState({ name: '', dpi: '', numCompanions: '', date: '', observaciones: '' });
    const [visits, setVisits] = useState([]); 

    // Hooks siempre en el mismo orden y sin condiciones
    const { data: residentData, loading: residentLoading, error: residentError } = useAxios(`/apartments/${assignedDept}`, [assignedDept]);
    const { data: visitsData, loading: visitsLoading, error: visitsError } = useAxios('/visitors', []);

    useEffect(() => {
        if (residentData && residentData.residents) {
            setAssignedDept(numberDept);
        }

        if (Array.isArray(visitsData)) {
            setVisits(visitsData);
        } else {
            setVisits([]); 
        }
    }, [residentData, visitsData, numberDept]);

    // No continuar si no hay un número de departamento válido
    if (!assignedDept) {
        return <p>Error: No se ha asignado un número de departamento.</p>;
    }

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

    if (residentLoading || visitsLoading) return <p>Cargando...</p>;
    if (residentError || visitsError) return <p>Error al cargar los datos: {residentError?.message || visitsError?.message}</p>;

    const residentInfo = residentData?.residents?.[0] || null;
    const pendingVisits = Array.isArray(visits) ? visits.filter(visit => visit.numberDept === numberDept && visit.status === 'Pendiente') : [];

    return (
        <div className="dashboard-container">
            {residentInfo ? (
                <h1 className="dashboard-header">
                    Bienvenido {residentInfo.nameResident}, Apartamento {numberDept}
                </h1>
            ) : (
                <h1 className="dashboard-header">Bienvenido, Apartamento No asignado</h1>
            )}
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
                            {pendingVisits.length > 0 ? (
                                pendingVisits.map(visit => (
                                    <tr key={visit._id}>
                                        <td className="text-center">{numberDept}</td>
                                        <td className="text-center">{visit.name}</td>
                                        <td className="text-center">{visit.dpi}</td>
                                        <td className="text-center">{visit.companions}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleDateString('es-CL')}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleTimeString('es-CL')}</td>
                                        <td className="text-center">
                                            <button className="btn btn-warning text-white shadowStyle" data-toggle="modal" data-target="#exampleModalPhoto" onClick={() => window.view.photoVisitModal(visit.image)}>Ver</button>
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
