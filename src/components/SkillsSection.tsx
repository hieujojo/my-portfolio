'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import Marquee from 'react-fast-marquee';
import skillColors from '@/data/skillColors.json';

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', src: '/images/skills/frontend/HTML5.png' },
      { name: 'CSS', src: '/images/skills/frontend/css.png' },
      { name: 'JavaScript', src: '/images/skills/frontend/javascript.png' },
      { name: 'TypeScript', src: '/images/skills/frontend/typescript.png' },
      { name: 'Bootstrap', src: '/images/skills/frontend/bootstrap.png' },
      { name: 'Tailwind CSS', src: '/images/skills/frontend/tailwindcss.png' },
      { name: 'Pixi.js', src: '/images/skills/frontend/pixijs.png' },
      { name: 'Three.js', src: '/images/skills/frontend/threejs.png' },
      { name: 'React', src: '/images/skills/frontend/reactjs.png' },
      { name: 'React Native', src: '/images/skills/frontend/react-native.png' },
      { name: 'Next.js', src: '/images/skills/frontend/nextjs-logotype-dark-background.png' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', src: '/images/skills/backend/nodejs.png' },
      { name: '.NET', src: '/images/skills/backend/dotnet.png' },
      { name: 'MongoDB', src: '/images/skills/backend/MongoDB.png' },
      { name: 'Firebase', src: '/images/skills/backend/firebase.png' },
      { name: 'Supabase', src: '/images/skills/backend/supabase.png' },
    ],
  },
  {
    title: 'Tools & Clouds',
    skills: [
      { name: 'Git', src: '/images/skills/Tools & Clouds/git.png' },
      { name: 'Docker', src: '/images/skills/Tools & Clouds/docker.png' },
      { name: 'Postman', src: '/images/skills/Tools & Clouds/postman.png' },
      { name: 'Ngrok', src: '/images/skills/Tools & Clouds/ngrok-logo-white-xl.png' },
      { name: 'Cloudinary', src: '/images/skills/Tools & Clouds/cloudinary.png' },
      { name: 'Vercel', src: '/images/skills/Tools & Clouds/vercel.png' },
      { name: 'Render', src: '/images/skills/Tools & Clouds/render.png' },
    ],
  },
  {
    title: 'Game Engine',
    skills: [
      { name: 'Unity', src: '/images/skills/game/unity.png' },
      { name: 'Unreal Engine', src: '/images/skills/game/unreal-engine.png' },
      { name: 'RPG Maker', src: '/images/skills/game/rpgMaker.png' },
      { name: "Ren'Py", src: '/images/skills/game/Renpy-logo.png' },
    ],
  },
  {
    title: 'AI Tools',
    skills: [
      { name: 'Claude', src: '/images/skills/AI/claude.png' },
      { name: 'GitHub Copilot', src: '/images/skills/AI/github-copilot.png' },
      { name: 'Cursor', src: '/images/skills/AI/cursor.png' },
      { name: 'Codex', src: '/images/skills/AI/codex.png' },
      { name: 'Groq', src: '/images/skills/AI/groq.png' },
      { name: 'Antigravity', src: '/images/skills/AI/antigravity.png' },
    ],
  },
];

const DEFAULT_COLOR = 'rgba(124, 58, 237, 0.55)';

