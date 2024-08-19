const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta para crear un nuevo usuario (registro)
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario o correo electrónico ya está en uso' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ username, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error durante el registro del usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor, ingresa el nombre de usuario y la contraseña' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = 'some-jwt-token'; // Generar un JWT token real aquí

        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta para restablecer la contraseña
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Por favor, ingresa tu correo electrónico' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Correo electrónico no encontrado' });
        }

        // Aquí deberías generar un token de restablecimiento de contraseña y enviarlo por correo
        const resetToken = 'some-reset-token'; // Genera un token real aquí
        console.log(`Enviar correo de restablecimiento a: ${email} con el token: ${resetToken}`);

        res.json({ message: 'Se ha enviado un correo para restablecer tu contraseña' });
    } catch (error) {
        console.error('Error durante la solicitud de restablecimiento de contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/admin/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener los usuarios' });
    }
});

// Ruta para crear un nuevo usuario (solo para administradores)
router.post('/admin/users', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor al agregar el usuario' });
    }
});

// Ruta para actualizar un usuario (solo para administradores)
router.put('/admin/users/:id', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios, excepto la contraseña' });
    }

    try {
        const updatedData = { username, email, role };
        if (password) {
            updatedData.password = password;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor al actualizar el usuario' });
    }
});

// Ruta para eliminar un usuario (solo para administradores)
router.delete('/admin/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor al eliminar el usuario' });
    }
});

module.exports = router;
