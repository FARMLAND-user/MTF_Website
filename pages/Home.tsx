import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceGrid from '../components/ServiceGrid';
import { useCMS } from '../App';

const NewsSection: React.FC = () => {
  const { data } = useCMS();

  return (
    <section id="news" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl md:text-7xl font-anton text-[#FF5E00]">Latest Insights</h2>
          <div className="hidden md:block w-1/2 h-[1px] bg-white/10 mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.news.map((item) => (
            <article key={item.id} className="group">
              <div className="overflow-hidden mb-6 aspect-video bg-[#121212] relative flex items-center justify-center border border-white/5">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <span className="text-[#FF5E00] font-anton text-4xl opacity-10 group-hover:scale-125 transition-transform duration-700">INSIGHT</span>
                )}
                <div className="absolute top-4 left-4 bg-[#FF5E00] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-tighter z-10">
                  {item.category}
                </div>
              </div>
              <div className="flex gap-4 items-center text-[10px] tracking-widest text-white/40 mb-3">
                <span>{item.date}</span>
                <div className="w-8 h-[1px] bg-white/20"></div>
                <span>BY METAFOR STRATEGY</span>
              </div>
              <h3 className="text-3xl font-anton mb-4 group-hover:text-[#FF5E00] transition-colors cursor-pointer uppercase">
                {item.title}
              </h3>
              <p className="text-white/60 font-light line-clamp-2 leading-relaxed">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="smooth-scroll-container">
      <HeroSection />
      
      {/* Philosophy Callout */}
      <section className="py-32 px-6 text-center bg-[#080808]">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#FF5E00] text-xs tracking-[0.5em] uppercase mb-8 block font-bold">The Core Concept</span>
          <h2 className="text-4xl md:text-6xl font-anton leading-tight mb-8">
            "METAFOR = Something used to represent <span className="text-[#FF5E00] italic">Something Else.</span>"
          </h2>
          <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
            We bridge the gap between abstract brand potential and tangible market reality. 
            Through strategy and convergence, we define the symbols that shape the future.
          </p>
        </div>
      </section>

      <ServiceGrid />
      <NewsSection />
    </div>
  );
};

export default Home;