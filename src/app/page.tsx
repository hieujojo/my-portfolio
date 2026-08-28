"use client";

import HomeSection from "@/components/HomeSection";
import LazySection from "@/components/LazySection";
import StarsCanvas from "@/components/canvas/Stars";

export default function Home() {
  return (
    <div className="bg-[#0a0a0f] relative w-full overflow-hidden">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>

      <main className="relative z-10 w-full">
        <HomeSection />
        <LazySection id="about" loader={() => import("@/components/AboutSection")} />
        <LazySection id="education" loader={() => import("@/components/EducationSection")} />
        <LazySection id="experience" loader={() => import("@/components/ExperienceSection")} />
        <LazySection id="skills" loader={() => import("@/components/SkillsSection")} />
        <LazySection id="projects" loader={() => import("@/components/ProjectsSection")} />
        <LazySection id="contact" loader={() => import("@/components/ContactSection")} />
      </main>
    </div>
  );
}
