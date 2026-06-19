'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
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

const colorConfig: Record<string, { badge: string; border: string; dot: string; tag: string; line: string }> = {
  indigo: {
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
    border: 'border-indigo-500/20 hover:border-indigo-500/40',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    line: 'from-indigo-500/50 to-purple-500/30',
  },
  purple: {
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    dot: 'bg-purple-500',
    tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    line: 'from-purple-500/30 to-transparent',
  },
};

export default function Experience() {
  return (
    <section id="experience" className="section relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          badge="Experience"
          title="Professional"
          highlight="Journey"
          subtitle="Building real-world AI solutions through impactful internships at leading tech organizations."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const c = colorConfig[exp.color];
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-6 top-7 w-4 h-4 rounded-full ${c.dot} ring-4 ring-[#050508] hidden md:block`} />

                  <div className={`glass rounded-2xl p-7 border ${c.border} transition-all duration-300 group hover:scale-[1.01]`}>
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-white/50" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
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
                      {exp.achievements.map((a) => (
                        <li key={a} className="flex gap-2.5 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${c.tag}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
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
          className="mt-10 glass-strong rounded-2xl p-6 border border-indigo-500/20 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Open to Opportunities</span>
          </div>
          <p className="text-white/60 text-sm">
            Actively seeking <strong className="text-white/90">internships</strong> and{' '}
            <strong className="text-white/90">entry-level roles</strong> in AI/ML, Software Engineering, and Cloud Computing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
