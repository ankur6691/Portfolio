import React from 'react';
import { motion } from 'framer-motion';

// 🔥 FIX: Sabhi tags ko poori screen par spread kiya hai (left, top alag-alag hain)
// 🔥 FIX: Speed ko 20-30 seconds ke beech rakha hai taaki ekdum Zero-Gravity feel aaye
// 🔥 FIX: Har tag ka x aur y movement custom hai taaki sab alag disha mein jaayen
const techSkills = [
  { name: "React", top: "15%", left: "10%", size: 1.1, speed: 25, color: "from-cyan-400 to-blue-500", move: { x: [0, 30, -20, 0], y: [0, -30, 20, 0] } },
  { name: "Node.js", top: "65%", left: "12%", size: 1, speed: 28, color: "from-green-400 to-emerald-600", move: { x: [0, -30, 20, 0], y: [0, 30, -20, 0] } },
  { name: "Next.js", top: "25%", left: "45%", size: 0.9, speed: 22, color: "from-gray-300 to-white", move: { x: [0, 20, -30, 0], y: [0, -20, 30, 0] } },
  { name: "Three.js", top: "75%", left: "35%", size: 1, speed: 30, color: "from-pink-500 to-purple-600", move: { x: [0, -40, 20, 0], y: [0, -20, 40, 0] } },
  { name: "Tailwind", top: "20%", left: "75%", size: 1.1, speed: 24, color: "from-teal-400 to-cyan-500", move: { x: [0, 30, -30, 0], y: [0, 20, -20, 0] } },
  { name: "MongoDB", top: "55%", left: "80%", size: 1, speed: 26, color: "from-green-500 to-lime-600", move: { x: [0, -20, 40, 0], y: [0, 30, -30, 0] } },
  { name: "Express.js", top: "85%", left: "60%", size: 1.2, speed: 29, color: "from-gray-400 to-gray-600", move: { x: [0, 40, -20, 0], y: [0, -40, 20, 0] } },
  { name: "C++ / DSA", top: "40%", left: "25%", size: 0.9, speed: 23, color: "from-indigo-500 to-purple-500", move: { x: [0, -30, 20, 0], y: [0, -20, 30, 0] } },
  { name: "HTML/CSS", top: "85%", left: "20%", size: 0.95, speed: 27, color: "from-orange-400 to-red-500", move: { x: [0, 20, -40, 0], y: [0, 20, -20, 0] } },
  { name: "AI Tools", top: "45%", left: "65%", size: 0.9, speed: 21, color: "from-purple-400 to-pink-500", move: { x: [0, -20, 30, 0], y: [0, 30, -20, 0] } },
  { name: "CapCut", top: "10%", left: "40%", size: 1.05, speed: 25, color: "from-gray-600 to-gray-800", move: { x: [0, 30, -20, 0], y: [0, 20, -40, 0] } }
];

export default function About() {
  return (
    <section className="w-full h-full flex items-center justify-center bg-transparent px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
        
        {/* ================= LEFT SIDE: TEXT ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6 z-10"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            MY <span className="text-purple-500">JOURNEY.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-xl">
            I am a passionate Full Stack Developer who loves building immersive digital experiences. My focus is on writing clean, scalable code while creating smooth animations and 3D interactions.
          </p>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-xl">
            From modern AI Tools to video editing with CapCut, I constantly explore new technologies to level up my digital creations.
          </p>
        </motion.div>

        {/* ================= RIGHT SIDE: FLOATING TECH BELT ================= */}
        <div className="relative h-[400px] lg:h-[80vh] w-full block z-0 mt-8 lg:mt-0 overflow-hidden">
          
          {/* Ambient center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          {techSkills.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: tech.size }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              
              // Custom movement path applied here
              animate={{
                x: tech.move.x,
                y: tech.move.y,
              }}
              transition={{
                repeat: Infinity,
                duration: tech.speed,
                ease: "linear" // Linear se ekdum constant aur bina atke flow karega
              }}
              style={{
                position: 'absolute',
                top: tech.top,
                left: tech.left,
                willChange: 'transform'
              }}
              whileHover={{ 
                scale: 1.15, 
                zIndex: 50,
                transition: { duration: 0.2 }
              }}
              className="cursor-pointer select-none"
            >
              <div className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono text-sm md:text-base tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/40 hover:bg-white/10 transition-colors duration-300">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${tech.color} font-bold mr-2 text-lg md:text-xl leading-none`}>#</span>
                <span className="leading-none pt-0.5">{tech.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}