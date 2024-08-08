import '../css/style.css';
import './data.js';
import './view.js';
import './controller.js';

console.log('App initialized');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
