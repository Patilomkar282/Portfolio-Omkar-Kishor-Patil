const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    codeLink: { type: String, default: '#' },
    demoLink: { type: String, default: '#' },
    icons: [String], // Store icon names like "FaReact", "FaNodeJs"
    gradient: { type: String, default: "from-blue-500/10 to-cyan-500/10" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
