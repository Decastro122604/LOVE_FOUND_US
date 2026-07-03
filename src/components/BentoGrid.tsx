import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Home, 
  HelpCircle, 
  BookOpen, 
  RefreshCw, 
  Users, 
  Moon, 
  Sun 
} from 'lucide-react';

const BRY_VIRTUES = [
  {
    icon: Sparkles,
    title: "Listens & Understands",
    desc: "Listens before judging, understands before reacting. He stays when things are difficult and helps me navigate every single worry."
  },
  {
    icon: ShieldCheck,
    title: "Creates Emotional Safety",
    desc: "He makes me feel emotionally safe. Even on days when I am not easy to love, he never makes me feel like I am too much."
  },
  {
    icon: Users,
    title: "Respects Family & Dreams",
    desc: "He treats my heart with care, respects my family, my decisions, and my future. He never pressures, never forces—he simply loves."
  },
  {
    icon: RefreshCw,
    title: "Rare Consistency",
    desc: "Patiently, genuinely, consistently. Year after year, despite the physical titles and seasons, he keeps choosing me every single day."
  }
];

const DEFINITIONS_OF_LOVE = [
  { label: "Love is Choice", value: "Before him, I thought love was simply a feeling. He showed me that love is a daily choice to stay and show up." },
  { label: "Love is Safety", value: "He made me realize that love is not supposed to feel chaotic. Love is supposed to feel safe, calm, and reassuring." },
  { label: "Love is Consistency", value: "No wondering, no begging for attention, no questioning my worth. It is proven daily through words, action, and presence." }
];

export default function BentoGrid() {
  return (
    <section id="bry-virtues-section" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle light background decorations */}
      <div className="absolute top-24 left-1/3 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-love-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-soft-clay bg-rose-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
            The Person Behind My Smile
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gentle-slate tracking-tight">
            What Makes His Love Rare
          </h2>
          <p className="text-sm text-soft-clay mt-3 max-w-lg mx-auto leading-relaxed">
            A beautiful glimpse into the heart of a man who changed my entire understanding of how a heart should be held.
          </p>
          <div className="w-12 h-[2px] bg-love-red mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Bento Card (Left) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl border border-rose-gold/15 bg-warm-cream/30 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Visual accent background banner */}
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-rose-gold/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
            
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-love-red/10 text-love-red mb-6">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="font-display text-3xl font-bold text-gentle-slate mb-4">
                "The home my heart always runs back to"
              </h3>
              <p className="text-sm md:text-base text-soft-clay leading-relaxed mb-6">
                For years, he has become my best friend, my confidant, my safe place, my greatest supporter, and my favorite person.
              </p>
              
              <div className="space-y-4 border-t border-rose-gold/10 pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-love-red shrink-0" />
                  <p className="text-xs text-gentle-slate/90"><strong className="text-gentle-slate">When life is overwhelming</strong> — he is my calm, a quiet sanctuary from any storm.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-love-red shrink-0" />
                  <p className="text-xs text-gentle-slate/90"><strong className="text-gentle-slate">When I feel weak</strong> — he becomes my strength, lifting me with absolute grace.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-love-red shrink-0" />
                  <p className="text-xs text-gentle-slate/90"><strong className="text-gentle-slate">When I doubt myself</strong> — he gently reminds me of my worth, reassuring my overthinking heart.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-gold/10 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-soft-clay/60">An Unwavering Safe Place</span>
              <span className="text-xs text-love-red font-semibold flex items-center gap-1">Since 2019 <Heart className="h-3 w-3 fill-love-red" /></span>
            </div>
          </motion.div>

          {/* Virtues Grid (Right) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {BRY_VIRTUES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl border border-rose-gold/10 bg-white p-6 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
                >
                  <div className="h-10 w-10 shrink-0 rounded-2xl bg-rose-gold/10 text-love-red flex items-center justify-center group-hover:bg-love-red group-hover:text-white transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-gentle-slate mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-soft-clay leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Love That Changed Me Bento (Full Bottom Row) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-12 rounded-3xl border border-rose-gold/15 bg-soft-clay/5 p-8 md:p-10 mt-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-rose-gold/10 pb-6">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gentle-slate">
                  The Love That Changed Me
                </h3>
                <p className="text-xs text-soft-clay mt-1">
                  Re-discovering love through gentle consistency instead of chaos.
                </p>
              </div>
              <div className="mt-4 md:mt-0 px-4 py-2 bg-white/80 rounded-2xl border border-rose-gold/20 flex items-center gap-2">
                <Sun className="h-4 w-4 text-rose-gold animate-spin-slow" />
                <span className="font-mono text-[10px] text-gentle-slate uppercase tracking-wide font-medium">Safe Love Aesthetic</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEFINITIONS_OF_LOVE.map((item, idx) => (
                <div key={idx} className="bg-white/80 rounded-2xl border border-rose-gold/10 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-love-red tracking-wider font-semibold">
                      Principle 0{idx + 1}
                    </span>
                    <h4 className="font-display font-bold text-lg text-gentle-slate mt-2 mb-3">
                      {item.label}
                    </h4>
                    <p className="text-xs text-soft-clay leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-rose-gold/10 pt-3 text-[10px] text-soft-clay/50 italic">
                    Taught by his actions
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
