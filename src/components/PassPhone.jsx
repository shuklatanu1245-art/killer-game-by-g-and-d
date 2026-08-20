import { useState } from 'react';
import { ShieldQuestion, ArrowRight } from 'lucide-react';
import PassScreen from './PassScreen';

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

  if (!hasSeen) {
    return <PassScreen player={player} subtitle="Pass the phone to" onReveal={() => setHasSeen(true)} />;
  }

  return (
    <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[80vh] flex flex-col justify-center">
      <div className="space-y-6 animate-in fade-in zoom-in duration-500 w-full">
        <div className="text-6xl mb-4 animate-float">{player.avatar}</div>
        <h2 className="text-3xl font-black text-white mb-2">{player.name}</h2>
        
        <div className="bg-[#05070A] p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mt-8 relative overflow-hidden">
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${roleInfo.color.replace('text', 'from')} to-transparent mix-blend-screen`}></div>
          <p className="text-gray-500 mb-4 font-bold tracking-widest text-xs uppercase relative z-10">Your secret role is</p>
          <h2 className={`text-5xl font-black ${roleInfo.color} drop-shadow-[0_0_20px_currentColor] relative z-10 tracking-wider`}>
            {player.role}
          </h2>
          <div className="text-6xl mt-6 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {roleInfo.emoji}
          </div>
        </div>
        
        <button 
          onClick={onNext}
          className="w-full flex items-center justify-center gap-3 glass-btn py-5 px-6 rounded-2xl group mt-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          HIDE & NEXT PLAYER <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
