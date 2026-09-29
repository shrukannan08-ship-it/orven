import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-white/[0.08] pt-20 pb-12 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-brand text-2xl font-bold tracking-[0.28em] text-[#f5f2eb]">
                ORVÉN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>

            <div className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
              CRAFTED FOR TIME.
            </div>

            <p className="font-sans-ui text-xs text-[#b8b2a5] leading-relaxed max-w-sm font-light pt-2">
              Independent mechanical manufacture dedicated to the enduring traditions of Genevan haute horlogerie. 
              Pure titanium chronometers engineered for generational permanence.
            </p>
          </div>

          {/* Directory Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#f5f2eb]">
              TIMEPIECES
            </div>
            <ul className="space-y-2 text-xs font-sans-ui text-[#b8b2a5]">
              <li><a href="#product" className="hover:text-[#c5a880] transition-colors">ORVÉN / 001</a></li>
              <li><a href="#collection" className="hover:text-[#c5a880] transition-colors">ORVÉN / 002 (Tourbillon)</a></li>
              <li><a href="#collection" className="hover:text-[#c5a880] transition-colors">ORVÉN / 003 (Perpetual)</a></li>
              <li><a href="#configurator" className="hover:text-[#c5a880] transition-colors">Material Lab</a></li>
            </ul>
          </div>

          {/* Directory Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#f5f2eb]">
              SAVOIR-FAIRE
            </div>
            <ul className="space-y-2 text-xs font-sans-ui text-[#b8b2a5]">
              <li><a href="#exploded" className="hover:text-[#c5a880] transition-colors">Exploded Calibre</a></li>
              <li><a href="#precision" className="hover:text-[#c5a880] transition-colors">Precision Standards</a></li>
              <li><a href="#craft" className="hover:text-[#c5a880] transition-colors">5-Axis Machining</a></li>
              <li><a href="#atelier" className="hover:text-[#c5a880] transition-colors">Geneva Atelier</a></li>
            </ul>
          </div>

          {/* Concierge & Location */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#f5f2eb]">
              GENEVA ATELIER
            </div>
            <p className="text-xs text-[#b8b2a5] font-sans-ui leading-relaxed">
              Route de Chêne 18<br />
              1208 Genève, Switzerland<br />
              <span className="text-[#c5a880] font-mono-tech">concierge@orven.ch</span>
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono-tech text-[#b8b2a5]/60 border border-white/[0.08] px-2.5 py-1">
                <ShieldCheck className="w-3 h-3 text-[#c5a880]" />
                SWISS HAUTE HORLOGERIE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-[#b8b2a5]/60">
          <div>
            © {new Date().getFullYear()} ORVÉN MANUFACTURE S.A. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>GENEVA REGISTER: CH-660.1.284.001</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#c5a880] hover:text-[#f5f2eb] transition-colors focus:outline-none"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
