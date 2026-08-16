import { useState, useEffect } from 'react';
import { Play, Download, Home as HomeIcon, Users, MessageSquare, Settings as SettingsIcon, Gamepad2 } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import Home from './components/Home';
import Profiles from './components/Profiles';
import OfflineGame from './components/OfflineGame';
import Instructions from './components/Instructions';
import SketchGame from './components/SketchGame';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading'); // 'loading', 'hub', 'game', 'instructions'
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'active', 'profiles', 'messages', 'settings'
  
  const [globalPlayers, setGlobalPlayers] = useState(() => {
    const saved = localStorage.getItem('creovate_global_players');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return Array(4).fill('');
      }
    }
    return Array(4).fill('');
  });

  const [activeGame, setActiveGame] = useState(null); // 'redrole', etc
  
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (currentScreen === 'loading') {
      const timer = setTimeout(() => setCurrentScreen('hub'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handlePlayGame = (gameId) => {
    // Validate players before launching
    const validPlayers = globalPlayers.filter(p => p.trim().length > 0);
    if (validPlayers.length < 4) {
      alert("You need at least 4 valid players in Profiles to start this game.");
      setActiveTab('profiles');
      return;
    }
    setActiveGame(gameId);
    setCurrentScreen('game');
  };

  const handleShowInstructions = (gameId) => {
    setCurrentScreen('instructions');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onPlayGame={handlePlayGame} onShowInstructions={handleShowInstructions} />;
      case 'profiles':
        return <Profiles globalPlayers={globalPlayers} setGlobalPlayers={setGlobalPlayers} />;
      case 'active':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <Gamepad2 size={48} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">No Active Game</h2>
            <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">Start a game from the Home tab.</p>
          </div>
        );
      case 'messages':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <MessageSquare size={48} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">Messages</h2>
            <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">No new messages from Creovate Studio.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <SettingsIcon size={48} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">Settings</h2>
            <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">Coming soon.</p>
            {!isNative && (
              <a 
                href="/RedRole_Creovate.apk" 
                download="RedRole_Creovate.apk"
                className="mt-8 flex items-center justify-center gap-3 glass-btn py-4 px-6 rounded-2xl overflow-hidden text-sm w-full max-w-[250px]"
              >
                <Download size={20} className="relative z-10" />
                <span className="relative z-10 tracking-widest uppercase font-bold">Download App</span>
              </a>
            )}
          </div>
        );
      default:
        return <Home onPlayGame={handlePlayGame} onShowInstructions={handleShowInstructions} />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Decor (Professional & Subtle) */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[300px] h-[300px] bg-red-900 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Mobile Container Wrapper */}
      <div className="w-full max-w-md h-full min-h-[100dvh] flex flex-col relative z-10 sm:border-x sm:border-white/5 bg-black shadow-2xl">
        
        {currentScreen === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 bg-black z-50">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-primary filter blur-3xl opacity-40 rounded-full animate-pulse"></div>
              <img 
                src="/logo.jpg" 
                alt="Creovate Logo" 
                className="w-48 h-48 object-cover rounded-[2rem] shadow-[0_0_40px_rgba(225,29,72,0.3)] relative z-10 border border-white/10"
              />
            </div>
            <h1 className="text-3xl font-black text-white tracking-widest animate-pulse uppercase">Creovate Games</h1>
            
            <div className="mt-auto pb-8">
               <p className="text-gray-500 text-sm tracking-[0.3em] font-bold uppercase">Developed by</p>
               <p className="text-white text-lg font-black tracking-widest mt-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">CREOVATE STUDIO</p>
            </div>
          </div>
        )}

        {currentScreen === 'hub' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            
            {/* Tab Content Area */}
            <div className="flex-1 overflow-hidden">
              {renderTabContent()}
            </div>

            {/* Bottom Tab Bar */}
            <div className="glass-panel rounded-none rounded-t-3xl border-b-0 border-x-0 border-t border-white/10 p-4 pb-6 sm:pb-4 flex justify-between items-center relative z-20">
              
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'home' ? 'text-primary' : 'text-gray-500'} transition-colors`}>
                <HomeIcon size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
              </button>
              
              <button onClick={() => setActiveTab('active')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'active' ? 'text-primary' : 'text-gray-500'} transition-colors`}>
                <Gamepad2 size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
              </button>
              
              <button onClick={() => setActiveTab('profiles')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'profiles' ? 'text-primary' : 'text-gray-500'} transition-colors`}>
                <Users size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Profiles</span>
              </button>
              
              <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'messages' ? 'text-primary' : 'text-gray-500'} transition-colors`}>
                <MessageSquare size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Chat</span>
              </button>
              
              <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'settings' ? 'text-primary' : 'text-gray-500'} transition-colors`}>
                <SettingsIcon size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
              </button>

            </div>
          </div>
        )}

        {currentScreen === 'instructions' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in slide-in-from-right-8 duration-300">
            <Instructions 
              onBack={() => setCurrentScreen('hub')}
              onComplete={() => setCurrentScreen('hub')} 
            />
          </div>
        )}

        {currentScreen === 'game' && activeGame === 'redrole' && (
          <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-500">
            <OfflineGame 
              playerNames={globalPlayers.filter(p => p.trim().length > 0)} 
              onEndGame={() => setCurrentScreen('hub')} 
            />
          </div>
        )}

        {currentScreen === 'game' && activeGame === 'sketch' && (
          <div className="flex-1 flex flex-col p-0 animate-in fade-in duration-500 bg-black">
            <SketchGame 
              playerNames={globalPlayers.filter(p => p.trim().length > 0)} 
              onEndGame={() => setCurrentScreen('hub')} 
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
