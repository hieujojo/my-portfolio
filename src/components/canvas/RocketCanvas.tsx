'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload, Sparkles, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import type { Group, PointLight } from 'three';

function Rocket({ launchTrigger = false }: { launchTrigger?: boolean }) {
  const { scene } = useGLTF('/models/space-rocket.glb');
  const [scale, setScale] = useState(1);
  const [launching, setLaunching] = useState(false);
  const group = useRef<Group>(null);
  const engineLight = useRef<PointLight>(null);
  const launchStartedAt = useRef<number | null>(null);

  useEffect(() => {
    if (!launchTrigger) return;
    setScale(0.92);
    setLaunching(true);
    launchStartedAt.current = performance.now();
    const timeout = window.setTimeout(() => setScale(1), 260);
    const finish = window.setTimeout(() => setLaunching(false), 1500);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(finish);
    };
  }, [launchTrigger]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const start = launchStartedAt.current;
    const elapsed = start ? (performance.now() - start) / 1000 : 0;
    const progress = Math.min(elapsed / 1.25, 1);

    if (start && progress < 1) {
      const eased = progress * progress * (3 - 2 * progress);
      group.current.position.y = -0.15 + eased * 1.25;
      group.current.rotation.z = -0.35 - eased * 0.18;
      if (engineLight.current) engineLight.current.intensity = 2.5 + Math.sin(elapsed * 35) * 1.2;
    } else {
      launchStartedAt.current = null;
      group.current.position.y = -0.15;
      group.current.rotation.z = -0.35;
      if (engineLight.current) engineLight.current.intensity = 0.8 + Math.sin(clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={group}>
        <primitive object={scene} scale={scale * 1.8} />
        <pointLight ref={engineLight} position={[0, -0.55, 0.45]} color="#fb7185" intensity={0.8} distance={2.5} />
        <Sparkles count={launching ? 80 : 14} scale={[1.1, 1.8, 1.1]} size={launching ? 3 : 1.2} speed={launching ? 2.5 : 0.35} color="#fda4af" position={[0, -0.45, 0.35]} />
      </group>
    </Float>
  );
}

export default function RocketCanvas({ launchTrigger = false }: { launchTrigger?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { margin: '200px 0px', amount: 0 });

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
      <Canvas frameloop={isVisible ? 'always' : 'never'} camera={{ position: [0, 0, 3.8], fov: 35 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.8} color="#f8fafc" />
        <directionalLight position={[4, 5, 4]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-3, 1, 2]} intensity={1.1} color="#a855f7" />
        <pointLight position={[2, -1, 2]} intensity={0.8} color="#67e8f9" />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Rocket launchTrigger={launchTrigger} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/space-rocket.glb');
