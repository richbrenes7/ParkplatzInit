const functions = require('firebase-functions');
const express = require('express');
const app = express();

// Middleware de ejemplo
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  next();
});

// Ejemplo de ruta
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Firebase Functions!' });
});

// Manejar todas las demás rutas con el index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

exports.app = functions.https.onRequest(app);
