'use client';

import { useRef } from 'react';
import type { Ref } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Noise-based ShaderMaterial ────────────────────────────────────────────────
const NebulaMaterial = shaderMaterial(
  { uTime: 0, uColor1: new THREE.Color('#4c1d95'), uColor2: new THREE.Color('#a855f7') },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    // Simple 2D noise
    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = rand(i);
      float b = rand(i + vec2(1.0, 0.0));
      float c = rand(i + vec2(0.0, 1.0));
      float d = rand(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    float fbm(vec2 p) {
      float v = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 5; i++) {
        v += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv * 3.0 - 1.5;
      float t = uTime * 0.12;
      float n = fbm(uv + t);
      float radial = 1.0 - smoothstep(0.3, 1.0, length(vUv - 0.5) * 2.0);
      float alpha = n * radial * 0.45;
      vec3 col = mix(uColor1, uColor2, n);
      gl_FragColor = vec4(col, alpha);
    }
  `
);

extend({ NebulaMaterial });

// Extend Three.js types
declare module '@react-three/fiber' {
  interface ThreeElements {
    nebulaMaterial: {
      uTime?: number;
      uColor1?: THREE.Color;
      uColor2?: THREE.Color;
      attach?: string;
      transparent?: boolean;
      depthWrite?: boolean;
    blending?: THREE.Blending;
      ref?: Ref<THREE.ShaderMaterial & { uTime: number }>;
    };
  }
}

// ── Inner mesh ────────────────────────────────────────────────────────────────
function NebulaMesh() {
  const matRef = useRef<THREE.ShaderMaterial & { uTime: number }>(null);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uTime = clock.getElapsedTime();
  });

  return (
    <mesh>
      <planeGeometry args={[4, 4, 1, 1]} />
      <nebulaMaterial
        ref={matRef}
        attach="material"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── Exported component ────────────────────────────────────────────────────────
export default function NebulaCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
      >
        <NebulaMesh />
      </Canvas>
    </div>
  );
}
