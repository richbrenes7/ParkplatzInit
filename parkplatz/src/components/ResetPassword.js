import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/admin/reset-password', { username, newPassword });
            alert(response.data.message);
        } catch (error) {
            console.error('Error al reiniciar la contraseña:', error);
            alert('Error al reiniciar la contraseña');
        }
    };

    return (
        <div>
            <h2>Reiniciar Contraseña</h2>
            <form onSubmit={handleReset}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Reiniciar Contraseña</button>
            </form>
        </div>
    );
}

export default ResetPassword;
