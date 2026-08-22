import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard({ players }) {
  const sortedPlayers = [...players].filter(p => p.name.trim().length > 0).sort((a, b) => b.score - a.score);

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="text-center mb-6 pt-6">
        <h2 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">Game Night<br/>Champion</h2>
        <p className="text-primary text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-1 mt-2">
          <Trophy size={14} /> Total Score
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar pb-8">
        {sortedPlayers.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 uppercase font-bold tracking-widest text-sm">
            No active players yet
          </div>
        ) : (
          sortedPlayers.map((player, index) => (
            <div key={player.id} className="glass-panel p-4 flex items-center relative overflow-hidden group">
              
              {index === 0 && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full filter blur-[50px] opacity-20 pointer-events-none"></div>
              )}
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black mr-4 border ${index === 0 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : index === 1 ? 'bg-gray-300/20 text-gray-300 border-gray-300/50' : index === 2 ? 'bg-amber-700/20 text-amber-700 border-amber-700/50' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                {index + 1}
              </div>
              
              <div className="text-3xl mr-4 drop-shadow-md">
                {player.avatar}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-black text-lg uppercase tracking-wider ${index === 0 ? 'text-yellow-500' : 'text-white'}`}>{player.name}</h3>
              </div>
              
              <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Star size={14} className="text-primary" />
                <span className="font-black text-white">{player.score}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
