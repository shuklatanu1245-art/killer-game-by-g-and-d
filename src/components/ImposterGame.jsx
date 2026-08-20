import { useState, useEffect, useRef } from 'react';
import { Target, Search, Eye, ShieldAlert, Timer, Users, UserX, Crown } from 'lucide-react';
import { getRandomImposterWord } from '../utils/imposterWords';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { playTick, playChime } from '../utils/soundManager';

export default function ImposterGame({ playerNames, onEndGame }) {
  const [phase, setPhase] = useState('setup'); // setup, pass, reveal, discuss, vote, result, end
  const [players, setPlayers] = useState([]);
  const [imposterCount, setImposterCount] = useState(1);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [secretData, setSecretData] = useState(null);
  
  // Category state
  const [category, setCategory] = useState('standard');
  const [customWordsInput, setCustomWordsInput] = useState('');

  // Discussion timer state
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  // Voting state
  const [selectedVoteTarget, setSelectedVoteTarget] = useState(null);
  const [lastEliminated, setLastEliminated] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (playerNames.length < 4) {
      alert("At least 4 players required for Imposter Word.");
      onEndGame();
    }
  }, [playerNames, onEndGame]);

  const maxImposters = Math.max(1, Math.floor(playerNames.length / 3));

  const startGame = () => {
    const customList = customWordsInput.split(',').map(w => w.trim()).filter(w => w.length > 0);
    if (category === 'custom' && customList.length === 0) {
      alert("Please enter some custom words!");
      return;
    }
    
    const data = getRandomImposterWord(category, customList);
    setSecretData(data);

    let assignedRoles = playerNames.map(player => ({
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      role: 'Civilian',
      isAlive: true
    }));

    // Randomly assign imposters
    let impostersAssigned = 0;
    while (impostersAssigned < imposterCount) {
      const randIdx = Math.floor(Math.random() * assignedRoles.length);
      if (assignedRoles[randIdx].role === 'Civilian') {
        assignedRoles[randIdx].role = 'Imposter';
        impostersAssigned++;
      }
    }

    setPlayers(assignedRoles);
    setPhase('pass');
    setCurrentTurnIndex(0);
  };

  const activePlayers = players.filter(p => p.isAlive);
  const currentTurnPlayer = activePlayers[currentTurnIndex];

  const handleNextTurn = () => {
    if (currentTurnIndex + 1 < activePlayers.length) {
      setCurrentTurnIndex(currentTurnIndex + 1);
      setPhase('pass');
    } else {
      startDiscussion();
    }
  };

  const startDiscussion = () => {
    setPhase('discuss');
    setTimeLeft(60);
    setTimerActive(false);
  };

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 10) {
           playTick();
        }
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      Haptics.vibrate().catch(() => {}); // Fallback silently on web
      playChime();
      setPhase('vote');
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, timerActive]);

  const handleVote = () => {
    if (!selectedVoteTarget) return;
    
    const targetPlayer = players.find(p => p.id === selectedVoteTarget);
    
    // Update player status
    const updatedPlayers = players.map(p => 
      p.id === selectedVoteTarget ? { ...p, isAlive: false } : p
    );
    
    setPlayers(updatedPlayers);
    setLastEliminated(targetPlayer);
    setSelectedVoteTarget(null);
    setPhase('result');
    
    // Check win conditions
    const living = updatedPlayers.filter(p => p.isAlive);
    const livingImposters = living.filter(p => p.role === 'Imposter').length;
    const livingCivilians = living.length - livingImposters;
    
    if (livingImposters === 0) {
      setWinner('Civilians');
      playChime();
    } else if (livingImposters >= livingCivilians) {
      setWinner('Imposters');
      playChime();
    }
  };

  const handleNextRound = () => {
    if (winner) {
      setPhase('end');
    } else {
      setPhase('pass');
      setCurrentTurnIndex(0);
    }
  };

  if (phase === 'setup') {
    return (
      <div className="glass-panel p-8 max-w-md w-full relative z-10 flex flex-col h-[70vh]">
        <div className="text-center mb-8">
          <ShieldAlert size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-3xl font-black text-white tracking-widest uppercase">Imposter Word</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">{playerNames.length} Players</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center gap-6 overflow-y-auto custom-scrollbar">
          <div className="text-center">
             <label className="text-gray-300 font-bold uppercase tracking-widest text-sm mb-4 block">Number of Imposters</label>
             <div className="flex items-center justify-center gap-6">
               <button 
                 onClick={() => setImposterCount(Math.max(1, imposterCount - 1))}
                 className="w-12 h-12 rounded-full glass-btn text-xl font-bold flex items-center justify-center"
               >-</button>
               <span className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(225,29,72,0.5)] w-16">{imposterCount}</span>
               <button 
                 onClick={() => setImposterCount(Math.min(maxImposters, imposterCount + 1))}
                 className="w-12 h-12 rounded-full glass-btn text-xl font-bold flex items-center justify-center"
               >+</button>
             </div>
             <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-4">Max Imposters for {playerNames.length} players is {maxImposters}</p>
          </div>

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
                rows="2"
                placeholder="Apple, Banana, Car..."
                value={customWordsInput}
                onChange={(e) => setCustomWordsInput(e.target.value)}
              />
            </div>
          )}
        </div>

        <button 
          onClick={startGame}
          className="w-full glass-btn glass-btn-red py-4 rounded-xl font-black tracking-widest uppercase text-lg"
        >
          START GAME
        </button>
      </div>
    );
  }

  if (phase === 'pass') {
    return (
      <div className="glass-panel p-8 max-w-md w-full h-[70vh] flex flex-col justify-center text-center relative z-10">
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-8">Pass the phone to</p>
        <div className="text-6xl mb-4">{currentTurnPlayer.avatar}</div>
        <h1 className="text-5xl font-black mb-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{currentTurnPlayer.name}</h1>
        <button 
          onClick={() => setPhase('reveal')}
          className="w-full glass-btn glass-btn-red py-4 px-6 rounded-xl"
        >
          I AM READY
        </button>
      </div>
    );
  }

  if (phase === 'reveal') {
    const isImposter = currentTurnPlayer.role === 'Imposter';
    const otherImposters = players.filter(p => p.role === 'Imposter' && p.id !== currentTurnPlayer.id).map(p => p.name);

    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[80vh] flex flex-col">
        <div className="mb-8">
           <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Secret Role for</p>
           <h2 className="text-2xl font-black text-white uppercase">{currentTurnPlayer.name}</h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          {isImposter ? (
            <div className="animate-in zoom-in duration-500 w-full">
               <Target size={64} className="mx-auto text-primary mb-6 drop-shadow-[0_0_20px_rgba(225,29,72,0.8)]" />
               <h3 className="text-3xl font-black text-primary tracking-widest uppercase mb-4">IMPOSTER</h3>
               <div className="glass-input p-4 rounded-xl border border-white/10 mb-6">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Category Hint</p>
                 <p className="text-xl font-black text-white">{secretData.hint}</p>
               </div>
               
               {otherImposters.length > 0 && (
                 <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                   <p className="text-primary text-[10px] uppercase font-bold tracking-widest mb-1">Your Teammates:</p>
                   <p className="text-white font-bold">{otherImposters.join(', ')}</p>
                 </div>
               )}
            </div>
          ) : (
            <div className="animate-in zoom-in duration-500 w-full">
               <Eye size={64} className="mx-auto text-blue-500 mb-6 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
               <h3 className="text-3xl font-black text-blue-500 tracking-widest uppercase mb-4">CIVILIAN</h3>
               
               <div className="glass-input p-4 rounded-xl border border-white/10 mb-4 w-full">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Secret Word</p>
                 <p className="text-3xl font-black text-white tracking-wider">{secretData.word}</p>
               </div>
               
               <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 w-full">
                 <p className="text-blue-400 text-[10px] uppercase font-bold tracking-widest mb-1">Category Hint (Imposters see this):</p>
                 <p className="text-white font-bold text-sm">{secretData.hint}</p>
               </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleNextTurn}
          className="w-full glass-btn py-4 rounded-xl font-black tracking-widest uppercase mt-auto"
        >
          HIDE & PASS
        </button>
      </div>
    );
  }

  if (phase === 'discuss') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 flex flex-col items-center h-[70vh]">
        <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-8">Discuss</h2>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-gray-800" strokeWidth="8" fill="none" />
              <circle 
                cx="96" cy="96" r="88" 
                className={`transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'stroke-primary' : 'stroke-white'}`} 
                strokeWidth="8" fill="none" 
                strokeDasharray="552.9" 
                strokeDashoffset={552.9 * (1 - timeLeft / 60)} 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
               <span className={`text-5xl font-black ${timeLeft <= 10 ? 'text-primary animate-pulse' : 'text-white'}`}>{timeLeft}</span>
               <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-1">SECONDS</span>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-4 mt-8">
          <button 
            onClick={() => {
              setTimerActive(!timerActive);
              if (!timerActive) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
            }}
            className="flex-1 glass-btn py-4 rounded-xl font-bold tracking-widest uppercase text-sm"
          >
            {timerActive ? 'PAUSE' : 'START'}
          </button>
          <button 
            onClick={() => {
              setTimerActive(false);
              setPhase('vote');
            }}
            className="flex-1 glass-btn glass-btn-red py-4 rounded-xl font-bold tracking-widest uppercase text-sm"
          >
            SKIP TO VOTE
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'vote') {
    return (
      <div className="glass-panel p-6 max-w-md w-full relative z-10 flex flex-col h-[80vh]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black uppercase tracking-widest text-primary drop-shadow-[0_0_10px_currentColor] mb-1">Group Vote</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Select who to eliminate</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
          {activePlayers.map((p, index) => (
            <button
              key={p.id}
              onClick={() => setSelectedVoteTarget(p.id)}
              className={`w-full flex items-center p-3 rounded-2xl transition-all group ${
                selectedVoteTarget === p.id 
                  ? 'bg-white/5 border border-primary shadow-[0_0_15px_rgba(255,90,74,0.15)]' 
                  : 'glass-panel border-white/5 hover:border-white/20'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-4 shadow-inner text-2xl">
                {p.avatar}
              </div>
              <div className="flex-1 text-left flex flex-col">
                 <div className="text-gray-500 text-[10px] uppercase font-bold mb-0.5 tracking-widest">
                   #{String(index + 1).padStart(2, '0')}
                 </div>
                 <div className="text-white font-black tracking-wider text-base mb-1 group-hover:text-primary transition-colors">
                   {p.name}
                 </div>
              </div>
            </button>
          ))}
        </div>

        <button 
          disabled={!selectedVoteTarget}
          onClick={handleVote}
          className={`w-full font-black py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 ${
            selectedVoteTarget 
              ? 'glass-btn glass-btn-red animate-pulse' 
              : 'bg-[#05070A] border border-white/5 text-gray-600 cursor-not-allowed tracking-widest'
          }`}
        >
          <Target size={20} />
          {selectedVoteTarget ? `CONFIRM ELIMINATION` : `SELECT A PLAYER`}
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const isImposter = lastEliminated.role === 'Imposter';
    
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 flex flex-col h-[70vh]">
        <div className="mb-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Eliminated</p>
          <div className="text-5xl mb-2">{lastEliminated.avatar}</div>
          <h2 className="text-4xl font-black text-white uppercase tracking-wider">{lastEliminated.name}</h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in duration-500">
           {isImposter ? (
             <>
               <Target size={80} className="text-primary mb-6 drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]" />
               <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Was an Imposter!</h3>
               <p className="text-primary font-bold text-sm tracking-widest uppercase">Great job civilians.</p>
             </>
           ) : (
             <>
               <UserX size={80} className="text-blue-500 mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
               <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Was a Civilian!</h3>
               <p className="text-blue-400 font-bold text-sm tracking-widest uppercase">The imposters are laughing.</p>
             </>
           )}
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-6">
           <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">Secret Word is still hidden</p>
        </div>

        <button 
          onClick={handleNextRound}
          className="w-full glass-btn py-4 rounded-xl font-black tracking-widest uppercase"
        >
          {winner ? 'VIEW FINAL RESULTS' : 'NEXT ROUND'}
        </button>
      </div>
    );
  }

  if (phase === 'end') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[70vh] flex flex-col justify-center">
        <Crown size={80} className={`mx-auto mb-8 ${winner === 'Civilians' ? 'text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]' : 'text-primary drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]'}`} />
        <h2 className={`text-4xl font-black tracking-widest uppercase mb-4 ${winner === 'Civilians' ? 'text-blue-500' : 'text-primary'}`}>
          {winner} Win!
        </h2>
        <p className="text-gray-300 font-bold tracking-wider mb-8">
          The secret word was: <br/><span className="text-2xl font-black text-white mt-2 block">"{secretData.word}"</span>
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left max-h-48 overflow-y-auto custom-scrollbar">
          <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2 border-b border-white/10 pb-2">All Roles</p>
          {players.map(p => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <span className={`font-bold ${!p.isAlive ? 'line-through text-gray-500' : 'text-white'}`}>
                {p.avatar} {p.name}
              </span>
              <span className={`text-xs font-black tracking-widest uppercase ${p.role === 'Imposter' ? 'text-primary' : 'text-blue-500'}`}>{p.role}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
             const winningIds = players.filter(p => (winner === 'Civilians' ? p.role === 'Civilian' : p.role === 'Imposter')).map(p => p.id);
             onEndGame(winningIds);
          }}
          className="w-full glass-btn glass-btn-red py-4 rounded-xl font-black tracking-widest uppercase"
        >
          BACK TO HUB
        </button>
      </div>
    );
  }

  return null;
}
