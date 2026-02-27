const messages = [
  { user: 'Ava', time: '10:14', text: 'Pushed the auth middleware update to `feature/auth-v2`.' },
  { user: 'Noah', time: '10:16', text: 'Nice. I will test refresh token expiry on staging.' },
  { user: 'Mia (AI)', time: '10:17', text: 'Reminder: run `npm run lint` before opening PR.' },
  { user: 'Liam', time: '10:20', text: 'Can someone review the websocket reconnect patch?' },
];

const members = ['Ava', 'Noah', 'Mia (AI)', 'Liam', 'Sofia', 'Ethan'];

export default function ChatRoom() {
  return (
    <section className="chat-layout">
      <aside className="panel room-sidebar">
        <div className="panel-title">Rooms</div>
        <ul className="channel-list">
          <li className="channel-item active"><span className="hash">#</span>general</li>
          <li className="channel-item"><span className="hash">#</span>backend</li>
          <li className="channel-item"><span className="hash">#</span>frontend</li>
          <li className="channel-item"><span className="hash">#</span>devops</li>
        </ul>
      </aside>

      <div className="panel chat-main">
        <div className="chat-header">
          <strong># general</strong>
          <span>Engineering sync and quick updates</span>
        </div>

        <div className="message-list">
          {messages.map((message) => (
            <article key={`${message.user}-${message.time}`} className="message-row">
              <div className="avatar">{message.user[0]}</div>
              <div>
                <div className="message-meta">
                  <strong>{message.user}</strong>
                  <span>{message.time}</span>
                </div>
                <p>{message.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="chat-input-wrap">
          <input placeholder="Message #general" />
        </div>
      </div>

      <aside className="panel members-panel">
        <div className="panel-title">Online - {members.length}</div>
        <ul className="member-list">
          {members.map((member) => (
            <li key={member}>
              <span className="status-dot" />
              {member}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
