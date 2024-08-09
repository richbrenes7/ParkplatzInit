const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String }
});

module.exports = mongoose.model('Resident', residentSchema);
