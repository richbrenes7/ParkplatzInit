
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgentDashboard() {
    const [visits, setVisits] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    useEffect(() => {
        // Obtener todas las visitas
        axios.get('/api/agent/visits')
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error fetching visits:', error));
    }, []);

    return (
        <div>
            <h1>Agent Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>

            <h2>Visit Activity</h2>
            <ul>
                {visits.map(visit => (
                    <li key={visit._id}>
                        {visit.visitorName} - Accepted by {visit.residentName} on {visit.acceptedAt}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AgentDashboard;
