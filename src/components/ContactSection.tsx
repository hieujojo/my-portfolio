"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import RobotModel from "./canvas/RobotModel";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setIsModalOpen(true);
        setFormData({ name: "", email: "", message: "" });
        setTriggerAnimation(true);
        setTimeout(() => setTriggerAnimation(false), 2000);
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
       <div className="flex-1 flex flex-col items-center justify-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <Image
              src="/images/profile.png"
              alt="Profile Avatar"
              width={150}
              height={150}
              className="rounded-full shadow-md object-cover"
            />
          </motion.div>

          <h2 className="text-4xl font-bold mb-6 text-white">Contact Me</h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-white space-y-3 w-full max-w-lg"
          >
            <p>
              <span className="font-bold text-blue-400">Phone:</span> 0948041022
            </p>
            <p>
              <span className="font-bold text-blue-400">Email:</span>{" "}
              <a href="mailto:conghieuzc112@gmail.com" className="hover:underline">
                conghieuzc112@gmail.com
              </a>
            </p>
            <p>
              <span className="font-bold text-blue-400">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/hieu-truong-3977"
                className="text-white hover:underline break-words"
              >
                https://www.linkedin.com/in/hieu-truong-3977
              </a>
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-10 space-y-6 bg-white/80 p-6 rounded-lg shadow-md w-full max-w-lg"
          >
            <div>
              <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                rows={5}
                placeholder="Your message here..."
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </motion.button>

            {status && !isModalOpen && (
              <p className="text-center text-gray-800 mt-2">{status}</p>
            )}
          </motion.form>

          {/* Success Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Success!</h3>
                  <p className="text-gray-600 mb-4">Your message has been sent successfully!</p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setStatus("");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column */}
        <div className="flex-1 h-[400px] md:h-[500px] flex items-center justify-center">
          <RobotModel isTyping={isTyping} animateTrigger={triggerAnimation} />
        </div>
      </div>
    </section>
  );
}
