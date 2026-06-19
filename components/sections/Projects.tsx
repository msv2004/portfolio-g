'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import GlowBorder from '@/components/ui/GlowBorder';
import MagneticButton from '@/components/ui/MagneticButton';
import { ExternalLink, Github, Bot, TrendingUp, Building2, BarChart3, Megaphone, Headset, Tag, ChevronDown } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'GenAI RAG Chatbot',
    subtitle: 'LLM Engineer',
    period: 'Jan 2025 – May 2025',
    category: 'AI / NLP',
    color: 'indigo',
    icon: Bot,
    description: 'A sophisticated conversational AI system combining generative LLM capabilities with external knowledge retrieval. Features an advanced RAG pipeline with indexing and retrieval-generation phases for accurate, context-grounded responses.',
    highlights: [
      'Built end-to-end RAG pipeline using LangChain for contextual retrieval',
      'Integrated vector embeddings for semantic document search',
      'Implemented both indexing and retrieval-generation phases',
      'Provides accurate, real-data-grounded responses at scale',
    ],
    tech: ['LangChain', 'RAG', 'LLMs', 'Python', 'Vector DB', 'OpenAI API'],
    featured: true,
  },
  {
    id: 2,
    title: 'VR StudioPlayz',
    subtitle: 'VR Developer',
    period: '2025',
    category: 'VR / XR',
    color: 'purple',
    icon: Headset,
    description: 'An immersive virtual reality studio experience platform. Designed as a creative VR space enabling interactive 3D environments and spatial computing experiences.',
    highlights: [
      'Immersive 3D virtual studio environment',
      'Interactive spatial computing elements',
      'Cross-platform VR compatibility',
      'Real-time 3D rendering pipeline',
    ],
    tech: ['VR', 'Unity', '3D Modeling', 'Spatial Computing', 'OpenXR'],
    featured: true,
  },
  {
    id: 3,
    title: 'Hospital Management System',
    subtitle: 'Full Stack Developer',
    period: 'Oct 2023 – Feb 2024',
    category: 'Full Stack',
    color: 'cyan',
    icon: Building2,
    description: 'A comprehensive HMS using Java and SQL to digitize healthcare operations. Connects patients, doctors, administrative staff, and management through a unified digital ecosystem.',
    highlights: [
      'CRUD operations for patient records, appointments, and billing',
      'Role-based access modules for staff and management',
      'Relational database design with SQL optimization',
      'MVC-style separation of concerns for maintainability',
    ],
    tech: ['Java', 'SQL', 'MySQL', 'REST API', 'MVC Architecture'],
    featured: false,
  },
  {
    id: 4,
    title: 'House Price Prediction',
    subtitle: 'Data Analyst',
    period: 'Mar 2024 – Sep 2024',
    category: 'ML / Data Science',
    color: 'emerald',
    icon: TrendingUp,
    description: 'ML-powered property valuation system for the real estate and finance industries. Leverages Python, Pandas, and Scikit-learn to analyze historical housing data and build accurate predictive models.',
    highlights: [
      'Trained regression models on historical housing datasets',
      'Feature engineering with Pandas for market condition variables',
      'Model evaluation using RMSE, MAE, and R² metrics',
      'Deployed predictions via interactive data visualizations',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Regression'],
    featured: false,
  },
  {
    id: 5,
    title: 'Enterprise Sales Dashboard',
    subtitle: 'Business Intelligence Developer',
    period: '2024',
    category: 'Data / BI',
    color: 'orange',
    icon: BarChart3,
    description: 'A comprehensive BI dashboard to analyze revenue, customer trends, and key performance indicators. Integrates backend data sources with visualization layers to support executive decision-making.',
    highlights: [
      'Revenue analysis and customer trend visualization',
      'KPI tracking across multiple business dimensions',
      'Integration of backend data pipelines with BI layer',
      'Interactive drill-down reports for stakeholders',
    ],
    tech: ['Power BI', 'SQL', 'Python', 'Data Modeling', 'ETL'],
    featured: false,
  },
  {
    id: 6,
    title: 'AdWords Data Processing',
    subtitle: 'Data Engineer',
    period: '2024',
    category: 'Data Engineering',
    color: 'rose',
    icon: Megaphone,
    description: 'A data processing workflow for analyzing Google AdWords campaign metrics including CTR, CPC, and conversion rates. Applies structured query logic and backend scripting for performance evaluation.',
    highlights: [
      'Campaign metrics analysis: CTR, CPC, conversions',
      'Automated data ingestion and processing pipeline',
      'Performance evaluation dashboards',
      'Structured query optimization for large ad datasets',
    ],
    tech: ['Python', 'SQL', 'Data Pipeline', 'Analytics', 'Google Ads API'],
    featured: false,
  },
];

