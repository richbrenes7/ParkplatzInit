// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ForgotPassword from './components/ForgotPassword';

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
