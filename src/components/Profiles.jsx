import { useState, useEffect } from 'react';
import { UserPlus, UserMinus, Users, Award } from 'lucide-react';

const AVATARS = ['🦸‍♀️', '🤖', '🤡', '👻', '🤠', '👽', '🦖', '🦄', '🐱', '🐼', '🦊', '🐸', '🦉', '🐻', '🐯', '👤'];

export default function Profiles({ globalPlayers, setGlobalPlayers }) {
  const [players, setPlayers] = useState(globalPlayers);
  const [activeAvatarPicker, setActiveAvatarPicker] = useState(null);

  useEffect(() => {
    setGlobalPlayers(players);
    localStorage.setItem('creovate_global_players_v2', JSON.stringify(players));
  }, [players, setGlobalPlayers]);

  const handleNameChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name: value };
    setPlayers(newPlayers);
  };

  const handleAvatarChange = (index, avatar) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], avatar };
    setPlayers(newPlayers);
    setActiveAvatarPicker(null);
  };

  const handleAddPlayer = () => {
    if (players.length < 10) {
      setPlayers([...players, { id: Math.random().toString(36).substring(7), name: '', avatar: '👤', score: 0 }]);
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
    <div className="w-full flex flex-col h-full overflow-hidden relative">
      <div className="text-center mb-6 pt-6">
        <h2 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">Player Roster</h2>
        <p className="text-primary text-xs tracking-widest font-bold uppercase">Max 10 Players</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 custom-scrollbar mb-4 pb-12">
        {players.map((player, index) => (
          <div key={player.id || index} className="flex gap-2 relative">
            <button
              onClick={() => setActiveAvatarPicker(index === activeAvatarPicker ? null : index)}
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center glass-panel rounded-xl text-2xl border border-white/10 hover:border-primary transition-colors"
            >
              {player.avatar}
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`PLAYER ${index + 1}`}
                value={player.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="block w-full px-4 py-3 glass-input border border-white/10 rounded-xl text-white placeholder-gray-600 font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner uppercase text-sm"
              />
            </div>
            
            <div className="flex flex-col justify-center px-2 text-center bg-white/5 rounded-xl border border-white/5">
               <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Score</span>
               <span className="text-primary font-black text-sm">{player.score}</span>
            </div>

            {players.length > 4 && (
              <button 
                onClick={() => handleRemovePlayer(index)}
                className="w-12 h-12 flex flex-shrink-0 items-center justify-center glass-btn rounded-xl hover:border-primary group transition-all"
              >
                <UserMinus size={18} className="text-gray-500 group-hover:text-primary" />
              </button>
            )}

            {/* Avatar Picker Popup */}
            {activeAvatarPicker === index && (
              <div className="absolute top-14 left-0 z-50 glass-panel p-3 rounded-xl border border-white/20 w-[280px] grid grid-cols-4 gap-2 shadow-2xl">
                {AVATARS.map(av => (
                  <button 
                    key={av} 
                    onClick={() => handleAvatarChange(index, av)}
                    className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {av}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {players.length < 10 && (
          <button 
            onClick={handleAddPlayer}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-white/20 hover:border-primary text-gray-500 hover:text-primary transition-all uppercase font-bold tracking-widest text-sm mt-4"
          >
            <UserPlus size={18} />
            Add Player
          </button>
        )}
      </div>
    </div>
  );
}
