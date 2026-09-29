import React, { useState } from 'react';
import { WatchScene } from '../3d/WatchScene';
import type { CaseMaterial, DialColor, StrapType, WatchConfiguration } from '../../types/watch';
import { Check, ArrowRight } from 'lucide-react';

interface MaterialLabSectionProps {
  onSelectConfiguration: (config: WatchConfiguration) => void;
}

export const MaterialLabSection: React.FC<MaterialLabSectionProps> = ({
  onSelectConfiguration,
}) => {
  const [caseMaterial, setCaseMaterial] = useState<CaseMaterial>('titanium');
  const [dialColor, setDialColor] = useState<DialColor>('obsidian');
  const [strapType, setStrapType] = useState<StrapType>('leather');

  const caseOptions: { id: CaseMaterial; name: string; subtitle: string; colorPreview: string }[] = [
    {
      id: 'titanium',
      name: 'Titanium',
      subtitle: 'Aerospace Grade 5 (Ti-6Al-4V)',
      colorPreview: '#8c929a',
    },
    {
      id: 'steel',
      name: 'Steel',
      subtitle: 'Surgical 316L Mirror Polish',
      colorPreview: '#dcdedf',
    },
    {
      id: 'ceramic',
      name: 'Ceramic',
      subtitle: 'Obsidian Zirconium Oxide',
      colorPreview: '#101114',
    },
  ];

  const dialOptions: { id: DialColor; name: string; subtitle: string; colorPreview: string }[] = [
    {
      id: 'obsidian',
      name: 'Obsidian',
      subtitle: 'Velvety Sunburst Black',
      colorPreview: '#0a0a0c',
    },
    {
      id: 'ivory',
      name: 'Ivory',
      subtitle: 'Warm Opaline Enamel',
      colorPreview: '#ece7dc',
    },
    {
      id: 'midnight',
      name: 'Midnight',
      subtitle: 'Deep Horizon Sunray Blue',
      colorPreview: '#0a1628',
    },
  ];

  const strapOptions: { id: StrapType; name: string; subtitle: string; colorPreview: string }[] = [
    {
      id: 'leather',
      name: 'Italian Leather',
      subtitle: 'Hand-Stitched Full-Grain',
      colorPreview: '#2e1f18',
    },
    {
      id: 'steel',
      name: 'Brushed Steel',
      subtitle: 'Articulated H-Link Bracelet',
      colorPreview: '#8c929a',
    },
    {
      id: 'rubber',
      name: 'Rubber',
      subtitle: 'Sculpted High-Tech FKM',
      colorPreview: '#141416',
    },
  ];

  const handleAppointmentClick = () => {
    onSelectConfiguration({
      caseMaterial,
      dialColor,
      strapType,
    });
  };

  const getFormattedName = (type: string) => {
    switch (type) {
      case 'titanium':
        return 'Titanium Case';
      case 'steel':
        return 'Steel Case';
      case 'ceramic':
        return 'Ceramic Case';
      case 'obsidian':
        return 'Obsidian Dial';
      case 'ivory':
        return 'Ivory Dial';
      case 'midnight':
        return 'Midnight Dial';
      case 'leather':
        return 'Italian Leather Strap';
      case 'rubber':
        return 'Rubber Strap';
      default:
        return type;
    }
  };

  return (
    <section
      id="configurator"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                04 / BESPOKE ATELIER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              MATERIAL <span className="italic gold-gradient-text">LAB</span>
            </h2>
          </div>

          <p className="mt-4 lg:mt-0 font-sans-ui text-sm text-[#b8b2a5] max-w-md font-light leading-relaxed">
            Configure your bespoke iteration of ORVÉN / 001. Explore hand-selected metallurgy, 
            dial lacquers, and ergonomic strap materials.
          </p>
        </div>

        {/* 2-Column Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Real-Time Render Stage */}
          <div className="lg:col-span-6 h-[460px] sm:h-[560px] relative bg-gradient-to-b from-[#0e0e12] to-[#070708] border border-white/[0.07] p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono-tech text-[10px] text-[#c5a880] uppercase tracking-widest">
                LIVE 3D SIMULATION
              </span>
              <span className="font-mono-tech text-[10px] text-[#b8b2a5]/60 uppercase tracking-widest">
                REAL-TIME SHADER
              </span>
            </div>

            {/* 3D Canvas */}
            <WatchScene
              caseMaterial={caseMaterial}
              dialColor={dialColor}
              strapType={strapType}
              autoRotate={true}
              scale={1.15}
              rotationSpeed={0.5}
              className="w-full h-full"
            />

            {/* Current Active Specs Pill */}
            <div className="z-10 bg-[#070707]/90 backdrop-blur-md px-4 py-2.5 border border-white/[0.08] flex items-center justify-between text-xs font-mono-tech text-[#b8b2a5]">
              <span className="capitalize text-[#f5f2eb]">{caseMaterial}</span>
              <span>·</span>
              <span className="capitalize text-[#f5f2eb]">{dialColor}</span>
              <span>·</span>
              <span className="capitalize text-[#f5f2eb]">{strapType}</span>
            </div>
          </div>

          {/* Right: Selectors & Live Summary Card */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            {/* 1. Case Material Selector */}
            <div>
              <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#c5a880] mb-3 flex items-center justify-between">
                <span>1. CASE METALLURGY</span>
                <span className="text-[#f5f2eb] font-sans-ui capitalize">{caseMaterial}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {caseOptions.map((opt) => {
                  const isSelected = caseMaterial === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setCaseMaterial(opt.id)}
                      className={`p-3.5 text-left border transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-[#141418] border-[#c5a880] shadow-md ring-1 ring-[#c5a880]/30'
                          : 'bg-[#0d0d10] border-white/[0.06] hover:border-white/[0.2]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: opt.colorPreview }}
                        />
                        <span className="font-sans-ui text-xs font-semibold uppercase tracking-wider text-[#f5f2eb]">
                          {opt.name}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono-tech text-[#b8b2a5]/60 truncate">
                        {opt.subtitle}
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#c5a880] absolute top-2.5 right-2.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dial Color Selector */}
            <div>
              <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#c5a880] mb-3 flex items-center justify-between">
                <span>2. DIAL TREATMENT</span>
                <span className="text-[#f5f2eb] font-sans-ui capitalize">{dialColor}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {dialOptions.map((opt) => {
                  const isSelected = dialColor === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setDialColor(opt.id)}
                      className={`p-3.5 text-left border transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-[#141418] border-[#c5a880] shadow-md ring-1 ring-[#c5a880]/30'
                          : 'bg-[#0d0d10] border-white/[0.06] hover:border-white/[0.2]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: opt.colorPreview }}
                        />
                        <span className="font-sans-ui text-xs font-semibold uppercase tracking-wider text-[#f5f2eb]">
                          {opt.name}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono-tech text-[#b8b2a5]/60 truncate">
                        {opt.subtitle}
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#c5a880] absolute top-2.5 right-2.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Strap Type Selector */}
            <div>
              <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#c5a880] mb-3 flex items-center justify-between">
                <span>3. INTEGRATED STRAP</span>
                <span className="text-[#f5f2eb] font-sans-ui capitalize">
                  {strapType === 'steel' ? 'Brushed Steel' : strapType === 'leather' ? 'Italian Leather' : 'Rubber'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {strapOptions.map((opt) => {
                  const isSelected = strapType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setStrapType(opt.id)}
                      className={`p-3.5 text-left border transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-[#141418] border-[#c5a880] shadow-md ring-1 ring-[#c5a880]/30'
                          : 'bg-[#0d0d10] border-white/[0.06] hover:border-white/[0.2]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: opt.colorPreview }}
                        />
                        <span className="font-sans-ui text-xs font-semibold uppercase tracking-wider text-[#f5f2eb]">
                          {opt.name}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono-tech text-[#b8b2a5]/60 truncate">
                        {opt.subtitle}
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#c5a880] absolute top-2.5 right-2.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Required Live Summary Box */}
            <div className="luxury-glass p-6 border border-[#c5a880]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="font-brand text-lg text-[#f5f2eb] tracking-wider">
                  ORVÉN / 001
                </span>
                <span className="font-mono-tech text-xs text-[#c5a880]">
                  CUSTOM ATELIER BUILD
                </span>
              </div>

              {/* Exact Specs Display */}
              <div className="space-y-1.5 text-sm font-sans-ui">
                <div className="text-[#f5f2eb] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>{getFormattedName(caseMaterial)}</span>
                </div>
                <div className="text-[#f5f2eb] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>{getFormattedName(dialColor)}</span>
                </div>
                <div className="text-[#f5f2eb] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>
                    {strapType === 'steel'
                      ? 'Brushed Steel Strap'
                      : strapType === 'leather'
                      ? 'Italian Leather Strap'
                      : 'Rubber Strap'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <span className="font-mono-tech text-xs uppercase tracking-wider text-[#b8b2a5]/70">
                  TOTAL VALUE
                </span>
                <span className="font-brand text-2xl font-bold text-[#f5f2eb] tracking-wide">
                  ₹2,84,000
                </span>
              </div>

              {/* Required CTA Button */}
              <button
                onClick={handleAppointmentClick}
                className="w-full mt-2 py-4 px-6 bg-[#c5a880] text-[#070707] font-sans-ui text-xs font-bold uppercase tracking-[0.24em] hover:bg-[#e4cdad] transition-colors flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>REQUEST PRIVATE APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
