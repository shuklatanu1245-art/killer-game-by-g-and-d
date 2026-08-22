import { useState } from 'react';
import { Gavel, Target } from 'lucide-react';
import PassScreen from './PassScreen';

export default function VotingScreen({ players, onVoteComplete }) {
  const [phase, setPhase] = useState('pass'); // pass, vote, confirm
  const [votingTurnIndex, setVotingTurnIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [selectedVoteTarget, setSelectedVoteTarget] = useState(null);

  const alivePlayers = players.filter(p => p.isAlive);
  const currentTurnPlayer = alivePlayers[votingTurnIndex];

  const submitSecretVote = () => {
    if (!selectedVoteTarget) return;
    
    const newVotes = { ...votes };
    newVotes[selectedVoteTarget] = (newVotes[selectedVoteTarget] || 0) + 1;
    setVotes(newVotes);
    setSelectedVoteTarget(null);

    if (votingTurnIndex + 1 < alivePlayers.length) {
      setVotingTurnIndex(votingTurnIndex + 1);
      setPhase('pass');
    } else {
      // Tally votes
      let maxVotes = 0;
      let targetId = null;
      let tie = false;
      
      Object.keys(newVotes).forEach(id => {
        if (newVotes[id] > maxVotes) {
          maxVotes = newVotes[id];
          targetId = id;
          tie = false;
        } else if (newVotes[id] === maxVotes) {
          tie = true;
        }
      });

      if (tie) {
        onVoteComplete(null); // No one eliminated
      } else {
        onVoteComplete(targetId);
      }
    }
  };

  const skipVote = () => {
    if (votingTurnIndex + 1 < alivePlayers.length) {
      setVotingTurnIndex(votingTurnIndex + 1);
      setPhase('pass');
    } else {
      // Tally votes
      let maxVotes = 0;
      let targetId = null;
      let tie = false;
      
      Object.keys(votes).forEach(id => {
        if (votes[id] > maxVotes) {
          maxVotes = votes[id];
          targetId = id;
          tie = false;
        } else if (votes[id] === maxVotes) {
          tie = true;
        }
      });

      if (tie) {
        onVoteComplete(null); // No one eliminated
      } else {
        onVoteComplete(targetId);
      }
    }
  }

  if (phase === 'pass') {
    return <PassScreen player={currentTurnPlayer} subtitle="Pass the phone to vote secretly" onReveal={() => setPhase('vote')} />;
  }

  return (
    <div className="w-full relative z-10 flex flex-col flex-1 h-full min-h-[70vh]">
      <div className="text-center mb-6">
        <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">{currentTurnPlayer.name}'s Turn</p>
        <h2 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-md mb-1">Secret Vote</h2>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Who is suspicious?</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
        {alivePlayers.filter(p => p.id !== currentTurnPlayer.id).map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedVoteTarget(p.id)}
            className={`w-full flex items-center p-3 rounded-2xl transition-all group ${
              selectedVoteTarget === p.id 
                ? 'bg-primary/20 border border-primary shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                : 'glass-panel border-white/5 hover:border-white/20'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-4 shadow-inner text-2xl">
              {p.avatar}
            </div>
            <div className="flex-1 text-left flex flex-col">
               <div className="text-white font-black tracking-wider text-base group-hover:text-primary transition-colors">
                 {p.name}
               </div>
            </div>
          </button>
        ))}
      </div>

      <div className="glass-panel-accent p-4 mt-auto">
        <button 
          disabled={!selectedVoteTarget}
          onClick={submitSecretVote}
          className={`w-full font-black py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 mb-4 ${
            selectedVoteTarget 
              ? 'glass-btn-primary animate-pulse text-white' 
              : 'bg-[#05070A] border border-white/5 text-gray-600 cursor-not-allowed tracking-widest'
          }`}
        >
          <Target size={20} />
          {selectedVoteTarget ? `LOCK IN VOTE` : `SELECT A PLAYER`}
        </button>

        <button
          onClick={skipVote}
          className="w-full flex items-center justify-center py-4 rounded-xl bg-transparent border border-gray-600 hover:border-white text-gray-400 hover:text-white font-black tracking-widest transition-all uppercase text-sm"
        >
          SKIP / PASS TURN
        </button>
      </div>
    </div>
  );
}
