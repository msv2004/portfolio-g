'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  spotlightColor: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: '</>', color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10', borderColor: 'border-indigo-500/20',
    spotlightColor: 'rgba(99,102,241,0.12)',
    skills: [
      { name: 'Python', level: 92, color: 'from-indigo-600 to-indigo-400' },
      { name: 'Java', level: 85, color: 'from-indigo-500 to-blue-400' },
      { name: 'SQL', level: 88, color: 'from-blue-600 to-blue-400' },
      { name: 'C++', level: 70, color: 'from-indigo-400 to-purple-400' },
    ],
  },
  {
    category: 'AI / Machine Learning',
    icon: '🧠', color: 'text-purple-400',
    bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20',
    spotlightColor: 'rgba(139,92,246,0.12)',
    skills: [
      { name: 'TensorFlow / CNN', level: 88, color: 'from-purple-600 to-purple-400' },
      { name: 'Scikit-learn / SVM', level: 85, color: 'from-purple-500 to-pink-400' },
      { name: 'LangChain / RAG', level: 78, color: 'from-pink-600 to-purple-400' },
      { name: 'Deep Learning', level: 80, color: 'from-purple-400 to-violet-400' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁', color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/20',
    spotlightColor: 'rgba(34,211,238,0.1)',
    skills: [
      { name: 'Microsoft Azure', level: 82, color: 'from-cyan-600 to-cyan-400' },
      { name: 'Oracle Cloud', level: 78, color: 'from-cyan-500 to-teal-400' },
      { name: 'AWS', level: 65, color: 'from-teal-600 to-cyan-400' },
      { name: 'Git / GitHub', level: 90, color: 'from-cyan-400 to-blue-400' },
    ],
  },
  {
    category: 'Cybersecurity',
    icon: '🛡', color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20',
    spotlightColor: 'rgba(16,185,129,0.1)',
    skills: [
      { name: 'Network Security', level: 72, color: 'from-emerald-600 to-emerald-400' },
      { name: 'Intrusion Detection', level: 75, color: 'from-green-600 to-emerald-400' },
      { name: 'Phishing Detection', level: 78, color: 'from-emerald-500 to-teal-400' },
      { name: 'Cisco Networking', level: 65, color: 'from-teal-600 to-emerald-400' },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: '⚙', color: 'text-orange-400',
    bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20',
    spotlightColor: 'rgba(249,115,22,0.1)',
    skills: [
      { name: 'Power BI', level: 80, color: 'from-orange-600 to-yellow-400' },
      { name: 'MySQL', level: 88, color: 'from-orange-500 to-amber-400' },
      { name: 'Flask', level: 72, color: 'from-yellow-600 to-orange-400' },
      { name: 'VS Code / Colab', level: 95, color: 'from-orange-400 to-red-400' },
    ],
  },
  {
    category: 'Concepts',
    icon: '📐', color: 'text-rose-400',
    bgColor: 'bg-rose-500/10', borderColor: 'border-rose-500/20',
    spotlightColor: 'rgba(244,63,94,0.1)',
    skills: [
      { name: 'OOP & DSA', level: 88, color: 'from-rose-600 to-rose-400' },
      { name: 'REST APIs / SDLC', level: 82, color: 'from-rose-500 to-pink-400' },
      { name: 'DBMS', level: 85, color: 'from-pink-600 to-rose-400' },
      { name: 'Operating Systems', level: 75, color: 'from-rose-400 to-orange-400' },
    ],
  },
];

const techTags = [
  'Python', 'Java', 'SQL', 'C++', 'TensorFlow', 'PyTorch', 'Scikit-learn',
  'LangChain', 'Azure', 'AWS', 'Oracle', 'Flask', 'Power BI', 'MySQL',
  'Git', 'Linux', 'CNN', 'SVM', 'RAG', 'LLMs', 'REST APIs', 'Docker',
  'Next.js', 'TypeScript', 'Pandas', 'NumPy', 'Matplotlib',
];

function SkillBar({ name, level, color, delay }: Skill & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-white/70">{name}</span>
        <span className="text-xs font-mono text-white/30">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glowing tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60 blur-[2px]" />
        </motion.div>
      </div>
    </div>
  );
}

// Infinite marquee strip
function MarqueeStrip({ tags, direction = 'left' }: { tags: string[]; direction?: 'left' | 'right' }) {
  const doubled = [...tags, ...tags];
  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex gap-3 w-max ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}
      >
        {doubled.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/8 text-white/60 hover:text-white/90 hover:border-indigo-500/30 transition-all whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Skills"
          title="Technical"
          highlight="Arsenal"
          subtitle="A comprehensive skill set spanning AI/ML, cloud computing, cybersecurity, and software engineering."
        />

        {/* Skill Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.09 }}
            >
              <SpotlightCard
                className={`glass-card rounded-2xl p-5 sm:p-6 border ${cat.borderColor} hover:scale-[1.015] transition-transform duration-300`}
                spotlightColor={cat.spotlightColor}
              >
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    className={`w-10 h-10 rounded-xl ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center text-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    {cat.icon}
                  </motion.div>
                  <h3 className={`text-sm font-bold ${cat.color}`} style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>{cat.category}</h3>
                </div>

                <div className="flex flex-col gap-4">
                  {cat.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      {...skill}
                      delay={catIdx * 0.1 + i * 0.1}
                    />
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Infinite Marquee Tag Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest text-center mb-6 font-mono">Technologies I work with</p>
          {/* Fade edges */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="space-y-3">
              <MarqueeStrip tags={techTags.slice(0, 14)} direction="left" />
              <MarqueeStrip tags={techTags.slice(7)} direction="right" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
