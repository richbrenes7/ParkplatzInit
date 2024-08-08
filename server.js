const express = require('express');
const axios = require('axios');
const path = require('path');

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
    process.exit(1); // Cerrar el proceso si ocurre un error crítico
}
