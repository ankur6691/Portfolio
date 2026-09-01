// src/sections/ProjectsSection.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminModal from "../components/AdminModal";
import { FALLBACK_PROJECTS } from "../data/fallbackProjects";

// =========================================================================
// 1. 3D CYLINDER CAROUSEL COMPONENT
// =========================================================================
function Interactive3DCylinder({ slides = [], onCardClick }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const lastRotation = useRef(0);
  const animRef = useRef(null);

  const total = slides.length || 1;
  const CARD_WIDTH = "w-44 sm:w-52 md:w-56 lg:w-60";
  const CARD_HEIGHT = "h-28 sm:h-32 md:h-36 lg:h-38";
  const ORBIT_RADIUS = Math.max(170, Math.round(total * 38));

  // 60 FPS Continuous Spin Loop
  useEffect(() => {
    let prevTime = performance.now();
    const spinLoop = (time) => {
      const delta = time - prevTime;
      prevTime = time;
      if (!isDragging) {
        setRotation((prev) => (prev - 0.009 * delta) % 360);
      }
      animRef.current = requestAnimationFrame(spinLoop);
    };
    animRef.current = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(animRef.current);
  }, [isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastRotation.current = rotation;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setRotation(lastRotation.current + (currentX - startX.current) * 0.45);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="relative w-full h-72 sm:h-80 md:h-[390px] flex items-center justify-center overflow-visible select-none touch-none cursor-grab active:cursor-grabbing"
      style={{ perspective: "1100px" }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(-6deg) rotateY(${rotation}deg)`,
        }}
        className={`relative ${CARD_WIDTH} ${CARD_HEIGHT} flex items-center justify-center transition-transform duration-75 ease-out`}
      >
        {slides.map((item, idx) => {
          const angle = (360 / total) * idx;
          return (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(item);
              }}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${ORBIT_RADIUS}px)`,
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.85)] bg-slate-950 group cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all flex flex-col"
            >
              {/* Mini Browser Bar */}
              <div className="h-4 sm:h-5 bg-slate-900/95 border-b border-white/10 px-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[7.5px] font-mono text-slate-400 truncate max-w-[110px]">
                  {item.title}
                </span>
                <span className="text-[8px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </div>

              {/* Viewport Screenshot */}
              <div className="flex-1 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top pointer-events-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// 2. MAIN PROJECTS SECTION (STRICT SECRET CODE TRIGGER)
// =========================================================================
export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState(FALLBACK_PROJECTS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [modalMedia, setModalMedia] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const containerRef = useRef(null);
  const isThrottled = useRef(false);
  const touchStartX = useRef(0);
  const keystrokeBuffer = useRef("");

  const totalProjects = projectsList.length;
  const currentProject = projectsList[activeIdx] || projectsList[0];

  // Live Database Fetching
  const fetchLiveProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProjectsList(data);
      }
    } catch {
      setProjectsList(FALLBACK_PROJECTS);
    }
  }, []);

  useEffect(() => {
    fetchLiveProjects();
  }, [fetchLiveProjects]);

  // ONLY TRIGGER: Secret Passcode "Svvv@2017ankur"
  useEffect(() => {
    const SECRET_KEY = "svvv@2017ankur";

    const handleGlobalKeyDown = (e) => {
      // Ignore typing if user is focused on any form input/textarea
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;

      // Only append actual single characters (ignores Shift, Alt, Control keys)
      if (e.key.length === 1) {
        keystrokeBuffer.current += e.key.toLowerCase();

        if (keystrokeBuffer.current.length > 30) {
          keystrokeBuffer.current = keystrokeBuffer.current.slice(-30);
        }

        if (keystrokeBuffer.current.includes(SECRET_KEY)) {
          keystrokeBuffer.current = "";
          setIsAdminOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setActiveIdx((prev) => prev + newDirection);
    },
    []
  );

  // Wheel Interceptor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelBuffer = 0;
    let timer = null;

    const handleWheel = (e) => {
      if (window.innerWidth < 1024) return;
      wheelBuffer += e.deltaY;
      clearTimeout(timer);
      timer = setTimeout(() => {
        wheelBuffer = 0;
      }, 150);

      if (wheelBuffer > 35 && activeIdx < totalProjects - 1) {
        e.preventDefault();
        if (!isThrottled.current) {
          isThrottled.current = true;
          paginate(1);
          wheelBuffer = 0;
          setTimeout(() => (isThrottled.current = false), 600);
        }
      } else if (wheelBuffer < -35 && activeIdx > 0) {
        e.preventDefault();
        if (!isThrottled.current) {
          isThrottled.current = true;
          paginate(-1);
          wheelBuffer = 0;
          setTimeout(() => (isThrottled.current = false), 600);
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeIdx, totalProjects, paginate]);

  // Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 45) {
      if (diffX > 0 && activeIdx < totalProjects - 1) paginate(1);
      else if (diffX < 0 && activeIdx > 0) paginate(-1);
    }
  };

  const cardVariants = {
    enter: (dir) => ({
      y: dir > 0 ? 30 : -30,
      opacity: 0,
      filter: "blur(6px)",
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 280, damping: 28 },
        filter: { duration: 0.35, ease: "easeOut" },
        opacity: { duration: 0.25 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      y: dir > 0 ? -30 : 30,
      opacity: 0,
      filter: "blur(6px)",
      scale: 0.98,
      transition: { y: { duration: 0.25 }, filter: { duration: 0.22 }, opacity: { duration: 0.18 } },
    }),
  };

  return (
    <section id="projects" className="w-full pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none relative z-10">
      {/* Clean Header (Zero Clues for Visitors) */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2">
          // 04. PROVEN WORK & SHIPMENTS
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">
          FEATURED <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">PROJECTS</span>
        </h2>
      </div>

      {/* Main Theater Card Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[480px] sm:min-h-[520px]"
      >
        {/* Glow */}
        <div
          className="absolute w-80 h-80 rounded-full blur-[110px] pointer-events-none transition-all duration-700 -z-10"
          style={{ background: currentProject.glowColor || "rgba(6, 182, 212, 0.35)" }}
        />

        {/* Morphing Project Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id || currentProject._id || activeIdx}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/85 dark:bg-[#080a14]/95 border border-slate-300/80 dark:border-white/15 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${currentProject.badgeColor || "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"}`}>
                      {currentProject.badge || "FEATURED PROJECT"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      PROJECT {String(activeIdx + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-600 dark:text-cyan-400 mt-1 mb-2.5">
                    {currentProject.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {currentProject.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 my-4 pt-3.5 border-t border-slate-200 dark:border-white/10">
                    {(currentProject.metrics || []).map((m, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300/60 dark:border-white/10 text-left">
                        <p className="text-[8px] font-mono text-slate-500 dark:text-slate-400 uppercase">{m.label}</p>
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5 truncate">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 text-black font-mono font-bold text-xs shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>VISIT LIVE PORTAL</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {currentProject.videoUrl && (
                    <button
                      onClick={() => setModalMedia({ type: "video", url: currentProject.videoUrl, title: currentProject.title })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-mono font-bold text-xs border border-pink-500/30 transition-all cursor-pointer"
                    >
                      <span>WATCH DEMO ▶</span>
                    </button>
                  )}
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-mono font-semibold text-xs border border-slate-300 dark:border-white/15 transition-all"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: 3D Cylinder */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center overflow-visible">
                <Interactive3DCylinder
                  slides={currentProject.slides || []}
                  onCardClick={(item) =>
                    setModalMedia({
                      type: "image",
                      url: item.img,
                      title: `${currentProject.title} - ${item.title}`,
                    })
                  }
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stepper Indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {projectsList.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > activeIdx ? 1 : -1);
              setActiveIdx(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIdx ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" : "w-2 bg-slate-300 dark:bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalMedia(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl flex flex-col cursor-default"
            >
              <div className="p-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase truncate pr-4">{modalMedia.title}</span>
                <button
                  onClick={() => setModalMedia(null)}
                  className="p-1 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-mono cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex-1 overflow-auto flex items-center justify-center bg-black/60 p-4">
                {modalMedia.type === "image" ? (
                  <img src={modalMedia.url} alt="Fullscreen View" className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl" />
                ) : (
                  <div className="w-full aspect-video">
                    <iframe
                      src={modalMedia.url}
                      title="Demo Walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl border-0"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Dynamic CMS Admin Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} onProjectAdded={fetchLiveProjects} />
    </section>
  );
}