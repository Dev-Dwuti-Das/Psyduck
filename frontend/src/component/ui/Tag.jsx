export const Tag = ({ text }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-amber-200 hover:bg-white/10 cursor-default transition-colors">
    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_#f59e0b]" />
    {text}
  </div>
);