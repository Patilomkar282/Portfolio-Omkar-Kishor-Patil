const express = require('express');
const router = express.Router();
const axios = require('axios');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Achievement = require('../models/Achievement');

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        // Check for API Key
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ reply: "API Key (OPENROUTER_API_KEY) is missing on the server." });
        }

        // 1. Fetch Context Data from MongoDB
        const [projects, skills, experience, education, achievements] = await Promise.all([
            Project.find({}, 'title description technologies'),
            Skill.find({}, 'name category level'),
            Experience.find({}, 'role company duration description'),
            Education.find({}, 'degree institute year score'),
            Achievement.find({}, 'title description')
        ]);

        // 2. Construct System Prompt
        const systemPrompt = `
        You are an AI assistant for Omkar Patil's Portfolio website.
        Your role is to answer questions about Omkar based on the following data.
        Be polite, professional, and helpful. Answer in the first person (as if you are Omkar's digital assistant).
        
        **Skills:** ${JSON.stringify(skills)}
        **Experience:** ${JSON.stringify(experience)}
        **Projects:** ${JSON.stringify(projects)}
        **Education:** ${JSON.stringify(education)}
        **Achievements:** ${JSON.stringify(achievements)}
        
        Rules:
        - If the user asks something not in the data, say you don't have that information.
        - Keep answers concise.
        - Encourage them to use the Contact form for business inquiries.
        `;

        // 3. Call OpenRouter API
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo", // You can change this to any OpenRouter model, e.g., "meta-llama/llama-3-8b-instruct:free"
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                max_tokens: 500,
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5000", // Optional: required by OpenRouter for rankings
                    "X-Title": "Omkar Portfolio", // Optional
                },
            }
        );

        // 4. Send Response
        const reply = response.data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("OpenRouter Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ reply: "Sorry, I'm having trouble connecting to the brain right now. Please try again later." });
    }
});

module.exports = router;
