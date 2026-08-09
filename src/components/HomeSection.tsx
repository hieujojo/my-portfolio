'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AstronautCanvas from './canvas/Astronaut';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-transparent"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-16 pb-20 sm:px-10 lg:flex-row lg:px-14">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="
            relative
            lg:-translate-y-10
            w-full
            max-w-3xl
            text-center
            text-white
            lg:w-[47%]
            lg:text-left
          "
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="
              mb-5
              text-base
              font-semibold
              uppercase
              tracking-[0.35em]
              text-purple-300
            "
          >
            Welcome to my universe
          </motion.p>

          <h1
            className="
              mb-8
              text-5xl
              font-black
              leading-[1.05]
              sm:text-6xl
              lg:text-7xl
            "
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Trương
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Công Hiếu
            </span>
          </h1>

          <div
            className="
              flex
              h-[72px]
              items-center
              justify-center
              text-xl
              font-medium
              sm:text-2xl
              lg:justify-start
            "
          >
            <TypeAnimation
              sequence={[
                'A passionate Full Stack Developer',
                2000,
                'Building scalable Web Applications',
                2000,
                'Creating cross-platform Mobile Apps',
                2000,
                'Developing 2D & 3D Games',
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="span"
              className="
                bg-gradient-to-r
                from-purple-300
                to-purple-500
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]
              "
            />
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="
            h-[650px]
            w-full
            sm:h-[700px]
            lg:h-[760px]
            lg:w-[53%]
          "
        >
          <AstronautCanvas />
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[5px] text-gray-400">
            Scroll
          </span>

          <div className="flex h-[52px] w-[30px] justify-center rounded-full border border-purple-500/50 bg-purple-900/10 p-2 backdrop-blur">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
              }}
              className="h-2 w-2 rounded-full bg-purple-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
