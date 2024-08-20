const mongoose = require('mongoose');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Contraseña en texto plano
  role: { 
    type: String, 
    enum: ['Residente', 'Guardia', 'Administrador'], 
    required: true 
  },
  email: { type: String, required: true, unique: true }, // Correo electrónico
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
