const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const auth = require('../middleware/auth');

// @route   GET /api/experience
// @desc    Get all experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/experience
router.post('/', auth, async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const experience = await newExperience.save();
        res.json(experience);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/experience/:id
router.put('/:id', auth, async (req, res) => {
    try {
        let experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ msg: 'Experience not found' });

        experience = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(experience);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/experience/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Experience removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
