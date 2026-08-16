import { useState } from 'react';
import { ArrowLeft, UserPlus, Play } from 'lucide-react';

export default function OfflineLobby({ initialPlayers = [], onBack, onStartGame }) {
  const initialCount = initialPlayers.length > 0 ? Math.max(4, initialPlayers.length) : 4;
  const initialNames = initialPlayers.length > 0 ? initialPlayers : Array(4).fill('');

  const [playerCount, setPlayerCount] = useState(initialCount);
  const [playerNames, setPlayerNames] = useState(initialNames);

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setPlayerCount(count);
    
    // Adjust array size while keeping existing names
    setPlayerNames((prev) => {
      const newNames = [...prev];
      if (count > prev.length) {
        return [...newNames, ...Array(count - prev.length).fill('')];
      } else {
        return newNames.slice(0, count);
      }
    });
  };

  const handleNameChange = (index, value) => {
    setPlayerNames((prev) => {
      const newNames = [...prev];
      newNames[index] = value;
      return newNames;
    });
  };

  const canStart = playerNames.every(name => name.trim().length > 0);

  return (
    <div className="metallic-panel p-8 max-w-md w-full relative z-10">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">Offline Setup</h2>
        <p className="text-primary text-xs tracking-widest font-bold uppercase">Pass & Play Mode</p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">
          Number of Players (4-10)
        </label>
        <div className="flex items-center bg-[#0B0F19] border border-white/10 rounded-xl overflow-hidden shadow-inner">
          <input 
            type="range" 
            min="4" 
            max="10" 
            value={playerCount}
            onChange={handleCountChange}
            className="w-full h-2 bg-gray-800 appearance-none cursor-pointer mx-4 accent-primary"
          />
          <div className="bg-primary text-white font-black px-4 py-3 min-w-[3rem] text-center border-l border-white/10">
            {playerCount}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {playerNames.map((name, index) => (
          <div key={index} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserPlus size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={`PLAYER ${index + 1} NAME`}
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-[#0B0F19] border border-white/10 rounded-xl text-white placeholder-gray-600 font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner uppercase text-sm"
            />
          </div>
        ))}
      </div>

      <button 
        disabled={!canStart}
        onClick={() => onStartGame(playerNames)}
        className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300 ${
          canStart 
            ? 'metallic-btn metallic-btn-red' 
            : 'bg-[#0B0F19] border border-white/5 text-gray-600 cursor-not-allowed font-black tracking-widest'
        }`}
      >
        <Play size={20} />
        START GAME
      </button>
    </div>
  );
}
