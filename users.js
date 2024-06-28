const express = require('express');
const { authenticateToken } = require('./middleware/authMiddleware');
const router = express.Router();

router.get('/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;