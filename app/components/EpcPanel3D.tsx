"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  ContactShadows,
  Environment,
  Lightformer,
  Outlines,
} from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

/* Brand palette (matches globals.css tokens) */
const INK = "#15161a";
const RED = "#d81e26";
const LIGHT = "#dcd9d0";
const STEEL = "#7a808a";
const AMBER = "#f4a400";
const COPPER = "#c06a2c";

const TONE = [RED, INK, LIGHT, INK, LIGHT, INK];
const MAX = 6;
const SLAB: [number, number, number] = [3, 0.2, 2]; // w, h, d
const CLOSED_GAP = 0.24;
const OPEN_GAP = 0.95;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* shared standard material props per tone for a clean PBR look */
function matProps(color: string) {
  if (color === INK) return { color, metalness: 0.72, roughness: 0.34, envMapIntensity: 0.9 };
  if (color === LIGHT) return { color, metalness: 0.18, roughness: 0.55, envMapIntensity: 0.7 };
  return { color, metalness: 0.42, roughness: 0.38, envMapIntensity: 1.0 }; // red
}

function Contents({ i }: { i: number }) {
  const y = SLAB[1] / 2;
  const onLight = i === 2 || i === 4;
  const accent = onLight ? INK : AMBER;

  if (i === 0) {
    return (
      <group position={[0, y, 0]}>
        <mesh position={[-0.5, 0.05, 0]} castShadow>
          <boxGeometry args={[1.3, 0.07, 0.9]} />
          <meshStandardMaterial color="#0c0d10" metalness={0.2} roughness={0.35} envMapIntensity={1.2} />
        </mesh>
        {[0.55, 0.85, 1.15].map((x, k) => (
          <mesh key={k} position={[x, 0.07, -0.45]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.08, 24]} />
            <meshStandardMaterial
              color={k === 0 ? RED : k === 1 ? AMBER : "#3fae5a"}
              emissive={k === 0 ? RED : k === 1 ? AMBER : "#3fae5a"}
              emissiveIntensity={0.7}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 1) {
    return (
      <group position={[0, y, 0]}>
        {[-0.9, -0.3, 0.3, 0.9].map((x, k) => (
          <mesh key={k} position={[x, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.1, 40]} />
            <meshStandardMaterial color={LIGHT} metalness={0.3} roughness={0.5} envMapIntensity={0.9} />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 2) {
    return (
      <group position={[0, y, 0]}>
        {[-1.05, -0.63, -0.21, 0.21, 0.63, 1.05].map((x, k) => (
          <mesh key={k} position={[x, 0.12, 0]} castShadow>
            <boxGeometry args={[0.3, 0.24, 0.7]} />
            <meshStandardMaterial color={INK} metalness={0.5} roughness={0.4} envMapIntensity={1} />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 3) {
    return (
      <group position={[0, y + 0.08, 0]}>
        {[-0.5, 0, 0.5].map((z, k) => (
          <mesh key={k} position={[0, 0, z]} castShadow>
            <boxGeometry args={[2.6, 0.1, 0.16]} />
            <meshStandardMaterial color={COPPER} metalness={0.95} roughness={0.22} envMapIntensity={1.4} />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 4) {
    return (
      <group position={[0, y + 0.28, 0]}>
        {[-0.55, 0.55].map((x, k) => (
          <mesh key={k} position={[x, 0, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.62, 44]} />
            <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.32} envMapIntensity={1.1} />
          </mesh>
        ))}
      </group>
    );
  }
  return (
    <group position={[0, y + 0.25, 0]}>
      {[
        [-1.4, -0.9],
        [1.4, -0.9],
        [-1.4, 0.9],
        [1.4, 0.9],
      ].map(([x, z], k) => (
        <mesh key={k} position={[x, 0, z]} castShadow>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
          <meshStandardMaterial color={accent} metalness={0.5} roughness={0.45} envMapIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

function Layer({
  i,
  mid,
  open,
  selected,
  onSelect,
}: {
  i: number;
  mid: number;
  open: boolean;
  selected: boolean;
  onSelect: (i: number) => void;
}) {
  const ref = useRef<Group>(null);
  const color = TONE[i % TONE.length];

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const targetY = (mid - i) * (open ? OPEN_GAP : CLOSED_GAP);
    const targetX = open && selected ? 0.7 : 0;
    const targetS = selected ? 1.05 : 1;
    g.position.y = lerp(g.position.y, targetY, 0.1);
    g.position.x = lerp(g.position.x, targetX, 0.1);
    g.scale.x = lerp(g.scale.x, targetS, 0.13);
    g.scale.z = lerp(g.scale.z, targetS, 0.13);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(i);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <RoundedBox args={SLAB} radius={0.045} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial {...matProps(color)} />
        {selected && <Outlines thickness={0.03} color={AMBER} />}
      </RoundedBox>
      <Contents i={i} />
    </group>
  );
}

function Scene({
  open,
  selected,
  onSelect,
  n,
}: {
  open: boolean;
  selected: number;
  onSelect: (i: number) => void;
  n: number;
}) {
  const mid = (n - 1) / 2;
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      >
        <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 30]} />
      </directionalLight>
      <directionalLight position={[-6, 4, -5]} intensity={0.4} color="#fff4e0" />

      {/* Self-contained studio environment for clean PBR reflections (no network) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 6, -4]} scale={[12, 6, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[-6, 2, 2]} scale={[6, 8, 1]} color="#ffffff" />
        <Lightformer intensity={1.0} position={[6, 2, 3]} scale={[6, 8, 1]} color="#ffe9c7" />
        <Lightformer intensity={0.8} position={[0, -3, 4]} scale={[10, 4, 1]} color="#ffffff" />
      </Environment>

      <group position={[0, 0.2, 0]}>
        {Array.from({ length: n }).map((_, i) => (
          <Layer key={i} i={i} mid={mid} open={open} selected={selected === i} onSelect={onSelect} />
        ))}
      </group>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.42}
        blur={2.5}
        scale={14}
        far={5}
        resolution={1024}
        color={INK}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.65}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

export default function EpcPanel3D({
  open,
  selected,
  onSelect,
  count = MAX,
}: {
  open: boolean;
  selected: number;
  onSelect: (i: number) => void;
  count?: number;
}) {
  const n = Math.max(1, Math.min(count, MAX));
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      camera={{ position: [4.8, 3.5, 6.5], fov: 36 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene open={open} selected={selected} onSelect={onSelect} n={n} />
      </Suspense>
    </Canvas>
  );
}
