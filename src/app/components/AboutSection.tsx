'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  const aboutItems = [
    {
      image: '/images/about1.png',
      title: 'Frontend Developer',
      text: 'Passionate frontend developer crafting stunning interfaces with Next.js, React, and Tailwind CSS.',
    },
    {
      image: '/images/about2.png',
      title: 'Website Developer',
      text: 'Creative website developer building elegant sites with JavaScript, TypeScript, and modern tools.',
    },
    {
      image: '/images/1.png',
      title: 'Software Developer',
      text: 'Innovative software developer solving real-world issues with Node.js, MongoDB, and design skills.',
    },
    {
      image: '/images/about3.png',
      title: 'Full Stack Developer',
      text: 'Experienced full-stack developer creating responsive, customized websites for all platforms.',
    },
  ];

  return (
    <section
      id="about"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-300 to-purple-400"
    >
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl flex justify-center font-bold text-center mb-8 sm:mb-12 text-white">
          About Me
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {aboutItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              className="flex flex-col items-center text-center p-2 sm:p-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={`About Me - Point ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md w-full sm:w-auto object-cover"
                />
              </motion.div>
              <p className="text-base sm:text-lg text-gray-900 font-bold max-w-prose mt-2">
                {item.title}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 max-w-prose mt-2 w-full sm:w-[200px]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}