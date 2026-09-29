import React, { useState } from 'react';
import { ExplodedWatchScene } from '../3d/ExplodedWatchScene';
import { EXPLODED_LAYERS } from '../../data/watchData';
import { ChevronRight, Sliders } from 'lucide-react';

export const ExplodedSection: React.FC = () => {
  const [explodedProgress, setExplodedProgress] = useState<number>(0.75);
  const [selectedLayerId, setSelectedLayerId] = useState<string>('movement');

  const currentLayer = EXPLODED_LAYERS.find((l) => l.id === selectedLayerId) || EXPLODED_LAYERS[4];

  return (
    <section
      id="exploded"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#09090b] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                03 / ANATOMY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              EXPLODED <span className="italic gold-gradient-text">MOVEMENT</span>
            </h2>
          </div>

          <p className="mt-4 lg:mt-0 font-sans-ui text-sm text-[#b8b2a5] max-w-md font-light leading-relaxed">
            An architectural deconstruction of seven precision assemblies. 
            Adjust the separation control or select any layer to inspect metallurgy and micron-level tolerances.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="luxury-glass p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Slider Control */}
          <div className="w-full md:w-1/2 flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#c5a880]">
              <Sliders className="w-4 h-4" />
              <span>SEPARATION</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedProgress}
              onChange={(e) => setExplodedProgress(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#1e1e24] rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
              aria-label="Separation distance slider"
            />

            <span className="font-mono-tech text-xs text-[#f5f2eb] w-12 text-right">
              {Math.round(explodedProgress * 100)}%
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setExplodedProgress(0)}
              className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider transition-all ${
                explodedProgress === 0
                  ? 'bg-[#c5a880] text-[#070707] font-bold'
                  : 'bg-white/[0.04] text-[#b8b2a5] hover:text-[#f5f2eb] border border-white/[0.06]'
              }`}
            >
              ASSEMBLED (0%)
            </button>
            <button
              onClick={() => setExplodedProgress(0.5)}
              className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider transition-all ${
                explodedProgress > 0.3 && explodedProgress < 0.7
                  ? 'bg-[#c5a880] text-[#070707] font-bold'
                  : 'bg-white/[0.04] text-[#b8b2a5] hover:text-[#f5f2eb] border border-white/[0.06]'
              }`}
            >
              EXPANDED (50%)
            </button>
            <button
              onClick={() => setExplodedProgress(1)}
              className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider transition-all ${
                explodedProgress === 1
                  ? 'bg-[#c5a880] text-[#070707] font-bold'
                  : 'bg-white/[0.04] text-[#b8b2a5] hover:text-[#f5f2eb] border border-white/[0.06]'
              }`}
            >
              FULL (100%)
            </button>
          </div>
        </div>

        {/* Main Exploded Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 7 Layers Selector */}
          <div className="lg:col-span-4 flex flex-col space-y-2 order-2 lg:order-1">
            <div className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#b8b2a5]/70 mb-2">
              HOROLOGICAL LAYERS ({EXPLODED_LAYERS.length})
            </div>

            {EXPLODED_LAYERS.map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`w-full text-left p-4 transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#141418] border-[#c5a880]/50 shadow-lg translate-x-1'
                      : 'bg-[#0e0e11]/60 border-white/[0.04] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`font-mono-tech text-xs ${
                        isSelected ? 'text-[#c5a880] font-bold' : 'text-[#b8b2a5]/50'
                      }`}
                    >
                      {layer.number}
                    </span>
                    <div>
                      <div
                        className={`font-sans-ui text-xs font-semibold uppercase tracking-wider ${
                          isSelected ? 'text-[#f5f2eb]' : 'text-[#b8b2a5]'
                        }`}
                      >
                        {layer.name}
                      </div>
                      <div className="text-[10px] text-[#b8b2a5]/60 font-mono-tech mt-0.5">
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-[#c5a880] translate-x-1' : 'text-white/20'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Center/Right Column: 3D Exploded Canvas & Active Inspector */}
          <div className="lg:col-span-8 flex flex-col space-y-6 order-1 lg:order-2">
            {/* 3D Exploded View Canvas */}
            <div className="h-[460px] sm:h-[540px] w-full relative bg-[#070707] border border-white/[0.06] overflow-hidden">
              <div className="absolute top-4 right-4 z-10 bg-[#070707]/80 backdrop-blur-md px-3 py-1 border border-white/[0.08] text-[10px] font-mono-tech text-[#c5a880] uppercase tracking-wider">
                ORBIT & ZOOM ENABLED
              </div>

              <ExplodedWatchScene
                explodedProgress={explodedProgress}
                activeLayerId={selectedLayerId}
                caseMaterial="titanium"
                dialColor="obsidian"
                strapType="leather"
                className="w-full h-full"
              />

              {/* In-canvas active layer badge */}
              <div className="absolute bottom-4 left-4 z-10 bg-[#0e0e11]/90 backdrop-blur-md p-3 border border-white/[0.08] max-w-xs pointer-events-none">
                <span className="font-mono-tech text-[10px] text-[#c5a880] tracking-wider block">
                  LAYER {currentLayer.number} / 07
                </span>
                <span className="font-serif-luxury text-base text-[#f5f2eb] block">
                  {currentLayer.name}
                </span>
              </div>
            </div>

            {/* Technical Detail Card for Active Selected Layer */}
            <div className="luxury-glass p-6 border border-[#c5a880]/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4 mb-4">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-[#c5a880]">
                    TECHNICAL METALLURGY
                  </span>
                  <h4 className="font-serif-luxury text-2xl text-[#f5f2eb]">
                    {currentLayer.name}
                  </h4>
                </div>
                <div className="font-mono-tech text-xs text-[#c5a880] bg-[#c5a880]/10 px-3 py-1 border border-[#c5a880]/30 self-start sm:self-auto">
                  {currentLayer.material}
                </div>
              </div>

              <p className="font-sans-ui text-xs sm:text-sm text-[#b8b2a5] leading-relaxed mb-6 font-light">
                {currentLayer.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
                {currentLayer.specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[10px] font-mono-tech text-[#c5a880]/80 uppercase tracking-wider">
                      SPEC 0{idx + 1}
                    </span>
                    <span className="font-sans-ui text-xs text-[#f5f2eb] mt-1 font-medium">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
