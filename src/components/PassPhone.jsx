import { useState } from 'react';
import { Eye, ShieldQuestion, ArrowRight } from 'lucide-react';

export default function PassPhone({ player, onNext }) {
  const [hasSeen, setHasSeen] = useState(false);

  const getRoleInfo = (role) => {
    switch (role) {
      case 'Killer': return { color: 'text-red-500', emoji: '🔪' };
      case 'Doctor': return { color: 'text-green-500', emoji: '🩺' };
      case 'Detective': return { color: 'text-blue-500', emoji: '🕵️' };
      case 'Joker': return { color: 'text-purple-500', emoji: '🃏' };
      default: return { color: 'text-gray-400', emoji: '👤' };
    }
  };

  const roleInfo = getRoleInfo(player.role);

  return (
    <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
      <h2 className="text-3xl font-bold text-white mb-2">Pass the Phone to</h2>
      <h1 className="text-5xl font-extrabold text-primary mb-10">{player.name}</h1>

      {!hasSeen ? (
        <button 
          onClick={() => setHasSeen(true)}
          className="w-full group flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <Eye size={20} />
          SHOW MY ROLE
        </button>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/50 p-6 rounded-2xl border border-white/5 shadow-inner mt-4">
            <p className="text-gray-400 mb-2">Your secret role is</p>
            <h2 className={`text-4xl font-black ${roleInfo.color} drop-shadow-md`}>
              {player.role} {roleInfo.emoji}
            </h2>
          </div>
          
          <button 
            disabled
            className="w-full flex items-center justify-center gap-3 bg-black text-gray-600 font-bold py-4 px-6 rounded-xl cursor-not-allowed border border-gray-800"
          >
            <ShieldQuestion size={20} />
            ROLE REVEALED
          </button>

          <button 
            onClick={onNext}
            className="w-full group flex items-center justify-center gap-3 bg-surface hover:bg-surface/80 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            NEXT PLAYER <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
