'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Dish = { name: string; description: string; price: string };

const categories: Record<'Starters' | 'Main Courses' | 'Desserts' | 'Drinks', Dish[]> = {
  Starters: [
    { name: 'Burrata crémeuse', description: 'Tomates anciennes, basilic, huile d’olive.', price: '€14' },
    { name: 'Tartare de saumon', description: 'Agrumes, herbes fraîches, toast grillé.', price: '€15' },
    { name: 'Oeuf parfait', description: 'Crème de champignons et noisettes torréfiées.', price: '€12' }
  ],
  'Main Courses': [
    { name: 'Entrecôte frites', description: 'Sauce poivre maison et salade verte.', price: '€28' },
    { name: 'Saumon rôti', description: 'Légumes de saison et beurre citronné.', price: '€24' },
    { name: 'Burger du Lieu', description: 'Boeuf français, cheddar affiné, pickles.', price: '€21' },
    { name: 'Pâtes à la truffe', description: 'Parmesan, crème légère, roquette.', price: '€23' }
  ],
  Desserts: [
    { name: 'Coeur coulant chocolat', description: 'Servi chaud avec glace vanille.', price: '€10' },
    { name: 'Tarte tatin', description: 'Pommes caramélisées, crème épaisse.', price: '€9' },
    { name: 'Profiteroles', description: 'Choux, glace vanille, sauce chocolat.', price: '€10' }
  ],
  Drinks: [
    { name: 'Cocktails signature', description: 'Créations maison et classiques revisités.', price: '€12–€15' },
    { name: 'Vins français', description: 'Sélection au verre et à la bouteille.', price: '€7–€44' },
    { name: 'Mocktails', description: 'Cocktails sans alcool frais et équilibrés.', price: '€8' }
  ]
};

export function MenuSection() {
  const [active, setActive] = useState<keyof typeof categories>('Starters');
  const dishes = useMemo(() => categories[active], [active]);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="section-title">Menu Highlights</h2>
      <p className="section-subtitle">French bistro classics and seasonal plates, from lunch terrace moments to lively evening service.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {Object.keys(categories).map((cat) => (
          <button suppressHydrationWarning key={cat} onClick={() => setActive(cat as keyof typeof categories)} className={`focus-ring rounded-full px-4 py-2 text-sm transition ${active === cat ? 'bg-amber text-black' : 'glass text-white/80 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }} className="mt-10 space-y-1 rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-6">
          {dishes.map((dish, index) => (
            <motion.article key={dish.name} whileHover={{ x: 3 }} className="group rounded-xl px-3 py-4 transition hover:bg-white/[0.03]">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{dish.name}</h3>
                <p className="text-sm font-medium text-amber">{dish.price}</p>
              </div>
              <p className="mt-1 text-sm text-white/65">{dish.description}</p>
              {index < dishes.length - 1 ? <div className="mt-4 h-px bg-gradient-to-r from-white/0 via-white/15 to-white/0" /> : null}
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
