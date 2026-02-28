import Pusher from 'pusher';

const {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
} = process.env;

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_BOT_NAME = 'Mia (AI)';
const chatHistoryByRoom = new Map();

const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const nextId = (prefix = 'm') => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const getRoomHistory = (roomId) => {
  if (!chatHistoryByRoom.has(roomId)) {
    chatHistoryByRoom.set(roomId, []);
  }
  return chatHistoryByRoom.get(roomId);
};

const buildContext = (history, limit = 20) =>
  history
    .slice(-limit)
    .map((item) => `${item.user}: ${item.text}`)
    .join('\n');

const askGemini = async ({ context, userPrompt }) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = [
    'You are an AI coding assistant in a developer chat room.',
    'Answer clearly and shortly.',
    context ? `Previous conversation:\n${context}` : '',
    `User question:\n${userPrompt}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
      }),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${details}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    throw new Error('Gemini returned an empty response');
  }

  return text;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const message = body?.message?.trim?.() || '';
    const username = body?.username?.trim?.() || 'Guest';
    const time = body?.time || new Date().toISOString();

<<<<<<< HEAD
    const message = body?.message;
    const roomId = body?.roomId || 'general';

    if (!message || typeof message.text !== 'string') {
      return res.status(400).json({ ok: false, error: 'Missing message' });
    }

    const normalizedUserMessage = {
      id: message.id || nextId('m'),
      user: message.user || 'You',
      text: message.text,
      time: message.time || getCurrentTime(),
      isBot: Boolean(message.isBot),
    };

    const history = getRoomHistory(roomId);
    history.push(normalizedUserMessage);

    await pusher.trigger('chat', 'message', { message: normalizedUserMessage });

    const trimmedText = normalizedUserMessage.text.trim();
    const shouldCallAi = trimmedText.toLowerCase().startsWith('/ai');
    if (!shouldCallAi) {
      return res.status(200).json({ ok: true });
    }

    const userPrompt = trimmedText.replace(/^\/ai\b/i, '').trim() || 'Continue.';
    const context = buildContext(history.slice(0, -1));

    let aiText;
    try {
      aiText = await askGemini({ context, userPrompt });
    } catch (aiError) {
      console.error('Gemini call failed', aiError);
      aiText = 'I could not reach Gemini right now. Please try again in a moment.';
    }

    const aiMessage = {
      id: nextId('ai'),
      user: AI_BOT_NAME,
      time: getCurrentTime(),
      text: aiText,
      isBot: true,
    };

    history.push(aiMessage);
    await pusher.trigger('chat', 'message', { message: aiMessage });

    return res.status(200).json({ ok: true, ai: aiMessage });
=======
    if (!message) {
      return res.status(400).json({ ok: false, error: 'Missing message' });
    }

    await pusher.trigger('chat', 'message', { message, username, time });
    return res.status(200).json({ ok: true });
>>>>>>> main
  } catch (error) {
    console.error('Pusher trigger failed', error);
    return res.status(500).json({ ok: false, error: 'Pusher trigger failed' });
  }
}
