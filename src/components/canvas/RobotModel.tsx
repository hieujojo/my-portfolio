"use client";

import { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { motion } from "framer-motion";
import Model from "./Robot";

export default function RobotModel({
  animateTrigger,
  isTyping,
}: {
  animateTrigger?: boolean
  isTyping?: boolean
}) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (animateTrigger) {
      setScale(0.8)
      const timeout = setTimeout(() => setScale(1), 300)
      return () => clearTimeout(timeout)
    }
  }, [animateTrigger])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model scale={0.9} position={[0, -1, 0]} />
          <OrbitControls enableZoom={false} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
