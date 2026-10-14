'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/brand/logo';

const links = [
  ['hero', 'Home'],
  ['experience', 'Experience'],
  ['menu', 'Menu'],
  ['gallery', 'Gallery'],
  ['about', 'About'],
  ['location', 'Location'],
  ['reservation', 'Reserve']
] as const;

export function Navbar() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b10]/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="group focus-ring rounded-xl transition hover:drop-shadow-[0_0_14px_rgba(227,173,93,0.35)]">
          <BrandLogo />
        </a>
        <ul className="hidden gap-1 md:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn('focus-ring relative rounded-full px-3 py-2 text-sm text-white/75 transition hover:text-white after:absolute after:bottom-1 after:left-3 after:h-px after:w-0 after:bg-amber after:transition-all hover:after:w-[calc(100%-1.5rem)]', active === id && 'bg-white/10 text-amber after:w-[calc(100%-1.5rem)]')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
