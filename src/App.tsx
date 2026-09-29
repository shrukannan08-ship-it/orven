import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { PhilosophySection } from './components/philosophy/PhilosophySection';
import { ProductSpecsSection } from './components/product/ProductSpecsSection';
import { ExplodedSection } from './components/exploded/ExplodedSection';
import { MaterialLabSection } from './components/configurator/MaterialLabSection';
import { PrecisionSection } from './components/precision/PrecisionSection';
import { CraftSection } from './components/craft/CraftSection';
import { AtelierSection } from './components/atelier/AtelierSection';
import { CollectionSection } from './components/collection/CollectionSection';
import { AppointmentSection } from './components/appointment/AppointmentSection';
import { Footer } from './components/layout/Footer';
import type { WatchConfiguration, CollectionItem } from './types/watch';

export function App() {
  const [selectedConfig, setSelectedConfig] = useState<WatchConfiguration | null>(null);
  const [selectedModel, setSelectedModel] = useState<CollectionItem | null>(null);

  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExploded = () => {
    const el = document.getElementById('exploded');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfigurationSelect = (config: WatchConfiguration) => {
    setSelectedConfig(config);
    setSelectedModel(null);
    scrollToAppointment();
  };

  const handleModelSelect = (model: CollectionItem) => {
    setSelectedModel(model);
    setSelectedConfig(null);
    scrollToAppointment();
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#f5f2eb] selection:bg-[#c5a880]/30 selection:text-[#f5f2eb] overflow-x-hidden">
      {/* Fixed Luxury Navigation */}
      <Navbar onNavigateToAppointment={scrollToAppointment} />

      {/* Main Experience Flow */}
      <main>
        {/* 1. 3D WATCH HERO */}
        <HeroSection
          onExploreClick={scrollToProduct}
          onExplodedClick={scrollToExploded}
        />

        {/* 2. CINEMATIC PHILOSOPHY (GSAP Reveal) */}
        <PhilosophySection />

        {/* 3. PRODUCT: ORVÉN / 001 SPECIFICATIONS */}
        <ProductSpecsSection
          onConfigureClick={scrollToConfigurator}
          onAppointmentClick={scrollToAppointment}
        />

        {/* 4. EXPLODED MOVEMENT BREAKDOWN */}
        <ExplodedSection />

        {/* 5. MATERIAL LAB CONFIGURATOR */}
        <MaterialLabSection
          onSelectConfiguration={handleConfigurationSelect}
        />

        {/* 6. PRECISION EDITORIAL DISPLAY */}
        <PrecisionSection />

        {/* 7. CRAFT: MACHINING, FINISHING, ASSEMBLY */}
        <CraftSection />

        {/* 8. ATELIER MANIFESTO */}
        <AtelierSection />

        {/* 9. REPERTORY COLLECTION (001, 002, 003) */}
        <CollectionSection
          onSelectModel={handleModelSelect}
        />

        {/* 10. PRIVATE APPOINTMENT FORM */}
        <AppointmentSection
          initialConfig={selectedConfig}
          initialModel={selectedModel}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
