const express = require("express");
const router = express.Router();
const askGemini = require("../services/geminiService");

const chatHistory = {};

router.post("/message", async (req, res) => {
    const roomId = req.body?.roomId || "general";
    const message = req.body?.message;

    if (!message || typeof message.text !== "string") {
        return res.status(400).json({ ok: false, error: "Missing message text" });
    }

    if (!chatHistory[roomId]) {
        chatHistory[roomId] = [];
    }

    const normalizedUserMessage = {
        id: message.id || `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        user: message.user || "You",
        time: message.time || new Date().toTimeString().slice(0, 5),
        text: message.text,
    };

    chatHistory[roomId].push(normalizedUserMessage);

    const trimmedText = normalizedUserMessage.text.trim();
    const isAiCommand = /\B@mia\b/i.test(trimmedText) || /^\/ai\b/i.test(trimmedText);
    if (!isAiCommand) {
        return res.json({ ok: true, message: normalizedUserMessage, reply: null });
    }

    const userMsg = trimmedText
        .replace(/^\/ai\b[:,-]?\s*/i, "")
        .replace(/\B@mia\b[:,-]?\s*/i, "")
        .trim() || "Continue.";

    const context = chatHistory[roomId]
        .slice(0, -1)
        .slice(-20)
        .map((m) => `${m.user}: ${m.text}`)
        .join("\n");

    try {
        const aiReply = await askGemini(context, userMsg);

        const aiMessage = {
            id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            user: "Mia (AI)",
            time: new Date().toTimeString().slice(0, 5),
            text: aiReply,
            isBot: true,
        };

        chatHistory[roomId].push(aiMessage);
        return res.json({ ok: true, message: normalizedUserMessage, reply: aiReply, aiMessage });
    } catch (error) {
        console.error("Gemini failed:", error.message);
        const fallbackAiMessage = {
            id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            user: "Mia (AI)",
            time: new Date().toTimeString().slice(0, 5),
            text: "I could not reach Gemini right now. Please try again in a moment.",
            isBot: true,
        };
        chatHistory[roomId].push(fallbackAiMessage);
        return res.json({ ok: true, message: normalizedUserMessage, reply: fallbackAiMessage.text, aiMessage: fallbackAiMessage });
    }
});

module.exports = router;
