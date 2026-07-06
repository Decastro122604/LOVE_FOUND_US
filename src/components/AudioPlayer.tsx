import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/fidelfortune-gentle-acoustic-guitar-319483.mp3"
        loop
        preload="auto"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="flex items-center gap-3 rounded-full border border-rose-gold/20 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
          
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-love-red" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gentle-slate">
                Our Song ❤️
              </span>
              <span className="text-[10px] text-soft-clay/70">
                Bry & Lyka
              </span>
            </div>
          </div>

          <button
            onClick={handlePlayPause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-love-red text-white shadow-md transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 translate-x-[1px]" />
            )}
          </button>

          <div className="flex h-5 items-end gap-[2px] w-10">
            {[1, 2, 3, 4, 5].map((bar) => (
              <motion.div
                key={bar}
                className="w-[3px] rounded-full bg-rose-gold"
                animate={
                  isPlaying
                    ? {
                        height: ['20%', '100%', '20%']
                      }
                    : {
                        height: '20%'
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: 1 + bar * 0.15,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-soft-clay/70 hover:text-love-red"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 cursor-pointer accent-love-red"
          />
        </div>
      </motion.div>
    </>
  );
}