'use client';

import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, RoundedBox } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { DirectionalLight, Group, MeshStandardMaterial } from 'three';
import { Color } from 'three';
import { Button } from '@/components/ui/button';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

gsap.registerPlugin(ScrollTrigger);

type SceneProps = {
  progressRef: MutableRefObject<number>;
  cursorRef: MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
};

function useMobileBreakpoint(query = '(max-width: 768px)') {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return isMobile;
}

function PlateScene({ progressRef, cursorRef, reduced }: SceneProps) {
  const group = useRef<Group>(null);
  const warmLight = useRef<DirectionalLight>(null);
  const coolLight = useRef<DirectionalLight>(null);
  const foodMat = useRef<MeshStandardMaterial>(null);
  const { camera } = useThree();

  useFrame((_state, delta) => {
    const p = reduced ? 0 : progressRef.current;
    const sink = p * 1.1;

    camera.position.z += (5 - p * 1.6 - camera.position.z) * Math.min(1, delta * 2.8);
    camera.position.y += (1.1 - p * 0.12 - camera.position.y) * Math.min(1, delta * 2.8);
    camera.rotation.y += (p * 0.09 - camera.rotation.y) * Math.min(1, delta * 2.6);

    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = p * 0.06;
      group.current.position.y += (-sink - group.current.position.y) * Math.min(1, delta * 2.5);
      group.current.scale.setScalar(1 - p * 0.13);
    }

    if (warmLight.current && coolLight.current) {
      warmLight.current.intensity += ((1.4 - p * 0.9) - warmLight.current.intensity) * Math.min(1, delta * 2.2);
      coolLight.current.intensity += ((0.35 + p * 1.2) - coolLight.current.intensity) * Math.min(1, delta * 2.2);
      warmLight.current.position.x += (3 + cursorRef.current.x * 0.8 - warmLight.current.position.x) * Math.min(1, delta * 3);
      warmLight.current.position.y += (4 + cursorRef.current.y * 0.4 - warmLight.current.position.y) * Math.min(1, delta * 3);
    }

    if (foodMat.current) {
      foodMat.current.opacity = 1 - Math.max(0, p - 0.6) * 2.5;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.45} />
      <directionalLight ref={warmLight} position={[3, 4, 2]} intensity={1.4} color={new Color('#ffd3a6')} />
      <directionalLight ref={coolLight} position={[-3, 1, -2]} intensity={0.35} color={new Color('#8ab3ff')} />
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.55}>
        <mesh>
          <cylinderGeometry args={[1.8, 1.8, 0.2, 64]} />
          <meshStandardMaterial color="#dbd5c8" metalness={0.45} roughness={0.16} />
        </mesh>
        <RoundedBox args={[1.3, 0.18, 0.8]} radius={0.06} smoothness={4} position={[0, 0.18, 0]}>
          <meshStandardMaterial ref={foodMat} transparent color="#db764c" roughness={0.38} metalness={0.12} />
        </RoundedBox>
        <RoundedBox args={[0.38, 0.1, 0.22]} radius={0.04} smoothness={4} position={[-0.45, 0.25, 0.14]}>
          <meshStandardMaterial color="#7ea268" roughness={0.7} />
        </RoundedBox>
      </Float>
      {/* External HDR preset omitted from the source-only package. */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.2} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.35} luminanceThreshold={0.35} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.15} darkness={0.7} />
      </EffectComposer>

    </group>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const isMobile = useMobileBreakpoint();
  const progressRef = useRef(0);
  const cursorRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || isMobile || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      }
    });

    return () => { trigger.kill(); };
  }, [reduced, isMobile]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden pt-16"
      onMouseMove={(event) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        cursorRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        cursorRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
      }}
    >
      <motion.div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(227,173,93,0.18),transparent_45%),radial-gradient(circle_at_75%_80%,rgba(65,99,157,0.28),transparent_42%)]" />

      {isMobile || reduced ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="glass h-64 w-64 rounded-full" />
        </div>
      ) : (
        <Canvas className="absolute inset-0" camera={{ position: [0, 1.1, 5], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <PlateScene progressRef={progressRef} cursorRef={cursorRef} reduced={Boolean(reduced)} />
          </Suspense>
        </Canvas>
      )}

      <motion.div initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }} className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 uppercase tracking-[0.24em] text-amber">By the Seine • Choisy-le-Roi</p>
        <h1 className="text-4xl font-semibold leading-tight md:text-7xl">Le Lieu — Riverside Dining in Choisy-le-Roi</h1>
        <p className="mt-5 max-w-2xl text-white/80">Modern French cuisine, cocktails, and a vibrant terrace by the Seine.</p>
        <Button size="lg" className="mt-9" onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}>
          Reserve a Table
        </Button>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-transparent via-[#090b10]/50 to-[#090b10]" />
    </section>
  );
}
