import React from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    title: "Women Safety AI Surveillance",
    description: "An advanced security system featuring live location tracking, instant SOS triggers, and automated camera access for real-time evidence logging.",
    tags: ["React.js", "Node.js", "Tailwind CSS", "Socket.io", "WebRTC"],
    color: "from-red-500/15 via-purple-600/10 to-transparent",
    hoverBorder: "group-hover:border-red-500/60",
    badge: "Featured Showstopper",
    status: "Private Git",
    gridClass: "md:col-span-2 md:row-span-2",
    isFeatured: true,
    github: "https://github.com/ankur6691",
    live: "#"
  },
  {
    title: "Advocate Website",
    description: "A sleek, professional freelance web application designed for legal firms, featuring secure client booking systems and case tracking workflows.",
    tags: ["React.js", "MySQL", "Tailwind CSS"],
    color: "from-amber-500/15 via-orange-600/10 to-transparent",
    hoverBorder: "group-hover:border-amber-500/60",
    badge: "Freelance Client Work",
    status: "Private Git",
    gridClass: "md:col-span-1 md:row-span-1",
    isFeatured: false,
    github: "https://github.com/ankur6691",
    live: "#"
  },
  {
    title: "Chatify",
    description: "A full-featured real-time chat application with robust user authentication, contact synchronization, and instant messaging architecture.",
    tags: ["MERN Stack", "Socket.io", "Context API"],
    color: "from-green-500/15 via-emerald-600/10 to-transparent",
    hoverBorder: "group-hover:border-green-500/60",
    badge: "Real-time Messaging",
    status: "Private Repo",
    gridClass: "md:col-span-1 md:row-span-1",
    isFeatured: false,
    github: "https://github.com/ankur6691",
    live: "#"
  },
  {
    title: "Cosmic AI Chatbot",
    description: "An intelligent, context-aware conversational AI assistant integrated with LLM APIs, handling complex state management and rich formatting.",
    tags: ["React", "Node.js", "OpenAI API"],
    color: "from-blue-500/15 via-indigo-600/10 to-transparent",
    hoverBorder: "group-hover:border-blue-500/60",
    badge: "GenAI",
    status: "Local Dev",
    gridClass: "md:col-span-2 md:row-span-1",
    isFeatured: false,
    github: "https://github.com/ankur6691",
    live: "#"
  },
  {
    title: "Weather Forecasting",
    description: "Real-time weather tracking application providing accurate forecasts, dynamic climate visualizations, and location-based data integration.",
    tags: ["React.js", "Weather API", "Tailwind CSS"],
    color: "from-cyan-500/15 via-sky-600/10 to-transparent",
    hoverBorder: "group-hover:border-cyan-500/60",
    badge: "API Integration",
    status: "Public Repo",
    gridClass: "md:col-span-1 md:row-span-1",
    isFeatured: false,
    github: "https://github.com/ankur6691",
    live: "#"
  }
];

export default function Projects() {
  return (
    /* 🔥 FIX: Mobile par py-10 (no min-h-screen), Desktop par md:min-h-screen aur py-20 */
    <section id="projects" className="w-full h-auto md:min-h-screen bg-transparent py-10 md:py-20 px-5 sm:px-8 md:px-12 lg:px-20 flex flex-col justify-start relative z-10">      
      
      <div className="absolute top-10 left-1/4 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-purple-600/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        
        <div className="space-y-1">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
          >
            FEATURED <span className="text-purple-500">WORK.</span>
          </motion.h2>
        </div>

        {/* BENTO GRID - Mobile pe natural auto-height, desktop pe row height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl sm:rounded-3xl border border-white/10 p-5 flex flex-col justify-between bg-gradient-to-br ${project.color} bg-[#060114]/90 backdrop-blur-2xl transition-all duration-300 overflow-hidden cursor-pointer ${project.hoverBorder} ${project.gridClass} shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transform-gpu`}
            >
              <div className="flex justify-between items-center relative z-20 w-full mb-3">
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-mono font-medium text-purple-200 tracking-wider uppercase">
                  {project.badge}
                </span>

                <div className="flex items-center gap-2">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 transition-all"
                  >
                    <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>

              <div className="relative z-10 my-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2">
                  {project.title}
                </h3>
                
                <p 
                  className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed text-justify tracking-wide"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  {project.description}
                </p>
              </div>

              {project.isFeatured && (
                <div className="w-full my-2 rounded-xl bg-black/80 border border-purple-500/20 p-3 flex flex-col justify-center relative overflow-hidden">
                  <div className="font-mono text-[10px] sm:text-xs space-y-1 relative z-10">
                    <div className="flex items-center justify-between text-purple-400 font-semibold border-b border-white/10 pb-1 mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                        LIVE SURVEILLANCE FEED
                      </span>
                    </div>
                    <div className="text-gray-400">&gt; GPS_MODULE: Connected (Lat: 22.71, Long: 75.85)</div>
                    <div className="text-gray-400">&gt; CAMERA_ACCESS: Stream Active</div>
                    <div className="text-red-400 font-bold pt-0.5">&gt; SOS_TRIGGER: ARMED & READY 🔴</div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 relative z-10 w-full pt-2 mt-auto">
                {project.tags.map((tag, tIndex) => (
                  <span 
                    key={tIndex} 
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}