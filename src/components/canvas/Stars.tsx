'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Layer 1 — Large stars, purple tint, faster rotation
const StarLayer = ({
  count,
  radius,
  color,
  size,
  speedX,
  speedY,
}: {
  count: number;
  radius: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
}) => {
  const ref = useRef<any>(null);
  const [sphere] = useState(
    () => random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * speedX;
      ref.current.rotation.y -= delta * speedY;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateDeviceSize = () => setIsMobile(mediaQuery.matches);

    updateDeviceSize();
    mediaQuery.addEventListener('change', updateDeviceSize);
    return () => mediaQuery.removeEventListener('change', updateDeviceSize);
  }, []);

  return (
    <div className="w-full h-auto absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={isMobile ? [1, 1] : [1, 1.5]}>
        <Suspense fallback={null}>
          {/* Layer 1 — Purple stars, main layer, 8000 points */}
          <StarLayer
            count={isMobile ? 2500 : 8000}
            radius={1.2}
            color="#a855f7"
            size={0.002}
            speedX={0.1}
            speedY={0.067}
          />
          {/* Layer 2 — Blue/white micro stars, slower drift */}
          <StarLayer
            count={isMobile ? 1200 : 4000}
            radius={1.5}
            color="#93c5fd"
            size={0.001}
            speedX={0.04}
            speedY={0.025}
          />
          {/* Layer 3 — White bright pinpoints */}
          <StarLayer
            count={isMobile ? 600 : 2000}
            radius={1.0}
            color="#f8fafc"
            size={0.0015}
            speedX={0.07}
            speedY={0.05}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

