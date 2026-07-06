/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  ArrowDown,
  Cross,
} from 'lucide-react';

import Timeline from './components/Timeline';
import BentoGrid from './components/BentoGrid';
import InteractionCenter from './components/InteractionCenter';
import Gallery from './components/Gallery';
import AudioPlayer from './components/AudioPlayer';
import LoadingScreen from './components/LoadingScreen';

import COUPLE_PORTRAIT from './assets/images/cover.png';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [relationshipAge, setRelationshipAge] = useState({ years: 0, months: 0, days: 0, totalDays: 0 });
  const typewriterFull = 'A gentle love letter in soft motion.';
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    const computeRelationshipAge = () => {
      const start = new Date(2019, 4, 2);
      const now = new Date();
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += previousMonth;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const totalDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setRelationshipAge({ years, months, days, totalDays });
    };

    computeRelationshipAge();
    const interval = setInterval(computeRelationshipAge, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setTypewriterText(typewriterFull.slice(0, current + 1));
      current += 1;
      if (current === typewriterFull.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll handler
  const handleScrollToStory = () => {
    const section = document.getElementById('story-timeline-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (isLoading) {
  return <LoadingScreen isLoading={true} />;
 }

  return (
  <div className="relative min-h-screen selection:bg-rose-gold/30 selection:text-soft-clay antialiased app-root">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-rose-gold/10 via-rose-gold/5 to-transparent pointer-events-none" />
      
      {/* 1. Hero / Invitation Screen */}
      <header className="relative min-h-[95vh] flex items-center justify-center px-4 py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.05, 1], y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute left-12 top-20 h-40 w-40 rounded-full bg-rose-gold/15 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -16, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
            className="absolute right-16 top-28 h-52 w-52 rounded-full bg-love-red/10 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.5 }}
            className="absolute left-1/2 top-14 h-20 w-20 -translate-x-1/2 rounded-full bg-[var(--color-surface-soft)]/40 blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.5 }}
            className="absolute top-24 left-24 text-rose-gold"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="absolute bottom-24 right-24 text-love-red/70"
          >
            <Sparkles className="h-10 w-10" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -18, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.8 }}
            className="absolute top-36 right-1/2 h-7 w-7 rotate-12 text-love-red/60"
          >
            <Heart className="h-full w-full" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -14, 0], opacity: [0.1, 0.45, 0.1] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 0.2 }}
            className="absolute left-28 bottom-20 text-love-red/40"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-love-red font-semibold"
            >
              <Heart className="h-4 w-4 text-love-red fill-love-red" />
              A gentle love letter
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-gentle-slate tracking-tight leading-[1.05] mt-6"
            >
              The story of <span className="text-love-red italic block sm:inline mt-3 sm:mt-0">Bry & Lyka</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mx-auto mt-7 max-w-2xl text-sm sm:text-base md:text-lg text-soft-clay leading-relaxed"
            >
              "For years, we have been choosing each other, trusting God's timing, and building a love worth waiting for." <Heart className="inline-block h-4 w-4 text-love-red align-middle" />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 max-w-xl text-sm sm:text-base text-soft-clay/80 leading-7"
            >
              A soft, faith-filled place to revisit every memory, letter, and quiet promise — wrapped in warmth and timeless devotion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-6 max-w-xl text-sm sm:text-base text-soft-clay/90 leading-7 font-medium"
            >
              <span className="mr-1 text-love-red">{typewriterText}</span>
              <span className="animate-pulse">|</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start"
            >
              <div className="rounded-[2rem] border border-rose-gold/10 bg-white/90 px-5 py-4 shadow-sm shadow-[0_0_20px_rgba(0,0,0,0.08)]">
                <p className="text-[10px] uppercase tracking-[0.35em] text-soft-clay/70">Together since May 02, 2019</p>
                <p className="mt-3 text-2xl font-semibold text-love-red">
                  {relationshipAge.years}y · {relationshipAge.months}m · {relationshipAge.days}d
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-soft-clay/60">
                  {relationshipAge.totalDays} days and counting
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start"
            >
              <button
                id="explore-story-arrow"
                onClick={handleScrollToStory}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-love-red px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-love-red/20 transition hover:bg-rose-gold/90"
              >
                <ArrowDown className="h-4 w-4" />
                Enter Our Story
              </button>
              <span className="text-[11px] uppercase tracking-[0.35em] text-soft-clay/70">
                Scroll down for memories
              </span>
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-12 top-10 h-24 w-24 rounded-full bg-rose-gold/20 blur-3xl" />
            <div className="absolute left-0 -bottom-10 h-32 w-32 rounded-full bg-love-red/10 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="relative mx-auto rounded-[2.75rem] border border-white/50 bg-white/95 p-5 shadow-[0_45px_120px_-50px_rgba(148,85,68,0.45)]"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
              whileHover={{ rotate: -1, y: -4 }}
            >
              <div className="absolute inset-0 rounded-[2.75rem] border border-rose-gold/10" />
              <div className="absolute left-4 top-5 h-12 w-12 rounded-full bg-love-red/10 blur-xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-rose-gold/10 bg-warm-cream shadow-xl">
                <img
                  src={COUPLE_PORTRAIT}
                  alt="Bry and Lyka fine editorial portrait, smiling close together"
                  className="h-[420px] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d1610]/85 to-transparent px-5 py-4">
                  <p className="font-display text-xl text-white">Bry & Lyka</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/70">
                    Est. 2019 — Guided by Faith
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="absolute -bottom-10 right-0 w-56 rounded-[2rem] border border-rose-gold/10 bg-white/95 p-4 shadow-xl"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-love-red font-semibold mb-2">
                A whispered note
              </p>
              <p className="text-sm leading-relaxed text-soft-clay/90">
                These are the pages where memories stay soft, true, and beautifully kept — just like the love we keep nurturing.
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. Primary Narrative Block Quote Banner */}
      <section className="py-20 px-4 text-center bg-[var(--color-surface-soft)] border-y border-rose-gold/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] text-love-red uppercase tracking-wider font-bold">The Heart of Our Journey</span>
          
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="font-display text-xl sm:text-2xl md:text-3xl text-gentle-slate font-medium leading-relaxed max-w-3xl mx-auto mt-6 mb-8 italic"
          >
            "Since 2019, God has been writing the most beautiful chapter of my life through a man who patiently loved me, respected me, strengthened me, brought me closer to Him, and taught me that the most beautiful kind of love is the one that chooses you every single day."
            <Heart className="inline-block h-6 w-6 align-middle text-love-red" />
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
