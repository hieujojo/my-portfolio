'use client';

import { motion } from 'framer-motion';
import ComputersCanvas from './canvas/Computers';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-[#0a0a0f] overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-develop-4.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Purple glow overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-950/30 via-transparent to-[#0a0a0f] pointer-events-none z-1" />

      {/* 3D Model */}
      <div className="absolute inset-0 z-0">
        <ComputersCanvas />
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center text-white px-4 mb-80"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-400 uppercase tracking-widest text-sm mb-4 font-medium"
        >
          Full Stack Developer
        </motion.p>
        <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600">
            Trương Công Hiếu
          </span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto">
          Passionate about building modern web and mobile applications
        </p>
      </motion.div>
    </section>
  );
}