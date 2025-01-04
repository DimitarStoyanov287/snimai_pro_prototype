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
const jwt = require('jsonwebtoken'); // Optional: for generating tokens

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch user by username
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate a token (optional, for session management)
        const token = jwt.sign(
            { user_id: user.rows[0].id, username: user.rows[0].username },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        // Send user data (without password) and token
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
                firstName: user.rows[0].first_name,
                lastName: user.rows[0].last_name,
                role_id: user.rows[0].role_id,
                experience: user.rows[0].experience,
            },
            token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
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