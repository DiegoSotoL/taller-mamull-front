import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#configurador', label: 'Diseñá tu mueble' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'box-shadow 0.3s ease',
        backgroundColor: 'rgba(253,248,240,0.97)',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.06)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: '#5a3f17', letterSpacing: '-0.02em' }}>
            Taller <span style={{ color: '#c08a3a' }}>Mamüll</span>
          </span>
          <span style={{ fontSize: '0.65rem', color: '#8c7356', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Valparaíso · Mueblería artesanal
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#5a3f17',
                transition: 'color 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => (e.target.style.color = '#c08a3a')}
              onMouseLeave={e => (e.target.style.color = '#5a3f17')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#configurador"
            style={{
              textDecoration: 'none',
              backgroundColor: '#c08a3a',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#a0722a')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#c08a3a')}
          >
            Diseñá el tuyo →
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="hamburger-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'none' }}
          aria-label="Abrir menú"
        >
          <div style={{ width: 24, height: 2, background: '#5a3f17', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: '#5a3f17', marginBottom: 5, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: '#5a3f17', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: 'rgba(253,248,240,0.98)', padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="mobile-menu">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 500, color: '#5a3f17', padding: '0.5rem 0', borderBottom: '1px solid #e8d4b8' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#configurador"
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: 'none', backgroundColor: '#c08a3a', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.95rem', fontWeight: 600, textAlign: 'center', marginTop: '0.5rem' }}
          >
            Diseñá el tuyo →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
