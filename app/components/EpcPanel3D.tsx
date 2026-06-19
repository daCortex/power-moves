"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Edges, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

/* Brand palette (matches globals.css tokens) */
const INK = "#15161a";
const RED = "#d81e26";
const LIGHT = "#d8d5cc";
const STEEL = "#6c7178";
const AMBER = "#f4a400";
const COPPER = "#b8742f";

const TONE = [RED, INK, LIGHT, INK, LIGHT, INK];
const N = 6;
const MID = (N - 1) / 2;
const SLAB: [number, number, number] = [3, 0.2, 2]; // w, h, d
const CLOSED_GAP = 0.24;
const OPEN_GAP = 0.95;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* Per-layer "contents" sitting on top of each slab, so the layers read as
   distinct pieces of equipment rather than blank trays. */
function Contents({ i }: { i: number }) {
  const y = SLAB[1] / 2; // top face of the slab
  const onLight = i === 2 || i === 4;
  const accent = onLight ? INK : AMBER;

  if (i === 0) {
    // Control fascia — display panel + indicator lamps
    return (
      <group position={[0, y, 0]}>
        <mesh position={[-0.5, 0.06, 0]}>
          <boxGeometry args={[1.3, 0.08, 0.9]} />
          <meshStandardMaterial color={INK} metalness={0.3} roughness={0.6} />
        </mesh>
        {[0.55, 0.85, 1.15].map((x, k) => (
          <mesh key={k} position={[x, 0.08, -0.45]}>
            <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
            <meshStandardMaterial
              color={k === 0 ? RED : k === 1 ? AMBER : "#3fae5a"}
              emissive={k === 0 ? RED : k === 1 ? AMBER : "#3fae5a"}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 1) {
    // Metering & protection — round dials
    return (
      <group position={[0, y, 0]}>
        {[-0.9, -0.3, 0.3, 0.9].map((x, k) => (
          <mesh key={k} position={[x, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.1, 24]} />
            <meshStandardMaterial color={LIGHT} metalness={0.2} roughness={0.7} />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 2) {
    // Breaker array — row of breaker blocks
    return (
      <group position={[0, y, 0]}>
        {[-1.05, -0.63, -0.21, 0.21, 0.63, 1.05].map((x, k) => (
          <mesh key={k} position={[x, 0.12, 0]}>
            <boxGeometry args={[0.3, 0.24, 0.7]} />
            <meshStandardMaterial color={INK} metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 3) {
    // Busbars — copper bars running across
    return (
      <group position={[0, y + 0.08, 0]}>
        {[-0.5, 0, 0.5].map((z, k) => (
          <mesh key={k} position={[0, 0, z]}>
            <boxGeometry args={[2.6, 0.1, 0.16]} />
            <meshStandardMaterial color={COPPER} metalness={0.85} roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
  }
  if (i === 4) {
    // Transformer — two coil cylinders
    return (
      <group position={[0, y + 0.28, 0]}>
        {[-0.55, 0.55].map((x, k) => (
          <mesh key={k} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.62, 28]} />
            <meshStandardMaterial color={STEEL} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
    );
  }
  // Enclosure — corner posts (the frame everything sits in)
  return (
    <group position={[0, y + 0.25, 0]}>
      {[
        [-1.4, -0.9],
        [1.4, -0.9],
        [-1.4, 0.9],
        [1.4, 0.9],
      ].map(([x, z], k) => (
        <mesh key={k} position={[x, 0, z]}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
          <meshStandardMaterial color={accent} metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Layer({
  i,
  open,
  selected,
  onSelect,
}: {
  i: number;
  open: boolean;
  selected: boolean;
  onSelect: (i: number) => void;
}) {
  const ref = useRef<Group>(null);
  const color = TONE[i];

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const targetY = (MID - i) * (open ? OPEN_GAP : CLOSED_GAP);
    const targetX = open && selected ? 0.7 : 0;
    const targetS = selected ? 1.05 : 1;
    g.position.y = lerp(g.position.y, targetY, 0.12);
    g.position.x = lerp(g.position.x, targetX, 0.12);
    g.scale.x = lerp(g.scale.x, targetS, 0.15);
    g.scale.z = lerp(g.scale.z, targetS, 0.15);
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
      <RoundedBox args={SLAB} radius={0.03} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.45}
          emissive={AMBER}
          emissiveIntensity={selected ? 0.22 : 0}
        />
        <Edges threshold={15} color={color === LIGHT ? "#b5b2a9" : "#000000"} />
      </RoundedBox>
      <Contents i={i} />
    </group>
  );
}

export default function EpcPanel3D({
  open,
  selected,
  onSelect,
}: {
  open: boolean;
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4.6, 3.4, 6.3], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 9, 5]} intensity={1.15} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 3, -4]} intensity={0.35} />

      <group position={[0, 0.2, 0]}>
        {Array.from({ length: N }).map((_, i) => (
          <Layer key={i} i={i} open={open} selected={selected === i} onSelect={onSelect} />
        ))}
      </group>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.32} blur={2.6} scale={12} far={4.5} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
