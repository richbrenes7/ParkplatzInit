import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'; 
import axios from 'axios';

const ResidentDashboard = ({ residenteId, numeroDept, registradoPorId }) => {
    const [visits, setVisits] = useState([]);
    const [newVisit, setNewVisit] = useState({ name: '', dpi: '', numCompanions: '', date: '', observaciones: '' });
    const [residentInfo, setResidentInfo] = useState(null);

    useEffect(() => {
        if (residenteId) {
            axios.get(`/api/residents/${residenteId}`)
                .then(response => {
                    setResidentInfo(response.data);
                    console.log("Resident Info:", response.data); // Debug
                })
                .catch(error => console.error('Error fetching resident info:', error));
        }

        axios.get('/api/visits/pending')
            .then(response => {
                setVisits(response.data);
                console.log("Pending Visits:", response.data); // Debug
            })
            .catch(error => console.error('Error fetching visits:', error));
    }, [residenteId]);

    const handleAccept = (visitId) => {
        axios.post(`/api/visits/${visitId}/accept`)
            .then(response => {
                setVisits(visits.map(visit => visit._id === visitId ? response.data : visit));
                console.log("Visit Accepted:", response.data); // Debug
            })
            .catch(error => console.error('Error accepting visit:', error));
    };

    const handleReject = (visitId) => {
        axios.post(`/api/visits/${visitId}/reject`)
            .then(() => {
                setVisits(visits.filter(visit => visit._id !== visitId));
                console.log("Visit Rejected:", visitId); // Debug
            })
            .catch(error => console.error('Error rejecting visit:', error));
    };

    const handleScheduleVisit = () => {
        if (!residenteId || !registradoPorId) {
            console.error('Invalid resident or registered by ID');
            return;
        }

        console.log("Scheduling visit with data:", {
            visitante: newVisit.name,
            residenteId,
            numeroDept,
            dpi: newVisit.dpi,
            numCompanions: newVisit.numCompanions,
            fecha: newVisit.date,
            registradoPorId,
            observaciones: newVisit.observaciones
        });

        axios.post('/api/visits/schedule', {
            visitante: newVisit.name,
            residenteId,
            numeroDept,
            dpi: newVisit.dpi,
            numCompanions: newVisit.numCompanions,
            fecha: newVisit.date,
            registradoPorId,
            observaciones: newVisit.observaciones
        })
        .then(response => {
            setVisits([...visits, response.data]);
            setNewVisit({ name: '', dpi: '', numCompanions: '', date: '', observaciones: '' });
            console.log("Visit Scheduled:", response.data); // Debug
        })
        .catch(error => console.error('Error scheduling visit:', error));
    };

    return (
        <div className="dashboard-container">
            {residentInfo && (
                <h1 className="dashboard-header">Bienvenido {residentInfo.nameResident}, apartamento {residentInfo.numberDept}</h1>
            )}
            <div className="dashboard-content">
                <h2 className="dashboard-header">Visitas Pendientes</h2>
                <ul className="users-list">
                    {visits.map(visit => (
                        <li key={visit._id}>
                            {visit.visitante} - {visit.fecha}
                            <button onClick={() => handleAccept(visit._id)} className="dashboard-button">Aceptar</button>
                            <button onClick={() => handleReject(visit._id)} className="dashboard-button">Rechazar</button>
                        </li>
                    ))}
                </ul>
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
