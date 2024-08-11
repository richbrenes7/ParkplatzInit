require('dotenv').config({ path: './apipark.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createUser(username, password, role) {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            password: hashedPassword, // Asegúrate de que se guarde como string
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

// Reemplaza estos valores con los que desees
createUser('ricardo1', '12345', 'Administrador');
