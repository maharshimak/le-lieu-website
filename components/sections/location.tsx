import { Clock3, MapPin, Phone, Mail } from 'lucide-react';
import { RESTAURANT_HOURS } from '@/lib/constants';

export function LocationSection() {
  return (
    <section id="location" className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-[1.15fr_1fr]">
      <iframe
        title="Le Lieu map"
        className="h-[420px] w-full rounded-2xl border border-white/15"
        loading="lazy"
        src="https://www.google.com/maps?q=32+Quai+Fernand+Dupuy,+94600+Choisy-le-Roi&output=embed"
      />
      <div className="glass rounded-2xl p-7">
        <h2 className="section-title text-3xl">Opening Hours & Location</h2>
        <p className="mt-2 text-sm text-white/70">Find us by the Seine at 32 Quai Fernand Dupuy.</p>
        <div className="mt-5 space-y-3 text-white/80">
          <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-amber" /> 32 Quai Fernand Dupuy, 94600 Choisy-le-Roi</p>
          <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-amber" /> 01 43 91 88 41</p>
          <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-amber" /> contact@lelieu-restaurant.fr</p>
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 flex items-center gap-2 font-medium"><Clock3 className="h-4 w-4 text-amber" /> Hours</p>
          <ul className="space-y-1 text-sm text-white/75">
            {RESTAURANT_HOURS.map((row) => <li key={row}>{row}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
