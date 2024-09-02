require('dotenv').config({ path: './apipark.env' });

const path = require('path');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: path.join(__dirname, 'parkplatz-4376a-ed606605abb9.json') // Asegúrate de que el nombre del archivo JSON sea correcto
});
const bucketName = 'parkplatz-transform';
const multer = require('multer');
const express = require('express');
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

const visitorSchema = new mongoose.Schema({
    numberDept: { type: String, required: true },
    name: { type: String, required: true },
    dpi: { type: String, required: true },
    companions: { type: Number, required: true },
    image: { type: String, required: false },
    status: { type: String, default: 'Pendiente' },
    date: { type: Date, default: Date.now },
    observaciones: String,
    registeredBy: { type: String, required: true }
});

const Apartment = mongoose.models.Apartment || mongoose.model('Apartment', apartmentSchema);
const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);

// Función para normalizar el DPI (elimina espacios, guiones, etc.)
function normalizeDpi(dpi) {
    return dpi.replace(/\D/g, ''); // Elimina cualquier cosa que no sea un dígito
}

// Rutas para la gestión de visitas
app.get('/api/visitors/pending', async (req, res) => {
    try {
        const { numberDept } = req.query; // Asegúrate de recibir el número de departamento como query parameter
        const visitors = await Visitor.find({
            numberDept: numberDept,
            status: 'Pendiente'
        }).sort({ date: -1 });
        res.json(visitors);
    } catch (error) {
        console.error('Error al obtener visitas pendientes:', error.message);
        res.status(500).json({ error: 'Error al obtener visitas pendientes' });
    }
});

app.post('/api/visitors/:id/accept', async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, { status: 'Aceptada' }, { new: true });
        res.json(visitor);
    } catch (error) {
        console.error('Error al aceptar la visita:', error.message);
        res.status(500).json({ error: 'Error al aceptar la visita' });
    }
});

app.post('/api/visitors/:id/reject', async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, { status: 'Rechazada' }, { new: true });
        res.json(visitor);
    } catch (error) {
        console.error('Error al rechazar la visita:', error.message);
        res.status(500).json({ error: 'Error al rechazar la visita' });
    }
});

app.post('/api/visitors/schedule', async (req, res) => {
    try {
        const { name, numberDept, dpi, companions, date, observaciones } = req.body;

        const newVisitor = new Visitor({
            name,
            numberDept,
            dpi: normalizeDpi(dpi), // Normaliza el DPI al guardarlo
            companions,
            date,
            status: 'Pendiente',
            observaciones,
            registeredBy: 'Residente'  // Indicar que fue registrado por el residente
        });

        const savedVisitor = await newVisitor.save();
        res.status(201).json(savedVisitor);
    } catch (error) {
        console.error('Error al agendar la visita:', error.message);
        res.status(500).json({ error: 'Error al agendar la visita' });
    }
});

// Rutas para la gestión de visitantes
app.post('/api/visitors', async (req, res) => {
    try {
        const { numberDept, name, dpi, companions, image, registeredBy } = req.body;

        // Subir la imagen al bucket de Google Cloud
        const fileName = `${Date.now()}_${normalizeDpi(dpi)}.png`;  // Nombre del archivo en el bucket
        const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const file = storage.bucket(bucketName).file(fileName);

        await file.save(buffer, {
            metadata: { contentType: 'image/png' },
        });

        const newVisitor = new Visitor({
            numberDept,
            name,
            dpi: normalizeDpi(dpi), // Normaliza el DPI al guardarlo
            companions,
            image: `https://storage.googleapis.com/${bucketName}/${fileName}`,  // URL de la imagen
            registeredBy
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

// Configurar multer para manejar la subida de archivos
const upload = multer({
    storage: multer.memoryStorage(),
});

const bucket = storage.bucket(bucketName);

// Ruta para manejar la subida de la imagen
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on('finish', () => {
            res.status(200).send({
                message: 'Upload complete',
                fileName: req.file.originalname,
            });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).send({
            message: 'Upload failed',
            error: error.message,
        });
    }
});

// Ruta para validar si existe una visita pendiente para el DPI
app.get('/api/validateDPI', async (req, res) => {
    const { dpi } = req.query;
    
    // Normaliza el DPI eliminando espacios o caracteres innecesarios
    const normalizedDPI = normalizeDpi(dpi); 

    const visitor = await Visitor.findOne({ dpi: normalizedDPI, status: 'Pendiente' });

    if (visitor) {
        // Actualizar el estado de la visita a "Aceptada"
        visitor.status = 'Aceptada';
        await visitor.save();
        res.json({ status: 'accepted', visitor_name: visitor.name });
    } else {
        res.json({ status: 'not_found' });
    }
});

// Ruta para aceptar una visita si existe
app.post('/api/acceptVisit', async (req, res) => {
    const { dpi } = req.query;
    
    // Normaliza el DPI eliminando espacios o caracteres innecesarios
    const normalizedDPI = normalizeDpi(dpi);

    const visitor = await Visitor.findOneAndUpdate(
        { dpi: normalizedDPI, status: 'Pendiente' },
        { $set: { status: 'Aceptada' } },
        { new: true }
    );

    if (visitor) {
        res.json({ status: 'success', visitor });
    } else {
        res.json({ status: 'error', message: 'No se encontró ninguna visita pendiente para aceptar.' });
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
