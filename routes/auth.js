const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_secret_key'; // Replace with a secure secret key

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, phoneNumber, firstName, lastName, role, experience, location } = req.body;
        
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send("Username or email already in use");
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, phoneNumber, firstName, lastName, role, experience, location });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).send("Error registering user");
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid credentials");
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).send("Error logging in");
    }
});

module.exports = router;