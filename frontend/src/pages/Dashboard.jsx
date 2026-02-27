const channels = ['welcome', 'announcements', 'frontend-help', 'backend-help', 'ai-lab', 'showcase'];

const activity = [
  { title: 'Sprint Voice', users: '6 online', status: 'Live' },
  { title: 'Pair Programming', users: '3 online', status: 'Live' },
  { title: 'Design Review', users: 'Starts in 20m', status: 'Scheduled' },
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
          Discord-style collaborative space for engineering teams. Jump into channels, start voice calls,
          and coordinate code reviews in one place.
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
        <div className="panel-title">Voice Activity</div>
        <div className="activity-list">
          {activity.map((item) => (
            <article key={item.title} className="activity-card">
              <h3>{item.title}</h3>
              <p>{item.users}</p>
              <span>{item.status}</span>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
