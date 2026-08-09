import { useState, useEffect } from 'react';
import PassPhone from './PassPhone';
import NightAction from './NightAction';
import VotingScreen from './VotingScreen';
import { distributeRoles, checkWinCondition, ROLES, TEAMS } from '../gameLogic';

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
    } else {
      setTurnIndex(0);
      setPhase('night');
      setNightActions({});
      setDeadThisNight(null);
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
      <div className="flex flex-col items-center justify-center w-full">
        <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl mb-6">
          <h2 className="text-4xl font-black text-white mb-4">Sun Rises</h2>
          {deadThisNight ? (
            <p className="text-xl text-primary font-bold">Someone was killed last night...</p>
          ) : (
            <p className="text-xl text-accent font-bold">The night was peaceful. No one died.</p>
          )}
        </div>
        <VotingScreen players={players} onVoteComplete={handleVoteComplete} />
      </div>
    );
  }

  if (phase === 'game-over') {
    return (
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl">
        <h2 className="text-5xl font-black text-white mb-6">GAME OVER</h2>
        <h3 className={`text-3xl font-bold mb-8 ${winner === TEAMS.IMPOSTOR ? 'text-primary' : 'text-accent'}`}>
          {winner}s Win!
        </h3>
        
        <div className="text-left bg-gray-800/50 p-4 rounded-xl mb-8 space-y-2">
          <p className="text-gray-400 font-bold mb-2">Final Roles:</p>
          {players.map(p => (
            <div key={p.id} className="flex justify-between border-b border-gray-700 pb-1">
              <span className={p.isAlive ? 'text-white' : 'text-gray-500 line-through'}>{p.name}</span>
              <span className="text-gray-400">{p.role}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onEndGame}
          className="w-full bg-white text-black font-bold py-4 px-6 rounded-xl hover:bg-gray-200"
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return <div className="text-white">Loading Game State...</div>;
}
