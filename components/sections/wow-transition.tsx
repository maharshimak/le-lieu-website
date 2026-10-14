'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function WowTransition() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dots = Array.from(rootRef.current.querySelectorAll<HTMLElement>('[data-dot]'));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    tl.fromTo(dots, { x: 0, y: 0, opacity: 0.1 }, {
      x: (_i, el) => Number(el.dataset.tx ?? 0),
      y: (_i, el) => Number(el.dataset.ty ?? 0),
      opacity: 0.75,
      stagger: { each: 0.01, from: 'center' }
    }).to(dots, { opacity: 0, scale: 0.5, stagger: 0.006 }, 0.65);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section aria-hidden className="relative mx-auto h-40 max-w-6xl overflow-hidden">
      <div ref={rootRef} className="absolute inset-0 grid place-items-center">
        <div className="relative h-28 w-28">
          {Array.from({ length: 64 }).map((_, i) => {
            const col = i % 8;
            const row = Math.floor(i / 8);
            return (
              <span
                key={i}
                data-dot
                data-tx={(col - 3.5) * 18}
                data-ty={(row - 3.5) * 12}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-amber/80"
              />
            );
          })}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
    </section>
  );
}
