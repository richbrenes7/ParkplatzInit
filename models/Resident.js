const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    numberDept: String,
    nameResident: String,
    email: String,
    resident2: {
        name: String,
        phone: String,
    },
    resident3: {
        name: String,
        phone: String,
    },
    resident4: {
        name: String,
        phone: String,
    },
    adminCreated: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Resident', residentSchema);
