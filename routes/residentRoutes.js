const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit'); // Asumiendo que tienes un modelo de visitas

router.get('/visits', async (req, res) => {
    try {
        const visits = await Visit.find({ residentId: req.user.id });
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las visitas' });
    }
});

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

router.post('/accept-visit/:id', async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        visit.status = 'Accepted';
        visit.acceptedAt = new Date();
        await visit.save();
        res.json(visit);
    } catch (error) {
        res.status(500).json({ message: 'Error al aceptar la visita' });
    }
});

module.exports = router;
