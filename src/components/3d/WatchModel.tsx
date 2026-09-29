import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { CaseMaterial, DialColor, StrapType } from '../../types/watch';

interface WatchModelProps {
  caseMaterial?: CaseMaterial;
  dialColor?: DialColor;
  strapType?: StrapType;
  explodedProgress?: number;
  activeLayerId?: string | null;
  autoRotate?: boolean;
  scale?: number;
  rotationSpeed?: number;
}

export const WatchModel: React.FC<WatchModelProps> = ({
  caseMaterial = 'titanium',
  dialColor = 'obsidian',
  strapType = 'steel',
  explodedProgress = 0,
  activeLayerId = null,
  autoRotate = true,
  scale = 1,
  rotationSpeed = 0.35,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Mesh>(null);
  const hairspringRef = useRef<THREE.Mesh>(null);
  const secondsHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const hourHandRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);
  const subSecondsHandRef = useRef<THREE.Group>(null);

  // Generate crisp, photorealistic commercial luxury dial texture with distinct readability
  const dialTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const cx = 1024;
    const cy = 1024;

    // Dial Theme Colors
    let textColor = '#e8ecf2';
    let trackColor = 'rgba(232, 236, 242, 0.55)';
    let subBg = '#06070a';
    let borderSub = 'rgba(232, 236, 242, 0.4)';
    let accentColor = '#d8c29d';

    if (dialColor === 'ivory') {
      textColor = '#1c1e22';
      trackColor = 'rgba(28, 30, 34, 0.5)';
      subBg = '#dfd8ca';
      borderSub = 'rgba(28, 30, 34, 0.35)';
      accentColor = '#8c7353';
    } else if (dialColor === 'midnight') {
      textColor = '#f0f4fa';
      trackColor = 'rgba(240, 244, 250, 0.55)';
      subBg = '#050d1a';
      borderSub = 'rgba(240, 244, 250, 0.4)';
      accentColor = '#e6cca8';
    }

    // 1. Rich Sunburst Gradient Base
    const sunburst = ctx.createRadialGradient(cx, cy, 50, cx, cy, 980);
    if (dialColor === 'obsidian') {
      sunburst.addColorStop(0, '#1c1e24');
      sunburst.addColorStop(0.35, '#101216');
      sunburst.addColorStop(0.75, '#08090c');
      sunburst.addColorStop(1, '#030305');
    } else if (dialColor === 'ivory') {
      sunburst.addColorStop(0, '#faf7f0');
      sunburst.addColorStop(0.4, '#eee8db');
      sunburst.addColorStop(0.8, '#e2dacb');
      sunburst.addColorStop(1, '#d5ccbb');
    } else {
      sunburst.addColorStop(0, '#122c54');
      sunburst.addColorStop(0.35, '#0b1c38');
      sunburst.addColorStop(0.75, '#051022');
      sunburst.addColorStop(1, '#020610');
    }

    ctx.fillStyle = sunburst;
    ctx.fillRect(0, 0, 2048, 2048);

    // 2. Micro-Sunray Brushed Snailing Texture
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = dialColor === 'ivory' ? 'rgba(0,0,0,0.015)' : 'rgba(255,255,255,0.018)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 360; i += 0.6) {
      ctx.rotate((0.6 * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(80, 0);
      ctx.lineTo(950, 0);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Precision Outer Chapter Ring (Railway Minute Track)
    ctx.save();
    ctx.strokeStyle = trackColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 920, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 875, 0, Math.PI * 2);
    ctx.stroke();

    // 60-Second Precise Tick Marks & Arabic Numerals (05, 10, ... 60)
    for (let i = 0; i < 60; i++) {
      const angle = (i * Math.PI) / 30 - Math.PI / 2;
      const isFive = i % 5 === 0;
      const outerR = 920;
      const innerR = isFive ? 875 : 895;

      ctx.strokeStyle = isFive ? textColor : trackColor;
      ctx.lineWidth = isFive ? 3.5 : 1.8;

      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
      ctx.stroke();

      if (isFive) {
        const numR = 842;
        const text = i === 0 ? '60' : i < 10 ? `0${i}` : `${i}`;
        ctx.font = '600 24px "JetBrains Mono", monospace';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, cx + Math.cos(angle) * numR, cy + Math.sin(angle) * numR);
      }
    }
    ctx.restore();

    // 4. Sub-Dial at 6 o'clock (Small Seconds Register)
    const subX = cx;
    const subY = cy + 410;
    const subR = 245;

    ctx.save();
    ctx.beginPath();
    ctx.arc(subX, subY, subR, 0, Math.PI * 2);
    ctx.fillStyle = subBg;
    ctx.fill();
    ctx.strokeStyle = borderSub;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Concentric Guilloché Snail Rings
    for (let r = 24; r < subR; r += 16) {
      ctx.beginPath();
      ctx.arc(subX, subY, r, 0, Math.PI * 2);
      ctx.strokeStyle = dialColor === 'ivory' ? 'rgba(0,0,0,0.035)' : 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Sub-dial 60-second markings (15, 30, 45, 60)
    for (let s = 0; s < 12; s++) {
      const sAngle = (s * Math.PI) / 6 - Math.PI / 2;
      const sInner = s % 3 === 0 ? subR - 30 : subR - 18;
      ctx.strokeStyle = textColor;
      ctx.lineWidth = s % 3 === 0 ? 2.8 : 1.4;
      ctx.beginPath();
      ctx.moveTo(subX + Math.cos(sAngle) * sInner, subY + Math.sin(sAngle) * sInner);
      ctx.lineTo(subX + Math.cos(sAngle) * (subR - 6), subY + Math.sin(sAngle) * (subR - 6));
      ctx.stroke();

      if (s % 3 === 0) {
        const val = s === 0 ? '60' : `${s * 5}`;
        ctx.font = '600 22px "JetBrains Mono", monospace';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(val, subX + Math.cos(sAngle) * (subR - 55), subY + Math.sin(sAngle) * (subR - 55));
      }
    }
    ctx.restore();

    // 5. Clean Date Window at 3 o'clock (cx + 520, cy)
    const dateX = cx + 520;
    const dateY = cy;
    const dateW = 160;
    const dateH = 110;

    ctx.save();
    ctx.fillStyle = dialColor === 'ivory' ? '#f0ebd9' : '#08090c';
    ctx.fillRect(dateX - dateW / 2, dateY - dateH / 2, dateW, dateH);
    ctx.strokeStyle = borderSub;
    ctx.lineWidth = 2.2;
    ctx.strokeRect(dateX - dateW / 2, dateY - dateH / 2, dateW, dateH);

    ctx.font = '700 48px "JetBrains Mono", monospace';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('28', dateX, dateY + 2);
    ctx.restore();

    // 6. Luxury Brand Inscriptions: ORVÉN / 001
    ctx.save();
    ctx.textAlign = 'center';

    // Main Brand Wordmark at 12 o'clock
    ctx.font = '700 68px "Cinzel", Georgia, serif';
    ctx.fillStyle = textColor;
    ctx.letterSpacing = '14px';
    ctx.fillText('ORVÉN', cx, cy - 430);

    // Model & Chronometer
    ctx.font = '500 22px "Inter", sans-serif';
    ctx.fillStyle = accentColor;
    ctx.letterSpacing = '6px';
    ctx.fillText('001 · CHRONOMÈTRE', cx, cy - 370);

    // Automatic / 72 Hours above 6 o'clock
    ctx.font = '500 22px "Inter", sans-serif';
    ctx.fillStyle = accentColor;
    ctx.letterSpacing = '5px';
    ctx.fillText('AUTOMATIC', cx, cy + 380);

    ctx.font = '400 18px "JetBrains Mono", monospace';
    ctx.fillStyle = trackColor;
    ctx.letterSpacing = '3px';
    ctx.fillText('72 HOURS · 100M', cx, cy + 420);

    // Swiss Made at bottom
    ctx.font = '500 18px "Inter", sans-serif';
    ctx.fillStyle = trackColor;
    ctx.letterSpacing = '4px';
    ctx.fillText('SWISS  MADE', cx, cy + 960);

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [dialColor]);

  // High-Contrast Refined Metallurgy and Materials
  const materials = useMemo(() => {
    // 1. Case Metallurgy (Grade 5 Titanium / Steel / Ceramic)
    // Bright silvery metals so the watch stands out clearly with rich speculars
    let caseColor = '#b2b7be'; // Bright titanium silver
    let caseRoughness = 0.22;
    let caseMetalness = 0.96;
    let bezelPolishedRoughness = 0.06;

    if (caseMaterial === 'steel') {
      caseColor = '#e4e7eb'; // Mirror 316L Steel
      caseRoughness = 0.12;
      caseMetalness = 0.98;
      bezelPolishedRoughness = 0.03;
    } else if (caseMaterial === 'ceramic') {
      caseColor = '#1a1b1f';
      caseRoughness = 0.06;
      caseMetalness = 0.25;
      bezelPolishedRoughness = 0.02;
    }

    // 2. Dial Base Color
    let dialBaseColor = '#08080a';
    let dialRoughness = 0.35;
    let dialMetalness = 0.25;

    if (dialColor === 'ivory') {
      dialBaseColor = '#ebe5d8';
      dialRoughness = 0.55;
      dialMetalness = 0.05;
    } else if (dialColor === 'midnight') {
      dialBaseColor = '#081324';
      dialRoughness = 0.3;
      dialMetalness = 0.35;
    }

    // 3. Strap Material (Brushed steel bracelet, dark leather, or performance rubber)
    let strapColor = caseColor;
    let strapRoughness = caseRoughness;
    let strapMetalness = caseMetalness;

    if (strapType === 'leather') {
      strapColor = '#181412';
      strapRoughness = 0.72;
      strapMetalness = 0.08;
    } else if (strapType === 'rubber') {
      strapColor = '#141416';
      strapRoughness = 0.82;
      strapMetalness = 0.02;
    }

    const rhodiumSilverColor = '#f0f3f6';
    const champagneAccentColor = '#d8c29d';

    return {
      // Brushed Case Flanks & Center Bracelet Links
      caseBrushedMat: new THREE.MeshStandardMaterial({
        color: caseColor,
        roughness: caseRoughness,
        metalness: caseMetalness,
        envMapIntensity: 2.6,
      }),
      // Hand-Polished Anglage Chamfers, Bezel Facet, and Outer Bracelet Bevels
      casePolishedMat: new THREE.MeshStandardMaterial({
        color: caseColor,
        roughness: bezelPolishedRoughness,
        metalness: caseMetalness,
        envMapIntensity: 3.8,
      }),
      // Dial Face with Custom Texture Map
      dialMat: new THREE.MeshStandardMaterial({
        color: dialBaseColor,
        map: dialTexture || undefined,
        roughness: dialRoughness,
        metalness: dialMetalness,
        envMapIntensity: 1.4,
      }),
      // Slanted Rehaut / Chapter Ring
      rehautMat: new THREE.MeshStandardMaterial({
        color: caseColor,
        roughness: 0.14,
        metalness: caseMetalness,
        envMapIntensity: 2.8,
      }),
      // Applied 3D Faceted Metallic Hour Indices (Rhodium-plated bright silver)
      indicesMetallicMat: new THREE.MeshStandardMaterial({
        color: rhodiumSilverColor,
        roughness: 0.05,
        metalness: 0.99,
        envMapIntensity: 4.2,
      }),
      // Diamond-Cut Polished Hands (Left/Right Facet contrast)
      handsPolishedMat: new THREE.MeshStandardMaterial({
        color: rhodiumSilverColor,
        roughness: 0.04,
        metalness: 0.99,
        envMapIntensity: 4.5,
      }),
      handsBrushedMat: new THREE.MeshStandardMaterial({
        color: rhodiumSilverColor,
        roughness: 0.18,
        metalness: 0.96,
        envMapIntensity: 3.0,
      }),
      // Seconds Needle in Warm Champagne Gold
      secondsNeedleMat: new THREE.MeshStandardMaterial({
        color: champagneAccentColor,
        roughness: 0.04,
        metalness: 0.98,
        envMapIntensity: 4.8,
      }),
      // Luminous Super-LumiNova Infill
      lumeInfillMat: new THREE.MeshStandardMaterial({
        color: '#f4f8f2',
        emissive: '#d2eedb',
        emissiveIntensity: 0.22,
        roughness: 0.35,
      }),
      // Double-Domed Sapphire Crystal with AR Coating
      sapphireCrystalMat: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.97,
        opacity: 1,
        transparent: true,
        roughness: 0.015,
        ior: 1.77,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
        attenuationColor: '#7cd4ff',
        attenuationDistance: 2.5,
      }),
      // Calibre Movement Metallurgy
      calibrePlateMat: new THREE.MeshStandardMaterial({
        color: '#ccd0d8',
        roughness: 0.22,
        metalness: 0.92,
        envMapIntensity: 2.2,
      }),
      calibreGoldMat: new THREE.MeshStandardMaterial({
        color: '#d4af37',
        roughness: 0.14,
        metalness: 0.96,
        envMapIntensity: 3.0,
      }),
      rubyJewelMat: new THREE.MeshPhysicalMaterial({
        color: '#d61f48',
        roughness: 0.04,
        transmission: 0.88,
        ior: 1.76,
      }),
      bluedScrewMat: new THREE.MeshStandardMaterial({
        color: '#1a3a6b',
        roughness: 0.12,
        metalness: 0.94,
      }),
      // Leather Strap (if selected)
      strapLeatherMat: new THREE.MeshStandardMaterial({
        color: strapColor,
        roughness: strapRoughness,
        metalness: strapMetalness,
        envMapIntensity: 0.8,
      }),
      stitchThreadMat: new THREE.MeshStandardMaterial({
        color: '#a89070',
        roughness: 0.85,
        metalness: 0.1,
      }),
      // Active Layer Glow for Exploded Mode
      activeLayerGlowMat: new THREE.MeshBasicMaterial({
        color: '#c5a880',
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
    };
  }, [caseMaterial, dialColor, strapType, dialTexture]);

  // Frame animation loop for sweeping seconds hand, balance wheel, and rotor
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Balance wheel oscillation (4 Hz = 28,800 VPH)
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(time * 25.13) * 0.55;
    }
    if (hairspringRef.current) {
      hairspringRef.current.scale.x = 1 + Math.sin(time * 25.13) * 0.08;
      hairspringRef.current.scale.y = 1 + Math.sin(time * 25.13) * 0.08;
    }

    // 2. Sweeping central seconds hand
    if (secondsHandRef.current) {
      secondsHandRef.current.rotation.z = -time * 0.8;
    }

    // 3. Sub-dial small seconds hand
    if (subSecondsHandRef.current) {
      subSecondsHandRef.current.rotation.z = -time * 0.8;
    }

    // 4. Minute & Hour Hands (fixed at luxury 10:10 angle + subtle real-time progression)
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -time * 0.03 - 0.22;
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -time * 0.0025 - 0.72;
    }

    // 5. Automatic Rotor Kinetic Swivel
    if (rotorRef.current) {
      rotorRef.current.rotation.z = Math.sin(time * 0.6) * 1.2;
    }

    // 6. Slow, steady luxury rotation if assembled
    if (autoRotate && groupRef.current && explodedProgress < 0.05) {
      groupRef.current.rotation.y += delta * 0.12 * rotationSpeed;
    }
  });

  // Layer Explosion Offsets
  const zCrystal = 0.58 + explodedProgress * 1.85;
  const zHands = 0.36 + explodedProgress * 1.3;
  const zDial = 0.2 + explodedProgress * 0.8;
  const zCase = 0.0;
  const zMovement = -0.28 - explodedProgress * 0.8;
  const zCaseback = -0.54 - explodedProgress * 1.4;
  const zStrap = -0.16 - explodedProgress * 1.95;

  // Render 3D Faceted Applied Metallic Indices (12 hours)
  const hourIndices3D = useMemo(() => {
    const indices = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const radius = 1.38;
      const isTwelve = i === 0;
      const isThree = i === 3; // Date window is at 3, so use shortened marker
      const isSix = i === 6; // Subdial at 6

      if (isSix) continue;

      indices.push(
        <group
          key={`3d-index-${i}`}
          position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0.022]}
          rotation={[0, 0, -angle]}
        >
          {isTwelve ? (
            // Double Applied Baton at 12 o'clock with mirror chamfers
            <>
              <group position={[-0.045, 0, 0]}>
                <mesh material={materials.indicesMetallicMat} position={[0, 0, 0]}>
                  <boxGeometry args={[0.038, 0.28, 0.045]} />
                </mesh>
                <mesh material={materials.indicesMetallicMat} position={[0, 0.14, 0.015]} rotation={[-0.4, 0, 0]}>
                  <boxGeometry args={[0.038, 0.05, 0.03]} />
                </mesh>
              </group>
              <group position={[0.045, 0, 0]}>
                <mesh material={materials.indicesMetallicMat} position={[0, 0, 0]}>
                  <boxGeometry args={[0.038, 0.28, 0.045]} />
                </mesh>
                <mesh material={materials.indicesMetallicMat} position={[0, 0.14, 0.015]} rotation={[-0.4, 0, 0]}>
                  <boxGeometry args={[0.038, 0.05, 0.03]} />
                </mesh>
              </group>
            </>
          ) : isThree ? (
            // Shortened Baton next to Date Window
            <mesh material={materials.indicesMetallicMat} position={[0, -0.05, 0]}>
              <boxGeometry args={[0.042, 0.12, 0.045]} />
            </mesh>
          ) : (
            // Single Faceted Hour Baton with Chamfered Ends
            <group>
              <mesh material={materials.indicesMetallicMat} position={[0, 0, 0]}>
                <boxGeometry args={[0.042, i % 3 === 0 ? 0.26 : 0.2, 0.045]} />
              </mesh>
              <mesh material={materials.indicesMetallicMat} position={[0, (i % 3 === 0 ? 0.13 : 0.1), 0.012]} rotation={[-0.35, 0, 0]}>
                <boxGeometry args={[0.042, 0.04, 0.03]} />
              </mesh>
            </group>
          )}
        </group>
      );
    }
    return indices;
  }, [materials.indicesMetallicMat]);

  // Render Knurled Crown Fluting (24 precision teeth)
  const crownFlutes = useMemo(() => {
    const flutes = [];
    for (let f = 0; f < 24; f++) {
      const angle = (f * Math.PI) / 12;
      flutes.push(
        <mesh
          key={`flute-${f}`}
          position={[0, Math.sin(angle) * 0.27, Math.cos(angle) * 0.27]}
          material={materials.casePolishedMat}
        >
          <boxGeometry args={[0.22, 0.035, 0.035]} />
        </mesh>
      );
    }
    return flutes;
  }, [materials.casePolishedMat]);

  const isLayerActive = (layerId: string) => activeLayerId === layerId;

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      {/* ========================================================================= */}
      {/* 1. TOP SAPPHIRE CRYSTAL LAYER */}
      {/* ========================================================================= */}
      <group position={[0, 0, zCrystal]} name="layer-crystal">
        <mesh material={materials.sapphireCrystalMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.78, 1.78, 0.07, 64]} />
        </mesh>
        <mesh material={materials.casePolishedMat} position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.78, 0.03, 16, 64]} />
        </mesh>
        {isLayerActive('crystal') && (
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.activeLayerGlowMat}>
            <cylinderGeometry args={[1.84, 1.84, 0.1, 32]} />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 2. DIAMOND-CUT FACETED HANDS & PINION LAYER */}
      {/* ========================================================================= */}
      <group position={[0, 0, zHands]} name="layer-hands">
        <mesh material={materials.handsPolishedMat} position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.1, 32]} />
        </mesh>
        <mesh material={materials.handsPolishedMat} position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.065, 24, 16]} />
        </mesh>

        {/* 1. Hour Hand (Faceted Dauphine geometry with dual-facet light reflection) */}
        <group ref={hourHandRef} position={[0, 0, 0.04]}>
          <mesh material={materials.handsPolishedMat} position={[-0.018, 0.44, 0.003]} rotation={[0, -0.15, 0]}>
            <boxGeometry args={[0.038, 0.88, 0.024]} />
          </mesh>
          <mesh material={materials.handsBrushedMat} position={[0.018, 0.44, 0.003]} rotation={[0, 0.15, 0]}>
            <boxGeometry args={[0.038, 0.88, 0.024]} />
          </mesh>
          <mesh material={materials.lumeInfillMat} position={[0, 0.46, 0.01]}>
            <boxGeometry args={[0.028, 0.62, 0.015]} />
          </mesh>
          <mesh material={materials.handsPolishedMat} position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.075, 0.075, 0.026]} />
          </mesh>
        </group>

        {/* 2. Minute Hand (Long, slender, reach to outer minute track) */}
        <group ref={minuteHandRef} position={[0, 0, 0.065]}>
          <mesh material={materials.handsPolishedMat} position={[-0.014, 0.66, 0.003]} rotation={[0, -0.15, 0]}>
            <boxGeometry args={[0.03, 1.32, 0.022]} />
          </mesh>
          <mesh material={materials.handsBrushedMat} position={[0.014, 0.66, 0.003]} rotation={[0, 0.15, 0]}>
            <boxGeometry args={[0.03, 1.32, 0.022]} />
          </mesh>
          <mesh material={materials.lumeInfillMat} position={[0, 0.7, 0.01]}>
            <boxGeometry args={[0.022, 0.98, 0.015]} />
          </mesh>
          <mesh material={materials.handsPolishedMat} position={[0, 1.34, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.058, 0.058, 0.024]} />
          </mesh>
        </group>

        {/* 3. Central Sweep Seconds Hand (Champagne needle with circular counterbalance) */}
        <group ref={secondsHandRef} position={[0, 0, 0.092]}>
          <mesh material={materials.secondsNeedleMat} position={[0, 0.75, 0]}>
            <boxGeometry args={[0.016, 1.5, 0.012]} />
          </mesh>
          <mesh material={materials.secondsNeedleMat} position={[0, 1.51, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.028, 0.028, 0.012]} />
          </mesh>
          <mesh material={materials.secondsNeedleMat} position={[0, -0.32, 0]}>
            <boxGeometry args={[0.028, 0.42, 0.012]} />
          </mesh>
          <mesh material={materials.secondsNeedleMat} position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.052, 0.014, 12, 24]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 3. DIAL & APPLIED INDICES & SUB-DIAL & DATE WINDOW LAYER */}
      {/* ========================================================================= */}
      <group position={[0, 0, zDial]} name="layer-dial">
        {/* Main Sunburst Dial Disc */}
        <mesh material={materials.dialMat} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.74, 1.74, 0.04, 64]} />
        </mesh>

        {/* Slanted Polished Rehaut / Chapter Ring */}
        <mesh material={materials.rehautMat} position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.73, 0.038, 16, 64]} />
        </mesh>

        {/* Applied 3D Faceted Metallic Indices */}
        {hourIndices3D}

        {/* Recessed Small Seconds Sub-Dial at 6 o'clock */}
        <group position={[0, -0.68, 0.015]}>
          <mesh material={materials.indicesMetallicMat} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.012, 12, 32]} />
          </mesh>
          <mesh material={materials.indicesMetallicMat} position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          </mesh>
          <group ref={subSecondsHandRef} position={[0, 0, 0.03]}>
            <mesh material={materials.secondsNeedleMat} position={[0, 0.16, 0]}>
              <boxGeometry args={[0.015, 0.32, 0.01]} />
            </mesh>
            <mesh material={materials.secondsNeedleMat} position={[0, -0.06, 0]}>
              <boxGeometry args={[0.022, 0.12, 0.01]} />
            </mesh>
          </group>
        </group>

        {/* Metallic Date Window Frame at 3 o'clock */}
        <group position={[0.88, 0, 0.022]}>
          <mesh material={materials.indicesMetallicMat}>
            <boxGeometry args={[0.26, 0.18, 0.025]} />
          </mesh>
          <mesh material={materials.dialMat} position={[0, 0, 0.005]}>
            <boxGeometry args={[0.22, 0.14, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 4. 42MM SCULPTED CASE, BEZEL, CROWN & CHRONO PUSHERS */}
      {/* ========================================================================= */}
      <group position={[0, 0, zCase]} name="layer-case">
        {/* Main 42mm Monobloc Case Body (Satin brushed cylindrical flanks) */}
        <mesh material={materials.caseBrushedMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.92, 1.9, 0.38, 64]} />
        </mesh>

        {/* Stepped Front Bezel (Brushed base + Mirror-polished angled 45° chamfer) */}
        <mesh material={materials.caseBrushedMat} position={[0, 0, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.86, 1.92, 0.12, 64]} />
        </mesh>
        <mesh material={materials.casePolishedMat} position={[0, 0, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.78, 1.86, 0.06, 64]} />
        </mesh>

        {/* Ergonomic Integrated Curved Lugs (Top 12 o'clock) */}
        <group position={[0, 1.94, 0]}>
          <group position={[-0.88, 0.26, -0.06]} rotation={[-0.22, 0, -0.08]}>
            <mesh material={materials.caseBrushedMat}>
              <boxGeometry args={[0.26, 0.72, 0.34]} />
            </mesh>
            <mesh material={materials.casePolishedMat} position={[-0.12, 0, 0.15]} rotation={[0, -0.3, 0]}>
              <boxGeometry args={[0.04, 0.7, 0.06]} />
            </mesh>
          </group>
          <group position={[0.88, 0.26, -0.06]} rotation={[-0.22, 0, 0.08]}>
            <mesh material={materials.caseBrushedMat}>
              <boxGeometry args={[0.26, 0.72, 0.34]} />
            </mesh>
            <mesh material={materials.casePolishedMat} position={[0.12, 0, 0.15]} rotation={[0, 0.3, 0]}>
              <boxGeometry args={[0.04, 0.7, 0.06]} />
            </mesh>
          </group>
        </group>

        {/* Ergonomic Integrated Curved Lugs (Bottom 6 o'clock) */}
        <group position={[0, -1.94, 0]}>
          <group position={[-0.88, -0.26, -0.06]} rotation={[0.22, 0, 0.08]}>
            <mesh material={materials.caseBrushedMat}>
              <boxGeometry args={[0.26, 0.72, 0.34]} />
            </mesh>
            <mesh material={materials.casePolishedMat} position={[-0.12, 0, 0.15]} rotation={[0, -0.3, 0]}>
              <boxGeometry args={[0.04, 0.7, 0.06]} />
            </mesh>
          </group>
          <group position={[0.88, -0.26, -0.06]} rotation={[0.22, 0, -0.08]}>
            <mesh material={materials.caseBrushedMat}>
              <boxGeometry args={[0.26, 0.72, 0.34]} />
            </mesh>
            <mesh material={materials.casePolishedMat} position={[0.12, 0, 0.15]} rotation={[0, 0.3, 0]}>
              <boxGeometry args={[0.04, 0.7, 0.06]} />
            </mesh>
          </group>
        </group>

        {/* Detailed Fluted Winding Crown & Guards at 3 o'clock */}
        <group position={[1.96, 0, 0]}>
          <mesh material={materials.caseBrushedMat} position={[-0.08, 0.32, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.22, 0.28, 0.28]} />
          </mesh>
          <mesh material={materials.caseBrushedMat} position={[-0.08, -0.32, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.22, 0.28, 0.28]} />
          </mesh>

          <mesh material={materials.casePolishedMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.28, 0.25, 24]} />
          </mesh>

          {/* 24 Precision Fluted Grip Teeth */}
          {crownFlutes}

          {/* Crown Cap with Inset Medallion */}
          <mesh material={materials.casePolishedMat} position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.03, 24]} />
          </mesh>
          <mesh material={materials.indicesMetallicMat} position={[0.145, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.015, 24]} />
          </mesh>
        </group>

        {/* Sleek Chronograph Pushers at 2 o'clock and 4 o'clock */}
        <group position={[1.72, 0.82, 0]} rotation={[0, 0, 0.44]}>
          <mesh material={materials.casePolishedMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.26, 16]} />
          </mesh>
          <mesh material={materials.caseBrushedMat} position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.05, 16]} />
          </mesh>
        </group>

        <group position={[1.72, -0.82, 0]} rotation={[0, 0, -0.44]}>
          <mesh material={materials.casePolishedMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.26, 16]} />
          </mesh>
          <mesh material={materials.caseBrushedMat} position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.05, 16]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 5. CALIBRE ORV-72 MECHANICAL MOVEMENT LAYER */}
      {/* ========================================================================= */}
      <group position={[0, 0, zMovement]} name="layer-movement">
        <mesh material={materials.calibrePlateMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.72, 1.72, 0.12, 48]} />
        </mesh>

        <group position={[0, 0, -0.06]}>
          <mesh material={materials.calibrePlateMat} position={[0.42, 0.32, 0]} rotation={[0, 0, 0.38]}>
            <boxGeometry args={[0.92, 0.62, 0.045]} />
          </mesh>
          <mesh material={materials.calibrePlateMat} position={[-0.32, -0.32, 0]} rotation={[0, 0, -0.58]}>
            <boxGeometry args={[0.82, 0.52, 0.045]} />
          </mesh>

          <mesh material={materials.calibreGoldMat} position={[0.42, 0.42, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
          </mesh>
          <mesh material={materials.calibreGoldMat} position={[-0.26, -0.36, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.29, 0.29, 0.02, 24]} />
          </mesh>
          <mesh material={materials.calibreGoldMat} position={[0.12, -0.46, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.02, 24]} />
          </mesh>

          {/* Synthetic Ruby Jewels in Gold Chatons */}
          {[
            [0.42, 0.42],
            [-0.26, -0.36],
            [0.12, -0.46],
            [-0.52, 0.22],
            [0, 0],
          ].map(([x, y], idx) => (
            <group key={`ruby-chaton-${idx}`} position={[x, y, 0.04]}>
              <mesh material={materials.indicesMetallicMat} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.015, 16]} />
              </mesh>
              <mesh material={materials.rubyJewelMat} position={[0, 0, 0.008]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.02, 12]} />
              </mesh>
            </group>
          ))}

          {/* Blued Steel Screws */}
          {[
            [0.65, 0.1],
            [-0.55, -0.1],
            [0.15, 0.65],
            [-0.15, -0.65],
          ].map(([x, y], idx) => (
            <mesh key={`screw-${idx}`} position={[x, y, 0.035]} material={materials.bluedScrewMat} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.038, 0.038, 0.02, 12]} />
            </mesh>
          ))}
        </group>

        {/* Tungsten Micro-Rotor Assembly */}
        <group ref={rotorRef} position={[0, 0, -0.12]}>
          <mesh material={materials.calibreGoldMat} position={[0, 0.58, 0]}>
            <ringGeometry args={[0.8, 1.58, 32, 1, 0, Math.PI]} />
          </mesh>
          <mesh material={materials.calibrePlateMat} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.045, 12, 24]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 6. EXHIBITION SAPPHIRE CASEBACK LAYER */}
      {/* ========================================================================= */}
      <group position={[0, 0, zCaseback]} name="layer-caseback">
        <mesh material={materials.caseBrushedMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.88, 1.88, 0.08, 48]} />
        </mesh>
        <mesh material={materials.sapphireCrystalMat} position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.42, 1.42, 0.04, 32]} />
        </mesh>
        <mesh material={materials.indicesMetallicMat} position={[0, 0, -0.045]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.42, 0.015, 8, 48]} />
        </mesh>

        {/* 4 Titanium Torx Caseback Screws */}
        {[
          [0.85, 0.85],
          [-0.85, 0.85],
          [0.85, -0.85],
          [-0.85, -0.85],
        ].map(([x, y], idx) => (
          <mesh key={`caseback-screw-${idx}`} position={[x, y, 0.02]} material={materials.casePolishedMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.06, 12]} />
          </mesh>
        ))}
      </group>

      {/* ========================================================================= */}
      {/* 7. INTEGRATED PREMIUM METAL BRACELET & CLASP (OR LEATHER / RUBBER) */}
      {/* ========================================================================= */}
      <group position={[0, 0, zStrap]} name="layer-strap">
        {strapType === 'leather' ? (
          // Hand-Crafted Dark Italian Leather Strap with Saddle Stitching
          <>
            {/* Top Strap (12 o'clock side) */}
            <group position={[0, 2.75, -0.22]}>
              <mesh material={materials.strapLeatherMat} rotation={[-0.26, 0, 0]}>
                <boxGeometry args={[1.42, 1.85, 0.13]} />
              </mesh>
              <mesh position={[-0.62, 0, 0.07]} material={materials.stitchThreadMat} rotation={[-0.26, 0, 0]}>
                <boxGeometry args={[0.024, 1.76, 0.015]} />
              </mesh>
              <mesh position={[0.62, 0, 0.07]} material={materials.stitchThreadMat} rotation={[-0.26, 0, 0]}>
                <boxGeometry args={[0.024, 1.76, 0.015]} />
              </mesh>
            </group>

            {/* Bottom Strap (6 o'clock side) */}
            <group position={[0, -2.85, -0.26]}>
              <mesh material={materials.strapLeatherMat} rotation={[0.26, 0, 0]}>
                <boxGeometry args={[1.42, 2.05, 0.13]} />
              </mesh>
              <mesh position={[-0.62, 0, 0.07]} material={materials.stitchThreadMat} rotation={[0.26, 0, 0]}>
                <boxGeometry args={[0.024, 1.95, 0.015]} />
              </mesh>
              <mesh position={[0.62, 0, 0.07]} material={materials.stitchThreadMat} rotation={[0.26, 0, 0]}>
                <boxGeometry args={[0.024, 1.95, 0.015]} />
              </mesh>
              <mesh material={materials.strapLeatherMat} position={[0, -0.55, 0.07]} rotation={[0.26, 0, 0]}>
                <boxGeometry args={[1.48, 0.24, 0.18]} />
              </mesh>
              <mesh material={materials.casePolishedMat} position={[0, -1.1, 0.01]} rotation={[0.26, 0, 0]}>
                <boxGeometry args={[1.44, 0.36, 0.19]} />
              </mesh>
            </group>
          </>
        ) : (
          // High-End Integrated Multi-Link Metal Bracelet (Flagship Luxury Design)
          <>
            {/* Top Bracelet Assembly (12 o'clock) */}
            <group position={[0, 2.15, -0.05]}>
              {/* Solid Integrated Endlink (curved to hug case) */}
              <mesh material={materials.caseBrushedMat} position={[0, 0, 0]}>
                <boxGeometry args={[1.48, 0.36, 0.22]} />
              </mesh>
              <mesh material={materials.casePolishedMat} position={[-0.72, 0, 0.02]} rotation={[0, -0.2, 0]}>
                <boxGeometry args={[0.06, 0.34, 0.18]} />
              </mesh>
              <mesh material={materials.casePolishedMat} position={[0.72, 0, 0.02]} rotation={[0, 0.2, 0]}>
                <boxGeometry args={[0.06, 0.34, 0.18]} />
              </mesh>

              {/* Articulated 3-Link Structure (Links 1, 2, 3, 4) */}
              {[1, 2, 3, 4].map((link) => {
                const yPos = link * 0.44;
                const zPos = -Math.sin(link * 0.24) * 0.32;
                const linkWidth = 1.48 - link * 0.05;
                const centerW = linkWidth * 0.52;
                const sideW = (linkWidth - centerW) / 2;

                return (
                  <group
                    key={`top-metal-link-${link}`}
                    position={[0, yPos, zPos]}
                    rotation={[-link * 0.11, 0, 0]}
                  >
                    {/* Brushed Center Link */}
                    <mesh material={materials.caseBrushedMat} position={[0, 0, 0]}>
                      <boxGeometry args={[centerW - 0.02, 0.38, 0.14]} />
                    </mesh>
                    {/* Left Polished Outer Link */}
                    <mesh
                      material={materials.casePolishedMat}
                      position={[-centerW / 2 - sideW / 2, 0, 0]}
                    >
                      <boxGeometry args={[sideW - 0.02, 0.38, 0.15]} />
                    </mesh>
                    {/* Right Polished Outer Link */}
                    <mesh
                      material={materials.casePolishedMat}
                      position={[centerW / 2 + sideW / 2, 0, 0]}
                    >
                      <boxGeometry args={[sideW - 0.02, 0.38, 0.15]} />
                    </mesh>
                  </group>
                );
              })}
            </group>

            {/* Bottom Bracelet Assembly (6 o'clock) */}
            <group position={[0, -2.15, -0.05]}>
              {/* Solid Integrated Endlink */}
              <mesh material={materials.caseBrushedMat} position={[0, 0, 0]}>
                <boxGeometry args={[1.48, 0.36, 0.22]} />
              </mesh>
              <mesh material={materials.casePolishedMat} position={[-0.72, 0, 0.02]} rotation={[0, -0.2, 0]}>
                <boxGeometry args={[0.06, 0.34, 0.18]} />
              </mesh>
              <mesh material={materials.casePolishedMat} position={[0.72, 0, 0.02]} rotation={[0, 0.2, 0]}>
                <boxGeometry args={[0.06, 0.34, 0.18]} />
              </mesh>

              {/* Articulated 3-Link Structure */}
              {[1, 2, 3, 4].map((link) => {
                const yPos = -link * 0.44;
                const zPos = -Math.sin(link * 0.24) * 0.32;
                const linkWidth = 1.48 - link * 0.05;
                const centerW = linkWidth * 0.52;
                const sideW = (linkWidth - centerW) / 2;

                return (
                  <group
                    key={`bot-metal-link-${link}`}
                    position={[0, yPos, zPos]}
                    rotation={[link * 0.11, 0, 0]}
                  >
                    {/* Brushed Center Link */}
                    <mesh material={materials.caseBrushedMat} position={[0, 0, 0]}>
                      <boxGeometry args={[centerW - 0.02, 0.38, 0.14]} />
                    </mesh>
                    {/* Left Polished Outer Link */}
                    <mesh
                      material={materials.casePolishedMat}
                      position={[-centerW / 2 - sideW / 2, 0, 0]}
                    >
                      <boxGeometry args={[sideW - 0.02, 0.38, 0.15]} />
                    </mesh>
                    {/* Right Polished Outer Link */}
                    <mesh
                      material={materials.casePolishedMat}
                      position={[centerW / 2 + sideW / 2, 0, 0]}
                    >
                      <boxGeometry args={[sideW - 0.02, 0.38, 0.15]} />
                    </mesh>
                  </group>
                );
              })}

              {/* Concealed Butterfly Folding Clasp */}
              <group position={[0, -2.15, -0.85]} rotation={[0.42, 0, 0]}>
                <mesh material={materials.casePolishedMat} position={[0, 0, 0]}>
                  <boxGeometry args={[1.32, 0.42, 0.18]} />
                </mesh>
                <mesh material={materials.indicesMetallicMat} position={[0, 0, 0.1]}>
                  <boxGeometry args={[0.38, 0.05, 0.02]} />
                </mesh>
              </group>
            </group>
          </>
        )}
      </group>
    </group>
  );
};
