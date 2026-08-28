'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useAnimations, useGLTF } from '@react-three/drei';
import { useInView } from 'framer-motion';
import type { ThreeElements } from '@react-three/fiber';
import type { Group } from 'three';
import { LoopRepeat } from 'three';

import CanvasLoader from './Loader';

type AstronautProps = ThreeElements['group'];

function Astronaut(props: AstronautProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/models/astronaut-optimized.glb');
  const { actions } = useAnimations(animations, group);
  scene.scale.set(1.25, 1.25, 1.25);

  useEffect(() => {
    // Chạy idle thật chậm để tạo chuyển động nhẹ, không xoay model.
    const action = actions.idle ?? actions[namesFromAnimations(animations)[0]];
    if (!action) return;

    action.reset();
    action.setLoop(LoopRepeat, Infinity);
    action.timeScale = 0.16;
    action.fadeIn(0.4).play();

    return () => {
      action.fadeOut(0.4);
    };
  }, [actions, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function namesFromAnimations(animations: { name: string }[]) {
  return animations.map((animation) => animation.name);
}

function RenderScheduler({ enabled }: { enabled: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: number | undefined;
    const schedule = () => {
      invalidate();
      timeoutId = window.setTimeout(schedule, 1000 / 30);
    };

    schedule();
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [enabled, invalidate]);

  return null;
}

export default function AstronautCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { margin: '200px 0px', amount: 0 });
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px), (prefers-reduced-motion: reduce)');
    const updatePowerMode = () => setIsLowPower(mediaQuery.matches);
    updatePowerMode();
    mediaQuery.addEventListener('change', updatePowerMode);
    return () => mediaQuery.removeEventListener('change', updatePowerMode);
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.5} />
          <Astronaut position={[0, -1.55, 0]} />
          <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
          <RenderScheduler enabled={isVisible && !isLowPower} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

