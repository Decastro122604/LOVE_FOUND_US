import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Pencil, RotateCcw, Trash2, Plus, Heart } from 'lucide-react';

import BEACH_IMG from '../assets/images/beach_love.jpg';
import ARCADE_LAUGH_IMG from '../assets/images/arcade_laugh.jpg';
import ARCADE_TICKETS_IMG from '../assets/images/arcade_tickets.jpg';
import SCHOOL_UNIFORMS_IMG from '../assets/images/school_uniforms.jpg';
import COUPLE_PORTRAIT_IMG from '../assets/images/couple_portrait.jpg';

const STORAGE_KEY = 'loveFoundUsAlbum';

interface PhotoAsset {
  id: string;
  src: string;
  title: string;
  caption: string;
  aspect: 'landscape' | 'portrait' | 'square';
  rotation: string;
  dateAdded: string;
}

const DEFAULT_GALLERY_PHOTOS: PhotoAsset[] = [
  {
    id: 'beach',
    src: BEACH_IMG,
    title: 'Hold My Hand, Trust the Horizon',
    caption: 'Our patient waiting is not empty space; it is where we let God prepare our beautiful horizon together.',
    aspect: 'landscape',
    rotation: '-rotate-1 hover:rotate-1',
    dateAdded: '2024-01-01T08:00:00.000Z'
  },
  {
    id: 'arcade-laugh',
    src: ARCADE_LAUGH_IMG,
    title: 'Arcade Laughter & Joyful Beats',
    caption: 'Pure laughter in our simple moments. He teaches me that love is supposed to feel safe and playful.',
    aspect: 'landscape',
    rotation: 'rotate-2 hover:-rotate-1',
    dateAdded: '2024-02-15T12:00:00.000Z'
  },
  {
    id: 'arcade-tickets',
    src: ARCADE_TICKETS_IMG,
    title: 'Small Tickets, Giant Smiles',
    caption: 'You taught me that I never have to beg for attention. You show it through presence, every day.',
    aspect: 'landscape',
    rotation: '-rotate-2 hover:rotate-2',
    dateAdded: '2024-03-12T14:30:00.000Z'
  },
  {
    id: 'school-days',
    src: SCHOOL_UNIFORMS_IMG,
    title: 'The Sweet School Days',
    caption: 'We were young, with big dreams and school books, choosing to stand by each other as we grow.',
    aspect: 'portrait',
    rotation: 'rotate-1 hover:-rotate-2',
    dateAdded: '2024-04-20T09:45:00.000Z'
  },
  {
    id: 'portrait',
    src: COUPLE_PORTRAIT_IMG,
    title: 'Choosing You, Again & Again',
    caption: 'Bry & Lyka: A love that waits, respects, and trusts. God’s most beautiful answer to my prayers.',
    aspect: 'square',
    rotation: '-rotate-1 hover:rotate-1',
    dateAdded: '2024-05-08T17:20:00.000Z'
  }
];

const ROMANTIC_CAPTIONS = [
  'Another beautiful memory added to our journey.',
  'A simple moment, a forever memory.',
  'One more reason to smile because of you.',
  'A sweet page from the story we are still writing together.',
  'Memories that feel like warm sunlight around our hearts.',
  'Every new photo is another promise held close.',
  'This moment is another reason I believe in us.'
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));

const readFileAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Unable to read file'));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const generateRomanticCaption = () => ROMANTIC_CAPTIONS[Math.floor(Math.random() * ROMANTIC_CAPTIONS.length)];

const loadSavedAlbum = (): PhotoAsset[] => {
  if (typeof window === 'undefined') return DEFAULT_GALLERY_PHOTOS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GALLERY_PHOTOS;

    const parsed = JSON.parse(raw) as PhotoAsset[];
    if (!Array.isArray(parsed) || parsed.some((item) => !item?.id || !item?.src || !item?.dateAdded)) {
      return DEFAULT_GALLERY_PHOTOS;
    }

    return parsed;
  } catch {
    return DEFAULT_GALLERY_PHOTOS;
  }
};

