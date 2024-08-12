// createUser.js
require('dotenv').config({ path: './apipark.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

async function createUser(username, password, role) {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
  
        const newUser = new User({
            username,
            password, // Almacenar la contraseña tal cual se proporciona
            role,
        });
  
        await newUser.save();
        console.log(`Usuario ${username} creado con éxito`);
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        process.exit(1);
    }
}

// Reemplaza estos valores con el usuario y la contraseña que quieras crear
createUser('ricardo1', '1234', 'Administrador');
