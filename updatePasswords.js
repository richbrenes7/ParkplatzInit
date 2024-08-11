// updatePasswords.js (Ejemplo)
require('dotenv').config({ path: './apipark.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

async function updatePasswords() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const users = await User.find({});
        for (let user of users) {
            if (Buffer.isBuffer(user.password)) {
                user.password = user.password.toString('utf8');
                await user.save();
                console.log(`Contraseña actualizada para usuario: ${user.username}`);
            }
        }

        console.log('Todas las contraseñas han sido actualizadas');
        process.exit(0);
    } catch (error) {
        console.error('Error al actualizar contraseñas:', error);
        process.exit(1);
    }
}

updatePasswords();
