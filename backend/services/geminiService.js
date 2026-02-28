const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(context, userMessage) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an AI coding assistant in a developer chatroom.
    Previous conversation:
    ${context}

    User question:
    ${userMessage}

    Answer clearly and shortly.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = askGemini;