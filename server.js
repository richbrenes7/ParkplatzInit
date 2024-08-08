const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Sirve los archivos estáticos desde el directorio 'public' o 'dist'
app.use(express.static(path.join(__dirname, 'public')));

// Maneja todas las rutas y retorna el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
