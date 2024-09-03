// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ResidentDashboard from './components/ResidentDashboard';
import AgentDashboard from './components/AgentDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';  // Importa el componente ProtectedRoute

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta para la página de login */}
                <Route path="/login" element={<Login />} />

                {/* Ruta para la página de recuperación de contraseña */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Rutas protegidas */}
                <Route
                    path="/admin-dashboard"
                    element={<ProtectedRoute component={AdminDashboard} requiredRole="Administrador" />}
                />
                <Route
                    path="/resident-dashboard"
                    element={<ProtectedRoute component={ResidentDashboard} requiredRole="Residente" />}
                />
                <Route
                    path="/agent-dashboard"
                    element={<ProtectedRoute component={AgentDashboard} requiredRole="Agente" />}
                />
                <Route
                    path="/user-dashboard"
                    element={<ProtectedRoute component={UserDashboard} />}
                />

                {/* Redirige cualquier otra ruta no definida a la página de login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
