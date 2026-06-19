'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#awards', label: 'Awards' },
  { href: '#certifications', label: 'Certs' },
  { href: '#contact', label: 'Contact' },
];

function MagneticNavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      href={href}
      className={`relative px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
      }`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 rounded-lg bg-indigo-500/15 border border-indigo-500/25"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative font-mono text-sm font-bold tracking-wider group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
          <span
              className="gradient-text"
              style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}
            >
              MSV-DEV
            </span>
            {/* Shimmer on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer rounded" />
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <MagneticNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeSection === link.href.slice(1)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 text-white overflow-hidden group"
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
              <Download className="w-3 h-3 relative z-10" />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="md:hidden p-2.5 text-white/70 hover:text-white rounded-lg glass border border-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/5 px-6 py-4 flex flex-col gap-1"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`py-3 px-3 text-sm rounded-lg border-b border-white/5 last:border-0 transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
