
import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const FlowingParticles = ({ count = 4000 }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  
  // 초기 입자 데이터 생성
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const szs = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // 넓은 원통형 터널 모양으로 배치
      const radius = 2 + Math.random() * 15;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 40; // 깊이감
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;
      
      // 색상: 80% 화이트/블루, 20% 브랜드 오렌지
      const isOrange = Math.random() > 0.85;
      if (isOrange) {
        cols[i * 3] = 1.0;     // R
        cols[i * 3 + 1] = 0.37;  // G
        cols[i * 3 + 2] = 0.0;   // B
      } else {
        const brightness = 0.4 + Math.random() * 0.6;
        cols[i * 3] = brightness;
        cols[i * 3 + 1] = brightness * 1.1;
        cols[i * 3 + 2] = brightness * 1.2;
      }
      
      szs[i] = Math.random() * 0.05 + 0.01;
    }
    return [pos, cols, szs];
  }, [count]);

  const velocity = useMemo(() => new Float32Array(count).fill(0).map(() => 0.02 + Math.random() * 0.05), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // 1. 전체 회전
    pointsRef.current.rotation.z = t * 0.02;
    
    // 2. 마우스 반응 패럴랙스 (부드러운 추적)
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.2, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.2, 0.05);

    // 3. 입자 전진 애니메이션 (카메라 방향으로 흐름)
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let z = positionsAttr.getZ(i);
      z += velocity[i]; // 앞으로 이동
      
      // 화면 밖으로 나가면 다시 뒤로 배치 (루프)
      if (z > 15) {
        z = -25;
      }
      positionsAttr.setZ(i, z);
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

// 원본 THREE.Points를 래핑한 커스텀 컴포넌트
// Fix: Use type-casted component references to avoid JSX intrinsic element lookup errors for R3F tags
const Points = React.forwardRef(({ children, positions, colors, ...props }: any, ref) => {
  const PointsEl = 'points' as any;
  const BufferGeometryEl = 'bufferGeometry' as any;
  const BufferAttributeEl = 'bufferAttribute' as any;

  return (
    <PointsEl ref={ref as any} {...props}>
      <BufferGeometryEl>
        <BufferAttributeEl
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <BufferAttributeEl
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </BufferGeometryEl>
      {children}
    </PointsEl>
  );
});

// Fix: Use type casting for 'pointsMaterial' intrinsic element to resolve TS error
const PointMaterial = (props: any) => {
  const PointsMaterialEl = 'pointsMaterial' as any;
  return <PointsMaterialEl {...props} />;
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

  // Fix: Use type-casted component references for global scene elements to bypass missing JSX definitions
  const ColorEl = 'color' as any;
  const AmbientLightEl = 'ambientLight' as any;
  const PointLightEl = 'pointLight' as any;

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        {webGlStatus === 'supported' && (
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 60 }} 
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ColorEl attach="background" args={['#000000']} />
            
            {/* 먼 배경: 고정된 별무리 */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* 중간 배경: 부드러운 움직임 */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
               <FlowingParticles count={3000} />
            </Float>

            {/* 조명 효과 (입자에 은은한 색감 부여) */}
            <AmbientLightEl intensity={0.5} />
            <PointLightEl position={[10, 10, 10]} intensity={1} color="#FF5E00" />
          </Canvas>
        )}
      </Suspense>
      
      {/* 노이즈 및 비네팅 오버레이 */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
};

export default UniverseBackground;
