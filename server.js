require('dotenv').config({ path: './apipark.env' });

const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');

const MAX_RETRIES = 5;
let retries = 0;

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);

        if (retries < MAX_RETRIES) {
            retries++;
            console.log(`Retrying to connect to MongoDB... Attempt ${retries} of ${MAX_RETRIES}`);
            setTimeout(connectToDatabase, 10000); // Esperar 10 segundos antes de intentar de nuevo
        } else {
            console.error('Max retries reached. Exiting.');
            process.exit(1); // Cerrar el proceso si no se puede conectar a la base de datos
        }
    }
}

function startServer() {
    const app = express();

    // Middleware para analizar el cuerpo de las solicitudes
    app.use(express.json());

    // Middleware para servir archivos estáticos
    app.use(express.static(path.join(__dirname, 'dist')));

    // Importar y usar las rutas de administrador
    const adminRoutes = require('./routes/adminRoutes');
    console.log('Cargando rutas de administrador...');
    app.use('/api/admin', adminRoutes);

    // Importar y usar las rutas de autenticación
    const authRoutes = require('./routes/authRoutes');
    console.log('Cargando rutas de autenticación...');
    app.use('/api/auth', authRoutes);

    // Importar y usar las rutas de login
    const loginRoute = require('./routes/loginRoute');
    console.log('Cargando rutas de login...');
    app.use('/api', loginRoute);

    // Rutas de ejemplo
    app.get('/api/data', async (req, res) => {
        try {
            const response = await axios.get('https://api.example.com/data');
            res.json(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Server Error');
        }
    });

    // Redirigir a la página de login si no se encuentra una ruta
    app.get('*', (req, res) => {
        res.redirect('/login');
    });

    // Puerto de la aplicación
    const PORT = process.env.PORT || 8080;

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Conectar a la base de datos y luego iniciar el servidor
connectToDatabase().then(startServer);
