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
        setError('');  // Resetea el error antes de intentar el login
        try {
            if (!username || !password) {
                setError('Por favor, ingresa el nombre de usuario y la contraseña');
                return;
            }

            const response = await axios.post('/api/login', { username, password });

            if (response.data && response.data.token && response.data.role) {
                const { token, role } = response.data;

                // Almacena el nombre del residente y el token en localStorage
                localStorage.setItem('nameResident', username);
                localStorage.setItem('token', token);

                // Redirigir según el rol
                switch (role) {
                    case 'Administrador':
                        navigate('/admin-dashboard');
                        break;
                    case 'Residente':
                        navigate('/resident-dashboard');
                        break;
                    case 'Agente':
                        navigate('/agent-dashboard');
                        break;
                    default:
                        navigate('/user-dashboard');
                        break;
                }
            } else {
                setError('Error inesperado: los datos de respuesta son inválidos.');
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
