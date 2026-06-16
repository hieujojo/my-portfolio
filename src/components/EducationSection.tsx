'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

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
  // Documents shown below the body
  documents: {
    certificate1: {
      label: 'Certificate of Completion',
      src: '/images/education/CERT1.JPEG', // replace with your actual path
    },
    certificate2: {
      label: 'Certificate of Excellence',
      src: '/images/education/CERT2.JPEG', // replace with your actual path
    },
    transcripts: [
      '/images/education/BANGDIEM1.JPEG', // replace with your actual paths
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

export default function EducationSection() {
  const allImages = [
  education.documents.certificate1.src,
  education.documents.certificate2.src,
  ...education.documents.transcripts,
];

  const [lightbox, setLightbox] = useState<string | null>(null);
  // When inside transcripts group, track which transcript we're on
  const [transcriptIdx, setTranscriptIdx] = useState(0);

  const openLightbox = (src: string) => setLightbox(src);
  const closeLightbox = () => setLightbox(null);

  const currentIdx = lightbox ? allImages.indexOf(lightbox) : -1;

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIdx > 0) setLightbox(allImages[currentIdx - 1]);
  };
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIdx < allImages.length - 1) setLightbox(allImages[currentIdx + 1]);
  };

  // Check if current lightbox image is one of the transcripts
  const transcriptSrcs = education.documents.transcripts;
  const isTranscript = lightbox ? transcriptSrcs.includes(lightbox) : false;
  const transcriptLocalIdx = lightbox ? transcriptSrcs.indexOf(lightbox) : -1;

  const goNextTranscript = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = transcriptLocalIdx + 1;
    if (nextIdx < transcriptSrcs.length) setLightbox(transcriptSrcs[nextIdx]);
  };
  const goPrevTranscript = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = transcriptLocalIdx - 1;
    if (prevIdx >= 0) setLightbox(transcriptSrcs[prevIdx]);
  };

  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-purple-400 mb-2">
            Where I Studied
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#12101f] border border-purple-900/40 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* ── Top bar ── */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 border-b border-purple-900/30">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-white/10 border border-purple-900/30 flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src={education.logo}
                alt={education.school}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">{education.school}</h3>
              <p className="text-purple-400 font-semibold text-[15px] mt-0.5">{education.major}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-gray-400 text-[13px]">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {education.period}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {education.location}
                </span>
              </div>
            </div>

            {/* Degree badge */}
            <div className="flex items-center gap-2 bg-purple-900/20 border border-purple-700/40 px-3 py-1.5 rounded-full shrink-0">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="text-[12px] text-purple-300 font-medium">Software Engineering</span>
            </div>
          </div>

          {/* ── Body: About ── */}
          <div className="p-6 sm:p-8 flex flex-col gap-8">
            {/* Left – description + highlights */}
            <div>
              <h4 className="text-white font-semibold text-[15px] mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
                About
              </h4>
              <p className="text-gray-400 text-[14px] leading-relaxed mb-6">
                {education.description}
              </p>

              <h4 className="text-white font-semibold text-[15px] mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
                Key Learnings
              </h4>
              <ul className="space-y-2.5">
                {education.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-center gap-3 text-gray-400 text-[14px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── Documents section ── */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-purple-900/20 pt-6">
            <h4 className="text-white font-semibold text-[15px] mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-yellow-400 rounded-full inline-block" />
              Documents
            </h4>

            {/* Grid: Certificate 1 | Transcript (2 pages) | Certificate 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Certificate 1 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex flex-col gap-2"
              >
                <span className="text-[11px] uppercase tracking-widest text-yellow-400/80 font-semibold">Certificate</span>
                <ZoomableImage
                  src={education.documents.certificate1.src}
                  alt={education.documents.certificate1.label}
                  className="relative w-full h-44 rounded-xl overflow-hidden border border-yellow-500/20 bg-[#1a1730] cursor-zoom-in"
                  onClick={() => openLightbox(education.documents.certificate1.src)}
                  motionDelay={0}
                  overlayColor="yellow"
                />
                <p className="text-[11px] text-yellow-300/70 text-center">{education.documents.certificate1.label}</p>
              </motion.div>

              {/* Certificate 2 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <span className="text-[11px] uppercase tracking-widest text-yellow-400/80 font-semibold">Certificate</span>
                <ZoomableImage
                  src={education.documents.certificate2.src}
                  alt={education.documents.certificate2.label}
                  className="relative w-full h-44 rounded-xl overflow-hidden border border-yellow-500/20 bg-[#1a1730] cursor-zoom-in"
                  onClick={() => openLightbox(education.documents.certificate2.src)}
                  motionDelay={0.15}
                  overlayColor="yellow"
                />
                <p className="text-[11px] text-yellow-300/70 text-center">{education.documents.certificate2.label}</p>
              </motion.div>

                {/* Transcripts – shows first page as thumbnail, badge shows 2 pages */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <span className="text-[11px] uppercase tracking-widest text-blue-400/80 font-semibold">Academic Transcript</span>
                <div
                  className="relative w-full h-44 rounded-xl overflow-hidden border border-blue-500/20 bg-[#1a1730] cursor-zoom-in group"
                  onClick={() => openLightbox(education.documents.transcripts[0])}
                >
                  <Image
                    src={education.documents.transcripts[0]}
                    alt="Transcript page 1"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Hover zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm3-8H8m3-3v6" />
                    </svg>
                  </div>
                  {/* "2 pages" badge */}
                  <div className="absolute top-2 right-2 bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    2 pages
                  </div>
                </div>
                <p className="text-[11px] text-blue-300/70 text-center">Click to view · use arrows for page 2</p>
              </motion.div>
            </div>
          </div>

          {/* ── Advisor / Reference ── */}
          <div className="px-6 sm:px-8 pb-8 border-t border-purple-900/20 pt-6">
            <h4 className="text-white font-semibold text-[15px] mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
              Academic Reference
            </h4>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-purple-950/30 border border-purple-800/30 rounded-xl p-4"
            >
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-purple-700/40 border border-purple-600/40 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-white font-semibold text-[15px]">{education.advisor.name}</p>
                <p className="text-purple-400 text-[13px] mt-0.5">{education.advisor.title}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {/* LinkedIn */}
                  <a
                    href={education.advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  {/* Email */}
                  <a
                    href={`mailto:${education.advisor.email}`}
                    className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {education.advisor.email}
                  </a>
                </div>
              </div>

              {/* Reference tag */}
              <div className="shrink-0 bg-purple-900/30 border border-purple-700/30 px-3 py-1 rounded-full">
                <span className="text-[11px] text-purple-300 font-medium uppercase tracking-wide">Instructor</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-100 bg-black/85 backdrop-blur-sm flex items-center justify-center px-4"
          >
            {/* Image */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-purple-900/40"
            >
              <img
                src={lightbox}
                alt="Zoomed"
                className="w-full h-full object-contain max-h-[85vh] bg-[#0a0a0f]"
              />

              {/* Transcript navigation banner (only when viewing transcripts) */}
              {isTranscript && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm py-2 px-4 flex items-center justify-between">
                  <button
                    onClick={goPrevTranscript}
                    disabled={transcriptLocalIdx === 0}
                    className="flex items-center gap-1 text-[12px] text-white/80 disabled:opacity-30 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Page {transcriptLocalIdx}
                  </button>
                  <span className="text-[12px] text-blue-300 font-medium">
                    Academic Transcript – Page {transcriptLocalIdx + 1} / {transcriptSrcs.length}
                  </span>
                  <button
                    onClick={goNextTranscript}
                    disabled={transcriptLocalIdx === transcriptSrcs.length - 1}
                    className="flex items-center gap-1 text-[12px] text-white/80 disabled:opacity-30 hover:text-white transition-colors"
                  >
                    Page {transcriptLocalIdx + 2}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-black/60 hover:bg-purple-700 border border-purple-900/40 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev (global) */}
            {currentIdx > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-purple-700 border border-purple-900/40 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next (global) */}
            {currentIdx < allImages.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-purple-700 border border-purple-900/40 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightbox(allImages[idx]); }}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === currentIdx ? 'bg-purple-400 w-4' : 'bg-white/30 hover:bg-white/60 w-2'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Reusable zoomable image card ──
function ZoomableImage({
  src,
  alt,
  className,
  onClick,
  motionDelay = 0,
  overlayColor = 'purple',
}: {
  src: string;
  alt: string;
  className: string;
  onClick: () => void;
  motionDelay?: number;
  overlayColor?: 'purple' | 'yellow';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: motionDelay }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`${className} group`}
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm3-8H8m3-3v6" />
        </svg>
      </div>
    </motion.div>
  );
}