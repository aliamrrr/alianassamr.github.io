import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';

function AnimatedKnot() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.11;
    ref.current.rotation.y = t * 0.17;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.9}>
      <mesh ref={ref} scale={1.5}>
        <torusKnotGeometry args={[1, 0.28, 160, 20]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.22}
          speed={1.8}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
}

function DriftParticles({ count = 600 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.018;
    ref.current.rotation.x = clock.elapsedTime * 0.009;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#a78bfa" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function CyanRing() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * 0.08;
    ref.current.rotation.x = Math.PI / 4 + Math.sin(clock.elapsedTime * 0.3) * 0.1;
  });
  return (
    <mesh ref={ref} position={[-3, 1.5, -2]} scale={0.7}>
      <torusGeometry args={[1.4, 0.04, 8, 60]} />
      <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 58 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 4, 3]}  color="#7c3aed" intensity={5} />
        <pointLight position={[-4, -3, -3]} color="#06b6d4" intensity={3} />
        <pointLight position={[1, -4, 5]}  color="#f59e0b" intensity={1.5} />

        <AnimatedKnot />
        <DriftParticles />
        <CyanRing />
        <Stars radius={55} depth={50} count={1800} factor={3.5} saturation={0.4} fade speed={0.4} />
      </Suspense>
    </Canvas>
  );
}
