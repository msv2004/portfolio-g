'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: 'Oracle Database SQL Certified',
    issuer: 'Oracle',
    date: 'July 2025',
    category: 'Database',
    color: 'red',
    emoji: '🔴',
    credential: 'https://drive.google.com/file/d/1_ptV8yCYyukHcLMnEtsa5KUkEixKZGFB/view',
    skills: ['SQL', 'Database Design', 'Query Optimization', 'PL/SQL'],
    level: 'Associate',
  },
  {
    id: 2,
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'February 2024',
    category: 'Cloud',
    color: 'blue',
    emoji: '☁️',
    credential: 'https://drive.google.com/file/d/1o3BQTNTpLdJVrupn_ehaqspThejng0_T/view',
    skills: ['Azure Services', 'Cloud Computing', 'IaaS/PaaS', 'Azure Security'],
    level: 'Fundamentals',
  },
  {
    id: 3,
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'Cybersecurity',
    color: 'cyan',
    emoji: '🛡️',
    credential: '#',
    skills: ['Network Security', 'Cyber Threats', 'Security Fundamentals', 'Risk Management'],
    level: 'Foundation',
  },
  {
    id: 4,
    title: 'Internet of Things (Elite)',
    issuer: 'NPTEL',
    date: 'October 2024',
    category: 'IoT',
    color: 'emerald',
    emoji: '📡',
    credential: 'https://drive.google.com/file/d/1mi8J9hVZcSTDa0mOyRPVVI_O5zCj4uo0/view',
    skills: ['IoT Architecture', 'Embedded Systems', 'Sensors & Actuators', 'IoT Protocols'],
    level: 'Elite',
  },
  {
    id: 5,
    title: 'Management Information System (Elite)',
    issuer: 'NPTEL',
    date: 'October 2025',
    category: 'Management',
    color: 'orange',
    emoji: '📊',
    credential: 'https://drive.google.com/file/d/1oucfkBpjV21yein6xflmWu4_id0TnHOQ/view',
    skills: ['MIS Frameworks', 'Enterprise Systems', 'Decision Support', 'ERP Systems'],
    level: 'Elite',
  },
  {
    id: 6,
    title: 'Oracle Cloud Application Foundation',
    issuer: 'Oracle',
    date: '2024',
    category: 'Cloud',
    color: 'red',
    emoji: '🏛️',
    credential: '#',
    skills: ['Oracle Cloud', 'SaaS Applications', 'Cloud ERP', 'Cloud Infrastructure'],
    level: 'Foundation',
  },
  {
    id: 7,
    title: 'HackerRank Python Certification',
    issuer: 'HackerRank',
    date: '2024',
    category: 'Programming',
    color: 'green',
    emoji: '🐍',
    credential: '#',
    skills: ['Python', 'Data Structures', 'Algorithms', 'Problem Solving'],
    level: 'Certified',
  },
  {
    id: 8,
    title: 'German Language — A2 Level',
    issuer: 'Goethe-Institut',
    date: '2024',
    category: 'Language',
    color: 'yellow',
    emoji: '🇩🇪',
    credential: '#',
    skills: ['German Grammar', 'Conversational German', 'Written Communication', 'Cultural Context'],
    level: 'A2',
  },
];

const colorMap: Record<string, { border: string; badge: string; tag: string; glow: string }> = {
  red: { border: 'border-red-500/20 hover:border-red-500/40', badge: 'bg-red-500/10 text-red-400 border-red-500/20', tag: 'bg-red-500/8 text-red-300', glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]' },
  blue: { border: 'border-blue-500/20 hover:border-blue-500/40', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', tag: 'bg-blue-500/8 text-blue-300', glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
  cyan: { border: 'border-cyan-500/20 hover:border-cyan-500/40', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', tag: 'bg-cyan-500/8 text-cyan-300', glow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]' },
  emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/40', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', tag: 'bg-emerald-500/8 text-emerald-300', glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]' },
  orange: { border: 'border-orange-500/20 hover:border-orange-500/40', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', tag: 'bg-orange-500/8 text-orange-300', glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]' },
  green: { border: 'border-green-500/20 hover:border-green-500/40', badge: 'bg-green-500/10 text-green-400 border-green-500/20', tag: 'bg-green-500/8 text-green-300', glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]' },
  yellow: { border: 'border-yellow-500/20 hover:border-yellow-500/40', badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', tag: 'bg-yellow-500/8 text-yellow-300', glow: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]' },
};

const issuers = [...new Set(certifications.map((c) => c.issuer))];

export default function Certifications() {
  return (
    <section id="certifications" className="section relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Certifications"
          title="Verified"
          highlight="Credentials"
          subtitle="Industry-recognized certifications from Oracle, Microsoft, Cisco, NPTEL, HackerRank, and more."
        />

        {/* Issuer logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {issuers.map((issuer, i) => (
            <motion.span
              key={issuer}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-xl glass border border-white/10 text-xs font-semibold text-white/60"
            >
              {issuer}
            </motion.span>
          ))}
        </motion.div>

        {/* Certs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => {
            const c = colorMap[cert.color];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`glass rounded-2xl border ${c.border} ${c.glow} p-5 transition-all duration-300 flex flex-col gap-3`}
              >
                {/* Icon + Level */}
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{cert.emoji}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.badge}`}>
                    {cert.level}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight mb-1">{cert.title}</h3>
                  <p className="text-xs text-white/40">{cert.issuer} · {cert.date}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 flex-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className={`text-xs px-2 py-0.5 rounded ${c.tag}`}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Credential link */}
                {cert.credential !== '#' ? (
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors mt-auto pt-2 border-t border-white/5"
                  >
                    <Award className="w-3 h-3" />
                    View Credential
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-white/25 mt-auto pt-2 border-t border-white/5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Verified
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Total count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-white/30 mt-10"
        >
          {certifications.length} certifications across Cloud, AI/ML, Cybersecurity, and more
        </motion.p>
      </div>
    </section>
  );
}
