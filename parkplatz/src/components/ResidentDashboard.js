import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResidentDashboard = ({ residenteId, numeroDept, registradoPorId }) => {
    const [visits, setVisits] = useState([]);
    const [newVisit, setNewVisit] = useState({ name: '', date: '', observaciones: '' });

    useEffect(() => {
        axios.get('/api/visits/pending')
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error fetching visits:', error));
    }, []);

    const handleAccept = (visitId) => {
        axios.post(`/api/visits/${visitId}/accept`)
            .then(response => setVisits(visits.map(visit => visit._id === visitId ? response.data : visit)))
            .catch(error => console.error('Error accepting visit:', error));
    };

    const handleReject = (visitId) => {
        axios.post(`/api/visits/${visitId}/reject`)
            .then(() => setVisits(visits.filter(visit => visit._id !== visitId)))
            .catch(error => console.error('Error rejecting visit:', error));
    };

    const handleScheduleVisit = () => {
        if (!residenteId || !numeroDept || !registradoPorId) {
            console.error('Residente ID, número de departamento, o ID del usuario no están definidos');
            return;
        }

        axios.post('/api/visits/schedule', {
            visitante: newVisit.name,
            residenteId,
            numeroDept,
            fecha: newVisit.date,
            registradoPorId,
            observaciones: newVisit.observaciones
        })
        .then(response => {
            setVisits([...visits, response.data]);
            setNewVisit({ name: '', date: '', observaciones: '' });
        })
        .catch(error => console.error('Error scheduling visit:', error));
    };

    return (
        <div>
            <h1>Visitas Pendientes</h1>
            <ul>
                {visits.map(visit => (
                    <li key={visit._id}>
                        {visit.visitante} - {visit.fecha}
                        <button onClick={() => handleAccept(visit._id)}>Aceptar</button>
                        <button onClick={() => handleReject(visit._id)}>Rechazar</button>
                    </li>
                ))}
            </ul>

            <h2>Agendar Nueva Visita</h2>
            <input
                type="text"
                placeholder="Nombre del visitante"
                value={newVisit.name}
                onChange={(e) => setNewVisit({ ...newVisit, name: e.target.value })}
            />
            <input
                type="datetime-local"
                placeholder="Fecha y hora de la visita"
                value={newVisit.date}
                onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
            />
            <input
                type="text"
                placeholder="Observaciones"
                value={newVisit.observaciones}
                onChange={(e) => setNewVisit({ ...newVisit, observaciones: e.target.value })}
            />
            <button onClick={handleScheduleVisit}>Agendar Visita</button>
        </div>
    );
};

export default ResidentDashboard;
