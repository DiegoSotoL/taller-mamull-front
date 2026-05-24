import { catalogItems, finishOptions } from '../../data/catalog.js';

const finishColors = {
  natural: '#d4a96a',
  pine: '#e8d4b8',
  white: '#f5f5f0',
  black: '#2a2a2a',
};

const tagColors = {
  'Más vendido': { bg: '#fef3c7', text: '#92400e' },
  'Nuevo': { bg: '#d1fae5', text: '#065f46' },
  'Infantil': { bg: '#dbeafe', text: '#1e40af' },
};

function FurnitureIllustration({ finish, category }) {
  const color = finishColors[finish] || finishColors.natural;
  const dark = finish === 'white' ? '#d0d0cc' : '#a0722a';

  const illustrations = {
    'Estanterías': (
      <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Vertical panels */}
        <rect x="8" y="4" width="8" height="122" rx="2" fill={color} />
        <rect x="104" y="4" width="8" height="122" rx="2" fill={color} />
        {/* Top & bottom */}
        <rect x="8" y="4" width="104" height="8" rx="2" fill={dark} />
        <rect x="8" y="118" width="104" height="8" rx="2" fill={dark} />
        {/* Shelves */}
        <rect x="8" y="48" width="104" height="7" rx="1" fill={dark} />
        <rect x="8" y="84" width="104" height="7" rx="1" fill={dark} />
        {/* Books */}
        <rect x="20" y="14" width="18" height="32" rx="2" fill={dark} opacity="0.4" />
        <rect x="42" y="18" width="14" height="28" rx="2" fill={dark} opacity="0.3" />
        <rect x="60" y="20" width="22" height="26" rx="2" fill={dark} opacity="0.35" />
        <rect x="20" y="58" width="24" height="24" rx="2" fill={dark} opacity="0.3" />
        <rect x="50" y="56" width="16" height="26" rx="2" fill={dark} opacity="0.4" />
      </svg>
    ),
    'Cocina': (
      <svg viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Counter top */}
        <rect x="6" y="36" width="118" height="10" rx="2" fill={dark} />
        {/* Cabinet body */}
        <rect x="6" y="46" width="118" height="58" rx="2" fill={color} />
        {/* Left door */}
        <rect x="10" y="50" width="52" height="50" rx="2" fill={dark} opacity="0.15" stroke={dark} strokeWidth="1.5" />
        {/* Right door */}
        <rect x="68" y="50" width="52" height="50" rx="2" fill={dark} opacity="0.15" stroke={dark} strokeWidth="1.5" />
        {/* Door handles */}
        <rect x="57" y="72" width="5" height="14" rx="2.5" fill={dark} opacity="0.6" />
        <rect x="68" y="72" width="5" height="14" rx="2.5" fill={dark} opacity="0.6" />
        {/* Sink basin */}
        <rect x="28" y="8" width="74" height="30" rx="4" fill={dark} opacity="0.25" />
        <rect x="34" y="12" width="62" height="22" rx="3" fill={dark} opacity="0.2" />
        {/* Faucet */}
        <rect x="60" y="4" width="5" height="12" rx="2" fill={dark} opacity="0.5" />
        <rect x="52" y="2" width="21" height="5" rx="2" fill={dark} opacity="0.45" />
        {/* Plinth */}
        <rect x="12" y="100" width="106" height="6" rx="1" fill={dark} opacity="0.4" />
      </svg>
    ),
    'Infantil': (
      <svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Tabletop */}
        <rect x="20" y="50" width="100" height="10" rx="3" fill={color} />
        {/* Table legs */}
        <rect x="26" y="60" width="7" height="38" rx="2" fill={dark} opacity="0.6" />
        <rect x="107" y="60" width="7" height="38" rx="2" fill={dark} opacity="0.6" />
        <rect x="50" y="60" width="6" height="38" rx="2" fill={dark} opacity="0.45" />
        <rect x="84" y="60" width="6" height="38" rx="2" fill={dark} opacity="0.45" />
        {/* Chair front-left: seat */}
        <rect x="4" y="58" width="24" height="7" rx="2" fill={color} opacity="0.9" />
        {/* Chair front-left: legs */}
        <rect x="6" y="65" width="4" height="20" rx="1" fill={dark} opacity="0.5" />
        <rect x="20" y="65" width="4" height="20" rx="1" fill={dark} opacity="0.5" />
        {/* Chair front-left: backrest */}
        <rect x="4" y="42" width="24" height="17" rx="2" fill={dark} opacity="0.18" />
        {/* Chair front-right: seat */}
        <rect x="112" y="58" width="24" height="7" rx="2" fill={color} opacity="0.9" />
        {/* Chair front-right: legs */}
        <rect x="114" y="65" width="4" height="20" rx="1" fill={dark} opacity="0.5" />
        <rect x="128" y="65" width="4" height="20" rx="1" fill={dark} opacity="0.5" />
        {/* Chair front-right: backrest */}
        <rect x="112" y="42" width="24" height="17" rx="2" fill={dark} opacity="0.18" />
        {/* Chair back (perspective): seat */}
        <rect x="46" y="34" width="48" height="6" rx="2" fill={color} opacity="0.75" />
        {/* Chair back: legs */}
        <rect x="48" y="40" width="4" height="12" rx="1" fill={dark} opacity="0.4" />
        <rect x="88" y="40" width="4" height="12" rx="1" fill={dark} opacity="0.4" />
        {/* Chair back: backrest */}
        <rect x="46" y="22" width="48" height="13" rx="2" fill={dark} opacity="0.13" />
      </svg>
    ),
  };

  return illustrations[category] || illustrations['Estanterías'];
}

