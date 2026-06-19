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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16"
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
                     bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          {badge}
        </motion.span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">{subtitle}</p>
      )}
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
      </div>
    </motion.div>
  );
}
