const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    icon: { type: String, default: 'Briefcase' }, // Icon name
    gradient: { type: String, default: "from-blue-500/10 to-indigo-500/10" },
    iconColor: { type: String, default: "text-blue-600" },
    certificateLink: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experience', experienceSchema);
