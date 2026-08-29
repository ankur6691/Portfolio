import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import LiquidText from "../components/LiquidText";

export default function HeroSection() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]), {
    stiffness: 220,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]), {
    stiffness: 220,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-5 sm:pt-10 md:pt-20 pb-10 px-4 sm:px-8 relative overflow-hidden select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Soft Ambient Depth Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] md:w-[700px] h-[300px] bg-gradient-to-r from-purple-500/15 via-cyan-500/15 to-pink-500/15 dark:from-purple-600/20 dark:via-cyan-600/15 dark:to-pink-600/20 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* 3D Spatial Typography Node */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col items-center text-center max-w-5xl mx-auto w-full mt-4 sm:mt-6 md:mt-10"
      >
        {/* Master Liquid WebGL Texts */}
        <div style={{ transform: "translateZ(40px)" }} className="flex flex-col items-center w-full max-w-[95vw] sm:max-w-3xl md:max-w-4xl px-2">
          {/* Main Name Liquid */}
          <LiquidText
            text="ANKUR"
            fontWeight="900"
            className="w-full h-[70px] sm:h-[105px] md:h-[130px]"
          />

          {/* Subtitle Liquid with Gradient */}
          <LiquidText
            text="FULL STACK DEVELOPER"
            gradient={true}
            fontWeight="800"
            className="w-full h-[40px] sm:h-[60px] md:h-[75px] mt-1"
          />
        </div>

        {/* Impact Subtext */}
        <motion.p
          style={{ transform: "translateZ(25px)" }}
          className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed px-4"
        >
          Crafting high-impact web applications, immersive 3D digital experiences, 
          and scalable backend architectures with clean engineering.
        </motion.p>

        {/* Working Action Buttons */}
        <motion.div
          style={{ transform: "translateZ(35px)" }}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#projects")}
            className="px-7 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all active:scale-95 cursor-pointer"
          >
            View Projects ↗
          </button>
          
          {/* Resume Download / Open Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-2xl bg-slate-200/80 dark:bg-white/[0.05] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-white/10 hover:border-cyan-400/50 transition-all active:scale-95 backdrop-blur-xl flex items-center gap-2 cursor-pointer"
          >
            <span>Get Resume</span>
            <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Working Scroll Down Prompt */}
      <div 
        onClick={() => scrollTo("#about")}
        className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
      >
      </div>
    </section>
  );
}