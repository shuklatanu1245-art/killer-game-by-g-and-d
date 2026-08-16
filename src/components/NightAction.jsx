import { useState } from 'react';
import { Target, Heart, Search, ShieldQuestion, Moon } from 'lucide-react';

export default function NightAction({ role, player, allPlayers, onAction }) {
  const [hasSeen, setHasSeen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectiveResult, setDetectiveResult] = useState(null);

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
    
    // Detective gets a specialized delay and UI
    if (role === 'Detective') {
      setIsDetecting(true);
      const isKiller = validTargets.find(p => p.id === selectedTarget)?.role === 'Killer';
      
      setTimeout(() => {
        setIsDetecting(false);
        setDetectiveResult({ isKiller });
      }, 2500);
    } else {
      setActionCompleted(true);
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
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10">
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-8">Pass the phone to</p>
        <h1 className="text-5xl font-black mb-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{player.name}</h1>
        <button 
          onClick={() => setHasSeen(true)}
          className="w-full glass-btn glass-btn-red py-4 px-6 rounded-xl"
        >
          I AM READY
        </button>
      </div>
    );
  }

  // DETECTION LOADING SCREEN
  if (isDetecting) {
    return (
      <div className="glass-panel p-12 max-w-md w-full text-center relative z-10 flex flex-col items-center justify-center">
        <Search size={64} className="text-blue-500 animate-pulse mb-8 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
        <h2 className="text-2xl font-black text-white mb-2 tracking-widest uppercase animate-pulse">Detecting...</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Investigating target</p>
      </div>
    );
  }

  // DETECTIVE RESULT SCREEN
  if (detectiveResult) {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10">
        <div className="mb-10">
          {detectiveResult.isKiller ? (
            <>
              <Target size={64} className="mx-auto text-primary mb-6 drop-shadow-[0_0_30px_rgba(255,90,74,0.8)]" />
              <h2 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">Target is the Killer!</h2>
              <p className="text-primary text-sm font-bold tracking-widest uppercase">Your suspicion was correct.</p>
            </>
          ) : (
            <>
              <ShieldQuestion size={64} className="mx-auto text-accent mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
              <h2 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">Target is Clean.</h2>
              <p className="text-accent text-sm font-bold tracking-widest uppercase">They are not the killer.</p>
            </>
          )}
        </div>
        <button 
          onClick={() => {
            setDetectiveResult(null);
            setActionCompleted(true);
            onAction(selectedTarget, role);
          }}
          className="w-full glass-btn py-4 px-6 rounded-xl"
        >
          ACKNOWLEDGE & PASS
        </button>
      </div>
    );
  }

  // COMPLETED SCREEN
  if (actionCompleted) {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10">
        <h2 className="text-3xl font-black text-white mb-8 tracking-widest uppercase">Action Completed.</h2>
        <button 
          onClick={() => onAction(selectedTarget, role)}
          className="w-full glass-btn py-4 px-6 rounded-xl"
        >
          PASS TO NEXT PLAYER
        </button>
      </div>
    );
  }

  // FAKE SCREEN FOR CIVILIANS AND JOKERS
  if (!config.hasTarget) {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10">
        <div className="mb-12">
          <Moon size={48} className="mx-auto text-gray-600 mb-4 drop-shadow-md" />
          <h2 className="text-4xl font-black text-gray-500 mb-4 drop-shadow-md">
            Shh... {roleInfo.emoji}
          </h2>
          <p className="text-gray-400 text-sm font-bold tracking-wider leading-relaxed">
            You have no action tonight. Pretend to do something to confuse the others.
          </p>
        </div>
        <button 
          onClick={() => setActionCompleted(true)}
          className="w-full glass-btn py-4 px-6 rounded-xl"
        >
          END TURN
        </button>
      </div>
    );
  }

  // REAL ACTION SCREEN FOR KILLER, DOCTOR, DETECTIVE
  return (
    <div className="glass-panel p-6 max-w-md w-full relative z-10 flex flex-col h-[80vh]">
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-black uppercase tracking-widest ${config.color} drop-shadow-[0_0_10px_currentColor] mb-1`}>You are the {role}</h2>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Select a player to {config.action}</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
        {validTargets.map((t, index) => (
          <button
            key={t.id}
            onClick={() => setSelectedTarget(t.id)}
            className={`w-full flex items-center p-3 rounded-2xl transition-all group ${
              selectedTarget === t.id 
                ? 'bg-white/5 border border-primary shadow-[0_0_15px_rgba(255,90,74,0.15)]' 
                : 'glass-panel border-white/5 hover:border-white/20'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-4 shadow-inner overflow-hidden relative">
              <span className="text-gray-300 font-black text-sm relative z-10">{t.name.substring(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex-1 text-left flex flex-col">
               <div className="text-gray-500 text-[10px] uppercase font-bold mb-0.5 tracking-widest">
                 #{String(index + 1).padStart(2, '0')}
               </div>
               <div className="text-white font-black tracking-wider text-base leading-none mb-1 group-hover:text-primary transition-colors">
                 {t.name}
               </div>
            </div>
          </button>
        ))}
      </div>

      <button 
        disabled={!selectedTarget}
        onClick={handleAction}
        className={`w-full font-black py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 ${
          selectedTarget 
            ? 'glass-btn glass-btn-red' 
            : 'bg-[#05070A] border border-white/5 text-gray-600 cursor-not-allowed tracking-widest'
        }`}
      >
        {config.icon} CONFIRM {config.action.toUpperCase()}
      </button>
    </div>
  );
}
