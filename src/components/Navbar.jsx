import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const DOCK_ITEMS = [
  {
    id: "hero",
    label: "Home",
    href: "#hero",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About Me",
    href: "#about",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Tech Stack",
    href: "#skills",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "showcase",
    label: "3D Carousel",
    href: "#showcase",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

// Interactive 3D Brand Logo
function BrandLogo3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["18deg", "-18deg"]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-18deg", "18deg"]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "600px" }} className="pointer-events-auto">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="cursor-pointer px-5 py-2 rounded-2xl bg-white/70 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/15 backdrop-blur-2xl shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group transition-all"
        onClick={() => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })}
      >
        <div style={{ transform: "translateZ(20px)" }} className="flex items-center gap-1.5 font-mono">
          <span className="text-sm font-black tracking-widest bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-500 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all">
            ANKUR
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Magnification Dock Item
function DockItem({ mouseX, item, scrollTo }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-130, 0, 130], [42, 60, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 16 });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={() => scrollTo(item.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-xl bg-slate-200/80 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/10 hover:border-cyan-500 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white shadow-sm dark:shadow-md backdrop-blur-xl transition-colors active:scale-90 group"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: -42, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.8 }}
            className="absolute px-3 py-1 rounded-md bg-slate-900/90 dark:bg-black/90 border border-white/20 text-[10px] font-mono text-white shadow-2xl pointer-events-none whitespace-nowrap z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
        {item.icon}
      </div>

      <span className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-500/60 dark:bg-cyan-400/50 group-hover:bg-cyan-400 group-hover:shadow-[0_0_6px_#22d3ee] transition-all" />
    </motion.button>
  );
}

// Animated Theme Switcher
function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200/80 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/10 hover:border-purple-400 text-amber-500 dark:text-amber-400 backdrop-blur-xl transition-all active:scale-90"
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? (
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}

export default function Navbar() {
  const mouseX = useMotionValue(Infinity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("portfolio-theme") !== "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  }, [isDark]);

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 max-w-7xl mx-auto pointer-events-none">
        
        {/* 3D Brand Logo */}
        <BrandLogo3D />

        {/* Spacious macOS Dock */}
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="hidden md:flex pointer-events-auto items-end gap-3 px-5 py-2.5 rounded-3xl bg-white/80 dark:bg-[#090a14]/80 border border-slate-300/80 dark:border-white/15 backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-300"
        >
          {DOCK_ITEMS.map((item) => (
            <DockItem key={item.id} mouseX={mouseX} item={item} scrollTo={scrollTo} />
          ))}

          <div className="w-[1px] h-7 bg-slate-300 dark:bg-white/15 my-auto mx-1" />

          <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark((prev) => !prev)} />
        </motion.nav>

        {/* Right CTA */}
        <div className="hidden md:block pointer-events-auto">
          <button
            onClick={() => scrollTo("#contact")}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/20 active:scale-95 transition-all"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto p-2.5 rounded-2xl bg-white/80 dark:bg-black/60 border border-slate-300 dark:border-white/15 backdrop-blur-xl text-slate-800 dark:text-white focus:outline-none shadow-md"
        >
          <div className="w-5 flex flex-col items-end gap-1.5">
            <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
            <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? "opacity-0" : "w-3.5"}`} />
            <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-4"}`} />
          </div>
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-0 z-40 bg-white/98 dark:bg-[#06060c]/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-6 md:hidden px-6"
          >
            {DOCK_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className="flex items-center gap-4 text-xl font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-500 transition-colors"
              >
                <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-600 dark:text-cyan-400">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}

            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm font-mono text-slate-600 dark:text-slate-400">Theme:</span>
              <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark((prev) => !prev)} />
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="mt-4 w-full max-w-xs py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-sm uppercase tracking-wider shadow-xl"
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}