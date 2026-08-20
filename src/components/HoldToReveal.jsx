import { useState, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function HoldToReveal({ onReveal, text = "HOLD TO REVEAL" }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const reqRef = useRef(null);
  const startTime = useRef(null);

  const duration = 1000; // 1 second to reveal

  const animate = (time) => {
    if (!startTime.current) startTime.current = time;
    const elapsed = time - startTime.current;
    const currentProgress = Math.min((elapsed / duration) * 100, 100);
    setProgress(currentProgress);

    if (currentProgress >= 100) {
      Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
      onReveal();
      setIsHolding(false);
    } else {
      reqRef.current = requestAnimationFrame(animate);
    }
  };

  const handlePointerDown = (e) => {
    e.preventDefault(); // Prevent accidental scrolling/selection
    setIsHolding(true);
    startTime.current = null;
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    reqRef.current = requestAnimationFrame(animate);
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
    setIsHolding(false);
    setProgress(0);
  };

  return (
    <div className="w-full relative px-4">
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center mb-3">Press and hold to prevent peeking</p>
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onContextMenu={(e) => e.preventDefault()}
        className="relative w-full bg-[#05070A] py-6 rounded-2xl overflow-hidden group border border-white/10 select-none touch-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform active:scale-95"
      >
        {/* Progress Fill */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/40 to-primary/80"
          style={{ width: `${progress}%`, transition: isHolding ? 'none' : 'width 0.3s ease-out' }}
        ></div>
        
        {/* Shine effect on progress */}
        {isHolding && (
          <div 
            className="absolute inset-y-0 bg-white/20 blur-md"
            style={{ left: `${Math.max(0, progress - 10)}%`, width: '10%' }}
          ></div>
        )}
        
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isHolding ? <Eye size={24} className="text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" /> : <EyeOff size={24} className="text-gray-400 group-hover:text-gray-300 transition-colors" />}
          <span className={`font-black tracking-[0.2em] uppercase transition-colors ${isHolding ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-gray-400 group-hover:text-gray-300'}`}>
            {isHolding ? 'KEEP HOLDING...' : text}
          </span>
        </div>
      </button>
    </div>
  );
}
