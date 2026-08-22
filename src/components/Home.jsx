import { Play, Info } from 'lucide-react';

export default function Home({ onPlayGame, onShowInstructions }) {
  return (
    <div className="w-full flex flex-col h-full overflow-hidden p-6 relative">
      <div className="mb-6 pt-4 text-center z-10">
        <h1 className="text-3xl font-black text-primary tracking-widest uppercase drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">
          CREOVATE <span className="text-white">GAMES</span>
        </h1>
        <p className="text-gray-400 text-xs tracking-widest font-bold uppercase mt-1">THE PARTY HUB</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pb-8 z-10">
        <h2 className="text-lg font-black text-white tracking-widest uppercase mb-4 text-center">READY TO PLAY</h2>
        
        {/* Featured RedRole Card */}
        <div className="glass-panel p-4 relative overflow-hidden group border-primary/50 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
          <div className="absolute inset-0 bg-[url('/assets/featured_bg.jpg')] bg-cover bg-center opacity-40 mix-blend-screen pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center mb-4">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-lg text-center mt-2">RED ROLE</h2>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">4-10 Players | Strategy</p>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 mt-6">
            <button 
              onClick={() => onPlayGame('redrole')}
              className="flex-1 glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase text-sm"
            >
              PLAY NOW
            </button>
            <div className="w-24 h-12 rounded-xl overflow-hidden border border-white/20">
               <img src="/assets/gamers_thumb.jpg" alt="Gamers" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Imposter Word */}
          <div className="glass-panel p-4 flex flex-col items-center text-center justify-between border-white/5">
            <img src="/assets/imposter_icon.jpg" alt="Imposter" className="w-12 h-12 rounded-full mb-3 border border-primary/30 object-cover" />
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">IMPOSTER<br/>WORD</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">4-10 Players</p>
            </div>
            <button onClick={() => onPlayGame('imposter')} className="mt-4 w-full glass-btn-primary py-2 rounded-lg text-xs font-bold tracking-wider">JOIN</button>
          </div>

          {/* Taboo */}
          <div className="glass-panel p-4 flex flex-col items-center text-center justify-between border-white/5">
            <img src="/assets/taboo_icon.jpg" alt="Taboo" className="w-12 h-12 rounded-full mb-3 border border-primary/30 object-cover" />
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">TABOO<br/>STRIKE</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">4-10 Players</p>
            </div>
            <button onClick={() => onPlayGame('taboo')} className="mt-4 w-full glass-btn-primary py-2 rounded-lg text-xs font-bold tracking-wider">JOIN</button>
          </div>

        </div>

        {/* Sketch Game */}
        <div className="glass-panel p-4 flex items-center justify-between mt-4 border-white/5">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/20">
               <span className="font-black text-white">SG</span>
             </div>
             <div>
               <h3 className="font-bold text-white text-sm uppercase tracking-wider">SKETCH SURGE</h3>
               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Creative</p>
             </div>
           </div>
           <button onClick={() => onPlayGame('sketch')} className="glass-btn-primary px-6 py-2 rounded-lg text-xs font-bold tracking-wider">JOIN</button>
        </div>

      </div>
    </div>
  );
}
