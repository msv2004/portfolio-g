'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  glowColors?: string[];
  active?: boolean; // always show border when true, otherwise only on hover
}

export default function GlowBorder({
  children,
  className = '',
  borderRadius = '1rem',
  glowColors = ['#3b82f6', '#2563eb', '#60a5fa', '#3b82f6'],
  active = false,
}: GlowBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const visible = active || hovered;
  const isAnimating = visible && inView;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ borderRadius }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated border layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius, padding: '1px' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: `linear-gradient(135deg, ${glowColors.join(', ')})`,
            backgroundSize: '300% 300%',
            animation: isAnimating ? 'border-spin 3s linear infinite' : 'none',
            borderRadius: 'inherit',
          }}
        />
        {/* Mask to show only border */}
        <div
          className="absolute inset-[1px] bg-[#0A0A0A] rounded-[calc(1rem-1px)]"
          style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
        />
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        animate={{
          boxShadow: visible
            ? `0 0 20px rgba(99,102,241,0.25), 0 0 40px rgba(139,92,246,0.1)`
            : `0 0 0px rgba(99,102,241,0)`,
        }}
        transition={{ duration: 0.4 }}
        style={{ borderRadius }}
      />

      {children}
    </div>
  );
}
