"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import { motion, Transition } from "framer-motion";

const styles = {
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  padding: "sm:p-16 xs:p-8 p-6",
};

const services = [
  { title: "Web Developer", icon: "../web.png" },
  { title: "React Native Developer", icon: "../mobile.png" },
  { title: "Backend Developer", icon: "../backend.png" },
  { title: "Full Stack Developer", icon: "../creator.png" },
];

// animation variants
const textVariant = (delay: number = 0) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      duration: 1.25,
      delay,
    } as Transition,
  },
});

const fadeIn = (
  direction: "left" | "right" | "up" | "down",
  delay: number,
  duration: number
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
      type: "spring" as const,
      delay,
      duration,
      ease: "easeOut",
    } as Transition,
  },
});

const staggerContainer = (staggerChildren: number, delayChildren: number = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Section Wrapper HOC
const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

// Card
interface ServiceCardProps {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ index, title, icon }) => (
  <Tilt className="w-full sm:w-[250px]">
    <motion.div
      variants={fadeIn("right", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-[#151030] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

// About Section
const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("up", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a passionate fresher software developer with experience in
        JavaScript and TypeScript, especially working with frameworks like
        React, React Native, and Next.js. I'm a fast learner who enjoys solving
        real-world problems and collaborating with others to build responsive,
        user-friendly web and mobile applications. I'm excited to keep improving
        and contribute to meaningful projects. Let’s build something great
        together!
      </motion.p>

      <motion.div className="w-full p-[1px] rounded-[20px] shadow-card">
        <div className="mt-20 flex flex-wrap gap-6 justify-center md:justify-evenly items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
