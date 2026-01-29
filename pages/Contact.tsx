
import React from 'react';
import { useCMS } from '../App';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="bg-[#050505] min-h-screen">
      <section className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-[10vw] font-anton text-[#FF5E00] leading-none mb-12">LOCATE<br/>THE CORE.</h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
        {/* Left: Info & Form */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">HQ Address</span>
                <p className="text-lg font-light leading-snug">{data.config.address}</p>
             </div>
             <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Inquiries</span>
                <p className="text-lg font-light leading-snug">{data.config.contactEmail}<br/>{data.contact.phone}</p>
             </div>
          </div>

          <form className="space-y-6 pt-12 border-t border-white/5" onSubmit={(e) => e.preventDefault()}>
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Name</label>
                   <input className="w-full bg-[#111] border border-white/10 p-4 outline-none focus:border-[#FF5E00] transition-colors" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email</label>
                   <input className="w-full bg-[#111] border border-white/10 p-4 outline-none focus:border-[#FF5E00] transition-colors" placeholder="Email Address" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Inquiry Type</label>
                <select className="w-full bg-[#111] border border-white/10 p-4 outline-none focus:border-[#FF5E00] transition-colors appearance-none">
                   <option>Brand Consultation</option>
                   <option>Strategic Partnership</option>
                   <option>Global Expansion</option>
                   <option>Career Inquiry</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea className="w-full bg-[#111] border border-white/10 p-4 outline-none focus:border-[#FF5E00] transition-colors h-48" placeholder="Tell us about your brand vision..." />
             </div>
             <button className="bg-[#FF5E00] text-black w-full py-6 font-anton text-xl hover:bg-white transition-all flex items-center justify-center gap-3">
                INITIATE CONVERGENCE <ArrowRight />
             </button>
          </form>
        </div>

        {/* Right: Map Integration */}
        <div className="relative h-[600px] lg:h-auto rounded-2xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src={data.contact.mapEmbedUrl} 
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
             <h4 className="font-anton text-[#FF5E00] mb-2">SEOUL HEADQUARTERS</h4>
             <p className="text-xs text-white/60 leading-relaxed italic">
                Located in the heart of Gangnam's strategic district, our office serves as the central hub for global convergence.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
