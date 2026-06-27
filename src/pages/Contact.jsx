import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-6 py-20 bg-[#0a0515] relative overflow-hidden">
      
      {/* ================= KHATARNAK ANIMATED BACKGROUND ================= */}
      
      {/* 1. Halka sa Tech Grid Pattern (Piche premium hacker vibe dega) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* 2. Moving Purple Glow (Ab ye apni jagah se thoda idhar-udhar hawa me tairega) */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0], 
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none z-0" 
      />
      
      {/* 3. Moving Cyan Glow (Dheere dheere opposite direction me flow karega) */}
      <motion.div 
        animate={{ 
          x: [0, -60, 60, 0], 
          y: [0, 60, -60, 0],
          scale: [1, 1.3, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none z-0" 
      />
      {/* ================================================================ */}

      {/* TERA ORIGINAL SIMPLE TEXT LAYOUT (Bina kisi Box ke) */}
      <div className="text-center max-w-2xl mx-auto relative z-10 w-full">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6">
          INITIATE <span className="text-purple-500">COMMS.</span>
        </h2>
        
        <p className="text-gray-400 text-base md:text-lg mb-10 md:mb-12 leading-relaxed px-2">
          Currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
        </p>
        
        {/* BUTTONS SECTION */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          
          <a 
            href="mailto:ankurpandey6691@gmail.com?subject=Hi%20Ankur,%20Saw%20your%20portfolio!" 
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] text-sm md:text-base w-full sm:w-auto text-center"
          >
            SEND MESSAGE
          </a>

          <a 
            href="/AnkurpandeyMERNResume.pdf" 
            download="AnkurpandeyMERNResume.pdf"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest hover:bg-white/10 transition-all duration-300 text-sm md:text-base w-full sm:w-auto text-center"
          >
            GET RESUME
          </a>

        </div>
        
        {/* SOCIAL LINKS SECTION */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-gray-500 font-mono text-xs md:text-sm tracking-widest">
          
          <a 
            href="https://github.com/ankur6691/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-cyan-400 cursor-pointer transition-colors"
          >
            GITHUB
          </a>

          <a 
            href="https://www.linkedin.com/in/ankur6691/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-purple-400 cursor-pointer transition-colors"
          >
            LINKEDIN
          </a>

        </div>
      </div>
    </section>
  );
}