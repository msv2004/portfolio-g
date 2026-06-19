'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #22d3ee 100%)',
      }}
    />
  );
}
