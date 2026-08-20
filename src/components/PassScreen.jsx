import HoldToReveal from './HoldToReveal';

export default function PassScreen({ player, subtitle = "Pass the phone to", onReveal }) {
  return (
    <div className="glass-panel p-8 max-w-md w-full h-[80vh] flex flex-col items-center justify-center text-center relative z-10 overflow-hidden">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-[-10%] left-[-10%] w-[150px] h-[150px] bg-primary/10 rounded-full mix-blend-screen filter blur-[50px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[150px] h-[150px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[50px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          {subtitle}
        </p>
        
        {/* Floating Avatar Container */}
        <div className="relative mb-6 animate-float">
          <div className="absolute inset-0 bg-white/5 rounded-full filter blur-xl animate-pulse-slow"></div>
          <div className="w-32 h-32 rounded-full border-2 border-white/10 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-sm relative z-10">
            <span className="drop-shadow-lg">{player.avatar}</span>
          </div>
        </div>

        <h1 className="text-5xl font-black mb-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {player.name}
        </h1>
      </div>

      <div className="w-full mt-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
        <HoldToReveal onReveal={onReveal} text="SHOW SECRET" />
      </div>
    </div>
  );
}
