const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitante: { type: String, required: true },
  residente: { type: String, required: true },
  fecha: { type: Date, required: true },
  horaEntrada: { type: String, required: true },
  horaSalida: { type: String },
  observaciones: { type: String }
});

module.exports = mongoose.model('Visit', visitSchema);
