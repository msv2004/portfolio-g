'use client';

import dynamic from 'next/dynamic';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import PageLoader from '@/components/ui/PageLoader';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { motion, useScroll, useTransform } from 'framer-motion';

// Code-split below-the-fold sections
const About = dynamic(() => import('@/components/sections/About'), { ssr: true });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: true });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: true });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: true });
const Research = dynamic(() => import('@/components/sections/Research'), { ssr: true });
const Awards = dynamic(() => import('@/components/sections/Awards'), { ssr: true });
const Certifications = dynamic(() => import('@/components/sections/Certifications'), { ssr: true });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });

export default function Home() {
  const { scrollYProgress } = useScroll();
  const glow1X = useTransform(scrollYProgress, [0, 1], ['25%', '60%']);
  const glow2X = useTransform(scrollYProgress, [0, 1], ['75%', '30%']);
  const glow3Y = useTransform(scrollYProgress, [0, 1], ['75%', '40%']);

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />

      <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
        {/* Fixed grid background */}
        <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" />

        {/* Noise texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scroll-driven ambient glows */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full bg-indigo-600/5 blur-[140px]"
            style={{ left: glow1X, top: '20%' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[120px]"
            style={{ left: glow2X, top: '50%' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-cyan-600/4 blur-[100px]"
            style={{ left: '50%', top: glow3Y }}
          />
        </motion.div>

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
    </>
  );
}
