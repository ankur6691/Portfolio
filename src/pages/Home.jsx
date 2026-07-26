import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const letterContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } } };
const letterVariants = { hidden: { opacity: 0, y: 30, rotateX: -90 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 220, damping: 12 } } };
const typewriterVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.8 } } };
const letterTypeVariants = { hidden: { opacity: 0, display: "none" }, show: { opacity: 1, display: "inline-block" } };

export default function Home() {
  const name = "ANKUR";
  const title = "FULL STACK DEVELOPER";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    /* 🔥 FIX: Mobile pe h-auto aur bottom padding tight kar di taaki Next section ke saath seamless blend ho */
    <section id="home" className="relative w-full h-auto md:min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-12 md:pt-4 pb-6 md:pb-10">      
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:40px_40px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 items-center">
        
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-2xl space-y-4 md:space-y-5 z-20 transform-gpu">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs sm:text-sm tracking-wide text-purple-200 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-medium">Available for new opportunities</span>
          </motion.div>
          
          <div className="space-y-1">
            <motion.h1 variants={letterContainerVariants} initial="hidden" animate="show" className="flex text-5xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter leading-none text-white perspective-1000">
              {name.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block transform-gpu">{char}</motion.span>
              ))}
            </motion.h1>
            
            <motion.h2 variants={typewriterVariants} initial="hidden" animate="show" className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight pb-1 sm:pb-2">
              {title.split("").map((char, index) => (
                <motion.span key={index} variants={letterTypeVariants} className="animate-text-gradient bg-clip-text text-transparent bg-[linear-gradient(to_right,#a855f7,#22d3ee,#3b82f6,#a855f7)] bg-[length:200%_auto]">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-cyan-400 ml-1.5 align-middle" />
            </motion.h2>
          </div>
          
          <motion.p 
            variants={itemVariants} 
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-lg font-normal text-justify tracking-wide"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Crafting immersive digital experiences, high-performance web applications, and scalable backend architectures. I build things for the web.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
            <button onClick={() => scrollToSection('projects')} className="px-7 py-3.5 rounded-full bg-white text-[#030014] font-bold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all text-center">
              View Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-7 py-3.5 rounded-full border border-white/20 text-white font-bold text-sm sm:text-base hover:bg-white/10 active:scale-95 transition-all text-center">
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="relative w-full h-[320px] sm:h-[420px] lg:h-[580px] flex justify-center items-center cursor-grab active:cursor-grabbing z-10 lg:-translate-x-4 transform-gpu"
        >
          <Spline scene="https://prod.spline.design/b0y33usxa-bxfTk0/scene.splinecode" />
          
          <div className="absolute bottom-1 right-2 w-[150px] sm:w-[160px] h-[40px] sm:h-[45px] bg-[#030014] z-50 rounded-lg pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}