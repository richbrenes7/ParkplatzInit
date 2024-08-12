const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos desde el directorio 'src'
app.use(express.static(path.join(__dirname, 'src')));

// Cualquier otra ruta sirve el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HomePage server running on port ${PORT}`);
});
