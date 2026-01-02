const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, required: true },
    score: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'GraduationCap' },
    gradient: { type: String, default: "from-blue-500/10 to-cyan-500/10" },
    iconColor: { type: String, default: "text-blue-500" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Education', educationSchema);
