'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, ChevronRight } from 'lucide-react';
import NeuralNetworkBg from '@/components/three/NeuralNetworkBg';
import ThreeErrorBoundary from '@/components/three/ThreeErrorBoundary';

const RotatingSphere = dynamic(() => import('@/components/three/RotatingSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-indigo-500/20 animate-pulse" />
    </div>
  ),
});

const TITLES = [
  'AI Engineer',
  'Software Developer',
  'ML Enthusiast',
  'Cybersecurity Explorer',
  'Cloud Architect',
];

function TypewriterTitle() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = TITLES[titleIdx];
    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, deleting, titleIdx]);

  return (
    <span className="gradient-text font-mono">
      {displayed}
      <span className="cursor-blink text-indigo-400">|</span>
    </span>
  );
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/msv2004', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shashe-vikaash', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:shashevikaash@gmail.com', label: 'Email' },
];

const stats = [
  { value: '8.93', label: 'CGPA', unit: '/10' },
  { value: '5+', label: 'Projects' },
  { value: '2', label: 'Internships' },
  { value: '7+', label: 'Certifications' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Neural network canvas */}
      <NeuralNetworkBg />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-transparent to-[#050508]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-transparent" />

      {/* Mobile: 3D sphere as background element */}
      <div className="absolute inset-0 lg:hidden flex items-center justify-center opacity-25 pointer-events-none">
        <div className="w-[340px] h-[340px] relative">
          <ThreeErrorBoundary>
            <RotatingSphere />
          </ThreeErrorBoundary>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh]">

          {/* Left: Text Content */}
          <div className="flex flex-col gap-5 sm:gap-6 text-center lg:text-left items-center lg:items-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase glass border border-indigo-500/20 text-indigo-400">
                <Sparkles className="w-3 h-3" />
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white/90">Marri</span>
                <br />
                <span className="text-white">Shashe</span>
                <span className="gradient-text ml-2 sm:ml-3">Vikaash</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-white/60 h-8"
            >
              <TypewriterTitle />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Final-year B.E. CSE student at Saveetha School of Engineering (CGPA 8.93) with
              expertise in AI/ML, cloud computing, and software development. Building intelligent
              systems that solve real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start w-full"
            >
              <motion.a
                href="#projects"
                className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm
                           bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-200"
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ChevronRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm
                           glass border border-white/10 text-white/80 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg glass border border-white/5 text-white/50
                             hover:text-white hover:border-indigo-500/30 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
              <div className="h-px w-6 sm:w-8 bg-white/10" />
              <span className="text-xs text-white/30 font-mono">@msv2004</span>
            </motion.div>

            {/* Stats — grid on mobile for better space usage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-6 pt-2 w-full"
            >
              {stats.map(({ value, label, unit }) => (
                <div key={label} className="flex flex-col items-center lg:items-start">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {value}
                    {unit && <span className="text-xs sm:text-sm text-white/40 ml-0.5">{unit}</span>}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Sphere — desktop only (shown prominently) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center h-[550px]"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-60 h-60 rounded-full border border-indigo-500/10 animate-spin-slow" />
              <div className="absolute w-80 h-80 rounded-full border border-purple-500/5 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            </div>
            <div className="relative w-full h-full">
              <ThreeErrorBoundary>
                <RotatingSphere />
              </ThreeErrorBoundary>
            </div>

            {/* Floating info chips */}
            <motion.div
              className="absolute top-20 -left-4 glass border border-white/10 px-3 py-2 rounded-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <p className="text-xs font-mono text-indigo-400">CNN Accuracy</p>
              <p className="text-lg font-bold text-white">90%+</p>
            </motion.div>

            <motion.div
              className="absolute bottom-24 -right-6 glass border border-white/10 px-3 py-2 rounded-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              <p className="text-xs font-mono text-cyan-400">Pipeline Optimized</p>
              <p className="text-lg font-bold text-white">90% faster</p>
            </motion.div>

            <motion.div
              className="absolute top-36 -right-2 glass border border-white/10 px-3 py-2 rounded-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
            >
              <p className="text-xs font-mono text-purple-400">CGPA</p>
              <p className="text-lg font-bold text-white">8.93</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
