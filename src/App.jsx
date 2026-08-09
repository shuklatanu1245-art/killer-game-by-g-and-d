import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import OfflineLobby from './components/OfflineLobby';
import OfflineGame from './components/OfflineGame';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading'); // 'loading', 'home', 'offlineLobby', 'game'
  const [players, setPlayers] = useState([]);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (currentScreen === 'loading') {
      const timer = setTimeout(() => setCurrentScreen('home'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleDownloadApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Decor (Professional & Subtle) */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[300px] h-[300px] bg-red-900 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Mobile Container Wrapper */}
      <div className="w-full max-w-md h-full min-h-[100dvh] flex flex-col relative z-10 sm:border-x sm:border-white/5 bg-background/50 backdrop-blur-3xl shadow-2xl">
        
        {currentScreen === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 bg-background z-50">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-primary filter blur-3xl opacity-40 rounded-full animate-pulse"></div>
              <img 
                src="/logo.jpg" 
                alt="RedRole Logo" 
                className="w-48 h-48 object-cover rounded-[2rem] shadow-2xl relative z-10 border border-white/10"
              />
            </div>
            <h1 className="text-4xl font-black text-white tracking-widest animate-pulse">LOADING...</h1>
            
            <div className="mt-auto pb-8">
               <p className="text-gray-500 text-sm tracking-[0.3em] font-bold uppercase">Developed by</p>
               <p className="text-white text-lg font-black tracking-widest mt-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">DEV SHUKLA</p>
            </div>
          </div>
        )}

        {currentScreen === 'home' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-700">
            
            {/* Logo Area */}
            <div className="mb-12 relative">
              <div className="absolute inset-0 bg-primary filter blur-3xl opacity-30 rounded-full"></div>
              <div className="w-32 h-32 mx-auto bg-surface border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 rotate-3">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-primary -rotate-3">RR</span>
              </div>
            </div>

            {/* Title */}
            <div className="mb-16">
              <h1 className="text-5xl font-black tracking-tighter mb-3 text-white drop-shadow-lg">
                RedRole
              </h1>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase letter-spacing-2">
                Deception & Deduction
              </p>
            </div>

            {/* Play Button */}
            <div className="w-full mt-auto mb-8">
              <button 
                onClick={() => setCurrentScreen('offlineLobby')}
                className="w-full group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-black text-lg py-5 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_-10px_rgba(225,29,72,0.5)] border border-red-500/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <Play size={24} className="relative z-10 fill-current" />
                <span className="relative z-10 tracking-wider">TAP TO PLAY</span>
              </button>
              
              <p className="text-xs text-gray-500 mt-6 font-medium">Pass & Play Mode</p>
            </div>

            {/* Developer Credit */}
            <div className="w-full text-center mt-auto pb-4">
               <p className="text-gray-600 text-[10px] tracking-widest font-bold uppercase">Developed by Dev Shukla</p>
            </div>

          </div>
        )}

        {currentScreen === 'offlineLobby' && (
          <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-right-8 duration-300">
            <OfflineLobby 
              onBack={() => setCurrentScreen('home')} 
              onStartGame={(names) => {
                setPlayers(names);
                setCurrentScreen('game');
              }} 
            />
          </div>
        )}

        {currentScreen === 'game' && (
          <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-500">
            <OfflineGame 
              playerNames={players} 
              onEndGame={() => setCurrentScreen('home')} 
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
