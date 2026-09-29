import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRAFT_STEPS } from '../../data/watchData';
import { Cpu, Sparkles, Wrench, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CraftSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stepsContainerRef.current) {
        const stepElements = stepsContainerRef.current.children;
        Array.from(stepElements).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-5 h-5 text-[#c5a880]" />;
      case 1:
        return <Sparkles className="w-5 h-5 text-[#c5a880]" />;
      case 2:
        return <Wrench className="w-5 h-5 text-[#c5a880]" />;
      default:
        return <Shield className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                06 / SAVOIR-FAIRE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              THE TRIAD OF <span className="italic gold-gradient-text">CRAFT</span>
            </h2>
          </div>

          <p className="mt-4 lg:mt-0 font-sans-ui text-sm text-[#b8b2a5] max-w-md font-light leading-relaxed">
            The convergence of aerospace machining, traditional Genevan hand-finishing, 
            and single-watchmaker assembly.
          </p>
        </div>

        {/* The 3 Craft Steps: Machining, Finishing, Assembly */}
        <div ref={stepsContainerRef} className="space-y-16 lg:space-y-24">
          {CRAFT_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 luxury-glass border border-white/[0.06] hover:border-[#c5a880]/30 transition-colors duration-500"
            >
              {/* Left Identifier */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#141417] border border-white/[0.08]">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-mono-tech text-xs text-[#c5a880] tracking-[0.25em]">
                    PHASE {step.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#f5f2eb] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <div className="font-mono-tech text-xs text-[#b8b2a5]/70 uppercase tracking-widest">
                    {step.subtitle}
                  </div>
                </div>

                <div className="inline-block self-start font-mono-tech text-xs text-[#c5a880] bg-[#c5a880]/10 px-3.5 py-1.5 border border-[#c5a880]/20">
                  {step.highlight}
                </div>
              </div>

              {/* Right Description & Details */}
              <div className="lg:col-span-8 flex flex-col justify-center space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-12">
                <p className="font-sans-ui text-sm sm:text-base text-[#b8b2a5] leading-relaxed font-light">
                  {step.description}
                </p>

                {/* Key Technical Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#c5a880] mt-2 shrink-0" />
                      <span className="font-sans-ui text-xs text-[#f5f2eb] font-medium leading-normal">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
