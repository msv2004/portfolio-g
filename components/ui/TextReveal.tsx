'use client';

import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'words' | 'chars' | 'blur';
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 16, rotateX: -45 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.035,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const blurVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  mode = 'words',
  once = true,
}: TextRevealProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
  };

  if (mode === 'blur') {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={blurVariants}
        style={{ transitionDelay: `${delay}s` }}
      >
        {text}
      </motion.span>
    );
  }

  if (mode === 'chars') {
    const chars = text.split('');
    return (
      <motion.span
        className={`inline-flex flex-wrap ${className}`}
        style={{ perspective: '800px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={containerVariants}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={charVariants}
            className="inline-block"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Words mode (default)
  const words = text.split(' ');
  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            custom={i}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
