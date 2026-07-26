import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    /* 🔥 FIX: Mobile pe h-auto + py-10 taaki upar-niche extra khali space na rahe */
    <section id="contact" className="w-full h-auto md:min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 py-10 md:py-20 bg-[#0a0515] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-purple-800 rounded-full blur-[70px] sm:blur-[110px] pointer-events-none z-0 transform-gpu" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/3 w-[260px] sm:w-[450px] h-[260px] sm:h-[450px] bg-cyan-800 rounded-full blur-[70px] sm:blur-[110px] pointer-events-none z-0 transform-gpu" 
      />

      <div className="text-center max-w-2xl mx-auto relative z-10 w-full">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight">
          INITIATE <span className="text-purple-500">COMMS.</span>
        </h2>
        
        <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed px-2">
          Currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 justify-center items-stretch sm:items-center w-full max-w-md mx-auto sm:max-w-none">
          <a 
            href="mailto:ankurpandey6691@gmail.com?subject=Hi%20Ankur,%20Saw%20your%20portfolio!" 
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.35)] text-xs sm:text-sm text-center"
          >
            SEND MESSAGE
          </a>

          <a 
            href="/AnkurpandeyMERNResume.pdf" 
            download="AnkurpandeyMERNResume.pdf"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest hover:bg-white/10 active:scale-95 transition-all duration-300 text-xs sm:text-sm text-center"
          >
            GET RESUME
          </a>
        </div>
        
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          
          <motion.a 
            href="https://github.com/ankur6691/" 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-xs sm:text-sm tracking-wider hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GITHUB</span>
          </motion.a>

          <motion.a 
            href="https://www.linkedin.com/in/ankur6691/" 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-xs sm:text-sm tracking-wider hover:border-purple-400/50 hover:text-purple-300 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LINKEDIN</span>
          </motion.a>

        </div>
      </div>
    </section>
  );
}