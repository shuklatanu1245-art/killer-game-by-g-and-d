import { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, CheckCircle2, ShieldAlert } from 'lucide-react';
import { playTick, playChime } from '../utils/soundManager';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const TABOO_WORDS = [
  { word: "Pizza", taboo: ["Italy", "Cheese", "Slice", "Dough", "Tomato"] },
  { word: "Dog", taboo: ["Bark", "Pet", "Cat", "Puppy", "Animal"] },
  { word: "Beach", taboo: ["Sand", "Ocean", "Sun", "Water", "Swim"] },
  { word: "Movie", taboo: ["Theater", "Popcorn", "Watch", "Film", "Actor"] },
  { word: "Coffee", taboo: ["Drink", "Morning", "Caffeine", "Starbucks", "Bean"] },
  { word: "Hospital", taboo: ["Doctor", "Nurse", "Sick", "Bed", "Medicine"] },
  { word: "Airplane", taboo: ["Fly", "Sky", "Wings", "Travel", "Pilot"] },
  { word: "Guitar", taboo: ["String", "Music", "Play", "Band", "Instrument"] },
  { word: "Winter", taboo: ["Cold", "Snow", "Season", "Ice", "Freeze"] },
  { word: "School", taboo: ["Teacher", "Student", "Learn", "Book", "Class"] }
];

export default function TabooGame({ playerNames, onEndGame }) {
  const [phase, setPhase] = useState('setup');
  const [turnIndex, setTurnIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  const startGame = () => {
    // Shuffle words
    TABOO_WORDS.sort(() => Math.random() - 0.5);
    setScore(0);
    setTurnIndex(0);
    setCurrentWordIndex(0);
    setPhase('pass');
  };

  const currentPlayer = playerNames[turnIndex];

  const startTurn = () => {
    setPhase('play');
    setTimeLeft(60);
    setTimerActive(true);
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
      setPhase('result');
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, timerActive]);

  const handleCorrect = () => {
    setScore(score + 1);
    nextWord();
    playTick();
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  };

  const handleSkip = () => {
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex + 1 < TABOO_WORDS.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Loop or end
      setCurrentWordIndex(0);
    }
  };

  const handleNextTurn = () => {
    if (turnIndex + 1 < playerNames.length) {
      setTurnIndex(turnIndex + 1);
      setPhase('pass');
    } else {
      setPhase('end');
    }
  };

  if (phase === 'setup') {
    return (
      <div className="glass-panel p-8 max-w-md w-full relative z-10 flex flex-col h-[70vh]">
        <div className="text-center mb-8">
          <ShieldAlert size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-3xl font-black text-white tracking-widest uppercase">Taboo Strike</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Describe the word without using the forbidden words!</p>
        </div>
        
        <button 
          onClick={startGame}
          className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase text-lg mt-auto"
        >
          START GAME
        </button>
      </div>
    );
  }

  if (phase === 'pass') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[70vh] flex flex-col justify-center">
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Next up</p>
        <div className="text-6xl mb-4">{currentPlayer.avatar}</div>
        <h2 className="text-4xl font-black text-white uppercase tracking-wider mb-8">{currentPlayer.name}</h2>
        <button onClick={startTurn} className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase">
          START TIMER
        </button>
      </div>
    );
  }

  if (phase === 'play') {
    const currentData = TABOO_WORDS[currentWordIndex];

    return (
      <div className="glass-panel p-6 max-w-md w-full text-center relative z-10 flex flex-col h-[80vh]">
        <div className="flex justify-between items-center mb-6">
           <div className="glass-panel px-4 py-2 rounded-xl text-primary font-black text-xl">
             {timeLeft}s
           </div>
           <div className="glass-panel px-4 py-2 rounded-xl text-white font-black text-xl">
             Score: {score}
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white/10 border-2 border-primary rounded-2xl w-full p-8 mb-6 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
            <h2 className="text-5xl font-black text-white uppercase tracking-wider drop-shadow-md mb-2">{currentData.word}</h2>
          </div>

          <div className="w-full space-y-2">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">FORBIDDEN WORDS</p>
            {currentData.taboo.map((w, i) => (
              <div key={i} className="glass-panel py-3 rounded-xl border border-white/10 text-white font-bold tracking-widest uppercase">
                {w}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={handleSkip} className="flex-1 glass-btn py-4 rounded-xl font-bold tracking-widest uppercase border border-red-500/50 text-red-400">
            SKIP
          </button>
          <button onClick={handleCorrect} className="flex-1 glass-btn-primary py-4 rounded-xl font-bold tracking-widest uppercase text-white">
            CORRECT
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[70vh] flex flex-col justify-center">
        <h2 className="text-4xl font-black text-primary tracking-widest uppercase mb-4">TIME'S UP!</h2>
        <p className="text-gray-300 font-bold tracking-wider mb-8">
          You scored <span className="text-2xl font-black text-white">{score}</span> points!
        </p>
        <button onClick={handleNextTurn} className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase">
          NEXT PLAYER
        </button>
      </div>
    );
  }

  if (phase === 'end') {
    return (
      <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 h-[70vh] flex flex-col justify-center">
        <h2 className="text-4xl font-black text-white tracking-widest uppercase mb-4">GAME OVER</h2>
        <p className="text-primary font-bold tracking-wider mb-8">
          Total Group Score: <span className="text-4xl font-black text-white">{score}</span>
        </p>
        <button onClick={() => onEndGame([])} className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase">
          BACK TO HUB
        </button>
      </div>
    );
  }

  return null;
}
