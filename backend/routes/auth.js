const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/register
// @desc    Register a new admin (First time setup only - practically)
// @access  Public (Should be secured in production)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username });
        if (admin) return res.status(400).json({ message: 'Admin already exists' });

        admin = new Admin({ username, password });
        await admin.save();

        const payload = { userId: admin.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = { userId: admin.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
