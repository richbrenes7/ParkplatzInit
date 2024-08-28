require('dotenv').config({ path: './apipark.env' });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Configura CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Conectar a MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI1, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

connectToDatabase();

// Middleware para manejar JSON con un límite mayor
app.use(express.json({ limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));

// Usar las rutas de autenticación antes de cualquier otra ruta
app.use('/api', authRoutes);

// Definir los esquemas y modelos de MongoDB
const residentSchema = new mongoose.Schema({
    nameResident: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

const apartmentSchema = new mongoose.Schema({
    numberDept: { type: String, required: true, unique: true },
    residents: [residentSchema]
});

// Verificar si el modelo ya está definido para evitar el error OverwriteModelError
const Apartment = mongoose.models.Apartment || mongoose.model('Apartment', apartmentSchema);
const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', {
    numberDept: String,
    name: String,
    dpi: String,
    companions: Number,
    image: String,
    status: { type: String, default: 'Pendiente' },
    date: { type: Date, default: Date.now }
});
const Visit = mongoose.models.Visit || mongoose.model('Visit', {
    visitante: String,
    residente: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
    dpi: String,
    numCompanions: Number,
    fecha: Date,
    registradoPorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    observaciones: String,
    numberDept: String,
});

// Rutas para la gestión de visitas
app.get('/api/visitors/pending', async (req, res) => {
    try {
        const visitors = await Visitor.find({ status: 'Pendiente' }).sort({ date: -1 });
        res.json(visitors);
    } catch (error) {
        console.error('Error al obtener visitas pendientes:', error.message);
        res.status(500).json({ error: 'Error al obtener visitas pendientes' });
    }
});

app.post('/api/visits/:id/accept', async (req, res) => {
    try {
        const visit = await Visit.findByIdAndUpdate(req.params.id, { status: 'Aceptada' }, { new: true });
        res.json(visit);
    } catch (error) {
        console.error('Error al aceptar la visita:', error.message);
        res.status(500).json({ error: 'Error al aceptar la visita' });
    }
});

app.post('/api/visits/:id/reject', async (req, res) => {
    try {
        const visit = await Visit.findByIdAndUpdate(req.params.id, { status: 'Rechazada' }, { new: true });
        res.json({ message: 'Visita rechazada' });
    } catch (error) {
        console.error('Error al rechazar la visita:', error.message);
        res.status(500).json({ error: 'Error al rechazar la visita' });
    }
});

app.post('/api/visits/schedule', async (req, res) => {
    try {
        const { visitante, residenteId, numeroDept, dpi, numCompanions, fecha, registradoPorId, observaciones } = req.body;

        if (!mongoose.Types.ObjectId.isValid(residenteId) || !mongoose.Types.ObjectId.isValid(registradoPorId)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const newVisit = new Visit({
            visitante,
            residente: residenteId,
            dpi,
            numCompanions,
            fecha,
            registradoPorId,
            observaciones,
            numberDept: numeroDept
        });

        const savedVisit = await newVisit.save();
        res.status(201).json(savedVisit);
    } catch (error) {
        console.error('Error al agendar la visita:', error.message);
        res.status(500).json({ error: 'Error al agendar la visita' });
    }
});

// Rutas para la gestión de visitantes
app.post('/api/visitors', async (req, res) => {
    try {
        const newVisitor = new Visitor(req.body);
        const savedVisitor = await newVisitor.save();
        res.json({ id: savedVisitor._id });
    } catch (error) {
        console.error('Error al agregar visitante:', error.message);
        res.status(500).send('Error al agregar visitante');
    }
});

app.get('/api/visitors', async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ date: -1 }).limit(20);
        res.json(visitors);
    } catch (error) {
        console.error('Error al obtener visitantes:', error.message);
        res.status(500).send('Error al obtener visitantes');
    }
});

// Rutas para la gestión de residentes y apartamentos
app.post('/api/residents', async (req, res) => {
    try {
        const { numberDept, nameResident, email, phoneNumber } = req.body;

        let apartment = await Apartment.findOne({ numberDept });

        if (!apartment) {
            apartment = new Apartment({ numberDept, residents: [] });
        }

        if (apartment.residents.length >= 3) {
            return res.status(400).json({ error: 'El apartamento ya tiene el número máximo de residentes (3)' });
        }

        apartment.residents.push({ nameResident, email, phoneNumber });

        const savedApartment = await apartment.save();
        res.status(201).json(savedApartment);
    } catch (error) {
        console.error('Error al agregar residente:', error.message);
        res.status(500).send('Error al agregar residente');
    }
});

