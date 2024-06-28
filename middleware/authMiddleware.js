const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, config.secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };