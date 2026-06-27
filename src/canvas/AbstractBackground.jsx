import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

export default function AbstractBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} color="#a855f7" />
        <directionalLight position={[-2, -2, -2]} intensity={0.5} color="#3b82f6" />
        
        {/* Deep Space Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
        
        {/* Floating Liquid Abstract Shape */}
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[1.4, 100, 100]} position={[3, 0, -2]}>
            <MeshDistortMaterial 
              color="#2e0a5c" 
              attach="material" 
              distort={0.5} 
              speed={2} 
              roughness={0.2} 
              metalness={0.8} 
            />
          </Sphere>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}