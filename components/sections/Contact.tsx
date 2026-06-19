'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import MagneticButton from '@/components/ui/MagneticButton';
import {
  Mail, Linkedin, Github, Send, CheckCircle,
  AlertCircle, Loader2, MapPin, Phone
} from 'lucide-react';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ym8w2qc';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_wb6i2ho';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'P4Pkk7F9t90b_8j_n';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const socialLinks = [
  { icon: Mail,     label: 'Email',    value: 'shashevikaash@gmail.com',        href: 'mailto:shashevikaash@gmail.com',        color: 'text-rose-400',    bg: 'bg-rose-500/10 border-rose-500/20',     spotlight: 'rgba(244,63,94,0.1)' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Marri Shashe Vikaash',           href: 'https://linkedin.com/in/shashe-vikaash', color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',     spotlight: 'rgba(59,130,246,0.1)' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/msv2004',             href: 'https://github.com/msv2004',            color: 'text-white/70',    bg: 'bg-white/5 border-white/10',            spotlight: 'rgba(255,255,255,0.04)' },
  { icon: MapPin,   label: 'Location', value: 'Chennai, Tamil Nadu, India',     href: '#',                                     color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', spotlight: 'rgba(16,185,129,0.08)' },
  { icon: Phone,    label: 'Phone',    value: '+91 8309625946',                 href: 'tel:+918309625946',                     color: 'text-indigo-400',  bg: 'bg-indigo-500/10 border-indigo-500/20', spotlight: 'rgba(99,102,241,0.1)' },
];

// Floating label input
function FloatingInput({
  id, type = 'text', name, value, onChange, placeholder, required, className = '',
}: {
  id: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; required?: boolean; className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        id={id} type={type} name={name} value={value}
        onChange={onChange} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full px-4 pt-6 pb-2 rounded-xl glass border text-white text-sm
          focus:outline-none transition-all duration-200 bg-white/2
          ${focused ? 'border-indigo-500/50 input-glow' : 'border-white/8'}
          ${className}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium
          ${focused || hasValue ? 'top-2 text-[10px] text-indigo-400' : 'top-1/2 -translate-y-1/2 text-sm text-white/30'}`}
      >
        {placeholder}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id, name, value, onChange, placeholder, required, rows = 5,
}: {
  id: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string; required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id} name={name} value={value} rows={rows}
        onChange={onChange} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full px-4 pt-6 pb-2 rounded-xl glass border text-white text-sm resize-none
          focus:outline-none transition-all duration-200 bg-white/2
          ${focused ? 'border-indigo-500/50 input-glow' : 'border-white/8'}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium
          ${focused || hasValue ? 'top-2 text-[10px] text-indigo-400' : 'top-4 text-sm text-white/30'}`}
      >
        {placeholder}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '', honeypot: '' }); return; }

    const nameTrim = form.name.trim();
    const emailTrim = form.email.trim();
    const subjectTrim = form.subject.trim();
    const messageTrim = form.message.trim();

    if (!nameTrim || !emailTrim || !subjectTrim || !messageTrim) { setErrorMsg('Please fill in all fields.'); setStatus('error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) { setErrorMsg('Please enter a valid email address.'); setStatus('error'); return; }
    if (nameTrim.length < 2) { setErrorMsg('Please enter a valid name (at least 2 characters).'); setStatus('error'); return; }
    if (messageTrim.length < 10) { setErrorMsg('Message is too short (minimum 10 characters).'); setStatus('error'); return; }

    const spamKeywords = ['crypto', 'bitcoin', 'ethereum', 'investment return', 'make money', 'earn money', 'casino', 'lottery', 'seo rank', 'buy traffic', 'viagra'];
    const messageLower = messageTrim.toLowerCase();
    const hasSpam = spamKeywords.some((k) => messageLower.includes(k));
    const repeating = /(.)\\1{4,}/.test(messageLower);
    const hasVowels = /[aeiouy]/.test(messageLower);
    if (hasSpam || repeating || !hasVowels) { setErrorMsg('Message flagged as potential spam. Please email directly if this is an error.'); setStatus('error'); return; }

    setStatus('sending'); setErrorMsg('');
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: nameTrim, from_email: emailTrim, subject: subjectTrim, message: messageTrim, to_email: 'shashevikaash@gmail.com' }, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please email me directly at shashevikaash@gmail.com');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section relative">
      {/* Background beam */}
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
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* CTA card */}
            <SpotlightCard
              className="glass-strong rounded-2xl p-8 border border-indigo-500/15"
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
                Ready to make an <span className="gradient-text">impact</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                I&apos;m actively seeking <strong className="text-white/80">internships</strong> and{' '}
                <strong className="text-white/80">entry-level positions</strong> in AI/ML, Software Engineering,
                Cloud Computing, and Cybersecurity. I bring a strong academic foundation, real-world
                internship experience, and a passion for building intelligent systems.
              </p>
            </SpotlightCard>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ icon: Icon, label, value, href, color, bg, spotlight }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <SpotlightCard
                    className={`flex items-center gap-4 p-4 rounded-xl border ${bg} transition-all duration-200 group`}
                    spotlightColor={spotlight}
                  >
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

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpotlightCard
              className="glass-strong rounded-2xl p-8 border border-white/5"
              spotlightColor="rgba(99,102,241,0.08)"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne, var(--font-inter))' }}>Send a Message</h3>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput id="contact-name"    name="name"    value={form.name}    onChange={handleChange} placeholder="Your Name"    required />
                  <FloatingInput id="contact-email"   name="email"   value={form.email}   onChange={handleChange} placeholder="Your Email"   required type="email" />
                </div>
                <FloatingInput id="contact-subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required />
                <FloatingTextarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required rows={5} />

                {/* Status */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3"
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      Message sent! I&apos;ll get back to you soon. 🎉
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg || 'Failed to send. Please email me directly.'}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <MagneticButton
                  type="submit"
                  as="button"
                  disabled={status === 'sending'}
                  strength={0.2}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm
                             bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed
                             text-white transition-all duration-200 relative overflow-hidden group
                             hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                  <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'sending' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" />Send Message</>
                    )}
                  </span>
                </MagneticButton>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
