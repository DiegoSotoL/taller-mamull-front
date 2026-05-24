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

/** Repisas / biblioteca: caja abierta con paneles y estantes intermedios */
function RepisasModel({ W, H, D, shelves, finish }) {
  const T = 0.18;
  const innerH = H - T * 2;
  const shelfSpacing = innerH / (shelves + 1);
  const shelfPositions = Array.from({ length: shelves }, (_, i) =>
    -H / 2 + T + shelfSpacing * (i + 1)
  );

  return (
    <group>
      {/* Panel izquierdo */}
      <Board position={[-W / 2 + T / 2, 0, 0]} size={[T, H, D]} finish={finish} />
      {/* Panel derecho */}
      <Board position={[W / 2 - T / 2, 0, 0]} size={[T, H, D]} finish={finish} />
      {/* Tapa superior */}
      <Board position={[0, H / 2 - T / 2, 0]} size={[W, T, D]} finish={finish} />
      {/* Base */}
      <Board position={[0, -H / 2 + T / 2, 0]} size={[W, T, D]} finish={finish} />
      {/* Panel trasero */}
      <Board position={[0, 0, -D / 2 + 0.08]} size={[W - T * 2, H, 0.08]} finish={finish} opacity={0.7} />
      {/* Estantes intermedios */}
      {shelfPositions.map((y, i) => (
        <Board key={i} position={[0, y, 0]} size={[W - T * 2, T, D - 0.05]} finish={finish} />
      ))}
      {/* Shadow */}
      <mesh position={[0, -H / 2 - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W + 1, D + 1]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
}

/**
 * Mueble bajo lavaplatos — basado en plano técnico:
 *   Izquierda 60%: 2 puertas iguales (con barras de manilla verticales)
 *   Derecha 40%:   1 cajón arriba (30%) + 1 puerta abajo (70%)
 *   4 patas cuadradas de madera maciza (~8 cm)
 *   Encimera con fregadero hundido en la zona derecha
 */
function LavapLatosModel({ W, H, D, finish }) {
  const T = 0.18;
  const legH   = 0.80;   // 8 cm — fijo
  const legSide = 0.07;
  const legInset = 0.09;

  const legCY  = -H / 2 + legH / 2;
  const bodyCY = legH / 2;            // = -H/2 + legH + bodyH/2
  const bodyH  = H - legH;
  const innerH = bodyH - T * 2;

  // Sección izquierda 60% — sección derecha 40%
  const leftW  = W * 0.60;
  const rightW = W - leftW - T;       // descontamos divisor
  const divCX  = -W / 2 + leftW + T / 2;
  const rightCX = divCX + T / 2 + rightW / 2;

  // 2 puertas izq separadas por tira central
  const leftInnerX = -W / 2 + T;
  const leftInnerW = leftW - T;
  const cStripW = T;
  const doorLW  = (leftInnerW - cStripW) / 2;
  const door1CX = leftInnerX + doorLW / 2;
  const door2CX = door1CX + doorLW + cStripW;
  const cStripCX = door1CX + doorLW / 2 + cStripW / 2;

  // Centro de la sección izquierda (para el fregadero)
  const leftSectionCX = -W / 2 + leftW / 2;
  // ~90% del área izq × ~88% de la profundidad (referencia: lavaplatos 48×48 cm)
  const sinkSide = Math.min(leftW * 0.90, D * 0.86);

  // Sección derecha: cajón 30% + puerta 70%
  const drawerH     = innerH * 0.30;
  const botDoorH    = innerH - drawerH - T;
  const drawerCY    = bodyCY + innerH / 2 - drawerH / 2;
  const hDivY       = bodyCY + innerH / 2 - drawerH - T / 2;
  const botDoorCY   = bodyCY - innerH / 2 + botDoorH / 2;

  const legPositions = [
    [-W / 2 + legInset, legCY, -D / 2 + legInset],
    [ W / 2 - legInset, legCY, -D / 2 + legInset],
    [-W / 2 + legInset, legCY,  D / 2 - legInset],
    [ W / 2 - legInset, legCY,  D / 2 - legInset],
  ];

  return (
    <group>
      {/* PATAS */}
      {legPositions.map((pos, i) => (
        <Board key={`l${i}`} position={pos} size={[legSide, legH, legSide]} finish={finish} />
      ))}

      {/* CUERPO: paneles estructurales */}
      <Board position={[-W / 2 + T / 2, bodyCY, 0]} size={[T, bodyH, D]} finish={finish} />
      <Board position={[ W / 2 - T / 2, bodyCY, 0]} size={[T, bodyH, D]} finish={finish} />
      <Board position={[0, H / 2 - T / 2, 0]} size={[W + 0.03, T, D + 0.03]} finish={finish} />
      <Board position={[0, -H / 2 + legH + T / 2, 0]} size={[W - T * 2, T, D - 0.04]} finish={finish} />
      <Board position={[0, bodyCY, -D / 2 + 0.06]} size={[W - T * 2, bodyH - T, 0.06]} finish={finish} opacity={0.75} />

      {/* DIVISOR VERTICAL izq/der */}
      <Board position={[divCX, bodyCY, D / 2 - 0.03]} size={[T, bodyH - T, 0.03]} finish={finish} />
      {/* TIRA CENTRAL entre las 2 puertas izq */}
      <Board position={[cStripCX, bodyCY, D / 2 - 0.025]} size={[cStripW, innerH, 0.025]} finish={finish} />

      {/* PUERTA IZQ 1 */}
      <Board position={[door1CX, bodyCY, D / 2 - 0.04]} size={[doorLW - 0.02, innerH - 0.02, 0.05]} finish={finish} />
      {/* Manilla barra vertical (lado interior de puerta 1) */}
      <Board position={[door1CX + doorLW / 2 - 0.10, bodyCY, D / 2 + 0.01]} size={[0.025, 0.22, 0.04]} finish="black" opacity={0.82} />

      {/* PUERTA IZQ 2 */}
      <Board position={[door2CX, bodyCY, D / 2 - 0.04]} size={[doorLW - 0.02, innerH - 0.02, 0.05]} finish={finish} />
      {/* Manilla barra vertical (lado interior de puerta 2) */}
      <Board position={[door2CX - doorLW / 2 + 0.10, bodyCY, D / 2 + 0.01]} size={[0.025, 0.22, 0.04]} finish="black" opacity={0.82} />

      {/* DIVISOR HORIZONTAL der (entre cajón y puerta) */}
      <Board position={[rightCX, hDivY, D / 2 - 0.04]} size={[rightW - 0.02, T, 0.04]} finish={finish} />

      {/* CAJÓN der (arriba) */}
      <Board position={[rightCX, drawerCY, D / 2 - 0.04]} size={[rightW - 0.03, drawerH - 0.03, 0.05]} finish={finish} />
      {/* Tirador horizontal del cajón */}
      <Board position={[rightCX, drawerCY, D / 2 + 0.01]} size={[rightW * 0.38, 0.04, 0.04]} finish="black" opacity={0.82} />

      {/* PUERTA der (abajo) */}
      <Board position={[rightCX, botDoorCY, D / 2 - 0.04]} size={[rightW - 0.03, botDoorH - 0.03, 0.05]} finish={finish} />
      {/* Tirador pequeño (botón circular simulado) */}
      <Board position={[rightCX, botDoorCY + botDoorH * 0.28, D / 2 + 0.01]} size={[0.07, 0.07, 0.04]} finish="black" opacity={0.82} />

      {/* FREGADERO en encimera — cuadrado sobre sección izquierda */}
      <Board position={[leftSectionCX, H / 2 + 0.012, 0]} size={[sinkSide, 0.025, sinkSide]} finish="black" opacity={0.55} />

      {/* Shadow */}
      <mesh position={[0, -H / 2 - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W + 1, D + 1]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
}

/** Set infantil: mesa + sillas (1-4) en madera de pino */
function SetInfantilModel({ W, H, D, shelves, finish }) {
  const T = 0.16;         // grosor de tablas (16 cm → 1.6 u)
  const legSide = 0.07;   // sección de pata
  const chairCount = Math.max(1, Math.min(shelves, 4));

  // Mesa: tabletop + 4 patas
  const tableTopY = H / 2;
  const legH = H - T;
  const legY = H / 2 - T / 2 - legH / 2;
  const legInset = 0.12; // separación pata del borde

  const corners = [
    [ W / 2 - legInset, legY, D / 2 - legInset],
    [-W / 2 + legInset, legY, D / 2 - legInset],
    [ W / 2 - legInset, legY, -D / 2 + legInset],
    [-W / 2 + legInset, legY, -D / 2 + legInset],
  ];

  // Sillas: tamaño fijo (30 × 28 cm) independiente de la mesa
  const cW = 3.0;    // 30 cm ancho
  const cD = 2.8;    // 28 cm fondo
  const cSeatH = Math.min(H * 0.68, 3.2);  // máximo 32 cm de altura al asiento
  const cBackH = 2.8;  // 28 cm de respaldo
  const cLegH = cSeatH - T;
  const gap = 0.20;  // espacio entre silla y mesa

  // Posiciones de las 4 sillas — respaldo siempre alejado de la mesa
  // El respaldo está en local -Z, así que: frente→ry:π, atrás→ry:0, izq→ry:π/2, der→ry:-π/2
  const chairDefs = [
    { pos: [0, 0,  D / 2 + cD / 2 + gap], ry: Math.PI },            // frente
    { pos: [-W / 2 - cD / 2 - gap, 0, 0], ry: Math.PI / 2 },       // izquierda
    { pos: [ W / 2 + cD / 2 + gap, 0, 0], ry: -Math.PI / 2 },      // derecha
    { pos: [0, 0, -D / 2 - cD / 2 - gap], ry: 0 },                  // atrás
  ];

  const visibleChairs = chairDefs.slice(0, chairCount);

  function Chair({ position, rotation }) {
    const seatY = cSeatH - H / 2;    // y del asiento relativo al grupo (origen = base)
    const legY2 = seatY - T / 2 - cLegH / 2;
    const backY = seatY + T / 2 + cBackH / 2;
    const cLegInset = 0.06;

    return (
      <group position={position} rotation={rotation}>
        {/* Asiento */}
        <Board position={[0, seatY, 0]} size={[cW, T, cD]} finish={finish} />
        {/* 4 patas */}
        <Board position={[ cW/2-cLegInset, legY2, cD/2-cLegInset]} size={[0.04, cLegH, 0.04]} finish={finish} opacity={0.85} />
        <Board position={[-cW/2+cLegInset, legY2, cD/2-cLegInset]} size={[0.04, cLegH, 0.04]} finish={finish} opacity={0.85} />
        <Board position={[ cW/2-cLegInset, legY2,-cD/2+cLegInset]} size={[0.04, cLegH, 0.04]} finish={finish} opacity={0.85} />
        <Board position={[-cW/2+cLegInset, legY2,-cD/2+cLegInset]} size={[0.04, cLegH, 0.04]} finish={finish} opacity={0.85} />
        {/* Respaldo */}
        <Board position={[0, backY, -cD/2+T/2]} size={[cW, cBackH, T*0.6]} finish={finish} opacity={0.75} />
      </group>
    );
  }

  return (
    <group position={[0, -H / 2, 0]}>
      {/* MESA */}
      {/* Tabletop */}
      <Board position={[0, tableTopY, 0]} size={[W, T, D]} finish={finish} />
      {/* 4 patas */}
      {corners.map((pos, i) => (
        <Board key={i} position={pos} size={[legSide, legH, legSide]} finish={finish} opacity={0.85} />
      ))}

      {/* SILLAS */}
      {visibleChairs.map((ch, i) => (
        <Chair key={i} position={ch.pos} rotation={[0, ch.ry, 0]} />
      ))}

      {/* Shadow */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W + 1.2, D + 1.2]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
}

/**
 * Parametric furniture model — adapts geometry based on furnitureType.
 * All dimensions in cm internally; Three.js units = 1 unit per 10 cm.
 */
export default function ShelfModel({ config }) {
  const {
    width = 90,
    height = 180,
    depth = 30,
    shelves = 4,
    finish = 'natural',
    furnitureType = 'repisas',
  } = config;

  const groupRef = useRef();

  const W = width / 10;
  const H = height / 10;
  const D = depth / 10;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {furnitureType === 'repisas' && (
        <RepisasModel W={W} H={H} D={D} shelves={shelves} finish={finish} />
      )}
      {furnitureType === 'lavaplatos' && (
        <LavapLatosModel W={W} H={H} D={D} finish={finish} />
      )}
      {furnitureType === 'infantil' && (
        <SetInfantilModel W={W} H={H} D={D} shelves={shelves} finish={finish} />
      )}
    </group>
  );
}
