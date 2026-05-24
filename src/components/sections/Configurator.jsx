import { useState, Suspense, lazy } from 'react';
import DimensionsPanel from '../configurator/DimensionsPanel.jsx';
import ContactModal from '../configurator/ContactModal.jsx';

const FurnitureScene = lazy(() => import('../configurator/FurnitureScene.jsx'));

const DEFAULT_CONFIG = {
  width: 120,
  height: 150,
  depth: 25,
  shelves: 3,
  finish: 'natural',
  furnitureType: 'repisas',
};

const TYPE_HEADINGS = {
  repisas: 'repisas flotantes',
  lavaplatos: 'mueble bajo lavaplatos',
  infantil: 'set infantil de mesa y sillas',
};

function Scene3DPlaceholder() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, #1e1408 0%, #3a280f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 16,
    }}>
      <div style={{ textAlign: 'center', color: '#8c7356' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem', animation: 'spin 1.5s linear infinite' }}>⟳</div>
        <p style={{ fontSize: '0.85rem', margin: 0 }}>Cargando visor 3D...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Configurator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="configurador" style={{ padding: '6rem 1.5rem', backgroundColor: '#1e1408' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c08a3a', fontWeight: 600 }}>
            ✦ Configurador 3D
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fdf8f0', margin: '0.75rem 0 1rem', lineHeight: 1.2 }}>
            Diseñá tu{' '}
            <span style={{ background: 'linear-gradient(135deg, #c08a3a, #d4a96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {TYPE_HEADINGS[config.furnitureType] || 'mueble a medida'}
            </span>
          </h2>
          <p style={{ color: '#8c7356', maxWidth: 560, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            <span className="desc-desktop">Usá los controles de la derecha para ajustar ancho, alto, profundidad, cantidad de estantes y terminación. Rotá el modelo 3D con el mouse.</span>
            <span className="desc-mobile">Ajustá las medidas en el panel de abajo y girá el modelo con el dedo.</span>
          </p>
        </div>

        {/* Main layout: 3D Scene + Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
        className="configurator-grid"
        >
          {/* 3D Viewport — height matches the panel via CSS grid stretch */}
          <div className="config-viewport" style={{
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            minHeight: 460,
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}>
            <Suspense fallback={<Scene3DPlaceholder />}>
              <FurnitureScene config={config} />
            </Suspense>

            {/* Overlay hints */}
            <div style={{
              position: 'absolute', bottom: 16, left: 16,
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
            }}>
              {['🖱️ Arrastrar para rotar'].map(hint => (
                <span key={hint} style={{
                  backgroundColor: 'rgba(0,0,0,0.5)', color: '#c2b49e',
                  fontSize: '0.7rem', padding: '0.25rem 0.65rem',
                  borderRadius: 9999, backdropFilter: 'blur(4px)',
                }}>
                  {hint}
                </span>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <DimensionsPanel
            config={config}
            onChange={setConfig}
            onRequestQuote={() => setModalOpen(true)}
          />
        </div>

      </div>

      {/* Responsive styles */}
      <style>{`
        .desc-mobile { display: none; }
        @media (max-width: 768px) {
          .configurator-grid { grid-template-columns: 1fr !important; }
          .config-viewport { height: 300px !important; }
          .config-panel { padding: 1rem !important; }
          .desc-desktop { display: none; }
          .desc-mobile { display: inline; }
        }
      `}</style>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} config={config} />
    </section>
  );
}
