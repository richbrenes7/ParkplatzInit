// authRoutes.js
const express = require('express');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router(); // Declaramos router una sola vez

// Ruta para forgot-password (recuperar la contraseña)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'No existe usuario con ese correo electrónico' });

        // Generar un token de reseteo de contraseña
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        // Configurar Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Restablecimiento de Contraseña',
            text: `Has recibido este correo porque tú (o alguien más) solicitó restablecer la contraseña de tu cuenta.\n\n` +
                `Por favor, haz clic en el siguiente enlace, o copia y pega esta URL en tu navegador para completar el proceso:\n\n` +
                `http://${req.headers.host}/reset-password/${resetToken}\n\n` +
                `Si no solicitaste este cambio, por favor ignora este correo y tu contraseña permanecerá sin cambios.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado con las instrucciones para restablecer la contraseña.' });
    } catch (error) {
        console.error('Error en el proceso de restablecimiento de contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
