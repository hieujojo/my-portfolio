'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hi, I'm Trương Công Hiếu</h1>
        <p className="text-lg sm:text-xl mb-6">Frontend Developer | Passionate about building modern web applications</p>
        <a href="#contact" className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-200">
          Get in Touch
        </a>
      </motion.div>
    </section>
  );
}