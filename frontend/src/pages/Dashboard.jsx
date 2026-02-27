const channels = ['welcome', 'announcements', 'frontend-help', 'backend-help', 'ai-lab', 'showcase'];

const contacts = [
  { name: 'Ava Thompson', role: 'Frontend Lead', status: 'Online' },
  { name: 'Noah Clark', role: 'Backend Engineer', status: 'Online' },
  { name: 'Mia (AI)', role: 'Assistant Bot', status: 'Available' },
  { name: 'Liam Scott', role: 'DevOps Engineer', status: 'Away' },
];

export default function Dashboard() {
  return (
    <section className="page-grid">
      <aside className="panel channels-panel">
        <div className="panel-title">Text Channels</div>
        <ul className="channel-list">
          {channels.map((channel) => (
            <li key={channel} className="channel-item">
              <span className="hash">#</span>
              {channel}
            </li>
          ))}
        </ul>
      </aside>

      <div className="panel content-panel">
        <h1>Welcome to DevRooms</h1>
        <p className="muted">
          Neobrutal collaboration hub for engineering teams. Jump into channels, start voice calls,
          and coordinate code reviews with high-contrast focus.
        </p>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Members Online</span>
            <strong>128</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active Rooms</span>
            <strong>14</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Deploys Today</span>
            <strong>9</strong>
          </div>
        </div>
      </div>

      <aside className="panel activity-panel">
        <div className="panel-title">Contacts</div>
        <div className="activity-list">
          {contacts.map((contact) => (
            <article key={contact.name} className="activity-card">
              <h3>{contact.name}</h3>
              <p>{contact.role}</p>
              <span>{contact.status}</span>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
