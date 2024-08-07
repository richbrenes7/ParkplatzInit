const express = require('express');
const app = express();
const port = process.env.PORT || 8080;  // Asegúrate de que el servidor escuche en el puerto proporcionado

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
