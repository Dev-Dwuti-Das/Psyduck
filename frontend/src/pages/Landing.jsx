export default function Landing({
  onEnterDashboard,
  onEnterChat,
  themeVars,
}) {
  return (
    <section className="neo-landing" style={themeVars}>
      <header className="neo-nav">
        <div className="neo-logo">DEVROOMS</div>
        <nav className="neo-nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#metrics">Metrics</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="neo-nav-actions">
          <button className="neo-btn neo-btn-yellow" onClick={onEnterChat}>Try Chat</button>
          <button className="neo-btn neo-btn-dark" onClick={onEnterDashboard}>Open App</button>
        </div>
      </header>

      <div className="neo-hero">
        <div className="neo-shape neo-shape-circle neo-mascot" aria-hidden="true">
          <span className="neo-eye neo-eye-left" />
          <span className="neo-eye neo-eye-right" />
          <span className="neo-smile" />
        </div>
        <div className="neo-shape neo-shape-square" />
        <div className="neo-shape neo-shape-zig" />

        <div className="neo-copy">
          <p className="neo-kicker">Discord-Inspired Collaboration</p>
          <h1>Build, Ship, and Chat in One Brutal Workspace.</h1>
          <p>
            A team chat platform with live channels, focused rooms, and fast decisions.
            Styled with neobrutalist blocks, sharp contrast, and loud color for high-energy product teams.
          </p>
          <div className="neo-pills">
            <span># Realtime rooms</span>
            <span># AI helper</span>
            <span># Team workflow</span>
          </div>
          <div className="neo-actions">
            <button className="neo-btn neo-btn-yellow" onClick={onEnterDashboard}>Enter Dashboard</button>
            <button className="neo-btn neo-btn-purple" onClick={onEnterChat}>Join Chat Room</button>
          </div>
        </div>

        <div className="neo-mock">
          <div className="mock-top"># launch-room</div>
          <div className="mock-body">
            <aside>
              <strong>Channels</strong>
              <span># general</span>
              <span># product</span>
              <span># frontend</span>
              <span># backend</span>
            </aside>
            <main>
              <article>
                <b>Mia</b>
                <p>Need QA on auth edge cases before release.</p>
              </article>
              <article>
                <b>Noah</b>
                <p>Load tests are stable. Shipping in 30 minutes.</p>
              </article>
              <article>
                <b>Ava</b>
                <p>Final UI patch merged. Ready for deploy.</p>
              </article>
            </main>
          </div>
        </div>
      </div>

      <section id="features" className="neo-features">
        <article className="neo-feature-card">
          <h3>Channel-First Communication</h3>
          <p>Organize every squad into purpose-built rooms with focused context and clean handoffs.</p>
        </article>
        <article className="neo-feature-card">
          <h3>Integrated AI Assistant</h3>
          <p>Generate release notes, summarize standups, and unblock engineers directly in chat.</p>
        </article>
        <article className="neo-feature-card">
          <h3>Live Delivery Visibility</h3>
          <p>Track deployments, QA status, and incidents with updates streamed in real time.</p>
        </article>
      </section>

      <section id="workflow" className="neo-process">
        <h2>How Teams Use DevRooms</h2>
        <div className="neo-process-grid">
          <div className="neo-step">
            <span>01</span>
            <h4>Create Rooms</h4>
            <p>Spin up chat channels for sprint goals, incidents, and release windows.</p>
          </div>
          <div className="neo-step">
            <span>02</span>
            <h4>Ship Together</h4>
            <p>Collaborate with engineering, product, and QA in one synchronized workspace.</p>
          </div>
          <div className="neo-step">
            <span>03</span>
            <h4>Review Fast</h4>
            <p>Use AI summaries and activity feeds to decide quickly and move forward.</p>
          </div>
        </div>
      </section>

      <section id="metrics" className="neo-metrics">
        <div>
          <strong>250+</strong>
          <span>Active engineering teams</span>
        </div>
        <div>
          <strong>1.2M</strong>
          <span>Messages processed weekly</span>
        </div>
        <div>
          <strong>99.95%</strong>
          <span>Platform reliability target</span>
        </div>
      </section>

      <section className="neo-cta-band">
        <h2>Ready to run your team like a high-speed command center?</h2>
        <div className="neo-actions">
          <button className="neo-btn neo-btn-purple" onClick={onEnterDashboard}>Launch Workspace</button>
          <button className="neo-btn neo-btn-yellow" onClick={onEnterChat}>Explore Live Chat</button>
        </div>
      </section>

      <footer id="contact" className="neo-footer">
        <div className="neo-footer-brand">DevRooms</div>
        <div className="neo-footer-links">
          <a href="#">Product</a>
          <a href="#">Security</a>
          <a href="#">Docs</a>
          <a href="#">Support</a>
        </div>
        <p>© 2026 DevRooms, Inc. Built for modern engineering teams.</p>
      </footer>
    </section>
  );
}
