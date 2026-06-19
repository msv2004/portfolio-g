import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Marri Shashe Vikaash | AI Engineer & Software Developer',
  description:
    'Portfolio of Marri Shashe Vikaash — AI Engineer, Software Developer, and Machine Learning Enthusiast. Explore projects in AI, ML, cybersecurity, and cloud computing.',
  keywords: [
    'Marri Shashe Vikaash',
    'AI Engineer',
    'Software Developer',
    'Machine Learning',
    'Portfolio',
    'Python',
    'React',
    'Next.js',
    'Cybersecurity',
    'Deep Learning',
  ],
  authors: [{ name: 'Marri Shashe Vikaash', url: 'https://github.com/msv2004' }],
  openGraph: {
    title: 'Marri Shashe Vikaash | AI Engineer & Software Developer',
    description: 'Premium 3D portfolio showcasing AI, ML, and software engineering projects.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marri Shashe Vikaash | AI Engineer & Software Developer',
    description: 'Premium 3D portfolio showcasing AI, ML, and software engineering projects.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${syne.variable}`}>
      <body className="bg-[#050508] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
