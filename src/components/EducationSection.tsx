'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import StarsCanvas from './canvas/Stars';

// ── Data ──────────────────────────────────────────────────────────────────────
const education = {
  school: 'VTC Academy',
  location: 'Da Nang, Vietnam',
  major: 'Software Engineering',
  period: 'Sep 2022 – Dec 2025',
  logo: '/images/education/EDUCATIONLOGO.png',
  description:
    'Studied Software Engineering with a focus on full-stack web development, mobile applications, and software architecture. Gained solid foundations in algorithms, database design, and modern development workflows.',
  highlights: [
    'Full-stack web & mobile development',
    'Software architecture & design patterns',
    'Database design (SQL & NoSQL)',
    'Team collaboration & Agile workflow',
  ],
  documents: {
    certificate1: {
      label: 'Certificate of Completion',
      src: '/images/education/CERT1.JPEG',
    },
    certificate2: {
      label: 'Certificate of Excellence',
      src: '/images/education/CERT2.JPEG',
    },
    transcripts: [
      '/images/education/BANGDIEM1.JPEG',
      '/images/education/BANGDIEM2.JPEG',
    ],
  },
  advisor: {
    name: 'Võ Công Đình',
    title: 'Academic Advisor & Instructor',
    linkedin: 'https://www.linkedin.com/in/%C4%91%C3%ACnh-v%C3%B5-c%C3%B4ng-884062390/',
    email: 'dinhvcvn@gmail.com',
  },
};

// ── Star chart milestones — lấy từ data education thật ────────────────────────
const milestones = [
  { id: 'enrolled', label: 'Enrolled', year: '2022', angle: -90, radius: 130 },
  { id: 'core', label: 'Core Curriculum', year: '2023', angle: 30, radius: 140 },
  { id: 'capstone', label: 'Capstone Project', year: '2024', angle: 150, radius: 125 },
  { id: 'graduated', label: 'Graduated', year: '2025', angle: 210, radius: 135 },
];

// ── Constellation Chart (SVG) ─────────────────────────────────────────────────
function ConstellationChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const cx = 200; // SVG centre x
  const cy = 200; // SVG centre y

  // Convert polar → cartesian
  const toXY = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const milestonePoints = milestones.map((m) => ({ ...m, ...toXY(m.angle, m.radius) }));

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[380px] mx-auto overflow-visible"
        aria-label="Star chart constellation for VTC Academy"
      >
        {/* ── Decorative grid rings ── */}
        {[60, 110, 160].map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(168,85,247,0.08)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}

        {/* ── Connection lines (drawn with pathLength animation) ── */}
        {milestonePoints.map((m) => (
          <motion.line
            key={`line-${m.id}`}
            x1={cx}
            y1={cy}
            x2={m.x}
            y2={m.y}
            stroke="rgba(168,85,247,0.35)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          />
        ))}

        {/* ── Milestone stars ── */}
        {milestonePoints.map((m, i) => (
          <g key={m.id}>
            {/* Outer glow ring */}
            <motion.circle
              cx={m.x}
              cy={m.y}
              r={10}
              fill="none"
              stroke="rgba(168,85,247,0.4)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
            />
            {/* Star dot */}
            <motion.circle
              cx={m.x}
              cy={m.y}
              r={5}
              fill="#a855f7"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: [0, 1, 0.7, 1] } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
            />
            {/* Label */}
            <motion.text
              x={m.x + (m.x > cx ? 14 : -14)}
              y={m.y + (m.y > cy ? 14 : -8)}
              fill="#c4b5fd"
              fontSize="10"
              fontFamily="'Courier New', monospace"
              textAnchor={m.x > cx ? 'start' : 'end'}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
            >
              {m.label}
            </motion.text>
            <motion.text
              x={m.x + (m.x > cx ? 14 : -14)}
              y={m.y + (m.y > cy ? 26 : 4)}
              fill="rgba(196,181,253,0.5)"
              fontSize="8"
              fontFamily="'Courier New', monospace"
              textAnchor={m.x > cx ? 'start' : 'end'}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
            >
              {m.year}
            </motion.text>
          </g>
        ))}

        {/* ── Central star (school) ── */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={22}
          fill="none"
          stroke="rgba(255,233,184,0.2)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={14}
          fill="rgba(255,233,184,0.12)"
          stroke="#ffe9b8"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            inView
              ? {
                  scale: 1,
                  opacity: [0, 1, 0.85, 1],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: 0.15 }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#ffe9b8"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* School name below centre */}
        <motion.text
          x={cx}
          y={cy + 36}
          fill="#fff"
          fontSize="11"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {education.school}
        </motion.text>

        {/* ── Decorative coordinate labels ── */}
        <text x="8" y="18" fill="rgba(168,85,247,0.4)" fontSize="7" fontFamily="monospace">
          RA 06h 45m 08s
        </text>
        <text x="8" y="28" fill="rgba(168,85,247,0.4)" fontSize="7" fontFamily="monospace">
          DEC -16° 42&apos; 58&quot;
        </text>
        <text x="280" y="390" fill="rgba(168,85,247,0.4)" fontSize="7" fontFamily="monospace">
          RA 22h 29m 10s
        </text>
        <text x="280" y="380" fill="rgba(168,85,247,0.4)" fontSize="7" fontFamily="monospace">
          DEC -20° 50&apos; 13&quot;
        </text>

        {/* ── Magnitude legend ── */}
        <circle cx="12" cy="388" r="5" fill="#ffe9b8" />
        <text x="22" y="392" fill="rgba(255,233,184,0.6)" fontSize="7" fontFamily="monospace">
          mag 0 — School
        </text>
        <circle cx="12" cy="376" r="3" fill="#a855f7" />
        <text x="22" y="380" fill="rgba(168,85,247,0.6)" fontSize="7" fontFamily="monospace">
          mag 3 — Milestone
        </text>
      </svg>
    </div>
  );
}

