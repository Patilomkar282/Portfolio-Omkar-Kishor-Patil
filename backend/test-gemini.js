const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;

console.log("--- Diagnostic Check ---");
if (!key) {
    console.error("❌ GEMINI_API_KEY is missing from .env");
} else {
    console.log(`✅ GEMINI_API_KEY found (Length: ${key.length})`);
    if (key.startsWith('"') || key.endsWith('"')) {
        console.warn("⚠️ Key seems to be wrapped in quotes. This might be the issue if not handled by dotenv.");
    }
}

const genAI = new GoogleGenerativeAI(key || "DUMMY_KEY");

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-pro",
    "gemini-1.0-pro"
];

async function testModels() {
    for (const modelName of modelsToTest) {
        console.log(`\nTesting model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log("Response:", result.response.text().substring(0, 50) + "...");
            return; // Stop after first success
        } catch (error) {
            console.error(`❌ FAILED with ${modelName}`);
            // Extract just the status and simplified message
            const status = error.status || "Unknown";
            const msg = error.message.split('\n')[0];
            console.error(`   Status: ${status} - ${msg}`);
        }
    }
}

testModels();
