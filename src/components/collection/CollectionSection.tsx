import React, { useState } from 'react';
import { COLLECTIONS } from '../../data/watchData';
import { WatchScene } from '../3d/WatchScene';
import type { CollectionItem } from '../../types/watch';
import { ArrowRight } from 'lucide-react';

interface CollectionSectionProps {
  onSelectModel: (model: CollectionItem) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectModel,
}) => {
  const [activeModelId, setActiveModelId] = useState<string>('001');

  const activeModel = COLLECTIONS.find((c) => c.id === activeModelId) || COLLECTIONS[0];

  return (
    <section
      id="collection"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                08 / REPERTORY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              THE <span className="italic gold-gradient-text">COLLECTION</span>
            </h2>
          </div>

          <div className="mt-4 lg:mt-0 font-sans-ui text-sm text-[#b8b2a5] max-w-md font-light leading-relaxed">
            Three distinctive horological philosophies, united by architectural minimalism and master watchmaking.
          </div>
        </div>

        {/* 3 Model Cards Header Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {COLLECTIONS.map((item) => {
            const isSelected = item.id === activeModelId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModelId(item.id)}
                className={`p-6 text-left border transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-[#121216] border-[#c5a880] shadow-xl'
                    : 'bg-[#0a0a0d] border-white/[0.06] hover:border-white/[0.2]'
                }`}
              >
                {item.badge && (
                  <span className="inline-block font-mono-tech text-[9px] uppercase tracking-widest text-[#c5a880] bg-[#c5a880]/10 px-2 py-0.5 border border-[#c5a880]/20 mb-3">
                    {item.badge}
                  </span>
                )}

                <h3 className="font-serif-luxury text-2xl text-[#f5f2eb] mb-1">
                  {item.modelNumber}
                </h3>
                <div className="font-mono-tech text-xs text-[#b8b2a5]/70 uppercase tracking-wider mb-4">
                  {item.title}
                </div>

                <div className="flex items-center justify-between text-xs font-mono-tech text-[#f5f2eb] border-t border-white/[0.06] pt-3">
                  <span>{item.diameter}</span>
                  <span className="text-[#c5a880] font-semibold">{item.price}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Model Deep Dive Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center luxury-glass p-8 sm:p-12 border border-[#c5a880]/20">
          {/* Left Column: 3D Stage for the Selected Model */}
          <div className="lg:col-span-6 h-[420px] sm:h-[500px] relative bg-[#070707] border border-white/[0.06] flex items-center justify-center">
            <WatchScene
              caseMaterial={activeModel.id === '003' ? 'ceramic' : activeModel.id === '002' ? 'steel' : 'titanium'}
              dialColor={activeModel.id === '003' ? 'midnight' : activeModel.id === '002' ? 'ivory' : 'obsidian'}
              strapType={activeModel.id === '002' ? 'steel' : 'leather'}
              autoRotate={true}
              scale={1.12}
              className="w-full h-full"
            />

            <div className="absolute top-4 left-4 font-mono-tech text-[10px] text-[#c5a880] tracking-wider uppercase">
              {activeModel.modelNumber} · 3D PREVIEW
            </div>
          </div>

          {/* Right Column: Model Specs & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2">
                {activeModel.tagline}
              </div>
              <h3 className="font-serif-luxury text-3xl sm:text-5xl text-[#f5f2eb] tracking-tight mb-4">
                {activeModel.modelNumber}
              </h3>
              <p className="font-sans-ui text-sm text-[#b8b2a5] leading-relaxed font-light mb-6">
                {activeModel.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 border-y border-white/[0.08] py-6 text-xs">
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/70 block">METALLURGY</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium mt-0.5 block">{activeModel.caseMaterial}</span>
              </div>
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/70 block">CALIBRE</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium mt-0.5 block">{activeModel.movement}</span>
              </div>
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/70 block">AUTONOMY</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium mt-0.5 block">{activeModel.reserve}</span>
              </div>
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/70 block">SEAL</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium mt-0.5 block">{activeModel.waterResistance}</span>
              </div>
            </div>

            {/* Price & Appointment CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              <div>
                <span className="font-mono-tech text-[10px] uppercase text-[#b8b2a5]/70 tracking-widest block">
                  MANUFACTURE VALUATION
                </span>
                <span className="font-brand text-2xl sm:text-3xl text-[#f5f2eb] font-bold">
                  {activeModel.price}
                </span>
              </div>

              <button
                onClick={() => onSelectModel(activeModel)}
                className="px-8 py-4 bg-[#c5a880] text-[#070707] font-sans-ui text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#e4cdad] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REQUEST COMMISSION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
