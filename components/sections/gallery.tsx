'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const shots = [
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80', alt: 'Terrace dining with warm evening lights' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', alt: 'Cocktails on a modern bistro table' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80', alt: 'Guests enjoying dinner in a contemporary interior' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', alt: 'Restaurant ambiance with social dining energy' }
];

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="section-title">Gallery</h2>
      <p className="section-subtitle">Food, terrace, and evenings by the river.</p>
      <div className="mt-8 columns-1 gap-4 md:columns-2">
        {shots.map((shot, index) => (
          <motion.button
            key={shot.src}
            whileHover={reduced ? undefined : { y: -6, scale: 1.01 }}
            onClick={() => setSelected(index)}
            className="focus-ring group relative mb-4 w-full overflow-hidden rounded-2xl"
          >
            <Image src={shot.src} alt={shot.alt} width={1200} height={900} className="h-auto w-full transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/20 opacity-0 blur-xl transition-all duration-700 group-hover:left-[110%] group-hover:opacity-60" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ duration: 0.25 }}>
              <Image src={shots[selected].src} alt={shots[selected].alt} width={1800} height={1200} className="max-h-[92vh] w-auto rounded-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
