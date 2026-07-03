/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowDown, Compass, Cross, Shield } from 'lucide-react';
import Timeline from './components/Timeline';
import BentoGrid from './components/BentoGrid';
import InteractionCenter from './components/InteractionCenter';
import Gallery from './components/Gallery';
import AudioPlayer from './components/AudioPlayer';
import COUPLE_PORTRAIT from './assets/images/cover.png';

export default function App() {
  
  // Smooth scroll handler
  const handleScrollToStory = () => {
    const section = document.getElementById('story-timeline-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-gold/30 selection:text-soft-clay antialiased bg-warm-cream">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-rose-gold/10 via-rose-gold/5 to-transparent pointer-events-none" />
      
      {/* 1. Hero / Invitation Screen */}
      <header className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
        
        {/* Subtle Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute top-24 left-1/4 text-rose-gold text-lg"
          >
            ✨
          </motion.div>
          <motion.div 
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 right-1/4 text-rose-gold text-2xl"
          >
            🌸
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          
          {/* Gentle Title Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4 bg-rose-gold/10 px-4 py-2 rounded-full border border-rose-gold/25"
          >
            <Heart className="h-4.5 w-4.5 text-love-red fill-love-red" />
            <span className="font-mono text-xs text-soft-clay uppercase tracking-widest font-semibold">
              Love Found Us
            </span>
          </motion.div>

          {/* Main Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-gentle-slate tracking-tight leading-[1.1] mb-6"
          >
            The Story of <span className="text-love-red italic block sm:inline mt-2 sm:mt-0">Bry & Lyka</span>
          </motion.h1>

          {/* Core Tagline / Narrative Invitation */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-soft-clay max-w-2xl leading-relaxed mb-10 font-medium"
          >
            "Not boyfriend and girlfriend yet. Not husband and wife yet. But for years, we have been choosing each other, trusting God's timing, and building a love worth waiting for." 💕
          </motion.p>

          {/* Visual Hero Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-12 relative group"
          >
            <div className="absolute inset-0 bg-rose-gold/15 rounded-3xl blur-xl group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border-4 border-white bg-white shadow-xl p-3 max-w-xs md:max-w-sm rotate-2 hover:rotate-0 transition-all duration-500">
              <img
                src={COUPLE_PORTRAIT}
                alt="Bry and Lyka fine editorial portrait, smiling close together"
                className="rounded-2xl w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="mt-3 py-1 text-center border-t border-rose-gold/10">
                <span className="font-display text-base font-bold text-soft-clay">Bry & Lyka</span>
                <span className="block font-mono text-[9px] text-soft-clay/50 uppercase mt-0.5">EST. 2019 — Guided by Faith</span>
              </div>
            </div>
          </motion.div>

          {/* Call to action arrow */}
          <motion.button
            id="explore-story-arrow"
            onClick={handleScrollToStory}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="flex flex-col items-center gap-1.5 cursor-pointer text-soft-clay hover:text-love-red transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">Enter Our Story</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </header>

      {/* 2. Primary Narrative Block Quote Banner */}
      <section className="py-20 px-4 text-center bg-white border-y border-rose-gold/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] text-love-red uppercase tracking-wider font-bold">The Heart of Our Journey</span>
          
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="font-display text-xl sm:text-2xl md:text-3xl text-gentle-slate font-medium leading-relaxed max-w-3xl mx-auto mt-6 mb-8 italic"
          >
            "Since 2019, God has been writing the most beautiful chapter of my life through a man who patiently loved me, respected me, strengthened me, brought me closer to Him, and taught me that the most beautiful kind of love is the one that chooses you every single day." ❤️
          </motion.blockquote>

          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-6 bg-rose-gold" />
            <span className="font-mono text-[10px] text-soft-clay/60 uppercase tracking-widest">A Love Story of Complete Commitment</span>
            <div className="h-[1px] w-6 bg-rose-gold" />
          </div>
        </div>
      </section>

      {/* 3. Interactive Timeline Component */}
      <Timeline />

      {/* 4. Bento Virtues Card Grid */}
      <BentoGrid />

      {/* 5. Polaroid Gallery */}
      <Gallery />

      {/* 6. Interaction Devotional & Letters Center */}
      <InteractionCenter />

      {/* Floating Ambient Vibe Audio Controller */}
      <AudioPlayer />

      {/* 7. Footer */}
      <footer className="bg-[#1f1e1c] text-[#e0d6cb] py-16 px-4 border-t border-black/30 text-center relative select-none">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex justify-center items-center gap-2 text-rose-gold/40">
            <Heart className="h-4 w-4 fill-rose-gold/30" />
            <Cross className="h-4 w-4" />
            <Heart className="h-4 w-4 fill-rose-gold/30" />
          </div>

          <div>
            <h5 className="font-display text-2xl font-semibold tracking-tight text-white">
              Love Found Us
            </h5>
            <p className="text-xs text-soft-clay/70 mt-1 max-w-sm mx-auto leading-relaxed">
              "We continue choosing each other. Again. And again. And again."
            </p>
          </div>

          <div className="w-10 h-[1px] bg-rose-gold/20 mx-auto" />

          <p className="text-[10px] font-mono uppercase tracking-widest text-soft-clay/50">
            © 2019 — 2026 Bry & Lyka • Dedicated with Absolute Tenderness
          </p>

          <div className="flex items-center justify-center gap-2 text-[10px] text-soft-clay/40 italic">
            <span>"In His perfect timing, everything becomes beautiful"</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
