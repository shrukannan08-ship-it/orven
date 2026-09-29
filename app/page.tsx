'use client'

import { useState } from 'react'
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react'

const materialOptions = {
  case: ['Titanium', 'Steel', 'Ceramic'],
  dial: ['Obsidian', 'Ivory', 'Midnight'],
  strap: ['Italian Leather', 'Brushed Steel', 'Rubber'],
} as const

type MaterialKey = keyof typeof materialOptions

type WatchPlaceholderProps = { label: string; large?: boolean; tone?: 'dark' | 'light' }

function WatchPlaceholder({ label, large = false, tone = 'dark' }: WatchPlaceholderProps) {
  return (
    <div className={`watch-placeholder ${large ? 'watch-placeholder--large' : ''} watch-placeholder--${tone}`} aria-label={`${label} placeholder`}>
      <div className="watch-placeholder__halo" />
      <div className="watch-placeholder__case">
        <div className="watch-placeholder__crown" />
        <div className="watch-placeholder__dial">
          <span className="watch-placeholder__brand">ORVÉN</span>
          <span className="watch-placeholder__index watch-placeholder__index--12" />
          <span className="watch-placeholder__index watch-placeholder__index--3" />
          <span className="watch-placeholder__index watch-placeholder__index--6" />
          <span className="watch-placeholder__index watch-placeholder__index--9" />
          <span className="watch-placeholder__hands" />
          <span className="watch-placeholder__subdial" />
        </div>
      </div>
      <span className="watch-placeholder__label">{label}</span>
    </div>
  )
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return <div className="section-marker"><span>{number}</span><span>{label}</span></div>
}

function ImagePlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`image-placeholder ${className}`}><span>{label}</span><span className="image-placeholder__line" /></div>
}

