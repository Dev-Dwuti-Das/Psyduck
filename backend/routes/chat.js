const express = require("express");
const router = express.Router();
const askGemini = require("../services/geminiService");

const chatHistory = {};

router.post("/message", async (req, res) => {
    const { roomId, message, user } = req.body;

    if (!chatHistory[roomId]) chatHistory[roomId] = [];

    // normal message
    if (!message.startsWith("/ai")) {
        chatHistory[roomId].push({ user, message });
        return res.json({ reply: null });
    }

    // AI message
    const userMsg = message.replace("/ai", "").trim();

    const context = chatHistory[roomId]
        .map(m => `${m.user}: ${m.message}`)
        .join("\n");

    const aiReply = await askGemini(context, userMsg);

    chatHistory[roomId].push({ user, message });
    chatHistory[roomId].push({ user: "AI", message: aiReply });

    res.json({ reply: aiReply });
});

module.exports = router;