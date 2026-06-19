'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.3 });

  const blobX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.8 });
  const blobY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.8 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const interactables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label[for], [data-cursor-hover]'
    );
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });

    // Re-observe on DOM mutations
    const observer = new MutationObserver(() => {
      document.querySelectorAll(
        'a, button, [role="button"], input, textarea, [data-cursor-hover]'
      ).forEach((el) => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
        el.addEventListener('mouseenter', onHoverStart);
        el.addEventListener('mouseleave', onHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Blob follower */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full mix-blend-screen"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          opacity: isVisible ? (isHovering ? 0.25 : 0.15) : 0,
          background: isHovering
            ? 'radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(99,102,241,0.8) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(139,92,246,0.4) 60%, transparent 100%)',
          filter: 'blur(8px)',
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease, background 0.3s ease',
        }}
      />

      {/* Sharp dot */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicking ? 6 : isHovering ? 8 : 6,
          height: isClicking ? 6 : isHovering ? 8 : 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? '#a78bfa' : '#ffffff',
          boxShadow: isHovering ? '0 0 12px rgba(167,139,250,0.8)' : '0 0 6px rgba(255,255,255,0.4)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          scale: isClicking ? 0.7 : 1,
        }}
      />
    </>
  );
}