function CatalogCard({ item }) {
  const tag = item.tag && tagColors[item.tag];

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        border: '1px solid #e8d4b8',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(192,138,58,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
    >
      {/* Illustration */}
      <div style={{ height: 180, backgroundColor: '#fdf8f0', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', maxWidth: 160 }}>
          <FurnitureIllustration finish={item.finish} category={item.category} />
        </div>
        {tag && (
          <span style={{
            position: 'absolute', top: 12, right: 12,
            backgroundColor: tag.bg, color: tag.text,
            fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.65rem',
            borderRadius: '9999px', letterSpacing: '0.04em',
          }}>
            {item.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.7rem', color: '#c08a3a', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          {item.category}
        </span>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#1e1408', margin: '0 0 0.5rem', fontWeight: 700 }}>{item.name}</h3>
        <p style={{ fontSize: '0.84rem', color: '#6e5940', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{item.description}</p>

        {/* Dimensions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[
            `${item.dimensions.width}cm ancho`,
            `${item.dimensions.height}cm alto`,
            `${item.dimensions.depth}cm prof.`,
          ].map(d => (
            <span key={d} style={{ fontSize: '0.7rem', backgroundColor: '#f5e6cc', color: '#7d5920', padding: '0.2rem 0.6rem', borderRadius: 6 }}>{d}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#8c7356' }}>Desde</span>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: '#c08a3a' }}>
              ${item.priceFrom.toLocaleString('es-CL')}
            </div>
          </div>
          <a
            href="#configurador"
            style={{
              textDecoration: 'none', backgroundColor: '#1e1408', color: '#d4a96a',
              padding: '0.5rem 1rem', borderRadius: '9999px',
              fontSize: '0.8rem', fontWeight: 600, transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#5a3f17')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e1408')}
          >
            Personalizar →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  return (
    <section id="catalogo" style={{ padding: '8rem 1.5rem', backgroundColor: '#f5e6cc' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c08a3a', fontWeight: 600 }}>
            ✦ Nuestro catálogo
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1e1408', margin: '0.75rem 0 1rem', lineHeight: 1.2 }}>
            Muebles base para personalizar
          </h2>
          <p style={{ color: '#6e5940', maxWidth: 520, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Estos son nuestros modelos más solicitados. Podés personalizar cualquiera de ellos — medidas, terminación y detalles — usando nuestro configurador 3D.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {catalogItems.map(item => <CatalogCard key={item.id} item={item} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#6e5940', fontSize: '0.9rem', marginBottom: '1rem' }}>
            ¿No encontrás lo que buscás? Diseñamos desde cero.
          </p>
          <a
            href="#configurador"
            style={{
              textDecoration: 'none', backgroundColor: '#c08a3a', color: '#fff',
              padding: '0.8rem 2rem', borderRadius: '9999px',
              fontSize: '0.95rem', fontWeight: 600,
              display: 'inline-block', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a0722a')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c08a3a')}
          >
            Ir al configurador 3D →
          </a>
        </div>
      </div>
    </section>
  );
}
