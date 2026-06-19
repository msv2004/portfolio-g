'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}

export default function SectionHeader({ badge, title, highlight, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center mb-12 md:mb-16"
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
                     bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 mb-5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
          </span>
          {badge}
        </motion.div>
      )}

      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
        style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}
      >
        {/* Main title words — white, word-by-word reveal */}
        {title.split(' ').map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}

        {/* Gradient highlight — applied inline directly to the text node so background-clip works */}
        {highlight && (
          <>
            {' '}
            <motion.span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {highlight}
            </motion.span>
          </>
        )}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated decorative line */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-px bg-gradient-to-r from-transparent to-indigo-500/50"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-indigo-500"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7, type: 'spring' }}
        />
        <motion.div
          className="h-px bg-gradient-to-l from-transparent to-indigo-500/50"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
