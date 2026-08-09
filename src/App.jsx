import { useState, useEffect } from 'react';
import { WifiOff, Wifi, Play, Users } from 'lucide-react';
import OfflineLobby from './components/OfflineLobby';
import './index.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'offlineLobby', 'game'
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      {currentScreen === 'home' && (
        <>
          {/* Network Status Badge */}
      <div className="absolute top-6 right-6">
        {isOnline ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
            <Wifi size={14} /> ONLINE
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
            <WifiOff size={14} /> OFFLINE
          </div>
        )}
      </div>

      <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-br from-white to-primary bg-clip-text text-transparent">
          RedRole
        </h1>
        <p className="text-gray-400 text-sm mb-10 font-medium">A Game of Deception & Deduction</p>

        <div className="space-y-4">
          {isOnline && (
            <button className="w-full group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              <Users size={20} className="group-hover:animate-bounce" />
              PLAY ONLINE
            </button>
          )}

          <button 
            onClick={() => setCurrentScreen('offlineLobby')}
            className="w-full group flex items-center justify-center gap-3 bg-surface hover:bg-surface/80 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95"
          >
            <Play size={20} className="text-accent group-hover:scale-110 transition-transform" />
            PLAY OFFLINE (PASS & PLAY)
          </button>
        </div>

        {!isOnline && (
          <p className="mt-6 text-xs text-gray-500">
            You are not connected to the internet. Only Offline Mode is available.
          </p>
        )}
      </div>
        </>
      )}

      {currentScreen === 'offlineLobby' && (
        <OfflineLobby 
          onBack={() => setCurrentScreen('home')} 
          onStartGame={(names) => {
            setPlayers(names);
            setCurrentScreen('game');
          }} 
        />
      )}

      {currentScreen === 'game' && (
        <div className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-4">Game Started!</h2>
          <p className="text-gray-400">Players: {players.join(', ')}</p>
          <button 
            onClick={() => setCurrentScreen('home')}
            className="mt-6 text-primary hover:text-white transition-colors"
          >
            End Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
