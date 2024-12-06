const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Import database connection

const router = express.Router();
router.post('/register', async (req, res) => {
    const { username, password, firstName, lastName, role_id, experience, email } = req.body;

    try {
        // Check if username or email already exists
        const userExists = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Username or email already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const newUser = await pool.query(
            `INSERT INTO users (username, password, first_name, last_name, role_id, experience, email, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id, username`,
            [username, hashedPassword, firstName, lastName, role_id, experience, email]
        );

        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser.rows[0],
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
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
    }
});

module.exports = router;