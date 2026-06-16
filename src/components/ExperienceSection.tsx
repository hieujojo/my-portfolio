"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const experience = {
  company: "Fastdo",
  role: "Mobile Developer",
  period: "Jan 2026 – April 2026",
  logo: "/images/experience/logo.jpg",
  location: "Da Nang, Vietnam",
  about:
    "Fastdo is a Vietnamese B2B SaaS company specializing in workforce management solutions. Their platform offers tools for task management, employee attendance tracking, performance monitoring, and internal communication — helping businesses streamline operations and boost team productivity.",
  certificate: {
    label: "Certificate of Recognition – Fastdo (2026)",
    src: "/images/experience/certificate.JPEG",
  },
  responsibilities: [
    "Participated in building backend systems using .NET / RESTful APIs.",
    "Participated in developing application interfaces with React Native.",
    "Reported daily work progress and handled requests from direct managers.",
    "Worked with the team to maintain systems and proposed optimization solutions for software/systems.",
  ],
  tags: ["#react-native", "#dotnet", "#restApi", "#teamwork"],
  images: [
    "/images/experience/fastdo-1.JPEG",
    "/images/experience/fastdo-2.JPEG",
    "/images/experience/fastdo-3.jpg",
    "/images/experience/fastdo-4.JPEG",
  ],
};

export default function ExperienceSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const allImages = [...experience.images, experience.certificate.src];

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

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-900/15 blur-[120px] rounded-full pointer-events-none" />

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
            Where I've Worked
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Experience</h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#12101f] border border-purple-900/40 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 border-b border-purple-900/30">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-white/10 border border-purple-900/30 flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">{experience.company}</h3>
              <p className="text-purple-400 font-semibold text-[15px] mt-0.5">{experience.role}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-gray-400 text-[13px]">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {experience.period}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {experience.location}
                </span>
              </div>
            </div>

            {/* Certificate badge */}
            <div className="flex items-center gap-2 bg-yellow-900/20 border border-yellow-700/40 px-3 py-1.5 rounded-full shrink-0">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[12px] text-yellow-300 font-medium">Certificate of Recognition</span>
            </div>
          </div>

          {/* Body — tất cả nằm trong 1 flex-col duy nhất */}
          <div className="p-6 sm:p-8 flex flex-col gap-8">

            {/* About company */}
            <div className="bg-purple-950/10 border border-purple-900/20 rounded-xl px-5 py-4">
              <h4 className="text-white font-semibold text-[15px] mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
                About Fastdo
              </h4>
              <p className="text-gray-400 text-[13px] leading-relaxed">{experience.about}</p>
              <a
                href="https://fastdo.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-[12px] text-purple-400 hover:text-purple-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                fastdo.vn
              </a>
            </div>

            {/* Responsibilities — full width, 2 cột nội dung */}
            <div>
              <h4 className="text-white font-semibold text-[15px] mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
                Responsibilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {experience.responsibilities.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-3 text-gray-400 text-[14px] leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[12px] text-purple-400 bg-purple-900/20 border border-purple-800/40 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery + Certificate — cùng hàng */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Gallery */}
              <div>
                <h4 className="text-white font-semibold text-[15px] mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
                  Gallery
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {experience.images.map((src, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openLightbox(src)}
                      className="relative aspect-video rounded-xl overflow-hidden border border-purple-900/30 bg-[#1a1730] cursor-zoom-in group"
                    >
                      <Image
                        src={src}
                        alt={`${experience.company} photo ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                        <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm3-8H8m3-3v6" />
                        </svg>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certificate */}
              <div>
                <h4 className="text-white font-semibold text-[15px] mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-yellow-400 rounded-full inline-block" />
                  Certificate
                </h4>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => openLightbox(experience.certificate.src)}
                  className="relative w-full h-[calc(100%-2rem)] min-h-[200px] rounded-xl overflow-hidden border border-yellow-500/20 bg-[#1a1730] cursor-zoom-in group"
                >
                  <Image
                    src={experience.certificate.src}
                    alt={experience.certificate.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#12101f]/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm3-8H8m3-3v6" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[12px] text-yellow-300 font-medium">{experience.certificate.label}</span>
                  </div>
                </motion.div>
              </div>

            </div>
            {/* END Gallery + Certificate */}

          </div>
          {/* END Body */}

        </motion.div>
      </div>

      {/* Lightbox */}
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

            {/* Prev */}
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

            {/* Next */}
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

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightbox(allImages[idx]); }}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === currentIdx ? "bg-purple-400 w-4" : "bg-white/30 hover:bg-white/60 w-2"
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