export const ProgressBar = ({ progress }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
    <div 
      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000"
      style={{ width: `${progress}%` }}
    />
  </div>
);