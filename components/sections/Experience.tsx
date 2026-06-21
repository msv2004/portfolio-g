'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'Machine Learning Intern',
    company: 'Prodigy InfoTech',
    period: 'Nov 2023 – Dec 2023',
    location: 'Remote (Virtual)',
    type: 'ML Internship',
    color: 'indigo',
    achievements: [
      'Developed CNN-based image classifiers in TensorFlow achieving 90%+ accuracy on large-scale datasets',
      'Implemented SQL-based data preprocessing pipelines for structured data at scale',
      'Delivered data visualizations via Power BI to communicate model insights to stakeholders',
      'Strengthened understanding of application workflows, debugging, and version control practices',
    ],
    tech: ['TensorFlow', 'CNN', 'SQL', 'Power BI', 'Python'],
  },
  {
    role: 'Machine Learning Intern',
    company: 'Bharat Intern',
    period: 'Oct 2023 – Nov 2023',
    location: 'Remote (Virtual)',
    type: 'ML Internship',
    color: 'purple',
    achievements: [
      'Engineered real-time AI solutions using SVM and CNN models on production-level datasets',
      'Reduced ML pipeline processing time by 90% through targeted optimization and caching strategies',
      'Implemented predictive regression models on structured datasets with advanced data wrangling',
      'Gained exposure to real-world SDLC practices and collaborative Agile development environments',
    ],
    tech: ['SVM', 'CNN', 'Scikit-learn', 'Python', 'Pandas'],
  },
];

const colorConfig: Record<string, { badge: string; border: string; dot: string; tag: string; spotlight: string }> = {
  indigo: {
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
    border: 'border-indigo-500/20 hover:border-indigo-500/40',
    dot: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]',
    tag: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    spotlight: 'rgba(99,102,241,0.1)',
  },
  purple: {
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    dot: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.7)]',
    tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    spotlight: 'rgba(139,92,246,0.1)',
  },
};

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.4'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Experience"
          title="Professional"
          highlight="Journey"
          subtitle="Building real-world AI solutions through impactful internships at leading tech organizations."
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Scroll-drawn vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          <motion.div
            className="absolute left-8 top-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block origin-top"
            style={{ scaleY: lineScale, height: '100%' }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const c = colorConfig[exp.color];
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[26px] top-7 w-4 h-4 rounded-full ${c.dot} ring-4 ring-[#0A0A0A] hidden md:block`} />

                  <SpotlightCard
                    className={`glass-card rounded-2xl p-5 sm:p-7 border ${c.border} transition-all duration-300 group hover:scale-[1.01]`}
                    spotlightColor={c.spotlight}
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-white/50" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>{exp.role}</h3>
                          <p className="text-base font-semibold gradient-text">{exp.company}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${c.badge}`}>
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-5 text-xs text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Achievements */}
                    <ul className="flex flex-col gap-2.5 mb-5">
                      {exp.achievements.map((a, ai) => (
                        <motion.li
                          key={a}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + ai * 0.07 }}
                          className="flex gap-2.5 text-sm text-white/60"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {a}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, ti) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: ti * 0.05 + 0.3 }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${c.tag}`}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open to Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SpotlightCard
            className="mt-10 glass-strong rounded-2xl p-6 border border-indigo-500/20 text-center"
            spotlightColor="rgba(99,102,241,0.12)"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Open to Opportunities</span>
            </div>
            <p className="text-white/60 text-sm">
              Actively seeking <strong className="text-white/90">internships</strong> and{' '}
              <strong className="text-white/90">entry-level roles</strong> in AI/ML, Software Engineering, and Cloud Computing.
            </p>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
