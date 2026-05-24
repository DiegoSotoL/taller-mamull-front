const values = [
  { icon: '🌲', title: 'Madera sostenible', desc: 'Trabajamos con madera certificada y proveedores locales de la región.' },
  { icon: '✂️', title: 'Hecho a medida', desc: 'Cada pieza se diseña y fabrica según las necesidades exactas del espacio.' },
  { icon: '🎨', title: 'Diseño propio', desc: 'Nuestros diseñadores trabajan junto a vos para crear algo único.' },
  { icon: '🚚', title: 'Entrega e instalación', desc: 'Nos ocupamos del transporte y montaje en toda la Región de Valparaíso.' },
];

export default function About() {
  return (
    <section id="nosotros" style={{ padding: '8rem 1.5rem', backgroundColor: '#fdf8f0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c08a3a', fontWeight: 600 }}>
            ✦ Por qué elegirnos
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#1e1408', margin: '0.75rem 0 0', lineHeight: 1.2 }}>
            Artesanía y diseño,{' '}
            <span style={{ color: '#c08a3a' }}>desde el corazón de Valparaíso</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {values.map(v => (
            <div
              key={v.title}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                padding: '1.5rem',
                backgroundColor: '#fff',
                borderRadius: 12,
                border: '1px solid #e8d4b8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(192,138,58,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)')}
            >
              <div style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: 2 }}>{v.icon}</div>
              <div>
                <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#1e1408', fontWeight: 700 }}>{v.title}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6e5940', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
