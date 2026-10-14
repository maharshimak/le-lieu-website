'use client';

import { motion } from 'framer-motion';

const points = [
  ['Riverside terrace', 'Sunset tables on the Seine with relaxed, social energy.'],
  ['Seasonal kitchen', 'Fresh market produce with modern French bistro classics.'],
  ['Cocktail moments', 'Signature cocktails and wines curated for shared evenings.']
];

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="section-title">Atmosphere & Experience</h2>
      <p className="section-subtitle">Le Lieu blends riverside calm with lively evenings—made for long lunches, afterwork drinks, and dinner with friends.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {points.map(([title, desc], i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-medium text-amber">{title}</h3>
            <p className="mt-2 text-sm text-white/75">{desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
