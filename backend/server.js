const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Patilomkar_282:Patilo%40282@portfolio.6d0nedm.mongodb.net/?appName=Portfolio';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/education', require('./routes/education'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/chat', require('./routes/chat'));

// Email Transporter Configuration
const user = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});

// Email Route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `Portfolio Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<h3>New Contact from Portfolio</h3>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
