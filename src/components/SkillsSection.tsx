'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const skills = [
  { name: 'HTML', src: '/images/HTML5_logo_resized.png' },
  { name: 'CSS', src: '/images/css.png' },
  { name: 'JavaScript', src: '/images/javascript.png' },
  { name: 'TypeScript', src: '/images/typescript-logo-png_seeklogo-526730.png' },
  { name: 'React', src: '/images/reactjs.png' },
    { name: 'React Native', src: '/images/react-native-removebg-preview.png' },
  { name: 'Tailwind CSS', src: '/images/tailwindcss-icon-removebg-preview.png' },
  { name: 'Node.js', src: '/images/nodejs1232-removebg-preview.png' },
  { name: 'MongoDB', src: '/images/MongoDB-Emblem-2048x1280-removebg-preview.png' },
  { name: 'Next.js', src: '/images/next-js-logo-png_seeklogo-321806-removebg-preview.png' },
  { name: 'Git', src: '/images/git5-removebg-preview.png' },
  { name: 'Bootstrap', src: '/images/boot-removebg-preview.png' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 ">Skills</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 text-center py-4 rounded-lg shadow-md flex items-center justify-center flex-col hover:scale-105 hover:rotate-2 transition duration-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Image
                src={skill.src}
                alt={skill.name}
                width={60}
                height={60}
                className="mb-2"
              />
              <span className="text-lg font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}