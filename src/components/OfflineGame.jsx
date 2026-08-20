import { useState, useEffect } from 'react';
import PassPhone from './PassPhone';
import NightAction from './NightAction';
import VotingScreen from './VotingScreen';
import { distributeRoles, checkWinCondition, ROLES, TEAMS } from '../gameLogic';
import { playHeartbeat, playChime } from '../utils/soundManager';

export default function OfflineGame({ playerNames, onEndGame }) {
  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState('setup'); // setup -> reveal -> night -> day -> game-over
  const [turnIndex, setTurnIndex] = useState(0);
  const [nightActions, setNightActions] = useState({});
  const [deadThisNight, setDeadThisNight] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (phase === 'setup') {
      setPlayers(distributeRoles(playerNames));
      setPhase('reveal');
    }
  }, [phase, playerNames]);

  const handleNextReveal = () => {
    if (turnIndex + 1 < players.length) {
      setTurnIndex(turnIndex + 1);
    } else {
      setTurnIndex(0);
      setPhase('night');
      setNightActions({});
      // Start heartbeat
      const heartbeatInterval = setInterval(() => {
         playHeartbeat();
      }, 1500);
      window.currentHeartbeat = heartbeatInterval;
    }
  };

  const handleNightAction = (targetId, actingRole) => {
    // Record action if it's from a role that actually acts
    const newActions = { ...nightActions };
    if (actingRole === ROLES.KILLER || actingRole === ROLES.DOCTOR) {
       newActions[actingRole] = targetId;
    }
    setNightActions(newActions);

    const alivePlayers = players.filter(p => p.isAlive);
    if (turnIndex + 1 < alivePlayers.length) {
      setTurnIndex(turnIndex + 1);
    } else {
      processNightEnd(newActions);
    }
  };

  const processNightEnd = (finalActions) => {
    if (window.currentHeartbeat) {
       clearInterval(window.currentHeartbeat);
    }

    let killedId = finalActions[ROLES.KILLER];
    const healedId = finalActions[ROLES.DOCTOR];

    if (killedId && killedId === healedId) {
      killedId = null; // Saved by doctor!
    }

    if (killedId) {
      setPlayers(prev => prev.map(p => p.id === killedId ? { ...p, isAlive: false } : p));
    }

    setDeadThisNight(killedId);
    setPhase('day');
  };

  const handleVoteComplete = (votedId) => {
    if (votedId) {
      setPlayers(prev => prev.map(p => p.id === votedId ? { ...p, isAlive: false } : p));
    }

    // Check Win Condition with new data
    const updatedPlayers = players.map(p => p.id === votedId ? { ...p, isAlive: false } : p);
    const winTeam = checkWinCondition(updatedPlayers, votedId);

    if (winTeam) {
      setWinner(winTeam);
      setPhase('game-over');
      playChime();
    } else {
      setTurnIndex(0);
      setPhase('night');
      setNightActions({});
      setDeadThisNight(null);
      // Resume heartbeat
      const heartbeatInterval = setInterval(() => {
         playHeartbeat();
      }, 1500);
      window.currentHeartbeat = heartbeatInterval;
    }
  };

  if (phase === 'reveal' && players.length > 0) {
    return <PassPhone key={`reveal-${turnIndex}`} player={players[turnIndex]} onNext={handleNextReveal} />;
  }

  if (phase === 'night') {
    const alivePlayers = players.filter(p => p.isAlive);
    const currentPlayer = alivePlayers[turnIndex];
    
    if (currentPlayer) {
      return (
        <NightAction 
          key={`night-${turnIndex}-${currentPlayer.id}`}
          role={currentPlayer.role} 
          player={currentPlayer} 
          allPlayers={players} 
          onAction={handleNightAction} 
        />
      );
    }
  }

  if (phase === 'day') {
    return (
      <div className="flex flex-col items-center w-full h-full">
        {/* Mockup Top Info */}
        <div className="w-full max-w-md text-left mb-4 pt-4 px-2">
          <h1 className="text-2xl font-black tracking-widest text-primary/80 drop-shadow-md uppercase mb-1">RedRole</h1>
          <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">CURRENT GAME</p>
          <p className="text-white text-sm font-black tracking-widest uppercase">THE OBSIDIAN ESTATE</p>
        </div>

        <div className="glass-panel p-6 max-w-md w-full text-center relative z-10 mb-4">
          <p className="text-gray-400 text-xs tracking-widest font-bold uppercase mb-3">GAME IN PROGRESS</p>
          <h2 className="text-primary text-sm tracking-widest font-black uppercase mb-3 flex items-center justify-center gap-2">
            <span className="text-lg">☀️</span> DAY PHASE: DISCUSSION
          </h2>
          <div className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(255,105,180,0.4)] mb-4 font-mono tracking-tighter">
            {deadThisNight ? 'KILL' : 'SAFE'}
          </div>
          <div className="text-xs text-gray-400 font-bold tracking-widest uppercase flex items-center justify-center divide-x divide-white/20">
            <span className="pr-3 text-white">{players.filter(p=>p.isAlive).length} PLAYERS ALIVE</span>
            <span className="pl-3">{players.filter(p=>!p.isAlive).length} ELIMINATED</span>
          </div>
        </div>

        <VotingScreen players={players} onVoteComplete={handleVoteComplete} />
      </div>
    );
  }

  if (phase === 'game-over') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-full flex flex-col justify-center">
        <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-widest drop-shadow-[0_0_20px_currentColor]">GAME OVER</h2>
        <h3 className={`text-3xl font-black mb-8 uppercase tracking-widest drop-shadow-md ${winner === TEAMS.IMPOSTOR ? 'text-primary' : 'text-accent'}`}>
          {winner}S WIN!
        </h3>
        
        <div className="text-left bg-[#05070A] border border-white/5 p-4 rounded-xl mb-8 space-y-2 shadow-inner max-h-48 overflow-y-auto custom-scrollbar">
          <p className="text-gray-500 font-bold tracking-widest text-xs uppercase mb-2">Final Roles:</p>
          {players.map(p => (
            <div key={p.id} className="flex justify-between border-b border-white/5 pb-2 mt-2">
              <span className={`font-bold uppercase tracking-wider ${p.isAlive ? 'text-white' : 'text-gray-600 line-through'}`}>
                 {p.avatar} {p.name}
              </span>
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">{p.role}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
             const isImposterWin = winner === TEAMS.IMPOSTOR;
             const winningIds = players.filter(p => {
                 if (isImposterWin) return p.role === ROLES.KILLER || p.role === ROLES.JOKER;
                 return p.role !== ROLES.KILLER && p.role !== ROLES.JOKER; // civilians win
             }).map(p => p.id);
             onEndGame(winningIds);
          }}
          className="w-full glass-btn glass-btn-red py-4 px-6 rounded-xl font-black tracking-widest uppercase"
        >
          BACK TO HUB
        </button>
      </div>
    );
  }

  return <div className="text-white">Loading Game State...</div>;
}
