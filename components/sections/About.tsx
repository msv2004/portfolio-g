'use client';

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { GraduationCap, MapPin, Brain, Code2, Cloud, Shield } from 'lucide-react';

/* ─────────────────────────────────────────────
   3‑D Profile Card — matches reference image
───────────────────────────────────────────── */
function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -10);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 10);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rotateX, rotateY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-[270px] sm:w-[300px] mx-auto select-none"
    >
      {/* Ambient glow behind */}
      <div className="absolute inset-0 -z-10 rounded-2xl scale-110 blur-3xl bg-gradient-to-br from-pink-600/30 via-purple-600/20 to-indigo-600/25" />

      {/* Rotating gradient border */}
      <div
        className="p-[2px] rounded-[20px]"
        style={{
          background: 'linear-gradient(135deg, #f472b6, #8b5cf6, #6366f1, #ec4899, #f472b6)',
          backgroundSize: '300% 300%',
          animation: 'border-spin 4s linear infinite',
        }}
      >
        {/* Inner card */}
        <div className="relative rounded-[18px] overflow-hidden bg-[#0c0c14]" style={{ height: '360px' }}>
          {/* Profile image — priority for fast load */}
          <Image
            src="/profile.webp"
            alt="Marri Shashe Vikaash"
            fill
            priority
            sizes="300px"
            className="object-cover object-top"
            style={{ transform: 'translateZ(20px)' }}
          />

          {/* Subtle inner glow on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[18px]"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(139,92,246,0.12), transparent 70%)`,
              opacity: 0.6,
            }}
          />

          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0c0c14] to-transparent" />
        </div>
      </div>

      {/* Available badge — below the card */}
      <motion.div
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full mx-auto
                   bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg w-fit"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-xs font-semibold text-white">Available for opportunities</span>
      </motion.div>

      {/* Left dot decoration */}
      <div
        className="absolute -left-5 top-[30%] w-[36px] h-[80px] opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(168,85,247,0.7) 1.5px, transparent 1.5px)',
          backgroundSize: '9px 9px',
        }}
      />
      {/* Right dot decoration */}
      <div
        className="absolute -right-5 top-[55%] w-[36px] h-[80px] opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(236,72,153,0.7) 1.5px, transparent 1.5px)',
          backgroundSize: '9px 9px',
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Education timeline data
───────────────────────────────────────────── */
const education = [
  { degree: 'B.E. Computer Science & Engineering', school: 'Saveetha School of Engineering', period: '2022 – 2026', score: 'CGPA 8.93/10', location: 'Chennai, Tamil Nadu', color: 'indigo' },
  { degree: 'Intermediate — MPC', school: 'Resonance Junior College', period: '2020 – 2022', score: '83.9%', location: 'Khammam, Telangana', color: 'purple' },
  { degree: 'Secondary Education (SSC)', school: 'Sri Chaitanya Concept School', period: '2019 – 2020', score: 'GPA 10/10', location: 'Khammam, Telangana', color: 'cyan' },
];

