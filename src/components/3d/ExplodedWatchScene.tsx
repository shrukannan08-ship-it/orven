import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { WatchModel } from './WatchModel';
import type { CaseMaterial, DialColor, StrapType } from '../../types/watch';

interface ExplodedWatchSceneProps {
  explodedProgress: number;
  activeLayerId: string | null;
  caseMaterial?: CaseMaterial;
  dialColor?: DialColor;
  strapType?: StrapType;
  className?: string;
}

export const ExplodedWatchScene: React.FC<ExplodedWatchSceneProps> = ({
  explodedProgress,
  activeLayerId,
  caseMaterial = 'titanium',
  dialColor = 'obsidian',
  strapType = 'leather',
  className = 'w-full h-full min-h-[420px]',
}) => {
  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: [2.5, 1.2, 5.8], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />

        {/* Studio lights */}
        <ambientLight intensity={0.9} color="#1f2228" />

        <directionalLight position={[6, 10, 6]} intensity={3.0} color="#fdf4e8" />
        <directionalLight position={[-6, -4, -4]} intensity={1.8} color="#8ab8e6" />
        <directionalLight position={[0, 8, -4]} intensity={2.2} color="#c5a880" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" distance={12} />

        <Suspense fallback={null}>
          <group rotation={[0.2, -0.45, 0]}>
            <WatchModel
              caseMaterial={caseMaterial}
              dialColor={dialColor}
              strapType={strapType}
              explodedProgress={explodedProgress}
              activeLayerId={activeLayerId}
              autoRotate={false}
              scale={0.92}
            />
          </group>

          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.4}
            scale={10}
            blur={2.8}
            far={6}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          minDistance={3.5}
          maxDistance={9.5}
          enablePan={false}
          rotateSpeed={0.7}
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
};
