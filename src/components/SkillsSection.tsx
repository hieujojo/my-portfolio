'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const skills = [
  { name: 'HTML', src: '/images/skills/HTML5_logo_resized.png', dark: false },
  { name: 'CSS', src: '/images/skills/css.png', dark: false },
  { name: 'JavaScript', src: '/images/skills/javascript.png', dark: false },
  { name: 'TypeScript', src: '/images/skills/typescript-logo-png_seeklogo-526730.png', dark: false },
  { name: 'React', src: '/images/skills/reactjs.png', dark: false },
  { name: 'React Native', src: '/images/skills/react-native-removebg-preview.png', dark: false },
  { name: 'Tailwind CSS', src: '/images/skills/tailwindcss-icon-removebg-preview.png', dark: false },
  { name: 'Node.js', src: '/images/skills/nodejs1232-removebg-preview.png', dark: true },
  { name: 'MongoDB', src: '/images/skills/MongoDB-Emblem-2048x1280-removebg-preview.png', dark: false },
  { name: 'Next.js', src: '/images/skills/next-js-logo-png_seeklogo-321806-removebg-preview.png', dark: true },
  { name: 'Git', src: '/images/skills/git5-removebg-preview.png', dark: false },
  { name: 'Bootstrap', src: '/images/skills/boot-removebg-preview.png', dark: false },
  { name: 'Docker', src: '/images/skills/docker-mark-ocean-blue-removebg-preview.png', dark: false },
  { name: '.NET', src: '/images/skills/dotnet_.png', dark: false },
  { name: 'Firebase', src: '/images/skills/firebase-removebg-preview.png', dark: false },
  { name: 'Supabase', src: '/images/skills/supabase-removebg-preview.png', dark: false },
  { name: 'Unity', src: '/images/skills/Unity-logo-removebg-preview.png', dark: true },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2">
          What I know
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-12">
          Skills
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -4, borderColor: '#7c3aed' }}
              className="bg-[#12101f] border border-purple-900/30 rounded-xl py-5 px-3 flex flex-col items-center gap-3 cursor-default transition-all duration-300 hover:bg-[#1a1730] hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${
                  skill.dark
                    ? 'bg-white/90 p-2 shadow-md'
                    : 'bg-transparent'
                }`}
              >
                <Image
                  src={skill.src}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className={`object-contain drop-shadow-md ${
                    skill.dark ? 'w-10 h-10' : 'w-12 h-12'
                  }`}
                />
              </div>
              <span className="text-gray-300 text-[13px] font-medium text-center">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}