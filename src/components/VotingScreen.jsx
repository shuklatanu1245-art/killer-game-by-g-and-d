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
      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Vote Cast!</h2>
        <button 
          onClick={() => onVoteComplete(votes.consensus)}
          className="w-full bg-surface text-white font-bold py-4 px-6 rounded-xl border border-white/10 hover:bg-surface/80"
        >
          SEE RESULTS
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 max-w-md w-full relative z-10 shadow-2xl flex flex-col h-[80vh]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-primary mb-2">Day Phase</h2>
        <p className="text-gray-400">Discuss for 30s, then agree who to vote out.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
        {alivePlayers.map(p => (
          <button
            key={p.id}
            onClick={() => handleVote(p.id)}
            className="w-full flex items-center p-4 rounded-xl bg-surface border border-transparent hover:border-primary transition-all group"
          >
            <div className="flex-1 text-left text-lg font-bold text-white">{p.name}</div>
            <Gavel className="text-gray-600 group-hover:text-primary transition-colors" />
          </button>
        ))}
        
        <button
          onClick={() => handleVote(null)} // Skip vote
          className="w-full flex items-center justify-center p-4 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-500 text-gray-400 font-bold transition-all mt-4"
        >
          SKIP VOTE
        </button>
      </div>
    </div>
  );
}
