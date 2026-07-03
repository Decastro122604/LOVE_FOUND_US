import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, HelpCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MusicTrack } from '../types';

const PRESET_TRACKS: MusicTrack[] = [
  {
    id: 'ambient-synth',
    title: 'Generative Quietude',
    artist: 'Synthesized Ambient Chords',
    url: 'generative'
  },
  {
    id: 'track-1',
    title: 'Soft Romantic Piano',
    artist: 'Nostalgic Solitude',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'track-2',
    title: 'Gentle Acoustic Guitar',
    artist: 'Evening Breeze',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(PRESET_TRACKS[0]);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Web Audio Synth for "generative"
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    setIsPlaying(true);
    if (currentTrack.url === 'generative') {
      startGenerativeSynth();
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.warn("Autoplay block or audio load error:", err);
        });
      }
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (currentTrack.url === 'generative') {
      stopGenerativeSynth();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  // Set Track
  const handleSelectTrack = (track: MusicTrack) => {
    const wasPlaying = isPlaying;
    
    // Stop current
    if (currentTrack.url === 'generative') {
      stopGenerativeSynth();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrack(track);
    
    if (track.url === 'generative') {
      if (wasPlaying) {
        setIsPlaying(true);
        // Start after state update
        setTimeout(() => startGenerativeSynth(), 50);
      } else {
        setIsPlaying(false);
      }
    } else {
      // Standard audio element
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          if (wasPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
          }
        }
      }, 50);
    }
  };

  // Start Generative Synth (Chord loop)
  const startGenerativeSynth = () => {
    stopGenerativeSynth(); // Safe guard
    
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      
      // Beautiful soothing pentatonic notes (A major / F# minor pentatonic for a gentle celestial tone)
      const frequencies = [220.00, 277.18, 329.63, 440.00, 554.37, 659.25, 880.00]; 
      
      const playSoothingChord = () => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        
        // Root + 3rd + 5th + beautiful high notes
        // Choose 3 random notes from the soothing scale
        const chordNotes = [
          frequencies[Math.floor(Math.random() * 2)], // low root/third
          frequencies[2 + Math.floor(Math.random() * 2)], // mid
          frequencies[4 + Math.floor(Math.random() * 3)], // high
        ];
        
        chordNotes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc.type = 'sine'; // Super pure, gentle tone
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          // Very gentle slow attack and decay (extremely soft volume)
          const now = ctx.currentTime;
          const noteVolume = (isMuted ? 0 : volume) * 0.08; // extremely soft, background pad
          
          gainNode.gain.setValueAtTime(0, now);
          // 2 seconds attack
          gainNode.gain.linearRampToValueAtTime(noteVolume, now + 2 + idx * 0.5);
          // 6 seconds decay
          gainNode.gain.setValueAtTime(noteVolume, now + 5 + idx * 0.5);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 10 + idx * 0.5);
          
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start(now);
          // Stop node after finished decay
          osc.stop(now + 11);
          
          activeNodesRef.current.push(osc, gainNode);
          
          // Cleanup array
          setTimeout(() => {
            activeNodesRef.current = activeNodesRef.current.filter(n => n !== osc && n !== gainNode);
          }, 11500);
        });
      };

      // Play immediately
      playSoothingChord();
      
      // Repeat chord every 7 seconds for a beautiful overlapping pattern
      synthIntervalRef.current = setInterval(() => {
        playSoothingChord();
      }, 7000);
      
    } catch (e) {
      console.error("Web Audio initialization failed", e);
    }
  };

  const stopGenerativeSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    
    // Stop and disconnect nodes
    activeNodesRef.current.forEach(node => {
      try {
        if (node instanceof OscillatorNode) {
          node.stop();
        }
        node.disconnect();
      } catch (e) {}
    });
    activeNodesRef.current = [];

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Adjust volume
  useEffect(() => {
    const actualVolume = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = actualVolume;
    }
    // For Web Audio, let's keep track of volume changes
    if (audioContextRef.current && currentTrack.url === 'generative') {
      // Chords adjust dynamically in the loop next iteration, but we can restart for responsive feel if desired.
    }
  }, [volume, isMuted, currentTrack]);

  // Clean up
  useEffect(() => {
    return () => {
      stopGenerativeSynth();
    };
  }, []);

  return (
    <div id="audio-player-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Track List dropdown or selection bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 w-72 rounded-2xl border border-rose-gold/20 bg-white/80 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-soft-clay font-bold flex items-center gap-1">
                <Music className="h-3 w-3" /> Ambiance Vibe Player
              </span>
              <button 
                onClick={() => setShowTooltip(false)}
                className="text-[10px] text-soft-clay/60 hover:text-soft-clay underline"
              >
                Close
              </button>
            </div>
            <p className="mb-3 text-[11px] text-soft-clay/80 leading-relaxed">
              Every beautiful story deserves a soft soundtrack. Choose a track below to set a gentle, romantic mood.
            </p>
            <div className="space-y-1.5">
              {PRESET_TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(t)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                    currentTrack.id === t.id
                      ? 'bg-rose-gold/20 text-love-red font-medium border border-rose-gold/30'
                      : 'hover:bg-warm-cream/60 text-gentle-slate border border-transparent'
                  }`}
                >
                  <div>
                    <div className="font-medium truncate max-w-[160px]">{t.title}</div>
                    <div className="text-[10px] opacity-60 truncate max-w-[160px]">{t.artist}</div>
                  </div>
                  {currentTrack.id === t.id && isPlaying && (
                    <motion.div 
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                      className="h-3 w-3 bg-love-red rounded-full flex items-center justify-center"
                    >
                      <Activity className="h-2 w-2 text-white" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating controller */}
      <motion.div
        layout
        className="flex items-center gap-3 rounded-full border border-rose-gold/20 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md"
      >
        {/* Help tooltip toggle */}
        <button
          id="music-vibe-selector"
          onClick={() => setShowTooltip(!showTooltip)}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            showTooltip ? 'bg-rose-gold/20 text-love-red' : 'text-soft-clay/70 hover:bg-warm-cream/50 hover:text-soft-clay'
          }`}
          title="Select Vibe Soundtrack"
        >
          <Music className="h-4 w-4" />
        </button>

        {/* Play/Pause Button */}
        <button
          id="play-music-button"
          onClick={handleTogglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-love-red text-white shadow-md hover:bg-love-red/90 transition-transform active:scale-95"
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white translate-x-[1px]" />}
        </button>

        {/* Song Info (Mini) */}
        <div className="flex flex-col max-w-[100px] select-none">
          <span className="truncate text-xs font-semibold text-gentle-slate">
            {currentTrack.title}
          </span>
          <span className="truncate text-[10px] text-soft-clay/60">
            {currentTrack.artist}
          </span>
        </div>

        {/* Interactive soundwave when active */}
        <div className="flex h-5 items-end gap-[2px] px-1 select-none w-10">
          {[1, 2, 3, 4, 5].map((bar) => (
            <motion.div
              key={bar}
              className="w-[3px] bg-rose-gold rounded-full"
              animate={isPlaying ? {
                height: [
                  '15%', 
                  bar === 1 ? '70%' : bar === 2 ? '40%' : bar === 3 ? '100%' : bar === 4 ? '50%' : '80%', 
                  '15%'
                ]
              } : { height: '15%' }}
              transition={{
                repeat: Infinity,
                duration: 1.2 + bar * 0.1,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Mute/Volume controls */}
        <div className="flex items-center gap-1.5 border-l border-rose-gold/10 pl-3">
          <button
            id="mute-music-button"
            onClick={() => setIsMuted(!isMuted)}
            className="text-soft-clay/70 hover:text-love-red transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          
          <input
            id="music-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-14 h-1 bg-rose-gold/20 rounded-lg appearance-none cursor-pointer accent-love-red focus:outline-none"
            style={{
              background: `linear-gradient(to right, #d36b5c 0%, #d36b5c ${
                (isMuted ? 0 : volume) * 100
              }%, rgba(229, 169, 158, 0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(229, 169, 158, 0.2) 100%)`
            }}
          />
        </div>
      </motion.div>

      {/* Actual HTMLAudioElement for streams */}
      {currentTrack.url !== 'generative' && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          loop
          preload="auto"
        />
      )}
    </div>
  );
}
