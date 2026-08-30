import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. ASSET DATA ARRAYS
// ==========================================

const PRESET_1_IMAGES = [
  { id: 1, title: "Fintech App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" },
  { id: 2, title: "Crypto UI", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&q=80" },
  { id: 3, title: "SaaS Matrix", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80" },
  { id: 4, title: "Cloud Node", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80" },
  { id: 5, title: "AI Pipeline", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80" },
  { id: 6, title: "Speed Engine", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80" },
];

const PRESET_2_IMAGES = [
  { id: 1, title: "Brand Identity", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80" },
  { id: 2, title: "Design Studio", img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&q=80" },
  { id: 3, title: "Digital Poster", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&q=80" },
  { id: 4, title: "UI Mockups", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&q=80" },
  { id: 5, title: "Mobile Apps", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80" },
  { id: 6, title: "Web Portals", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" },
];

const PRESET_3_IMAGES = [
  { id: 1, title: "3D Visuals", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80" },
  { id: 2, title: "Fluid Shaders", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&q=80" },
  { id: 3, title: "Kinetic Motion", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80" },
  { id: 4, title: "Cyberpunk UI", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80" },
  { id: 5, title: "Game Canvas", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80" },
];

const PRESET_4_IMAGES = [
  { id: 1, title: "Video Reel 01", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80" },
  { id: 2, title: "Cinematic Cut", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80" },
  { id: 3, title: "Sound Design", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80" },
  { id: 4, title: "Visual FX", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&q=80" },
  { id: 5, title: "Motion Reels", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80" },
  { id: 6, title: "Final Export", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80" },
];

// Preset Info Details (Synchronized with Auto-Slide)
const PRESET_INFO = [
  {
    step: "01",
    presetName: "360° CYLINDRICAL ORBIT",
    headline: "Orbital Spatial Depth",
    description: "Equidistant circular ring rotating continuously on a tilted horizontal 3D axis with real-time Z-depth sorting.",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    techTags: ["360° Ring Loop", "Z-Axis Depth", "60 FPS GPU Matrix"],
  },
  {
    step: "02",
    presetName: "CURVED CONVEX ARCH",
    headline: "Panoramic Arc Projection",
    description: "Inward-bowing curved ribbon conveyor with dual-axis rotational trajectory and continuous stream mechanics.",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    techTags: ["Bow Inward: 35°", "Kinetic Velocity", "Seamless Ribbon"],
  },
  {
    step: "03",
    presetName: "VERTICAL HELIX VORTEX",
    headline: "Multi-Tier Spiral Tower",
    description: "Ascending helical cylinder featuring vertical elevation steps and dynamic radial angle choreography.",
    badgeColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    techTags: ["Helix Elevation", "Vortex Spiral", "Radial Symmetry"],
  },
  {
    step: "04",
    presetName: "PERSPECTIVE SPATIAL DECK",
    headline: "Slanted Angular Stream",
    description: "Multi-angle perspective orbit designed with alternating tilt inclinations and progressive depth dispersion.",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    techTags: ["Perspective Tilt", "Angular Skew", "Volumetric Flow"],
  },
];

// ==========================================
// 2. BORDERLESS 3D PRESET RIGS
// ==========================================

function Preset1Cylinder() {
  const total = PRESET_1_IMAGES.length;

  return (
    <div className="w-full h-64 sm:h-72 md:h-84 lg:h-96 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
      <motion.div
        animate={{
          rotateY: [0, -360],
          y: [-6, 6, -6],
        }}
        transition={{
          rotateY: { repeat: Infinity, duration: 14, ease: "linear" },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d", transform: "rotateX(-10deg)" }}
        className="relative w-24 sm:w-28 md:w-36 h-32 sm:h-40 md:h-48 flex items-center justify-center"
      >
        {PRESET_1_IMAGES.map((item, idx) => {
          const angle = (360 / total) * idx;
          return (
            <div
              key={item.id}
              style={{
                transform: `rotateY(${angle}deg) translateZ(var(--tz-1, 110px))`,
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-slate-900 [--tz-1:95px] sm:[--tz-1:120px] md:[--tz-1:145px]"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Preset2CurvedArch() {
  const total = PRESET_2_IMAGES.length;

  return (
    <div className="w-full h-64 sm:h-72 md:h-84 lg:h-96 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
      <motion.div
        animate={{
          rotateY: [0, -360],
          y: [6, -6, 6],
        }}
        transition={{
          rotateY: { repeat: Infinity, duration: 14, ease: "linear" },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d", transform: "rotateX(12deg) rotateZ(3deg)" }}
        className="relative w-24 sm:w-28 md:w-36 h-32 sm:h-40 md:h-48 flex items-center justify-center"
      >
        {PRESET_2_IMAGES.map((item, idx) => {
          const angle = (360 / total) * idx;
          return (
            <div
              key={item.id}
              style={{
                transform: `rotateY(${angle}deg) translateZ(var(--tz-2, 110px)) rotateX(-6deg)`,
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-slate-900 [--tz-2:95px] sm:[--tz-2:120px] md:[--tz-2:145px]"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Preset3Helix() {
  const total = PRESET_3_IMAGES.length;

  return (
    <div className="w-full h-64 sm:h-72 md:h-84 lg:h-96 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
      <motion.div
        animate={{
          rotateY: [0, -360],
          y: [-5, 5, -5],
        }}
        transition={{
          rotateY: { repeat: Infinity, duration: 13, ease: "linear" },
          y: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d", transform: "rotateX(15deg) rotateZ(-4deg)" }}
        className="relative w-24 sm:w-28 md:w-32 h-28 sm:h-32 md:h-36 flex items-center justify-center"
      >
        {PRESET_3_IMAGES.map((item, idx) => {
          const angle = (360 / total) * idx;
          const verticalStep = (idx - 2) * 26;
          return (
            <div
              key={item.id}
              style={{
                transform: `rotateY(${angle}deg) translateY(${verticalStep}px) translateZ(var(--tz-3, 95px)) rotateX(6deg)`,
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)] bg-slate-900 [--tz-3:85px] sm:[--tz-3:105px] md:[--tz-3:130px]"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Preset4PerspectiveOrbit() {
  const total = PRESET_4_IMAGES.length;

  return (
    <div className="w-full h-64 sm:h-72 md:h-84 lg:h-96 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
      <motion.div
        animate={{
          rotateY: [0, -360],
          y: [5, -5, 5],
        }}
        transition={{
          rotateY: { repeat: Infinity, duration: 14, ease: "linear" },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d", transform: "rotateX(-14deg) rotateZ(-6deg)" }}
        className="relative w-24 sm:w-28 md:w-36 h-32 sm:h-40 md:h-48 flex items-center justify-center"
      >
        {PRESET_4_IMAGES.map((item, idx) => {
          const angle = (360 / total) * idx;
          return (
            <div
              key={item.id}
              style={{
                transform: `rotateY(${angle}deg) translateZ(var(--tz-4, 110px)) rotateZ(${idx % 2 === 0 ? 4 : -4}deg)`,
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-slate-900 [--tz-4:95px] sm:[--tz-4:120px] md:[--tz-4:145px]"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ==========================================
// 3. MAIN DUAL-COLUMN SECTION
// ==========================================
export default function ShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARDS = [
    { id: "p1", component: <Preset1Cylinder /> },
    { id: "p2", component: <Preset2CurvedArch /> },
    { id: "p3", component: <Preset3Helix /> },
    { id: "p4", component: <Preset4PerspectiveOrbit /> },
  ];

  // Automatic slide right-to-left loop every 3.8s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CARDS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [CARDS.length]);

  const activeInfo = PRESET_INFO[currentIndex];

  return (
    <section
      id="showcase"
      className="w-full pt-6 sm:pt-8 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Animated Dynamic Information */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3">
            // 03. 3D SPATIAL LAB
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight mb-6">
            MOTION <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">&amp; SPATIAL</span> SUITE
          </h2>

          {/* Synchronized Animated Description Card */}
          <div className="w-full min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInfo.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col space-y-3.5"
              >
                {/* Active Preset Tag */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${activeInfo.badgeColor} font-bold tracking-wider`}>
                    PRESET {activeInfo.step} // {activeInfo.presetName}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeInfo.headline}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {activeInfo.description}
                </p>

                {/* Dynamic Specs Micro-Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeInfo.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-slate-200/70 dark:bg-white/[0.05] border border-slate-300/70 dark:border-white/10 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Seamless Progress Indicator Bars */}
          <div className="flex items-center gap-2 mt-4 pt-2">
            {PRESET_INFO.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "w-2 bg-slate-300 dark:bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Borderless Autonomous 3D Rig */}
        <div className="lg:col-span-7 flex items-center justify-center relative w-full overflow-visible">
          
          {/* Subtle Ambient Depth Glow */}
          <div className="absolute w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full bg-gradient-to-r from-purple-600/15 via-pink-600/15 to-cyan-500/15 blur-[90px] pointer-events-none -z-10" />

          {/* Animated 3D Presets Switching in Space */}
          <div className="w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={CARDS[currentIndex].id}
                initial={{ opacity: 0, scale: 0.92, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex items-center justify-center"
              >
                {CARDS[currentIndex].component}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}