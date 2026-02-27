export const Card = ({ children, className = "", hover = true }) => (
  <div className={`
    bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
    transition-all duration-300 shadow-2xl
    ${hover ? 'hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:-translate-y-1' : ''}
    ${className}
  `}>
    {children}
  </div>
);