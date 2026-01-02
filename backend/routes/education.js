const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const auth = require('../middleware/auth');

// @route   GET /api/education
router.get('/', async (req, res) => {
    try {
        const education = await Education.find().sort({ createdAt: -1 });
        res.json(education);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/education
router.post('/', auth, async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        const education = await newEducation.save();
        res.json(education);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/education/:id
router.put('/:id', auth, async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(education);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/education/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Education removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
