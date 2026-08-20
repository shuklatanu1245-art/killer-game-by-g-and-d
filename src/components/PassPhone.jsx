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
    <div className="glass-panel p-8 max-w-md w-full text-center relative z-10">
      <h2 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-widest">Pass the Phone to</h2>
      <div className="text-6xl mb-4">{player.avatar}</div>
      <h1 className="text-5xl font-black text-white mb-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{player.name}</h1>

      {!hasSeen ? (
        <button 
          onClick={() => setHasSeen(true)}
          className="w-full flex items-center justify-center gap-3 glass-btn glass-btn glass-btn-red py-4 px-6 rounded-xl"
        >
          <Eye size={20} />
          SHOW MY ROLE
        </button>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#05070A] p-6 rounded-2xl border border-white/10 shadow-inner mt-4">
            <p className="text-gray-500 mb-2 font-bold tracking-widest text-xs uppercase">Your secret role is</p>
            <h2 className={`text-4xl font-black ${roleInfo.color} drop-shadow-[0_0_15px_currentColor]`}>
              {player.role} {roleInfo.emoji}
            </h2>
          </div>
          
          <button 
            disabled
            className="w-full flex items-center justify-center gap-3 glass-input text-gray-600 font-black tracking-widest py-4 px-6 rounded-xl cursor-not-allowed border border-white/5"
          >
            <ShieldQuestion size={20} />
            ROLE REVEALED
          </button>

          <button 
            onClick={onNext}
            className="w-full flex items-center justify-center gap-3 glass-btn py-4 px-6 rounded-xl group"
          >
            NEXT PLAYER <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
