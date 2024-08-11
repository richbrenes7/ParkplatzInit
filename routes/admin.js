const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
  if (req.user.role === 'Administrador') {
    next();
  } else {
    res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
  }
}

// Crear un nuevo usuario
router.post('/admin/users', isAdmin, async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

// Obtener todos los usuarios
router.get('/admin/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Eliminar un usuario
router.delete('/admin/users/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

module.exports = router;
