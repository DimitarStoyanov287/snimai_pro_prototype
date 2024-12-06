// routes/equipment.js
const express = require('express');
const Equipment = require('../models/equipment.js');
const router = express.Router();

// Create new equipment
router.post('/', async (req, res) => {
    const { name, description, rentalPrice, owner, rentalPeriods, type, location } = req.body;
    try {
        const newEquipment = new Equipment({ name, description, rentalPrice, owner, rentalPeriods, type, location });
        await newEquipment.save();
        res.status(201).json(newEquipment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating equipment' });
    }
});

// Get all equipment
router.get('/', async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.json(equipment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching equipment' });
    }
});

// Add other routes for updating and deleting equipment...

module.exports = router;
