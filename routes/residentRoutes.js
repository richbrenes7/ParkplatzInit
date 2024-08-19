// routes/residentRoutes.js
const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit'); // Asumiendo que tienes un modelo de visitas

// Ruta para obtener las visitas del residente
router.get('/visits', async (req, res) => {
    try {
        const visits = await Visit.find({ residentId: req.user.id });
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las visitas' });
    }
});

// Ruta para programar una nueva visita
router.post('/schedule-visit', async (req, res) => {
    const { visitorName, visitDate } = req.body;
    try {
        const newVisit = new Visit({
            visitorName,
            visitDate,
            residentId: req.user.id,
            status: 'Pending'
        });
        await newVisit.save();
        res.json(newVisit);
    } catch (error) {
        res.status(500).json({ message: 'Error al programar la visita' });
    }
});

// Ruta para aceptar una visita
router.post('/accept-visit/:id', async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        visit.status = 'Accepted';
        visit.acceptedAt = new Date();
        await visit.save();
        res.json(visit);
    } catch (error) {
        res.status(500).json({ message: 'Error al aceptar la visita' });
    }
});

// Ruta para rechazar una visita
router.post('/reject-visit/:id', async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        visit.status = 'Rejected';
        visit.rejectedAt = new Date();
        await visit.save();
        res.json(visit);
    } catch (error) {
        res.status(500).json({ message: 'Error al rechazar la visita' });
    }
});

module.exports = router;
