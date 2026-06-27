import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Agar kisi button ya link par hover ho raha hai toh cursor thoda bada hoga
      const target = e.target;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border border-purple-500/50 pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-sm bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
      animate={{ 
        x: mousePosition.x - (isHovering ? 30 : 20), 
        y: mousePosition.y - (isHovering ? 30 : 20),
        width: isHovering ? 60 : 40,
        height: isHovering ? 60 : 40
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    >
      <div className={`bg-white rounded-full transition-all duration-300 ${isHovering ? 'w-3 h-3 shadow-[0_0_15px_#fff]' : 'w-2 h-2 shadow-[0_0_10px_#fff]'}`} />
    </motion.div>
  );
}