import { useEffect, useRef } from 'react';

const values = [
  { icon: '🌲', title: 'Madera sostenible', desc: 'Trabajamos con madera certificada y proveedores locales de la región.' },
  { icon: '✂️', title: 'Hecho a medida', desc: 'Cada pieza se diseña y fabrica según las necesidades exactas del espacio.' },
  { icon: '🎨', title: 'Diseño propio', desc: 'Nuestros diseñadores trabajan junto a vos para crear algo único.' },
  { icon: '🚚', title: 'Entrega e instalación', desc: 'Nos ocupamos del transporte y montaje en toda la Región de Valparaíso.' },
];

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#1e1408',
        padding: 'calc(70px + 1.5rem) 0 3rem',
      }}
    >
      {/* Parallax background pattern */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: `
            radial-gradient(ellipse at 30% 50%, rgba(192,138,58,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 20%, rgba(90,63,23,0.3) 0%, transparent 50%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(192,138,58,0.04) 40px,
              rgba(192,138,58,0.04) 41px
            )
          `,
          willChange: 'transform',
        }}
      />

      {/* Wood grain overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.01) 3px, rgba(255,255,255,0.01) 4px)',
        pointerEvents: 'none',
      }} />

      {/* ── Hero content ── */}
      <div className="hero-content" style={{ textAlign: 'center', padding: '0 1.5rem', maxWidth: 800, position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: 'rgba(192,138,58,0.15)',
          border: '1px solid rgba(192,138,58,0.3)',
          color: '#c08a3a',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '0.4rem 1.2rem',
          borderRadius: '9999px',
          marginBottom: '1rem',
        }}>
          ✦ Mueblería artesanal · Valparaíso, Chile
        </div>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
          fontWeight: 700,
          color: '#fdf8f0',
          margin: '0 0 0.6rem',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}>
          Taller{' '}
          <span style={{
            background: 'linear-gradient(135deg, #c08a3a, #d4a96a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Mamüll
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
          color: '#c2b49e',
          margin: '0 0 0.5rem',
          fontStyle: 'italic',
          fontFamily: 'Georgia, serif',
        }}>
          Espacios que inspiran, muebles que duran.
        </p>

        <p style={{ fontSize: '0.9rem', color: '#8c7356', margin: '0 0 1.75rem', lineHeight: 1.7 }}>
          Diseñamos y fabricamos mobiliario infantil y de trabajo a medida.<br />
          Cada pieza, única. Cada espacio, tuyo.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#configurador"
            style={{
              textDecoration: 'none',
              backgroundColor: '#c08a3a',
              color: '#fff',
              padding: '0.8rem 1.8rem',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'all 0.25s',
              boxShadow: '0 4px 20px rgba(192,138,58,0.35)',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#a0722a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#c08a3a'; e.currentTarget.style.transform = 'none'; }}
          >
            Diseñá tu mueble →
          </a>
          <a
            href="#catalogo"
            style={{
              textDecoration: 'none',
              backgroundColor: 'transparent',
              color: '#d4a96a',
              padding: '0.8rem 1.8rem',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 500,
              border: '1px solid rgba(212,169,106,0.4)',
              transition: 'all 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c08a3a'; e.currentTarget.style.color = '#c08a3a'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,169,106,0.4)'; e.currentTarget.style.color = '#d4a96a'; }}
          >
            Ver catálogo
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1.75rem', flexWrap: 'wrap' }}>
          {[
            { value: '+200', label: 'Muebles entregados' },
            { value: '8 años', label: 'De experiencia' },
            { value: '100%', label: 'Madera certificada' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: '#c08a3a' }}>{stat.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#5a3f17', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="hero-divider" style={{ width: 60, height: 1, background: 'rgba(192,138,58,0.35)', margin: '2rem auto', position: 'relative', zIndex: 2 }} />

      {/* ── Por qué elegirnos ── */}
      <div className="hero-values-wrap" style={{ maxWidth: 1200, width: '100%', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c08a3a', fontWeight: 600 }}>
            ✦ Por qué elegirnos
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: '#fdf8f0', margin: '0.4rem 0 0', lineHeight: 1.2 }}>
            Artesanía y diseño,{' '}
            <span style={{ color: '#c08a3a' }}>desde el corazón de Valparaíso</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {values.map(v => (
            <div
              key={v.title}
              style={{
                display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                padding: '1.1rem 1.25rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                border: '1px solid rgba(192,138,58,0.2)',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(192,138,58,0.5)'; e.currentTarget.style.backgroundColor = 'rgba(192,138,58,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(192,138,58,0.2)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
            >
              <div style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 2 }}>{v.icon}</div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', color: '#e8c99a', fontWeight: 700 }}>{v.title}</h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#8c7356', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero {
            justify-content: flex-start !important;
            padding-top: calc(70px + 0.75rem) !important;
            padding-bottom: 0 !important;
          }
          .hero-content {
            padding-top: 0 !important;
          }
          .hero-stats {
            margin-top: 1.25rem !important;
            gap: 1rem !important;
          }
          .hero-divider {
            display: none !important;
          }
          .hero-values-wrap {
            margin-top: 2.5rem;
            border-top: 1px solid rgba(192,138,58,0.25);
            background: rgba(0,0,0,0.22);
            padding: 2rem 1.25rem 2.5rem !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
