import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Heart, Cross, Mail, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { ReassuranceQuote, LoveLetter } from '../types';

const REASSURANCE_PROMISES: ReassuranceQuote[] = [
  {
    id: 'p1',
    text: "Since 2019, God has been writing the most beautiful chapter of my life through a man who patiently loved me, respected me, and taught me that the most beautiful kind of love is the one that chooses you every single day.",
    author: "Lyka",
    category: "love"
  },
  {
    id: 'p2',
    text: "He has made everything beautiful in its time. He also has set eternity in the human heart; yet no one can fathom what God has done from beginning to end.",
    author: "Ecclesiastes 3:11",
    category: "faith"
  },
  {
    id: 'p3',
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    author: "1 Corinthians 13:4-5",
    category: "faith"
  },
  {
    id: 'p4',
    text: "Even on days when we are still growing, still studying, and still building, my heart is completely at rest because I know we are holding hands under God's perfect timing.",
    author: "Reassurance note",
    category: "reassurance"
  },
  {
    id: 'p5',
    text: "True love is not measured by how quickly people get together. It is measured by how willing they are to stay while waiting for the right time.",
    author: "Lyka",
    category: "patience"
  },
  {
    id: 'p6',
    text: "We never have to wonder, beg, or doubt. Love is supposed to feel safe—and you show me that every single day through your actions.",
    author: "Lyka",
    category: "reassurance"
  }
];

const INTRO_LETTERS: LoveLetter[] = [
  {
    id: 'l1',
    title: 'A Note on Gentle Waiting',
    date: 'July 2026',
    excerpt: 'To the person who taught me that real love knows how to wait without complaining...',
    content: 'Thank you for never rushing. Thank you for respecting my family, for understanding that our futures are being built, and for realizing that the best chapters of our lives are worth taking slowly. You stood by me when it was easy, but you chose to wait when it required sacrifice. That patience is the rarest gift.',
    readTime: '2 min read'
  },
  {
    id: 'l2',
    title: 'The Safe Sanctuary',
    date: 'June 2026',
    excerpt: 'Reflecting on how love stopped being a feeling of chaos and became my safe calm...',
    content: 'Before you, love felt like something you had to prove, something that would keep you overthinking at night. But you showed me that love is consistency. It is listening when I struggle, staying when things get heavy, comforting my overthinking mind, and bringing me flowers of peace. You are the quiet home my heart runs back to.',
    readTime: '3 min read'
  },
  {
    id: 'l3',
    title: 'Built Around Three',
    date: 'May 2026',
    excerpt: 'Our foundation has never been just you and me. It has always been rooted in Him...',
    content: 'The reason our love feels so unbreakable despite the lack of labels is because we are not holding it together alone. God is. Thank you for reminding me to pray, for leading me closer to faith, and for showing me that a love built around God is a love that never collapses. You are my greatest answered prayer.',
    readTime: '2 min read'
  }
];

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  emoji: string;
}

