'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Projects
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 100, rotate: 5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* PetShop - E-commerce Website for Pet Products */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-black font-semibold mb-2">
              PetShop - E-commerce Website for Pet Products
            </h3>
            <p className="text-gray-800 mb-1">
              <span className="font-bold">Position:</span> Front-End Developer {" "}
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-bold">Technologies:</span> NextJS, ReactJS,
              Tailwind CSS, ShadCN UI, NodeJS, MongoDB, WitAI
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-bold">Project Description:</span> E-commerce
              site selling pet products with AI for personalized shopping.
              Features AI chatbot with Wit.ai for recommendations, Redis
              caching, responsive UI with shadcn/ui, secure auth with
              Express-session, and order processing with Nodemailer.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <a
                href="https://github.com/hieujojo/pet_shop_frontend"
                className="block text-blue-600 hover:underline"
              >
                GitHub Frontend
              </a>
              <span className="hidden sm:inline text-gray-700">|</span>
              <a
                href="https://github.com/hieujojo/pet_shop_backend"
                className="block text-blue-600 hover:underline"
              >
                GitHub Backend
              </a>
            </div>
            <motion.div
              className="mt-4 flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="https://github.com/hieujojo/pet_shop_frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/pet.png"
                  alt="PetShop AI"
                  width={300}
                  height={200}
                  className="rounded-lg w-full sm:w-auto object-cover"
                />
              </a>
            </motion.div>
          </div>

          {/* Restaurant Website */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-black font-semibold mb-2">
              Restaurant Website
            </h3>
            <p className="text-gray-800 mb-1">
              <span className="font-bold">Position:</span> Front-End Developer {" "}
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-bold">Technologies:</span> NextJS, ReactJS,
              Tailwind CSS, NodeJS, MongoDB
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-bold">Project Description:</span> A modern
              restaurant web app offering a seamless experience for browsing
              menus, exploring dish details, and reading engaging blogs to
              elevate the dining experience.
            </p>
            <div className="mt-4 space-y-2 mb-10">
              <a
                href="https://github.com/hieujojo/Restaurant"
                className="block text-blue-600 hover:underline"
              >
                GitHub Restaurant
              </a>
            </div>
            <motion.div
              className="mt-4 flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="https://github.com/hieujojo/Restaurant"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/restaurant.png"
                  alt="Restaurant Website"
                  width={300}
                  height={200}
                  className="rounded-lg w-full sm:w-auto object-cover"
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}