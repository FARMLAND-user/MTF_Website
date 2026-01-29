import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCMS } from '../App';

const Navbar: React.FC = () => {
  const { data } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact' },
    { name: 'METAFOR AI', path: 'https://www.metaforai.com', isExternal: true }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
          scrolled || location.pathname !== '/' ? 'bg-black/90 backdrop-blur-lg py-4' : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF5E00] rounded-sm rotate-45 flex items-center justify-center">
            <span className="text-black font-anton -rotate-45 text-xs">M</span>
          </div>
          <span className="font-anton text-2xl tracking-tighter">{data.config.siteTitle}</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.filter(l => !l.isExternal).map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                location.pathname === link.path ? 'text-[#FF5E00]' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://www.metaforai.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-2 border border-[#FF5E00]/30 text-[#FF5E00] text-[10px] uppercase font-bold hover:bg-[#FF5E00] hover:text-black transition-all"
          >
            METAFOR AI
          </a>
        </nav>

        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors group"
        >
          <Menu className="w-6 h-6 text-[#FF5E00]" />
        </button>
      </header>

      {/* Fullscreen Overlay */}
      <div className={`fixed inset-0 z-[60] bg-black transition-all duration-700 ease-in-out flex flex-col ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex justify-between items-center p-6 md:p-12">
           <span className="font-anton text-2xl text-[#FF5E00]">Navigation</span>
           <button onClick={() => setIsOpen(false)} className="p-3 bg-[#FF5E00] text-black rounded-full">
             <X size={32} />
           </button>
        </div>

        <nav className="flex-grow flex flex-col justify-center items-center gap-8">
          {navLinks.map((link, i) => (
            link.isExternal ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-8xl font-anton hover:text-[#FF5E00] transition-colors"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-8xl font-anton hover:text-[#FF5E00] transition-colors"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="p-12 text-center text-white/40 text-sm tracking-widest uppercase">
          {data.config.tagline} &copy; 2024
        </div>
      </div>
    </>
  );
};

export default Navbar;