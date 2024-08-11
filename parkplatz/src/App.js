// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ForgotPassword from './components/ForgotPassword';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/user-dashboard"
                    element={
                        isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
