import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigateToAppointment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ORVÉN / 001', href: '#product' },
    { label: 'EXPLODED', href: '#exploded' },
    { label: 'MATERIAL LAB', href: '#configurator' },
    { label: 'PRECISION', href: '#precision' },
    { label: 'CRAFT', href: '#craft' },
    { label: 'ATELIER', href: '#atelier' },
    { label: 'COLLECTION', href: '#collection' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070707]/85 backdrop-blur-md border-b border-white/[0.06] py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[#070707]/90 via-[#070707]/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col items-start focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="font-brand text-xl sm:text-2xl font-bold tracking-[0.28em] text-[#f5f2eb] transition-colors group-hover:text-[#c5a880]">
                ORVÉN
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c5a880]/80 group-hover:scale-125 transition-transform" />
            </div>
            <span className="font-sans-ui text-[9px] uppercase tracking-[0.3em] text-[#c5a880]/70 -mt-0.5">
              GENEVA · 1898
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans-ui text-[11px] uppercase tracking-[0.22em] text-[#b8b2a5] hover:text-[#f5f2eb] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onNavigateToAppointment}
              className="group relative px-5 py-2.5 overflow-hidden text-xs uppercase font-sans-ui tracking-[0.2em] text-[#f5f2eb] border border-[#c5a880]/40 rounded-none bg-[#0e0e10]/60 hover:border-[#c5a880] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#c5a880] group-hover:rotate-45 transition-transform duration-300" />
                <span>PRIVATE APPOINTMENT</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#c5a880]/15 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#f5f2eb] hover:text-[#c5a880] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070707]/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-12 px-8 lg:hidden animate-fadeIn">
          <div className="flex flex-col space-y-6">
            <div className="text-[10px] uppercase font-mono-tech tracking-[0.25em] text-[#c5a880]/70 mb-2">
              NAVIGATION DIRECTORY
            </div>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-brand text-2xl tracking-[0.15em] text-[#f5f2eb] hover:text-[#c5a880] transition-colors py-2 border-b border-white/[0.06] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="font-mono-tech text-xs text-[#c5a880]/60">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToAppointment();
              }}
              className="w-full py-4 text-center text-xs uppercase font-sans-ui tracking-[0.22em] text-[#070707] font-semibold bg-[#c5a880] hover:bg-[#e4cdad] transition-colors"
            >
              REQUEST PRIVATE APPOINTMENT
            </button>
            <div className="text-center font-mono-tech text-[10px] text-[#b8b2a5]/60 tracking-wider">
              GENEVA ATELIER · BY APPOINTMENT ONLY
            </div>
          </div>
        </div>
      )}
    </>
  );
};
