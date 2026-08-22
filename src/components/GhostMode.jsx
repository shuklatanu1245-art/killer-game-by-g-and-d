import { useState, useEffect } from 'react';
import { Skull } from 'lucide-react';
import { playTick, playChime } from '../utils/soundManager';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const PENALTIES = [
  "Do 10 Pushups",
  "Sing a song for 30 seconds",
  "Let someone draw on your face with a pen",
  "Post a funny selfie on your story",
  "Drink a glass of water without using hands",
  "Speak in an accent until the next round",
  "Act like a monkey for 10 seconds",
  "Give your phone to the player on your right for 1 minute"
];

export default function GhostMode({ playerName, onComplete }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning || result) return;
    setSpinning(true);
    
    let ticks = 0;
    const maxTicks = 20;
    
    const interval = setInterval(() => {
      playTick();
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
      ticks++;
      
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setSpinning(false);
        const randomPenalty = PENALTIES[Math.floor(Math.random() * PENALTIES.length)];
        setResult(randomPenalty);
        playChime();
        Haptics.notification({ type: 'SUCCESS' }).catch(() => {});
      }
    }, 150);
  };

  return (
    <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
      <Skull size={80} className="text-primary mb-6 drop-shadow-[0_0_30px_rgba(0,229,255,0.8)]" />
      <h2 className="text-4xl font-black text-white uppercase tracking-wider mb-2">GHOST MODE</h2>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8 text-center px-4">
        {playerName} was eliminated! Spin the wheel to get your penalty.
      </p>

      {result ? (
        <div className="animate-in zoom-in duration-500 w-full flex flex-col items-center">
          <div className="bg-primary/20 border border-primary/50 rounded-2xl p-6 w-full mb-8 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
            <p className="text-white text-xl font-black uppercase tracking-wider leading-relaxed">
              {result}
            </p>
          </div>
          <button 
            onClick={onComplete}
            className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest uppercase"
          >
            ACCEPT FATE
          </button>
        </div>
      ) : (
        <button 
          onClick={spinWheel}
          disabled={spinning}
          className={`w-48 h-48 rounded-full rounded-full border-4 border-primary/30 flex items-center justify-center text-xl font-black uppercase tracking-widest transition-all ${
            spinning ? 'animate-spin border-primary text-primary' : 'glass-btn-primary hover:scale-105'
          }`}
        >
          {spinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
        </button>
      )}
    </div>
  );
}
