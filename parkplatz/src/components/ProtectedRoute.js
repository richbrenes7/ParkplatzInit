import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
    // Obtén el token y el rol del usuario desde el localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Verifica si el usuario tiene un token válido y el rol requerido
    if (!token || (requiredRole && role !== requiredRole)) {
        // Si no está autenticado, redirige al login
        return <Navigate to="/login" />;
    }

    // Si está autenticado, muestra el componente solicitado
    return <Component {...rest} />;
};

export default ProtectedRoute;
