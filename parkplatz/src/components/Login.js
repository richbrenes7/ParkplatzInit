// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            const { token, role } = response.data;
    
            // Almacenar el token en localStorage
            localStorage.setItem('token', token);
    
            // Redirigir según el rol
            if (role === 'Administrador') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.response.data.message || 'Error en el servidor');
        }
    };
    

    const handleForgotPassword = () => {
        // Redirigir a una página de recuperación de contraseña (aún no creada)
        navigate('/forgot-password');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleForgotPassword}>Olvidé mi contraseña</button>
        </div>
    );
}

export default Login;
