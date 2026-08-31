import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const SKILL_DECKS = [
  {
    id: "frontend",
    step: "01",
    role: "FRONTEND ENGINEERING",
    title: "Client-Side & UI Architecture",
    description: "Ultra-fast, responsive web interfaces with pixel-perfect animations and clean state management.",
    accent: "from-cyan-400 via-blue-500 to-indigo-600",
    glow: "rgba(6, 182, 212, 0.3)",
    tag: "UI Core",
    skills: [
      { name: "React 19", level: "Core" },
      { name: "Next.js 15", level: "SSR/SSG" },
      { name: "TypeScript", level: "Strict" },
      { name: "Tailwind CSS", level: "Utility" },
      { name: "JavaScript", level: "ES6+" },
      { name: "HTML5 / CSS3", level: "Modern" },
    ],
  },
  {
    id: "backend",
    step: "02",
    role: "BACKEND ARCHITECTURE",
    title: "APIs & Server-Side Systems",
    description: "Robust microservices, REST APIs, secure authentication pipelines, and server scalability.",
    accent: "from-purple-500 via-violet-600 to-indigo-700",
    glow: "rgba(168, 85, 247, 0.3)",
    tag: "Server Core",
    skills: [
      { name: "Node.js", level: "Runtime" },
      { name: "Express.js", level: "Framework" },
      { name: "REST APIs", level: "Endpoints" },
      { name: "Redis", level: "In-Memory Caching" },
      { name: "JWT / Auth", level: "Security" },
      { name: "WebSockets", level: "Realtime" },
    ],
  },
  {
    id: "database",
    step: "03",
    role: "DATA & CLUSTERS",
    title: "Databases & Storage",
    description: "High-availability database modeling, schema migrations, and optimized low-latency caching.",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    glow: "rgba(16, 185, 129, 0.3)",
    tag: "Data Pipeline",
    skills: [
      { name: "PostgreSQL", level: "Relational" },
      { name: "MongoDB", level: "NoSQL" },
      { name: "Redis", level: "Cache" },
      { name: "Prisma ORM", level: "Schema" },
      { name: "Docker", level: "Containers" },
      { name: "Supabase", level: "BaaS" },
    ],
  },
  {
    id: "creative",
    step: "04",
    role: "3D & SPATIAL INTERACTION",
    title: "Graphics, Shaders & Motion",
    description: "GPU-accelerated WebGL environments, physics interactions, and cinematic scroll choreography.",
    accent: "from-pink-500 via-rose-500 to-amber-500",
    glow: "rgba(244, 63, 94, 0.3)",
    tag: "Spatial Tech",
    skills: [
      { name: "Three.js / R3F", level: "WebGL 3D Core" },
      { name: "Spline 3D", level: "Interactive Scenes" },
      { name: "Adobe Mixamo", level: "3D Rigging & Anim" },
      { name: "Blender", level: "3D Assets & Lighting" },
      { name: "Hugging Face", level: "AI Inference & Models" },
      { name: "GLSL Shaders", level: "GPU Math & Effects" },
      { name: "GSAP & ScrollTrigger", level: "Timeline Motion" },
      { name: "Framer Motion", level: "Physics & Spring UI" },
      { name: "Canvas 2D / WebGL", level: "Interactive Particles" },
    ],
  },
  {
    id: "media",
    step: "05",
    role: "CREATIVE SUITE & VIDEO",
    title: "Cinematic Editing & Assets",
    description: "High-paced video pacing, precision color grading, audio dynamics, and visual media assets.",
    accent: "from-rose-500 via-pink-600 to-purple-600",
    glow: "rgba(236, 72, 153, 0.3)",
    tag: "Media Engine",
    skills: [
      { name: "CapCut Pro", level: "Advanced" },
      { name: "Visual Pacing", level: "Editing" },
      { name: "Asset Workflow", level: "Export" },
    ],
  },
  {
    id: "tools",
    step: "06",
    role: "DEVOPS & WORKFLOW",
    title: "Tooling, Speed & Execution",
    description: "End-to-end development toolkit paired with problem-solving and rapid delivery mindset.",
    accent: "from-amber-400 via-orange-500 to-rose-600",
    glow: "rgba(245, 158, 11, 0.3)",
    tag: "Productivity",
    skills: [
      { name: "Git & GitHub", level: "VCS & CI" },
      { name: "Vite / Bundler", level: "Tooling" },
      { name: "Postman", level: "Testing" },
      { name: "Problem Solving", level: "Mindset" },
      { name: "Fast Learner", level: "Agile" },
      { name: "Team Sync", level: "Soft Skill" },
    ],
  },
];

