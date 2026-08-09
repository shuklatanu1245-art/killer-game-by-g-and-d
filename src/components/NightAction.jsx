import { useState } from 'react';
import { Target, Heart, Search, ShieldQuestion, ArrowRight } from 'lucide-react';

export default function NightAction({ role, player, allPlayers, onAction }) {
  const [hasSeen, setHasSeen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [actionCompleted, setActionCompleted] = useState(false);

  const getRoleConfig = () => {
    switch(role) {
      case 'Killer': return { icon: <Target />, color: 'text-primary', action: 'Kill' };
      case 'Doctor': return { icon: <Heart />, color: 'text-accent', action: 'Heal' };
      case 'Detective': return { icon: <Search />, color: 'text-blue-500', action: 'Investigate' };
      default: return { icon: <ShieldQuestion />, color: 'text-gray-400', action: 'Wait' };
    }
  };

  const config = getRoleConfig();
  // Filter out dead players, and depending on role, maybe filter self (Killer shouldn't kill self)
  const validTargets = allPlayers.filter(p => p.isAlive && (role === 'Killer' ? p.id !== player.id : true));

  const handleAction = () => {
    if (!selectedTarget) return;
    setActionCompleted(true);
    
    // Detective gets immediate feedback
    if (role === 'Detective') {
      const isKiller = validTargets.find(p => p.id === selectedTarget)?.role === 'Killer';
      setTimeout(() => {
        alert(isKiller ? "Right guess, it's a killer!" : "Wrong guess, it's not a killer.");
        onAction(selectedTarget);
      }, 500);
    } else {
      onAction(selectedTarget);
    }
  };

  if (!hasSeen) {
    return (
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
        <h2 className="text-3xl font-bold text-white mb-2">Pass the Phone to the</h2>
        <h1 className={`text-5xl font-extrabold mb-10 ${config.color}`}>{role} ({player.name})</h1>
        <button 
          onClick={() => setHasSeen(true)}
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-xl"
        >
          I AM READY
        </button>
      </div>
    );
  }

  if (actionCompleted) {
    return (
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
        <h2 className="text-3xl font-bold text-white mb-6">Action Completed.</h2>
        <button 
          onClick={() => onAction(selectedTarget)} // Trigger moving to next turn
          className="w-full bg-surface text-white font-bold py-4 px-6 rounded-xl border border-white/10 hover:bg-surface/80"
        >
          NEXT PLAYER
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 max-w-md w-full relative z-10 shadow-2xl border border-white/5 flex flex-col h-[80vh]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Select a player to {config.action}</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
        {validTargets.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTarget(t.id)}
            className={`w-full flex items-center p-4 rounded-xl border transition-all ${
              selectedTarget === t.id 
                ? 'bg-gray-800 border-white' 
                : 'bg-surface border-transparent hover:border-gray-600'
            }`}
          >
            <div className="flex-1 text-left text-lg font-bold text-white">{t.name}</div>
          </button>
        ))}
      </div>

      <button 
        disabled={!selectedTarget}
        onClick={handleAction}
        className={`w-full font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
          selectedTarget 
            ? 'bg-primary hover:bg-primary/90 text-white' 
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
      >
        {config.icon} CONFIRM {config.action.toUpperCase()}
      </button>
    </div>
  );
}
