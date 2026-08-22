// Procedural Sound Engine using Web Audio API
// This avoids bundling large MP3 files.

let audioCtx = null;
let bgmOscillators = [];
let bgmGain = null;
let bgmPlaying = false;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playBackgroundMusic = () => {
  if (bgmPlaying) return;
  try {
    initAudio();
    bgmPlaying = true;
    
    bgmGain = audioCtx.createGain();
    bgmGain.gain.value = 0.05; // Very quiet background drone
    bgmGain.connect(audioCtx.destination);
    
    // Create a dark, moody drone using 3 oscillators
    const freqs = [55.00, 82.41, 110.00]; // A1, E2, A2 (power chord)
    freqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      // Add a slight detune to make it sound richer
      osc.detune.value = (Math.random() - 0.5) * 10;
      
      osc.connect(bgmGain);
      osc.start();
      bgmOscillators.push(osc);
    });

    // Slow LFO for breathing effect
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.05; // very slow
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(bgmGain.gain);
    lfo.start();
    bgmOscillators.push(lfo);

  } catch (e) {
    console.error("BGM failed", e);
  }
};

export const playTick = () => {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch tick
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const playHeartbeat = () => {
  try {
    initAudio();
    
    // First beat
    let osc1 = audioCtx.createOscillator();
    let gain1 = audioCtx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(50, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.1);
    gain1.gain.setValueAtTime(1, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.2);

    // Second beat (slightly delayed)
    let osc2 = audioCtx.createOscillator();
    let gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(55, audioCtx.currentTime + 0.25);
    osc2.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.35);
    gain2.gain.setValueAtTime(0.8, audioCtx.currentTime + 0.25);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime + 0.25);
    osc2.stop(audioCtx.currentTime + 0.45);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const playChime = () => {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 1.0);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};
