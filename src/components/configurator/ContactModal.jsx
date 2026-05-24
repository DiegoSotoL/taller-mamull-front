import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { calculatePrice, formatCLP, buildBudgetEmail } from '../../utils/priceCalculator.js';
import { finishOptions } from '../../data/catalog.js';

// ─── EmailJS configuration ─────────────────────────────────────────────────
// Replace these with your actual EmailJS IDs.
// 1. Sign up at https://www.emailjs.com
// 2. Create a service and two templates:
//    - OWNER_TEMPLATE_ID: receives full budget breakdown (hidden from client)
//    - CLIENT_TEMPLATE_ID: sends a thank-you/confirmation to the client
const EMAILJS_SERVICE_ID   = 'YOUR_SERVICE_ID';
const OWNER_TEMPLATE_ID    = 'YOUR_OWNER_TEMPLATE_ID';
const CLIENT_TEMPLATE_ID   = 'YOUR_CLIENT_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';
// ───────────────────────────────────────────────────────────────────────────

const STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' };

function InputField({ label, type = 'text', name, value, onChange, placeholder, required }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#3a280f', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label} {required && <span style={{ color: '#c08a3a' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '0.65rem 0.85rem',
          border: '1.5px solid #e8d4b8',
          borderRadius: 8,
          fontSize: '0.9rem',
          color: '#1e1408',
          backgroundColor: '#fdf8f0',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => (e.target.style.borderColor = '#c08a3a')}
        onBlur={e => (e.target.style.borderColor = '#e8d4b8')}
      />
    </div>
  );
}

export default function ContactModal({ isOpen, onClose, config }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus(STATUS.IDLE);
      setForm({ name: '', phone: '', email: '', message: '' });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const finishLabel = finishOptions.find(f => f.id === config.finish)?.label || config.finish;
  const price = calculatePrice(config);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) return;

    setStatus(STATUS.SENDING);

    const budgetText = buildBudgetEmail({
      clientName: form.name,
      clientPhone: form.phone,
      clientEmail: form.email,
      message: form.message,
      config: { ...config, finish: config.finish },
      price,
    });

    try {
      // Email 1: to owner with full budget
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        OWNER_TEMPLATE_ID,
        {
          client_name:    form.name,
          client_phone:   form.phone,
          client_email:   form.email,
          client_message: form.message || '(sin mensaje)',
          furniture_summary: `${config.width}×${config.height}×${config.depth} cm · ${config.shelves} estantes · ${finishLabel}`,
          budget_breakdown: budgetText,
          total_price:    formatCLP(price.total),
        },
        EMAILJS_PUBLIC_KEY
      );

      // Email 2: confirmation to client (no price shown)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        CLIENT_TEMPLATE_ID,
        {
          client_name:  form.name,
          client_email: form.email,
          furniture_summary: `Biblioteca ${config.width}×${config.height}×${config.depth} cm · ${config.shelves} estantes · Terminación ${finishLabel}`,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 100, backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 101,
          width: '90%', maxWidth: 520,
          maxHeight: '90vh',
          backgroundColor: '#fff',
          borderRadius: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'auto',
          padding: '2rem',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.3rem', color: '#8c7356', lineHeight: 1,
            padding: '0.25rem',
          }}
        >
          ✕
        </button>

        {status === STATUS.SUCCESS ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1e1408', margin: '0 0 0.75rem' }}>
              ¡Recibimos tu solicitud!
            </h2>
            <p style={{ color: '#6e5940', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Hola <strong>{form.name}</strong>, nos pondremos en contacto dentro de las próximas 24 horas por WhatsApp y correo electrónico para coordinar tu presupuesto.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#c08a3a', marginBottom: '1.5rem' }}>
              Taller Mamüll · Valparaíso
            </p>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#c08a3a', color: '#fff',
                border: 'none', borderRadius: 9999,
                padding: '0.75rem 2rem', fontSize: '0.95rem', fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 id="modal-title" style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#1e1408', margin: '0 0 0.4rem' }}>
                Solicitar presupuesto
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#8c7356', margin: 0, lineHeight: 1.55 }}>
                Dejanos tus datos y te contactamos pronto. El precio lo coordinamos juntos.
              </p>
            </div>

            {/* Config summary */}
            <div style={{
              backgroundColor: '#fdf8f0', border: '1px solid #e8d4b8',
              borderRadius: 10, padding: '0.875rem', marginBottom: '1.5rem',
              fontSize: '0.82rem', color: '#5a3f17', lineHeight: 1.7,
            }}>
              <strong>Tu biblioteca:</strong> {config.width} × {config.height} × {config.depth} cm
              &nbsp;·&nbsp; {config.shelves} estantes &nbsp;·&nbsp; {finishLabel}
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <InputField label="Nombre" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre completo" required />
              <InputField label="Teléfono / WhatsApp" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+56 9 XXXX XXXX" required />
              <InputField label="Correo electrónico" type="email" name="email" value={form.email} onChange={handleChange} placeholder="tucorreo@ejemplo.com" required />

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#3a280f', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Mensaje adicional
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="¿Algo más que quieras contarnos sobre el espacio?"
                  rows={3}
                  style={{
                    width: '100%', padding: '0.65rem 0.85rem',
                    border: '1.5px solid #e8d4b8', borderRadius: 8,
                    fontSize: '0.9rem', color: '#1e1408',
                    backgroundColor: '#fdf8f0', outline: 'none',
                    resize: 'vertical', fontFamily: 'inherit',
                    boxSizing: 'border-box', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#c08a3a')}
                  onBlur={e => (e.target.style.borderColor = '#e8d4b8')}
                />
              </div>

              {status === STATUS.ERROR && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '0.75rem', marginBottom: '1rem', fontSize: '0.83rem', color: '#991b1b' }}>
                  Hubo un error al enviar. Por favor intentá nuevamente o escribinos directamente.
                </div>
              )}

              <button
                type="submit"
                disabled={status === STATUS.SENDING}
                style={{
                  width: '100%', padding: '0.9rem',
                  backgroundColor: status === STATUS.SENDING ? '#a0722a' : '#c08a3a',
                  color: '#fff', border: 'none', borderRadius: 9999,
                  fontSize: '1rem', fontWeight: 700, cursor: status === STATUS.SENDING ? 'wait' : 'pointer',
                  transition: 'background 0.2s', letterSpacing: '0.02em',
                  boxShadow: '0 4px 16px rgba(192,138,58,0.3)',
                }}
              >
                {status === STATUS.SENDING ? 'Enviando...' : 'Enviar solicitud →'}
              </button>

              <p style={{ fontSize: '0.72rem', color: '#c2b49e', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.5 }}>
                Tus datos son confidenciales y solo se usarán para contactarte.
              </p>
            </form>
          </>
        )}
      </div>
    </>
  );
}
