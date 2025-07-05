'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setIsModalOpen(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error occurred.');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStatus('');
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-7xl mx-auto">
        {/* Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/images/profile.png"
            alt="Profile Avatar"
            width={150}
            height={150}
            className="rounded-full shadow-md object-cover object-center"
          />
        </motion.div>

        <h2 className="text-3xl font-bold text-center mb-8 text-white">Contact Me</h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="text-center mb-8 space-y-2"
        >
          <p className="text-lg sm:mr-[305px]"><span className="font-bold">Phone:</span> 0948041022</p>
          <p className="text-lg sm:mr-[194px]"><span className="font-bold">Email:</span> conghieuzc112@gmail.com</p>
          <p className="text-lg"><span className="font-bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/hieu-truong-3977" className="text-white hover:underline">https://www.linkedin.com/in/hieu-truong-3977</a></p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto space-y-6 bg-white/80 p-6 rounded-lg shadow-md"
        >
          <div>
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            {isLoading ? 'Sending...' : 'Send Message'}
          </motion.button>
          {status && !isModalOpen && <p className="text-center text-gray-800 mt-2">{status}</p>}
        </motion.form>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg w-full text-center"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Success!</h3>
                <p className="text-gray-600 mb-4">Your message has been sent successfully!</p>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}