app.put('/api/residents/:apartmentId/:residentId', async (req, res) => {
    try {
        const { apartmentId, residentId } = req.params;
        const { nameResident, email, phoneNumber } = req.body;

        const apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
            return res.status(404).json({ error: 'Apartamento no encontrado' });
        }

        const resident = apartment.residents.id(residentId);
        if (!resident) {
            return res.status(404).json({ error: 'Residente no encontrado' });
        }

        resident.nameResident = nameResident;
        resident.email = email;
        resident.phoneNumber = phoneNumber;

        const savedApartment = await apartment.save();
        res.json(savedApartment);
    } catch (error) {
        console.error('Error al actualizar residente:', error.message);
        res.status(500).json({ error: 'Error al actualizar residente' });
    }
});

app.put('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role, apartment } = req.body;

    try {
        const user = await mongoose.models.User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        if (apartment) {
            const apartmentObj = await Apartment.findById(apartment);
            if (!apartmentObj) {
                return res.status(400).json({ error: 'Apartamento no encontrado' });
            }
            user.apartment = apartment;
        }

        if (password) {
            user.password = password;
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

app.get('/api/residents/:numberDept', async (req, res) => {
    try {
        const { numberDept } = req.params;

        const apartment = await Apartment.findOne({ numberDept });
        if (!apartment) {
            return res.status(404).json({ error: 'Apartamento no encontrado' });
        }

        res.json(apartment.residents);
    } catch (error) {
        console.error('Error al obtener residentes:', error.message);
        res.status(500).json({ error: 'Error al obtener residentes' });
    }
});


app.get('/api/apartments', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (error) {
        console.error('Error fetching apartments:', error.message);
        res.status(500).json({ error: 'Failed to fetch apartments' });
    }
});

app.get('/api/residents/loggedin', async (req, res) => {
    try {
        const residentName = req.query.nameResident.trim(); // Asegúrate de hacer trim para eliminar espacios en blanco

        console.log('Nombre del residente recibido:', residentName);

        if (!residentName) {
            return res.status(400).json({ error: 'El nombre del residente es requerido' });
        }

        const resident = await Apartment.findOne(
            { "residents.nameResident": { $regex: new RegExp('^' + residentName.trim() + '$', 'i') } },
            { numberDept: 1, "residents": { $elemMatch: { nameResident: { $regex: new RegExp('^' + residentName.trim() + '$', 'i') } } } }
        );
        

        if (!resident || !resident.residents || resident.residents.length === 0) {
            return res.status(404).json({ error: 'Residente no encontrado o estructura incorrecta' });
        }

        res.json(resident);
    } catch (error) {
        console.error('Error al obtener la información del residente logueado:', error.message);
        res.status(500).json({ error: 'Error al obtener la información del residente logueado' });
    }
});

app.get('/api/residents/all', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (error) {
        console.error('Error al obtener los residentes:', error.message);
        res.status(500).json({ error: 'Error al obtener los residentes' });
    }
});
app.post('/api/residents/loggedin', async (req, res) => {
    const { nameResident } = req.body;
    console.log('Nombre del residente recibido:', nameResident);

    if (!nameResident) {
        return res.status(400).json({ error: 'El nombre del residente es requerido' });
    }

    const resident = await Apartment.findOne(
        { "residents.nameResident": { $regex: new RegExp('^' + nameResident.trim() + '$', 'i') } },
        { numberDept: 1, "residents": { $elemMatch: { nameResident: { $regex: new RegExp('^' + nameResident.trim() + '$', 'i') } } } }
    );

    if (!resident || !resident.residents || resident.residents.length === 0) {
        return res.status(404).json({ error: 'Residente no encontrado o estructura incorrecta' });
    }

    res.json(resident);
});

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'src')));

// Ruta para servir index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Iniciar el servidor en el puerto 8081
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
