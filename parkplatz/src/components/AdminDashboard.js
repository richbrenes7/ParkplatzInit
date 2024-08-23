import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Verifica que la ruta sea correcta

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Residente');
  const [email, setEmail] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState('');
  const [manualApartment, setManualApartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [numberDept, setNumberDept] = useState('');
  const [nameResident, setNameResident] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Agregado para número de teléfono
  const [resident2, setResident2] = useState({ name: '', phone: '' });
  const [resident3, setResident3] = useState({ name: '', phone: '' });
  const [resident4, setResident4] = useState({ name: '', phone: '' });
  const [editingResidentId, setEditingResidentId] = useState(null);
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
          setFilteredUsers(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));

    axios.get('/api/check-role')
      .then(response => {
        setIsAdmin(response.data.role === 'Administrador');
      })
      .catch(error => console.error('Error verifying role:', error));

    axios.get('/api/apartments')
      .then(response => {
        if (Array.isArray(response.data)) {
          setApartments(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setApartments([]);
        }
      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
        setApartments([]);
      });
  }, []);

  const handleAddUser = () => {
    if (role === 'Residente' && !manualApartment && !selectedApartment) {
      alert('Por favor, seleccione o ingrese un apartamento para el residente.');
      return;
    }

    const userData = { username, email, password, role };

    if (role === 'Residente') {
      userData.apartment = manualApartment || selectedApartment;

      // Lógica para agregar residente al apartamento
      const residentData = {
        numberDept: manualApartment || selectedApartment,
        nameResident: username,
        email: email,
        phoneNumber: phoneNumber || '' // Solicitar número de teléfono
      };

      axios.post('/api/residents', residentData)
        .then(response => {
          console.log('Residente agregado:', response.data);
        })
        .catch(error => {
          console.error('Error adding resident:', error);
          return;
        });
    }

    axios.post('/api/admin/users', userData)
      .then(response => {
        setUsers([...users, response.data]);
        setFilteredUsers([...users, response.data]);
        resetForm();
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleEditUser = (user) => {
    setUsername(user.username || '');
    setEmail(user.email || '');
    setPassword('');
    setRole(user.role || 'Residente');
    setSelectedApartment(user.apartment ? user.apartment._id : '');
    setManualApartment(user.apartment ? user.apartment.numberDept : '');
    setEditingUserId(user._id);
  };

  const handleUpdateUser = () => {
    if (role === 'Residente' && !manualApartment && !selectedApartment) {
      alert('Por favor, seleccione o ingrese un apartamento para el residente.');
      return;
    }

    const userData = { username, email, password, role };
    if (role === 'Residente') {
      userData.apartment = manualApartment || selectedApartment;

      // Lógica para actualizar el residente en el apartamento
      const residentData = {
        numberDept: manualApartment || selectedApartment,
        nameResident: username,
        email: email,
        phoneNumber: phoneNumber || '' // Solicitar número de teléfono
      };

      axios.put(`/api/residents/${selectedApartment || manualApartment}/${editingResidentId}`, residentData)
        .then(response => {
          console.log('Residente actualizado:', response.data);
        })
        .catch(error => {
          console.error('Error updating resident:', error);
          return;
        });
    }

    axios.put(`/api/admin/users/${editingUserId}`, userData)
      .then(response => {
        const updatedUsers = users.map(user => (user._id === editingUserId ? response.data : user));
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        resetForm();
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`/api/admin/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(user => {
      const apartmentMatch = user.apartment?.numberDept?.toLowerCase().includes(query.toLowerCase());
      const residentMatch = user.username?.toLowerCase().includes(query.toLowerCase());
      return apartmentMatch || residentMatch;
    });
    setFilteredUsers(filtered);
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('Residente');
    setSelectedApartment('');
    setManualApartment('');
    setPhoneNumber(''); // Limpiar el campo de teléfono
    setEditingUserId(null);
  };

  const handleAddResident = () => {
    const residentData = {
      numberDept,
      nameResident,
      phoneNumber, // Solicitar número de teléfono
      resident2,
      resident3,
      resident4
    };

    axios.post('/api/residents', residentData)
      .then(response => {
        resetResidentForm();
        console.log('Residente agregado:', response.data);
      })
      .catch(error => console.error('Error adding resident:', error));
  };

  const handleUpdateResident = () => {
    const updatedResidentData = {
      numberDept,
      nameResident,
      phoneNumber, // Solicitar número de teléfono
      resident2,
      resident3,
      resident4
    };

    axios.put(`/api/residents/${editingResidentId}`, updatedResidentData)
      .then(response => {
        console.log('Residente actualizado:', response.data);
        resetResidentForm();
      })
      .catch(error => console.error('Error updating resident:', error));
  };

  const resetResidentForm = () => {
    setNumberDept('');
    setNameResident('');
    setPhoneNumber(''); // Limpiar el campo de teléfono
    setResident2({ name: '', phone: '' });
    setResident3({ name: '', phone: '' });
    setResident4({ name: '', phone: '' });
    setEditingResidentId(null);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      <div className="dashboard-content">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="dashboard-input"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="dashboard-input"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="dashboard-input"
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="dashboard-input"
        >
          <option value="Residente">Residente</option>
          <option value="Guardia">Guardia</option>
          <option value="Administrador">Administrador</option>
        </select>
        {role === 'Residente' && (
          <>
            <input
              type="text"
              placeholder="Ingresar número de apartamento"
              value={manualApartment}
              onChange={(e) => setManualApartment(e.target.value)}
              className="dashboard-input"
            />
            <input
              type="text"
              placeholder="Ingresar número de teléfono" // Solicitar número de teléfono
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="dashboard-input"
            />
            <select
              value={selectedApartment}
              onChange={(e) => setSelectedApartment(e.target.value)}
              className="dashboard-input"
            >
              <option value="">Seleccionar apartamento registrado</option>
              {apartments.map(apt => (
                <option key={apt._id} value={apt._id}>{apt.numberDept}</option>
              ))}
            </select>
          </>
        )}
        {editingUserId ? (
          <button onClick={handleUpdateUser} className="dashboard-button">Update User</button>
        ) : (
          <button onClick={handleAddUser} className="dashboard-button">Add User</button>
        )}
        <button onClick={handleLogout} className="dashboard-button">Logout</button>
      </div>

      <div className="search-box">
        <h2>Buscar Usuarios</h2>
        <input 
          type="text" 
          placeholder="Buscar por nombre o apartamento" 
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="dashboard-input"
        />
      </div>

      {isAdmin && (
        <div className="dashboard-content">
          <h2>{editingResidentId ? 'Actualizar Residente' : 'Agregar Residente'}</h2>
          <input 
            type="text" 
            placeholder="Número de Departamento" 
            value={numberDept} 
            onChange={(e) => setNumberDept(e.target.value)}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Nombre del Residente Principal" 
            value={nameResident} 
            onChange={(e) => setNameResident(e.target.value)}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Número de Teléfono" // Solicitar número de teléfono
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Nombre Residente 2" 
            value={resident2.name} 
            onChange={(e) => setResident2({ ...resident2, name: e.target.value })}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Teléfono Residente 2" 
            value={resident2.phone} 
            onChange={(e) => setResident2({ ...resident2, phone: e.target.value })}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Nombre Residente 3" 
            value={resident3.name} 
            onChange={(e) => setResident3({ ...resident3, name: e.target.value })}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Teléfono Residente 3" 
            value={resident3.phone} 
            onChange={(e) => setResident3({ ...resident3, phone: e.target.value })}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Nombre Residente 4" 
            value={resident4.name} 
            onChange={(e) => setResident4({ ...resident4, name: e.target.value })}
            className="dashboard-input"
          />
          <input 
            type="text" 
            placeholder="Teléfono Residente 4" 
            value={resident4.phone} 
            onChange={(e) => setResident4({ ...resident4, phone: e.target.value })}
            className="dashboard-input"
          />
          {editingResidentId ? (
            <button onClick={handleUpdateResident} className="dashboard-button">Actualizar Residente</button>
          ) : (
            <button onClick={handleAddResident} className="dashboard-button">Agregar Residente</button>
          )}
        </div>
      )}

      <h2>Users</h2>
      <ul className="users-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user._id}>
              {user.username} ({user.role}) - {user.email}
              {user.role === 'Residente' && user.apartment && ` - Apartamento: ${user.apartment.numberDept}`}
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default AdminDashboard;
