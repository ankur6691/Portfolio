import { useState, useRef } from "react";
import { motion } from "framer-motion";

const PROJECTS = [
  { id: 1, title: "Women Safety AI", tag: "AI Surveillance", color: "from-purple-600 to-indigo-900" },
  { id: 2, title: "Legal Counsel Hub", tag: "Freelance Client", color: "from-blue-600 to-cyan-900" },
  { id: 3, title: "Fintech 3D Core", tag: "Web3 App", color: "from-emerald-600 to-teal-900" },
  { id: 4, title: "E-Commerce XR", tag: "Three.js Store", color: "from-rose-600 to-pink-900" },
  { id: 5, title: "SaaS Analytics", tag: "Dashboard", color: "from-amber-600 to-orange-900" },
];

export default function ProjectsCarousel3D() {
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const radius = 280; // Distance of cards from center
  const total = PROJECTS.length;
  const angleStep = 360 / total;

  const onPointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const delta = clientX - startX.current;
    setRotation((prev) => prev + delta * 0.4);
    startX.current = clientX;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="w-full h-[520px] flex flex-col items-center justify-center select-none overflow-hidden touch-pan-y"
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      <div style={{ perspective: "1000px" }} className="w-[260px] md:w-[300px] h-[380px]">
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging.current ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="w-full h-full relative"
        >
          {PROJECTS.map((proj, idx) => {
            const angle = idx * angleStep;
            return (
              <div
                key={proj.id}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${proj.color} border border-white/20 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-lg cursor-pointer hover:border-cyan-400 transition-colors`}
              >
                <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-white/70">
                  <span>0{proj.id}</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">{proj.tag}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">{proj.title}</h4>
                  <p className="text-xs text-slate-300 mt-2">Tap to explore live architecture & code.</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mt-6">
        ← Drag or Swipe 360° →
      </p>
    </div>
  );
}