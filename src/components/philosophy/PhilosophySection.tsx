import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Philosophy body text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Three Pillars reveal
      if (pillarsRef.current) {
        const pillarItems = pillarsRef.current.children;
        gsap.fromTo(
          pillarItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
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
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#0a0a0c] border-y border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Subtle Section Marker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
            01 / PHILOSOPHY
          </span>
          <div className="w-12 h-[1px] bg-[#c5a880]/40" />
        </div>

        {/* Large Editorial Headline */}
        <h2
          ref={headlineRef}
          className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light text-[#f5f2eb] leading-[1.18] tracking-tight mb-10"
        >
          In an era of disposable digital obsolescence, we forge immutable objects of{' '}
          <span className="italic font-normal gold-gradient-text">pure mechanical intent.</span>
        </h2>

        {/* Narrative Paragraph */}
        <p
          ref={textRef}
          className="font-sans-ui text-base sm:text-lg text-[#b8b2a5] font-light leading-relaxed max-w-3xl mb-16"
        >
          ORVÉN was founded on a singular conviction: time should not be measured by electronic pulses, 
          but through the disciplined kinetic tension of wound springs, escapement wheels, and human craftsmanship. 
          Each timepiece is assembled by a single master watchmaker in Geneva—deliberate, uncompromising, and forever.
        </p>

        {/* The Three Horological Pillars */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/[0.08]"
        >
          <div className="flex flex-col space-y-3">
            <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest">
              01 · INDEPENDENT
            </span>
            <h3 className="font-brand text-xl text-[#f5f2eb] tracking-wide">
              ZERO COMPROMISE
            </h3>
            <p className="font-sans-ui text-xs sm:text-sm text-[#b8b2a5]/80 leading-relaxed">
              Completely free from conglomerate quotas. We produce fewer than 150 pieces annually, 
              preserving absolute creative and mechanical autonomy.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest">
              02 · DELIBERATE
            </span>
            <h3 className="font-brand text-xl text-[#f5f2eb] tracking-wide">
              MICRON TOLERANCE
            </h3>
            <p className="font-sans-ui text-xs sm:text-sm text-[#b8b2a5]/80 leading-relaxed">
              Every curve, chamfer, and surface reflects hundreds of hours of design refinement. 
              Nothing exists for decoration alone; every facet serves ergonomic balance.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <span className="font-mono-tech text-xs text-[#c5a880] tracking-widest">
              03 · MECHANICAL
            </span>
            <h3 className="font-brand text-xl text-[#f5f2eb] tracking-wide">
              HEIRLOOM CALIBRE
            </h3>
            <p className="font-sans-ui text-xs sm:text-sm text-[#b8b2a5]/80 leading-relaxed">
              Pure mechanical energy without batteries, circuitry, or planned obsolescence. 
              Engineered to keep precise time for generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
