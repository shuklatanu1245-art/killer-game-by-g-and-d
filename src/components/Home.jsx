import { Play, ShieldAlert, Ghost, Info, PenTool } from 'lucide-react';

export default function Home({ onPlayGame, onShowInstructions }) {
  return (
    <div className="w-full flex flex-col h-full overflow-hidden p-6">
      <div className="mb-8 pt-4 text-left">
        <h1 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-md">
          Creovate<br /><span className="text-primary">Games</span>
        </h1>
        <p className="text-gray-500 text-xs tracking-widest font-bold uppercase mt-2">Offline Party Hub</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2 pb-8">
        
        {/* RedRole Game Card */}
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full filter blur-[50px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-white tracking-wider uppercase mb-1">RedRole</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert size={14} className="text-primary" /> Deception / Social
              </p>
            </div>
            <div className="w-12 h-12 glass-panel flex items-center justify-center rotate-3 border-primary/30">
               <span className="text-xl font-black text-white -rotate-3">RR</span>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => onPlayGame('redrole')}
              className="flex-1 flex items-center justify-center gap-2 glass-btn glass-btn-red py-3 rounded-xl uppercase font-bold tracking-widest text-sm"
            >
              <Play size={16} className="fill-current" />
              PLAY
            </button>
            <button 
              onClick={() => onShowInstructions('redrole')}
              className="w-12 h-12 flex items-center justify-center glass-btn py-3 rounded-xl"
            >
              <Info size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Imposter Word Game Card */}
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full filter blur-[50px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-white tracking-wider uppercase mb-1">Imposter Word</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Ghost size={14} className="text-emerald-500" /> Deduction / Secret
              </p>
            </div>
            <div className="w-12 h-12 glass-panel flex items-center justify-center -rotate-3 border-emerald-500/30">
               <span className="text-xl font-black text-white rotate-3">IW</span>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => onPlayGame('imposter')}
              className="flex-1 flex items-center justify-center gap-2 glass-btn py-3 rounded-xl uppercase font-bold tracking-widest text-sm hover:border-emerald-500/50 text-emerald-400"
            >
              <Play size={16} className="fill-current" />
              PLAY
            </button>
            <button 
              onClick={() => onShowInstructions('imposter')}
              className="w-12 h-12 flex items-center justify-center glass-btn py-3 rounded-xl"
            >
              <Info size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Sketch & Guess Game Card */}
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-[50px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-white tracking-wider uppercase mb-1">Sketch & Guess</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <PenTool size={14} className="text-blue-500" /> Drawing / Comedy
              </p>
            </div>
            <div className="w-12 h-12 glass-panel flex items-center justify-center rotate-3 border-blue-500/30">
               <span className="text-xl font-black text-white -rotate-3">SG</span>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => onPlayGame('sketch')}
              className="flex-1 flex items-center justify-center gap-2 glass-btn py-3 rounded-xl uppercase font-bold tracking-widest text-sm hover:border-blue-500/50 text-blue-400"
            >
              <Play size={16} className="fill-current" />
              PLAY
            </button>
            <button 
              onClick={() => onShowInstructions('sketch')}
              className="w-12 h-12 flex items-center justify-center glass-btn py-3 rounded-xl"
            >
              <Info size={20} className="text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