const colorConfig: Record<string, {
  badge: string; border: string; tag: string; glow: string; icon: string; spotlight: string;
}> = {
  indigo: { badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20', border: 'border-indigo-500/20 hover:border-indigo-500/50', tag: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20', glow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]', icon: 'bg-indigo-500/15 border-indigo-500/20 text-indigo-400', spotlight: 'rgba(99,102,241,0.15)' },
  purple: { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/20', border: 'border-purple-500/20 hover:border-purple-500/50', tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20', glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]', icon: 'bg-purple-500/15 border-purple-500/20 text-purple-400', spotlight: 'rgba(139,92,246,0.15)' },
  cyan: { badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20', border: 'border-cyan-500/20 hover:border-cyan-500/50', tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20', glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]', icon: 'bg-cyan-500/15 border-cyan-500/20 text-cyan-400', spotlight: 'rgba(34,211,238,0.12)' },
  emerald: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', border: 'border-emerald-500/20 hover:border-emerald-500/50', tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]', icon: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400', spotlight: 'rgba(16,185,129,0.12)' },
  orange: { badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20', border: 'border-orange-500/20 hover:border-orange-500/50', tag: 'bg-orange-500/10 text-orange-300 border-orange-500/20', glow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]', icon: 'bg-orange-500/15 border-orange-500/20 text-orange-400', spotlight: 'rgba(249,115,22,0.1)' },
  rose: { badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20', border: 'border-rose-500/20 hover:border-rose-500/50', tag: 'bg-rose-500/10 text-rose-300 border-rose-500/20', glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.25)]', icon: 'bg-rose-500/15 border-rose-500/20 text-rose-400', spotlight: 'rgba(244,63,94,0.1)' },
};

const FILTERS = ['All', 'AI / NLP', 'VR / XR', 'Full Stack', 'ML / Data Science', 'Data / BI', 'Data Engineering'];

// 3D tilt card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -6);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 6);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Projects"
          title="What I've"
          highlight="Built"
          subtitle="A showcase of AI/ML systems, full-stack applications, VR experiences, and data engineering projects."
        />

        {/* Filter Pills with layoutId sliding pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                filter === f
                  ? 'text-white'
                  : 'glass border border-white/10 text-white/50 hover:text-white/80 hover:border-indigo-500/30'
              }`}
            >
              {filter === f && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const c = colorConfig[project.color];
              const Icon = project.icon;
              const isExpanded = expanded === project.id;

              const card = (
                <SpotlightCard
                  key={project.id}
                  className={`glass-card rounded-2xl border ${c.border} ${c.glow} transition-all duration-300 overflow-hidden cursor-pointer group h-full`}
                  spotlightColor={c.spotlight}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl border ${c.icon} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 shimmer">
                            ★ Featured
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${c.badge} flex items-center gap-1`}>
                          <Tag className="w-2.5 h-2.5" />
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>{project.title}</h3>
                    <p className="text-xs text-white/40 mb-3 font-mono">{project.period}</p>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3 flex-1">{project.description}</p>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 flex flex-col gap-1.5">
                            {project.highlights.map((h) => (
                              <li key={h} className="text-xs text-white/50 flex gap-2">
                                <span className="text-indigo-400 flex-shrink-0">→</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tech.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded text-xs border ${c.tag}`}>{t}</span>
                      ))}
                    </div>

                    {/* Expand hint */}
                    <div className="flex items-center gap-1 text-xs text-white/20 mt-3 group-hover:text-white/40 transition-colors">
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                      {isExpanded ? 'Collapse' : 'Show details'}
                    </div>
                  </div>
                </SpotlightCard>
              );

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => setExpanded(isExpanded ? null : project.id)}
                >
                  {project.featured ? (
                    <GlowBorder borderRadius="1rem">{card}</GlowBorder>
                  ) : (
                    <TiltCard>{card}</TiltCard>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <MagneticButton
            href="https://github.com/msv2004"
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10
                       text-sm font-semibold text-white/70 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            View all projects on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
