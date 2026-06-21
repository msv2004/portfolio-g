'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  Mail, Linkedin, Github, Send, CheckCircle,
  AlertCircle, Loader2, MapPin, ShieldCheck, MessageSquare
} from 'lucide-react';

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'service_ym8w2qc';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_wb6i2ho';
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'P4Pkk7F9t90b_8j_n';

interface FormData { name: string; email: string; subject: string; message: string; honeypot: string; }
type Status = 'idle' | 'sending' | 'success' | 'error';

const socialLinks = [
  { icon: Mail,     label: 'Email',    value: 'shashevikaash@gmail.com',       href: 'mailto:shashevikaash@gmail.com',         color: 'text-rose-400',    bg: 'bg-rose-500/10 border-rose-500/20',         spotlight: 'rgba(244,63,94,0.1)' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Marri Shashe Vikaash',          href: 'https://linkedin.com/in/shashe-vikaash', color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20',         spotlight: 'rgba(59,130,246,0.1)' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/msv2004',            href: 'https://github.com/msv2004',             color: 'text-white/70',    bg: 'bg-white/5 border-white/10',                spotlight: 'rgba(255,255,255,0.04)' },
  { icon: MapPin,   label: 'Location', value: 'Chennai, Tamil Nadu, India',    href: '#',                                      color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20',   spotlight: 'rgba(16,185,129,0.08)' },
];

/* Simple clean input — no floating label, visible placeholder */
function Input({
  id, type = 'text', name, value, onChange, placeholder, required,
}: {
  id: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; required?: boolean;
}) {
  return (
    <input
      id={id} type={type} name={name} value={value}
      onChange={onChange} required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30
                 bg-white/5 border border-white/10 focus:border-indigo-500/60
                 focus:outline-none focus:bg-white/7 transition-all duration-200"
    />
  );
}

function Textarea({
  id, name, value, onChange, placeholder, required, rows = 6,
}: {
  id: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string; required?: boolean; rows?: number;
}) {
  return (
    <textarea
      id={id} name={name} value={value} rows={rows}
      onChange={onChange} required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30
                 bg-white/5 border border-white/10 focus:border-indigo-500/60
                 focus:outline-none focus:bg-white/7 transition-all duration-200 resize-none"
    />
  );
}

export default function Contact() {
  const [form, setForm]     = useState<FormData>({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) { setStatus('success'); return; }

    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please fill in all fields.'); setStatus('error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.'); setStatus('error'); return;
    }
    if (message.trim().length < 10) {
      setErrorMsg('Message is too short (minimum 10 characters).'); setStatus('error'); return;
    }

    setStatus('sending'); setErrorMsg('');
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: name.trim(), from_email: email.trim(), subject: subject.trim(), message: message.trim(), to_email: 'shashevikaash@gmail.com' },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please email me directly at shashevikaash@gmail.com');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/6 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-1 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent beam-sweep" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <SectionHeader
          badge="Contact"
          title="Let's"
          highlight="Connect"
          subtitle="Open to internships, full-time roles, collaborations, and research opportunities. Let's build something great together."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Left: Info cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <SpotlightCard
              className="glass-strong rounded-2xl p-7 border border-indigo-500/15"
              spotlightColor="rgba(99,102,241,0.12)"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Available for Opportunities</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>
                Ready to make an{' '}
                <motion.span
                  className="inline-block"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  impact
                </motion.span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Actively seeking <strong className="text-white/80">internships</strong> and{' '}
                <strong className="text-white/80">entry-level positions</strong> in AI/ML, Software Engineering,
                Cloud Computing, and Cybersecurity. Strong academic foundation, real-world internship
                experience, and a passion for intelligent systems.
              </p>
            </SpotlightCard>

            <div className="flex flex-col gap-3">
              {socialLinks.map(({ icon: Icon, label, value, href, color, bg, spotlight }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <SpotlightCard className={`flex items-center gap-4 p-4 rounded-xl border ${bg} group`} spotlightColor={spotlight}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 w-full"
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-lg ${bg} border flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className={`w-4 h-4 ${color}`} />
                      </motion.div>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{value}</p>
                      </div>
                    </a>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Contact Form — matches reference image ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-strong rounded-2xl border border-white/8 overflow-hidden">
              {/* Header bar */}
              <div className="px-7 pt-7 pb-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(236,72,153,0.4)]">
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>
                    Send a Message
                  </h3>
                </div>
                <p className="text-sm text-white/40 ml-10">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* Separator */}
              <div className="h-px bg-white/6 mx-7" />

              {/* Form body */}
              <form ref={formRef} onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <Input id="c-name"    name="name"    value={form.name}    onChange={handleChange} placeholder="Your Name *"  required />
                  <Input id="c-email"   name="email"   value={form.email}   onChange={handleChange} placeholder="Your Email *" required type="email" />
                </div>

                {/* Subject */}
                <Input id="c-subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject *" required />

                {/* Message */}
                <Textarea id="c-message" name="message" value={form.message} onChange={handleChange} placeholder="Your Message *" required rows={7} />

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div key="ok" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      Message sent! I&apos;ll get back to you soon. 🎉
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div key="err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg || 'Failed to send. Please email me directly.'}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer: privacy note + send button */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-white/70">Your information is safe with me.</p>
                      <p className="text-xs text-white/35">I respect your privacy.</p>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(249,115,22,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white
                               disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0
                               transition-all duration-200 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
                      boxShadow: '0 0 16px rgba(249,115,22,0.3)',
                    }}
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2">
                      {status === 'sending' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" />Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" />Send Message</>
                      )}
                    </span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