// ── Round document frame (star-chart classic style) ───────────────────────────
function StarChartFrame({
  src,
  alt,
  label,
  onClick,
  delay = 0,
}: {
  src: string;
  alt: string;
  label: string;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex flex-col items-center gap-3 cursor-zoom-in"
    >
      {/* Circular frame */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-purple-500/40 shadow-[0_0_24px_rgba(168,85,247,0.3)] group-hover:border-purple-400/70 group-hover:shadow-[0_0_36px_rgba(168,85,247,0.5)] transition-all duration-300">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-colors duration-300 flex items-center justify-center">
          <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
      </div>
      {/* N/E/S/W compass marks */}
      {(['N', 'E', 'S', 'W'] as const).map((dir, i) => {
        const angles = [-90, 0, 90, 180];
        const r = 58;
        const rad = (angles[i] * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <span
            key={dir}
            className="absolute text-[8px] font-mono text-purple-400/60 pointer-events-none select-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%,-50%)',
            }}
          >
            {dir}
          </span>
        );
      })}
      <p className="text-[11px] text-purple-300/70 text-center max-w-[9rem] font-mono">{label}</p>
    </motion.button>
  );
}

// ── Guide Star card (Academic Reference) ─────────────────────────────────────
function GuideStarCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-purple-800/30 bg-purple-950/30 p-4"
    >
      {/* 4-point star icon via clip-path */}
      <div className="relative shrink-0 w-12 h-12 flex items-center justify-center">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md animate-[nebula-pulse_3s_ease-in-out_infinite]" />
        <div
          className="relative w-10 h-10 bg-gradient-to-br from-yellow-300 via-yellow-200 to-white shadow-[0_0_16px_rgba(253,224,71,0.7)]"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        />
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold text-[15px]">{education.advisor.name}</p>
        <p className="text-purple-400 text-[13px] mt-0.5">{education.advisor.title}</p>
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href={education.advisor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={`mailto:${education.advisor.email}`}
            className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-purple-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {education.advisor.email}
          </a>
        </div>
      </div>
      <div className="shrink-0 rounded-full border border-yellow-500/30 bg-yellow-400/10 px-3 py-1">
        <span className="text-[11px] text-yellow-300 font-medium uppercase tracking-wide font-mono">Guide Star</span>
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function EducationSection() {
  const allImages = [
    education.documents.certificate1.src,
    education.documents.certificate2.src,
    ...education.documents.transcripts,
  ];

  const [lightbox, setLightbox] = useState<string | null>(null);
  const openLightbox = (src: string) => setLightbox(src);
  const closeLightbox = () => setLightbox(null);

  const currentIdx = lightbox ? allImages.indexOf(lightbox) : -1;
  const goPrev = (e: React.MouseEvent) => { e.stopPropagation(); if (currentIdx > 0) setLightbox(allImages[currentIdx - 1]); };
  const goNext = (e: React.MouseEvent) => { e.stopPropagation(); if (currentIdx < allImages.length - 1) setLightbox(allImages[currentIdx + 1]); };

  const transcriptSrcs = education.documents.transcripts;
  const isTranscript = lightbox ? transcriptSrcs.includes(lightbox) : false;
  const transcriptLocalIdx = lightbox ? transcriptSrcs.indexOf(lightbox) : -1;

  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <StarsCanvas />
      </div>

      {/* Background nebula glows */}
       <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-900/15 blur-[120px] rounded-full pointer-events-none nebula-glow z-0" />
       <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-cyan-300 mb-2 font-medium font-mono">
             Academic Coordinates
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            Education
          </h2>
        </motion.div>

        {/* ── Main layout: Star chart + Info ── */}
        <div className="grid gap-10 lg:grid-cols-[400px_1fr] items-start mb-12">

          {/* Left — Constellation chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
             className="rounded-3xl border border-cyan-300/20 bg-[#080b18]/75 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(8,47,73,0.15)]"
          >
             <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/70 mb-4">
              Constellation Navigator — {education.school}
            </p>
            <ConstellationChart />
          </motion.div>

          {/* Right — Info cards */}
          <div className="flex flex-col gap-6">

            {/* Academic Profile (glassmorphism) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
               className="rounded-2xl border border-cyan-300/15 bg-[#080b18]/75 backdrop-blur-md p-6"
            >
              {/* Top bar */}
              <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-white/10 pb-5 mb-5">
                 <div className="w-16 h-16 rounded-xl bg-white/10 border border-cyan-300/20 flex items-center justify-center shrink-0 overflow-hidden">
                  <Image src={education.logo} alt={education.school} width={56} height={32} className="object-contain" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white">{education.school}</h3>
              <p className="text-cyan-300 font-semibold text-sm mt-0.5">{education.major}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-1.5 text-gray-400 text-xs font-mono">
                    <span>{education.period}</span>
                    <span>{education.location}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 font-mono">
                  Completed
                </span>
              </div>

              {/* Academic Profile data */}
               <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 font-mono">Learning Telemetry</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Status', value: 'Completed', cls: 'text-emerald-300' },
                     { label: 'Focus', value: 'Software Engineering', cls: 'text-cyan-200' },
                    { label: 'Period', value: education.period, cls: 'text-gray-300' },
                    { label: 'Location', value: education.location, cls: 'text-gray-300' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-500">{row.label}</span>
                      <span className={`text-right font-semibold ${row.cls}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-[11px] uppercase tracking-widest text-cyan-300/70 font-mono mb-3">Core Learnings</p>
                  <ul className="space-y-2">
                    {education.highlights.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        className="flex items-start gap-2 text-gray-400 text-[13px]"
                      >
                         <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
               className="rounded-2xl border border-cyan-300/15 bg-[#080b18]/75 backdrop-blur-md p-5"
            >
               <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300 mb-3">Learning Transmission</p>
              <p className="text-gray-400 text-sm leading-relaxed">{education.description}</p>
            </motion.div>
          </div>
        </div>

        {/* ── Documents (circular star-chart frames) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
           className="rounded-2xl border border-cyan-300/15 bg-[#080b18]/75 backdrop-blur-md p-6 sm:p-8 mb-8"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-yellow-400/80 mb-6">
             Credential Archive
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-8">
            <StarChartFrame
              src={education.documents.certificate1.src}
              alt={education.documents.certificate1.label}
              label={education.documents.certificate1.label}
              onClick={() => openLightbox(education.documents.certificate1.src)}
              delay={0}
            />
            <StarChartFrame
              src={education.documents.certificate2.src}
              alt={education.documents.certificate2.label}
              label={education.documents.certificate2.label}
              onClick={() => openLightbox(education.documents.certificate2.src)}
              delay={0.1}
            />
            <StarChartFrame
              src={education.documents.transcripts[0]}
              alt="Academic Transcript"
              label={`Academic Transcript (${transcriptSrcs.length} pages)`}
              onClick={() => openLightbox(education.documents.transcripts[0])}
              delay={0.2}
            />
          </div>
        </motion.div>

        {/* ── Guide Star (Advisor) ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6">
         <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300 mb-4">Guide Star</p>
          <GuideStarCard />
        </div>
      </div>

      {/* ── Lightbox (unchanged mechanism) ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-purple-900/40 bg-[#0a0a0f]"
            >
              <Image
                src={lightbox}
                alt="Zoomed"
                fill
                sizes="(max-width: 768px) 92vw, 1024px"
                className="object-contain"
              />

              {/* Transcript nav banner */}
              {isTranscript && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm py-2 px-4 flex items-center justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); if (transcriptLocalIdx > 0) setLightbox(transcriptSrcs[transcriptLocalIdx - 1]); }}
                    disabled={transcriptLocalIdx === 0}
                    className="text-[12px] text-white/80 disabled:opacity-30 hover:text-white transition-colors"
                  >
                    ‹ Page {transcriptLocalIdx}
                  </button>
                  <span className="text-[12px] text-blue-300 font-mono">
                    Transcript — Page {transcriptLocalIdx + 1} / {transcriptSrcs.length}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); if (transcriptLocalIdx < transcriptSrcs.length - 1) setLightbox(transcriptSrcs[transcriptLocalIdx + 1]); }}
                    disabled={transcriptLocalIdx === transcriptSrcs.length - 1}
                    className="text-[12px] text-white/80 disabled:opacity-30 hover:text-white transition-colors"
                  >
                    Page {transcriptLocalIdx + 2} ›
                  </button>
                </div>
              )}
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-black/60 hover:bg-purple-700 border border-purple-900/40 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {currentIdx > 0 && (
              <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-purple-700 border border-purple-900/40 rounded-full flex items-center justify-center text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {currentIdx < allImages.length - 1 && (
              <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-purple-700 border border-purple-900/40 rounded-full flex items-center justify-center text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightbox(allImages[idx]); }}
                  className={`h-2 rounded-full transition-all duration-200 ${idx === currentIdx ? 'bg-purple-400 w-4' : 'bg-white/30 hover:bg-white/60 w-2'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
