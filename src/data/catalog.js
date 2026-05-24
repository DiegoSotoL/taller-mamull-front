export const catalogItems = [
  {
    id: 1,
    name: 'Mueble Bajo Lavaplatos a Medida',
    description: 'Mueble de cocina a medida con espacio para lavaplatos empotrado, cajones y puertas. Madera maciza con terminación al agua. Ideal para cocinas modernas y coloniales.',
    category: 'Cocina',
    priceFrom: 95000,
    dimensions: { width: 80, height: 85, depth: 50, shelves: 1 },
    finish: 'natural',
    tag: 'Más vendido',
    image: '/mueble-lavaplato.jpg',
  },
  {
    id: 2,
    name: 'Set Mesa y Sillas Infantil',
    description: 'Mesa con sillas a juego para niños en madera de pino macizo. Medidas adaptadas para niños de 2 a 8 años. Ideal para comer, jugar y estudiar.',
    category: 'Infantil',
    priceFrom: 120000,
    dimensions: { width: 80, height: 55, depth: 80, shelves: 4 },
    finish: 'pine',
    tag: 'Infantil',
    image: '/set-nino.jpeg',
  },
  {
    id: 3,
    name: 'Repisas Flotantes de Madera',
    description: 'Repisas de pared en madera maciza con soportes ocultos. Sin tornillos visibles. Personalizá el largo, profundidad y terminación para cada rincón.',
    category: 'Estanterías',
    priceFrom: 35000,
    dimensions: { width: 120, height: 20, depth: 25, shelves: 3 },
    finish: 'natural',
    tag: 'Nuevo',
    image: '/repisa.jpeg',
  },
];

export const finishOptions = [
  { id: 'natural', label: 'Madera Natural', color: '#c08a3a', hex: '#d4a96a' },
  { id: 'pine', label: 'Pino Claro', color: '#d4b896', hex: '#e8d4b8' },
  { id: 'white', label: 'Blanco', color: '#f5f5f0', hex: '#ffffff' },
  { id: 'black', label: 'Negro Mate', color: '#2a2a2a', hex: '#3d3d3d' },
];
