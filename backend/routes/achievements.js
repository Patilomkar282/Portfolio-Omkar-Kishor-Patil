const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const auth = require('../middleware/auth');

// @route   GET /api/achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/achievements
router.post('/', auth, async (req, res) => {
    try {
        const newAchievement = new Achievement(req.body);
        const achievement = await newAchievement.save();
        res.json(achievement);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/achievements/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await Achievement.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Achievement removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
