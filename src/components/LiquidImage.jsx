import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LiquidImage({ imageUrl = "/ankur.jpeg" }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse & Touch coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for 3D tilt
  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [10, 90]);

  const handleMove = (clientX, clientY) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) / rect.width - 0.5;
    const relativeY = (clientY - rect.top) / rect.height - 0.5;

    x.set(Math.max(-0.5, Math.min(0.5, relativeX)));
    y.set(Math.max(-0.5, Math.min(0.5, relativeY)));
  };

  const handleMouseMove = (e) => {
    setIsHovered(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) {
      setIsHovered(true);
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleReset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full flex justify-center select-none touch-pan-y">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleReset}
        onTouchStart={() => setIsHovered(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleReset}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-300/80 dark:border-white/10 bg-slate-900 group"
      >
        {/* 1. Crystal Clear Portrait Photo */}
        <motion.img
          src={imageUrl}
          alt="Ankur"
          onError={(e) => {
            e.currentTarget.src = "/ankur.jpg";
          }}
          style={{ transform: "translateZ(10px)" }}
          className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] transition-transform duration-500 ease-out"
        />

        {/* 2. Clean Holographic Glare (Follows Cursor/Touch) */}
        <motion.div
          style={{
            transform: "translateZ(25px)",
            background: isHovered
              ? `radial-gradient(circle 260px at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.25), transparent 75%)`
              : "none",
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        />

        {/* 3. Subtle Edge Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}