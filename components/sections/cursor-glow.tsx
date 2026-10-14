'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      if (ref.current) ref.current.style.transform = `translate(${x - 96}px, ${y - 96}px)`;
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none fixed z-40 hidden h-48 w-48 rounded-full bg-amber/10 blur-3xl md:block" />;
}
