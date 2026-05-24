import { useRef } from 'react';

const FINISH_COLORS = {
  natural: { main: '#c08a3a', light: '#d4a96a', dark: '#8a5c1a', grain: true },
  pine:    { main: '#d4b896', light: '#e8d4b8', dark: '#a89278', grain: true },
  white:   { main: '#f0f0ec', light: '#ffffff', dark: '#c8c8c4', grain: false },
  black:   { main: '#2a2a2a', light: '#3d3d3d', dark: '#1a1a1a', grain: false },
};

function Board({ position, size, finish, opacity = 1 }) {
  const colors = FINISH_COLORS[finish] || FINISH_COLORS.natural;
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={colors.main}
        roughness={0.75}
        metalness={0.02}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

/**
 * Parametric bookshelf model.
 * All dimensions are in cm internally; Three.js units = 1 unit per 10 cm.
 */
export default function ShelfModel({ config }) {
  const { width = 90, height = 180, depth = 30, shelves = 4, finish = 'natural' } = config;
  const groupRef = useRef();

  const W = width / 10;
  const H = height / 10;
  const D = depth / 10;
  const T = 0.18; // board thickness (18mm)

  // Position shelves evenly between top and bottom boards
  const innerH = H - T * 2;
  const shelfSpacing = innerH / (shelves + 1);

  const shelfPositions = Array.from({ length: shelves }, (_, i) => {
    const y = -H / 2 + T + shelfSpacing * (i + 1);
    return y;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Left panel */}
      <Board position={[-W / 2 + T / 2, 0, 0]} size={[T, H, D]} finish={finish} />
      {/* Right panel */}
      <Board position={[W / 2 - T / 2, 0, 0]} size={[T, H, D]} finish={finish} />
      {/* Top panel */}
      <Board position={[0, H / 2 - T / 2, 0]} size={[W, T, D]} finish={finish} />
      {/* Bottom panel */}
      <Board position={[0, -H / 2 + T / 2, 0]} size={[W, T, D]} finish={finish} />
      {/* Back panel (thinner) */}
      <Board position={[0, 0, -D / 2 + 0.08]} size={[W - T * 2, H, 0.08]} finish={finish} opacity={0.7} />

      {/* Intermediate shelves */}
      {shelfPositions.map((y, i) => (
        <Board
          key={i}
          position={[0, y, 0]}
          size={[W - T * 2, T, D - 0.05]}
          finish={finish}
        />
      ))}

      {/* Ground shadow plane */}
      <mesh position={[0, -H / 2 - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W + 1, D + 1]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
}
