// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                setError('Por favor, ingresa el nombre de usuario y la contraseña');
                return;
            }
            const response = await axios.post('/api/login', { username, password });
            const { token, role } = response.data;
    
            // Almacenar el token en localStorage
            localStorage.setItem('token', token);
    
            // Redirigir según el rol
            if (role === 'Administrador') {
                navigate('/admin-dashboard');
            } else if (role === 'Residente') {
                navigate('/resident-dashboard');
            } else if (role === 'Agente') {
                navigate('/agent-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Credenciales inválidas o error en el servidor');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                <Link to="/forgot-password">Restablecer contraseña</Link>
            </div>
        </div>
    );
}

export default Login;
