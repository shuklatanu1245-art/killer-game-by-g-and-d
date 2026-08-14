import { useState } from 'react';
import { Gavel } from 'lucide-react';

export default function VotingScreen({ players, onVoteComplete }) {
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const alivePlayers = players.filter(p => p.isAlive);

  const handleVote = (targetId) => {
    // In a simple pass & play, we might just have the group agree and tap once, 
    // or simulate each person passing and voting. Let's do a group consensus vote for offline speed.
    setVotes({ consensus: targetId });
    setHasVoted(true);
  };

  if (hasVoted) {
    return (
      <div className="metallic-panel p-8 max-w-md w-full text-center relative z-10">
        <h2 className="text-3xl font-black text-white mb-8 tracking-widest uppercase">Vote Cast!</h2>
        <button 
          onClick={() => onVoteComplete(votes.consensus)}
          className="w-full metallic-btn py-4 px-6 rounded-xl"
        >
          SEE RESULTS
        </button>
      </div>
    );
  }

  return (
    <div className="metallic-panel p-6 max-w-md w-full relative z-10 flex flex-col h-[80vh]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-primary mb-2 uppercase tracking-widest drop-shadow-[0_0_10px_currentColor]">Day Phase</h2>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Discuss for 30s, then agree who to vote out.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
        {alivePlayers.map(p => (
          <button
            key={p.id}
            onClick={() => handleVote(p.id)}
            className="w-full flex items-center p-4 rounded-xl bg-[#0B0F19] border border-white/5 hover:border-primary hover:shadow-[inset_0_0_20px_rgba(225,29,72,0.1)] transition-all group"
          >
            <div className="flex-1 text-left text-lg font-black text-white tracking-wider">{p.name}</div>
            <Gavel className="text-gray-600 group-hover:text-primary transition-colors" />
          </button>
        ))}
        
        <button
          onClick={() => handleVote(null)} // Skip vote
          className="w-full flex items-center justify-center p-4 rounded-xl bg-[#05070A] border border-white/10 hover:border-white/30 text-gray-500 font-black tracking-widest transition-all mt-4 uppercase"
        >
          SKIP VOTE
        </button>
      </div>
    </div>
  );
}
