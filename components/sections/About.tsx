'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { GraduationCap, MapPin, Brain, Code2, Cloud, Shield } from 'lucide-react';

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Saveetha School of Engineering',
    period: '2022 – 2026',
    score: 'CGPA 8.93/10',
    location: 'Chennai, Tamil Nadu',
    color: 'indigo',
  },
  {
    degree: 'Intermediate — MPC',
    school: 'Resonance Junior College',
    period: '2020 – 2022',
    score: '83.9%',
    location: 'Khammam, Telangana',
    color: 'purple',
  },
  {
    degree: 'Secondary Education (SSC)',
    school: 'Sri Chaitanya Concept School',
    period: '2019 – 2020',
    score: 'GPA 10/10',
    location: 'Khammam, Telangana',
    color: 'cyan',
  },
];

const interests = [
  { icon: Brain, label: 'Artificial Intelligence & ML', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { icon: Code2, label: 'Software Engineering', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { icon: Cloud, label: 'Cloud Computing (Azure, AWS)', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { icon: Shield, label: 'Cybersecurity & Intrusion Detection', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
];

const colorMap: Record<string, string> = {
  indigo: 'border-indigo-500/30 bg-indigo-500/5',
  purple: 'border-purple-500/30 bg-purple-500/5',
  cyan: 'border-cyan-500/30 bg-cyan-500/5',
};

const dotMap: Record<string, string> = {
  indigo: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]',
  purple: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]',
  cyan: 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
};

const scoreColor: Record<string, string> = {
  indigo: 'bg-indigo-500/15 text-indigo-400',
  purple: 'bg-purple-500/15 text-purple-400',
  cyan: 'bg-cyan-500/15 text-cyan-400',
};

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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* About Card with Spotlight */}
            <SpotlightCard
              className="glass-card rounded-2xl p-6 sm:p-8 border border-white/8"
              spotlightColor="rgba(99,102,241,0.12)"
            >
              <div className="flex items-center gap-4 mb-5">
                {/* Profile Photo with 3D tilt */}
                <motion.div
                  className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-indigo-500/40 flex-shrink-0"
                  whileHover={{ scale: 1.05, rotateY: 8, rotateX: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Image
                    src="/profile.png"
                    alt="Marri Shashe Vikaash"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </motion.div>
                <div>
                  <p className="font-bold text-white text-base" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>Marri Shashe Vikaash</p>
                  <p className="text-xs text-white/40 mt-0.5">AI Engineer · Software Developer</p>
                  <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    Khammam, Telangana · Chennai, Tamil Nadu
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-7">
                I&apos;m a final-year B.Tech Computer Science student with a <strong className="text-white/90">CGPA of 8.93</strong>,
                passionate about building scalable, intelligent solutions. My expertise spans
                software development, AI/ML, and cloud computing, with hands-on experience using
                Python, Java, SQL, TensorFlow, and Azure.
              </p>
              <p className="text-white/60 text-sm leading-7 mt-4">
                Through internships at <strong className="text-indigo-400">Prodigy InfoTech</strong> and{' '}
                <strong className="text-purple-400">Bharat Intern</strong>, I applied CNN and SVM models
                on real datasets, optimized ML pipelines for <strong className="text-white/90">90% faster execution</strong>,
                and delivered data-driven insights via Power BI.
              </p>
              <p className="text-white/60 text-sm leading-7 mt-4">
                I&apos;m also involved in research spanning <strong className="text-cyan-400">phishing detection</strong>,
                deep learning, and network intrusion detection — published in academic venues. Currently seeking
                internships and entry-level roles where I can make a measurable impact.
              </p>
            </SpotlightCard>

            {/* Interests */}
            <div className="glass-card rounded-2xl p-6 border border-white/8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Core Interests</h3>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(({ icon: Icon, label, color, bg }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border ${bg} transition-all duration-200`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                    <span className="text-xs text-white/70 leading-tight">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="glass-card rounded-2xl p-5 border border-white/8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Languages</h3>
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
            </div>
          </motion.div>

          {/* Right: Education Timeline */}
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
              {/* Animated timeline line */}
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
                      className={`relative pl-14 p-5 rounded-2xl border ${colorMap[edu.color]} transition-all duration-300 hover:scale-[1.015] cursor-default`}
                      spotlightColor={
                        edu.color === 'indigo' ? 'rgba(99,102,241,0.1)' :
                        edu.color === 'purple' ? 'rgba(139,92,246,0.1)' :
                        'rgba(34,211,238,0.1)'
                      }
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-3.5 top-6 w-3 h-3 rounded-full ${dotMap[edu.color]} ring-2 ring-[#050508] z-10`} />

                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>{edu.degree}</h4>
                        <span className="text-xs font-mono text-white/40 whitespace-nowrap">{edu.period}</span>
                      </div>
                      <p className="text-xs text-white/60 mb-2">{edu.school}</p>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${scoreColor[edu.color]}`}>
                          {edu.score}
                        </span>
                        <span className="text-xs text-white/30 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {edu.location}
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
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                Leadership & Activities
              </h3>
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
