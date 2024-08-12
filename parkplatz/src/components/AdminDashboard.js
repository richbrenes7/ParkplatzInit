import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Residente');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
};

  useEffect(() => {
    // Obtener los usuarios al cargar el componente
    axios.get('/api/admin/users')
      .then(response => {
        // Asegúrate de que la respuesta es un array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = () => {
    axios.post('/api/admin/users', { username, password, role })
      .then(response => {
        // Agregar el nuevo usuario al array existente
        setUsers([...users, response.data]);
        setUsername('');
        setPassword('');
        setRole('Residente');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`/api/admin/users/${id}`)
      .then(() => {
        // Filtrar el usuario eliminado del array
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Residente">Residente</option>
        <option value="Guardia">Guardia</option>
        <option value="Administrador">Administrador</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
      <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Resto del contenido del dashboard */}
      <h2>Users</h2>
      <ul>
        {Array.isArray(users) ? (
          users.map(user => (
            <li key={user._id}>
              {user.username} ({user.role})
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No users available</li>
        )}
      </ul>
    </div>
    
  );
}

export default AdminDashboard;
