import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Residente');
  const [email, setEmail] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = () => {
    axios.post('/api/admin/users', { username, email, password, role })
      .then(response => {
        setUsers([...users, response.data]);
        setUsername('');
        setPassword('');
        setEmail('');
        setRole('Residente');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleEditUser = (user) => {
    setUsername(user.username || '');
    setEmail(user.email || '');
    setPassword('');  // No se debe precargar la contraseña
    setRole(user.role || 'Residente');
    setEditingUserId(user._id);
  };

  const handleUpdateUser = () => {
    axios.put(`/api/admin/users/${editingUserId}`, { username, email, password, role })
      .then(response => {
        setUsers(users.map(user => (user._id === editingUserId ? response.data : user)));
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('Residente');
        setEditingUserId(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`/api/admin/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value || '')} // Asegúrate de que nunca se vuelva undefined
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value || '')} // Asegúrate de que nunca se vuelva undefined
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value || '')} // Asegúrate de que nunca se vuelva undefined
      />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value || 'Residente')} // Asegúrate de que nunca se vuelva undefined
      >
        <option value="Residente">Residente</option>
        <option value="Guardia">Guardia</option>
        <option value="Administrador">Administrador</option>
      </select>
      {editingUserId ? (
        <button onClick={handleUpdateUser}>Update User</button>
      ) : (
        <button onClick={handleAddUser}>Add User</button>
      )}
      <button onClick={handleLogout}>Logout</button>
      <h2>Users</h2>
      <ul>
        {Array.isArray(users) ? (
          users.map(user => (
            <li key={user._id}>
              {user.username} ({user.role}) - {user.email}
              <button onClick={() => handleEditUser(user)}>Edit</button>
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
