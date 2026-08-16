import { useState } from 'react';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function Instructions({ onComplete, onBack }) {
  const [page, setPage] = useState(0);

  const slides = [
    {
      title: "THE GOAL",
      content: (
        <div className="space-y-4 text-left">
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-white">RedRole</strong> is a social deduction game of deception, played on a single phone (Pass & Play).
          </p>
          <div className="glass-input p-4 rounded-xl border border-white/5">
            <h3 className="text-accent font-black tracking-widest uppercase mb-1">CIVILIANS</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Find out who the Killer is and vote them out during the day to win.</p>
          </div>
          <div className="glass-input p-4 rounded-xl border border-white/5">
            <h3 className="text-primary font-black tracking-widest uppercase mb-1">KILLER</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Kill enough Civilians to equal their numbers without getting caught.</p>
          </div>
        </div>
      )
    },
    {
      title: "SECRET ROLES",
      content: (
        <div className="space-y-3 text-left max-h-64 overflow-y-auto custom-scrollbar pr-2">
          <div className="glass-input p-3 rounded-xl border border-white/5 flex gap-3 items-center">
            <span className="text-3xl">🔪</span>
            <div>
              <h4 className="text-primary font-black tracking-widest text-sm">KILLER</h4>
              <p className="text-gray-500 text-xs">Eliminates one player each night.</p>
            </div>
          </div>
          <div className="glass-input p-3 rounded-xl border border-white/5 flex gap-3 items-center">
            <span className="text-3xl">🩺</span>
            <div>
              <h4 className="text-accent font-black tracking-widest text-sm">DOCTOR</h4>
              <p className="text-gray-500 text-xs">Saves one player from dying each night.</p>
            </div>
          </div>
          <div className="glass-input p-3 rounded-xl border border-white/5 flex gap-3 items-center">
            <span className="text-3xl">🕵️</span>
            <div>
              <h4 className="text-blue-500 font-black tracking-widest text-sm">DETECTIVE</h4>
              <p className="text-gray-500 text-xs">Investigates a player secretly at night to see if they are the Killer.</p>
            </div>
          </div>
          <div className="glass-input p-3 rounded-xl border border-white/5 flex gap-3 items-center">
            <span className="text-3xl">🃏</span>
            <div>
              <h4 className="text-purple-500 font-black tracking-widest text-sm">JOKER</h4>
              <p className="text-gray-500 text-xs">Wins ONLY if they get voted out during the day by tricking everyone.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "THE NIGHT",
      content: (
        <div className="space-y-4 text-left">
          <div className="text-center mb-6">
            <span className="text-5xl">🌙</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-primary pl-4">
            During the night phase, pass the phone to each player one by one.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-accent pl-4">
            If you have a role (Killer/Doctor), choose a target. 
          </p>
          <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
            If you are just a Civilian, <strong className="text-white">pretend to do something</strong> so no one knows your role!
          </p>
        </div>
      )
    },
    {
      title: "THE DAY",
      content: (
        <div className="space-y-4 text-left">
          <div className="text-center mb-6">
            <span className="text-5xl">☀️</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed glass-input p-4 rounded-xl border border-white/5">
            When the sun rises, the phone will announce if anyone was killed. 
          </p>
          <p className="text-gray-300 text-sm leading-relaxed glass-input p-4 rounded-xl border border-white/5">
            Everyone discusses for 30-60 seconds. Then, as a group, agree on who you think the Killer is and cast <strong className="text-white">one group vote</strong> to eliminate them. Or, you can SKIP the vote.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="glass-panel p-8 max-w-md w-full relative z-10 flex flex-col min-h-[70vh]">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mt-4 mb-8">
        <p className="text-primary text-xs tracking-widest font-bold uppercase mb-2">How to Play</p>
        <h2 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_currentColor]">{slides[page].title}</h2>
      </div>

      <div className="flex-1 mb-8">
        {slides[page].content}
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === page ? 'w-8 bg-primary' : 'w-2 bg-gray-700'}`} />
        ))}
      </div>

      <div className="mt-auto">
        {page < slides.length - 1 ? (
          <button 
            onClick={() => setPage(page + 1)}
            className="w-full flex items-center justify-center gap-3 glass-btn py-4 px-6 rounded-xl group"
          >
            NEXT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-3 glass-btn glass-btn-red py-4 px-6 rounded-xl group"
          >
            <CheckCircle2 size={20} />
            OK, LET'S PLAY!
          </button>
        )}
      </div>
    </div>
  );
}
