// ── Price calculator (hidden from client) ──────────────────────────────────
// All prices in Chilean Pesos (CLP)

const BOARD_PRICE_PER_SQM = {
  natural: 28000, // madera natural
  pine: 22000,    // pino claro
  white: 24000,   // melamina blanca
  black: 26000,   // melamina negra
};

const LABOR_BASE = 35000;         // mano de obra fija por mueble
const LABOR_PER_SHELF = 8000;     // costo adicional por estante
const HARDWARE_COST = 12000;      // herrajes y tornillería
const VAT_RATE = 0.19;            // IVA 19% (Chile)

/**
 * Calculates total board surface area in m²
 * for a bookshelf given its dimensions (in cm) and shelf count.
 */
function calcBoardSurface({ width, height, depth, shelves }) {
  const w = width / 100;   // convert cm → m
  const h = height / 100;
  const d = depth / 100;

  const leftPanel  = h * d;           // lateral izquierdo
  const rightPanel = h * d;           // lateral derecho
  const topPanel   = w * d;           // techo
  const bottomPanel = w * d;          // base
  const backPanel  = w * h * 0.5;     // fondo (panel más delgado, 50% cost)
  const shelfPanels = shelves * (w * d); // estantes intermedios

  return leftPanel + rightPanel + topPanel + bottomPanel + backPanel + shelfPanels;
}

/**
 * Returns a full price breakdown (hidden from client).
 * @param {{ width: number, height: number, depth: number, shelves: number, finish: string }} config
 * @returns {{ materials: number, labor: number, hardware: number, subtotal: number, vat: number, total: number, surface: number }}
 */
export function calculatePrice(config) {
  const { shelves = 4, finish = 'natural' } = config;
  const pricePerSqm = BOARD_PRICE_PER_SQM[finish] ?? BOARD_PRICE_PER_SQM.natural;

  const surface   = calcBoardSurface(config);
  const materials = Math.round(surface * pricePerSqm);
  const labor     = LABOR_BASE + shelves * LABOR_PER_SHELF;
  const hardware  = HARDWARE_COST;
  const subtotal  = materials + labor + hardware;
  const vat       = Math.round(subtotal * VAT_RATE);
  const total     = subtotal + vat;

  return { materials, labor, hardware, subtotal, vat, total, surface: +surface.toFixed(2) };
}

/**
 * Formats a CLP number as currency string.
 */
export function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds the detailed breakdown text for the owner's email.
 */
export function buildBudgetEmail({ clientName, clientPhone, clientEmail, message, config, price }) {
  const { width, height, depth, shelves, finish } = config;
  const finishLabels = { natural: 'Madera Natural', pine: 'Pino Claro', white: 'Blanco', black: 'Negro Mate' };

  return `
NUEVO PRESUPUESTO — Taller Mamüll
=====================================

DATOS DEL CLIENTE
-----------------
Nombre: ${clientName}
Teléfono: ${clientPhone}
Correo: ${clientEmail}
Mensaje: ${message || '(sin mensaje adicional)'}

MUEBLE CONFIGURADO: Biblioteca / Estantería
-------------------------------------------
Ancho:        ${width} cm
Alto:         ${height} cm
Profundidad:  ${depth} cm
Estantes:     ${shelves}
Terminación:  ${finishLabels[finish] || finish}
Superficie aprox.: ${price.surface} m²

DESGLOSE DE COSTOS
-------------------
Materiales:   ${formatCLP(price.materials)}
Mano de obra: ${formatCLP(price.labor)}
Herrajes:     ${formatCLP(price.hardware)}
Subtotal:     ${formatCLP(price.subtotal)}
IVA (19%):    ${formatCLP(price.vat)}
──────────────────────────
TOTAL:        ${formatCLP(price.total)}

Fecha: ${new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })}
=====================================
`;
}
