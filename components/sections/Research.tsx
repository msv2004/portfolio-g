'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import GlowBorder from '@/components/ui/GlowBorder';
import { BookOpen, Shield, Brain, Network } from 'lucide-react';

const publications = [
  {
    id: 1,
    title: 'Deep Learning-Based Phishing Website Detection Using URL and Content Features',
    domain: 'Cybersecurity',
    type: 'Research Paper',
    year: '2024',
    icon: Shield,
    color: 'indigo',
    abstract: 'Investigates deep learning approaches for detecting phishing websites by analyzing URL patterns and web content features. Proposes a hybrid CNN-LSTM model achieving high precision and recall in real-time threat detection.',
    tags: ['Deep Learning', 'Phishing Detection', 'CNN-LSTM', 'URL Analysis', 'Cybersecurity'],
    status: 'Published',
  },
  {
    id: 2,
    title: 'Network Intrusion Detection System Using Machine Learning Classifiers',
    domain: 'Network Security',
    type: 'Research Paper',
    year: '2024',
    icon: Network,
    color: 'cyan',
    abstract: 'Explores ML-based intrusion detection systems using ensemble classifiers on the NSL-KDD dataset. Evaluates Random Forest, SVM, and XGBoost models with feature selection to minimize false positives in network anomaly detection.',
    tags: ['Intrusion Detection', 'Machine Learning', 'SVM', 'NSL-KDD', 'Network Security'],
    status: 'Published',
  },
  {
    id: 3,
    title: 'Adversarial Robustness in Deep Learning Models for Image Classification',
    domain: 'Deep Learning',
    type: 'Research Paper',
    year: '2025',
    icon: Brain,
    color: 'purple',
    abstract: 'Analyzes the vulnerability of deep neural networks to adversarial attacks and proposes defensive mechanisms including adversarial training and input preprocessing to improve model robustness under hostile conditions.',
    tags: ['Adversarial ML', 'Deep Learning', 'CNN', 'Robustness', 'Image Classification'],
    status: 'Under Review',
  },
  {
    id: 4,
    title: 'Comparative Study of Transfer Learning Architectures for Medical Image Analysis',
    domain: 'Healthcare AI',
    type: 'Research Paper',
    year: '2025',
    icon: BookOpen,
    color: 'emerald',
    abstract: 'A systematic comparison of VGG16, ResNet50, EfficientNet, and InceptionV3 transfer learning architectures applied to medical imaging datasets. Benchmarks accuracy, inference speed, and resource efficiency for clinical deployment.',
    tags: ['Transfer Learning', 'Medical Imaging', 'ResNet', 'EfficientNet', 'Healthcare AI'],
    status: 'In Progress',
  },
];

const domainColors: Record<string, { border: string; badge: string; tag: string; icon: string; statusClass: string; spotlight: string }> = {
  indigo: { border: 'border-indigo-500/20 hover:border-indigo-500/40', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', tag: 'bg-indigo-500/8 text-indigo-300 border-indigo-500/15', icon: 'text-indigo-400', statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', spotlight: 'rgba(99,102,241,0.12)' },
  cyan: { border: 'border-cyan-500/20 hover:border-cyan-500/40', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', tag: 'bg-cyan-500/8 text-cyan-300 border-cyan-500/15', icon: 'text-cyan-400', statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', spotlight: 'rgba(34,211,238,0.1)' },
  purple: { border: 'border-purple-500/20 hover:border-purple-500/40', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', tag: 'bg-purple-500/8 text-purple-300 border-purple-500/15', icon: 'text-purple-400', statusClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20', spotlight: 'rgba(139,92,246,0.12)' },
  emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/40', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', tag: 'bg-emerald-500/8 text-emerald-300 border-emerald-500/15', icon: 'text-emerald-400', statusClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20', spotlight: 'rgba(16,185,129,0.1)' },
};

export default function Research() {
  return (
    <section id="research" className="section relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/4 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeader
          badge="Research"
          title="Publication"
          highlight="Wall"
          subtitle="Academic research spanning cybersecurity, deep learning, and intrusion detection systems."
        />

        {/* Domain tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['Cybersecurity', 'Network Security', 'Deep Learning', 'Healthcare AI'].map((domain, i) => (
            <motion.span
              key={domain}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/10 text-white/50"
            >
              {domain}
            </motion.span>
          ))}
        </motion.div>

        {/* Publication cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {publications.map((pub, i) => {
            const c = domainColors[pub.color];
            const Icon = pub.icon;
            const isPublished = pub.status === 'Published';

            const card = (
              <SpotlightCard
                className={`glass-card rounded-2xl border ${c.border} p-6 transition-all duration-300 group h-full`}
                spotlightColor={c.spotlight}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className={`w-5 h-5 ${c.icon}`} />
                    </motion.div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
                      {pub.domain}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${c.statusClass}`}>
                      {pub.status}
                    </span>
                    <span className="text-xs text-white/30 font-mono">{pub.year}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>
                  {pub.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{pub.abstract}</p>

                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ti * 0.05 + i * 0.1 }}
                      className={`px-2 py-0.5 rounded text-xs border ${c.tag}`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            );

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {isPublished ? (
                  <GlowBorder borderRadius="1rem">{card}</GlowBorder>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Research interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SpotlightCard
            className="mt-10 sm:mt-12 glass-strong rounded-2xl p-6 sm:p-8 border border-white/5 text-center"
            spotlightColor="rgba(99,102,241,0.08)"
          >
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>Research Interests</h3>
            <p className="text-white/50 text-sm mb-6 max-w-xl mx-auto">
              Actively exploring research problems at the intersection of AI safety, network security, and intelligent automation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Adversarial Machine Learning', 'Explainable AI (XAI)',
                'Federated Learning', 'Cyber Threat Intelligence',
                'Zero-Day Vulnerability Detection', 'LLM Security',
              ].map((interest, i) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-indigo-500/20 text-indigo-300"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
