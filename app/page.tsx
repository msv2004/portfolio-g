'use client';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Research from '@/components/sections/Research';
import Awards from '@/components/sections/Awards';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050508] overflow-x-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" />
      {/* Radial glow background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-3/4 left-1/2 w-[400px] h-[400px] bg-cyan-600/4 rounded-full blur-[100px]" />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Research />
      <Awards />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
