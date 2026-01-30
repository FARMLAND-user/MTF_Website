
import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FluidParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  
  const count = 3000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const isOrange = Math.random() > 0.88;
      cols[i * 3] = isOrange ? 1.0 : 0.7;
      cols[i * 3 + 1] = isOrange ? 0.37 : 0.7;
      cols[i * 3 + 2] = isOrange ? 0.0 : 0.9;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, mouse.y * 0.05, 0.02);
    
    const s = 1 + Math.sin(t * 0.4) * 0.03;
    pointsRef.current.scale.set(s, s, s);

    const positionsAttr = pointsRef.current.geometry.attributes.position;
    if (positionsAttr) {
      for (let i = 0; i < count; i++) {
        const x = positionsAttr.getX(i);
        positionsAttr.setX(i, x + Math.sin(t * 0.5 + i) * 0.0005);
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
};

const UniverseBackground: React.FC = () => {
  const [webGlStatus, setWebGlStatus] = useState<'testing' | 'supported' | 'unsupported'>('testing');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGlStatus(gl ? 'supported' : 'unsupported');
    } catch (e) {
      setWebGlStatus('unsupported');
    }
  }, []);

  if (webGlStatus === 'unsupported') {
    return <div className="absolute inset-0 z-0 bg-black" />;
  }

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        {webGlStatus === 'supported' && (
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 50 }} 
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000');
            }}
            onError={(e) => {
              console.warn("Canvas error, falling back to static bg", e);
              setWebGlStatus('unsupported');
            }}
          >
            <FluidParticles />
          </Canvas>
        )}
      </Suspense>
      <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
    </div>
  );
};

export default UniverseBackground;
