"use client";

import React from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { textVariant, fadeIn, staggerContainer } from "@/lib/animations";

// ─── Data ────────────────────────────────────────────
const services = [
  {
    system: "SYS-01 / INTERFACE",
    title: "Web Developer",
    icon: "/web.png",
    description: "Building modern, responsive web apps with React & Next.js",
  },
  {
    system: "SYS-02 / MOBILE",
    title: "Mobile Developer",
    icon: "/mobile.png",
    description: "Cross-platform mobile apps with React Native",
  },
  {
    system: "SYS-03 / SIMULATION",
    title: "Game Developer",
    icon: "/backend.png",
    description: "Building games with Unity (C#) & PixiJS for web",
  },
  {
    system: "SYS-04 / INTEGRATION",
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
  system: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  index,
  title,
  icon,
  description,
  system,
}) => (
  <Tilt
    className="w-full sm:w-[220px]"
    tiltMaxAngleX={12}
    tiltMaxAngleY={12}
    glareEnable
    glareMaxOpacity={0.08}
    glareColor="#67e8f9"
  >
    <motion.div
      variants={fadeIn("right", index * 0.15, 0.75)}
      className="group w-full rounded-2xl p-px transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(103,232,249,0.38) 0%, rgba(168,85,247,0.12) 100%)",
      }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative flex min-h-[220px] flex-col items-center justify-evenly overflow-hidden rounded-2xl bg-[#080b18] px-6 py-7">
        {/* Hover glow bg */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-300/0 transition-colors duration-500 group-hover:bg-cyan-300/[0.06]" />
        <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">{system}</span>

        {/* Icon with glow ring */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-300/15 blur-xl transition-all duration-500 group-hover:bg-cyan-300/35" />
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
    className="relative z-10 flex w-[160px] flex-col items-center gap-1 rounded-xl border border-cyan-300/15 bg-[#080b18]/75 px-6 py-4 backdrop-blur"
  >
    <span className="bg-gradient-to-r from-cyan-200 to-purple-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >

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
          <p className="text-sm uppercase tracking-widest text-cyan-300 text-center mb-2 font-medium">
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
          <span className="text-cyan-300 font-semibold">
            Software Engineer
          </span>{" "}
          with hands-on experience building reliable, scalable applications —
          focused on delivering practical solutions across Web, Mobile, and Game
          development. I emphasize performance, clean architecture, and
          real-world problem solving using{" "}
          <span className="text-cyan-300 font-semibold">
            JavaScript, TypeScript, React, React Native, Next.js, Unity (C#),
            and PixiJS
          </span>
          .
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="relative mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4 p-5 sm:gap-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-x-12 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent md:block" />
          <span className="pointer-events-none absolute left-10 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.85)] md:block" />
          <span className="pointer-events-none absolute right-10 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,.85)] md:block" />
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
        <motion.p variants={fadeIn("up", 0.25, 0.8)} className="mt-16 text-center text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
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
