'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, Transition } from 'framer-motion';

const services = [
  { title: 'Web Developer', icon: '../web.png' },
  { title: 'React Native Developer', icon: '../mobile.png' },
  { title: 'Backend Developer', icon: '../backend.png' },
  { title: 'Full Stack Developer', icon: '../creator.png' },
];

const textVariant = (delay: number = 0) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0, opacity: 1,
    transition: { type: 'spring' as const, duration: 1.25, delay } as Transition,
  },
});

const fadeIn = (direction: 'left' | 'right' | 'up' | 'down', delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0, y: 0, opacity: 1,
    transition: { type: 'spring' as const, delay, duration, ease: 'easeOut' } as Transition,
  },
});

const staggerContainer = (staggerChildren: number, delayChildren: number = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="sm:p-16 xs:p-8 p-6 max-w-7xl mx-auto relative z-0 bg-[#0a0a0f] overflow-hidden"
      >
        <span className="hash-span" id={idName}>&nbsp;</span>
        <Component />
      </motion.section>
    );
  };

interface ServiceCardProps {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ index, title, icon }) => (
  <Tilt className="w-full sm:w-[220px]">
    <motion.div
      variants={fadeIn('right', index * 0.5, 0.75)}
      className="w-full rounded-2xl p-px bg-linear-to-b from-purple-600 to-purple-900/30"
    >
      <div className="bg-[#0e0c1a] rounded-2xl py-6 px-8 min-h-60 flex justify-evenly items-center flex-col">
        <img src={icon} alt={title} className="w-14 h-14 object-contain" />
        <h3 className="text-white text-[17px] font-semibold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] sm:w-[500px] h-[200px] bg-purple-900/15 blur-[100px] rounded-full pointer-events-none" />

      <motion.div variants={textVariant()}>
        <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2">
          Introduction
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center">
          Overview
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn('up', 0.1, 1)}
        className="mt-6 text-gray-400 text-[16px] leading-relaxed text-center max-w-3xl mx-auto"
      >
        I'm a Software Engineer with hands-on experience building reliable, scalable applications,
        focused on delivering practical solutions in both Software Engineer and Mobile Developer roles.
        I emphasize performance, clean architecture, and real-world problem solving using
        JavaScript, TypeScript, React, React Native, and Next.js.
      </motion.p>

      <div className="mt-16 flex flex-wrap gap-6 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');