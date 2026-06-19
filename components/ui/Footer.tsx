'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#awards', label: 'Awards' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { icon: Github,   href: 'https://github.com/msv2004',              label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shashe-vikaash', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:shashevikaash@gmail.com',          label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 relative">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-xl font-bold mb-3">
              <span
                style={{
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-syne, var(--font-inter))',
                }}
              >
                MSV-DEV
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              AI Engineer & Software Developer. Building intelligent systems that solve real-world problems.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-emerald-400 font-medium">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-indigo-400 transition-colors duration-200 gradient-underline w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Built With</p>
            <div className="flex flex-wrap gap-2">
              {['Next.js 15', 'React 19', 'TypeScript', 'Three.js', 'Framer Motion', 'TailwindCSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg glass border border-white/8 text-xs text-white/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <span>@2026 Marri Shashe Vikaash . Made with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </motion.div>
            <span>🔥</span>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <MagneticButton
                key={label}
                href={href}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                strength={0.4}
                className="p-2.5 rounded-lg glass border border-white/5 text-white/40 hover:text-white/90 hover:border-indigo-500/20 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </MagneticButton>
            ))}

            {/* Back to top */}
            <MagneticButton
              href="#"
              as="a"
              aria-label="Back to top"
              strength={0.4}
              className="p-2.5 rounded-lg glass border border-white/5 text-white/40 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-200"
            >
              <ArrowUp className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
