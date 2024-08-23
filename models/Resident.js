const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    apartamentoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true } // Referencia al apartamento
});

const Resident = mongoose.model('Resident', residentSchema);

module.exports = Resident;
