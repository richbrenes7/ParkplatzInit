// src/components/UserDashboard.js
import React from 'react';

import { useNavigate } from 'react-router-dom';


function UserDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>Panel de Usuario</h1>
            <button onClick={handleLogout}>Logout</button>

            {/* Agrega aquí el contenido del usuario */}
        </div>
    );
}

export default UserDashboard;
