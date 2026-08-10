'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { fadeIn, staggerContainer } from '@/lib/animations';

const experience = {
  company: 'Fastdo',
  role: 'Mobile Developer',
  period: 'Jan 2026 – April 2026',
  logo: '/images/experience/logo.jpg',
  location: 'Da Nang, Vietnam',
  about: 'Fastdo is a Vietnamese B2B SaaS company specializing in workforce management solutions. Their platform offers tools for task management, employee attendance tracking, performance monitoring, and internal communication — helping businesses streamline operations and boost team productivity.',
  certificate: { label: 'Certificate of Recognition – Fastdo (2026)', src: '/images/experience/certificate.JPEG' },
  responsibilities: [
    'Participated in building backend systems using .NET / RESTful APIs.',
    'Participated in developing application interfaces with React Native.',
    'Reported daily work progress and handled requests from direct managers.',
    'Worked with the team to maintain systems and proposed optimization solutions for software/systems.',
  ],
  tags: ['#react-native', '#dotnet', '#restApi', '#teamwork'],
  images: ['/images/experience/fastdo-1.JPEG', '/images/experience/fastdo-2.JPEG', '/images/experience/fastdo-3.jpg', '/images/experience/fastdo-4.JPEG'],
};

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.55 },
};

export default function ExperienceSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const allImages = [...experience.images, experience.certificate.src];
  const currentIdx = lightbox ? allImages.indexOf(lightbox) : -1;

  const moveLightbox = (delta: number) => {
    if (currentIdx < 0) return;
    const next = currentIdx + delta;
    if (next >= 0 && next < allImages.length) setLightbox(allImages[next]);
  };

  return (
    <section id="experience" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute left-1/2 top-12 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[140px]" />
      <motion.div {...panelMotion} className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-14 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-cyan-300">Orbital mission archive / 01</p>
          <h2 className="mt-3 text-4xl font-black text-white sm:text-6xl">Experience</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">A recorded deployment log of systems built, signals monitored, and missions completed.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
          <aside className="relative hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-cyan-300/15 bg-[#080b18]/75 p-5 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Flight recorder</p>
              <div className="relative mt-8 space-y-8 border-l border-cyan-300/30 pl-5">
                <div className="relative"><span className="absolute -left-[26px] top-0 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,.9)]" /><p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">Mission 01</p><p className="mt-2 font-bold text-white">{experience.company}</p><p className="mt-1 font-mono text-[10px] text-slate-500">{experience.period}</p></div>
                <div className="relative"><span className="absolute -left-[25px] top-0 h-2 w-2 rounded-full bg-purple-400" /><p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Status</p><p className="mt-2 text-sm font-bold text-emerald-300">Completed</p></div>
              </div>
              <div className="mt-10 border-t border-cyan-300/10 pt-4 font-mono text-[10px] uppercase tracking-wider text-slate-500"><p>Sector: Mobile / API</p><p className="mt-2 text-cyan-300">Signal: Archived</p></div>
            </div>
          </aside>

          <div className="space-y-6">
            <motion.article {...panelMotion} className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#080b18]/80 p-6 shadow-[0_0_70px_rgba(34,211,238,.06)] backdrop-blur-xl sm:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/[0.06] blur-3xl" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/30 bg-white/10"><Image src={experience.logo} alt={experience.company} width={64} height={64} className="object-contain" /></div>
                  <div><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Deployment record</p><h3 className="mt-1 text-3xl font-black text-white">{experience.company}</h3><p className="font-semibold text-cyan-200">{experience.role}</p></div>
                </div>
                <div className="flex items-center gap-2 self-start rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Mission completed</div>
              </div>
              <div className="relative mt-7 grid gap-3 border-t border-cyan-300/10 pt-5 font-mono text-xs text-slate-400 sm:grid-cols-2"><span><b className="text-slate-500">DATE //</b> {experience.period}</span><span><b className="text-slate-500">BASE //</b> {experience.location}</span></div>
            </motion.article>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.08 }} className="rounded-3xl border border-cyan-300/15 bg-[#080b18]/75 p-6 backdrop-blur-xl"><SectionLabel label="Mission brief" /><p className="mt-4 text-sm leading-7 text-slate-400">{experience.about}</p><a href="https://fastdo.vn" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-white">Open company signal ↗</a></motion.article>
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.14 }} className="rounded-3xl border border-purple-400/15 bg-[#080b18]/75 p-6 backdrop-blur-xl"><SectionLabel label="Telemetry" accent="purple" /><div className="mt-5 space-y-4"><Telemetry label="Mission type" value="Software delivery" /><Telemetry label="Primary systems" value="Mobile + API" /><Telemetry label="Signal" value="Operational" valueClass="text-emerald-300" /></div></motion.article>
            </div>

            <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.2 }} className="rounded-3xl border border-cyan-300/15 bg-[#080b18]/75 p-6 backdrop-blur-xl sm:p-8">
              <SectionLabel label="Mission objectives" />
              <motion.ul variants={staggerContainer(0.08, 0.3)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">{experience.responsibilities.map((item, index) => <motion.li key={item} variants={fadeIn('left', index * 0.06, 0.5)} className="flex gap-3 text-sm leading-6 text-slate-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,.8)]" />{item}</motion.li>)}</motion.ul>
              <div className="mt-7 flex flex-wrap gap-2 border-t border-cyan-300/10 pt-5">{experience.tags.map((tag) => <span key={tag} className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.04] px-3 py-1 font-mono text-xs text-cyan-200">{tag}</span>)}</div>
            </motion.article>

            <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.26 }} className="rounded-3xl border border-cyan-300/15 bg-[#080b18]/75 p-6 backdrop-blur-xl"><SectionLabel label="Evidence log" /><motion.div className="mt-5 grid grid-cols-2 gap-3" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1}>{experience.images.map((src, index) => <EvidenceImage key={src} src={src} alt={`${experience.company} evidence ${index + 1}`} onClick={() => setLightbox(src)} />)}</motion.div></motion.article>
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.32 }} className="rounded-3xl border border-yellow-300/20 bg-[#080b18]/75 p-6 backdrop-blur-xl"><SectionLabel label="Mission clearance" accent="yellow" /><button onClick={() => setLightbox(experience.certificate.src)} className="group relative mt-5 block aspect-[4/3] w-full overflow-hidden rounded-xl border border-yellow-300/20 bg-black/20 text-left"><Image src={experience.certificate.src} alt={experience.certificate.label} fill sizes="(max-width: 1024px) 90vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 font-mono text-xs font-semibold text-yellow-200">{experience.certificate.label}</span></button></motion.article>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>{lightbox && <motion.div key="experience-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(event) => event.stopPropagation()} className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-cyan-300/30 bg-[#080b18]"><Image src={lightbox} alt="Experience document" fill sizes="90vw" className="object-contain" /></motion.div><button onClick={() => setLightbox(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-black/60 text-white transition-colors hover:bg-cyan-500/30">×</button>{currentIdx > 0 && <button onClick={() => moveLightbox(-1)} className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/30 bg-black/60 text-white hover:bg-cyan-500/30">‹</button>}{currentIdx < allImages.length - 1 && <button onClick={() => moveLightbox(1)} className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/30 bg-black/60 text-white hover:bg-cyan-500/30">›</button>}</motion.div>}</AnimatePresence>
    </section>
  );
}

function SectionLabel({ label, accent = 'cyan' }: { label: string; accent?: 'cyan' | 'purple' | 'yellow' }) {
  const colors = { cyan: 'bg-cyan-300', purple: 'bg-purple-400', yellow: 'bg-yellow-300' };
  return <h4 className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white"><span className={`h-5 w-1 rounded-full ${colors[accent]}`} />{label}</h4>;
}

function Telemetry({ label, value, valueClass = 'text-cyan-200' }: { label: string; value: string; valueClass?: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-cyan-300/10 pb-3 last:border-0 last:pb-0"><span className="font-mono text-xs uppercase tracking-widest text-slate-500">{label}</span><span className={`text-right text-sm font-semibold ${valueClass}`}>{value}</span></div>;
}

function EvidenceImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return <motion.button onClick={onClick} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="group relative aspect-video overflow-hidden rounded-xl border border-cyan-300/15 bg-black/20"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 45vw, 420px" className="object-cover transition-transform duration-500 group-hover:scale-110" /><span className="absolute inset-0 bg-cyan-950/0 transition-colors group-hover:bg-cyan-950/35" /></motion.button>;
}
