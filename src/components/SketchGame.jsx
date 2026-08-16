import { useState, useEffect } from 'react';
import { Palette, PenTool, Type, Eye, ChevronRight, Home } from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';
import { getRandomWord } from '../utils/wordList';

export default function SketchGame({ playerNames, onEndGame }) {
  const [phase, setPhase] = useState('setup'); // setup, pass, action, results
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [chain, setChain] = useState([]); 
  const [guessInput, setGuessInput] = useState('');
  
  useEffect(() => {
    // Initialize game
    if (playerNames.length < 3) {
      alert("At least 3 players are required for Sketch & Guess.");
      onEndGame();
      return;
    }
    
    // Pick starting word
    const startingWord = getRandomWord();
    setChain([{ type: 'word', value: startingWord, player: 'System' }]);
    setPhase('pass');
  }, [playerNames, onEndGame]);

  const currentPlayer = playerNames[currentPlayerIndex];
  const isDrawingTurn = currentPlayerIndex % 2 === 0; // Even indexes draw (0, 2, 4)
  const previousItem = chain[chain.length - 1];

  const handleActionComplete = (value) => {
    const newChain = [...chain, { 
      type: isDrawingTurn ? 'drawing' : 'guess', 
      value, 
      player: currentPlayer 
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

  if (phase === 'pass') {
    return (
      <div className="glass-panel p-8 max-w-md w-full h-[80vh] flex flex-col justify-center text-center relative z-10">
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-8">Pass the phone to</p>
        <h1 className="text-5xl font-black mb-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{currentPlayer}</h1>
        <div className="mb-10 text-primary font-bold tracking-widest uppercase">
          Your task: {isDrawingTurn ? 'Draw' : 'Guess'}
        </div>
        <button 
          onClick={() => setPhase('action')}
          className="w-full glass-btn glass-btn-red py-4 px-6 rounded-xl"
        >
          I AM READY
        </button>
      </div>
    );
  }

  if (phase === 'action') {
    return (
      <div className="w-full h-[90vh] flex flex-col relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">{currentPlayer}'s Turn</p>
          
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
          onClick={onEndGame}
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
