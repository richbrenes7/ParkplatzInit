// models/User.js
const mongoose = require('mongoose');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Almacenar la contraseña como texto plano
  role: { 
    type: String, 
    enum: ['Residente', 'Guardia', 'Administrador'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

// Omitir la encriptación de la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  next(); // Saltar el proceso de hash
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return enteredPassword === this.password; // Comparar directamente las contraseñas en texto plano
};

module.exports = mongoose.model('User', userSchema);
