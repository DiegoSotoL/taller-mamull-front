const PROJECTS = [
  {
    id: 1,
    src: '/mueble-lavaplato.jpg',
    title: 'Mueble Bajo Lavaplatos',
    detail: 'Terciado marino · Con lavaplatos · Cocina Valparaíso',
    type: 'lavaplatos',
  },
  {
    id: 2,
    src: '/set-nino.jpeg',
    title: 'Set Mesa y Sillas Infantil',
    detail: 'Pino macizo · 4 sillas · Hecho a medida',
    type: 'infantil',
  },
  {
    id: 3,
    src: '/repisa.jpeg',
    title: 'Biblioteca / Repisa a Medida',
    detail: 'Pino natural · 5 estantes · Salón Valparaíso',
    type: 'repisas',
  },
];

function ProjectCard({ project }) {
  return (
    <a
      href="#configurador"
      style={{ textDecoration: 'none', display: 'block', position: 'relative', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
      onMouseEnter={e => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
        e.currentTarget.querySelector('.gallery-overlay').style.opacity = '1';
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
        e.currentTarget.querySelector('.gallery-overlay').style.opacity = '0';
      }}
    >
      <img
        src={project.src}
        alt={project.title}
        loading="lazy"
        style={{
          width: '100%',
          height: 360,
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.45s ease',
        }}
      />

      {/* Gradiente + etiqueta siempre visible */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '2rem 1.25rem 1.25rem',
        background: 'linear-gradient(to top, rgba(14,7,1,0.88) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontWeight: 700, color: '#fdf8f0' }}>
          {project.title}
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#d4a96a', letterSpacing: '0.04em' }}>
          {project.detail}
        </p>
      </div>

      {/* Hover overlay */}
      <div
        className="gallery-overlay"
        style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(192,138,58,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.3s ease',
        }}
      >
        <span style={{
          backgroundColor: '#c08a3a', color: '#fff',
          padding: '0.55rem 1.35rem', borderRadius: 9999,
          fontSize: '0.85rem', fontWeight: 700,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}>
          Personalizar este mueble →
        </span>
      </div>
    </a>
  );
}

export default function Gallery() {
  return (
    <section id="galeria" style={{ padding: '6rem 1.5rem', backgroundColor: '#211106' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c08a3a', fontWeight: 600 }}>
            ✦ Trabajos realizados
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fdf8f0', margin: '0.75rem 0 1rem', lineHeight: 1.2 }}>
            Proyectos reales,{' '}
            <span style={{ background: 'linear-gradient(135deg, #c08a3a, #d4a96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              hechos a mano
            </span>
          </h2>
          <p style={{ color: '#8c7356', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Cada mueble sale de nuestro taller en Valparaíso. Hacé clic para configurar el tuyo.
          </p>
        </div>

        {/* Grid de fotos */}
        <div
          className="gallery-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}
        >
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

        {/* CTA WhatsApp */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#8c7356', fontSize: '0.9rem', marginBottom: '1rem' }}>
            ¿Querés ver más proyectos? Escribinos por WhatsApp.
          </p>
          <a
            href="https://wa.me/56976293299"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              backgroundColor: '#25D366', color: '#fff',
              padding: '0.72rem 1.75rem', borderRadius: 9999,
              fontSize: '0.9rem', fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1ebe57')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#25D366')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ver más proyectos por WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
