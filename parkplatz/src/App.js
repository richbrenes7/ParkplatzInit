// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ResidentDashboard from './components/ResidentDashboard';
import AgentDashboard from './components/AgentDashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UserDashboard from './components/UserDashboard';

function App() {
    // Verifica si el token de autenticación está almacenado en localStorage
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                {/* Ruta para la página de login */}
                <Route path="/login" element={<Login />} />

                {/* Ruta para la página de recuperación de contraseña */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Ruta para el dashboard del administrador, con redirección si no está autenticado */}
                <Route
                    path="/admin-dashboard"
                    element={
                        isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
                    }
                />

                {/* Ruta para el dashboard del residente, con redirección si no está autenticado */}
                <Route
                    path="/resident-dashboard"
                    element={
                        isAuthenticated ? <ResidentDashboard /> : <Navigate to="/login" />
                    }
                />

                {/* Ruta para el dashboard del agente, con redirección si no está autenticado */}
                <Route
                    path="/agent-dashboard"
                    element={
                        isAuthenticated ? <AgentDashboard /> : <Navigate to="/login" />
                    }
                />

                {/* Ruta para el dashboard del usuario, con redirección si no está autenticado */}
                <Route
                    path="/user-dashboard"
                    element={
                        isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
                    }
                />

                {/* Redirige cualquier otra ruta no definida a la página de login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
