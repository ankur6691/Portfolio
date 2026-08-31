import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =========================================================================
// 1. PROJECTS DATABASE
// =========================================================================
const PROJECTS = [
  // 01. MADHYA BHARAT ASSOCIATES (LIVE PRODUCTION)
  {
    id: "madhya-bharat",
    step: "01",
    category: "CLIENT PRODUCTION",
    badge: "LIVE PRODUCTION",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.35)",
    title: "Madhya Bharat Associates",
    tagline: "Corporate Legal Enforcement & SARFAESI Recovery Portal",
    description:
      "Enterprise legal enforcement web portal built for financial institutions and NBFCs. Implements compliance modules for SARFAESI Act 2002, RRC revenue recovery, interactive advocate directories, and direct client consultation pipelines.",
    metrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Performance", value: "98/100 Score" },
      { label: "Compliance", value: "SARFAESI 2002" },
    ],
    liveUrl: "https://madhya-bharat-associates.vercel.app",
    githubUrl: null,
    videoUrl: null,
    slides: [
      { title: "Hero Portal", img: "https://res.cloudinary.com/dsofipudf/image/upload/v1788167863/Disclaimer_ktchkm.png" },
      { title: "About & Stats", img: "https://res.cloudinary.com/dsofipudf/image/upload/v1788167864/Front_Page_hemykz.png" },
      { title: "Expertise Matrix", img: "https://res.cloudinary.com/dsofipudf/image/upload/v1788167863/Expertise_frpwhy.png" },
      { title: "Legal Council", img: "https://res.cloudinary.com/dsofipudf/image/upload/v1788167864/Legal_Team_eoh9wq.png" },
      { title: "Consultation Form", img: "https://res.cloudinary.com/dsofipudf/image/upload/v1788167863/contact_page_kz3stt.png" },
    ],
  },

  // 02. CLARITAS GLOBAL (ENTERPRISE EDTECH)
  {
    id: "claritas",
    step: "02",
    category: "ENTERPRISE EDTECH",
    badge: "POSTGRESQL & RBAC",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    glowColor: "rgba(168, 85, 247, 0.35)",
    title: "Claritas Global School Ecosystem",
    tagline: "Centralized Multi-Tenant School Management Platform",
    description:
      "Large-scale educational management platform engineered with granular Role-Based Access Control (RBAC). Features dedicated isolated dashboards for Global Super-Admins, Principals, Teachers, and differentiated workspaces for 10th, 11th, and 12th standard students.",
    metrics: [
      { label: "Database", value: "PostgreSQL" },
      { label: "Dashboards", value: "4 Isolated RBAC" },
      { label: "Scope", value: "Global Schools" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/",
    videoUrl: null,
    slides: [
      { title: "Super-Admin Hub", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80" },
      { title: "Principal Console", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
      { title: "Teacher Workspace", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" },
      { title: "Student 10-12 Portal", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80" },
      { title: "Relational Schemas", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
    ],
  },

  // 03. AKMENU (STARTUP POS & BILLING)
  {
    id: "akmenu",
    step: "03",
    category: "STARTUP MVP",
    badge: "15-20 RESTAURANTS AUDITED",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.35)",
    title: "AKMenu Dining & POS Engine",
    tagline: "Cloud Kitchen & Restaurant Billing Operating System",
    description:
      "High-speed point-of-sale and kitchen billing engine engineered as an agile Petpooja alternative. Personally field-tested across 15 to 20 commercial dining restaurants to streamline Kitchen Order Tickets (KOT), fast invoicing, and real-time menu management.",
    metrics: [
      { label: "Field Tested", value: "15-20 Outlets Audited" },
      { label: "Execution", value: "<150ms Invoicing" },
      { label: "Operations", value: "KOT & Inventory" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/",
    videoUrl: null,
    slides: [
      { title: "POS Touch Terminal", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
      { title: "Live KOT Dispatch", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" },
      { title: "Table Matrix", img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80" },
      { title: "Fast Billing", img: "https://images.unsplash.com/photo-1556742049-0a67e557224f?w=600&q=80" },
      { title: "Inventory Engine", img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80" },
    ],
  },

  // 04. CHATIFY (CLIENT MESSENGER WITH VIDEO)
  {
    id: "chatify",
    step: "04",
    category: "CLIENT WORK",
    badge: "LINKEDIN VIDEO WALKTHROUGH",
    badgeColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    glowColor: "rgba(236, 72, 153, 0.35)",
    title: "Chatify Instant Messenger",
    tagline: "Low-Latency WebSocket Bi-Directional Pipeline",
    description:
      "Client messaging application engineered with event-driven WebSockets for instantaneous text exchange, active typing telemetry, and persistent session state. Complete system breakdown and screen walkthrough documented via LinkedIn video.",
    metrics: [
      { label: "Protocol", value: "WebSockets" },
      { label: "Walkthrough", value: "LinkedIn Video" },
      { label: "Latency", value: "Realtime Sync" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    slides: [
      { title: "Live Chat Feed", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" },
      { title: "WebSocket Mesh", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=80" },
      { title: "Typing Telemetry", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" },
      { title: "Auth Pipeline", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" },
    ],
  },

  // 05. SAFEHER (OPEN SOURCE SOS)
  {
    id: "safeher",
    step: "05",
    category: "OPEN SOURCE",
    badge: "GEOLOCATION SOS",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    glowColor: "rgba(6, 182, 212, 0.35)",
    title: "SafeHer SOS Emergency Network",
    tagline: "Rapid Geolocation Alert & Safety Pipeline",
    description:
      "Open-source personal safety application engineered for single-touch distress signaling, live GPS coordinate broadcasts to emergency contacts, and automated emergency routing via secure API webhooks.",
    metrics: [
      { label: "Response", value: "Instant GPS SOS" },
      { label: "License", value: "Open Source" },
      { label: "Platform", value: "Mobile Geofence" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/",
    videoUrl: null,
    slides: [
      { title: "1-Tap SOS Trigger", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
      { title: "Live GPS Mesh", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80" },
      { title: "Webhook Dispatch", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" },
      { title: "Emergency Hub", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" },
    ],
  },
];

// =========================================================================
// 2. BORDERLESS 3D DRAGGABLE CYLINDRICAL CAROUSEL
// =========================================================================
function Interactive3DCylinder({ slides, onCardClick }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const lastRotation = useRef(0);
  const animRef = useRef(null);

  const total = slides.length;
  const CARD_WIDTH = "w-28 sm:w-32 md:w-36";
  const CARD_HEIGHT = "h-36 sm:h-44 md:h-52";
  const ORBIT_RADIUS = 135;

  // Ultra-smooth slow cinematic rotation
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
    const diff = currentX - startX.current;
    setRotation(lastRotation.current + diff * 0.45);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="relative w-full h-80 sm:h-96 md:h-[430px] lg:h-[450px] flex items-center justify-center overflow-visible select-none touch-none cursor-grab active:cursor-grabbing p-2"
      style={{ perspective: "1200px" }}
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
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-slate-900 group cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// 3. MAIN PROJECTS SECTION COMPONENT
// =========================================================================
export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [modalMedia, setModalMedia] = useState(null);

  const containerRef = useRef(null);
  const isThrottled = useRef(false);
  const touchStartX = useRef(0);

  const currentProject = PROJECTS[activeIdx];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIdx((prev) => prev + newDirection);
  };

  // Safe Non-Passive Wheel Interceptor (Runs on laptop & desktop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelBuffer = 0;
    let timer = null;

    const handleWheelEvent = (e) => {
      if (window.innerWidth < 1024) return;

      wheelBuffer += e.deltaY;
      clearTimeout(timer);
      timer = setTimeout(() => {
        wheelBuffer = 0;
      }, 150);

      // Downward Wheel
      if (wheelBuffer > 35) {
        if (activeIdx < PROJECTS.length - 1) {
          e.preventDefault();
          e.stopPropagation();

          if (!isThrottled.current) {
            isThrottled.current = true;
            paginate(1);
            wheelBuffer = 0;
            setTimeout(() => {
              isThrottled.current = false;
            }, 600);
          }
        }
      }
      // Upward Wheel
      else if (wheelBuffer < -35) {
        if (activeIdx > 0) {
          e.preventDefault();
          e.stopPropagation();

          if (!isThrottled.current) {
            isThrottled.current = true;
            paginate(-1);
            wheelBuffer = 0;
            setTimeout(() => {
              isThrottled.current = false;
            }, 600);
          }
        }
      }
    };

    el.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheelEvent);
      clearTimeout(timer);
    };
  }, [activeIdx]);

  // Mobile Horizontal Touch Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0 && activeIdx < PROJECTS.length - 1) {
        setDirection(1);
        setActiveIdx((prev) => prev + 1);
      } else if (diffX < 0 && activeIdx > 0) {
        setDirection(-1);
        setActiveIdx((prev) => prev - 1);
      }
    }
  };

  // Subtle Motion Variants
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
      transition: {
        y: { duration: 0.25, ease: "easeInOut" },
        filter: { duration: 0.22 },
        opacity: { duration: 0.18 },
      },
    }),
  };

  return (
    <section
      id="projects"
      className="w-full pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none relative z-10"
    >
      {/* Clean Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2">
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
        {/* Ambient Glow */}
        <div
          className="absolute w-80 h-80 rounded-full blur-[110px] pointer-events-none transition-all duration-700 -z-10"
          style={{ background: currentProject.glowColor }}
        />

        {/* Morphing Project Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/85 dark:bg-[#080a14]/95 border border-slate-300/80 dark:border-white/15 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Left Column: Details & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${currentProject.badgeColor}`}>
                      {currentProject.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      PROJECT {currentProject.step} / 05
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-600 dark:text-cyan-400 mt-1 mb-3">
                    {currentProject.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {currentProject.description}
                  </p>

                  {/* Engineering Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 my-5 pt-4 border-t border-slate-200 dark:border-white/10">
                    {currentProject.metrics.map((m) => (
                      <div key={m.label} className="p-2 sm:p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300/60 dark:border-white/10 text-left">
                        <p className="text-[8.5px] font-mono text-slate-500 dark:text-slate-400 uppercase">{m.label}</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-mono font-bold text-xs shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>VISIT LIVE PORTAL</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  {currentProject.videoUrl && (
                    <button
                      onClick={() =>
                        setModalMedia({
                          type: "video",
                          url: currentProject.videoUrl,
                          title: currentProject.title,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-mono font-bold text-xs border border-pink-500/30 transition-all cursor-pointer"
                    >
                      <span>WATCH DEMO ▶</span>
                    </button>
                  )}

                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-mono font-semibold text-xs border border-slate-300 dark:border-white/15 transition-all"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Borderless 3D Floating Carousel */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <Interactive3DCylinder
                  slides={currentProject.slides}
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

      {/* Unified Stepper Indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > activeIdx ? 1 : -1);
              setActiveIdx(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIdx
                ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                : "w-2 bg-slate-300 dark:bg-white/20"
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
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl flex flex-col cursor-default"
            >
              <div className="p-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase truncate pr-4">
                  {modalMedia.title}
                </span>
                <button
                  onClick={() => setModalMedia(null)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-mono cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex-1 overflow-auto flex items-center justify-center bg-black/50 p-2">
                {modalMedia.type === "image" ? (
                  <img src={modalMedia.url} alt="Fullscreen View" className="max-w-full max-h-[70vh] object-contain rounded-xl" />
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
    </section>
  );
}