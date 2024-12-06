// routes/post.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');


// Example route
router.get('/', (req, res) => {
    res.send('Posts route is working!');
});
// Create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get all posts
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
// Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Server Error');
    }
});



// Export the router
module.exports = router;
