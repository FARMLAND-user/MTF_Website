
import React, { useState } from 'react';
import { useCMS } from '../App';
import { Mail, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalModal from './LegalModal';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../constants/legalContent';

const Footer: React.FC = () => {
  const { data } = useCMS();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  
  const [activeLegal, setActiveLegal] = useState<'privacy' | 'terms' | null>(null);

  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount >= 5) {
      setClickCount(0);
      navigate('/admin');
    } else {
      setClickCount(nextCount);
    }
  };

  return (
    <footer id="contact" className="bg-[#0A0A0A] pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
        <div>
          <h2 className="text-6xl md:text-8xl font-anton mb-8 text-[#FF5E00]">Let's Connect</h2>
          <p className="text-xl text-white/60 font-light max-w-md leading-relaxed">
            METAFOR is not just a name; it is the convergence DNA that defines how we transform businesses into legendary brands.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF5E00] group-hover:border-[#FF5E00] transition-all">
                <Mail size={20} className="group-hover:text-black" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/40">Email Us</span>
                <span className="text-xl font-medium">{data.config.contactEmail}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF5E00] group-hover:border-[#FF5E00] transition-all">
                <MapPin size={20} className="group-hover:text-black" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/40">Visit Office</span>
                <span className="text-xl font-medium">{data.config.address}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF5E00] hover:text-black transition-all">
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-[10px] tracking-[0.3em] uppercase">
        <span 
          onClick={handleSecretClick}
          className="cursor-default hover:text-white/60 transition-colors select-none"
        >
          &copy; 2026 METAFOR GROUP. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveLegal('privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setActiveLegal('terms')}
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </button>
        </div>
      </div>

      {/* Legal Modals */}
      <LegalModal 
        isOpen={activeLegal === 'privacy'}
        onClose={() => setActiveLegal(null)}
        title={PRIVACY_POLICY.title}
        lastUpdated={PRIVACY_POLICY.lastUpdated}
        content={PRIVACY_POLICY.content}
      />
      <LegalModal 
        isOpen={activeLegal === 'terms'}
        onClose={() => setActiveLegal(null)}
        title={TERMS_OF_SERVICE.title}
        lastUpdated={TERMS_OF_SERVICE.lastUpdated}
        content={TERMS_OF_SERVICE.content}
      />
    </footer>
  );
};

export default Footer;
