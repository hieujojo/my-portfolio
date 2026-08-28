"use client";

import HomeSection from "@/components/HomeSection";
import dynamic from "next/dynamic";
import StarsCanvas from "@/components/canvas/Stars";

const AboutSection = dynamic(() => import("@/components/AboutSection"));
const EducationSection = dynamic(() => import("@/components/EducationSection"));
const ExperienceSection = dynamic(() => import("@/components/ExperienceSection"));
const SkillsSection = dynamic(() => import("@/components/SkillsSection"));
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));

export default function Home() {
  return (
    <div className="bg-[#0a0a0f] relative w-full overflow-hidden">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>

      <main className="relative z-10 w-full">
        <HomeSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
