const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the path module

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));
// Your other routes (including the posts routes, equipment routes, etc.) will be here
// e.g., app.use('/posts', require('./routes/post'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://mitkoivstoyanov:Ma6terkaMitko16022001@snimaiprocluster0.rwbfo.mongodb.net/myDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.log(err));

// Use authentication routes
app.use('/auth', require('./routes/auth'));

// Root Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});