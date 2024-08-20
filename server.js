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
const visitorSchema = new mongoose.Schema({
    numberDept: String,
    name: String,
    dpi: String,
    companions: Number,
    image: String,
    status: { type: String, default: 'Pendiente' }, // Agrega el campo status
    date: { type: Date, default: Date.now }
});

const residentSchema = new mongoose.Schema({
    numberDept: String,
    nameResident: String,
    email: String,
    resident2: String,
    resident3: String,
    resident4: String
});

const Visitor = mongoose.model('Visitor', visitorSchema);
const Resident = mongoose.model('Resident', residentSchema);
const Visit = require('./models/Visit');

// Rutas para la gestión de visitas
app.get('/api/visits/pending', async (req, res) => {
    try {
        const visits = await Visit.find({ status: 'Pendiente' }).populate('residente');
        res.json(visits);
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

// Rutas para la gestión de visitas
app.post('/api/visits/schedule', async (req, res) => {
    try {
        const { visitante, residenteId, numeroDept, fecha, registradoPorId, observaciones } = req.body;

        if (!mongoose.Types.ObjectId.isValid(residenteId) || !mongoose.Types.ObjectId.isValid(registradoPorId)) {
            return res.status(400).json({ error: 'Residente ID o registradoPorId no son ObjectIDs válidos.' });
        }

        const newVisit = new Visit({
            visitante,
            residente: residenteId,
            numeroDept,
            fecha,
            registradoPorId,
            observaciones
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

// Rutas para la gestión de residentes
app.post('/api/residents', async (req, res) => {
    try {
        const { numberDept, nameResident, email, resident2, resident3, resident4, adminCreated } = req.body;

        const newResident = new Resident({
            numberDept,
            nameResident,
            email,
            resident2,
            resident3,
            resident4,
            adminCreated // ID del usuario administrador que creó el residente
        });

        const savedResident = await newResident.save();
        res.status(201).json(savedResident);
    } catch (error) {
        console.error('Error al agregar residente:', error.message);
        res.status(500).send('Error al agregar residente');
    }
});

app.put('/api/residents/:id', async (req, res) => {
    try {
        console.log(`Intentando actualizar residente con ID: ${req.params.id}`);
        console.log('Datos recibidos:', req.body);

        const resident = await Resident.findOneAndUpdate(
            { numberDept: req.params.id },
            req.body,
            { new: true }
        );
        if (!resident) {
            console.log('Residente no encontrado.');
            return res.status(404).json({ error: 'Residente no encontrado' });
        }
        res.json(resident);
    } catch (error) {
        console.error('Error al actualizar residente:', error.message);
        res.status(500).json({ error: 'Error al actualizar residente' });
    }
});

app.get('/api/residents/:id', async (req, res) => {
    try {
        console.log(`Buscando residente con ID: ${req.params.id}`);

        const resident = await Resident.findOne({ numberDept: req.params.id });
        if (!resident) {
            console.log('Residente no encontrado.');
            return res.status(404).json({ error: 'Residente no encontrado' });
        }
        res.json(resident);
    } catch (error) {
        console.error('Error al obtener residente:', error.message);
        res.status(500).json({ error: 'Error al obtener residente' });
    }
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
