'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.4;
      ringRef1.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.2) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.3;
      ringRef2.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.2) * 0.1;
    }
  });

  return (
    <group>
      {/* Main animated sphere using standard Three.js materials */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial
          color="#4f46e5"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e1b4b"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.42, 16, 16]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 200]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 200]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Floating particles around sphere */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 1.5) * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#22d3ee" />
      <pointLight position={[0, 5, -5]} intensity={1.5} color="#8b5cf6" />
    </group>
  );
}

export default function RotatingSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
          <AnimatedSphere />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
