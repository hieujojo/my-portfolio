"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { textVariant, fadeIn, staggerContainer } from "@/lib/animations";

const NebulaCanvas = dynamic(() => import("./canvas/Nebula"), { ssr: false });

// ─── Data ────────────────────────────────────────────
const services = [
  {
    title: "Web Developer",
    icon: "/web.png",
    description: "Building modern, responsive web apps with React & Next.js",
  },
  {
    title: "Mobile Developer",
    icon: "/mobile.png",
    description: "Cross-platform mobile apps with React Native",
  },
  {
    title: "Game Developer",
    icon: "/backend.png",
    description: "Building games with Unity (C#) & PixiJS for web",
  },
  {
    title: "Full Stack Developer",
    icon: "/creator.png",
    description: "End-to-end product development from UI to database",
  },
];

const stats = [
  { num: 3, suffix: "+", label: "Months Experience" },
  { num: 10, suffix: "+", label: "Projects Built" },
  { num: 6, suffix: "+", label: "Tech Stacks" },
  { num: 1, suffix: "", label: "Company" },
];

// ─── ServiceCard ─────────────────────────────────────
interface ServiceCardProps {
  index: number;
  title: string;
  icon: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  index,
  title,
  icon,
  description,
}) => (
  <Tilt
    className="w-full sm:w-[220px]"
    tiltMaxAngleX={12}
    tiltMaxAngleY={12}
    glareEnable
    glareMaxOpacity={0.08}
    glareColor="#a855f7"
  >
    <motion.div
      variants={fadeIn("right", index * 0.15, 0.75)}
      className="group w-full rounded-2xl p-px transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(109,40,217,0.1) 100%)",
      }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="bg-[#0e0c1a] rounded-2xl py-7 px-6 min-h-[220px] flex justify-evenly items-center flex-col relative overflow-hidden">
        {/* Hover glow bg */}
        <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/5 transition-colors duration-500 rounded-2xl" />

        {/* Icon with glow ring */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/40 transition-all duration-500" />
          <Image
            src={icon}
            alt={title}
            width={56}
            height={56}
            className="w-14 h-14 object-contain relative z-10 drop-shadow-lg"
          />
        </div>

        <h3 className="text-white text-[16px] font-semibold text-center leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-[12px] text-center leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  </Tilt>
);

// ─── StatCard ────────────────────────────────────────
const StatCard: React.FC<{
  num: number;
  suffix: string;
  label: string;
  index: number;
}> = ({ num, suffix, label, index }) => (
  <motion.div
    variants={fadeIn("up", index * 0.1, 0.6)}
    className="flex flex-col items-center gap-1 px-6 py-4 rounded-xl glass w-[160px]"
  >
    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
      <CountUp
        end={num}
        suffix={suffix}
        duration={2.5}
        enableScrollSpy
        scrollSpyOnce
      />
    </span>
    <span className="text-gray-400 text-xs uppercase tracking-widest text-center mt-1">
      {label}
    </span>
  </motion.div>
);

// ─── AboutSection ────────────────────────────────────
export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      {/* Nebula background */}
      <NebulaCanvas />
      {/* Galaxy Core atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-950/20 blur-[110px]" />

      <motion.div
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={textVariant()}>
          <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2 font-medium">
            Identity Sector
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white text-center">
            Galaxy Core
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={fadeIn("up", 0.1, 1)}
          className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#080b18]/75 p-7 text-center shadow-[0_0_70px_rgba(34,211,238,0.1)] backdrop-blur-xl sm:p-10"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300">Core transmission / profile</p>
          I&apos;m a{" "}
          <span className="text-purple-400 font-semibold">
            Software Engineer
          </span>{" "}
          with hands-on experience building reliable, scalable applications —
          focused on delivering practical solutions across Web, Mobile, and Game
          development. I emphasize performance, clean architecture, and
          real-world problem solving using{" "}
          <span className="text-purple-400 font-semibold">
            JavaScript, TypeScript, React, React Native, Next.js, Unity (C#),
            and PixiJS
          </span>
          .
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="relative mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4 rounded-[2rem] border border-purple-400/10 bg-purple-950/10 p-5 sm:gap-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-dashed border-purple-400/15" />
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              num={stat.num}
              suffix={stat.suffix}
              label={stat.label}
              index={i}
            />
          ))}
        </motion.div>

        {/* Core systems */}
        <motion.p variants={fadeIn("up", 0.25, 0.8)} className="mt-16 text-center text-xs font-semibold uppercase tracking-[0.35em] text-purple-300">
          Core systems / capabilities
        </motion.p>
        <motion.div
          variants={staggerContainer(0.15, 0.3)}
          className="mt-6 flex flex-wrap justify-center gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
