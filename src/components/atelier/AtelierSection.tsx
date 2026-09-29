import React from 'react';
import { MapPin } from 'lucide-react';

export const AtelierSection: React.FC = () => {
  return (
    <section
      id="atelier"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#09090b] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                07 / MANUFACTURE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              THE GENEVA <span className="italic gold-gradient-text">ATELIER</span>
            </h2>
          </div>

          <div className="mt-4 lg:mt-0 flex items-center gap-2 text-xs font-mono-tech text-[#b8b2a5]">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>ROUTE DE CHÊNE 18, 1208 GENEVA, SWITZERLAND</span>
          </div>
        </div>

        {/* Large Editorial Manifesto Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-brand text-3xl sm:text-4xl lg:text-5xl text-[#f5f2eb] font-light leading-[1.15]">
              INDEPENDENT. <br />
              DELIBERATE. <br />
              <span className="gold-gradient-text italic font-normal">MECHANICAL.</span>
            </div>

            <p className="font-sans-ui text-sm text-[#b8b2a5] font-light leading-relaxed">
              Located on the serene shores of Lake Geneva, our atelier rejects the industrialized assembly lines 
              of modern watch conglomerates. Every ORVÉN timepiece is an individual horological commission.
            </p>

            <div className="p-6 bg-[#0e0e12] border-l-2 border-[#c5a880] space-y-2">
              <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest uppercase block">
                ANNUAL ALLOCATION
              </span>
              <div className="font-serif-luxury text-2xl text-[#f5f2eb]">
                Strictly Limited to 150 Pieces Worldwide
              </div>
              <p className="text-xs text-[#b8b2a5]/70 font-sans-ui">
                Each timepiece is laser-etched with its unique individual production number and registered in the Geneva Hall of Records.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Editorial Atelier Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 luxury-glass border border-white/[0.06] flex flex-col justify-between h-[240px]">
              <div>
                <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest block mb-2">
                  STANDARD 01
                </span>
                <h4 className="font-brand text-lg text-[#f5f2eb] mb-2">
                  HEIRLOOM INTEGRITY
                </h4>
                <p className="font-sans-ui text-xs text-[#b8b2a5] leading-relaxed">
                  Components crafted exclusively from inert titanium, 316L steel, sapphire, and synthetic ruby jewels. No synthetic epoxies or fragile micro-electronics.
                </p>
              </div>
              <span className="font-mono-tech text-[10px] text-[#b8b2a5]/50 tracking-wider">
                LIFETIME CALIBRATION GUARANTEE
              </span>
            </div>

            <div className="p-8 luxury-glass border border-white/[0.06] flex flex-col justify-between h-[240px]">
              <div>
                <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest block mb-2">
                  STANDARD 02
                </span>
                <h4 className="font-brand text-lg text-[#f5f2eb] mb-2">
                  BENCH PROVENANCE
                </h4>
                <p className="font-sans-ui text-xs text-[#b8b2a5] leading-relaxed">
                  A dedicated master watchmaker signs the official atelier certification accompanying each watch, assuming lifetime personal accountability.
                </p>
              </div>
              <span className="font-mono-tech text-[10px] text-[#b8b2a5]/50 tracking-wider">
                SINGLE HOROLOGIST SIGNATURE
              </span>
            </div>

            <div className="p-8 luxury-glass border border-white/[0.06] flex flex-col justify-between h-[240px] sm:col-span-2">
              <div>
                <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest block mb-2">
                  STANDARD 03
                </span>
                <h4 className="font-brand text-lg text-[#f5f2eb] mb-2">
                  DIRECT CONCIERGE RELATIONS
                </h4>
                <p className="font-sans-ui text-xs text-[#b8b2a5] leading-relaxed">
                  ORVÉN clients deal directly with our Geneva atelier. From initial private salon consultation 
                  to periodic five-year chronometric servicing, your timepiece never passes through third-party intermediaries.
                </p>
              </div>
              <span className="font-mono-tech text-[10px] text-[#c5a880] tracking-wider">
                DIRECT GENEVA CONCIERGE ACCESS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
