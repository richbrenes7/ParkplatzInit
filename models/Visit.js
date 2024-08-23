const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitante: { type: String, required: true },
  residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true }, // ObjectId referencia a Resident
  dpi: { type: String, required: true },
  numCompanions: { type: Number, required: true },
  fecha: { type: Date, required: true },
  horaEntrada: { type: String },
  horaSalida: { type: String },
  observaciones: { type: String },
  registradoPorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // ObjectId referencia a User
});

module.exports = mongoose.model('Visit', visitSchema);
