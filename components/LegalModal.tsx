
import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  lastUpdated: string;
  content: string;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, lastUpdated, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[80vh] bg-[#111] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#0A0A0A]">
          <div>
            <h2 className="text-2xl font-anton text-[#FF5E00] uppercase tracking-tighter">{title}</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Last Updated: {lastUpdated}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-[#FF5E00] hover:text-black rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-white/70 leading-relaxed">
              {content}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/5 text-center bg-[#0A0A0A]">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#FF5E00] text-black font-anton text-sm rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            CONFIRM & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
  