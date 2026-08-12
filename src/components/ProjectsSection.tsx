"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { textVariant, fadeIn } from "@/lib/animations";
import { projectCategories as categories, projects, type Project } from "@/lib/constants";

// ── Particle burst on hover ────────────────────────────────────────────────────
function ParticleBurst({ active }: { active: boolean }) {
  const particles = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 40;
        const ty = Math.sin(rad) * 40;
        return (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-purple-400"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={
              active
                ? { opacity: [0, 1, 0], x: tx, y: ty, scale: [0, 1.5, 0] }
                : { opacity: 0, x: 0, y: 0, scale: 0 }
            }
            transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// ── Mission card ───────────────────────────────────────────────────────────────
function MissionReadout({ project, index }: { project: Project; index: number }) {
  const missionId = String(index + 1).padStart(2, "0");

  return (
    <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
      <span className="text-cyan-200">Target // {missionId}</span>
      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2 py-1 text-cyan-200">
        {project.engine ? `${project.engine} ${project.dimension ?? ""}` : project.category[0]}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      variants={fadeIn("up", index * 0.08, 0.5)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="group relative flex h-full min-h-[375px] flex-col overflow-hidden rounded-[1.35rem] border border-cyan-300/20 bg-[#050914]/65 p-2 shadow-[0_14px_35px_rgba(8,47,73,.14)] backdrop-blur transition-colors duration-300 hover:border-cyan-300/55">
      <ParticleBurst active={hovered} />
      <span className="pointer-events-none absolute left-2 top-2 z-20 h-5 w-5 rounded-tl-lg border-l border-t border-cyan-200/70" />
      <span className="pointer-events-none absolute right-2 top-2 z-20 h-5 w-5 rounded-tr-lg border-r border-t border-cyan-200/70" />
      <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-5 w-5 rounded-bl-lg border-b border-l border-cyan-200/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 z-20 h-5 w-5 rounded-br-lg border-b border-r border-cyan-200/40" />
      {project.isNew && (
        <span className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-yellow-300/60 bg-yellow-400/90 px-2.5 py-1 text-[10px] font-bold text-black">
          ✦ New
        </span>
      )}
      {project.comingSoon && (
        <span className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-purple-600/90 px-2.5 py-1 text-[10px] font-semibold text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-300" />
          Coming Soon
        </span>
      )}
      <div className="relative h-[150px] w-full overflow-hidden rounded-[1rem] border border-white/[0.08] bg-[#03050d] sm:h-[160px]">
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-100/60">
          <span>Mission // {String(index + 1).padStart(2, "0")}</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /> Signal</span>
        </div>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          className={`object-contain transition-transform duration-500 ${hovered ? "scale-[1.04]" : ""} ${project.comingSoon ? "opacity-50 grayscale" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-2.5 pb-2.5 pt-3 sm:px-3 sm:pb-3">
        <MissionReadout project={project} index={index} />
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-bold leading-tight text-white">{project.title}</h3>
          {project.status && <span className="shrink-0 font-mono text-[8px] uppercase tracking-wider text-emerald-300/80">{project.status}</span>}
        </div>
        {project.engine && (
          <div className="flex flex-wrap gap-1 text-[9px] font-semibold uppercase tracking-wider">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-200">{project.engine}</span>
            <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-2 py-1 text-purple-200">{project.dimension}</span>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-2 py-1 text-cyan-100">{project.genre}</span>
          </div>
        )}
        <p className="flex-1 text-[12px] leading-relaxed text-gray-400">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-purple-700/30 bg-purple-900/30 px-1.5 py-0.5 font-mono text-[10px] text-purple-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-cyan-300/40 bg-cyan-300/90 py-1.5 text-center text-[11px] font-bold text-slate-950 transition-colors hover:bg-cyan-200">
            Code ↗
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-white/20 bg-white/10 py-1.5 text-center text-[11px] font-bold text-white transition-colors hover:bg-white/20">
              {project.demoLabel ?? "Demo"} ↗
            </a>
          )}
          {project.extraLinks?.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-white/20 bg-white/10 py-1.5 text-center text-[11px] font-bold text-white transition-colors hover:bg-white/20">
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((p) =>
    activeCategory === "All" ? true : p.category.includes(activeCategory)
  );

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-900/15 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
            <p className="text-sm uppercase tracking-widest text-cyan-300 text-center mb-2 font-medium font-mono">
            Project Galaxy
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-6">
            Mission Archive
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("up", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-400 text-center text-[16px] leading-relaxed max-w-2xl mx-auto mb-10"
        >
          A constellation of software and game missions across web, mobile, backend and interactive experiences.
          Select a signal to inspect its technology, dimension and mission status.
        </motion.p>

        {/* Filter bar */}
        <motion.div
          variants={fadeIn("up", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mb-12 flex flex-wrap justify-center gap-3 py-5"
        >
          <span className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
          <span className="pointer-events-none absolute left-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />
          <span className="pointer-events-none absolute right-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,.8)]" />
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`relative z-10 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-[0_0_18px_rgba(103,232,249,.45)]"
                  : "border-cyan-300/15 bg-[#080b18]/80 text-slate-400 backdrop-blur hover:border-cyan-300/50 hover:text-cyan-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" style={{ minHeight: 300 }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
