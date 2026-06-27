import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import StackSection from './components/StackSection';

export default function App() {
  return (
    <BrowserRouter>
      <main className="relative w-full bg-[#030014] font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
        
        <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none z-0" />

        <Navbar />

        <div className="relative">
          
          <StackSection index={1} id="home">
            <Home />
          </StackSection>
          
          <StackSection index={2} id="about">
            <About />
          </StackSection>
          
          <StackSection index={3} id="projects">
            <Projects />
          </StackSection>

          {/* 🔥 FIX: Mobile par iska radius hataya aur shadow theek ki taaki gap na dikhe */}
          <div id="contact" className="relative z-[40] bg-[#030014] w-full md:rounded-t-[2rem] shadow-none md:shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <Contact />
          </div>

        </div>
      </main>
    </BrowserRouter>
  );
}