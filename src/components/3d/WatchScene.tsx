import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import { WatchModel } from './WatchModel';
import type { CaseMaterial, DialColor, StrapType } from '../../types/watch';

interface WatchSceneProps {
  caseMaterial?: CaseMaterial;
  dialColor?: DialColor;
  strapType?: StrapType;
  explodedProgress?: number;
  activeLayerId?: string | null;
  autoRotate?: boolean;
  enableControls?: boolean;
  enableFloat?: boolean;
  cameraPosition?: [number, number, number];
  rotationSpeed?: number;
  scale?: number;
  fov?: number;
  className?: string;
}

export const WatchScene: React.FC<WatchSceneProps> = ({
  caseMaterial = 'titanium',
  dialColor = 'obsidian',
  strapType = 'leather',
  explodedProgress = 0,
  activeLayerId = null,
  autoRotate = true,
  enableControls = true,
  enableFloat = true,
  cameraPosition = [0, 0, 6.8],
  rotationSpeed = 0.35,
  scale = 1.08,
  fov = 34,
  className = 'w-full h-full min-h-[360px]',
}) => {
  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: cameraPosition, fov: fov }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <color attach="background" args={['transparent']} />

        {/* ========================================================================= */}
        {/* DRAMATIC LUXURY STUDIO LIGHTING SETUP */}
        {/* ========================================================================= */}
        
        {/* Deep Ambient Obsidian Base */}
        <ambientLight intensity={0.65} color="#18191c" />

        {/* 1. Primary Soft Champagne Key Light (Top-Right 45° Softbox) */}
        <directionalLight
          position={[4.5, 7.5, 5.5]}
          intensity={2.6}
          color="#fff5e6"
        />

        {/* 2. Cold Titanium Rim Strip Light (Left Back Edge Grazing) */}
        <directionalLight
          position={[-6.0, -3.5, -4.0]}
          intensity={1.5}
          color="#9ec4e6"
        />

        {/* 3. Overhead Bezel Specular Arc Light */}
        <directionalLight
          position={[0, 6.5, -1.5]}
          intensity={2.2}
          color="#ecdcc3"
        />

        {/* 4. Warm Leather Bounce Light (Floor Fill) */}
        <directionalLight
          position={[0, -5.0, 2.0]}
          intensity={0.6}
          color="#2e241c"
        />

        {/* 5. Dial Center Glint Point Light */}
        <pointLight
          position={[0.2, 0.4, 3.8]}
          intensity={0.9}
          color="#ffffff"
          distance={8}
        />

        <Suspense fallback={null}>
          {enableFloat ? (
            <Float
              speed={1.2}
              rotationIntensity={0.15}
              floatIntensity={0.18}
              floatingRange={[-0.05, 0.05]}
            >
              <WatchModel
                caseMaterial={caseMaterial}
                dialColor={dialColor}
                strapType={strapType}
                explodedProgress={explodedProgress}
                activeLayerId={activeLayerId}
                autoRotate={autoRotate}
                scale={scale}
                rotationSpeed={rotationSpeed}
              />
            </Float>
          ) : (
            <WatchModel
              caseMaterial={caseMaterial}
              dialColor={dialColor}
              strapType={strapType}
              explodedProgress={explodedProgress}
              activeLayerId={activeLayerId}
              autoRotate={autoRotate}
              scale={scale}
              rotationSpeed={rotationSpeed}
            />
          )}

          {/* Luxury Soft Studio Ground Shadow */}
          <ContactShadows
            position={[0, -2.85, 0]}
            opacity={0.45}
            scale={7.5}
            blur={2.6}
            far={4.8}
            color="#050505"
          />
        </Suspense>

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.25}
            minPolarAngle={Math.PI / 2 - 0.25}
            rotateSpeed={0.45}
            dampingFactor={0.05}
          />
        )}
      </Canvas>
    </div>
  );
};
