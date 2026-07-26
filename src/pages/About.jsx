import React from 'react';
import { motion } from 'framer-motion';

const techSkills = [
  { name: "React", top: "15%", left: "18%", size: 1.1, speed: 3.5, color: "from-cyan-400 to-blue-500", move: { x: [0, 25, -15, 0], y: [0, -25, 15, 0] } },
  { name: "Node.js", top: "62%", left: "15%", size: 1.05, speed: 4.2, color: "from-green-400 to-emerald-500", move: { x: [0, -25, 20, 0], y: [0, 25, -20, 0] } },
  { name: "Next.js", top: "22%", left: "45%", size: 1, speed: 3.8, color: "from-gray-200 to-white", move: { x: [0, 20, -25, 0], y: [0, -20, 25, 0] } },
  { name: "Three.js", top: "72%", left: "38%", size: 1.1, speed: 4.5, color: "from-pink-500 to-purple-500", move: { x: [0, -30, 20, 0], y: [0, -25, 25, 0] } },
  { name: "Tailwind", top: "18%", left: "68%", size: 1.1, speed: 3.6, color: "from-teal-300 to-cyan-400", move: { x: [0, 25, -25, 0], y: [0, 20, -20, 0] } },
  { name: "MongoDB", top: "52%", left: "70%", size: 1.05, speed: 4, color: "from-green-400 to-lime-500", move: { x: [0, -20, 25, 0], y: [0, 25, -25, 0] } },
  { name: "Express.js", top: "76%", left: "58%", size: 1.15, speed: 4.6, color: "from-gray-300 to-gray-500", move: { x: [0, 25, -20, 0], y: [0, -25, 20, 0] } },
  { name: "C++ / DSA", top: "38%", left: "22%", size: 1, speed: 3.4, color: "from-indigo-400 to-purple-400", move: { x: [0, -25, 20, 0], y: [0, -20, 25, 0] } },
  { name: "HTML/CSS", top: "78%", left: "22%", size: 1, speed: 4.1, color: "from-orange-400 to-red-500", move: { x: [0, 20, -25, 0], y: [0, 20, -20, 0] } },
  { name: "AI Tools", top: "42%", left: "52%", size: 1.05, speed: 3.2, color: "from-purple-300 to-pink-400", move: { x: [0, -20, 25, 0], y: [0, 25, -20, 0] } },
  { name: "CapCut", top: "10%", left: "38%", size: 1.05, speed: 3.7, color: "from-gray-400 to-slate-200", move: { x: [0, 25, -20, 0], y: [0, 20, -25, 0] } }
];

export default function About() {
  return (
    /* 🔥 FIX: Mobile pe h-auto + py-10 taaki Projects aur About ke beech Gap na rahe */
    <section className="w-full h-auto md:min-h-screen flex items-center justify-center bg-transparent px-5 sm:px-8 md:px-12 lg:px-20 py-10 lg:py-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6 z-10 transform-gpu"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight">
            MY <span className="text-purple-500">JOURNEY.</span>
          </h2>
          
          <p 
            className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-xl text-justify tracking-wide"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            I am a passionate Full Stack Developer who loves building immersive digital experiences. My focus is on writing clean, scalable code while creating smooth animations and interactive systems.
          </p>
          <p 
            className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-xl text-justify tracking-wide"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            From modern AI Tools to video editing with CapCut, I constantly explore new technologies to level up my digital creations.
          </p>
        </motion.div>

        <div className="block lg:hidden z-10 w-full mt-4">
          <div className="flex flex-wrap gap-2.5 justify-start sm:justify-center">
            {techSkills.map((tech, index) => (
              <motion.div 
                key={index}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-[#0d0722]/90 border border-purple-500/40 text-white font-mono text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${tech.color} font-bold mr-1.5`}>#</span>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative h-[75vh] w-full z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-purple-600/08 rounded-full blur-[60px] pointer-events-none" />

          {techSkills.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: tech.size }} 
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              animate={{
                x: tech.move.x,
                y: tech.move.y,
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: tech.speed,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: tech.top,
                left: tech.left,
                willChange: 'transform'
              }}
              whileHover={{ 
                scale: 1.25, 
                zIndex: 50,
                transition: { duration: 0.15 }
              }}
              className="cursor-pointer select-none transform-gpu"
            >
              <div className="flex items-center justify-center px-4.5 py-2 rounded-full bg-[#0d0722]/90 border border-purple-500/30 text-white font-mono text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-200 backdrop-blur-md">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${tech.color} font-extrabold mr-1.5 text-base leading-none`}>#</span>
                <span className="leading-none pt-0.5 text-white">{tech.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}