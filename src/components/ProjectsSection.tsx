"use client";

import { motion, Transition } from "framer-motion";
import Image from "next/image";

const styles = {
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  padding: "sm:p-16 xs:p-8 p-6",
};

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
    transition: { type: "spring", delay, duration, ease: "easeOut" } as Transition,
  },
});

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-800 to-black relative overflow-hidden"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234B0082' fill-opacity='0.2' d='M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,138.7C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10 md:ml-[152px] mt-16">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My work</p>
          <h2 className={styles.sectionHeadText}>Projects</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("up", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mb-14"
        >
          Following projects showcases my skills and experience through real-world examples of my work. Each project is
          briefly described with links to code repositories and live demos in it. It reflects my ability to solve
          complex problems, work with different technologies, and manage projects effectively.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Project Card Component (reused) */}
          {[
            {
              title: "PetShop - E-commerce Website for Pet Products",
              image: "/images/pet.png",
              description:
                "E-commerce site for pet products with AI-powered shopping via Wit.ai chatbot, Redis caching, responsive UI , secure auth , and order processing via Nodemailer.",
              tags: ["#nextjs", "#mongodb", "#tailwind"],
              repo: "https://github.com/hieujojo/pet_shop_frontend",
            },
            {
              title: "Restaurant Website",
              image: "/images/restaurant.png",
              description:
                "A modern restaurant web app offering a seamless experience for browsing menus, exploring dish details, and reading engaging blogs to elevate the dining experience.",
              tags: ["#nextjs", "#mongodb", "#tailwind"],
              repo: "https://github.com/hieujojo/Restaurant",
            },
            {
              title: "Social App",
              image: "/images/project3.jpg",
              description:
                "A full-stack social media app with core features like authentication, posting, commenting, and real-time notifications. Built with Express.js and React Native (Expo).",
              tags: ["#react native", "#mongodb", "#nativewind"],
              repo: "https://github.com/hieujojo/Social-App",
            },
          ].map((project, i) => (
            <motion.div
              key={i}
              className="bg-[#151030] p-5 rounded-2xl sm:w-[360px] w-full fromLinkFiber94"
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-[230px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={360}
                  height={230}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                  <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/images/github.png"
                        alt="source code"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="text-white font-bold text-[24px]">{project.title}</h3>
                <p className="mt-2 text-secondary text-[14px]">{project.description}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <p key={idx} className="text-[14px] blue-text-gradient">
                    {tag}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
