import React, { useState } from 'react';
import '../styles/Login.css'; // Verifica que la ruta sea correcta
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
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="forgot-password-link">
                    <Link to="/forgot-password">Restablecer contraseña</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
