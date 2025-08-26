'use client';

import { motion } from 'framer-motion';
import ComputersCanvas from './canvas/Computers';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-develop-4.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Mô hình 3D */}
      <div className="absolute inset-0 z-0">
        <ComputersCanvas />
      </div>

      {/* Nội dung văn bản */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center text-white px-4 mb-80"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-lg">Hi, I'm Trương Công Hiếu</h1>
        <p className="text-xl sm:text-2xl mb-6 drop-shadow-md">Frontend Developer | Passionate about building modern web and mobile applications</p>
      </motion.div>
    </section>
  );
}