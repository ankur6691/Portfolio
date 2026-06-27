import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StackSection({ children, index, id }) {
  const containerRef = useRef(null);

  // 🔥 FIX 1: useSpring hata diya. Ab ye mouse wheel ki raw speed use karega (Zero Lag)
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.4]);
  const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0]);
  const entryScale = useTransform(entryProgress, [0, 1], [0.8, 1]);
  const entryOpacity = useTransform(entryProgress, [0, 1], [0, 1]);

  return (
    <div id={id} ref={containerRef} className="w-full relative h-auto md:h-[120vh]" style={{ zIndex: index }}>
      
      {/* 📱 MOBILE VIEW: Native Scroll */}
      <div className="block md:hidden w-full relative bg-[#030014] overflow-hidden pt-10 pb-10">
        {children}
      </div>

      {/* 💻 DESKTOP VIEW: Fast 3D Stacking */}
      <motion.div
        style={{ 
          scale: exitScale, 
          opacity: exitOpacity, 
          transformOrigin: "center center",
          willChange: "transform, opacity" 
        }}
        className="hidden md:block sticky top-0 h-screen w-full bg-[#000000] rounded-[2rem] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <motion.div 
          style={{ 
            scale: entryScale, 
            opacity: entryOpacity,
            willChange: "transform, opacity" 
          }}
          // 🔥 FIX 2: overscroll-none hata diya taaki scroll qaid na ho aur naturally aage badhe!
          className="w-full h-full relative bg-[#030014] overflow-y-auto no-scrollbar"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}