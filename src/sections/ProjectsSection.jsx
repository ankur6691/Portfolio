import { motion } from "framer-motion";
import ProjectsCarousel3D from "../components/ProjectsCarousel3D";

const DETAILED_PROJECTS = [
  {
    id: "01",
    title: "Women Safety AI Surveillance",
    desc: "Advanced security application featuring real-time GPS tracking, automated SOS event triggers, and cloud logging.",
    tech: ["React.js", "Node.js", "Computer Vision API", "Tailwind CSS"],
    live: "https://github.com",
    github: "https://github.com",
    badge: "Featured Showstopper",
  },
  {
    id: "02",
    title: "Advocate & Legal Counsel Portal",
    desc: "Professional production platform built for legal firms with case management and client scheduling workflows.",
    tech: ["React.js", "MySQL", "Express", "Tailwind CSS"],
    live: "https://github.com",
    github: "https://github.com",
    badge: "Client Production",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2"
        >
          // Interactive Showcase
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase"
        >
          FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">WORKS.</span>
        </motion.h2>
        <p className="text-slate-400 text-sm mt-3">
          Explore interactive project cards in a 3D cylindrical ring or review detailed architecture breakdowns below.
        </p>
      </div>

      {/* 3D Cylindrical Revolving Ring Showcase */}
      <div className="my-8">
        <ProjectsCarousel3D />
      </div>

      {/* Detailed Grid Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {DETAILED_PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  {project.badge}
                </span>
                <span className="text-slate-600 font-mono text-sm">{project.id}</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full transition-all"
              >
                Live Demo ↗
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all"
              >
                Repository ↗
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}