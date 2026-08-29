import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import KineticMarquee from "./components/KineticMarquee";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import Cylindrical3DRing from "./sections/ShowcaseSection";
import ParticleTunnel from "./components/ParticleTunnel";


export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#f1f5f9] text-slate-900 dark:bg-[#06060c] dark:text-slate-100 min-h-screen relative overflow-x-hidden transition-colors duration-300 selection:bg-purple-500 selection:text-white">
      {/* <ParticleTunnel /> */}
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        {/* <KineticMarquee /> */}
        <AboutSection />
        <SkillsSection />
        <Cylindrical3DRing />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}