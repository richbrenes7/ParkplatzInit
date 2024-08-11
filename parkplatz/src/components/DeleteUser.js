import React, { useState } from 'react';
import axios from 'axios';

function DeleteUser() {
    const [username, setUsername] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('/api/admin/delete-user', { data: { username } });
            alert(response.data.message);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar usuario');
        }
    };

    return (
        <div>
            <h2>Dar de Baja Usuario</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Eliminar Usuario</button>
            </form>
        </div>
    );
}

export default DeleteUser;
