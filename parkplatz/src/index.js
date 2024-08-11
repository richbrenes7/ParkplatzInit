// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Crear el contenedor raíz
const container = document.getElementById('root');
const root = createRoot(container);

// Renderizar la aplicación en el contenedor raíz
root.render(<App />);
