import React from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  // 1. MAIN SHOWSTOPPER (Left side - Spans 2 rows & 2 columns)
  {
    title: "Women Safety AI Surveillance",
    description: "An advanced security system featuring live location tracking, instant SOS triggers, and automated camera access for real-time evidence logging.",
    tags: ["React.js", "Node.js", "Tailwind CSS", "Socket.io", "WebRTC"],
    color: "from-red-500/10 via-purple-600/10 to-transparent",
    hoverBorder: "group-hover:border-red-500/50",
    badge: "Featured Showstopper",
    status: "Private Git",
    gridClass: "md:col-span-2 row-span-2",
    isFeatured: true 
  },
  // 2. ADVOCATE WEBSITE (Top Right - Row 1)
  {
    title: "Advocate Website",
    description: "A sleek, professional freelance web application designed for legal firms, featuring secure client booking systems.",
    tags: ["React.js", "MySQL", "Tailwind CSS"],
    color: "from-amber-500/10 via-orange-600/10 to-transparent",
    hoverBorder: "group-hover:border-amber-500/50",
    badge: "Freelance Client Work",
    status: "Private Git",
    gridClass: "md:col-span-1 row-span-1",
    isFeatured: false
  },
  // 3. CHATIFY (Middle Right - Row 2)
  {
    title: "Chatify",
    description: "A full-featured real-time chat application with robust user authentication, contact synchronization, and instant messaging.",
    tags: ["MERN Stack", "Socket.io", "Context API"],
    color: "from-green-500/10 via-emerald-600/10 to-transparent",
    hoverBorder: "group-hover:border-green-500/50",
    badge: "Real-time Messaging",
    status: "Private Repo",
    gridClass: "md:col-span-1 row-span-1",
    isFeatured: false
  },
  // 4. COSMIC AI (Bottom Left - Row 3, Spans 2 Columns)
  {
    title: "Cosmic AI Chatbot",
    description: "An intelligent, context-aware conversational AI assistant integrated with LLM APIs, handling complex state management.",
    tags: ["React", "Node.js", "OpenAI API"],
    color: "from-blue-500/10 via-indigo-600/10 to-transparent",
    hoverBorder: "group-hover:border-blue-500/50",
    badge: "GenAI",
    status: "Local Dev",
    gridClass: "md:col-span-2 row-span-1",
    isFeatured: false
  },
  // 5. WEATHER FORECASTING (Bottom Right - Row 3)
  {
    title: "Weather Forecasting",
    description: "Real-time weather tracking application providing accurate forecasts, dynamic climate visualizations, and location-based data.",
    tags: ["React.js", "Weather API", "Tailwind CSS"],
    color: "from-cyan-500/10 via-sky-600/10 to-transparent",
    hoverBorder: "group-hover:border-cyan-500/50",
    badge: "API Integration",
    status: "Public Repo",
    gridClass: "md:col-span-1 row-span-1",
    isFeatured: false
  }
];

export default function Projects() {
  return (
    // FIX 1: Scrollbar classes (overflow-y-auto, no-scrollbar) hata di hain. Ab ye naturally niche flow karega.
      <section className="w-full min-h-full bg-transparent pt-28 pb-20 px-6 md:px-12 lg:px-20 flex flex-col justify-start relative z-10">      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Section Heading */}
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight"
          >
            FEATURED <span className="text-purple-500">WORK.</span>
          </motion.h2>
        </div>

        {/* BENTO GRID */}
        {/* FIX 2: auto-rows-[240px] rakha hai taaki 3 rows perfectly shape lein. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-min md:auto-rows-[240px]">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`group relative rounded-3xl border border-white/5 p-5 md:p-6 flex flex-col bg-gradient-to-br ${project.color} bg-[#050012]/80 backdrop-blur-xl transition-all duration-300 overflow-hidden cursor-pointer ${project.hoverBorder} ${project.gridClass} shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]`}
            >
              {/* Top Badges */}
              <div className="flex justify-between items-start relative z-10 w-full mb-4">
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono font-medium text-white/80 tracking-wider uppercase group-hover:bg-white/10 transition-colors">
                  {project.badge}
                </span>
                <span className="text-[10px] md:text-xs font-mono font-semibold text-gray-500 tracking-wide hidden sm:block">
                  {project.status}
                </span>
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* SPECIAL UI for Women Safety */}
              {project.isFeatured && (
                <div className="flex-1 w-full mt-4 mb-4 rounded-xl bg-black/60 border border-white/5 p-3 flex flex-col justify-center relative overflow-hidden min-h-[90px]">
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                  <div className="font-mono text-[10px] md:text-xs space-y-1.5 relative z-10">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }} className="text-purple-400">
                      &gt; SYSTEM_START: AI Surveillance...
                    </motion.div>
                    <div className="text-gray-400">&gt; GPS: Connected (Lat: 22.71, Long: 75.85)</div>
                    <div className="text-gray-400">&gt; CAMERA_FEED: Active</div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }} className="text-red-400 font-bold mt-1">
                      &gt; SOS_TRIGGER: ARMED 🔴
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 relative z-10 w-full mt-auto pt-4">
                {project.tags.slice(0, 3).map((tag, tIndex) => (
                  <span 
                    key={tIndex} 
                    className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 group-hover:border-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}