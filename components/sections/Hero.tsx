'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowDown, Github, Linkedin, Mail, ChevronRight, ExternalLink } from 'lucide-react';
import NeuralNetworkBg from '@/components/three/NeuralNetworkBg';
import ThreeErrorBoundary from '@/components/three/ThreeErrorBoundary';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';


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
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, deleting, titleIdx]);

  return (
    <span className="gradient-text font-mono">
      {displayed}
      <span className="cursor-blink text-indigo-400 ml-0.5">|</span>
    </span>
  );
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/msv2004', label: 'GitHub', color: 'hover:text-white hover:border-white/30' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shashe-vikaash', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-500/30' },
  { icon: Mail, href: 'mailto:shashevikaash@gmail.com', label: 'Email', color: 'hover:text-rose-400 hover:border-rose-500/30' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Projects', decimals: 0 },
  { value: 2, suffix: '', label: 'Internships', decimals: 0 },
  { value: 7, suffix: '+', label: 'Certifications', decimals: 0 },
  { value: 8.93, suffix: '', label: 'CGPA', decimals: 2 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const springY = useSpring(yParallax, { stiffness: 80, damping: 20 });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Neural network canvas */}
      <NeuralNetworkBg />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />

      {/* Aurora accent */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-60" />

      {/* Mobile: 3D sphere as background */}
      <div className="absolute inset-0 lg:hidden flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[340px] h-[340px] relative">
          <ThreeErrorBoundary>
            <RotatingSphere />
          </ThreeErrorBoundary>
        </div>
      </div>

      <motion.div
        style={{ y: springY, opacity: opacityParallax }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh]">

          {/* Left: Text Content */}
          <motion.div
            className="flex flex-col gap-5 sm:gap-6 text-center lg:text-left items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase glass border border-indigo-500/25 text-indigo-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}
              >
                <span className="text-white/85">Marri</span>
                <br />
                <span className="text-white">Shashe </span>
                <span className="gradient-text">Vikaash</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-medium text-white/60 h-8"
            >
              <TypewriterTitle />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Final-year B.E. CSE student at Saveetha School of Engineering with
              expertise in AI/ML, cloud computing, and software development. Building intelligent
              systems that solve real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start w-full"
            >
              <MagneticButton
                href="#projects"
                as="a"
                strength={0.3}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                           bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-200
                           shadow-[0_0_0px_rgba(99,102,241,0)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]
                           relative overflow-hidden group"
              >
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ChevronRight className="w-4 h-4" />
                </span>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                as="a"
                strength={0.3}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                           glass border border-white/10 text-white/80
                           hover:text-white hover:border-indigo-500/40 transition-all duration-200"
              >
                Get in Touch
                <ExternalLink className="w-3.5 h-3.5" />
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <MagneticButton
                  key={label}
                  href={href}
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  strength={0.4}
                  className={`p-2.5 rounded-lg glass border border-white/5 text-white/50 transition-all duration-200 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </MagneticButton>
              ))}
              <div className="h-px w-6 sm:w-8 bg-white/10" />
              <span className="text-xs text-white/30 font-mono">@msv2004</span>
            </motion.div>

            {/* Stats — AnimatedCounter */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-3 sm:gap-6 pt-2 w-full"
            >
              {stats.map(({ value, suffix, label, decimals }) => (
                <div key={label} className="flex flex-col items-center lg:items-start">
                  <span className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>
                    <AnimatedCounter target={value} suffix={suffix} decimals={decimals} delay={1.2} />
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Sphere — desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center h-[550px]"
          >
            {/* Outer glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-72 h-72 rounded-full border border-indigo-500/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-96 h-96 rounded-full border border-purple-500/8"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[28rem] h-[28rem] rounded-full border border-cyan-500/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <div className="relative w-full h-full">
              <ThreeErrorBoundary>
                <RotatingSphere />
              </ThreeErrorBoundary>
            </div>

            {/* Floating info chips */}
            <motion.div
              className="absolute top-20 -left-4 glass-strong border border-indigo-500/20 px-4 py-3 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              <p className="text-xs font-mono text-indigo-400">CNN Accuracy</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>90%+</p>
            </motion.div>

            <motion.div
              className="absolute bottom-28 -right-4 glass-strong border border-cyan-500/20 px-4 py-3 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              <p className="text-xs font-mono text-cyan-400">Pipeline Optimized</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>90% faster</p>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-6 glass-strong border border-purple-500/20 px-4 py-3 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2 }}
            >
              <p className="text-xs font-mono text-purple-400">CGPA</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>8.93</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/25 tracking-widest uppercase font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-white/25" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