const interests = [
  { icon: Brain,  label: 'Artificial Intelligence & ML',          color: 'text-indigo-400',  bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { icon: Code2,  label: 'Software Engineering',                  color: 'text-purple-400',  bg: 'bg-purple-500/10 border-purple-500/20' },
  { icon: Cloud,  label: 'Cloud Computing (Azure, AWS)',           color: 'text-cyan-400',    bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { icon: Shield, label: 'Cybersecurity & Intrusion Detection',   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
];

const colorMap: Record<string, string> = { indigo: 'border-indigo-500/30 bg-indigo-500/5', purple: 'border-purple-500/30 bg-purple-500/5', cyan: 'border-cyan-500/30 bg-cyan-500/5' };
const dotMap:   Record<string, string> = { indigo: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)]', purple: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]', cyan: 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]' };
const scoreMap: Record<string, string> = { indigo: 'bg-indigo-500/15 text-indigo-400', purple: 'bg-purple-500/15 text-purple-400', cyan: 'bg-cyan-500/15 text-cyan-400' };

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.3'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="about" className="section relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="About Me"
          title="Passionate about"
          highlight="Intelligent Systems"
          subtitle="A final-year CS student at Saveetha School of Engineering building AI-powered solutions across ML, cloud, and cybersecurity."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-7"
          >
            {/* 3D Profile Card */}
            <ProfileCard />

            {/* About text */}
            <SpotlightCard
              className="glass-card rounded-2xl p-6 border border-white/8 w-full"
              spotlightColor="rgba(99,102,241,0.1)"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                <span className="text-xs text-indigo-400 font-semibold tracking-widest uppercase">Bio</span>
                <div className="h-px flex-1 bg-gradient-to-l from-indigo-500/50 to-transparent" />
              </div>
              <p className="text-white/60 text-sm leading-7">
                I&apos;m a final-year B.Tech CS student with a{' '}
                <strong className="text-white/90">CGPA of 8.93</strong>, passionate about building
                scalable, intelligent solutions. My expertise spans software development, AI/ML, and cloud
                computing with hands-on internship experience at{' '}
                <strong className="text-indigo-400">Prodigy InfoTech</strong> and{' '}
                <strong className="text-purple-400">Bharat Intern</strong> — delivering CNN classifiers at{' '}
                <strong className="text-white/90">90%+ accuracy</strong> and optimizing ML pipelines by{' '}
                <strong className="text-cyan-400">90%</strong>.
              </p>
              <p className="text-white/60 text-sm leading-7 mt-3">
                My research spans <strong className="text-indigo-400">phishing detection</strong>,
                deep learning robustness, and network intrusion detection — published in academic venues.
              </p>
            </SpotlightCard>

            {/* Interests + Languages */}
            <SpotlightCard
              className="glass-card rounded-2xl p-5 border border-white/8 w-full"
              spotlightColor="rgba(99,102,241,0.08)"
            >
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Core Interests</h3>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {interests.map(({ icon: Icon, label, color, bg }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border ${bg} transition-all`}
                  >
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${color}`} />
                    <span className="text-xs text-white/65 leading-tight">{label}</span>
                  </motion.div>
                ))}
              </div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['English', 'Hindi', 'Telugu', 'German (A2)'].map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, type: 'spring' }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-white/10 text-white/70"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ── Right Column: Education Timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h3>

            <div ref={timelineRef} className="relative">
              <div className="absolute left-5 top-6 bottom-6 w-px bg-white/5 hidden md:block" />
              <motion.div
                className="absolute left-5 top-6 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 hidden md:block origin-top"
                style={{ height: lineHeight }}
              />

              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.school}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.18 }}
                  >
                    <SpotlightCard
                      className={`relative pl-14 p-5 rounded-2xl border ${colorMap[edu.color]} hover:scale-[1.015] transition-all duration-300 cursor-default`}
                      spotlightColor={edu.color === 'indigo' ? 'rgba(99,102,241,0.1)' : edu.color === 'purple' ? 'rgba(139,92,246,0.1)' : 'rgba(34,211,238,0.1)'}
                    >
                      <div className={`absolute left-3.5 top-6 w-3 h-3 rounded-full ${dotMap[edu.color]} ring-2 ring-[#050508] z-10`} />
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>{edu.degree}</h4>
                        <span className="text-xs font-mono text-white/40 whitespace-nowrap">{edu.period}</span>
                      </div>
                      <p className="text-xs text-white/60 mb-2">{edu.school}</p>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${scoreMap[edu.color]}`}>{edu.score}</span>
                        <span className="text-xs text-white/30 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{edu.location}
                        </span>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <SpotlightCard
              className="glass-card rounded-2xl p-6 border border-white/8 mt-2"
              spotlightColor="rgba(99,102,241,0.08)"
            >
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Leadership & Activities</h3>
              <div className="flex flex-col gap-3">
                {[
                  { title: 'Student Organizer', desc: 'NEXTRA Symposium 2023 — managed technical events & team operations' },
                  { title: 'Student Head — Math Club', desc: 'Led problem-solving sessions & academic events (2024)' },
                  { title: 'English Club Member', desc: 'Improved professional communication & presentation skills' },
                  { title: 'Core Organizer', desc: 'Weightlifting Competition — event coordination' },
                ].map(({ title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white/80">{title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
