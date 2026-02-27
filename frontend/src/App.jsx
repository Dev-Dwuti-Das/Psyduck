import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import Landing from './pages/Landing';
import './App.css';

function App() {
  const [view, setView] = useState('landing');

  if (view === 'landing') {
    return <Landing onEnterDashboard={() => setView('dashboard')} onEnterChat={() => setView('chat')} />;
  }

  return (
    <div className="discord-app">
      <aside className="server-rail">
        <button className={`server-pill ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>DR</button>
        <button className={`server-pill ${view === 'chat' ? 'active' : ''}`} onClick={() => setView('chat')}>AI</button>
        <button className="server-pill">JS</button>
        <button className="server-pill" onClick={() => setView('landing')}>+</button>
      </aside>

      <div className="discord-shell">
        <header className="discord-topbar">
          <div className="brand">DevRooms</div>
          <div className="topbar-actions">
            <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>
              Dashboard
            </button>
            <button className={view === 'chat' ? 'active' : ''} onClick={() => setView('chat')}>
              Chat Room
            </button>
          </div>
        </header>

        <main className="discord-workspace">
          {view === 'dashboard' ? <Dashboard /> : <ChatRoom />}
        </main>
      </div>
    </div>
  );
}

export default App;
