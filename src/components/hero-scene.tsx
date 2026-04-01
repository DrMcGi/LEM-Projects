"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function SceneGeometry() {
  const clusterRef = useRef<Group>(null);
  const orbARef = useRef<Mesh>(null);
  const orbBRef = useRef<Mesh>(null);
  const orbCRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (clusterRef.current) {
      clusterRef.current.rotation.z = Math.sin(elapsed * 0.24) * 0.04;
      clusterRef.current.position.y = Math.sin(elapsed * 0.7) * 0.06;
    }

    if (orbARef.current) {
      orbARef.current.position.x = Math.sin(elapsed * 0.45) * 0.35 - 1.1;
      orbARef.current.position.y = Math.cos(elapsed * 0.7) * 0.22 + 0.2;
    }

    if (orbBRef.current) {
      orbBRef.current.position.x = Math.cos(elapsed * 0.38) * 0.28 + 1.15;
      orbBRef.current.position.y = Math.sin(elapsed * 0.62) * 0.18 - 0.3;
    }

    if (orbCRef.current) {
      orbCRef.current.position.y = Math.sin(elapsed * 0.52) * 0.24 + 1.05;
      orbCRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={clusterRef}>
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.7}>
        <mesh ref={orbARef} position={[-1.1, 0.3, 0]}>
          <sphereGeometry args={[1.12, 64, 64]} />
          <MeshDistortMaterial
            color="#99f6e4"
            emissive="#0f766e"
            emissiveIntensity={0.35}
            roughness={0.08}
            metalness={0.05}
            transparent
            opacity={0.3}
            distort={0.22}
            speed={1.4}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={orbBRef} position={[1.15, -0.25, 0.3]}>
          <sphereGeometry args={[0.92, 64, 64]} />
          <MeshDistortMaterial
            color="#fde68a"
            emissive="#f59e0b"
            emissiveIntensity={0.26}
            roughness={0.1}
            metalness={0.02}
            transparent
            opacity={0.26}
            distort={0.18}
            speed={1.1}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.65}>
        <mesh ref={orbCRef} position={[0.15, 1.05, -0.35]}>
          <sphereGeometry args={[0.48, 48, 48]} />
          <MeshDistortMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.18}
            roughness={0.04}
            metalness={0}
            transparent
            opacity={0.2}
            distort={0.12}
            speed={0.9}
          />
        </mesh>
      </Float>

      <Sparkles
        count={36}
        scale={[7.2, 5.2, 4.2]}
        size={2.8}
        speed={0.25}
        opacity={0.42}
        color="#dffdfa"
      />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="hero-scene-canvas" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 4, 5]} intensity={1.25} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={11} distance={11} color="#14b8a6" />
        <pointLight position={[3, -1, 4]} intensity={8} distance={10} color="#f59e0b" />
        <SceneGeometry />
      </Canvas>
    </div>
  );
}