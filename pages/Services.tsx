
import React from 'react';
import { useCMS } from '../App';
import { Sparkles, Compass, Layers, Cpu, Globe, Target } from 'lucide-react';

const IconMap: any = { Sparkles, Compass, Layers, Cpu, Globe, Target };

const Services: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Hero Header */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-[12vw] font-anton leading-[0.85] text-[#FF5E00] mb-8">
          CAPABILITIES<br/><span className="text-white">& STRATEGY.</span>
        </h1>
        <p className="text-xl md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
          At {data.config.siteTitle}, we don't just manage brands; we architect their future presence in the global collective consciousness.
        </p>
      </section>

      {/* Main Capabilities Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
        {data.services.map((cap, i) => {
          const Icon = IconMap[cap.icon] || Sparkles;
          return (
            <div key={cap.id} className="bg-[#050505] p-12 group hover:bg-[#FF5E00]/5 transition-colors duration-500">
              <Icon className="w-10 h-10 text-[#FF5E00] mb-8" />
              <h3 className="text-3xl font-anton mb-6">{cap.title}</h3>
              <p className="text-white/50 leading-relaxed font-light text-lg">{cap.description}</p>
            </div>
          );
        })}
      </section>

      {/* Process Section */}
      <section className="py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <h2 className="text-5xl md:text-7xl font-anton text-white">THE CONVERGENCE<br/><span className="text-[#FF5E00]">PROCESS.</span></h2>
            <div className="max-w-md">
              <p className="text-white/40 uppercase tracking-widest text-xs mb-4">Our Methodology</p>
              <p className="text-white/70 leading-relaxed italic">
                A non-linear journey of discovery, synthesis, and execution that ensures every touchpoint represents the brand metaphor perfectly.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {data.process.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-12 group">
                <span className="text-8xl font-anton text-white/5 group-hover:text-[#FF5E00]/20 transition-colors">0{idx + 1}</span>
                <div className="pt-4 flex-grow border-t border-white/10">
                  <h4 className="text-2xl font-anton mb-2">{step.title}</h4>
                  <p className="text-white/40 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
