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
  'Premium': { bg: '#ede9fe', text: '#5b21b6' },
};

function FurnitureIllustration({ finish, category }) {
  const color = finishColors[finish] || finishColors.natural;
  const dark = finish === 'black' ? '#1a1a1a' : (finish === 'white' ? '#d0d0cc' : '#a0722a');

  const illustrations = {
    'Estanterías': (
      <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="4" width="8" height="122" rx="2" fill={color} />
        <rect x="104" y="4" width="8" height="122" rx="2" fill={color} />
        <rect x="8" y="4" width="104" height="8" rx="2" fill={dark} />
        <rect x="8" y="118" width="104" height="8" rx="2" fill={dark} />
        <rect x="8" y="48" width="104" height="7" rx="1" fill={dark} />
        <rect x="8" y="84" width="104" height="7" rx="1" fill={dark} />
        <rect x="20" y="14" width="18" height="32" rx="2" fill={dark} opacity="0.4" />
        <rect x="42" y="18" width="14" height="28" rx="2" fill={dark} opacity="0.3" />
        <rect x="60" y="20" width="22" height="26" rx="2" fill={dark} opacity="0.35" />
        <rect x="20" y="58" width="24" height="24" rx="2" fill={dark} opacity="0.3" />
        <rect x="50" y="56" width="16" height="26" rx="2" fill={dark} opacity="0.4" />
      </svg>
    ),
    'Modulares': (
      <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="4" y="10" width="132" height="60" rx="3" fill={color} />
        <rect x="4" y="65" width="132" height="5" rx="2" fill={dark} />
        <rect x="4" y="10" width="132" height="6" rx="2" fill={dark} />
        <rect x="48" y="16" width="4" height="49" fill={dark} opacity="0.5" />
        <rect x="88" y="16" width="4" height="49" fill={dark} opacity="0.5" />
        <rect x="10" y="22" width="30" height="18" rx="2" fill={dark} opacity="0.2" />
        <rect x="10" y="44" width="30" height="18" rx="2" fill={dark} opacity="0.2" />
        <rect x="55" y="22" width="25" height="40" rx="2" fill={dark} opacity="0.15" />
        <rect x="95" y="22" width="35" height="40" rx="2" fill={dark} opacity="0.15" />
      </svg>
    ),
    'Infantil': (
      <svg viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="40" width="114" height="8" rx="3" fill={color} />
        <rect x="8" y="48" width="8" height="55" rx="2" fill={dark} opacity="0.7" />
        <rect x="114" y="48" width="8" height="55" rx="2" fill={dark} opacity="0.7" />
        <rect x="20" y="50" width="36" height="28" rx="2" fill={dark} opacity="0.25" />
        <rect x="62" y="50" width="48" height="10" rx="1" fill={dark} opacity="0.2" />
        <rect x="62" y="66" width="48" height="10" rx="1" fill={dark} opacity="0.2" />
        <rect x="20" y="10" width="80" height="28" rx="3" fill={color} opacity="0.7" />
        <rect x="20" y="10" width="80" height="5" rx="2" fill={dark} opacity="0.5" />
        <rect x="56" y="18" width="18" height="16" rx="2" fill={dark} opacity="0.2" />
      </svg>
    ),
    'Dormitorio': (
      <svg viewBox="0 0 140 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="6" y="4" width="10" height="122" rx="2" fill={color} />
        <rect x="124" y="4" width="10" height="122" rx="2" fill={color} />
        <rect x="6" y="4" width="128" height="8" rx="2" fill={dark} />
        <rect x="6" y="118" width="128" height="8" rx="2" fill={dark} />
        <rect x="16" y="16" width="50" height="100" rx="2" fill={dark} opacity="0.1" />
        <rect x="74" y="16" width="50" height="100" rx="2" fill={dark} opacity="0.1" />
        <line x1="70" y1="12" x2="70" y2="118" stroke={dark} strokeWidth="2" opacity="0.4" />
        <rect x="22" y="22" width="38" height="6" rx="3" fill={color} opacity="0.6" />
        <rect x="80" y="22" width="38" height="6" rx="3" fill={color} opacity="0.6" />
      </svg>
    ),
    'Living': (
      <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="6" y="22" width="148" height="52" rx="4" fill={color} />
        <rect x="6" y="70" width="12" height="16" rx="2" fill={dark} opacity="0.7" />
        <rect x="142" y="70" width="12" height="16" rx="2" fill={dark} opacity="0.7" />
        <rect x="18" y="70" width="12" height="12" rx="2" fill={dark} opacity="0.5" />
        <rect x="130" y="70" width="12" height="12" rx="2" fill={dark} opacity="0.5" />
        <ellipse cx="80" cy="12" rx="30" ry="8" fill={dark} opacity="0.15" />
      </svg>
    ),
    'Auxiliares': (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="84" height="104" rx="3" fill={color} />
        <rect x="8" y="8" width="84" height="8" rx="2" fill={dark} opacity="0.6" />
        <rect x="8" y="44" width="84" height="6" rx="1" fill={dark} opacity="0.4" />
        <rect x="8" y="78" width="84" height="6" rx="1" fill={dark} opacity="0.4" />
        <circle cx="50" cy="28" r="4" fill={dark} opacity="0.3" />
        <circle cx="50" cy="63" r="4" fill={dark} opacity="0.3" />
        <circle cx="50" cy="96" r="4" fill={dark} opacity="0.3" />
        <rect x="8" y="108" width="20" height="6" rx="2" fill={dark} opacity="0.6" />
        <rect x="72" y="108" width="20" height="6" rx="2" fill={dark} opacity="0.6" />
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
