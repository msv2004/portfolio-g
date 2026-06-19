'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm">
          <span className="gradient-text font-bold">MSV</span>
          <span className="text-white/30 ml-1">Portfolio · 2025</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-white/30">
          Built with
          <Heart className="w-3 h-3 mx-1 text-rose-500 fill-rose-500" />
          using Next.js, Three.js & Framer Motion
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: 'https://github.com/msv2004', label: 'GitHub' },
            { href: 'https://linkedin.com/in/shashe-vikaash', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:shashevikaash@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-white/40 hover:text-white/90 hover:bg-white/5 transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
