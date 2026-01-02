const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    organization: { type: String },
    category: { type: String, default: 'Certification' }, // Certification, Competition, etc.
    icon: { type: String, default: 'Award' },
    color: { type: String, default: 'primary' },
    certificateLink: { type: String }, // URL to Google Drive or other certificate host
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);
