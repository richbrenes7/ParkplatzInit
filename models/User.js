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
  email: { type: String, required: true, unique: true }, // Nuevo campo de correo electrónico
  createdAt: { type: Date, default: Date.now }
});

// No se necesita encriptar la contraseña, por lo tanto, no incluimos el middleware pre-save

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return enteredPassword === this.password; // Comparar directamente las contraseñas en texto plano
};

module.exports = mongoose.model('User', userSchema);
