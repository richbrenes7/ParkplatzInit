// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // Establece la URL base para todas las solicitudes
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
