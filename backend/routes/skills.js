const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

// @route   GET /api/skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/skills
router.post('/', auth, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const skill = await newSkill.save();
        res.json(skill);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/skills/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Skill removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
