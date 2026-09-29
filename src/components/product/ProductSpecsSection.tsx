import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WatchScene } from '../3d/WatchScene';

gsap.registerPlugin(ScrollTrigger);

interface ProductSpecsSectionProps {
  onConfigureClick: () => void;
  onAppointmentClick: () => void;
}

export const ProductSpecsSection: React.FC<ProductSpecsSectionProps> = ({
  onConfigureClick,
  onAppointmentClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technicalSpecifications = [
    { label: 'REFERENCE', value: '001-TI-OBSIDIAN' },
    { label: 'CASE DIAMETER', value: '42.0 MM' },
    { label: 'CASE THICKNESS', value: '10.8 MM (Ultra-Slim)' },
    { label: 'LUG-TO-LUG', value: '48.5 MM' },
    { label: 'METALLURGY', value: 'Grade 5 Aerospace Titanium (Ti-6Al-4V)' },
    { label: 'BEZEL & CROWN', value: 'Hand-Chamfered Titanium with Screw-Down Lock' },
    { label: 'DIAL FINISH', value: 'Galvanic Matte Obsidian with 18k Applied Indices' },
    { label: 'CRYSTAL', value: 'Double-Domed Sapphire with 7-Layer AR Coating' },
    { label: 'CALIBRE', value: 'In-House Calibre ORV-72 Automatic' },
    { label: 'OSCILLATION', value: '28,800 VPH (4 Hz / 8 Beats per Second)' },
    { label: 'POWER RESERVE', value: '72 Hours (Twin Mainspring Barrels)' },
    { label: 'PRECISION', value: '±3 Seconds / Day (5-Position Regulated)' },
    { label: 'JEWELS', value: '31 Synthetic Rubies' },
    { label: 'WATER RESISTANCE', value: '100 Metres / 10 ATM' },
    { label: 'STRAP', value: 'Hand-Stitched Italian Calfskin / Deployant Clasp' },
  ];

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-8 mb-16">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880] block mb-3">
              02 / SPECIFICATIONS
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              ORVÉN <span className="italic gold-gradient-text">/ 001</span>
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 font-sans-ui text-xs uppercase tracking-[0.25em] text-[#b8b2a5]/80">
            PRICE: <span className="text-[#f5f2eb] font-semibold">₹2,84,000</span> · ALL TAXES INCLUDED
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Studio Watch Render */}
          <div className="lg:col-span-6 h-[450px] sm:h-[550px] relative bg-gradient-to-b from-[#0e0e11] to-[#08080a] border border-white/[0.06] p-4 flex items-center justify-center">
            <div className="absolute top-4 left-4 font-mono-tech text-[10px] uppercase tracking-widest text-[#c5a880]/80">
              GRADE 5 TITANIUM CHASSIS
            </div>
            
            <WatchScene
              caseMaterial="titanium"
              dialColor="obsidian"
              strapType="steel"
              autoRotate={true}
              scale={1.15}
              fov={38}
              className="w-full h-full"
            />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono-tech text-[#b8b2a5]/60 border-t border-white/[0.05] pt-3">
              <span>WEIGHT: 68 GRAMS</span>
              <span>CALIBRE ORV-72</span>
            </div>
          </div>

          {/* Right Column: Editorial Specifications Table */}
          <div ref={contentRef} className="lg:col-span-6 flex flex-col space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f5f2eb]">
                The Architecture of Pure Reduction
              </h3>
              <p className="font-sans-ui text-sm text-[#b8b2a5] font-light leading-relaxed">
                ORVÉN / 001 is stripped of all superfluous embellishments. Every chamfered contour, 
                recessed dial index, and titanium component exists in perfect kinetic equilibrium.
              </p>
            </div>

            {/* Spec List */}
            <div className="divide-y divide-white/[0.06] border-y border-white/[0.08] my-4">
              {technicalSpecifications.slice(0, 8).map((spec) => (
                <div key={spec.label} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-mono-tech text-[#b8b2a5]/70 tracking-wider">
                    {spec.label}
                  </span>
                  <span className="font-sans-ui text-[#f5f2eb] font-medium text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onConfigureClick}
                className="px-6 py-3.5 bg-[#c5a880] text-[#070707] font-sans-ui text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#e4cdad] transition-colors"
              >
                CUSTOMIZE IN MATERIAL LAB
              </button>
              <button
                onClick={onAppointmentClick}
                className="px-6 py-3.5 border border-white/[0.15] text-[#f5f2eb] font-sans-ui text-xs uppercase tracking-[0.2em] hover:border-[#c5a880] transition-colors"
              >
                REQUEST APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
