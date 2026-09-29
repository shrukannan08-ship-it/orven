import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PrecisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (metricsGridRef.current) {
        gsap.fromTo(
          metricsGridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="precision"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#09090b] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                05 / CHRONOMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight">
              PRECISION <span className="italic gold-gradient-text">STANDARDS</span>
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 font-mono-tech text-xs text-[#b8b2a5]/70 tracking-widest uppercase">
            TESTED IN 5 POSITIONS · 3 TEMPERATURES
          </div>
        </div>

        {/* Editorial Typography Metric Showcase (Not Generic Cards) */}
        <div
          ref={metricsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]"
        >
          {/* Metric 1: ±3 SEC / DAY */}
          <div className="flex flex-col justify-between pt-8 md:pt-0 md:px-6 first:pl-0">
            <div>
              <span className="font-mono-tech text-[10px] text-[#c5a880] tracking-[0.25em] uppercase block mb-4">
                CERTIFIED RATE
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-light text-[#f5f2eb] tracking-tight">
                  ±3
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a880]">
                  SEC / DAY
                </span>
              </div>
            </div>
            <div>
              <div className="w-8 h-[1px] bg-[#c5a880]/40 my-4" />
              <h3 className="font-brand text-sm uppercase text-[#f5f2eb] tracking-wider mb-2">
                CHRONOMETRIC ACCURACY
              </h3>
              <p className="font-sans-ui text-xs text-[#b8b2a5] font-light leading-relaxed">
                Regulated beyond standard COSC criteria with micro-poised Glucydur balance wheel and Nivaflex hairspring.
              </p>
            </div>
          </div>

          {/* Metric 2: 28,800 VPH */}
          <div className="flex flex-col justify-between pt-8 md:pt-0 md:px-6">
            <div>
              <span className="font-mono-tech text-[10px] text-[#c5a880] tracking-[0.25em] uppercase block mb-4">
                FREQUENCY
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-light text-[#f5f2eb] tracking-tight">
                  28.8K
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a880]">
                  VPH
                </span>
              </div>
            </div>
            <div>
              <div className="w-8 h-[1px] bg-[#c5a880]/40 my-4" />
              <h3 className="font-brand text-sm uppercase text-[#f5f2eb] tracking-wider mb-2">
                4 HZ OSCILLATION
              </h3>
              <p className="font-sans-ui text-xs text-[#b8b2a5] font-light leading-relaxed">
                8 distinct kinetic beats per second ensure resistance to everyday shock and a fluid continuous sweep of the seconds hand.
              </p>
            </div>
          </div>

          {/* Metric 3: 72 HOUR RESERVE */}
          <div className="flex flex-col justify-between pt-8 md:pt-0 md:px-6">
            <div>
              <span className="font-mono-tech text-[10px] text-[#c5a880] tracking-[0.25em] uppercase block mb-4">
                AUTONOMY
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-light text-[#f5f2eb] tracking-tight">
                  72
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a880]">
                  HOURS
                </span>
              </div>
            </div>
            <div>
              <div className="w-8 h-[1px] bg-[#c5a880]/40 my-4" />
              <h3 className="font-brand text-sm uppercase text-[#f5f2eb] tracking-wider mb-2">
                TWIN BARREL TORQUE
              </h3>
              <p className="font-sans-ui text-xs text-[#b8b2a5] font-light leading-relaxed">
                Series-coupled mainspring barrels ensure linear torque delivery from full wind down to hour 72.
              </p>
            </div>
          </div>

          {/* Metric 4: 100M WATER RESISTANCE */}
          <div className="flex flex-col justify-between pt-8 md:pt-0 md:px-6 last:pr-0">
            <div>
              <span className="font-mono-tech text-[10px] text-[#c5a880] tracking-[0.25em] uppercase block mb-4">
                DEPTH SEAL
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-light text-[#f5f2eb] tracking-tight">
                  100M
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a880]">
                  10 ATM
                </span>
              </div>
            </div>
            <div>
              <div className="w-8 h-[1px] bg-[#c5a880]/40 my-4" />
              <h3 className="font-brand text-sm uppercase text-[#f5f2eb] tracking-wider mb-2">
                HYDROSTATIC INTEGRITY
              </h3>
              <p className="font-sans-ui text-xs text-[#b8b2a5] font-light leading-relaxed">
                Screw-down knurled titanium crown equipped with self-centering fluorocarbon hermetic seals.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Sub-Footer Quote */}
        <div className="mt-20 pt-10 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="font-serif-luxury text-xl sm:text-2xl text-[#f5f2eb] font-light italic">
            "A chronometer does not simply tell the hour; it honors the passage of time."
          </div>
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a880]">
            — GENEVA ATELIER ARCHIVE
          </div>
        </div>
      </div>
    </section>
  );
};
