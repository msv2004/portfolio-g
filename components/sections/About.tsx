'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
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
  { icon: Brain, label: 'Artificial Intelligence & ML', color: 'text-indigo-400' },
  { icon: Code2, label: 'Software Engineering', color: 'text-purple-400' },
  { icon: Cloud, label: 'Cloud Computing (Azure, AWS)', color: 'text-cyan-400' },
  { icon: Shield, label: 'Cybersecurity & Intrusion Detection', color: 'text-emerald-400' },
];

const colorMap: Record<string, string> = {
  indigo: 'border-indigo-500/30 bg-indigo-500/5',
  purple: 'border-purple-500/30 bg-purple-500/5',
  cyan: 'border-cyan-500/30 bg-cyan-500/5',
};

const dotMap: Record<string, string> = {
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  cyan: 'bg-cyan-500',
};

export default function About() {
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
          {/* Left: About Text + Interests */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* About Card */}
            <div className="glass-strong rounded-2xl p-6 sm:p-8 border border-white/5">
              <div className="flex items-center gap-4 mb-5">
                {/* Profile Photo */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-indigo-500/30 flex-shrink-0">
                  <Image
                    src="/profile.png"
                    alt="Marri Shashe Vikaash"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-base">Marri Shashe Vikaash</p>
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
            </div>

            {/* Interests */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                Core Interests
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(({ icon: Icon, label, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/3 border border-white/5"
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                    <span className="text-xs text-white/70">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['English', 'Hindi', 'Telugu', 'German (A2)'].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-white/10 text-white/70"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-cyan-500/20" />

              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.school}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className={`relative pl-14 p-5 rounded-2xl border ${colorMap[edu.color]} transition-all duration-300 hover:scale-[1.01] cursor-default`}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-3.5 top-6 w-3 h-3 rounded-full ${dotMap[edu.color]} ring-2 ring-[#050508] z-10`} />

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white leading-tight">{edu.degree}</h4>
                      <span className="text-xs font-mono text-white/40 whitespace-nowrap">{edu.period}</span>
                    </div>
                    <p className="text-xs text-white/60 mb-2">{edu.school}</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        edu.color === 'indigo' ? 'bg-indigo-500/15 text-indigo-400' :
                        edu.color === 'purple' ? 'bg-purple-500/15 text-purple-400' :
                        'bg-cyan-500/15 text-cyan-400'
                      }`}>
                        {edu.score}
                      </span>
                      <span className="text-xs text-white/30 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div className="glass rounded-2xl p-6 border border-white/5 mt-2">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                Leadership & Activities
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { title: 'Student Organizer', desc: 'NEXTRA Symposium 2023 — managed technical events & team operations' },
                  { title: 'Student Head — Math Club', desc: 'Led problem-solving sessions & academic events (2024)' },
                  { title: 'English Club Member', desc: 'Improved professional communication & presentation skills' },
                  { title: 'Core Organizer', desc: 'Weightlifting Competition — event coordination' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white/80">{title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
