import { BrandLogo } from '@/components/brand/logo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        <div>
          <BrandLogo className="text-lg" />
          <p className="mt-2 text-sm text-white/70">Modern French bistro by the Seine in Choisy-le-Roi.</p>
        </div>
        <div>
          <p className="font-medium">Quick Links</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li><a href="#menu" className="transition hover:text-amber">Menu</a></li>
            <li><a href="#reservation" className="transition hover:text-amber">Reservation</a></li>
            <li><a href="#location" className="transition hover:text-amber">Location</a></li>
          </ul>
        </div>
        <div className="text-sm text-white/70">
          <p>32 Quai Fernand Dupuy, 94600 Choisy-le-Roi</p>
          <p className="mt-1">01 43 91 88 41</p>
          <p className="mt-1">contact@lelieu-restaurant.fr</p>
        </div>
      </div>
    </footer>
  );
}
