import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =========================================================================
// 1. ENHANCED CINEMATIC SOUND ENGINE
// =========================================================================
const playFuturisticLaunchSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [220, 440, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 2.8, ctx.currentTime + 0.6);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1.4);

      gain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    });
  } catch {
    // Audio fallback
  }
};

const playCrystalSuccessChime = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [1318.51, 1661.22, 1975.53, 2349.32, 2959.96];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

      gain.gain.setValueAtTime(0.14, ctx.currentTime + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + i * 0.05 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.05);
      osc.stop(ctx.currentTime + i * 0.05 + 1.2);
    });
  } catch {
    // Audio fallback
  }
};

// =========================================================================
// 2. SOCIAL & WHATSAPP CHANNELS (MAIL REMOVED)
// =========================================================================
const WHATSAPP_NUM = import.meta.env.VITE_WHATSAPP_NUMBER || "918962944457";
const WHATSAPP_PREFILL_TEXT = encodeURIComponent("Hey Ankur! I reviewed your portfolio and would like to discuss a project.");

const SOCIAL_LINKS = [
  {
    name: "WhatsApp Direct",
    handle: "+91 8962944457",
    url: `https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_PREFILL_TEXT}`,
    icon: (
      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "ankur6691",
    url: "https://www.linkedin.com/in/ankur6691/",
    icon: (
      <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "ankur6691",
    url: "https://github.com/ankur6691",
    icon: (
      <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

// =========================================================================
// 3. 3D QUANTUM MAIL VAULT
// =========================================================================
function Quantum3DMailVault({ isAbsorbing, hasDelivered, triggerShockwave }) {
  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center select-none min-h-[140px]" style={{ perspective: "900px" }}>
      {triggerShockwave && (
        <>
          <motion.div
            initial={{ scale: 0.4, opacity: 1 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-24 h-24 rounded-full border-2 border-cyan-400 pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 3.4, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute w-24 h-24 rounded-full border border-pink-500 pointer-events-none"
          />
        </>
      )}

      <motion.div
        animate={{
          rotateY: [0, 360],
          y: isAbsorbing ? [0, -12, 0] : [-4, 4, -4],
          scale: isAbsorbing ? [1, 1.25, 1.08] : 1,
        }}
        transition={{
          rotateY: { repeat: Infinity, duration: isAbsorbing ? 3 : 12, ease: "linear" },
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          scale: { duration: 0.8 },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center"
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/40 via-purple-500/40 to-pink-500/40 blur-xl transition-all duration-700 ${isAbsorbing ? "scale-160 opacity-100" : "opacity-60"}`} />

        <div className="relative w-full h-full rounded-2xl bg-[#0b0f19]/90 border border-cyan-400/50 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: isAbsorbing ? [1, 1.6, 1.1] : [1, 1.1, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 3.5, ease: "linear" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 blur-[6px] opacity-80"
          />

          <div className="absolute inset-0 flex items-center justify-center text-white z-10">
            {hasDelivered ? (
              <motion.div initial={{ scale: 0, rotate: -25 }} animate={{ scale: 1, rotate: 0 }} className="text-emerald-400 flex flex-col items-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[8px] font-mono font-black mt-0.5 text-emerald-300">DELIVERED</span>
              </motion.div>
            ) : (
              <svg className="w-6 h-6 text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </div>
        </div>
      </motion.div>

      <span className="mt-2 text-[9px] font-mono text-cyan-400/80 tracking-widest uppercase">
        {isAbsorbing ? "✦ TRANSMITTING REAL SHARD..." : "3D SPATIAL MAIL VAULT"}
      </span>
    </div>
  );
}

// =========================================================================
// 4. MAIN CONTACT COMPONENT WITH REAL NODEMAILER INTEGRATION
// =========================================================================
export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [flyingPayload, setFlyingPayload] = useState(null);
  const [isAbsorbing, setIsAbsorbing] = useState(false);
  const [triggerShockwave, setTriggerShockwave] = useState(false);
  const [hasDelivered, setHasDelivered] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGenieSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSending) return;

    setIsSending(true);
    playFuturisticLaunchSound();
    setFlyingPayload({ ...formData });

    // Send payload to backend serverless API
    const sendMailPromise = fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setTimeout(() => {
      setIsAbsorbing(true);
    }, 1050);

    try {
      const response = await sendMailPromise;
      if (!response.ok) {
        console.warn("Server responded with error status:", response.status);
      }
    } catch (err) {
      console.error("Transmission network error:", err);
    }

    setTimeout(() => {
      playCrystalSuccessChime();
      setTriggerShockwave(true);
      setFlyingPayload(null);
      setIsAbsorbing(false);
      setHasDelivered(true);
      setIsSending(false);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setTriggerShockwave(false);
      }, 1000);

      setTimeout(() => {
        setHasDelivered(false);
      }, 4500);
    }, 2150);
  };

  return (
    <section id="contact" className="w-full pt-8 pb-16 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto select-none relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-purple-600/15 via-cyan-500/15 to-pink-500/15 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-1.5">
          // 05. TRANSMISSION GATEWAY
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">
          GET IN <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">TOUCH</span>
        </h2>
      </div>

      {/* Balanced Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch max-w-5xl mx-auto relative">
        
        {/* Left Column: 3D Vault & Channels */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-[#080a14]/95 border border-slate-300/80 dark:border-white/15 backdrop-blur-3xl shadow-xl relative overflow-hidden">
          <Quantum3DMailVault
            isAbsorbing={isAbsorbing}
            hasDelivered={hasDelivered}
            triggerShockwave={triggerShockwave}
          />

          <div className="w-full space-y-2 mt-4">
            <span className="block text-[8.5px] font-mono text-slate-400 uppercase tracking-widest text-center">
              ✦ DIRECT DIGITAL CHANNELS ✦
            </span>

            {SOCIAL_LINKS.map((item) => (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-between hover:border-cyan-400/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-900 dark:text-white font-mono leading-none">{item.name}</p>
                    <p className="text-[9.5px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{item.handle}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all">↗</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Equal Height Form */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-[#080a14]/95 border border-slate-300/80 dark:border-white/15 backdrop-blur-3xl shadow-xl relative overflow-visible">
          
          {/* Holographic Shard Flight Trajectory */}
          <AnimatePresence>
            {flyingPayload && (
              <motion.div
                initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                animate={
                  isMobile
                    ? {
                        x: [0, 30, -20, 0],
                        y: [0, -130, -280, -410],
                        scale: [1, 0.8, 0.35, 0.02],
                        rotate: [0, 8, -8, 270],
                        opacity: [1, 1, 0.85, 0],
                      }
                    : {
                        x: [0, -120, -290, -485],
                        y: [0, -45, -20, -55],
                        scale: [1, 0.85, 0.35, 0.02],
                        rotate: [0, -12, 10, -360],
                        opacity: [1, 1, 0.85, 0],
                      }
                }
                transition={{ duration: 2.15, ease: [0.25, 0.8, 0.25, 1] }}
                className="absolute inset-x-6 top-8 z-50 p-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 border border-white/50 shadow-[0_0_45px_rgba(6,182,212,0.9)] text-white pointer-events-none"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span className="text-[9.5px] font-mono font-black tracking-widest uppercase">TRANSMITTING QUANTUM SHARD...</span>
                </div>
                <p className="text-xs font-black font-mono truncate">{flyingPayload.name} ({flyingPayload.email})</p>
                <p className="text-[10px] truncate opacity-90 font-mono mt-0.5">{flyingPayload.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleGenieSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
            <div>
              <label className="block text-[9.5px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                YOUR NAME / CALLSIGN:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ankur / Client Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-[9.5px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                RETURN EMAIL:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-[9.5px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                MESSAGE / PROJECT BRIEF:
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build something high-impact..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isAbsorbing || !!flyingPayload || isSending}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black dark:text-white font-mono font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50"
            >
              <span>{isSending ? "✦ TRANSMITTING..." : "✦ CAST MESSAGE INTO MAGIC VAULT ✦"}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </form>

        </div>

      </div>
    </section>
  );
}