export default function Gallery() {
  const [photos, setPhotos] = useState<PhotoAsset[]>(loadSavedAlbum);
  const [activePhoto, setActivePhoto] = useState<PhotoAsset | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftCaption, setDraftCaption] = useState('');
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }, [photos]);

  const sortedPhotos = useMemo(
    () => [...photos].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()),
    [photos]
  );

  const startAddPhotos = () => {
    fileInputRef.current?.click();
  };

  const handleFilesAdded = async (files: FileList | null) => {
    if (!files?.length) return;

    const newPhotos: PhotoAsset[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const src = await readFileAsDataURL(file);
      newPhotos.push({
        id: crypto?.randomUUID?.() ?? `${Date.now()}-${file.name}`,
        title: 'A New Memory',
        caption: generateRomanticCaption(),
        aspect: 'landscape',
        rotation: '-rotate-1 hover:rotate-1',
        dateAdded: new Date().toISOString(),
        src
      });
    }

    if (!newPhotos.length) return;
    setPhotos((current) => [...newPhotos, ...current]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startReplacePhoto = (id: string) => {
    setReplaceTargetId(id);
    replaceInputRef.current?.click();
  };

  const handleReplaceInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const targetId = replaceTargetId;
    if (file && targetId) {
      const src = await readFileAsDataURL(file);
      setPhotos((current) =>
        current.map((photo) => (photo.id === targetId ? { ...photo, src } : photo))
      );
      if (activePhoto?.id === targetId) {
        setActivePhoto((photo) => (photo ? { ...photo, src } : photo));
      }
    }

    if (event.target) {
      event.target.value = '';
    }
    setReplaceTargetId(null);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((current) => current.filter((photo) => photo.id !== id));
    if (activePhoto?.id === id) setActivePhoto(null);
    if (editingId === id) setEditingId(null);
  };

  const handleEditCaption = (photo: PhotoAsset) => {
    setEditingId(photo.id);
    setDraftCaption(photo.caption);
  };

  const saveCaption = (id: string) => {
    const trimmed = draftCaption.trim();
    if (!trimmed) return;

    setPhotos((current) =>
      current.map((photo) => (photo.id === id ? { ...photo, caption: trimmed } : photo))
    );

    if (activePhoto?.id === id) {
      setActivePhoto((photo) => (photo ? { ...photo, caption: trimmed } : photo));
    }

    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftCaption('');
  };

  return (
    <section id="photo-memories-gallery" className="py-24 px-4 bg-white border-t border-rose-gold/10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-soft-clay bg-rose-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
            Captured Chapters
          </span>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-gentle-slate tracking-tight">
                Our Polaroid Album
              </h2>
              <p className="text-sm text-soft-clay mt-3 max-w-lg mx-auto leading-relaxed">
                A growing scrapbook of our love story — upload new memories, edit captions, and keep every moment close.
              </p>
            </div>
            <button
              type="button"
              onClick={startAddPhotos}
              className="inline-flex items-center gap-2 rounded-full border border-love-red bg-love-red/10 px-5 py-3 text-sm font-semibold text-love-red transition hover:bg-love-red/20 focus:outline-none focus:ring-2 focus:ring-love-red/30"
            >
              <Plus className="h-4 w-4" />
              Add Photo
            </button>
          </div>
          <div className="w-16 h-[2px] bg-love-red mx-auto mt-6" />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => handleFilesAdded(event.target.files)}
        />
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleReplaceInput}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {sortedPhotos.map((photo) => {
            const isEditing = editingId === photo.id;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`bg-[#fdfcf9] p-5 rounded-[2rem] shadow-[0_25px_80px_-35px_rgba(148,85,68,0.4)] border border-rose-gold/10 transform transition-all duration-300 ${photo.rotation} hover:-translate-y-1 hover:shadow-xl`}
                onClick={() => setActivePhoto(photo)}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-warm-cream/70 border border-rose-gold/10 shadow-inner">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-display text-sm text-love-red uppercase tracking-[0.35em] font-semibold">Polaroid</p>
                      <h3 className="font-display text-lg text-gentle-slate font-bold leading-tight">
                        {photo.title}
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-rose-gold/10 bg-white/90 p-4 min-h-[100px]">
                    <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-soft-clay/80">
                      Added {formatDate(photo.dateAdded)}
                    </div>
                    {isEditing ? (
                      <div className="space-y-3">
                        <textarea
                          value={draftCaption}
                          onChange={(event) => setDraftCaption(event.target.value)}
                          rows={3}
                          className="w-full resize-none rounded-2xl border border-rose-gold/20 bg-[#fcf7f2] px-4 py-3 text-sm text-soft-clay focus:border-love-red focus:outline-none focus:ring-2 focus:ring-love-red/10"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              saveCaption(photo.id);
                            }}
                            className="rounded-full bg-love-red px-4 py-2 text-xs font-semibold text-white transition hover:bg-love-red/90"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              cancelEdit();
                            }}
                            className="rounded-full border border-rose-gold/20 bg-white px-4 py-2 text-xs font-semibold text-soft-clay transition hover:bg-rose-gold/10"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed text-soft-clay/90 italic">"{photo.caption}"</p>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEditCaption(photo);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/15 bg-[#fff6f2] px-3 py-2 text-[11px] font-semibold text-soft-clay transition hover:bg-rose-gold/10"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Caption
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        startReplacePhoto(photo.id);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/15 bg-[#faf2f0] px-3 py-2 text-[11px] font-semibold text-soft-clay transition hover:bg-rose-gold/10"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeletePhoto(photo.id);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/15 bg-[#fff1f0] px-3 py-2 text-[11px] font-semibold text-soft-clay transition hover:bg-rose-gold/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-white rounded-[2rem] border border-rose-gold/10 p-6 md:p-10 shadow-2xl overflow-hidden"
            >
              <button
                id="close-gallery-modal"
                onClick={() => setActivePhoto(null)}
                className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 border border-rose-gold/10 text-gentle-slate hover:text-love-red hover:bg-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 rounded-[2rem] overflow-hidden border border-rose-gold/10 bg-warm-cream shadow-inner">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    className="w-full h-full object-contain max-h-[75vh]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-love-red font-semibold">
                    <Heart className="h-4 w-4 fill-love-red" />
                    Captured Chapter
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-3xl text-gentle-slate font-bold tracking-tight">
                      {activePhoto.title}
                    </h3>
                    <p className="text-sm text-soft-clay/85 italic leading-relaxed">"{activePhoto.caption}"</p>
                  </div>

                  <div className="rounded-3xl border border-rose-gold/10 bg-[#fff7f2] p-4 shadow-sm text-sm text-soft-clay">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-gentle-slate">Date Added</span>
                      <span className="text-[13px] text-soft-clay/80">{formatDate(activePhoto.dateAdded)}</span>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-soft-clay/80">
                      Keep this new page of our album close to heart; every photo is a memory we can return to again and again.
                    </p>
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
