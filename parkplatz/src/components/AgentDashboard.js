import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const AgentDashboard = () => {
    const [visits, setVisits] = useState([]);
    const [residents, setResidents] = useState([]); // Estado para almacenar la información de los residentes
    const [apartmentNumber, setApartmentNumber] = useState(''); // Estado para el número de apartamento
    const [selectedFilter, setSelectedFilter] = useState('hoy'); // Estado para el filtro de reportes
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get('/api/visitors');
                setVisits(response.data);
            } catch (error) {
                console.error('Error fetching visitors:', error);
            }
        };

        fetchVisits();
    }, []);

    const fetchResidents = async () => {
        if (!apartmentNumber) {
            alert('Por favor, ingresa un número de apartamento.');
            return;
        }

        console.log("Buscando residente para el departamento:", apartmentNumber);

        try {
            const response = await fetch(`/api/residents/${apartmentNumber}`);
            if (!response.ok) {
                throw new Error(`Error al obtener datos del residente: ${response.status} ${response.statusText}`);
            }
            const doc = await response.json();
            if (doc && doc.length > 0) {
                console.log('Resident data:', doc);
                setResidents(doc); // Inserta los residentes encontrados en el estado
            } else {
                console.log('No se encontró el documento!');
                setResidents([]); // Limpia los residentes si no se encuentran resultados
            }
        } catch (error) {
            console.log('Error getting resident data:', error);
            alert('Hubo un problema al obtener los datos del residente. Por favor, inténtalo de nuevo.');
            setResidents([]); // Limpia los residentes en caso de error
        }
    };

    const generateReport = () => {
        const filteredVisits = visits.filter(visit => {
            const visitDate = new Date(visit.date);
            const today = new Date();
            if (selectedFilter === 'hoy') {
                return visitDate.toDateString() === today.toDateString();
            } else if (selectedFilter === 'semana') {
                const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                return visitDate >= weekStart && visitDate <= new Date();
            } else if (selectedFilter === 'mes') {
                return visitDate.getMonth() === today.getMonth() && visitDate.getFullYear() === today.getFullYear();
            }
            return true;
        });

        console.log('Reporte generado:', filteredVisits);
    };

    const handleLogout = () => {
        localStorage.removeItem('nameAgent');
        navigate('/login'); 
    };

    return (
        <div className="dashboard-container">
            <div className="welcome-panel">
                <h1 className="dashboard-header">Bienvenido Agente</h1>
                <button className="dashboard-button logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="dashboard-content">
                <h2 className="dashboard-header">Visitas Registradas</h2>
                <div className="contTable">
                    <table className="table table-bordered table-hover bg-white tableStyle">
                        <thead className="colorTable">
                            <tr>
                                <th className="text-center text-white lead">Depto</th>
                                <th className="text-center text-white lead">Nombre Visitante</th>
                                <th className="text-center text-white lead">DPI</th>
                                <th className="text-center text-white lead">N° Acompañantes</th>
                                <th className="text-center text-white lead">Fecha</th>
                                <th className="text-center text-white lead">Hora</th>
                                <th className="text-center text-white lead">Estado</th>
                                <th className="text-center text-white lead">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.length > 0 ? (
                                visits.map(visit => (
                                    <tr key={visit._id}>
                                        <td className="text-center">{visit.numberDept}</td>
                                        <td className="text-center">{visit.name}</td>
                                        <td className="text-center">{visit.dpi}</td>
                                        <td className="text-center">{visit.companions}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleDateString('es-CL')}</td>
                                        <td className="text-center">{new Date(visit.date).toLocaleTimeString('es-CL')}</td>
                                        <td className="text-center">{visit.status}</td>
                                        <td className="text-center">
                                            {/* Agrega las acciones necesarias */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No hay visitas registradas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-content">
                <h2 className="dashboard-header">Generar Reporte de Visitas</h2>
                <div>
                    <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="dashboard-input">
                        <option value="hoy">Hoy</option>
                        <option value="semana">Última Semana</option>
                        <option value="mes">Último Mes</option>
                    </select>
                    <button onClick={generateReport} className="dashboard-button">Generar Reporte</button>
                </div>
            </div>

            <div className="dashboard-content">
                <h2 className="dashboard-header">Información de Residentes</h2>
                <div>
                    <input 
                        type="text" 
                        placeholder="Número de Apartamento" 
                        value={apartmentNumber}
                        onChange={(e) => setApartmentNumber(e.target.value)}
                        className="dashboard-input"
                    />
                    <button onClick={fetchResidents} className="dashboard-button">Buscar</button>
                </div>
                <div className="contTable">
                    <table className="table table-bordered table-hover bg-white tableStyle">
                        <thead className="colorTable">
                            <tr>
                                <th className="text-center text-white lead">Nombre</th>
                                <th className="text-center text-white lead">Departamento</th>
                                <th className="text-center text-white lead">Contacto</th>
                                <th className="text-center text-white lead">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residents.length > 0 ? (
                                residents.map((resident) => (
                                    <tr key={resident._id}>
                                        <td className="text-center">{resident.nameResident}</td>
                                        <td className="text-center">{resident.numberDept}</td>
                                        <td className="text-center">{resident.phoneNumber}</td>
                                        <td className="text-center">{resident.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No hay residentes registrados para este apartamento</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AgentDashboard;
