// src/components/AgentDashboard.js
import React, { useEffect, useState } from 'react';

const AgentDashboard = () => {
    const [residents, setResidents] = useState([]);
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        // Llama a la API para obtener los residentes
        fetch('/api/residents')
            .then(response => response.json())
            .then(data => setResidents(data))
            .catch(error => console.error('Error fetching residents:', error));

        // Llama a la API para obtener los visitantes
        fetch('/api/visitors')
            .then(response => response.json())
            .then(data => setVisitors(data))
            .catch(error => console.error('Error fetching visitors:', error));
    }, []);

    return (
        <div>
            <h1>Información de Residentes</h1>
            <ul>
                {residents.map(resident => (
                    <li key={resident.id}>{resident.name} - {resident.address}</li>
                ))}
            </ul>

            <h1>Información de Visitantes</h1>
            <ul>
                {visitors.map(visitor => (
                    <li key={visitor.id}>{visitor.name} - {visitor.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default AgentDashboard;
