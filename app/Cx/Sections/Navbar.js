'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ptSerif } from '../Font/font';

export default function Navbar() {
  const links = ['• New Arrivals', 'Shop Summer Collection', 'Shop Winter Collection', 'Shop All', 'About Us', 'Contact Us'];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 0,
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className={`${ptSerif.className} fixed top-0 left-0 right-0 z-50  backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Left Side - Hamburger Menu and Brand Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu */}
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Brand Logo */}
            <h1 
              data-aos="fade"
              className={`${ptSerif.className} text-2xl sm:text-3xl font-bold text-white`}
            >
              Abaya.
            </h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button 
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
              aria-label="Search"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Icon */}
            <button 
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
              aria-label="Account"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button 
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2 relative"
              aria-label="Cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-96 md:w-[500px] backdrop-blur-xl z-40 transform transition-transform duration-500 ease-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-white/10`}
      >
        <div className="flex flex-col h-full justify-center px-8">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={`#${link}`}
                onClick={() => setIsSidebarOpen(false)}
                data-aos="fade-right"
                data-aos-delay={index * 80}
                className="group relative text-white/90 hover:text-white transition-all duration-300 font-medium text-base uppercase tracking-wider py-4"
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
          onClick={toggleSidebar}
        />
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 sm:gap-8 py-4 overflow-x-auto hide-scrollbar">
            {links.map((link, index) => (
              <a
                key={index}
                href={`#${link}`}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="text-white hover:text-gray-300 transition-colors duration-300 whitespace-nowrap font-medium text-sm uppercase tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
