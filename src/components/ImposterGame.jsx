import { useState, useEffect, useRef } from 'react';
import { Target, Search, Eye, ShieldAlert, Timer, Users, UserX, Crown, Volume2 } from 'lucide-react';
import { getRandomImposterWord } from '../utils/imposterWords';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { playTick, playChime } from '../utils/soundManager';
import PassScreen from './PassScreen';
import GhostMode from './GhostMode';

export default function ImposterGame({ playerNames, onEndGame }) {
  const [phase, setPhase] = useState('setup'); // setup, pass, reveal, speaking_order, discuss, secret_vote_pass, secret_vote, result, ghost, end
  const [players, setPlayers] = useState([]);
  const [imposterCount, setImposterCount] = useState(1);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [secretData, setSecretData] = useState(null);
  const [speakingOrder, setSpeakingOrder] = useState([]);
  
  // Voting state
  const [votingTurnIndex, setVotingTurnIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [selectedVoteTarget, setSelectedVoteTarget] = useState(null);
  
  const [lastEliminated, setLastEliminated] = useState(null);
  const [winner, setWinner] = useState(null);

  // Category
  const [category, setCategory] = useState('standard');
  const [customWordsInput, setCustomWordsInput] = useState('');

  // Timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

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
      ...player,
      role: 'Civilian',
      isAlive: true
    }));

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
  const currentTurnPlayer = phase.startsWith('secret_vote') 
    ? activePlayers[votingTurnIndex] 
    : activePlayers[currentTurnIndex];

  const handleNextTurn = () => {
    if (currentTurnIndex + 1 < activePlayers.length) {
      setCurrentTurnIndex(currentTurnIndex + 1);
      setPhase('pass');
    } else {
      generateSpeakingOrder();
    }
  };

  const generateSpeakingOrder = () => {
    // We want imposters to be at index >= 2 (so they don't speak 1st or 2nd)
    const imposters = activePlayers.filter(p => p.role === 'Imposter');
    let civilians = activePlayers.filter(p => p.role === 'Civilian');
    
    // Shuffle civilians
    civilians.sort(() => Math.random() - 0.5);
    
    let order = [];
    if (civilians.length >= 2) {
      order.push(civilians.pop(), civilians.pop());
    } else if (civilians.length === 1) {
      order.push(civilians.pop());
    }
    
    // Combine remaining and shuffle
    let remaining = [...civilians, ...imposters].sort(() => Math.random() - 0.5);
    order = [...order, ...remaining];
    
    setSpeakingOrder(order);
    setPhase('speaking_order');
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
        if (timeLeft <= 10) playTick();
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      Haptics.vibrate().catch(() => {});
      playChime();
      startVotingPhase();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, timerActive]);

  const startVotingPhase = () => {
    setPhase('secret_vote_pass');
    setVotingTurnIndex(0);
    setVotes({});
    setSelectedVoteTarget(null);
  };

  const submitSecretVote = () => {
    if (!selectedVoteTarget) return;
    
    const newVotes = { ...votes };
    newVotes[selectedVoteTarget] = (newVotes[selectedVoteTarget] || 0) + 1;
    setVotes(newVotes);
    setSelectedVoteTarget(null);

    if (votingTurnIndex + 1 < activePlayers.length) {
      setVotingTurnIndex(votingTurnIndex + 1);
      setPhase('secret_vote_pass');
    } else {
      tallyVotes(newVotes);
    }
  };

  const tallyVotes = (finalVotes) => {
    // Find player with most votes
    let maxVotes = 0;
    let targetId = null;
    
    Object.keys(finalVotes).forEach(id => {
      if (finalVotes[id] > maxVotes) {
        maxVotes = finalVotes[id];
        targetId = id;
      }
    });

    // If there's a tie, we just pick the first one found for simplicity in this offline game, or we could say "No one eliminated". Let's eliminate targetId.
    if (!targetId) {
      // Randomly pick someone if no votes (shouldn't happen)
      targetId = activePlayers[0].id;
    }

    const targetPlayer = players.find(p => p.id === targetId);
    
    const updatedPlayers = players.map(p => 
      p.id === targetId ? { ...p, isAlive: false } : p
    );
    
    setPlayers(updatedPlayers);
    setLastEliminated(targetPlayer);
    setPhase('result');
    
    // Win conditions
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

  const handleResultNext = () => {
    if (winner) {
      setPhase('end');
    } else {
      setPhase('ghost');
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
               <span className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(0,229,255,0.5)] w-16">{imposterCount}</span>
               <button 
                 onClick={() => setImposterCount(Math.min(maxImposters, imposterCount + 1))}
                 className="w-12 h-12 rounded-full glass-btn text-xl font-bold flex items-center justify-center"
               >+</button>
             </div>
          </div>

          <div className="text-center mt-4">
             <label className="text-gray-300 font-bold uppercase tracking-widest text-sm mb-4 block">Select Category</label>
             <div className="flex flex-wrap justify-center gap-2">
               {['standard', 'bollywood', 'anime', 'adult18', 'custom'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setCategory(cat)}
                   className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${category === cat ? 'glass-btn glass-btn-primary' : 'glass-panel text-gray-400 border-white/5 hover:border-white/20'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>
        </div>

        <button 
          onClick={startGame}
          className="w-full glass-btn glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase text-lg mt-4"
        >
          START GAME
        </button>
      </div>
    );
  }

  if (phase === 'pass' || phase === 'secret_vote_pass') {
    return <PassScreen player={currentTurnPlayer} subtitle={phase === 'pass' ? "Pass the phone to reveal role" : "Pass the phone to vote secretly"} onReveal={() => setPhase(phase === 'pass' ? 'reveal' : 'secret_vote')} />;
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
               <Target size={64} className="mx-auto text-primary mb-6 drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]" />
               <h3 className="text-3xl font-black text-primary tracking-widest uppercase mb-4">IMPOSTER</h3>
               <div className="glass-input p-4 rounded-xl border border-white/10 mb-6">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Specific Hint</p>
                 <p className="text-xl font-black text-white">{secretData.hint}</p>
               </div>
            </div>
          ) : (
            <div className="animate-in zoom-in duration-500 w-full">
               <Eye size={64} className="mx-auto text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
               <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-4">CIVILIAN</h3>
               
               <div className="glass-input p-4 rounded-xl border border-white/10 mb-4 w-full">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Secret Word</p>
                 <p className="text-3xl font-black text-white tracking-wider">{secretData.word}</p>
               </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleNextTurn}
          className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase mt-auto"
        >
          HIDE & PASS
        </button>
      </div>
    );
  }

  if (phase === 'speaking_order') {
    return (
      <div className="glass-panel p-6 max-w-md w-full relative z-10 flex flex-col h-[80vh]">
        <div className="text-center mb-6">
          <Volume2 size={40} className="mx-auto text-primary mb-2" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-1">Speaking Order</h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Share one word describing the secret word</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2 mb-6">
          {speakingOrder.map((p, index) => (
            <div key={p.id} className="glass-panel p-3 rounded-xl flex items-center border border-white/5">
              <span className="text-primary font-black text-lg w-8">{index + 1}.</span>
              <span className="text-2xl mr-3">{p.avatar}</span>
              <span className="text-white font-bold tracking-wider">{p.name}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={startDiscussion}
          className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase"
        >
          START DISCUSSION
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
            className="flex-1 glass-btn py-4 rounded-xl font-bold tracking-widest uppercase text-sm border border-white/20"
          >
            {timerActive ? 'PAUSE' : 'START'}
          </button>
          <button 
            onClick={startVotingPhase}
            className="flex-1 glass-btn-primary py-4 rounded-xl font-bold tracking-widest uppercase text-sm"
          >
            SKIP TO VOTE
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'secret_vote') {
    return (
      <div className="glass-panel p-6 max-w-md w-full relative z-10 flex flex-col h-[80vh]">
        <div className="text-center mb-6">
          <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">{currentTurnPlayer.name}'s Turn</p>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-md mb-1">Secret Vote</h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Who is the imposter?</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-6">
          {activePlayers.filter(p => p.id !== currentTurnPlayer.id).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedVoteTarget(p.id)}
              className={`w-full flex items-center p-3 rounded-2xl transition-all group ${
                selectedVoteTarget === p.id 
                  ? 'bg-primary/20 border border-primary shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                  : 'glass-panel border-white/5 hover:border-white/20'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center mr-4 shadow-inner text-2xl">
                {p.avatar}
              </div>
              <div className="flex-1 text-left flex flex-col">
                 <div className="text-white font-black tracking-wider text-base group-hover:text-primary transition-colors">
                   {p.name}
                 </div>
              </div>
            </button>
          ))}
        </div>

        <button 
          disabled={!selectedVoteTarget}
          onClick={submitSecretVote}
          className={`w-full font-black py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 ${
            selectedVoteTarget 
              ? 'glass-btn-primary animate-pulse' 
              : 'bg-[#05070A] border border-white/5 text-gray-600 cursor-not-allowed tracking-widest'
          }`}
        >
          <Target size={20} />
          {selectedVoteTarget ? `LOCK IN VOTE` : `SELECT A PLAYER`}
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
               <Target size={80} className="text-primary mb-6 drop-shadow-[0_0_30px_rgba(0,229,255,0.8)]" />
               <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Was an Imposter!</h3>
             </>
           ) : (
             <>
               <UserX size={80} className="text-white mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
               <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Was a Civilian!</h3>
             </>
           )}
        </div>

        <button 
          onClick={handleResultNext}
          className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase mt-6"
        >
          CONTINUE
        </button>
      </div>
    );
  }

  if (phase === 'ghost') {
    return <GhostMode playerName={lastEliminated.name} onComplete={() => {
      setPhase('pass');
      setCurrentTurnIndex(0);
    }} />;
  }

  if (phase === 'end') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[80vh] flex flex-col justify-center">
        <Crown size={80} className={`mx-auto mb-8 ${winner === 'Civilians' ? 'text-white' : 'text-primary drop-shadow-[0_0_30px_rgba(0,229,255,0.8)]'}`} />
        <h2 className={`text-4xl font-black tracking-widest uppercase mb-4 ${winner === 'Civilians' ? 'text-white' : 'text-primary'}`}>
          {winner} Win!
        </h2>
        <p className="text-gray-300 font-bold tracking-wider mb-8">
          The secret word was: <br/><span className="text-2xl font-black text-white mt-2 block">"{secretData.word}"</span>
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left flex-1 overflow-y-auto custom-scrollbar">
          <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2 border-b border-white/10 pb-2">All Roles</p>
          {players.map(p => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <span className={`font-bold ${!p.isAlive ? 'line-through text-gray-500' : 'text-white'}`}>
                {p.avatar} {p.name}
              </span>
              <span className={`text-xs font-black tracking-widest uppercase ${p.role === 'Imposter' ? 'text-primary' : 'text-gray-400'}`}>{p.role}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
             const winningIds = players.filter(p => (winner === 'Civilians' ? p.role === 'Civilian' : p.role === 'Imposter')).map(p => p.id);
             onEndGame(winningIds);
          }}
          className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase mt-auto"
        >
          BACK TO HUB
        </button>
      </div>
    );
  }

  return null;
}
