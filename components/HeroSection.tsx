
import React, { useEffect, useRef } from 'react';
import { useCMS } from '../App';
import UniverseBackground from './UniverseBackground';
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
        ease: "power4.out"
      });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#000]">
      {/* Interactive Universe Background */}
      <UniverseBackground />

      {/* Hero Text */}
      <div className="relative z-10 text-center px-4 mix-blend-screen pointer-events-none">
        <h1 className="hero-title text-[15vw] md:text-[20vw] leading-none font-anton flex justify-center overflow-hidden select-none">
          {data.config.siteTitle.split('').map((char, i) => (
            <span key={i} className="inline-block text-white">{char}</span>
          ))}
        </h1>
        <p className="hero-subtitle mt-4 text-lg md:text-2xl font-light tracking-[0.3em] uppercase opacity-80 text-[#FF5E00]">
          {data.config.tagline}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white">Explore</span>
        <div className="w-[1px] h-12 bg-[#FF5E00] origin-top animate-pulse"></div>
      </div>
      
      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[5]"></div>
    </section>
  );
};

export default HeroSection;
