import React from 'react';
import { WatchScene } from '../3d/WatchScene';
import { Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onExplodedClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onExplodedClick,
}) => {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 overflow-hidden bg-[#070707]">
      {/* Background Precision Atmosphere */}
      <div className="absolute inset-0 bg-precision-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      
      {/* Ambient subtle light glow behind watch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-[#c5a880]/[0.035] blur-[100px] pointer-events-none" />

      {/* Top Tagline & Product Identifier */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#c5a880]">
            REFERENCE 001-TI
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c5a880]/60" />
          <span className="font-sans-ui text-[11px] uppercase tracking-[0.2em] text-[#b8b2a5]">
            42 MM CHRONOMETER
          </span>
        </div>

        <div className="mt-2 sm:mt-0 font-sans-ui text-[11px] uppercase tracking-[0.28em] text-[#b8b2a5]/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full border border-[#c5a880] animate-pulse" />
          <span>SWISS HAUTE HORLOGERIE</span>
        </div>
      </div>

      {/* Main Center Stage: 3D Watch & Large Editorial Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 items-center min-h-[58vh]">
        {/* Left Column: Product Title & Manifesto */}
        <div className="lg:col-span-4 flex flex-col justify-center text-left order-2 lg:order-1 pt-6 lg:pt-0">
          <div className="inline-block mb-3 font-mono-tech text-[11px] uppercase tracking-[0.3em] text-[#c5a880]">
            INDEPENDENT MECHANICAL MANUFACTURE
          </div>
          
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#f5f2eb] leading-[1.05] mb-4">
            ORVÉN <span className="italic font-normal gold-gradient-text">/ 001</span>
          </h1>

          <p className="font-sans-ui text-sm sm:text-base text-[#b8b2a5] leading-relaxed max-w-md font-light mb-8">
            An uncompromising expression of pure horological intent. 
            Milled from Grade 5 aerospace titanium, housing the in-house Calibre ORV-72 with a 72-hour power reserve.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-[#f5f2eb] text-[#070707] font-sans-ui text-xs font-semibold uppercase tracking-[0.22em] hover:bg-[#c5a880] transition-colors duration-300"
            >
              EXPLORE TIMEPIECE
            </button>
            <button
              onClick={onExplodedClick}
              className="px-7 py-3.5 border border-white/[0.15] text-[#f5f2eb] font-sans-ui text-xs uppercase tracking-[0.22em] hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300 backdrop-blur-sm"
            >
              EXPLODED VIEW
            </button>
          </div>
        </div>

        {/* Center/Right Column: 3D Interactive Watch Hero Canvas */}
        <div className="lg:col-span-8 h-[420px] sm:h-[520px] lg:h-[620px] w-full relative order-1 lg:order-2">
          {/* Subtle 3D background scale indicator rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[240px] sm:w-[360px] h-[240px] sm:h-[360px] rounded-full border border-dashed border-[#c5a880]/[0.07]" />
          </div>

          {/* Interactive 3D Canvas */}
          <WatchScene
            caseMaterial="titanium"
            dialColor="obsidian"
            strapType="steel"
            autoRotate={true}
            enableControls={true}
            rotationSpeed={0.45}
            scale={1.12}
            className="w-full h-full"
          />

          {/* Minimal 3D Interaction Hint */}
          <div className="absolute bottom-4 right-4 sm:right-8 bg-[#070707]/70 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] pointer-events-none flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#b8b2a5]">
              DRAG TO INSPECT 360°
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Hero Bar: Horological Specs Ticker & Tagline */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#b8b2a5]/70">
            DIAMETER
          </span>
          <span className="font-brand text-lg sm:text-xl text-[#f5f2eb] tracking-wider mt-1">
            42.0 MM
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#b8b2a5]/70">
            METALLURGY
          </span>
          <span className="font-brand text-lg sm:text-xl text-[#f5f2eb] tracking-wider mt-1">
            GRADE 5 TITANIUM
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#b8b2a5]/70">
            CALIBRE
          </span>
          <span className="font-brand text-lg sm:text-xl text-[#f5f2eb] tracking-wider mt-1">
            AUTOMATIC 28.8K
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#b8b2a5]/70">
            AUTONOMY
          </span>
          <span className="font-brand text-lg sm:text-xl text-[#c5a880] tracking-wider mt-1">
            72 HOUR RESERVE
          </span>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="font-mono-tech text-[9px] uppercase tracking-[0.3em] text-[#b8b2a5]">
          SCROLL
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#c5a880] to-transparent animate-bounce" />
      </div>
    </section>
  );
};
