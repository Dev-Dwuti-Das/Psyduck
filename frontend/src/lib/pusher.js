import Pusher from 'pusher-js';

export const createPusherClient = () =>
  new Pusher(import.meta.env.VITE_PUSHER_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    forceTLS: true,
  });
