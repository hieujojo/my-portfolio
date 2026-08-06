"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import RobotModel from "./canvas/RobotModel";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const sendEmail = async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send");
      return response;
    };

    toast.promise(
      sendEmail(),
      {
        loading: 'Transmitting message...',
        success: 'Transmission successful!',
        error: 'Communication link failed.',
      },
      {
        style: {
          background: '#12101f',
          color: '#fff',
          border: '1px solid rgba(168, 85, 247, 0.4)',
        },
        iconTheme: {
          primary: '#a855f7',
          secondary: '#fff',
        }
      }
    ).then(() => {
      setFormData({ name: "", email: "", message: "" });
      setTriggerAnimation(true);
      setTimeout(() => setTriggerAnimation(false), 2000);
    }).catch(() => {
      // Error handled by toast
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-12 bg-transparent relative overflow-hidden"
    >
      <Toaster position="bottom-right" />
      
      {/* Decorative nebula */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10"
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            variants={fadeIn("down", 0, 0.8)}
            className="mb-6 relative"
          >
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <Image
              src="/images/profile.png"
              alt="Profile Avatar"
              width={150}
              height={150}
              className="rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] object-cover relative z-10 border-2 border-purple-500/30"
            />
          </motion.div>

          <motion.div variants={fadeIn("up", 0.1, 0.8)}>
            <p className="text-sm uppercase tracking-widest text-cyan-300 mb-2 font-medium">
              Open Communication Channel
            </p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">Send Transmission</h2>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.2, 0.8)}
            className="text-gray-300 space-y-3 w-full max-w-lg glass px-6 py-4 rounded-xl mb-8"
          >
            <p className="flex items-center justify-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <span className="text-lg tracking-wide">0948041022</span>
            </p>
            <p className="flex items-center justify-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <a href="mailto:conghieuzc112@gmail.com" className="text-lg tracking-wide hover:text-purple-400 transition-colors">
                conghieuzc112@gmail.com
              </a>
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeIn("up", 0.3, 0.8)}
            className="relative space-y-6 bg-[#12101f]/80 backdrop-blur-md border border-purple-700/40 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-lg overflow-hidden group"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <div className="w-full h-[2px] bg-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.5)] absolute top-0 -translate-y-full group-hover:animate-[scanline_3s_linear_infinite]" />
            </div>

            <div className="relative z-10">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="peer w-full p-4 pt-6 pb-2 text-white bg-[#1a1730]/50 border-b-2 border-purple-700/30 rounded-t-lg focus:border-purple-500 focus:outline-none transition-colors placeholder-transparent"
                placeholder="Name"
                required
              />
              <label htmlFor="name" className="absolute left-4 top-2 text-xs font-semibold text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400 cursor-text pointer-events-none">
                IDENTIFICATION (NAME)
              </label>
            </div>
            
            <div className="relative z-10">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="peer w-full p-4 pt-6 pb-2 text-white bg-[#1a1730]/50 border-b-2 border-purple-700/30 rounded-t-lg focus:border-purple-500 focus:outline-none transition-colors placeholder-transparent"
                placeholder="Email"
                required
              />
              <label htmlFor="email" className="absolute left-4 top-2 text-xs font-semibold text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400 cursor-text pointer-events-none">
                RETURN FREQUENCY (EMAIL)
              </label>
            </div>
            
            <div className="relative z-10">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="peer w-full p-4 pt-6 text-white bg-[#1a1730]/50 border-b-2 border-purple-700/30 rounded-t-lg focus:border-purple-500 focus:outline-none transition-colors placeholder-transparent resize-none"
                rows={4}
                placeholder="Message"
                required
              />
              <label htmlFor="message" className="absolute left-4 top-2 text-xs font-semibold text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400 cursor-text pointer-events-none">
                TRANSMISSION DATA (MESSAGE)
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full p-4 bg-purple-600 text-white font-bold tracking-wider rounded-lg hover:bg-purple-500 transition duration-300 overflow-hidden group z-10"
              disabled={isLoading}
            >
              <span className="relative z-10">
                {isLoading ? "TRANSMITTING..." : "INITIATE TRANSMISSION"}
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-300 ease-out z-0" />
            </motion.button>
          </motion.form>
        </div>

        {/* Right Column */}
        <motion.div 
          variants={fadeIn("left", 0.4, 1)}
          className="flex-1 h-[400px] md:h-[600px] flex items-center justify-center relative"
        >
          {/* Subtle backdrop for 3D model */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent rounded-full blur-3xl" />
          <RobotModel isTyping={isTyping} animateTrigger={triggerAnimation} />
        </motion.div>
      </motion.div>
    </section>
  );
}
