'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,24,41,0.8),rgba(25,29,36,0.55),rgba(227,173,93,0.14))]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.h2 initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-title">
          About Le Lieu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg leading-relaxed text-white/80"
        >
          Le Lieu is a modern French bistro on the riverside in Choisy-le-Roi. We serve seasonal dishes, house cocktails, and comfort-driven classics in a warm setting that moves from relaxed daytime lunches to lively evening dinners on the terrace.
        </motion.p>
      </div>
    </section>
  );
}
