import Pusher from 'pusher';

const {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
} = process.env;

console.log('PUSHER_APP_ID', PUSHER_APP_ID ? 'set' : 'missing');
console.log('PUSHER_KEY', PUSHER_KEY ? 'set' : 'missing');
console.log('PUSHER_SECRET', PUSHER_SECRET ? 'set' : 'missing');
console.log('PUSHER_CLUSTER', PUSHER_CLUSTER ? 'set' : 'missing');

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('Request body', body);

    const message = body?.message;
    if (!message) {
      return res.status(400).json({ ok: false, error: 'Missing message' });
    }

    await pusher.trigger('chat', 'message', { message });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Pusher trigger failed', error);
    return res.status(500).json({ ok: false, error: 'Pusher trigger failed' });
  }
}
