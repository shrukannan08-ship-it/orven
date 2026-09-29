import React, { useState } from 'react';
import type { WatchConfiguration, CollectionItem } from '../../types/watch';
import { Sparkles, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';

interface AppointmentSectionProps {
  initialConfig?: WatchConfiguration | null;
  initialModel?: CollectionItem | null;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  initialConfig,
  initialModel,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!city.trim()) {
      newErrors.city = 'Please specify your preferred city salon.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate luxury atelier private reference code
      const randomCode = `ORV-GEN-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceCode(randomCode);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCity('');
    setPreferredDate('');
    setNotes('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section
      id="appointment"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#0a0a0c] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-precision-grid opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880]">
              09 / PRIVATE SALON
            </span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#f5f2eb] tracking-tight mb-4">
            TIME DESERVES <span className="italic gold-gradient-text">A MOMENT.</span>
          </h2>

          <p className="font-sans-ui text-sm sm:text-base text-[#b8b2a5] font-light leading-relaxed">
            We invite you to experience ORVÉN timepieces in the private tranquility of our Geneva atelier 
            or international private viewing salons.
          </p>
        </div>

        {/* Form or Confirmation Card */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="luxury-glass p-8 sm:p-12 border border-[#c5a880]/20 space-y-8"
          >
            {/* Pre-Selected Piece Notice (If user customized or picked from collection) */}
            {(initialConfig || initialModel) && (
              <div className="bg-[#141418] p-4 border border-[#c5a880]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#c5a880]" />
                  <div>
                    <span className="font-mono-tech text-[10px] text-[#c5a880] uppercase tracking-widest block">
                      CONFIGURED PIECE FOR PRIVATE VIEWING
                    </span>
                    <span className="font-serif-luxury text-base text-[#f5f2eb]">
                      {initialModel ? initialModel.modelNumber : 'ORVÉN / 001'} 
                      {initialConfig && ` (${initialConfig.caseMaterial} · ${initialConfig.dialColor} · ${initialConfig.strapType})`}
                    </span>
                  </div>
                </div>
                <span className="font-mono-tech text-xs text-[#b8b2a5]/80">
                  ₹2,84,000 BASELINE
                </span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="name"
                  className="font-mono-tech text-xs uppercase tracking-wider text-[#f5f2eb] flex items-center justify-between"
                >
                  <span>FULL NAME *</span>
                  {errors.name && (
                    <span className="text-red-400 text-[10px] lowercase">{errors.name}</span>
                  )}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Lord Alexander Vance"
                  className={`w-full bg-[#0e0e11] border px-4 py-3.5 text-sm text-[#f5f2eb] font-sans-ui placeholder-[#b8b2a5]/40 focus:outline-none focus:border-[#c5a880] transition-colors ${
                    errors.name ? 'border-red-400/60' : 'border-white/[0.08]'
                  }`}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="font-mono-tech text-xs uppercase tracking-wider text-[#f5f2eb] flex items-center justify-between"
                >
                  <span>EMAIL ADDRESS *</span>
                  {errors.email && (
                    <span className="text-red-400 text-[10px] lowercase">{errors.email}</span>
                  )}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="vance@heritage.ch"
                  className={`w-full bg-[#0e0e11] border px-4 py-3.5 text-sm text-[#f5f2eb] font-sans-ui placeholder-[#b8b2a5]/40 focus:outline-none focus:border-[#c5a880] transition-colors ${
                    errors.email ? 'border-red-400/60' : 'border-white/[0.08]'
                  }`}
                />
              </div>

              {/* City Salon */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="city"
                  className="font-mono-tech text-xs uppercase tracking-wider text-[#f5f2eb] flex items-center justify-between"
                >
                  <span>PREFERRED CITY / SALON *</span>
                  {errors.city && (
                    <span className="text-red-400 text-[10px] lowercase">{errors.city}</span>
                  )}
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors({ ...errors, city: '' });
                  }}
                  placeholder="Geneva, Zurich, London, Mumbai, Dubai, New York"
                  className={`w-full bg-[#0e0e11] border px-4 py-3.5 text-sm text-[#f5f2eb] font-sans-ui placeholder-[#b8b2a5]/40 focus:outline-none focus:border-[#c5a880] transition-colors ${
                    errors.city ? 'border-red-400/60' : 'border-white/[0.08]'
                  }`}
                />
              </div>

              {/* Preferred Date */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="date"
                  className="font-mono-tech text-xs uppercase tracking-wider text-[#f5f2eb] flex items-center justify-between"
                >
                  <span>PREFERRED DATE *</span>
                  {errors.preferredDate && (
                    <span className="text-red-400 text-[10px] lowercase">{errors.preferredDate}</span>
                  )}
                </label>
                <input
                  id="date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => {
                    setPreferredDate(e.target.value);
                    if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                  }}
                  className={`w-full bg-[#0e0e11] border px-4 py-3 text-sm text-[#f5f2eb] font-sans-ui focus:outline-none focus:border-[#c5a880] transition-colors ${
                    errors.preferredDate ? 'border-red-400/60' : 'border-white/[0.08]'
                  }`}
                />
              </div>
            </div>

            {/* Special Inquiries / Private Notes */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="notes"
                className="font-mono-tech text-xs uppercase tracking-wider text-[#f5f2eb]"
              >
                SPECIAL REQUESTS OR WRIST SIZE (OPTIONAL)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify private salon preferences, wrist circumference (mm), or specific horological inquiries..."
                className="w-full bg-[#0e0e11] border border-white/[0.08] px-4 py-3 text-sm text-[#f5f2eb] font-sans-ui placeholder-[#b8b2a5]/40 focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#b8b2a5]/70">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span>CONFIDENTIAL GENEVAN CLIENT PROTOCOL</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-[#c5a880] text-[#070707] font-sans-ui text-xs font-bold uppercase tracking-[0.24em] hover:bg-[#e4cdad] transition-colors cursor-pointer"
              >
                CONFIRM PRIVATE APPOINTMENT
              </button>
            </div>
          </form>
        ) : (
          /* Success State Card */
          <div className="luxury-glass p-8 sm:p-12 border border-[#c5a880] space-y-8 animate-fadeIn text-left">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#c5a880]/15 border border-[#c5a880] rounded-full text-[#c5a880]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#c5a880] block">
                    APPOINTMENT RESERVED
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#f5f2eb]">
                    We Await Your Presence, {name}.
                  </h3>
                </div>
              </div>

              <span className="font-mono-tech text-xs bg-[#c5a880]/20 text-[#c5a880] px-3.5 py-1.5 border border-[#c5a880]/40">
                CONFIRMED
              </span>
            </div>

            <p className="font-sans-ui text-sm text-[#b8b2a5] leading-relaxed font-light">
              Your private appointment has been registered with the Geneva Atelier Concierge. 
              Our private salon liaison will contact you within 24 hours at <strong className="text-[#f5f2eb]">{email}</strong> to finalize discrete logistics.
            </p>

            {/* Appointment Summary Box */}
            <div className="bg-[#0e0e12] p-6 border border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/60 block mb-1">REFERENCE DOSSIER</span>
                <span className="font-mono-tech text-[#c5a880] font-bold text-sm">{referenceCode}</span>
              </div>
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/60 block mb-1">CITY SALON</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium">{city}</span>
              </div>
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/60 block mb-1">PREFERRED DATE</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium">{preferredDate}</span>
              </div>
              <div>
                <span className="font-mono-tech text-[#b8b2a5]/60 block mb-1">TIMEPIECE FOCUS</span>
                <span className="font-sans-ui text-[#f5f2eb] font-medium">ORVÉN / 001</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#b8b2a5]/60">
                GENEVA ATELIER · APPOINTMENT PROTOCOL
              </span>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-xs font-mono-tech text-[#c5a880] hover:text-[#f5f2eb] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>BOOK ANOTHER APPOINTMENT</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
