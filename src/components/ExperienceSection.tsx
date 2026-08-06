'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const experience = {
  company: 'Fastdo',
  role: 'Mobile Developer',
  period: 'Jan 2026 – April 2026',
  logo: '/images/experience/logo.jpg',
  location: 'Da Nang, Vietnam',
  about:
    'Fastdo is a Vietnamese B2B SaaS company specializing in workforce management solutions. Their platform offers tools for task management, employee attendance tracking, performance monitoring, and internal communication — helping businesses streamline operations and boost team productivity.',
  certificate: {
    label: 'Certificate of Recognition – Fastdo (2026)',
    src: '/images/experience/certificate.JPEG',
  },
  responsibilities: [
    'Participated in building backend systems using .NET / RESTful APIs.',
    'Participated in developing application interfaces with React Native.',
    'Reported daily work progress and handled requests from direct managers.',
    'Worked with the team to maintain systems and proposed optimization solutions for software/systems.',
  ],
  tags: ['#react-native', '#dotnet', '#restApi', '#teamwork'],
  images: [
    '/images/experience/fastdo-1.JPEG',
    '/images/experience/fastdo-2.JPEG',
    '/images/experience/fastdo-3.jpg',
    '/images/experience/fastdo-4.JPEG',
  ],
};

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
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
    <section id="experience" className="relative overflow-hidden bg-transparent px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[320px] w-[650px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-[130px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div {...panelMotion} className="mb-14 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">Mission Log / 01</p>
          <h2 className="text-4xl font-black text-white sm:text-6xl">Experience</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[190px_1fr]">
          <aside className="relative hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-purple-400/20 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Career trajectory</p>
              <div className="relative mt-8 border-l border-purple-400/40 pl-5">
                <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Mission 01</p>
                <p className="mt-2 text-lg font-bold text-white">Fastdo</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{experience.period}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
                Mission complete
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <motion.article {...panelMotion} className="rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-900/25 via-white/[0.04] to-cyan-900/10 p-6 shadow-[0_24px_90px_rgba(76,29,149,0.2)] backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/30 bg-white/10 shadow-[0_0_28px_rgba(34,211,238,0.2)]">
                    <Image src={experience.logo} alt={experience.company} width={64} height={64} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Active deployment</p>
                    <h3 className="mt-1 text-3xl font-black text-white">{experience.company}</h3>
                    <p className="font-semibold text-purple-300">{experience.role}</p>
                  </div>
                </div>
                <div className="self-start rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300">Completed</div>
              </div>
              <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 text-sm text-gray-400 sm:grid-cols-2">
                <span><b className="text-gray-500">DATE //</b> {experience.period}</span>
                <span><b className="text-gray-500">BASE //</b> {experience.location}</span>
              </div>
            </motion.article>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.08 }} className="rounded-2xl border border-purple-400/15 bg-[#0d0b18]/75 p-6 backdrop-blur-xl">
                <SectionLabel label="Mission brief" color="purple" />
                <p className="mt-4 text-sm leading-7 text-gray-400">{experience.about}</p>
                <a href="https://fastdo.vn" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-semibold text-purple-300 transition-colors hover:text-cyan-300">fastdo.vn ↗</a>
              </motion.article>
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.14 }} className="rounded-2xl border border-cyan-400/15 bg-[#0d0b18]/75 p-6 backdrop-blur-xl">
                <SectionLabel label="Telemetry" color="cyan" />
                <div className="mt-5 space-y-4 text-sm">
                  <Telemetry label="Mission type" value="Software delivery" />
                  <Telemetry label="Primary systems" value="Mobile + API" />
                  <Telemetry label="Signal" value="Operational" valueClass="text-emerald-300" />
                </div>
              </motion.article>
            </div>

            <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.2 }} className="rounded-2xl border border-purple-400/15 bg-[#0d0b18]/75 p-6 backdrop-blur-xl sm:p-8">
              <SectionLabel label="Mission objectives" color="purple" />
              <ul className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
                {experience.responsibilities.map((item, index) => (
                  <motion.li key={item} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-3 text-sm leading-6 text-gray-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {experience.tags.map((tag) => <span key={tag} className="rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-200">{tag}</span>)}
              </div>
            </motion.article>

            <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.26 }} className="rounded-2xl border border-purple-400/15 bg-[#0d0b18]/75 p-6 backdrop-blur-xl">
                <SectionLabel label="Evidence log" color="purple" />
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {experience.images.map((src, index) => <EvidenceImage key={src} src={src} alt={`${experience.company} evidence ${index + 1}`} onClick={() => setLightbox(src)} />)}
                </div>
              </motion.article>
              <motion.article {...panelMotion} transition={{ duration: 0.55, delay: 0.32 }} className="rounded-2xl border border-yellow-400/20 bg-[#0d0b18]/75 p-6 backdrop-blur-xl">
                <SectionLabel label="Mission clearance" color="yellow" />
                <button onClick={() => setLightbox(experience.certificate.src)} className="group relative mt-5 block aspect-[4/3] w-full overflow-hidden rounded-xl border border-yellow-400/20 bg-black/20 text-left">
                  <Image src={experience.certificate.src} alt={experience.certificate.label} fill sizes="(max-width: 1024px) 90vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs font-semibold text-yellow-200">{experience.certificate.label}</span>
                </button>
              </motion.article>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && <motion.div key="experience-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(event) => event.stopPropagation()} className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-purple-400/30 bg-[#0a0a0f]">
            <Image src={lightbox} alt="Experience document" fill sizes="90vw" className="object-contain" />
          </motion.div>
          <button onClick={() => setLightbox(null)} className="absolute right-5 top-5 text-3xl text-white">×</button>
          {currentIdx > 0 && <button onClick={() => moveLightbox(-1)} className="absolute left-5 text-4xl text-white">‹</button>}
          {currentIdx < allImages.length - 1 && <button onClick={() => moveLightbox(1)} className="absolute right-5 text-4xl text-white">›</button>}
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

function SectionLabel({ label, color }: { label: string; color: 'purple' | 'cyan' | 'yellow' }) {
  const colors = { purple: 'bg-purple-400', cyan: 'bg-cyan-300', yellow: 'bg-yellow-400' };
  return <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white"><span className={`h-5 w-1 rounded-full ${colors[color]}`} />{label}</h4>;
}

function Telemetry({ label, value, valueClass = 'text-purple-200' }: { label: string; value: string; valueClass?: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"><span className="text-gray-500">{label}</span><span className={`text-right font-semibold ${valueClass}`}>{value}</span></div>;
}

function EvidenceImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return <button onClick={onClick} className="group relative aspect-video overflow-hidden rounded-xl border border-purple-400/15 bg-black/20"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 45vw, 420px" className="object-cover transition-transform duration-500 group-hover:scale-110" /><span className="absolute inset-0 bg-purple-950/0 transition-colors group-hover:bg-purple-950/35" /></button>;
}
