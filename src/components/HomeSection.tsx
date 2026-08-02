'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ComputersCanvas from './canvas/Computers';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden"
    >
      {/* Purple glow overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-950/40 via-transparent to-transparent pointer-events-none z-1" />

      {/* 3D Model */}
      <div className="absolute inset-0 z-0">
        <ComputersCanvas />
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center text-white px-4 mb-60 mt-[-100px] sm:mt-[-150px]"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-400 uppercase tracking-widest text-sm mb-4 font-medium"
        >
          Welcome to my universe
        </motion.p>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Trương Công Hiếu
          </span>
        </h1>
        
        <div className="text-gray-300 text-lg sm:text-2xl max-w-2xl mx-auto font-medium h-[60px] flex items-center justify-center">
          <TypeAnimation
            sequence={[
              'A passionate Full Stack Developer',
              2000,
              'Building scalable Web Applications',
              2000,
              'Creating cross-platform Mobile Apps',
              2000,
              'Designing interactive 3D Experiences',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-gray-400 text-xs tracking-[4px] uppercase">Scroll</span>
        <div className="w-[30px] h-[50px] rounded-3xl border-2 border-purple-500/50 flex justify-center p-2 backdrop-blur-sm bg-purple-900/10">
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          />
        </div>
      </div>
    </section>
  );
}