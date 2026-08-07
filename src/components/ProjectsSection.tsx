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

// ── Flip Card (desktop only via CSS perspective) ───────────────────────────────
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
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      variants={fadeIn("up", index * 0.08, 0.5)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.9 }}
      className="h-full"
    >
      {/* ── Mobile: flat card (no flip) ── */}
      <div className="block sm:hidden h-full">
        <MobileCard project={project} index={index} />
      </div>

      {/* ── Desktop: 3D flip card ── */}
      <div
        className="hidden sm:block h-full"
        style={{ perspective: "1000px" }}
        onMouseEnter={() => { setFlipped(true); setHovered(true); }}
        onMouseLeave={() => { setFlipped(false); setHovered(false); }}
      >
        <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            className="relative h-full"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#080b18]/80 shadow-[0_18px_45px_rgba(8,47,73,.18)] backdrop-blur"
              style={{ backfaceVisibility: "hidden" }}
            >
              <ParticleBurst active={hovered} />
              {project.isNew && (
                <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-yellow-400/90 text-black text-[11px] font-bold px-3 py-1 rounded-full border border-yellow-300/60 animate-[scroll-bounce_2s_ease-in-out_infinite]">
                  ✦ New
                </span>
              )}
              {project.comingSoon && (
                <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-purple-600/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
                  Coming Soon
                </span>
              )}
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${project.comingSoon ? "opacity-50 grayscale" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/10 to-transparent" />
              </div>
              <div className="p-5">
                <MissionReadout project={project} index={index} />
                <h3 className="text-white font-bold text-[17px] line-clamp-2">{project.title}</h3>
                <p className="text-gray-500 text-xs mt-1 font-mono">Hover to reveal ›</p>
              </div>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 flex flex-col gap-4 overflow-hidden rounded-2xl border border-cyan-300/30 bg-[#080b18]/95 p-6 shadow-lg backdrop-blur"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <h3 className="text-white font-bold text-[16px] leading-snug">{project.title}</h3>
              {project.engine && (
                <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-200">{project.engine}</span>
                  <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-2 py-1 text-purple-200">{project.dimension}</span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-200">{project.status}</span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-2 py-1 text-cyan-100">{project.genre}</span>
                </div>
              )}
              <p className="text-gray-400 text-[13px] leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono text-purple-300 bg-purple-900/30 border border-purple-700/30 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border border-cyan-300/40 bg-cyan-300/90 py-2 text-center text-xs font-bold text-slate-950 transition-colors hover:bg-cyan-200"
                >
                  Code ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
                  >
                    Demo ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mobile flat card ───────────────────────────────────────────────────────────
function MobileCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#080b18]/80 shadow-lg backdrop-blur">
      {project.isNew && (
        <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-yellow-400/90 text-black text-[11px] font-bold px-3 py-1 rounded-full border border-yellow-300/60">
          ✦ New
        </span>
      )}
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <MissionReadout project={project} index={index} />
        <h3 className="text-white font-bold text-[17px]">{project.title}</h3>
        {project.engine && (
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-200">{project.engine}</span>
            <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-2 py-1 text-purple-200">{project.dimension}</span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-200">{project.genre}</span>
          </div>
        )}
        <p className="text-gray-400 text-[13px] leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-mono text-purple-300 bg-purple-900/30 border border-purple-700/30 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-cyan-300/40 bg-cyan-300/90 py-2 text-center text-xs font-bold text-slate-950 transition-colors hover:bg-cyan-200">
            Code ↗
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors">
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
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
          className="relative mb-14 flex flex-wrap justify-center gap-3 py-5"
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
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8" style={{ minHeight: 300 }}>
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
