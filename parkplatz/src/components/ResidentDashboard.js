import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResidentDashboard() {
    const [visits, setVisits] = useState([]);
    const [visitorName, setVisitorName] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    useEffect(() => {
        // Obtener visitas del residente
        axios.get('/api/resident/visits')
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error fetching visits:', error));
    }, []);

    const handleAcceptVisit = (id) => {
        axios.post(`/api/resident/accept-visit/${id}`)
            .then(() => {
                setVisits(visits.map(visit => 
                    visit._id === id ? { ...visit, status: 'Accepted' } : visit
                ));
            })
            .catch(error => console.error('Error accepting visit:', error));
    };

    const handleScheduleVisit = () => {
        axios.post('/api/resident/schedule-visit', { visitorName, visitDate })
            .then(response => {
                setVisits([...visits, response.data]);
                setVisitorName('');
                setVisitDate('');
            })
            .catch(error => console.error('Error scheduling visit:', error));
    };

    return (
        <div>
            <h1>Resident Dashboard</h1>
            <input type="text" placeholder="Visitor Name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} />
            <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
            <button onClick={handleScheduleVisit}>Schedule Visit</button>
            <h1>Resident Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Resto del contenido del dashboard */}
            <h2>Scheduled Visits</h2>
            <ul>
                {visits.map(visit => (
                    <li key={visit._id}>
                        {visit.visitorName} on {visit.visitDate} - {visit.status}
                        {visit.status === 'Pending' && (
                            <button onClick={() => handleAcceptVisit(visit._id)}>Accept</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResidentDashboard;
