import { useState, useEffect } from 'react';
import { UserPlus, UserMinus, Users } from 'lucide-react';

export default function Profiles({ globalPlayers, setGlobalPlayers }) {
  const [players, setPlayers] = useState(globalPlayers);

  useEffect(() => {
    setGlobalPlayers(players);
    localStorage.setItem('creovate_global_players', JSON.stringify(players));
  }, [players, setGlobalPlayers]);

  const handleNameChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    if (players.length < 10) {
      setPlayers([...players, '']);
    }
  };

  const handleRemovePlayer = (index) => {
    if (players.length > 4) {
      const newPlayers = [...players];
      newPlayers.splice(index, 1);
      setPlayers(newPlayers);
    }
  };

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="text-center mb-6 pt-6">
        <h2 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">Player Roster</h2>
        <p className="text-primary text-xs tracking-widest font-bold uppercase">Max 10 Players</p>
      </div>

      <div className="glass-panel p-6 mx-4 mb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Users className="text-primary" size={24} />
          <span className="text-2xl font-black text-white">{players.length}</span>
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Profiles</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 custom-scrollbar mb-4">
        {players.map((name, index) => (
          <div key={index} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-bold text-xs">#{index + 1}</span>
              </div>
              <input
                type="text"
                placeholder={`PLAYER NAME`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="block w-full pl-10 pr-3 py-3 glass-input border border-white/10 rounded-xl text-white placeholder-gray-600 font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner uppercase text-sm"
              />
            </div>
            {players.length > 4 && (
              <button 
                onClick={() => handleRemovePlayer(index)}
                className="w-12 h-12 flex flex-shrink-0 items-center justify-center glass-btn rounded-xl hover:border-primary group transition-all"
              >
                <UserMinus size={18} className="text-gray-500 group-hover:text-primary" />
              </button>
            )}
          </div>
        ))}
        
        {players.length < 10 && (
          <button 
            onClick={handleAddPlayer}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-white/20 hover:border-primary text-gray-500 hover:text-primary transition-all uppercase font-bold tracking-widest text-sm"
          >
            <UserPlus size={18} />
            Add Player
          </button>
        )}
      </div>
    </div>
  );
}
