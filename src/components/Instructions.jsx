import { useState } from 'react';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { GameInstructions } from '../utils/instructionsData';

export default function Instructions({ gameId, onComplete, onBack }) {
  const [page, setPage] = useState(0);

  const gameData = GameInstructions[gameId] || GameInstructions['redrole'];
  const slides = gameData.slides;

  return (
    <div className="glass-panel p-8 max-w-md w-full relative z-10 flex flex-col min-h-[70vh]">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mt-4 mb-8">
        <p className="text-primary text-xs tracking-widest font-bold uppercase mb-2">How to Play</p>
        <h2 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_currentColor]">{slides[page].title}</h2>
      </div>

      <div className="flex-1 mb-8">
        {slides[page].content}
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === page ? 'w-8 bg-primary' : 'w-2 bg-gray-700'}`} />
        ))}
      </div>

      <div className="mt-auto">
        {page < slides.length - 1 ? (
          <button 
            onClick={() => setPage(page + 1)}
            className="w-full flex items-center justify-center gap-3 glass-btn py-4 px-6 rounded-xl group"
          >
            NEXT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-3 glass-btn glass-btn-red py-4 px-6 rounded-xl group"
          >
            <CheckCircle2 size={20} />
            OK, LET'S PLAY!
          </button>
        )}
      </div>
    </div>
  );
}
