import { finishOptions } from '../../data/catalog.js';

const dimensions = [
  { key: 'width',   label: 'Ancho',       unit: 'cm', min: 40,  max: 200, step: 5  },
  { key: 'height',  label: 'Alto',        unit: 'cm', min: 60,  max: 240, step: 5  },
  { key: 'depth',   label: 'Profundidad', unit: 'cm', min: 20,  max: 60,  step: 5  },
  { key: 'shelves', label: 'Estantes',    unit: '',   min: 2,   max: 8,   step: 1  },
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
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#1e1408', margin: '0 0 0.25rem' }}>
          Personalizar biblioteca
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#8c7356', margin: 0, lineHeight: 1.5 }}>
          Ajustá las medidas y terminación. El modelo 3D se actualiza en tiempo real.
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #f0e4d0', margin: '0.5rem 0 1.25rem' }} />

      {/* Dimension sliders */}
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c08a3a', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
          Dimensiones
        </p>
        {dimensions.map(d => (
          <Slider
            key={d.key}
            label={d.label}
            unit={d.unit}
            min={d.min}
            max={d.max}
            step={d.step}
            value={config[d.key]}
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
        marginBottom: '1.25rem',
        fontSize: '0.8rem',
        color: '#5a3f17',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: '#1e1408' }}>Tu configuración:</strong><br />
        {config.width} × {config.height} × {config.depth} cm &nbsp;·&nbsp; {config.shelves} estantes<br />
        Terminación: {finishOptions.find(f => f.id === config.finish)?.label}
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
          marginTop: 'auto',
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
