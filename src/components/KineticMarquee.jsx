import { motion } from "framer-motion";

export default function KineticMarquee() {
  return (
    <div className="py-12 overflow-hidden -rotate-2 bg-gradient-to-r from-purple-900/30 via-cyan-900/30 to-purple-900/30 border-y border-white/10 backdrop-blur-sm">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        className="flex whitespace-nowrap gap-10 text-4xl md:text-6xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white/40"
      >
        <span>Full-Stack Architect</span>
        <span>•</span>
        <span>Creative WebGL Developer</span>
        <span>•</span>
        <span>Interactive 3D Systems</span>
        <span>•</span>
        <span>Awwwards Tier Motion</span>
        <span>•</span>
        <span>Full-Stack Architect</span>
        <span>•</span>
        <span>Creative WebGL Developer</span>
      </motion.div>
    </div>
  );
}