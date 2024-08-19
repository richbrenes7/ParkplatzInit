// routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Resident = require('../models/Resident');

// Ruta para obtener todas las visitas
router.get('/visits', async (req, res) => {
    try {
        const visits = await Visit.find({});
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las visitas' });
    }
});

// Ruta para obtener todos los residentes
router.get('/residents', async (req, res) => {
    try {
        const residents = await Resident.find({});
        res.json(residents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los residentes' });
    }
});

module.exports = router;
