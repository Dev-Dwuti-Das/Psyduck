import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'chat'

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-amber-500/30 selection:text-amber-200">
      {/* Global Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div 
          className="font-serif text-2xl font-bold text-white cursor-pointer"
          onClick={() => setView('dashboard')}
        >
          Dev<span className="text-amber-500">Rooms</span>
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <button 
            onClick={() => setView('dashboard')}
            className={`hover:text-amber-400 transition-colors ${view === 'dashboard' ? 'text-amber-500' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setView('chat')}
            className={`hover:text-amber-400 transition-colors ${view === 'chat' ? 'text-amber-500' : ''}`}
          >
            Chat Rooms
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-16">
        {view === 'dashboard' ? <Dashboard /> : <ChatRoom />}
      </main>
      
      {/* Subtle Ambient Glow Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}

export default App;
