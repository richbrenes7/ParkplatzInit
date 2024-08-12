const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

router.get('/visits', async (req, res) => {
    try {
        const visits = await Visit.find({});
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las visitas' });
    }
});

module.exports = router;
