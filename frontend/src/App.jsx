import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import './App.css';

const themePresets = [
  { id: 'cyber-night', label: 'Cyber Night', tone: 'dark', bg: '#0b1020', surface: '#121a2c', primary: '#64ffda', secondary: '#3b82f6', onPrimary: '#021510', onSecondary: '#fff', chatCardBg: '#2b3245', chatCardText: '#eef2ff', chatMeta: '#b5bfd9', chatBotBg: '#2c2a55' },
  { id: 'violet-terminal', label: 'Violet Terminal', tone: 'dark', bg: '#0f0a1f', surface: '#1a1430', primary: '#facc15', secondary: '#8b5cf6', onPrimary: '#231a03', onSecondary: '#fff', chatCardBg: '#312e48', chatCardText: '#f5f3ff', chatMeta: '#c8bfe8', chatBotBg: '#3f3266' },
  { id: 'forest-debug', label: 'Forest Debug', tone: 'dark', bg: '#07110a', surface: '#102116', primary: '#86efac', secondary: '#16a34a', onPrimary: '#031107', onSecondary: '#fff', chatCardBg: '#263a2d', chatCardText: '#ecfdf3', chatMeta: '#b4d3bf', chatBotBg: '#244b32' },
  { id: 'graphite-pro', label: 'Graphite Pro', tone: 'dark', bg: '#111111', surface: '#1a1a1a', primary: '#d1d5db', secondary: '#2563eb', onPrimary: '#111', onSecondary: '#fff', chatCardBg: '#2f2f2f', chatCardText: '#f3f4f6', chatMeta: '#c0c5d1', chatBotBg: '#2a3553' },
  { id: 'cream-pop', label: 'Cream Pop', tone: 'bright', bg: '#f8f4e6', surface: '#fff8dc', primary: '#facc15', secondary: '#7c3aed', onPrimary: '#111', onSecondary: '#fff', chatCardBg: '#fff6d7', chatCardText: '#191919', chatMeta: '#4f4f4f', chatBotBg: '#efe6ff' },
  { id: 'mint-paper', label: 'Mint Paper', tone: 'bright', bg: '#eefcf5', surface: '#f9fff8', primary: '#34d399', secondary: '#2563eb', onPrimary: '#042116', onSecondary: '#fff', chatCardBg: '#e7fff2', chatCardText: '#102118', chatMeta: '#37605a', chatBotBg: '#e8efff' },
  { id: 'sunset-note', label: 'Sunset Note', tone: 'bright', bg: '#fff1eb', surface: '#fff8f6', primary: '#fb923c', secondary: '#db2777', onPrimary: '#2a1002', onSecondary: '#fff', chatCardBg: '#ffe7db', chatCardText: '#2c1306', chatMeta: '#7a4d42', chatBotBg: '#ffe2f0' },
  { id: 'sky-notebook', label: 'Sky Notebook', tone: 'bright', bg: '#eef7ff', surface: '#f6fbff', primary: '#38bdf8', secondary: '#4f46e5', onPrimary: '#02141d', onSecondary: '#fff', chatCardBg: '#e4f2ff', chatCardText: '#0d2230', chatMeta: '#4a6a81', chatBotBg: '#e6e7ff' },
];

function App() {
  const [view, setView] = useState('landing');
  const [activePreset, setActivePreset] = useState(themePresets[1]);
  const [account, setAccount] = useState(() => {
    const stored = localStorage.getItem('devrooms.account');
    return stored
      ? JSON.parse(stored)
      : {
          displayName: 'You',
          email: '',
          role: 'Developer',
          statusMessage: 'Building cool things',
        };
  });
  const isBrightPreset = activePreset.tone === 'bright';
  const themeVars = {
    '--neo-primary': activePreset.primary,
    '--neo-secondary': activePreset.secondary,
    '--neo-on-primary': activePreset.onPrimary,
    '--neo-on-secondary': activePreset.onSecondary,
    '--neo-bg': activePreset.bg,
    '--neo-surface': activePreset.surface,
    '--neo-chat-card-bg': activePreset.chatCardBg,
    '--neo-chat-card-text': activePreset.chatCardText,
    '--neo-chat-meta': activePreset.chatMeta,
    '--neo-chat-bot-bg': activePreset.chatBotBg,
    '--neo-text-main': isBrightPreset ? '#1f2937' : '#f2e8ff',
    '--neo-text-muted': isBrightPreset ? '#475569' : '#b9bed6',
    '--neo-on-surface': isBrightPreset ? '#111' : '#fff',
    '--neo-composer-bg': isBrightPreset ? activePreset.primary : activePreset.surface,
    '--neo-input-bg': isBrightPreset ? '#ffffff' : '#0f172a',
    '--neo-input-text': isBrightPreset ? '#111827' : '#e2e8f0',
    '--neo-input-placeholder': isBrightPreset ? '#6b7280' : '#94a3b8',
  };

  if (view === 'landing') {
    return (
      <Landing
        onEnterDashboard={() => setView('dashboard')}
        onEnterChat={() => setView('chat')}
        themeVars={themeVars}
      />
    );
  }

  return (
    <div className="discord-app" style={themeVars}>
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
            <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}>
              Settings
            </button>
          </div>
        </header>

        <main className="discord-workspace">
          {view === 'dashboard' && <Dashboard />}
          {view === 'chat' && <ChatRoom onGoHome={() => setView('landing')} account={account} />}
          {view === 'settings' && (
            <Settings
              presets={themePresets}
              activePreset={activePreset}
              onPresetChange={setActivePreset}
              account={account}
              onAccountChange={setAccount}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