function CompactFloatingCard({ deck, isSecond = false }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), { stiffness: 260, damping: 20 });
  const skewX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["3deg", "-3deg"]), { stiffness: 260, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        skewX,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: isSecond ? [6, -6, 6] : [-6, 6, -6],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: isSecond ? 4.8 : 4.2,
          ease: "easeInOut",
        },
      }}
      className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] p-4 sm:p-5 md:p-6 rounded-2xl bg-white/85 dark:bg-[#090b16]/90 border border-slate-300/80 dark:border-white/15 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.35)] relative flex flex-col justify-between overflow-hidden select-none"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none -z-10 mix-blend-luminosity"
        style={{ backgroundImage: `url('/ankur.jpeg')` }}
      />

      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-all duration-500"
        style={{ background: deck.glow }}
      />

      {/* Top HUD Header */}
      <div style={{ transform: "translateZ(20px)" }} className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">
            {deck.role}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
          {deck.step} / 06
        </span>
      </div>

      {/* Title & Description */}
      <div style={{ transform: "translateZ(25px)" }}>
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">
          {deck.title}
        </h3>
        <p className="mt-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
          {deck.description}
        </p>
      </div>

      {/* Micro-Skills Grid */}
      <div style={{ transform: "translateZ(15px)" }} className="mt-4 pt-3.5 border-t border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-2 gap-1.5">
          {deck.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300/60 dark:border-white/10"
            >
              <span className="text-[11px] font-bold font-mono text-slate-900 dark:text-slate-100 truncate pr-1">
                {skill.name}
              </span>
              <span className="text-[8.5px] font-mono text-cyan-600 dark:text-cyan-400 px-1 py-0.5 rounded bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 whitespace-nowrap">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tag */}
      <div style={{ transform: "translateZ(12px)" }} className="mt-4 flex items-center justify-between pt-1">
        <span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-[9px] font-mono uppercase text-slate-700 dark:text-slate-300">
          ● {deck.tag}
        </span>
        <span className="text-[9px] font-mono text-slate-400">
          PRO-STACK
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % SKILL_DECKS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + SKILL_DECKS.length) % SKILL_DECKS.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentDeck = SKILL_DECKS[index];
  const nextDeck = SKILL_DECKS[(index + 1) % SKILL_DECKS.length];

  return (
    <section
      id="skills"
      className="w-full pt-4 sm:pt-8 md:pt-10 pb-16 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto select-none relative z-10"
    >
      {/* Upgraded & Scaled Mobile Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3">
          // 02. CAPABILITIES
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">
          TECH <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">ARSENAL</span>
        </h2>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 max-w-xl mx-auto">
        {SKILL_DECKS.map((deck, idx) => {
          const isActive = idx === index;
          return (
            <button
              key={deck.id}
              onClick={() => setIndex(idx)}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-md scale-105"
                  : "bg-slate-200/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/10"
              }`}
            >
              {deck.id.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* 3D Viewport: Single Card on Mobile + Dual Grid on Desktop */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Desktop Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Deck"
          className="hidden md:flex absolute -left-2 lg:-left-6 z-30 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white backdrop-blur-xl shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl justify-items-center">
          {/* Card 1: Visible on both Mobile & Desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-mobile-${currentDeck.id}`}
              initial={{ opacity: 0, x: -30, rotateY: 14, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, rotateY: -14, scale: 0.94 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <CompactFloatingCard deck={currentDeck} isSecond={false} />
            </motion.div>
          </AnimatePresence>

          {/* Card 2: Only rendered on Desktop (md+) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-desktop-${nextDeck.id}`}
              initial={{ opacity: 0, x: 30, rotateY: -14, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, rotateY: 14, scale: 0.94 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              className="w-full hidden md:flex justify-center"
            >
              <CompactFloatingCard deck={nextDeck} isSecond={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Deck"
          className="hidden md:flex absolute -right-2 lg:-right-6 z-30 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white backdrop-blur-xl shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden mt-4 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
        <span>← Swipe card horizontally →</span>
      </div>

      {/* Stepper Dots Indicator */}
      <div className="mt-5 sm:mt-6 flex items-center justify-center gap-1.5">
        {SKILL_DECKS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === idx ? "w-6 bg-cyan-400" : "w-1.5 bg-slate-300 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}