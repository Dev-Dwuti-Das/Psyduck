import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const initialMessages = [
  { id: 'm-1', user: 'Ava', time: '10:14', text: 'Pushed the auth middleware update to `feature/auth-v2`.' },
  { id: 'm-2', user: 'Noah', time: '10:16', text: 'Nice. I will test refresh token expiry on staging.' },
  { id: 'm-3', user: 'Mia (AI)', time: '10:17', text: 'Reminder: run `npm run lint` before opening PR.', isBot: true },
  { id: 'm-4', user: 'Liam', time: '10:20', text: 'Can someone review the websocket reconnect patch?' },
];

const members = ['Ava', 'Noah', 'Mia (AI)', 'Liam', 'Sofia', 'Ethan'];

export default function ChatRoom({ onGoHome, account }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const [brushColor, setBrushColor] = useState('#111111');
  const [brushSize, setBrushSize] = useState(4);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draftMessage, setDraftMessage] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const point = getPoint(event);
    isDrawingRef.current = true;
    lastPointRef.current = point;
    canvas.setPointerCapture?.(event.pointerId);
  };

  const draw = (event) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const point = getPoint(event);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  };

  const stopDrawing = (event) => {
    isDrawingRef.current = false;
    canvasRef.current?.releasePointerCapture?.(event.pointerId);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadBoard = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'devrooms-whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const nextId = () => `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const buildAiReply = (input) => {
    const text = input.toLowerCase();
    if (/^\/help/.test(text)) {
      return 'AI tips: use ```js ... ``` to share code, ask "explain this", "find bug", or "optimize".';
    }
    if (isCodeMessage(input)) {
      const { language, code } = parseCodeMessage(input);
      return `Nice ${language} snippet. Quick review: keep functions small, handle errors, and add tests for edge cases. I can also refactor this if you paste requirements.`;
    }
    if (text.includes('error') || text.includes('bug') || text.includes('fix')) {
      return 'Debug checklist: reproduce reliably, isolate smallest failing path, inspect recent changes, then add a regression test.';
    }
    if (text.includes('explain')) {
      return 'Share the code block and I will explain it line-by-line with complexity and edge cases.';
    }
    if (text.includes('optimize') || text.includes('performance')) {
      return 'Optimization path: measure first, remove unnecessary re-renders, batch state updates, and memoize expensive computations.';
    }
    return 'Received. I can help with code review, debugging, architecture tradeoffs, or writing snippets. Try `/help` for quick commands.';
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const sendMessage = () => {
    const trimmed = draftMessage.trim();
    if (!trimmed) return;
    const userMessage = {
      id: nextId(),
      user: (account?.displayName || 'You').trim() || 'You',
      time: getCurrentTime(),
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setDraftMessage('');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const botMessage = {
        id: nextId(),
        user: 'Mia (AI)',
        time: getCurrentTime(),
        text: buildAiReply(trimmed),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  const isCodeMessage = (text) => /^```[\w-]*\n[\s\S]*\n```$/.test(text.trim());

  const parseCodeMessage = (text) => {
    const match = text.trim().match(/^```([\w-]*)\n([\s\S]*)\n```$/);
    return {
      language: match?.[1] || 'text',
      code: match?.[2] || text,
    };
  };

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
          {!isWhiteboardOpen && (
            <button type="button" className="neo-chat-home-btn" onClick={() => setIsWhiteboardOpen(true)}>
              Whiteboard
            </button>
          )}
          <button type="button" className="neo-chat-home-btn" onClick={onGoHome}>
            Home
          </button>
        </div>
        <div className="neo-message-list">
          {messages.map((message) => (
            <article key={message.id} className={`neo-message-row ${message.isBot ? 'neo-message-row-bot' : ''}`}>
              <div className="neo-avatar">{message.user[0]}</div>
              <div>
                <div className="neo-message-meta">
                  <strong>{message.user}</strong>
                  <span>{message.time}</span>
                </div>
                {isCodeMessage(message.text) ? (
                  <div className="neo-code-block">
                    <SyntaxHighlighter language={parseCodeMessage(message.text).language} style={oneDark}>
                      {parseCodeMessage(message.text).code}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {isWhiteboardOpen && (
          <div className="neo-whiteboard-wrap">
            <div className="neo-whiteboard-toolbar">
              <strong>Virtual Whiteboard</strong>
              <label>
                Color
                <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
              </label>
              <label>
                Brush
                <input
                  type="range"
                  min="1"
                  max="18"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                />
              </label>
              <button type="button" onClick={clearBoard}>Clear</button>
              <button type="button" onClick={downloadBoard}>Save</button>
              <button type="button" onClick={() => setIsWhiteboardOpen(false)}>Close</button>
            </div>
            <canvas
              ref={canvasRef}
              className="neo-whiteboard-canvas"
              width={900}
              height={260}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </div>
        )}

        <div className="neo-chat-input-wrap">
          <button
            type="button"
            className="neo-chat-ai-btn"
            onClick={() => setDraftMessage((prev) => (prev ? `${prev} ` : '') + '@Mia ')}
          >
            AI
          </button>
          <input
            placeholder={'Message #general (use ```js ... ``` for code)'}
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button type="button" onClick={sendMessage}>Send</button>
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
