export default function Footer() {
  return (
    <footer id="contacto" style={{ backgroundColor: '#1e1408', color: '#d4a96a', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Taller <span style={{ color: '#c08a3a' }}>Mamüll</span>
            </div>
            <p style={{ color: '#8c7356', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Muebles artesanales a medida desde Valparaíso. Espacios que inspiran, muebles que duran.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: '#e8c99a', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', marginTop: 0 }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['#nosotros', '#catalogo', '#configurador'].map((href, i) => (
                <li key={href}>
                  <a href={href} style={{ color: '#8c7356', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target.style.color = '#c08a3a')}
                    onMouseLeave={e => (e.target.style.color = '#8c7356')}>
                    {['Nosotros', 'Catálogo', 'Diseñá tu mueble'][i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#e8c99a', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', marginTop: 0 }}>
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#8c7356' }}>
              <span>📍 Valparaíso, Chile</span>
              <a href="mailto:contacto@tallermamull.cl" style={{ color: '#8c7356', textDecoration: 'none' }}
                onMouseEnter={e => (e.target.style.color = '#c08a3a')}
                onMouseLeave={e => (e.target.style.color = '#8c7356')}>
                ✉️ contacto@tallermamull.cl
              </a>
              <a href="https://wa.me/56976293299" target="_blank" rel="noopener noreferrer" style={{ color: '#8c7356', textDecoration: 'none' }}
                onMouseEnter={e => (e.target.style.color = '#c08a3a')}
                onMouseLeave={e => (e.target.style.color = '#8c7356')}>
                💬 WhatsApp
              </a>
              <a href="https://www.instagram.com/taller.mamull.valpo/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c7356', textDecoration: 'none' }}
                onMouseEnter={e => (e.target.style.color = '#c08a3a')}
                onMouseLeave={e => (e.target.style.color = '#8c7356')}>
                📷 Instagram
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #3a280f', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: '#5a3f17', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Taller Mamüll — Todos los derechos reservados</span>
          <span style={{ color: '#5a3f17', fontSize: '0.8rem' }}>Hecho con ♥ en Valparaíso</span>
        </div>
      </div>
    </footer>
  );
}
