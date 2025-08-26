'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl flex font-bold text-blue-400">
              <Image
                src="/images/h.png"
                alt="logo"
                width={35}
                height={35}
                className="mr-2 object-contain"
              />
              <p className='text-gray-400 mt-1 font-bold uppercase tracking-[7px] text-3xl'>ieu</p>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#about" className="text-gray-400 hover:text-blue-600">
              About
            </Link>
            <Link href="#projects" className="text-gray-400 hover:text-blue-600">
              Projects
            </Link>
            <Link href="#skills" className="text-gray-400 hover:text-blue-600">
              Skills
            </Link>
            <Link href="#contact" className="text-gray-400 hover:text-blue-600">
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/70 backdrop-blur-md">
            <Link href="#about" className="block text-gray-400 hover:text-blue-600" onClick={toggleMenu}>
              About
            </Link>
            <Link href="#projects" className="block text-gray-400 hover:text-blue-600" onClick={toggleMenu}>
              Projects
            </Link>
            <Link href="#skills" className="block text-gray-400 hover:text-blue-600" onClick={toggleMenu}>
              Skills
            </Link>
            <Link href="#contact" className="block text-gray-400 hover:text-blue-600" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
