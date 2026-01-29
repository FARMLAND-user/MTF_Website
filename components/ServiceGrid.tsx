
import React from 'react';
import { useCMS } from '../App';
import { Sparkles, Compass, Layers, Cpu, ArrowUpRight } from 'lucide-react';

const IconMap: any = {
  Sparkles,
  Compass,
  Layers,
  Cpu
};

const ServiceGrid: React.FC = () => {
  const { data } = useCMS();

  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl mb-4 font-anton text-[#FF5E00]">Our Expertise</h2>
        <div className="h-1 w-24 bg-[#FF5E00]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.services.map((service, idx) => {
          const Icon = IconMap[service.icon] || Sparkles;
          return (
            <div 
              key={service.id}
              className={`group relative p-8 bg-[#121212] border border-white/5 hover:border-[#FF5E00]/50 transition-all duration-500 flex flex-col h-full ${
                idx === 1 || idx === 2 ? 'lg:translate-y-12' : ''
              }`}
            >
              <div className="mb-8 p-3 w-fit bg-white/5 group-hover:bg-[#FF5E00] transition-colors duration-300 rounded-lg">
                <Icon className="w-6 h-6 text-[#FF5E00] group-hover:text-black transition-colors" />
              </div>
              
              <h3 className="text-2xl font-anton mb-4 leading-tight group-hover:text-[#FF5E00] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-white/60 font-light leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#FF5E00] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                Learn More <ArrowUpRight size={14} />
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-[1px] h-full bg-[#FF5E00]"></div>
                <div className="absolute top-0 right-0 h-[1px] w-full bg-[#FF5E00]"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceGrid;
