'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';

function Rocket({ launchTrigger = false }: { launchTrigger?: boolean }) {
  const { scene } = useGLTF('/models/space-rocket.glb');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!launchTrigger) return;
    setScale(0.92);
    const timeout = window.setTimeout(() => setScale(1), 260);
    return () => window.clearTimeout(timeout);
  }, [launchTrigger]);

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
      <primitive
        object={scene}
        scale={scale * 1.8}
        rotation={[0, 0, -0.35]}
        position={[0, -0.15, 0]}
      />
    </Float>
  );
}

export default function RocketCanvas({ launchTrigger = false }: { launchTrigger?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 35 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 5, 4]} intensity={2} color="#cffafe" />
        <pointLight position={[-3, 1, 2]} intensity={1.5} color="#a855f7" />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Rocket launchTrigger={launchTrigger} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/space-rocket.glb');
