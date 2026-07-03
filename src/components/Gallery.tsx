import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Eye, Heart } from 'lucide-react';

import BEACH_IMG from '../assets/images/beach_love.jpg';
import ARCADE_LAUGH_IMG from '../assets/images/arcade_laugh.jpg';
import ARCADE_TICKETS_IMG from '../assets/images/arcade_tickets.jpg';
import SCHOOL_UNIFORMS_IMG from '../assets/images/school_uniforms.jpg';
import COUPLE_PORTRAIT_IMG from '../assets/images/couple_portrait.jpg';

interface PhotoAsset {
  id: string;
  src: string;
  title: string;
  caption: string;
  aspect: 'landscape' | 'portrait' | 'square';
  rotation: string;
}

const GALLERY_PHOTOS: PhotoAsset[] = [
  {
    id: 'beach',
    src: BEACH_IMG,
    title: 'Hold My Hand, Trust the Horizon',
    caption: 'Our patient waiting is not empty space; it is where we let God prepare our beautiful horizon together.',
    aspect: 'landscape',
    rotation: '-rotate-1 hover:rotate-1'
  },
  {
    id: 'arcade-laugh',
    src: ARCADE_LAUGH_IMG,
    title: 'Arcade Laughter & Joyful Beats',
    caption: 'Pure laughter in our simple moments. He teaches me that love is supposed to feel safe and playful.',
    aspect: 'landscape',
    rotation: 'rotate-2 hover:-rotate-1'
  },
  {
    id: 'arcade-tickets',
    src: ARCADE_TICKETS_IMG,
    title: 'Small Tickets, Giant Smiles',
    caption: 'You taught me that I never have to beg for attention. You show it through presence, every day.',
    aspect: 'landscape',
    rotation: '-rotate-2 hover:rotate-2'
  },
  {
    id: 'school-days',
    src: SCHOOL_UNIFORMS_IMG,
    title: 'The Sweet School Days',
    caption: 'We were young, with big dreams and school books, choosing to stand by each other as we grow.',
    aspect: 'portrait',
    rotation: 'rotate-1 hover:-rotate-2'
  },
  {
    id: 'portrait',
    src: COUPLE_PORTRAIT_IMG,
    title: 'Choosing You, Again & Again',
    caption: 'Bry & Lyka: A love that waits, respects, and trusts. God’s most beautiful answer to my prayers.',
    aspect: 'square',
    rotation: '-rotate-1 hover:rotate-1'
  }
];

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<PhotoAsset | null>(null);

  return (
    <section id="photo-memories-gallery" className="py-24 px-4 bg-white border-t border-rose-gold/10 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-soft-clay bg-rose-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
            Captured Chapters
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gentle-slate tracking-tight">
            Our Polaroid Album
          </h2>
          <p className="text-sm text-soft-clay mt-3 max-w-lg mx-auto leading-relaxed">
            Beautiful glimpses of our story, captured and preserved. Click on any photo to see its heartfelt story.
          </p>
          <div className="w-12 h-[2px] bg-love-red mx-auto mt-4" />
        </div>

        {/* Polaroid layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {GALLERY_PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              onClick={() => setActivePhoto(photo)}
              className={`bg-[#fdfcf9] p-4 rounded-xl shadow-md border border-rose-gold/15 cursor-pointer transform transition-all duration-300 ${photo.rotation} hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between group`}
            >
              {/* Photo Frame Container */}
              <div className="relative overflow-hidden rounded-lg bg-warm-cream/50 border border-rose-gold/5 flex-grow">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white/90 text-love-red flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Polaroid bottom caption border */}
              <div className="pt-4 pb-2 px-1 select-none text-center">
                <h4 className="font-display font-bold text-sm text-gentle-slate tracking-tight line-clamp-1 mb-1">
                  {photo.title}
                </h4>
                <p className="font-sans text-[11px] text-soft-clay/80 leading-relaxed italic line-clamp-2">
                  "{photo.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enlarged Photo Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl border border-rose-gold/10 p-5 md:p-8 shadow-2xl overflow-hidden"
            >
              <button
                id="close-gallery-modal"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-rose-gold/10 text-gentle-slate hover:text-love-red hover:bg-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Photo Viewer */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-rose-gold/15 bg-warm-cream shadow-inner max-h-[70vh]">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    className="w-full h-full object-contain max-h-[70vh]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info and Description */}
                <div className="md:col-span-5 space-y-4">
                  <span className="font-mono text-[10px] text-love-red uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5 fill-love-red" /> Captured Chapter
                  </span>
                  
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-gentle-slate tracking-tight">
                    {activePhoto.title}
                  </h3>
                  
                  <div className="w-10 h-[2px] bg-love-red" />
                  
                  <p className="text-xs md:text-sm text-soft-clay leading-relaxed italic font-medium">
                    "{activePhoto.caption}"
                  </p>

                  <div className="border-t border-rose-gold/10 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-gentle-slate/75">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-gold shrink-0" />
                      <span>Consistent and patient love</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gentle-slate/75">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-gold shrink-0" />
                      <span>Respecting families, honoring timing</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
