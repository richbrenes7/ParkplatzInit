require('dotenv').config({ path: './apipark.env' });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Conectar a MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI1, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
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
app.use(express.json({ limit: '5mb' })); // Aumentar el límite a 10MB o más si es necesario
app.use(bodyParser.json({ limit: '5mb' })); // Ajustar también el límite de bodyParser

// Definir los esquemas y modelos de MongoDB
const visitorSchema = new mongoose.Schema({
    numberDept: String,
    name: String,
    dpi: String,
    companions: Number,
    image: String,
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

// Rutas para la gestión de visitantes y residentes
app.post('/api/visitors', async (req, res) => {
    try {
        const newVisitor = new Visitor({
            numberDept: req.body.numberDept,
            name: req.body.name,
            dpi: req.body.dpi, 
            companions: req.body.companions,
            image: req.body.image
        });
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

app.put('/api/residents/:id', async (req, res) => {
    try {
        const resident = await Resident.findOneAndUpdate(
            { numberDept: req.params.id },
            req.body,
            { new: true }
        );
        res.json(resident);  // Asegúrate de enviar una respuesta JSON válida aquí
    } catch (error) {
        console.error('Error al actualizar residente:', error.message);
        res.status(500).json({ error: 'Error al actualizar residente' });  // Enviar un error en formato JSON
    }
});


app.get('/api/residents/:id', async (req, res) => {
    try {
        const resident = await Resident.findOne({ numberDept: req.params.id });
        res.send(resident);
    } catch (error) {
        console.error('Error al obtener residente:', error.message);
        res.status(500).send('Error al obtener residente');
    }
});

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'src')));

// Ruta para servir index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//Para guardar19:50