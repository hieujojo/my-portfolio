'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', src: '/images/skills/HTML5_logo_resized.png', dark: false },
      { name: 'CSS', src: '/images/skills/css.png', dark: false },
      { name: 'JavaScript', src: '/images/skills/javascript.png', dark: false },
      { name: 'TypeScript', src: '/images/skills/typescript-logo-png_seeklogo-526730.png', dark: false },
      { name: 'Bootstrap', src: '/images/skills/boot-removebg-preview.png', dark: false },
      { name: 'Tailwind CSS', src: '/images/skills/tailwindcss-icon-removebg-preview.png', dark: false },
      { name: 'Pixi.js', src: '/images/skills/pixijs-logo-full-light.png', dark: false },
      { name: 'Three.js', src: '/images/skills/threejs-removebg-preview.png', dark: true },
      { name: 'React', src: '/images/skills/reactjs.png', dark: false },
      { name: 'React Native', src: '/images/skills/react-native-logo-removebg-preview.png', dark: false },
      { name: 'Next.js', src: '/images/skills/next-js-logo-png_seeklogo-321806-removebg-preview.png', dark: true },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', src: '/images/skills/nodejs1232-removebg-preview.png', dark: true },
      { name: '.NET', src: '/images/skills/dotnet_.png', dark: false },
      { name: 'MongoDB', src: '/images/skills/MongoDB-Emblem-2048x1280-removebg-preview.png', dark: false },
      { name: 'Firebase', src: '/images/skills/firebase-removebg-preview.png', dark: false },
      { name: 'Supabase', src: '/images/skills/supabase-removebg-preview.png', dark: false },
    ],
  },
  {
    title: 'Tools & Clouds',
    skills: [
      { name: 'Git', src: '/images/skills/git5-removebg-preview.png', dark: false },
      { name: 'Docker', src: '/images/skills/docker-mark-ocean-blue-removebg-preview.png', dark: false },
      { name: 'Postman', src: '/images/skills/postman-logo-removebg-preview.png', dark: true, large: true },
      { name: 'Vercel', src: '/images/skills/vercel-logotype-light-removebg-preview.png', dark: true, large: true },
      { name: 'Render', src: '/images/skills/render-logo-removebg-preview.png', dark: true, large: true },
      { name: 'Unity', src: '/images/skills/Unity-logo-removebg-preview.png', dark: true },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2">
          What I know
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-10 sm:mb-12">
          Skills
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="w-full"
            >
              <p className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 sm:mb-4">
                {group.title}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                {group.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: groupIndex * 0.08 + index * 0.04 }}
                    whileHover={{ y: -4, borderColor: '#7c3aed' }}
                    className="bg-[#1a1730] border border-purple-900/20 rounded-xl py-4 px-2 flex flex-col items-center justify-center gap-2 min-h-[120px] cursor-default transition-all duration-300 hover:bg-[#201b3a] hover:shadow-lg hover:shadow-purple-900/20"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${
                        skill.dark ? 'bg-white/90 p-2 shadow-md' : 'bg-transparent'
                      }`}
                    >
                      <Image
                        src={skill.src}
                        alt={skill.name}
                        width={48}
                        height={48}
                        className={`object-contain drop-shadow-md ${
                          skill.dark ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
                        }`}
                      />
                    </div>
                    <span className="text-gray-300 text-[12px] sm:text-[13px] font-medium text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}