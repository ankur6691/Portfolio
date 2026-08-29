import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const email = "ankur@example.com"; // Replace with your actual email

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 relative z-10 max-w-5xl mx-auto">
      <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-b from-white/[0.04] to-purple-950/20 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            // Direct Gateway
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            INITIATE <span className="text-purple-400">COMMS.</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Open for software engineering roles, high-impact freelance builds, and technical collaborations.
          </p>
        </div>

        {/* Form Terminal */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <div>
            <input
              required
              type="text"
              placeholder="Your Name / Organization"
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 outline-none text-white text-sm transition-all"
            />
          </div>
          <div>
            <input
              required
              type="email"
              placeholder="Your Email Address"
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 outline-none text-white text-sm transition-all"
            />
          </div>
          <div>
            <textarea
              required
              rows={4}
              placeholder="Message details or project brief..."
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 outline-none text-white text-sm transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all"
          >
            {formSubmitted ? "Transmission Sent Successfully ✓" : "Transmit Message"}
          </button>
        </form>

        {/* Quick Clipboard & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pt-8 border-t border-white/10">
          <button
            onClick={handleCopyEmail}
            className="px-5 py-2 rounded-full bg-white/5 border border-white/15 hover:border-white/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
          >
            {copied ? "✓ Copied to Clipboard" : `Copy Email (${email})`}
          </button>
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-slate-300 hover:text-white hover:border-purple-400 transition-all"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-16 text-center text-xs font-mono text-slate-600">
        ANKUR • ARCHITECTED WITH REACT 19, THREE.JS & MATTER.JS
      </footer>
    </section>
  );
}