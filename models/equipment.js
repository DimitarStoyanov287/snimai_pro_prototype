// models/Equipment.js
const mongoose = require('mongoose');

const rentalPeriodSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rentalPrice: { type: Number, required: true },
    available: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rentalPeriods: [rentalPeriodSchema],
    type: { type: String, required: true, enum: ['Lense', 'Camera', 'Tripod', 'Lightning', 'Batteries', 'SD Card', 'Microphone', 'Recorder', 'Ronin Steadicam'] }, // Type of equipment
    location: { type: String, required: true , enum:['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Stara Zagora']}, // Location of equipment
});

module.exports = mongoose.model('Equipment', equipmentSchema);
