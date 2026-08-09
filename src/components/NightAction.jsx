import { useState } from 'react';
import { Target, Heart, Search, ShieldQuestion, Moon } from 'lucide-react';

export default function NightAction({ role, player, allPlayers, onAction }) {
  const [hasSeen, setHasSeen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [actionCompleted, setActionCompleted] = useState(false);

  const getRoleConfig = () => {
    switch(role) {
      case 'Killer': return { icon: <Target />, color: 'text-primary', action: 'Kill', hasTarget: true };
      case 'Doctor': return { icon: <Heart />, color: 'text-accent', action: 'Heal', hasTarget: true };
      case 'Detective': return { icon: <Search />, color: 'text-blue-500', action: 'Investigate', hasTarget: true };
      default: return { icon: <Moon />, color: 'text-gray-400', action: 'Sleep', hasTarget: false };
    }
  };

  const config = getRoleConfig();
  // Filter valid targets for action roles
  const validTargets = allPlayers.filter(p => p.isAlive && (role === 'Killer' ? p.id !== player.id : true));

  const handleAction = () => {
    if (config.hasTarget && !selectedTarget) return;
    
    setActionCompleted(true);
    
    // Detective gets immediate feedback, others just wait a tiny bit for UX
    if (role === 'Detective') {
      const isKiller = validTargets.find(p => p.id === selectedTarget)?.role === 'Killer';
      setTimeout(() => {
        alert(isKiller ? "Right guess, it's a killer!" : "Wrong guess, it's not a killer.");
        onAction(selectedTarget, role);
      }, 300);
    } else {
      onAction(selectedTarget, role);
    }
  };

  const getRoleInfo = (role) => {
    switch (role) {
      case 'Killer': return { color: 'text-red-500', emoji: '🔪' };
      case 'Doctor': return { color: 'text-green-500', emoji: '🩺' };
      case 'Detective': return { color: 'text-blue-500', emoji: '🕵️' };
      case 'Joker': return { color: 'text-purple-500', emoji: '🃏' };
      default: return { color: 'text-gray-400', emoji: '😴' };
    }
  };

  const roleInfo = getRoleInfo(role);

  // PASS PHONE SCREEN (NO ROLE NAME SHOWN TO PREVENT METAGAMING)
  if (!hasSeen) {
    return (
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
        <h2 className={`text-3xl font-black ${roleInfo.color} mb-2`}>
          {role} {roleInfo.emoji}
        </h2>
        <p className="text-gray-300">Choose your target</p>
        <h1 className="text-5xl font-extrabold mb-10 text-white">{player.name}</h1>
        <button 
          onClick={() => setHasSeen(true)}
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-xl"
        >
          I AM READY
        </button>
      </div>
    );
  }

  // COMPLETED SCREEN
  if (actionCompleted) {
    return (
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
        <h2 className="text-3xl font-bold text-white mb-6">Action Completed.</h2>
        <button 
          onClick={() => onAction(selectedTarget, role)} // Trigger moving to next turn
          className="w-full bg-surface text-white font-bold py-4 px-6 rounded-xl border border-white/10 hover:bg-surface/80"
        >
          PASS TO NEXT PLAYER
        </button>
      </div>
    );
  }

  // FAKE SCREEN FOR CIVILIANS AND JOKERS
  if (!config.hasTarget) {
    return (
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
        <div className="mb-8">
          <Moon size={48} className="mx-auto text-gray-500 mb-4" />
          <h2 className="text-3xl font-black text-gray-400 mb-2">
            Shh... {roleInfo.emoji}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            You have no action tonight. Pretend to do something to confuse the others.
          </p>
        </div>
        <button 
          onClick={() => setActionCompleted(true)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl border border-white/10"
        >
          END TURN
        </button>
      </div>
    );
  }

  // REAL ACTION SCREEN FOR KILLER, DOCTOR, DETECTIVE
  return (
    <div className="glass rounded-3xl p-6 max-w-md w-full relative z-10 shadow-2xl border border-white/5 flex flex-col h-[80vh]">
      <div className="text-center mb-6">
        <h2 className={`text-xl font-bold ${config.color} mb-1`}>You are the {role}</h2>
        <p className="text-white">Select a player to {config.action}</p>
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
