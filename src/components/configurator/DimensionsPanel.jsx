import { finishOptions } from '../../data/catalog.js';

const FURNITURE_TYPES = [
  {
    id: 'repisas',
    label: 'Repisas Flotantes',
    icon: '▤',
    title: 'Personalizar repisas flotantes',
    desc: 'Ajustá las medidas y terminación. El modelo 3D se actualiza en tiempo real.',
    defaults: { width: 120, height: 150, depth: 25, shelves: 3 },
    dimensions: [
      { key: 'width',   label: 'Ancho',       unit: 'cm', min: 40,  max: 200, step: 5 },
      { key: 'height',  label: 'Alto total',   unit: 'cm', min: 60,  max: 220, step: 5 },
      { key: 'depth',   label: 'Profundidad',  unit: 'cm', min: 15,  max: 40,  step: 5 },
      { key: 'shelves', label: 'Repisas',      unit: '',   min: 1,   max: 8,   step: 1 },
    ],
    summary: (c, finish) =>
      `${c.width} cm ancho · ${c.shelves} repisa${c.shelves !== 1 ? 's' : ''} · Prof. ${c.depth} cm · ${finish}`,
  },
  {
    id: 'lavaplatos',
    label: 'Mueble Lavaplatos',
    icon: '⬜',
    title: 'Personalizar mueble bajo lavaplatos',
    desc: 'Configurá el ancho, alto y profundidad según tu cocina. El mueble incluye puertas y estante interior.',
    defaults: { width: 80, height: 85, depth: 50, shelves: 1 },
    dimensions: [
      { key: 'width',   label: 'Ancho',        unit: 'cm', min: 60,  max: 200, step: 5 },
      { key: 'height',  label: 'Alto',          unit: 'cm', min: 70,  max: 95,  step: 5 },
      { key: 'depth',   label: 'Profundidad',   unit: 'cm', min: 45,  max: 65,  step: 5 },
    ],
    summary: (c, finish) =>
      `${c.width} × ${c.height} × ${c.depth} cm · ${finish}`,
  },
  {
    id: 'infantil',
    label: 'Set Mesa y Sillas',
    icon: '🪑',
    title: 'Personalizar set infantil de mesa y sillas',
    desc: 'Ajustá el ancho y fondo de la mesa, la altura y la cantidad de sillas. Todo en pino macizo.',
    defaults: { width: 80, height: 55, depth: 80, shelves: 4 },
    dimensions: [
      { key: 'width',   label: 'Ancho mesa',  unit: 'cm', min: 50, max: 120, step: 5 },
      { key: 'height',  label: 'Alto mesa',   unit: 'cm', min: 40, max: 65,  step: 5 },
      { key: 'depth',   label: 'Fondo mesa',  unit: 'cm', min: 50, max: 120, step: 5 },
      { key: 'shelves', label: 'Sillas',       unit: '',   min: 1,  max: 4,   step: 1 },
    ],
    summary: (c, finish) =>
      `Mesa ${c.width}×${c.depth} cm · Alto ${c.height} cm · ${c.shelves} silla${c.shelves !== 1 ? 's' : ''} · ${finish}`,
  },
];

