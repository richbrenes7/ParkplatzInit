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
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Campos para residentes
  const [numberDept, setNumberDept] = useState('');
  const [nameResident, setNameResident] = useState('');
  const [resident2, setResident2] = useState({ name: '', phone: '' });
  const [resident3, setResident3] = useState({ name: '', phone: '' });
  const [resident4, setResident4] = useState({ name: '', phone: '' });

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

    // Verificar si el usuario es administrador
    axios.get('/api/check-role')
      .then(response => {
        setIsAdmin(response.data.role === 'Administrador');
      })
      .catch(error => console.error('Error verifying role:', error));
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
    setPassword(''); // No se debe precargar la contraseña
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

  // Manejo del ingreso de residentes
  const handleAddResident = () => {
    const residentData = {
      numberDept,
      nameResident,
      resident2,
      resident3,
      resident4
    };

    axios.post('/api/residents', residentData)
      .then(response => {
        setNumberDept('');
        setNameResident('');
        setResident2({ name: '', phone: '' });
        setResident3({ name: '', phone: '' });
        setResident4({ name: '', phone: '' });
        console.log('Residente agregado:', response.data);
      })
      .catch(error => console.error('Error adding resident:', error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value || '')}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value || '')}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value || '')}
      />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value || 'Residente')}
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

      {isAdmin && (
        <div>
          <h2>Agregar Residente</h2>
          <input 
            type="text" 
            placeholder="Número de Departamento" 
            value={numberDept} 
            onChange={(e) => setNumberDept(e.target.value || '')}
          />
          <input 
            type="text" 
            placeholder="Nombre del Residente Principal" 
            value={nameResident} 
            onChange={(e) => setNameResident(e.target.value || '')}
          />
          <input 
            type="text" 
            placeholder="Nombre Residente 2" 
            value={resident2.name} 
            onChange={(e) => setResident2({ ...resident2, name: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Teléfono Residente 2" 
            value={resident2.phone} 
            onChange={(e) => setResident2({ ...resident2, phone: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Nombre Residente 3" 
            value={resident3.name} 
            onChange={(e) => setResident3({ ...resident3, name: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Teléfono Residente 3" 
            value={resident3.phone} 
            onChange={(e) => setResident3({ ...resident3, phone: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Nombre Residente 4" 
            value={resident4.name} 
            onChange={(e) => setResident4({ ...resident4, name: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Teléfono Residente 4" 
            value={resident4.phone} 
            onChange={(e) => setResident4({ ...resident4, phone: e.target.value })}
          />
          <button onClick={handleAddResident}>Agregar Residente</button>
        </div>
      )}

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
