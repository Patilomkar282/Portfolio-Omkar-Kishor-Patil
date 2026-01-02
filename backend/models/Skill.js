const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, default: 'Frontend' }, // Frontend, Backend, Tools, etc.
    icon: { type: String, required: true }, // Icon name
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', skillSchema);
