import { motion } from 'motion/react';
import { Calendar, Heart, Shield, Award, Users } from 'lucide-react';
import { TimelineEvent } from '../types';

import BEACH_IMG from '../assets/images/beach_love.jpg';
import ARCADE_LAUGH_IMG from '../assets/images/arcade_laugh.jpg';
import ARCADE_TICKETS_IMG from '../assets/images/arcade_tickets.jpg';
import SCHOOL_UNIFORMS_IMG from '../assets/images/school_uniforms.jpg';

const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: '1',
    year: '2019',
    title: 'The Unwavering Presence',
    badge: 'Where It Began',
    description: 'Since this year, there has been one person who never left, never gave up, and never stopped choosing me.',
    extendedText: [
      'Our story is not the typical love story filled with grand romantic labels or dramatic moments.',
      'We patiently respected the wishes of my family and chose to wait for the right season of life.',
      'Yet despite not officially carrying the titles of "boyfriend" and "girlfriend," we built something far deeper than labels could ever describe.'
    ]
  },
  {
    id: '2',
    year: '2021',
    title: 'The School Days & Quiet Dreams',
    badge: 'Growing Together',
    imageUrl: SCHOOL_UNIFORMS_IMG,
    imageAlt: 'Bry and Lyka in their clean white school uniforms, standing by the staircase smiling warmly',
    description: 'We are both young. We still have dreams to accomplish, goals to reach, and families to make proud.',
    extendedText: [
      'He understood that my family wanted me to focus on my future first.',
      'Instead of walking away, he stayed. Instead of complaining, he understood. Instead of demanding more, he respected the situation.',
      'Year after year, he continued choosing me. That kind of patience is rare. That kind of love is rare.'
    ]
  },
  {
    id: '3',
    year: '2023',
    title: 'Simple Joys & Shared Laughter',
    badge: 'Deepening Friendship',
    imageUrl: ARCADE_LAUGH_IMG,
    imageAlt: 'Bry and Lyka laughing and playing drums together in a colorful arcade',
    description: 'We built trust, friendship, and a consistent love that continues to grow every single day.',
    extendedText: [
      'What makes him special is not just the way he loves me, but the way he chooses to love me.',
      'He treats my heart with care. He respects my family, my dreams, and my decisions.',
      'He never forces, never pressures. He simply loves — patiently, genuinely, and consistently.'
    ]
  },
  {
    id: '4',
    year: '2025',
    title: 'Choosing Patience over Rush',
    badge: 'A Love That Waits',
    imageUrl: BEACH_IMG,
    imageAlt: 'Bry and Lyka standing on the shore at sunset, holding hands and looking lovingly at each other',
    description: 'True love is not measured by how quickly people get together. It is measured by how willing they are to stay while waiting for the right time.',
    extendedText: [
      'Before him, I thought love was simply a feeling. But he showed me that love is a choice.',
      'He made me realize that love is not supposed to feel chaotic. Love is supposed to feel safe.',
      'I never have to beg for attention, question my worth, or wonder whether I am loved. He shows it every single day.'
    ]
  }
];

export default function Timeline() {
  return (
    <section id="story-timeline-section" className="py-24 px-4 relative bg-warm-cream/30">
      {/* Decorative vertical vine/line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-40 bottom-40 w-[2px] bg-rose-gold/20 hidden md:block" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-soft-clay bg-rose-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
            Chronology of Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gentle-slate tracking-tight">
            How Love Quietly Grew
          </h2>
          <div className="w-12 h-[2px] bg-love-red mx-auto mt-4" />
        </div>

        <div className="space-y-24 relative">
          {TIMELINE_DATA.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`flex flex-col md:flex-row items-stretch gap-8 md:gap-16 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year Badge & Card Info Column */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="p-8 rounded-3xl border border-rose-gold/10 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-[4px] bg-rose-gold/50 group-hover:bg-love-red transition-colors" />

                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-love-red font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {event.badge}
                      </span>
                      <span className="font-display text-4xl font-extrabold text-rose-gold/40 select-none">
                        {event.year}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-gentle-slate mb-4">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm text-soft-clay font-medium leading-relaxed mb-6 italic border-l-2 border-love-red/30 pl-4">
                      "{event.description}"
                    </p>

                    <div className="space-y-3 text-gentle-slate/85 text-xs leading-relaxed">
                      {event.extendedText?.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pulsing center node (Only Desktop) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 items-center justify-center hidden md:flex z-10 self-center">
                  <div className="h-10 w-10 rounded-full bg-white border-2 border-rose-gold flex items-center justify-center shadow-sm">
                    <Heart className="h-4 w-4 text-love-red fill-love-red/10" />
                  </div>
                </div>

                {/* Photo Column */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  {event.imageUrl ? (
                    <div className="relative rounded-3xl overflow-hidden shadow-md max-w-md w-full aspect-4/3 border border-rose-gold/15 bg-white p-3 rotate-1 hover:rotate-0 transition-all duration-500 group">
                      <div className="relative w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={event.imageUrl}
                          alt={event.imageAlt || 'Love Found Us memory'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>
                      <div className="mt-3 text-center">
                        <span className="font-mono text-[10px] text-soft-clay/60">
                          {event.imageAlt ? `📍 ${event.imageAlt.split(',')[0]}` : ''}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed border-rose-gold/30 bg-rose-gold/5 max-w-md w-full aspect-4/3 text-center">
                      <div className="h-12 w-12 rounded-full bg-white border border-rose-gold/20 flex items-center justify-center mb-4 text-love-red">
                        <Users className="h-5 w-5" />
                      </div>
                      <h4 className="font-display font-semibold text-lg text-gentle-slate mb-2">Our Pure Foundation</h4>
                      <p className="text-xs text-soft-clay max-w-xs leading-relaxed">
                        No labels, no rushing, just years of holding hands in absolute confidence, building a love to stand the test of time.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