export default function InteractionCenter() {
  const [activePromise, setActivePromise] = useState<ReassuranceQuote>(REASSURANCE_PROMISES[0]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [chooseCount, setChooseCount] = useState(2019); // Stating from their year 2019!

  // Heart particle trigger
  const triggerHearts = (e: MouseEvent<HTMLButtonElement>) => {
    setChooseCount(prev => prev + 1);
    
    // Create custom particle burst
    const rect = e.currentTarget.getBoundingClientRect();
    const emojis = ['❤️', '💖', '✨', '🌸', '💕', '🧸', '⛪'];
    
    const newParticles: Particle[] = Array.from({ length: 14 }).map((_, idx) => ({
      id: Date.now() + idx,
      // Spread outwards from the click position
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 150 - 40,
      scale: Math.random() * 0.6 + 0.6,
      rotate: Math.random() * 80 - 40,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setParticles(prev => [...prev, ...newParticles]);
    
    // Choose a random promise
    let randomIdx = Math.floor(Math.random() * REASSURANCE_PROMISES.length);
    // Ensure we don't choose the same one back to back
    if (REASSURANCE_PROMISES[randomIdx].id === activePromise.id) {
      randomIdx = (randomIdx + 1) % REASSURANCE_PROMISES.length;
    }
    setActivePromise(REASSURANCE_PROMISES[randomIdx]);

    // Clean particles
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  return (
    <section id="devotional-interaction-section" className="py-24 px-4 bg-warm-cream/20 border-t border-rose-gold/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Our Foundation (God) + Promise Box */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* The God Centered Foundation Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-rose-gold/20 bg-white p-8 md:p-10 shadow-sm relative overflow-hidden"
            >
              {/* Spiritual glow background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-rose-gold/20 text-soft-clay flex items-center justify-center">
                  <Cross className="h-5 w-5 text-soft-clay" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-soft-clay/60 uppercase tracking-widest font-semibold block">The Strongest Cord</span>
                  <h3 className="font-display text-2xl font-bold text-gentle-slate">Our Foundation: God</h3>
                </div>
              </div>

              <blockquote className="text-base text-soft-clay leading-relaxed italic border-l-2 border-love-red/30 pl-5 mb-6">
                "The best relationships are not built around two people alone. They are built around three: God, You, and Me."
              </blockquote>

              <p className="text-xs text-gentle-slate/90 leading-relaxed mb-6">
                He does not just bring me flowers; he brings me closer to faith. He reminds me to pray, to trust God's timing, and to rest in the confidence that every true blessing comes from above. Because of him, I learned to trust God's plans more deeply.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-rose-gold/10 pt-6">
                <div className="p-4 rounded-2xl bg-warm-cream/50 border border-rose-gold/10">
                  <span className="font-mono text-[10px] uppercase text-love-red font-bold block mb-1">A Divine Gift</span>
                  <p className="text-[11px] text-soft-clay leading-relaxed">"He is one of the greatest blessings God has ever given me, an answer to my silent prayers."</p>
                </div>
                <div className="p-4 rounded-2xl bg-warm-cream/50 border border-rose-gold/10">
                  <span className="font-mono text-[10px] uppercase text-love-red font-bold block mb-1">Timing is Rest</span>
                  <p className="text-[11px] text-soft-clay leading-relaxed">"By choosing patience over rush, we honor God's timing, knowing what is meant for us is completely safe."</p>
                </div>
              </div>
            </motion.div>

            {/* Promise Box & "Choose Each Other" interactive clicker */}
            <div className="rounded-3xl border border-rose-gold/15 bg-white p-8 md:p-10 shadow-md relative text-center">
              <span className="font-mono text-[10px] uppercase text-soft-clay/50 tracking-wider">Interactive Promise Jar</span>
              <h4 className="font-display text-2xl font-bold text-gentle-slate mt-2 mb-6">Choose Each Other Every Day</h4>
              
              {/* Animated Reassurance Message container */}
              <div className="min-h-[140px] flex items-center justify-center p-6 rounded-2xl bg-warm-cream/40 border border-rose-gold/10 mb-8 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePromise.id}
                    initial={{ opacity: 0, scale: 0.98, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <p className="text-xs md:text-sm text-soft-clay leading-relaxed font-medium italic">
                      "{activePromise.text}"
                    </p>
                    <span className="font-mono text-[10px] uppercase text-love-red tracking-widest font-semibold block">
                      — {activePromise.author}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="relative inline-block">
                {/* Floating Heart Particles */}
                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0.2, rotate: 0 }}
                      animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale, rotate: p.rotate }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="absolute left-1/2 top-1/2 text-2xl pointer-events-none select-none"
                    >
                      {p.emoji}
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  id="choose-each-other-btn"
                  onClick={triggerHearts}
                  className="px-8 py-4 rounded-full bg-love-red hover:bg-love-red/90 text-white font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-transform flex items-center gap-2 group mx-auto"
                >
                  <Heart className="h-4 w-4 fill-white group-hover:scale-125 transition-transform" />
                  <span>Choose Each Other Again</span>
                  <span className="font-mono text-xs opacity-60 ml-1 border-l border-white/20 pl-2">#{chooseCount}</span>
                </button>
              </div>
              <p className="text-[10px] text-soft-clay/50 mt-3 italic">
                Clicking this sends reassuring heart signals, representing years of persistent commitment.
              </p>
            </div>

          </div>

          {/* Right Panel: Reassurance Letters Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-rose-gold/15 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6 border-b border-rose-gold/10 pb-4">
                <Mail className="h-5 w-5 text-soft-clay" />
                <div>
                  <h4 className="font-display font-bold text-lg text-gentle-slate">The Letter Box</h4>
                  <p className="text-[10px] text-soft-clay/60">Gentle letters written for the days that need quiet warmth.</p>
                </div>
              </div>

              <div className="space-y-4">
                {INTRO_LETTERS.map((letter) => (
                  <button
                    key={letter.id}
                    id={`letter-item-${letter.id}`}
                    onClick={() => setSelectedLetter(letter)}
                    className="w-full text-left p-4 rounded-2xl border border-rose-gold/10 hover:border-love-red/30 hover:bg-warm-cream/30 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[9px] text-soft-clay/55 tracking-wider">{letter.date}</span>
                        <span className="text-[9px] bg-rose-gold/20 text-soft-clay px-2 py-0.5 rounded-full font-medium">{letter.readTime}</span>
                      </div>
                      <h5 className="font-display font-bold text-sm text-gentle-slate group-hover:text-love-red transition-colors">
                        {letter.title}
                      </h5>
                      <p className="text-[11px] text-soft-clay/80 mt-1 line-clamp-2">
                        {letter.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-[10px] font-bold text-love-red opacity-80 group-hover:opacity-100 self-end transition-opacity">
                      Read full letter <ChevronRight className="h-3 w-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Love Letter Full Modal View */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl rounded-3xl border border-rose-gold/20 bg-white p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Paper line effect */}
              <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-rose-gold/10 pointer-events-none" />

              <div className="relative pl-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-soft-clay/50 tracking-widest uppercase block">{selectedLetter.date}</span>
                    <h4 className="font-display text-2xl font-bold text-gentle-slate mt-1">{selectedLetter.title}</h4>
                  </div>
                  <span className="text-[10px] text-love-red font-semibold font-mono bg-love-red/10 px-2 py-1 rounded-md">{selectedLetter.readTime}</span>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-soft-clay leading-relaxed font-sans border-t border-rose-gold/10 pt-6 whitespace-pre-line italic">
                  "{selectedLetter.content}"
                </div>

                <div className="mt-8 pt-6 border-t border-rose-gold/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-soft-clay/45 uppercase tracking-widest">Built around you, me, and God</span>
                  <button
                    id="close-letter-modal-btn"
                    onClick={() => setSelectedLetter(null)}
                    className="px-5 py-2 rounded-xl bg-gentle-slate text-white text-xs font-semibold hover:bg-gentle-slate/90 transition-colors"
                  >
                    Close Letter
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
