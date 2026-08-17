import React from 'react';

export const GameInstructions = {
  redrole: {
    title: "RedRole",
    slides: [
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
          </div>
        )
      },
      {
        title: "THE GAMEPLAY",
        content: (
          <div className="space-y-4 text-left">
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-primary pl-4">
              <strong>Night Phase:</strong> Pass the phone around. If you have a role, do your action. If not, pretend to do something!
            </p>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-accent pl-4">
              <strong>Day Phase:</strong> Discuss who the killer might be and vote them out.
            </p>
          </div>
        )
      }
    ]
  },
  imposter: {
    title: "Imposter Word",
    slides: [
      {
        title: "THE GOAL",
        content: (
          <div className="space-y-4 text-left">
            <p className="text-gray-300 text-sm leading-relaxed">
              Find the Imposter who doesn't know the secret word!
            </p>
            <div className="glass-input p-4 rounded-xl border border-white/5">
              <h3 className="text-blue-500 font-black tracking-widest uppercase mb-1">CIVILIANS</h3>
              <p className="text-gray-400 text-xs leading-relaxed">You will see a <strong>Secret Word</strong> and a Category Hint. Find the imposter without making the word too obvious.</p>
            </div>
            <div className="glass-input p-4 rounded-xl border border-white/5">
              <h3 className="text-primary font-black tracking-widest uppercase mb-1">IMPOSTER</h3>
              <p className="text-gray-400 text-xs leading-relaxed">You will <strong>NOT</strong> get the word. You only get the Hint. Blend in and don't get voted out!</p>
            </div>
          </div>
        )
      },
      {
        title: "HOW TO PLAY",
        content: (
          <div className="space-y-4 text-left">
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-blue-500 pl-4">
              <strong>Pass the Phone:</strong> Everyone looks at their secret role. Imposters will also see who their teammates are.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
              <strong>Discussion:</strong> Talk and try to figure out who is faking it. Imposters must lie and pretend they know the word.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-primary pl-4">
              <strong>Voting:</strong> At the end of the timer, the group selects a player to eliminate.
            </p>
          </div>
        )
      }
    ]
  },
  sketch: {
    title: "Sketch & Guess",
    slides: [
      {
        title: "THE GOAL",
        content: (
          <div className="space-y-4 text-left">
            <p className="text-gray-300 text-sm leading-relaxed">
              A hilarious game of Telephone, but with drawing!
            </p>
            <div className="glass-input p-4 rounded-xl border border-white/5 text-center">
              <p className="text-white font-bold mb-2">Word ➔ Draw ➔ Guess ➔ Draw</p>
              <p className="text-gray-400 text-xs">See how badly the original word gets mutated by the end.</p>
            </div>
          </div>
        )
      },
      {
        title: "HOW TO PLAY",
        content: (
          <div className="space-y-4 text-left">
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
              <strong>Round 1:</strong> The first player gets a random word and draws it.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
              <strong>Round 2:</strong> The next player sees the drawing and types what they think it is.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
              <strong>Continue:</strong> The next player draws THAT guess. Repeat until the end!
            </p>
          </div>
        )
      }
    ]
  }
};
