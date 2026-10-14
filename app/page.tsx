'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/sections/navbar';
import { ExperienceSection } from '@/components/sections/experience';
import { MenuSection } from '@/components/sections/menu';
import { AboutSection } from '@/components/sections/about';
import { LocationSection } from '@/components/sections/location';
import { ReservationPanel } from '@/components/sections/reservation';
import { Footer } from '@/components/sections/footer';
import { CursorGlow } from '@/components/sections/cursor-glow';
import { WowTransition } from '@/components/sections/wow-transition';

const Hero = dynamic(() => import('@/components/sections/hero').then((m) => m.Hero), { ssr: false, loading: () => <section id="hero" className="h-screen pt-16" /> });
const GallerySection = dynamic(() => import('@/components/sections/gallery').then((m) => m.GallerySection), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const sections = gsap.utils.toArray<HTMLElement>('main section');
      sections.forEach((section) => {
        gsap.fromTo(section, { opacity: 0.75, y: 24 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%' }
        });
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-gradient-to-b from-[#090b10] via-[#111829] to-[#080a0f]">
        <CursorGlow />
        <Hero />
        <ExperienceSection />
        <p className="mx-auto max-w-6xl px-6 text-center text-sm uppercase tracking-[0.35em] text-white/45">From terrace light to evening warmth</p>
        <WowTransition />
        <MenuSection />
        <GallerySection />
        <AboutSection />
        <LocationSection />
        <ReservationPanel />
      </main>
      <Footer />
    </>
  );
}