function MaterialLab() {
  const [selected, setSelected] = useState<Record<MaterialKey, string>>({ case: 'Titanium', dial: 'Obsidian', strap: 'Italian Leather' })

  return (
    <section className="section section--lab" id="materials">
      <div className="container">
        <SectionMarker number="07" label="Material lab" />
        <div className="lab-layout">
          <div className="lab-copy"><p className="eyebrow">A study in restraint</p><h2>Make it<br /><em>yours.</em></h2><p className="body-copy">Every surface, tone and texture is considered. Compose your ORVÉN / 001 from the elements that speak to you.</p></div>
          <div className="lab-preview"><WatchPlaceholder label="Interactive product viewer / future 3D" large tone="light" /><div className="lab-selection-summary"><span>Current composition</span><strong>{selected.case} / {selected.dial} / {selected.strap}</strong></div></div>
          <div className="material-controls">
            {(Object.keys(materialOptions) as MaterialKey[]).map((key) => (
              <fieldset className="material-group" key={key}><legend>{key}</legend><div className="material-options">{materialOptions[key].map((option) => <button type="button" key={option} className={`material-option ${selected[key] === option ? 'is-active' : ''}`} onClick={() => setSelected({ ...selected, [key]: option })}>{option}<span /></button>)}</div></fieldset>
            ))}
            <p className="micro-copy">Selection previews are indicative. Final materials are confirmed privately.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className={`orven-site ${loading ? 'is-loading' : 'is-ready'}`}>
      <div className="loader" aria-hidden={!loading} onAnimationEnd={() => setLoading(false)}><div className="loader__mark">ORVÉN</div><div className="loader__meta">HOROLOGY / 001</div><div className="loader__bar" /></div>
      <header className="site-header"><a className="wordmark" href="#top">ORVÉN<span>HOROLOGY</span></a><nav className="desktop-nav" aria-label="Primary navigation"><a href="#philosophy">Philosophy</a><a href="#watch">The watch</a><a href="#atelier">Atelier</a><a href="#appointment">Contact</a></nav><button className="menu-button" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#philosophy" onClick={() => setMenuOpen(false)}>Philosophy</a><a href="#watch" onClick={() => setMenuOpen(false)}>The watch</a><a href="#atelier" onClick={() => setMenuOpen(false)}>Atelier</a><a href="#appointment" onClick={() => setMenuOpen(false)}>Contact</a></nav>}

      <section className="hero" id="top"><div className="hero__topline"><span>Independent horology</span><span>Est. 2024 / Mumbai</span></div><div className="hero__content"><p className="eyebrow">ORVÉN / 001</p><h1>Crafted<br /><em>for time.</em></h1><p className="hero__intro">A contemporary expression of mechanical precision, made in small numbers for those who measure life in moments.</p></div><div className="hero__watch"><WatchPlaceholder label="Hero watch / future 3D" large /></div><a className="scroll-cue" href="#philosophy"><span>Scroll to explore</span><ArrowDown /></a><div className="hero__edition">No. 001<br /><span>01 — 100</span></div></section>

      <section className="section philosophy" id="philosophy"><div className="container"><SectionMarker number="02" label="Philosophy" /><div className="philosophy__statement"><p className="display-line">Time is not</p><p className="display-line display-line--indent"><em>measured.</em></p><p className="display-line display-line--right">It is experienced.</p></div><div className="philosophy__aside"><p className="eyebrow">The ORVÉN principle</p><p className="body-copy">We believe the finest objects ask you to slow down. Each ORVÉN timepiece is designed, finished and assembled with the patience that mechanical time demands.</p></div></div></section>

      <section className="section product-intro" id="watch"><div className="container"><SectionMarker number="03" label="ORVÉN / 001" /><div className="product-intro__head"><p className="eyebrow">The inaugural timepiece</p><h2>Quietly<br /><em>distinct.</em></h2><div className="spec-strip"><span>42 mm titanium</span><span>Automatic</span><span>72 hour reserve</span></div></div><div className="product-intro__watch"><WatchPlaceholder label="Product viewer / future 3D rotation" large tone="light" /></div></div></section>

      <section className="section movement"><div className="container"><SectionMarker number="04" label="The movement" /><div className="movement__layout"><ImagePlaceholder label="Macro movement / visual placeholder" className="movement__image" /><div className="movement__copy"><p className="eyebrow">Caliber OV-01</p><h2>Motion,<br /><em>made visible.</em></h2><p className="body-copy">At the heart of the / 001 is a hand-finished automatic caliber. Its rhythmic architecture is a reminder that precision is not sterile — it is alive.</p><div className="movement__numbers"><span><strong>28,800</strong> VPH</span><span><strong>72</strong> HOURS</span><span><strong>AUTOMATIC</strong> CALIBER</span></div></div></div></div></section>

      <section className="section craft"><div className="container"><SectionMarker number="05" label="The craft" /><div className="craft__grid"><article><ImagePlaceholder label="01 / Machining" /><h3>Machining</h3><p>Form begins with a solid block of Grade 5 titanium.</p></article><article><ImagePlaceholder label="02 / Finishing" /><h3>Finishing</h3><p>Brushed planes meet polished edges by hand.</p></article><article><ImagePlaceholder label="03 / Assembly" /><h3>Assembly</h3><p>One watchmaker. One movement. Total attention.</p></article></div></div></section>

      <MaterialLab />

      <section className="section your-orven"><div className="container your-orven__layout"><div><SectionMarker number="08" label="Your ORVÉN" /><p className="eyebrow">The considered object</p><h2>Built to be<br /><em>kept.</em></h2><div className="your-orven__details"><p>ORVÉN / 001</p><p>Titanium case<br />Obsidian dial<br />Italian leather strap</p><strong>₹2,84,000</strong><a className="text-link" href="#appointment">Request private appointment <ArrowRight /></a></div></div><WatchPlaceholder label="Final product / future 3D" large tone="light" /></div></section>

      <section className="section precision"><div className="container"><SectionMarker number="09" label="Precision" /><div className="precision__grid">{[['±3', 'SEC / DAY'], ['28,800', 'VPH'], ['72', 'HOUR RESERVE'], ['100', 'M WATER RESISTANCE']].map(([value, label]) => <div key={label} className="precision__item"><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>

      <section className="atelier" id="atelier"><div className="atelier__overlay"><SectionMarker number="10" label="The atelier" /><h2>Independent.<br /><em>Deliberate.</em><br />Mechanical.</h2><p>Made slowly in our Mumbai atelier. Never in a hurry.</p></div><ImagePlaceholder label="Atelier / workshop visual placeholder" /></section>

      <section className="section collection"><div className="container"><SectionMarker number="11" label="The collection" /><div className="collection__heading"><p className="eyebrow">Three expressions of time</p><h2>The ORVÉN<br /><em>collection.</em></h2></div><div className="collection__rail">{['001', '002', '003'].map((item, index) => <article className={`collection-card ${index === 0 ? 'is-current' : ''}`} key={item}><span className="collection-card__number">/{item}</span><WatchPlaceholder label={`ORVÉN / ${item}`} tone={index === 0 ? 'light' : 'dark'} /><div><h3>ORVÉN / {item}</h3><p>{['The original study', 'A darker register', 'The evening edition'][index]}</p></div></article>)}</div></div></section>

      <section className="section appointment" id="appointment"><div className="container appointment__layout"><div><SectionMarker number="12" label="Private appointment" /><h2>Time deserves<br /><em>a moment.</em></h2><p className="body-copy">Discover the collection in person, with an ORVÉN curator. We welcome you to a considered conversation about the object.</p></div><form className="appointment__form" onSubmit={(event) => event.preventDefault()}><label>Name<input name="name" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@email.com" required /></label><label>City<input name="city" placeholder="Mumbai" /></label><label>Preferred date<input name="date" type="date" /></label><button type="submit" className="button button--filled">Request appointment <ArrowRight /></button></form></div></section>

      <footer className="site-footer"><div className="container"><div className="footer__top"><a className="wordmark wordmark--footer" href="#top">ORVÉN<span>HOROLOGY</span></a><p>Crafted for time.</p><a className="text-link" href="mailto:hello@orven.in">hello@orven.in <ArrowRight /></a></div><div className="footer__bottom"><span>© 2024 ORVÉN HOROLOGY</span><span>Mumbai / India</span><span>Independent by design.</span></div></div></footer>
    </main>
  )
}
