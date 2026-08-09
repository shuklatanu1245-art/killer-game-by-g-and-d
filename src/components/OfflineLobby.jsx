import { useState } from 'react';
import { ArrowLeft, UserPlus, Play } from 'lucide-react';

export default function OfflineLobby({ onBack, onStartGame }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(Array(4).fill(''));

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
    <div className="glass rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-white/5">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Offline Setup</h2>
        <p className="text-gray-400 text-sm">Pass & Play Mode</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Number of Players (4-10)
        </label>
        <div className="flex items-center bg-surface border border-gray-700 rounded-xl overflow-hidden">
          <input 
            type="range" 
            min="4" 
            max="10" 
            value={playerCount}
            onChange={handleCountChange}
            className="w-full h-2 bg-gray-700 appearance-none cursor-pointer mx-4 accent-primary"
          />
          <div className="bg-primary text-white font-bold px-4 py-3 min-w-[3rem] text-center">
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
              placeholder={`Player ${index + 1} Name`}
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-surface border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        ))}
      </div>

      <button 
        disabled={!canStart}
        onClick={() => onStartGame(playerNames)}
        className={`w-full group flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-xl transition-all duration-300 ${
          canStart 
            ? 'bg-accent hover:bg-accent/90 text-white hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        <Play size={20} className={canStart ? 'group-hover:scale-110 transition-transform' : ''} />
        START GAME
      </button>
    </div>
  );
}
