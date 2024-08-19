// routes/loginRoute.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Genera el token de autenticación
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devuelve el token y el rol del usuario
        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
