const express = require('express');
const axios = require('axios');
const path = require('path');

const MAX_RETRIES = 5;
let retries = 0;

function startServer() {
    try {
        const app = express();

        // Middleware para servir archivos estáticos
        app.use(express.static(path.join(__dirname, 'dist')));

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

        // Ruta para manejar todas las demás rutas y devolver el archivo index.html
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        });

        // Puerto de la aplicación
        const PORT = process.env.PORT || 8080;

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error during server initialization:', error);

        if (retries < MAX_RETRIES) {
            retries++;
            console.log(`Retrying to start the server... Attempt ${retries} of ${MAX_RETRIES}`);
            setTimeout(startServer, 10000); // Esperar 10 segundos antes de intentar de nuevo
        } else {
            console.error('Max retries reached. Exiting.');
            process.exit(1); // Cerrar el proceso si no se puede iniciar el servidor
        }
    }
}

startServer();
