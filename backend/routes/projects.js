const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/projects
// @desc    Add a new project
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description, tags, codeLink, demoLink, icons, gradient } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            tags,
            codeLink,
            demoLink,
            icons, // Array of strings e.g. ["FaReact", "SiNodeJs"]
            gradient
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, description, tags, codeLink, demoLink, icons, gradient } = req.body;

    const projectFields = { title, description, tags, codeLink, demoLink, icons, gradient };

    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
