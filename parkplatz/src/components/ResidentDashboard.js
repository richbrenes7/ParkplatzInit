// src/components/ResidentDashboard.js
import React, { useEffect, useState } from 'react';

const ResidentDashboard = () => {
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        // Llama a la API para obtener las visitas pendientes
        fetch('/api/visits/pending')
            .then(response => response.json())
            .then(data => setVisits(data))
            .catch(error => console.error('Error fetching visits:', error));
    }, []);

    const handleAccept = (visitId) => {
        // Lógica para aceptar la visita
        fetch(`/api/visits/${visitId}/accept`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado de las visitas
                setVisits(visits.map(visit => visit.id === visitId ? data : visit));
            })
            .catch(error => console.error('Error accepting visit:', error));
    };

    const handleReject = (visitId) => {
        // Lógica para rechazar la visita
        fetch(`/api/visits/${visitId}/reject`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado de las visitas
                setVisits(visits.filter(visit => visit.id !== visitId));
            })
            .catch(error => console.error('Error rejecting visit:', error));
    };

    return (
        <div>
            <h1>Visitas Pendientes</h1>
            <ul>
                {visits.map(visit => (
                    <li key={visit.id}>
                        {visit.name} - {visit.date}
                        <button onClick={() => handleAccept(visit.id)}>Aceptar</button>
                        <button onClick={() => handleReject(visit.id)}>Rechazar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResidentDashboard;
