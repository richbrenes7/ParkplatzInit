const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitante: { type: String, required: true },
  residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true }, // Referencia al residente
  numeroDept: { type: String, required: true }, // Número de apartamento asociado
  fecha: { type: Date, required: true },
  horaEntrada: { type: String },
  horaSalida: { type: String },
  observaciones: { type: String },
  registradoPorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que registró la visita
  status: { type: String, default: 'Pendiente' }
});

module.exports = mongoose.model('Visit', visitSchema);