function Slider({ label, unit, min, max, step, value, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3a280f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => {
              const v = Math.min(max, Math.max(min, Number(e.target.value)));
              onChange(v);
            }}
            style={{
              width: 56,
              padding: '0.25rem 0.4rem',
              border: '1px solid #e8d4b8',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1e1408',
              textAlign: 'right',
              outline: 'none',
              backgroundColor: '#fff',
            }}
          />
          {unit && <span style={{ fontSize: '0.75rem', color: '#8c7356' }}>{unit}</span>}
        </div>
      </div>
      <div style={{ position: 'relative', height: 6, backgroundColor: '#e8d4b8', borderRadius: 9999 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, backgroundColor: '#c08a3a', borderRadius: 9999, transition: 'width 0.1s' }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'translateY(-50%)',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
          }}
        />
        {/* Thumb indicator */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `${pct}%`,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#c08a3a',
          border: '2px solid #fff',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
          transition: 'left 0.1s',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '0.65rem', color: '#c2b49e' }}>{min}{unit}</span>
        <span style={{ fontSize: '0.65rem', color: '#c2b49e' }}>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function DimensionsPanel({ config, onChange, onRequestQuote }) {
  const update = (key, value) => onChange({ ...config, [key]: value });

  const currentType = FURNITURE_TYPES.find(t => t.id === config.furnitureType) || FURNITURE_TYPES[0];
  const currentFinishLabel = finishOptions.find(f => f.id === config.finish)?.label || '';

  const handleTypeChange = (typeId) => {
    const type = FURNITURE_TYPES.find(t => t.id === typeId);
    onChange({ ...type.defaults, finish: config.finish, furnitureType: typeId });
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: '1.5rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      border: '1px solid #e8d4b8',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}
    className="scrollbar-thin config-panel"
    >
      {/* Selector de tipo de mueble */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c08a3a', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
          Tipo de mueble
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {FURNITURE_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.5rem 0.85rem',
                borderRadius: 10,
                border: config.furnitureType === type.id ? '2px solid #c08a3a' : '2px solid #e8d4b8',
                backgroundColor: config.furnitureType === type.id ? '#fdf4e7' : '#fff',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: config.furnitureType === type.id ? 700 : 500,
                color: '#3a280f',
                transition: 'all 0.18s',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{type.icon}</span>
              {type.label}
              {config.furnitureType === type.id && (
                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#c08a3a', fontWeight: 700 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #f0e4d0', margin: '0.25rem 0 1.25rem' }} />

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', color: '#1e1408', margin: '0 0 0.25rem' }}>
          {currentType.title}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#8c7356', margin: 0, lineHeight: 1.5 }}>
          {currentType.desc}
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #f0e4d0', margin: '0.25rem 0 1.25rem' }} />

      {/* Sliders de dimensión según tipo */}
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c08a3a', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
          Dimensiones
        </p>
        {currentType.dimensions.map(d => (
          <Slider
            key={d.key}
            label={d.label}
            unit={d.unit}
            min={d.min}
            max={d.max}
            step={d.step}
            value={config[d.key] ?? d.min}
            onChange={v => update(d.key, v)}
          />
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #f0e4d0', margin: '0.5rem 0 1.25rem' }} />

      {/* Finish selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c08a3a', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>
          Terminación
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {finishOptions.map(opt => (
            <button
              key={opt.id}
              title={opt.label}
              onClick={() => update('finish', opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 9999,
                border: config.finish === opt.id ? '2px solid #c08a3a' : '2px solid #e8d4b8',
                backgroundColor: config.finish === opt.id ? '#fdf4e7' : '#fff',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: config.finish === opt.id ? 700 : 400,
                color: '#3a280f',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                width: 14, height: 14, borderRadius: '50%',
                backgroundColor: opt.hex,
                border: '1px solid rgba(0,0,0,0.15)',
                flexShrink: 0,
              }} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{
        backgroundColor: '#fdf8f0',
        border: '1px solid #e8d4b8',
        borderRadius: 10,
        padding: '0.875rem',
        marginBottom: '0.75rem',
        fontSize: '0.8rem',
        color: '#5a3f17',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: '#1e1408' }}>Tu configuración:</strong><br />
        {currentType.summary(config, currentFinishLabel)}
      </div>

      {/* CTA */}
      <button
        onClick={onRequestQuote}
        style={{
          width: '100%',
          padding: '0.9rem 1.5rem',
          backgroundColor: '#c08a3a',
          color: '#fff',
          border: 'none',
          borderRadius: 9999,
          fontSize: '0.95rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '0.02em',
          boxShadow: '0 4px 16px rgba(192,138,58,0.3)',
          marginTop: '0.25rem',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#a0722a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#c08a3a'; e.currentTarget.style.transform = 'none'; }}
      >
        Solicitar presupuesto →
      </button>

      <p style={{ fontSize: '0.72rem', color: '#c2b49e', textAlign: 'center', margin: '0.75rem 0 0', lineHeight: 1.5 }}>
        Te contactamos por WhatsApp y correo dentro de 24 horas.
      </p>
    </div>
  );
}
