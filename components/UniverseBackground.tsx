
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Alias intrinsic Three.js elements to constants to resolve JSX type errors
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const PlaneGeometry = 'planeGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const Color = 'color' as any;

const StarField = () => {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    const cols = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const r = 0.5 + Math.random() * 0.5;
      const g = 0.5 + Math.random() * 0.5;
      const b = 1.0;
      cols[i * 3] = r;
      cols[i * 3 + 1] = g;
      cols[i * 3 + 2] = b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = time * 0.05;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.1, 0.1);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -mouse.x * 0.1, 0.1);
    }
  });

  return (
    <Group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </Group>
  );
};

const VideoBackground = () => {
  const { mouse } = useThree();
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const video = useMemo(() => {
    const v = document.createElement('video');
    // CDN 기반의 안정적인 소스로 교체
    v.src = "https://v.ftcdn.net/05/26/51/79/700_F_526517983_9A1L4Z2oR8x4b0V7Yp6R9v8iXm1e4V8T_ST.mp4";
    v.crossOrigin = "anonymous";
    v.loop = true;
    v.muted = true;
    v.setAttribute('playsinline', 'true');
    v.setAttribute('webkit-playsinline', 'true');
    v.preload = 'auto';
    
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // 자동 재생 차단 시 대응
        console.log("Autoplay prevented. Video will load on interaction.");
      });
    }
    return v;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.format = THREE.RGBAFormat;
    return t;
  }, [video]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -mouse.x * 0.2, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -mouse.y * 0.2, 0.05);
    }
  });

  return (
    <Mesh ref={meshRef} position={[0, 0, -5]} scale={[20, 11, 1]}>
      <PlaneGeometry />
      <MeshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.6} />
    </Mesh>
  );
};

const UniverseBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <Color attach="background" args={['#000000']} />
        <AmbientLight intensity={2} />
        <StarField />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <VideoBackground />
        </Float>
      </Canvas>
    </div>
  );
};

export default UniverseBackground;
