const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');
const { authenticateToken } = require('./middleware/authMiddleware');
const router = express.Router();

let users = [
    { id: 1, username: 'test', password: 'password', name: 'Test User' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id, name: user.name }, config.secret, { expiresIn: config.expiresIn });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.post('/register', (req, res) => {
    const { username, password, name } = req.body;
    if (users.find(u => u.username === username)) {
        res.status(400).json({ message: 'Username already exists' });
    } else {
        const newUser = { id: users.length + 1, username, password, name };
        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    }
});

router.post('/recover', (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        // Send recovery email logic goes here
        res.json({ message: 'Password recovery instructions sent to your email' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;