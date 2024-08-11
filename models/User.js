// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Cambiar a String en lugar de Buffer
  role: { 
    type: String, 
    enum: ['Residente', 'Guardia', 'Administrador'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

// Antes de guardar un usuario, encriptar la contraseña
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Almacenar como String
  next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
