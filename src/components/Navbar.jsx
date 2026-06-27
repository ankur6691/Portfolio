import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Work', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScroll = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false); // Link click karne par mobile menu band ho jayega
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#050012]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        
        <button onClick={() => handleScroll('home')} className="flex items-center gap-2 group cursor-pointer z-50">
          <span className="text-2xl font-black tracking-[0.1em] text-white uppercase group-hover:text-purple-400 transition-colors duration-300">
            ANKUR
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
        </button>

        {/* 💻 Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2" onMouseLeave={() => setHoveredPath(null)}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredPath === link.id;
            return (
              <button
                key={link.name}
                onClick={() => handleScroll(link.id)}
                onMouseEnter={() => setHoveredPath(link.id)}
                className="relative px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <span className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-300 ${isActive || isHovered ? 'text-white drop-shadow-md' : 'text-gray-400'}`}>
                  {link.name}
                </span>
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg -z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <motion.a
            href="https://wa.me/918962944457?text=Hi%20Ankur!%20I%20just%20saw%20your%20amazing%20portfolio%20and%20wanted%20to%20connect."
            target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-block px-7 py-2.5 rounded-md bg-purple-600 text-white text-sm font-bold tracking-wider transition-all duration-300 hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            Let's Talk
          </motion.a>
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* 📱 Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#050012]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col items-center py-6 gap-4 md:hidden z-40 shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.id)}
                className={`text-lg font-bold tracking-widest ${activeSection === link.id ? 'text-purple-400' : 'text-gray-300'}`}
              >
                {link.name}
              </button>
            ))}
            <a
              href="https://wa.me/918962944457?text=Hi%20Ankur!"
              target="_blank" rel="noreferrer"
              className="mt-4 px-10 py-3 rounded-full bg-purple-600 text-white font-bold tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              LET'S TALK
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}