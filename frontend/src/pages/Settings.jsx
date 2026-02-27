export default function Settings({
  presets,
  activePreset,
  onPresetChange,
  account,
  onAccountChange,
}) {
  const setAccountField = (key, value) => {
    const next = { ...account, [key]: value };
    onAccountChange(next);
    localStorage.setItem('devrooms.account', JSON.stringify(next));
  };

  return (
    <section className="settings-layout">
      <article className="settings-card">
        <h1>Appearance Settings</h1>
        <p>Choose a single preset. Half are dark-based and half are bright-based.</p>

        <div className="settings-grid">
          <label className="neo-theme-select-wrap settings-select">
            <span>Theme Preset</span>
            <select
              className="neo-theme-select"
              value={activePreset.id}
              onChange={(e) => {
                const selected = presets.find((theme) => theme.id === e.target.value);
                if (selected) onPresetChange(selected);
              }}
            >
              {presets.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.label} ({theme.tone})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="settings-section">
          <h2>User / Account (Frontend Only)</h2>

          <label className="neo-theme-select-wrap settings-select">
            <span>Display Name</span>
            <input
              className="neo-theme-select"
              type="text"
              value={account.displayName}
              onChange={(e) => setAccountField('displayName', e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className="neo-theme-select-wrap settings-select">
            <span>Email</span>
            <input
              className="neo-theme-select"
              type="text"
              value={account.email}
              onChange={(e) => setAccountField('email', e.target.value)}
              placeholder="name@company.com"
            />
          </label>

          <label className="neo-theme-select-wrap settings-select">
            <span>Role</span>
            <select
              className="neo-theme-select"
              value={account.role}
              onChange={(e) => setAccountField('role', e.target.value)}
            >
              <option>Developer</option>
              <option>Designer</option>
              <option>Product Manager</option>
              <option>QA Engineer</option>
              <option>DevOps Engineer</option>
            </select>
          </label>

          <label className="neo-theme-select-wrap settings-select">
            <span>Status Message</span>
            <input
              className="neo-theme-select"
              type="text"
              value={account.statusMessage}
              onChange={(e) => setAccountField('statusMessage', e.target.value)}
              placeholder="Working on sprint backlog"
            />
          </label>
        </div>
      </article>
    </section>
  );
}
