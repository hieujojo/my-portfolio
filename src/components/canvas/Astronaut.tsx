'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useAnimations, useGLTF } from '@react-three/drei';
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

export default function AstronautCanvas() {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 8], fov: 35 }}
      dpr={[1, 1.25]}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <Astronaut position={[0, -1.55, 0]} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

useGLTF.preload('/models/astronaut-optimized.glb');
