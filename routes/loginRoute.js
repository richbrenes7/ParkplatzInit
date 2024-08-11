const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        console.log('Password proporcionada:', password);
        console.log('Password almacenada (hash):', user.password);
        
        // Compara la contraseña proporcionada con la contraseña almacenada (hash)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Coincide:', isMatch);
        
        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Genera un token JWT si la autenticación es exitosa
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
