const { GoogleGenerativeAI } = require("@google/generative-ai");

function getGeminiClient() {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing in backend/.env");
    }
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

async function askGemini(context, userMessage) {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an AI coding assistant in a developer chatroom.
    Previous conversation:
    ${context}

    User question:
    ${userMessage}

    Answer clearly and shortly.
    `;

    const result = await model.generateContent(prompt);
    return result?.response?.text?.() || "I could not generate a response.";
}

module.exports = askGemini;
