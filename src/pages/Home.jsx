import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

// (Tere saare variants same hain, unko waisa hi rakhna jaise the)
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const letterContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } } };
const letterVariants = { hidden: { opacity: 0, y: 40, rotateX: -90 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 10 } } };
const typewriterVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.2 } } };
const letterTypeVariants = { hidden: { opacity: 0, display: "none" }, show: { opacity: 1, display: "inline-block" } };

export default function Home() {
  const name = "ANKUR";
  const title = "FULL STACK DEVELOPER";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // FIX 1: pt-20 ki jagah pt-32 md:pt-20 kar diya taaki mobile par text navbar ke niche na fase
    <section id="home" className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent pt-32 md:pt-20">      
      
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        
        {/* LEFT SIDE: TEXT CONTENT (Tera code untouched) */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-2xl space-y-6 z-20">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm tracking-wide text-purple-200 backdrop-blur-md">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
            <span className="font-medium">Available for new opportunities</span>
          </motion.div>
          
          <div className="space-y-1">
            <motion.h1 variants={letterContainerVariants} initial="hidden" animate="show" className="flex text-6xl md:text-[7rem] font-black tracking-tighter leading-none text-white perspective-1000">
              {name.split("").map((char, index) => (<motion.span key={index} variants={letterVariants} className="inline-block">{char}</motion.span>))}
            </motion.h1>
            
            <motion.h2 variants={typewriterVariants} initial="hidden" animate="show" className="text-2xl md:text-5xl font-bold tracking-tight pb-2">
              {title.split("").map((char, index) => (<motion.span key={index} variants={letterTypeVariants} className="animate-text-gradient bg-clip-text text-transparent bg-[linear-gradient(to_right,#a855f7,#22d3ee,#3b82f6,#a855f7)] bg-[length:200%_auto]">{char === " " ? "\u00A0" : char}</motion.span>))}
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-2 align-middle" />
            </motion.h2>
          </div>
          
          <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed max-w-lg font-light">
            Crafting immersive digital experiences, high-performance web applications, and scalable backend architectures. I build things for the web.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <button onClick={() => scrollToSection('projects')} className="px-8 py-3.5 rounded-full bg-white text-[#030014] font-bold hover:scale-105 transition-all">View Projects</button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-3.5 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all">Contact Me</button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: SPLINE 3D MODEL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="relative w-full h-[400px] lg:h-[600px] flex justify-center items-center cursor-grab active:cursor-grabbing z-10 lg:-translate-x-8"
        >
          <Spline scene="https://prod.spline.design/b0y33usxa-bxfTk0/scene.splinecode" />
          
          {/* 🔥 FIX 2: SPLINE WATERMARK HIDER (Ye dibba watermark ko chhupa dega) */}
          <div className="absolute bottom-1 right-2 w-[160px] h-[45px] bg-[#030014] z-50 rounded-lg pointer-events-none"></div>
        </motion.div>

      </div>
    </section>
  );
}