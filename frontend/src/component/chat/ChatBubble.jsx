// src/components/chat/ChatBubble.jsx
export const ChatBubble = ({ message, isAI, sender, time }) => (
  <div className={`flex flex-col mb-6 ${isAI ? 'items-start' : 'items-end'}`}>
    <div className="flex items-center gap-2 mb-1 px-2">
      <span className="text-xs font-semibold text-gray-400">{sender}</span>
      <span className="text-[10px] text-gray-600">{time}</span>
    </div>
    <div className={`
      max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
      ${isAI 
        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
        : 'bg-white/5 border border-white/10 text-gray-200'}
    `}>
      {message.includes('```') ? (
        <pre className="bg-black/40 p-3 rounded-lg mt-2 font-mono text-amber-200 overflow-x-auto border border-white/5">
          <code>{message.replace(/```/g, '')}</code>
        </pre>
      ) : message}
    </div>
  </div>
);