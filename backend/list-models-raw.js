const https = require('https');
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;

if (!key) {
    console.error("No API Key found");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

console.log("Fetching models from:", "https://generativelanguage.googleapis.com/v1beta/models?key=HIDDEN");

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log("Status Code:", res.statusCode);
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("✅ Available Models:");
                json.models.forEach(m => console.log(` - ${m.name}`));
            } else {
                console.log("❌ Response JSON (Error?):", JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.log("Response (Not JSON):", data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
