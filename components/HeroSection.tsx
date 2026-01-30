
import React, { useEffect, useRef } from 'react';
import { useCMS } from '../App.tsx';
import UniverseBackground from './UniverseBackground.tsx';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const { data } = useCMS();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
      });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        delay: 1,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#000]">
      {/* Original Dynamic Universe Background */}
      <UniverseBackground />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 mix-blend-screen pointer-events-none">
        <h1 className="hero-title text-[8.5vw] md:text-[9vw] leading-[0.75] font-anton tracking-[-0.07em] flex justify-center overflow-hidden select-none">
          {data.config.siteTitle.split('').map((char, i) => (
            <span key={i} className="inline-block text-white font-black drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
              {char}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle mt-10 text-[10px] md:text-xs font-black tracking-[0.8em] uppercase opacity-100 text-[#FF5E00] drop-shadow-[0_5px_15px_rgba(255,94,0,0.4)]">
          {data.config.tagline}
        </p>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 z-20">
        <span className="text-[9px] tracking-[0.5em] uppercase text-white font-bold">Converge</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#FF5E00] to-transparent origin-top animate-bounce"></div>
      </div>
      
      {/* Artistic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_100%)] z-[5]"></div>
    </section>
  );
};

export default HeroSection;
