const mongoose = require('mongoose');

const guardSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  turno: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String }
});

module.exports = mongoose.model('Guard', guardSchema);
