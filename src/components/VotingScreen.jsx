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
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10">
        <h2 className="text-3xl font-black text-white mb-8 tracking-widest uppercase">Vote Cast!</h2>
        <button 
          onClick={() => onVoteComplete(votes.consensus)}
          className="w-full glass-btn py-4 px-6 rounded-xl"
        >
          SEE RESULTS
        </button>
      </div>
    );
  }

  return (
    <div className="w-full relative z-10 flex flex-col flex-1 h-full min-h-0">
      
      {/* Player List */}
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-4">
        {alivePlayers.map((p, index) => (
          <button
            key={p.id}
            onClick={() => handleVote(p.id)}
            className="w-full flex items-center p-3 rounded-2xl glass-panel hover:border-primary hover:shadow-[0_0_15px_rgba(255,105,180,0.15)] transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-4 shadow-inner overflow-hidden relative">
              <div className="absolute inset-0 bg-primary opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <span className="text-2xl relative z-10">{p.avatar}</span>
            </div>
            
            <div className="flex-1 text-left flex flex-col">
              <div className="text-gray-500 text-[10px] uppercase font-bold mb-0.5 tracking-widest">
                #{String(index + 1).padStart(2, '0')}
              </div>
              <div className="text-white font-black tracking-wider text-base leading-none mb-1 group-hover:text-primary transition-colors">
                {p.name}
              </div>
              <div className="text-accent text-[10px] font-bold uppercase tracking-widest">
                ALIVE
              </div>
            </div>
            
            <div className="flex flex-col items-end">
               <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1 group-hover:text-primary transition-colors">
                 VOTE
               </span>
               <Gavel size={16} className="text-gray-600 group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>

      {/* Action Area */}
      <div className="glass-panel-accent p-4 mt-auto">
        <p className="text-center text-xs tracking-widest font-bold uppercase text-gray-400 mb-3">VOTE / DISCUSS</p>
        <button
          onClick={() => handleVote(null)} // Skip vote / PASS
          className="w-full flex items-center justify-center py-4 rounded-xl bg-transparent border border-gray-600 hover:border-white text-gray-400 hover:text-white font-black tracking-widest transition-all uppercase text-sm"
        >
          PASS (SKIP VOTE)
        </button>
      </div>
    </div>
  );
}
