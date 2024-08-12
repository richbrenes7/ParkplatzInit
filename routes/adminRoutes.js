// adminRoutes.js
const express = require('express');
const { resetPassword, deleteUser } = require('../controllers/adminController');
const User = require('../models/User');

const router = express.Router(); // Declaramos router una sola vez

// Ruta para reiniciar la contraseña
router.put('/reset-password', resetPassword);

// Ruta para eliminar un usuario
router.delete('/delete-user', deleteUser);

// Nueva Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users); // Asegúrate de devolver JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

router.post('/users', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});

module.exports = router;
