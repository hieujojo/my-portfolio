"use client";

import { motion, Transition } from "framer-motion";
import Image from "next/image";

const textVariant = (delay: number = 0) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay } as Transition,
  },
});

const fadeIn = (
  direction: "left" | "right" | "up" | "down",
  delay: number,
  duration: number,
) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay,
      duration,
      ease: "easeOut",
    } as Transition,
  },
});

const projects = [
  {
    title: "Interview Prep – Luyện Phỏng Vấn AI",
    image: "/images/project/interview-prep-project.png",
    description:
      "AI-powered technical interview platform featuring CV analysis, JD matching, mock interviews, code review, coding exercises, and learning progress tracking.",
    tags: ["#nextjs", "#typescript", "#tailwindcss", "#supabase", "#groq-ai"],
    repo: "https://github.com/hieujojo/interview-prep",
    demo: "https://interview-prep-delta-eight.vercel.app",
    comingSoon: false,
    isNew: true,
  },
  {
    title: "CRM Customer For Sales",
    image: "/images/project/crm.png",
    description:
      "CRM app with Gmail & Google Calendar OAuth 2.0 sync, Firebase realtime notifications, Kanban board (dnd-kit) with Firestore realtime sync, and Layered Architecture + SOLID backend.",
    tags: ["#nextjs", "#typescript", "#firebase", "#mongodb", "#dotnet"],
    repo: "https://github.com/hieujojo/cust360web",
    demo: "https://cust360web.vercel.app",
    comingSoon: false,
    isNew: true,
  },
  {
    title: "PetShop – E-commerce for Pet Products",
    image: "/images/project/pet.png",
    description:
      "E-commerce site for pet products with AI-powered shopping via Wit.ai chatbot, Redis caching, responsive UI, secure auth, and order processing via Nodemailer.",
    tags: ["#nextjs", "#mongodb", "#tailwind"],
    repo: "https://github.com/hieujojo/pet_shop_frontend",
    demo: null,
    comingSoon: false,
    isNew: false,
  },
  {
    title: "Restaurant Website",
    image: "/images/project/restaurant.png",
    description:
      "A modern restaurant web app for browsing menus, exploring dish details, and reading engaging blogs to elevate the dining experience.",
    tags: ["#nextjs", "#mongodb", "#tailwind"],
    repo: "https://github.com/hieujojo/Restaurant",
    demo: null,
    comingSoon: false,
    isNew: false,
  },
  {
    title: "Social App",
    image: "/images/project/project3.jpg",
    description:
      "A full-stack social media app with authentication, posting, commenting, and real-time notifications. Built with Express.js and React Native (Expo).",
    tags: ["#react-native", "#mongodb", "#nativewind"],
    repo: "https://github.com/hieujojo/Social-App",
    demo: null,
    comingSoon: false,
    isNew: false,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative overflow-hidden"
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
          <p className="text-sm uppercase tracking-widest text-purple-400 text-center mb-2">
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
          className="text-gray-400 text-center text-[16px] leading-relaxed max-w-2xl mx-auto mb-14"
        >
          Real-world projects showcasing my skills across web, mobile, and
          backend development. Each includes links to the code repository and
          live demo where available.
        </motion.p>

        {/* First 4 projects: 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
          {projects.slice(0, 4).map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        {/* 5th project: centered */}
        <div className="max-w-5xl mx-auto flex justify-center">
          <div className="w-full sm:w-[calc(50%-16px)]">
            <ProjectCard project={projects[4]} index={4} />
          </div>
        </div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  image: string;
  description: string;
  tags: string[];
  repo: string;
  demo: string | null;
  comingSoon: boolean;
  isNew: boolean;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-[#12101f] border border-purple-900/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-900/30 hover:border-purple-600/60 transition-all duration-300 flex flex-col relative h-full"
    >
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
      <div className="relative w-full h-[200px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-300 ${project.comingSoon ? "opacity-50 grayscale" : ""}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#12101f] via-transparent to-transparent" />

        {/* GitHub & Demo icons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-purple-700/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-purple-600 transition border border-purple-500/40"
          >
            <Image
              src="/images/github.png"
              alt="GitHub"
              width={20}
              height={20}
              className="object-contain invert"
            />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-purple-700/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-purple-600 transition border border-purple-500/40 text-white text-xs font-bold"
            >
              🔗
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-[18px] mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-[14px] leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[12px] text-purple-400 bg-purple-900/20 border border-purple-800/40 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}