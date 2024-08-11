const User = require('../models/User');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const user = new User({
            username,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Reiniciar la contraseña del usuario
exports.resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al reiniciar la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Dar de baja un usuario
exports.deleteUser = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOneAndDelete({ username });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
