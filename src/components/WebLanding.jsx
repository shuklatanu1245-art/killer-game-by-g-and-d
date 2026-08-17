import React from 'react';
import { Download, Gamepad2, Users, Star, Smartphone } from 'lucide-react';

export default function WebLanding({ onPlayWeb }) {
  return (
    <div className="min-h-screen bg-[#05070A] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="glass-panel p-10 max-w-lg w-full text-center relative z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* App Logo */}
        <div className="mx-auto w-32 h-32 mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-[2rem] blur-xl opacity-50 animate-pulse"></div>
          <img 
            src="/logo.jpg" 
            alt="Creovate Games Logo" 
            className="w-full h-full object-cover rounded-[2rem] border-2 border-white/20 relative z-10 shadow-2xl"
          />
        </div>

        <h1 className="text-4xl font-black mb-2 tracking-widest uppercase bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Creovate Games
        </h1>
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-10">
          The Ultimate Offline Party Hub
        </p>

        {/* Features */}
        <div className="flex justify-around mb-10">
          <div className="flex flex-col items-center">
             <Gamepad2 size={24} className="text-primary mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Multiple Games</span>
          </div>
          <div className="flex flex-col items-center">
             <Users size={24} className="text-blue-500 mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Up to 10 Players</span>
          </div>
          <div className="flex flex-col items-center">
             <Star size={24} className="text-accent mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Offline Play</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Download Button (Android) */}
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">For Android Devices</p>
            <a 
              href="/CreovateGames.apk" 
              download="CreovateGames.apk"
              className="w-full glass-btn py-4 rounded-xl font-black tracking-widest text-sm uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(225,29,72,0.4)] group"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Download APK
            </a>
          </div>

          {/* Web Play Button (iPhone) */}
          <div className="mt-2">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">For iPhone / iOS Devices</p>
            <button 
              onClick={onPlayWeb}
              className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-black tracking-widest text-sm uppercase flex items-center justify-center gap-3 transition-all hover:bg-white/10 hover:border-white/20 group text-white"
            >
              <Smartphone size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
              Play on Web
            </button>
          </div>
        </div>
        
      </div>

    </div>
  );
}
