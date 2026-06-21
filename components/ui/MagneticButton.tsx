'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'a' | 'button' | 'div' | 'span';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as: Tag = 'div',
  href,
  target,
  rel,
  onClick,
  type,
  disabled,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [x, y, strength]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const motionStyle = { x: springX, y: springY };
  const shared = {
    className,
    onMouseMove,
    onMouseLeave,
    'aria-label': ariaLabel,
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 350, damping: 15 }
  };

  if (Tag === 'a') {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        {...shared}
        href={href}
        target={target}
        rel={rel}
        style={motionStyle}
      >
        {children}
      </motion.a>
    );
  }

  if (Tag === 'button') {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        {...shared}
        type={type ?? 'button'}
        disabled={disabled}
        onClick={onClick}
        style={motionStyle}
      >
        {children}
      </motion.button>
    );
  }

  if (Tag === 'span') {
    return (
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        {...shared}
        onClick={onClick}
        style={motionStyle}
      >
        {children}
      </motion.span>
    );
  }

  // default: div
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      {...shared}
      onClick={onClick}
      style={motionStyle}
    >
      {children}
    </motion.div>
  );
}
