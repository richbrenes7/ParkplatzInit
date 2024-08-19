// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/forgot-password', { email });
            setMessage('Si tu correo está registrado, recibirás instrucciones para recuperar tu contraseña.');
        } catch (error) {
            console.error('Error during password recovery:', error);
            setMessage('Hubo un problema al intentar recuperar tu contraseña.');
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
