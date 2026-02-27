// src/pages/Dashboard.jsx
import { Card } from "../component/ui/Card";
import { Badge } from "../component/ui/Badge";
import { Tag } from "../component/ui/Tag";
import { ProgressBar } from "../component/ui/ProgressBar";

const PhaseCard = ({ phase, title, marks, progress, items }) => (
  <Card className="flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div>
        <Badge>{phase}</Badge>
        <h3 className="mt-2 text-xl font-serif text-white">{title}</h3>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-amber-500">{marks}</span>
        <span className="text-gray-500 text-sm block">Marks</span>
      </div>
    </div>
    
    <ProgressBar progress={progress} />
    
    <div className="grid grid-cols-2 gap-2 mt-2">
      {items.map(item => <Tag key={item} text={item} />)}
    </div>
  </Card>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 p-8 font-sans selection:bg-amber-500/30">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center py-20">
        <h1 className="text-6xl font-serif text-white mb-6">
          AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Dev Chat</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The premium collaborative environment for engineers. Real-time debugging, 
          AI-pair programming, and seamless workflow management.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95">
            Create Room
          </button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95">
            Browse Rooms
          </button>
        </div>
      </section>

      {/* Phase Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <PhaseCard 
          phase="Phase 01" title="Design Module" marks="15/20" progress={75}
          items={["Palette consistency", "UI/UX coverage", "Spacing discipline", "Typography"]}
        />
        <PhaseCard 
          phase="Phase 02" title="Workflow Docs" marks="18/20" progress={90}
          items={["Logic flow", "API specs", "State management", "Edge cases"]}
        />
        <PhaseCard 
          phase="Phase 03" title="Development" marks="05/20" progress={25}
          items={["Auth system", "Real-time DB", "AI Integration", "Deployment"]}
        />
      </div>
    </div>
  );
}
