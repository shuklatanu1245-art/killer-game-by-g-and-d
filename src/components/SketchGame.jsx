import { useState, useEffect } from 'react';
import { Palette, PenTool, Type, Eye, ChevronRight, Home } from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';
import { getRandomWord } from '../utils/wordList';
import PassScreen from './PassScreen';

export default function SketchGame({ playerNames, onEndGame }) {
  const [phase, setPhase] = useState('setup'); // setup, pass, action, results
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [chain, setChain] = useState([]); 
  const [guessInput, setGuessInput] = useState('');
  
  // Category state
  const [category, setCategory] = useState('standard');
  const [customWordsInput, setCustomWordsInput] = useState('');

  useEffect(() => {
    // Validate players
    if (playerNames.length < 3) {
      alert("At least 3 players are required for Sketch & Guess.");
      onEndGame();
      return;
    }
  }, [playerNames, onEndGame]);

  const startGame = () => {
    const customList = customWordsInput.split(',').map(w => w.trim()).filter(w => w.length > 0);
    if (category === 'custom' && customList.length === 0) {
      alert("Please enter some custom words!");
      return;
    }
    
    const startingWord = getRandomWord(category, customList);
    setChain([{ type: 'word', value: startingWord, player: 'System' }]);
    setPhase('pass');
  };

  const currentPlayer = playerNames[currentPlayerIndex] || {};
  const isDrawingTurn = currentPlayerIndex % 2 === 0; // Even indexes draw (0, 2, 4)
  const previousItem = chain[chain.length - 1] || {};

  const handleActionComplete = (value) => {
    const newChain = [...chain, { 
      type: isDrawingTurn ? 'drawing' : 'guess', 
      value, 
      player: currentPlayer.name 
    }];
    
    setChain(newChain);
    
    if (currentPlayerIndex + 1 < playerNames.length) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setGuessInput('');
      setPhase('pass');
    } else {
      setPhase('results');
    }
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!guessInput.trim()) return;
    handleActionComplete(guessInput.trim());
  };

  if (phase === 'setup') {
    return (
      <div className="glass-panel p-8 max-w-md w-full relative z-10 flex flex-col h-[70vh]">
        <div className="text-center mb-8">
          <Palette size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-3xl font-black text-white tracking-widest uppercase">Sketch & Guess</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">{playerNames.length} Players</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center gap-6 overflow-y-auto custom-scrollbar">
          <div className="text-center mt-4">
             <label className="text-gray-300 font-bold uppercase tracking-widest text-sm mb-4 block">Select Category</label>
             <div className="flex flex-wrap justify-center gap-2">
               {['standard', 'bollywood', 'anime', 'adult18', 'custom'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setCategory(cat)}
                   className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${category === cat ? 'glass-btn glass-btn-red' : 'glass-panel text-gray-400 border-white/5 hover:border-white/20'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>
          
          {category === 'custom' && (
            <div className="text-center mt-2 animate-in fade-in">
              <label className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-2 block">Custom Words (comma separated)</label>
              <textarea 
                className="w-full glass-input p-4 rounded-xl border border-white/10 text-white font-bold text-sm tracking-wider resize-none"
                rows="3"
                placeholder="Apple, Banana, Car..."
                value={customWordsInput}
                onChange={(e) => setCustomWordsInput(e.target.value)}
              />
            </div>
          )}
        </div>

        <button 
          onClick={startGame}
          className="w-full glass-btn glass-btn-red py-4 rounded-xl font-black tracking-widest uppercase text-lg mt-4"
        >
          START GAME
        </button>
      </div>
    );
  }

  if (phase === 'pass') {
    return (
      <PassScreen 
        player={currentPlayer} 
        subtitle="Pass the phone to" 
        onReveal={() => setPhase('action')} 
      />
    );
  }

  if (phase === 'action') {
    return (
      <div className="w-full h-[90vh] flex flex-col relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">{currentPlayer.name}'s Turn</p>
          
          {isDrawingTurn ? (
            <div className="glass-panel py-3 px-4 inline-block">
               <span className="text-white font-bold text-sm tracking-widest uppercase">Draw this: </span>
               <span className="text-primary font-black text-xl tracking-wider">{previousItem.value}</span>
            </div>
          ) : (
            <div className="glass-panel py-3 px-4 inline-block">
               <span className="text-white font-bold text-sm tracking-widest uppercase text-primary">What is this drawing?</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full flex flex-col min-h-0">
          {isDrawingTurn ? (
             <DrawingCanvas onSave={handleActionComplete} />
          ) : (
             <div className="flex flex-col items-center justify-center h-full w-full gap-6">
                <div className="w-full flex-1 bg-white/5 rounded-2xl border border-white/10 p-2 overflow-hidden flex items-center justify-center">
                  <img src={previousItem.value} alt="Previous Drawing" className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                </div>
                <form onSubmit={handleGuessSubmit} className="w-full">
                  <input
                    type="text"
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder="Type your guess here..."
                    className="w-full py-4 px-6 glass-input border border-white/20 rounded-xl text-white text-center font-black tracking-wider text-xl focus:outline-none focus:border-primary uppercase shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] mb-4"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    disabled={!guessInput.trim()}
                    className={`w-full py-4 rounded-xl font-black tracking-widest uppercase transition-all ${guessInput.trim() ? 'glass-btn glass-btn-red' : 'bg-white/5 text-gray-600 border border-white/10'}`}
                  >
                    SUBMIT GUESS
                  </button>
                </form>
             </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="w-full h-full flex flex-col relative z-10 py-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Results</h2>
          <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">Look at this mess</p>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2 mb-6">
          <div className="glass-panel p-4 text-center border-t-4 border-t-primary">
             <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Original Word</p>
             <h3 className="text-2xl font-black text-white tracking-wider">{chain[0].value}</h3>
          </div>

          {chain.slice(1).map((item, idx) => (
            <div key={idx} className="glass-panel p-4 flex flex-col items-center text-center">
               <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-3 w-full text-left border-b border-white/10 pb-2">
                 {item.player} {item.type === 'drawing' ? 'drew' : 'guessed'}:
               </p>
               
               {item.type === 'drawing' ? (
                 <div className="bg-black/50 rounded-xl w-full p-2 border border-white/5">
                   <img src={item.value} alt="Drawing" className="max-w-full h-auto object-contain mx-auto" />
                 </div>
               ) : (
                 <h3 className="text-2xl font-black text-white tracking-wider my-4 drop-shadow-md">
                   "{item.value.toUpperCase()}"
                 </h3>
               )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => onEndGame(playerNames.map(p => p.id))}
          className="w-full glass-btn py-4 rounded-xl font-black tracking-widest uppercase flex items-center justify-center gap-2"
        >
          <Home size={20} />
          BACK TO HUB
        </button>
      </div>
    );
  }

  return null;
}