function SkillPlanet({ skill }: { skill: { name: string; src: string } }) {
  const colorMap = skillColors as Record<string, string>;
  const auraColor = colorMap[skill.src] ?? DEFAULT_COLOR;

  // Detect silver-blue aura (dark logos) to apply drop-shadow boost
  const isVeryDark = auraColor.startsWith('rgba(160, 180, 255');

  return (
    <div
      className="group w-full h-full relative flex items-center justify-center"
      style={{ pointerEvents: 'auto' }}
    >

      {/* Floating Logo — fixed 52x52 forced on img itself */}
      <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
        <img
          src={skill.src}
          alt={skill.name}
          style={{
            width: '52px',
            height: '52px',
            objectFit: 'fill',
            filter: isVeryDark
              ? 'drop-shadow(0 0 3px rgba(200,220,255,0.5)) brightness(1.05)'
              : `drop-shadow(0 0 2px ${auraColor})`,
          }}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0a0a0f]/90 border border-purple-500/40 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-lg z-50">
        {skill.name}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none nebula-glow" />

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { top: '20%', left: '40%', delay: '1s', duration: '3s' },
          { top: '35%', left: '70%', delay: '3s', duration: '4s' },
          { top: '10%', left: '90%', delay: '5s', duration: '3.5s' },
          { top: '45%', left: '30%', delay: '2s', duration: '4.5s' },
          { top: '5%', left: '60%', delay: '6s', duration: '3.2s' },
          { top: '25%', left: '85%', delay: '4s', duration: '3.8s' },
        ].map((star, i) => (
          <div
            key={`star-${i}`}
            className="shooting-star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 min-h-screen lg:min-h-[1000px] flex flex-col items-center justify-center">
        
        {/* MOBILE & TABLET: MARQUEE LAYOUT */}
        <div className="block lg:hidden w-full pt-10">
          <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2">
            What I know
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-10 sm:mb-12">
            Skills
          </h2>

          <div className="space-y-6 sm:space-y-8 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="w-full"
              >
                <p className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 sm:mb-4 px-4 sm:px-6">
                  {group.title}
                </p>

                <Marquee
                  gradient={true}
                  gradientColor="#0a0a0f"
                  gradientWidth={60}
                  speed={40 + (groupIndex % 2) * 15}
                  direction={groupIndex % 2 === 0 ? 'left' : 'right'}
                  pauseOnHover={true}
                  autoFill={true}
                  className="py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="mx-2 sm:mx-3 w-[140px] sm:w-[160px] h-full shrink-0">
                      <Tilt
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        glareEnable={true}
                        glareMaxOpacity={0.3}
                        glareColor="#ffffff"
                        glarePosition="all"
                        glareBorderRadius="12px"
                        scale={1.05}
                        transitionSpeed={400}
                        className="group bg-[#1a1730]/80 backdrop-blur-sm border border-purple-900/40 rounded-xl py-5 px-3 flex flex-col items-center justify-center gap-3 min-h-[140px] h-full cursor-default transition-colors duration-300 hover:bg-[#201b3a]/90 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] relative overflow-hidden"
                      >
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-slate-100 shadow-inner transition-transform duration-300 group-hover:scale-110 shrink-0"
                        >
                          <img
                            src={skill.src}
                            alt={skill.name}
                            className="object-contain drop-shadow-sm"
                            style={{ maxWidth: '90px', maxHeight: '44px' }}
                          />
                        </div>
                        <span className="text-gray-300 text-[13px] sm:text-[14px] font-semibold text-center leading-tight group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </Tilt>
                    </div>
                  ))}
                </Marquee>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DESKTOP: SOLAR SYSTEM LAYOUT */}
        <div className="hidden lg:flex w-full h-[1000px] relative items-center justify-center overflow-hidden">
          {/* Center Title / Sun */}
          <div className="absolute z-50 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2 drop-shadow-md">
              What I know
            </p>
            <h2 className="text-6xl font-black text-white text-center drop-shadow-[0_0_30px_rgba(124,58,237,0.8)]">
              Skills
            </h2>
          </div>

          {/* Orbital Rings */}
          {skillGroups.map((group, groupIndex) => {
            const radius = 160 + groupIndex * 80; // 160, 240, 320, 400, 480 — max diam 960px fits container
            const duration = 40 + groupIndex * 20; // 40, 60, 80, 100, 120 seconds per revolution
            const direction = groupIndex % 2 === 0 ? 1 : -1;

            return (
              <motion.div
                key={`orbit-${group.title}`}
                animate={{ rotate: 360 * direction }}
                transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
                className="absolute top-1/2 left-1/2 rounded-full border border-purple-400/30"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  x: '-50%',
                  y: '-50%',
                  pointerEvents: 'none', // orbital ring must NOT capture mouse
                }}
              >
                {group.skills.map((skill, index) => {
                  const angle = (index / group.skills.length) * Math.PI * 2;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={`skill-${skill.name}`}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        x: x - 32,
                        y: y - 32,
                        width: 64,
                        height: 64,
                        pointerEvents: 'none', // pass-through: SkillPlanet handles its own events
                      }}
                      animate={{ rotate: -360 * direction }}
                      transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
                    >
                      <SkillPlanet skill={skill} />
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
