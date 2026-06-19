'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, Loader2, MapPin, Phone } from 'lucide-react';

// EmailJS config — fall back to hardcoded keys if environment variables are not available
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
  {
    icon: Mail,
    label: 'Email',
    value: 'shashevikaash@gmail.com',
    href: 'mailto:shashevikaash@gmail.com',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Marri Shashe Vikaash',
    href: 'https://linkedin.com/in/shashe-vikaash',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/msv2004',
    href: 'https://github.com/msv2004',
    color: 'text-white/70',
    bg: 'bg-white/5 border-white/10',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Chennai, Tamil Nadu, India',
    href: '#',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8309625946',
    href: 'tel:+918309625946',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
];

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

    // 1. Honeypot bot protection check
    if (form.honeypot) {
      console.warn('Bot submission blocked via honeypot.');
      setStatus('success'); // Pretend success so bots stop retrying
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
      return;
    }

    // 2. Validate empty values
    const nameTrim = form.name.trim();
    const emailTrim = form.email.trim();
    const subjectTrim = form.subject.trim();
    const messageTrim = form.message.trim();

    if (!nameTrim || !emailTrim || !subjectTrim || !messageTrim) {
      setErrorMsg('Please fill in all fields.');
      setStatus('error');
      return;
    }

    // 3. Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    // 4. Validate names and messages for length and spam
    if (nameTrim.length < 2) {
      setErrorMsg('Please enter a valid name (at least 2 characters).');
      setStatus('error');
      return;
    }

    if (messageTrim.length < 10) {
      setErrorMsg('Message is too short (minimum 10 characters).');
      setStatus('error');
      return;
    }

    // Check for spam words / gibberish patterns
    const spamKeywords = [
      'crypto', 'bitcoin', 'ethereum', 'solana', 'investment return', 'make money',
      'earn money', 'get rich', 'casino', 'lottery', 'seo rank', 'buy traffic',
      'viagra', 'cialis', 'dating service', 'test message asdf', 'spam test'
    ];
    const messageLower = messageTrim.toLowerCase();
    const hasSpamKeyword = spamKeywords.some((keyword) => messageLower.includes(keyword));

    // Check for repeating characters (e.g. "aaaaa", "qwertyqwerty", etc.)
    const repeatingChars = /(.)\1{4,}/.test(messageLower) || /(.)\1{4,}/.test(nameTrim.toLowerCase());

    // Check if the message is completely gibberish (e.g. no vowels at all or only random symbols)
    const hasVowels = /[aeiouy]/.test(messageLower);

    if (hasSpamKeyword || repeatingChars || !hasVowels) {
      setErrorMsg('Message was flagged as potential spam. If this is an error, please reach out via email.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS not configured');
      }
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: nameTrim,
          from_email: emailTrim,
          subject: subjectTrim,
          message: messageTrim,
          to_email: 'shashevikaash@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please email me directly at shashevikaash@gmail.com');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm placeholder-white/25 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 bg-white/2';

  return (
    <section id="contact" className="section relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/5 blur-[100px]" />
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
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* CTA card */}
            <div className="glass-strong rounded-2xl p-8 border border-indigo-500/15">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Available for Opportunities
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to make an <span className="gradient-text">impact</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                I&apos;m actively seeking <strong className="text-white/80">internships</strong> and{' '}
                <strong className="text-white/80">entry-level positions</strong> in AI/ML, Software Engineering,
                Cloud Computing, and Cybersecurity. I bring a strong academic foundation, real-world
                internship experience, and a passion for building intelligent systems.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ icon: Icon, label, value, href, color, bg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${bg} transition-all duration-200 group`}
                >
                  <div className={`w-10 h-10 rounded-lg ${bg} border flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-strong rounded-2xl p-8 border border-white/5 flex flex-col gap-5"
            >
              <h3 className="text-lg font-bold text-white">Send a Message</h3>

              {/* Honeypot field (hidden from users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Opportunity / Collaboration / Research..."
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about the opportunity, project, or collaboration..."
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMsg || 'Failed to send. Please email me directly at shashevikaash@gmail.com'}
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm
                           bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed
                           text-white transition-all duration-200"
                whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 25px rgba(99,102,241,0.5)' } : {}}
                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
