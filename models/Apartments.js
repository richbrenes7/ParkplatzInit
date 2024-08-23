const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true }
});

const apartmentSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    residents: [residentSchema] // Lista de residentes
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
