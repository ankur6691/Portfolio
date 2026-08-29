import { motion } from "framer-motion";
import LiquidImage from "../components/LiquidImage";

export default function AboutSection() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto select-none"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left: 3D Touch-Responsive Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <div className="relative group w-[240px] sm:w-[280px] md:w-[320px]">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-cyan-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500 pointer-events-none" />
            
            {/* Image Component */}
            <LiquidImage imageUrl="/ankur.jpeg" />

            {/* Bottom Identity Pill */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-900/95 dark:bg-black/95 border border-white/20 text-[11px] font-mono text-cyan-400 whitespace-nowrap shadow-lg backdrop-blur-md">
              ANKUR // FULL STACK DEV
            </div>
          </div>
        </motion.div>

        {/* Right: Clean & Professional English Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col items-start space-y-5 text-left"
        >
          {/* Section Subtitle */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono uppercase tracking-widest">
            // ABOUT ME
          </div>

          {/* Master Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-snug">
            PASSIONATE DEVELOPER <br />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
              BUILDING DIGITAL EXPERIENCES.
            </span>
          </h2>

          {/* Professional Narrative */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            I am a Full Stack Developer dedicated to engineering high-performance web applications 
            and interactive digital interfaces. My work balances scalable backend architecture 
            with modern, GPU-accelerated frontend animations to create seamless, impactful user experiences.
          </p>

          {/* Technical Domain Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-1">
            <div className="p-3.5 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 backdrop-blur-md">
              <span className="block text-xs font-mono text-purple-600 dark:text-purple-400 uppercase font-bold">Frontend</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block font-medium">React, Tailwind, Responsive UI</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 backdrop-blur-md">
              <span className="block text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold">Backend</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block font-medium">Node.js, Express, REST APIs</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 backdrop-blur-md">
              <span className="block text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">Creative Tech</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block font-medium">Three.js, GSAP & Motion</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => scrollTo("#skills")}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all active:scale-95 cursor-pointer"
            >
              Explore Tech Stack ↓
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}