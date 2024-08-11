// recreateUser.js
require('dotenv').config({ path: './apipark.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function recreateUser(username, password, role) {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.findOneAndDelete({ username });  // Elimina el usuario anterior si existe

        const newUser = new User({
            username,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        console.log(`Usuario ${username} recreado con éxito`);
        process.exit(0);
    } catch (error) {
        console.error('Error al recrear usuario:', error);
        process.exit(1);
    }
}

// Reemplaza estos valores con el usuario y la contraseña que quieras recrear
recreateUser('ricardo', '1234', 'Administrador');
