'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const awards = [
  {
    id: 1,
    title: 'NEXTRA Symposium Organizer',
    subtitle: 'Student Leadership Award',
    year: '2023',
    org: 'Saveetha School of Engineering',
    description: 'Recognized for excellence in organizing the technical symposium, coordinating 500+ participants, and delivering a seamless academic event experience.',
    icon: '🏆',
    color: 'gold',
  },
  {
    id: 2,
    title: 'Math Club Student Head',
    subtitle: 'Academic Excellence Award',
    year: '2024',
    org: 'Saveetha School of Engineering',
    description: 'Led the Mathematics department club, organized problem-solving contests, and mentored junior students in advanced analytical reasoning.',
    icon: '🎖',
    color: 'silver',
  },
  {
    id: 3,
    title: 'ML Pipeline Optimization',
    subtitle: 'Performance Achievement',
    year: '2023',
    org: 'Bharat Intern',
    description: 'Achieved a 90% reduction in ML pipeline processing time through systematic optimization and innovative caching strategies, recognized by internship supervisors.',
    icon: '⚡',
    color: 'cyan',
  },
  {
    id: 4,
    title: 'CNN Classifier — 90% Accuracy',
    subtitle: 'Technical Excellence',
    year: '2023',
    org: 'Prodigy InfoTech',
    description: 'Developed a high-performance CNN-based image classifier achieving over 90% accuracy on large-scale datasets, commended by the ML engineering team.',
    icon: '🧠',
    color: 'purple',
  },
  {
    id: 5,
    title: 'Chess Tournament Participant',
    subtitle: 'Strategic Thinking Recognition',
    year: '2023',
    org: 'Saveetha School of Engineering',
    description: 'Actively participated in the institutional chess tournament, demonstrating advanced strategic thinking and competitive sportsmanship.',
    icon: '♟',
    color: 'emerald',
  },
  {
    id: 6,
    title: 'Core Organizer — Weightlifting',
    subtitle: 'Event Management Excellence',
    year: '2023',
    org: 'Saveetha School of Engineering',
    description: 'Served as Core Organizer for the institutional Weightlifting Competition, managing logistics, participant coordination, and event execution.',
    icon: '🏋',
    color: 'rose',
  },
];

const colorConfig: Record<string, {
  bg: string; border: string; glow: string; badge: string; shimmer: string;
}> = {
  gold: {
    bg: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/5',
    border: 'border-amber-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    shimmer: 'from-amber-500/20 via-yellow-400/30 to-amber-500/20',
  },
  silver: {
    bg: 'bg-gradient-to-br from-slate-400/10 to-gray-400/5',
    border: 'border-slate-400/30',
    glow: 'hover:shadow-[0_0_40px_rgba(148,163,184,0.15)]',
    badge: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
    shimmer: 'from-slate-400/20 via-gray-300/30 to-slate-400/20',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-500/10 to-teal-500/5',
    border: 'border-cyan-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    shimmer: 'from-cyan-500/20 via-teal-400/30 to-cyan-500/20',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500/10 to-violet-500/5',
    border: 'border-purple-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    shimmer: 'from-purple-500/20 via-violet-400/30 to-purple-500/20',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-500/10 to-green-500/5',
    border: 'border-emerald-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    shimmer: 'from-emerald-500/20 via-green-400/30 to-emerald-500/20',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose-500/10 to-pink-500/5',
    border: 'border-rose-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.2)]',
    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    shimmer: 'from-rose-500/20 via-pink-400/30 to-rose-500/20',
  },
};

export default function Awards() {
  return (
    <section id="awards" className="section relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeader
          badge="Awards & Achievements"
          title="Recognition &"
          highlight="Milestones"
          subtitle="Awards, achievements, and recognitions earned through technical excellence and leadership."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {awards.map((award, i) => {
            const c = colorConfig[award.color];
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative rounded-2xl border ${c.border} ${c.bg} ${c.glow} p-6 transition-all duration-300 overflow-hidden group`}
              >
                {/* Shimmer overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${c.shimmer} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Trophy icon */}
                <div className="relative">
                  <motion.div
                    className="text-4xl mb-4 inline-block"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {award.icon}
                  </motion.div>

                  <div className="mb-3">
                    <h3 className="text-base font-bold text-white mb-1">{award.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}>
                      {award.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed mb-4">{award.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30 font-medium">{award.org}</span>
                    <span className="text-xs font-mono text-white/30">{award.year}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '90%', label: 'Pipeline Speedup', color: 'text-cyan-400' },
            { value: '90%+', label: 'CNN Accuracy', color: 'text-indigo-400' },
            { value: '500+', label: 'Event Participants', color: 'text-amber-400' },
            { value: '8.93', label: 'CGPA', color: 'text-emerald-400' },
          ].map(({ value, label, color }) => (
            <div key={label} className="glass rounded-2xl p-5 border border-white/5 text-center">
              <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
