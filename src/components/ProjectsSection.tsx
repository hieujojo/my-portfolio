"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { textVariant, fadeIn, staggerContainer } from "@/lib/animations";

type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  category: string[];
  repo: string;
  demo: string | null;
  comingSoon: boolean;
  isNew: boolean;
};

const projects: Project[] = [
  {
    id: "interview-prep",
    title: "Interview Prep – Luyện Phỏng Vấn AI",
    image: "/images/project/interview-prep-project.png",
    description:
      "AI-powered technical interview platform featuring CV analysis, JD matching, mock interviews, code review, coding exercises, and learning progress tracking.",
    tags: ["#nextjs", "#typescript", "#tailwindcss", "#supabase", "#groq-ai"],
    category: ["Web", "AI"],
    repo: "https://github.com/hieujojo/interview-prep",
    demo: "https://interview-prep-delta-eight.vercel.app",
    comingSoon: false,
    isNew: true,
  },
  {
    id: "crm",
    title: "CRM Customer For Sales",
    image: "/images/project/crm.png",
    description:
      "CRM app with Gmail & Google Calendar OAuth 2.0 sync, Firebase realtime notifications, Kanban board (dnd-kit) with Firestore realtime sync, and Layered Architecture + SOLID backend.",
    tags: ["#nextjs", "#typescript", "#firebase", "#mongodb", "#dotnet"],
    category: ["Web", "Backend"],
    repo: "https://github.com/hieujojo/cust360web",
    demo: "https://cust360web.vercel.app",
    comingSoon: false,
    isNew: true,
  },
  {
    id: "petshop",
    title: "PetShop – E-commerce for Pet Products",
    image: "/images/project/pet.png",
    description:
      "E-commerce site for pet products with AI-powered shopping via Wit.ai chatbot, Redis caching, responsive UI, secure auth, and order processing via Nodemailer.",
    tags: ["#nextjs", "#mongodb", "#tailwind"],
    category: ["Web"],
    repo: "https://github.com/hieujojo/pet_shop_frontend",
    demo: null,
    comingSoon: false,
    isNew: false,
  },
  {
    id: "social-app",
    title: "Social App",
    image: "/images/project/project3.jpg",
    description:
      "A full-stack social media app with authentication, posting, commenting, and real-time notifications. Built with Express.js and React Native (Expo).",
    tags: ["#react-native", "#mongodb", "#nativewind"],
    category: ["Mobile", "Backend"],
    repo: "https://github.com/hieujojo/Social-App",
    demo: null,
    comingSoon: false,
    isNew: false,
  },
];

const categories = ["All", "Web", "Mobile", "Backend", "AI"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category.includes(activeCategory)
  );

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2 font-medium">
            My Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-6">
            Projects
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("up", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-400 text-center text-[16px] leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Real-world projects showcasing my skills across web, mobile, and
          backend development. Each includes links to the code repository and
          live demo where available.
        </motion.p>

        {/* Filter Bar */}
        <motion.div
          variants={fadeIn("up", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "bg-purple-900/20 border-purple-800/40 text-gray-400 hover:text-white hover:bg-purple-800/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid projects */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable
        glareMaxOpacity={0.1}
        glareColor="#a855f7"
        className="h-full"
      >
        <div className="bg-[#12101f] border border-purple-900/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-900/30 hover:border-purple-600/60 transition-all duration-300 flex flex-col relative h-full group">
          {/* Badges top-left */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            {project.isNew && (
              <span className="inline-flex items-center gap-1.5 bg-yellow-400/90 backdrop-blur text-black text-[11px] font-bold px-3 py-1 rounded-full border border-yellow-300/60 shadow-md shadow-yellow-400/30">
                ✦ New
              </span>
            )}
            {project.comingSoon && (
              <span className="inline-flex items-center gap-1.5 bg-purple-600/90 backdrop-blur text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-purple-400/40 shadow-md shadow-purple-900/40">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
                Coming Soon
              </span>
            )}
          </div>

          {/* Image */}
          <div className="relative w-full h-[220px] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                project.comingSoon ? "opacity-50 grayscale" : ""
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#12101f] via-[#12101f]/20 to-transparent" />

            {/* Hover actions overlay */}
            <div className="absolute inset-0 bg-purple-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#0a0a0f] rounded-full flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                title="View Code"
              >
                <Image
                  src="/images/github.png"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="object-contain invert"
                />
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#0a0a0f] rounded-full flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.5)] text-white text-xl font-bold"
                  title="Live Demo"
                >
                  🔗
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 relative z-20">
            <h3 className="text-white font-bold text-[20px] mb-3 group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-[14px] leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[12px] font-medium text-purple-300 bg-purple-900/30 border border-purple-700/30 px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}