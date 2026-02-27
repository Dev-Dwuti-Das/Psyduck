const messages = [
  { user: 'Ava', time: '10:14', text: 'Pushed the auth middleware update to `feature/auth-v2`.' },
  { user: 'Noah', time: '10:16', text: 'Nice. I will test refresh token expiry on staging.' },
  { user: 'Mia (AI)', time: '10:17', text: 'Reminder: run `npm run lint` before opening PR.' },
  { user: 'Liam', time: '10:20', text: 'Can someone review the websocket reconnect patch?' },
];

const members = ['Ava', 'Noah', 'Mia (AI)', 'Liam', 'Sofia', 'Ethan'];

export default function ChatRoom() {
  return (
    <section className="neo-chat-layout">
      <aside className="neo-chat-panel neo-chat-rooms">
        <div className="neo-chat-title">Rooms</div>
        <ul className="neo-chat-list">
          <li className="neo-chat-item active"><span className="neo-chat-hash">#</span>general</li>
          <li className="neo-chat-item"><span className="neo-chat-hash">#</span>backend</li>
          <li className="neo-chat-item"><span className="neo-chat-hash">#</span>frontend</li>
          <li className="neo-chat-item"><span className="neo-chat-hash">#</span>devops</li>
        </ul>
      </aside>

      <div className="neo-chat-panel neo-chat-main">
        <div className="neo-chat-header">
          <strong># general</strong>
          <span>High-priority engineering sync and build updates</span>
        </div>

        <div className="neo-message-list">
          {messages.map((message) => (
            <article key={`${message.user}-${message.time}`} className="neo-message-row">
              <div className="neo-avatar">{message.user[0]}</div>
              <div>
                <div className="neo-message-meta">
                  <strong>{message.user}</strong>
                  <span>{message.time}</span>
                </div>
                <p>{message.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="neo-chat-input-wrap">
          <input placeholder="Message #general" />
          <button type="button">Send</button>
        </div>
      </div>

      <aside className="neo-chat-panel neo-chat-members">
        <div className="neo-chat-title">Online - {members.length}</div>
        <ul className="neo-member-list">
          {members.map((member) => (
            <li key={member}>
              <span className="neo-status-dot" />
              {member}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
