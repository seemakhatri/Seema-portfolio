import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { EnvelopeSimple, LinkedinLogo, GithubLogo, FilePdf, PaperPlaneRight } from '@phosphor-icons/react'

const EMAILJS_SERVICE_ID  = 'service_kvv0jbq'
const EMAILJS_TEMPLATE_ID = 'template_m7r9z5i'
const EMAILJS_PUBLIC_KEY  = 'arHpYg-dx9GTxtipy'

const LINKS = [
  { icon: <EnvelopeSimple size={15} weight="duotone" />, label: 'Email',    href: 'mailto:khatrisonia566@gmail.com' },
  { icon: <LinkedinLogo   size={15} weight="duotone" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/seema-khatri-514364229/' },
  { icon: <GithubLogo     size={15} weight="duotone" />, label: 'GitHub',   href: 'https://github.com/seemakhatri' },
  { icon: <FilePdf        size={15} weight="duotone" />, label: 'Resume',   href: 'https://drive.google.com/file/d/1413w3rPTB3ujp22X1RHwe1xe38dmUk_R/view?usp=drive_link' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.from_name || !form.from_email || !form.message) return
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY)
      setStatus('sent')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputBase = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(168,216,234,0.12)',
    borderRadius: '10px',
    padding: '0.9rem 1.1rem',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.9rem',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s',
    boxSizing: 'border-box',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #0a1628 0%, #060f1e 100%)',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.05) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
      </div>

      <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem', color: '#4fa3c0',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontWeight: 600, display: 'block', marginBottom: '1rem',
          }}>
            Contact
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 800, color: 'white',
            lineHeight: 1.02, letterSpacing: '-0.03em',
            margin: '0 0 0.8rem',
          }}>
            Let's build<br />something<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.92rem', color: 'rgba(168,216,234,0.5)',
            letterSpacing: '0.02em',
          }}>
            Open to roles · freelance · collaboration
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Social links */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.55rem 1.1rem',
                  border: '1px solid rgba(168,216,234,0.15)',
                  borderRadius: '8px',
                  color: 'rgba(168,216,234,0.7)',
                  textDecoration: 'none',
                  fontSize: '0.78rem', letterSpacing: '0.04em',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(79,163,192,0.4)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.background = 'rgba(79,163,192,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(168,216,234,0.15)'
                  e.currentTarget.style.color = 'rgba(168,216,234,0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {l.icon} {l.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,216,234,0.08)' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem', color: 'rgba(168,216,234,0.3)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              or send a message
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,216,234,0.08)' }} />
          </div>

          {/* Form / Success */}
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', padding: '3.5rem 2rem' }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(79,163,192,0.15)',
                border: '1px solid rgba(79,163,192,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.4rem',
                fontSize: '1.5rem',
              }}>
                🌊
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: 'white', fontSize: '1.7rem',
                fontWeight: 700, letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}>
                Message sent!
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgba(168,216,234,0.55)', fontSize: '0.88rem',
                marginBottom: '1.8rem',
              }}>
                I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(168,216,234,0.2)',
                  color: 'rgba(168,216,234,0.7)',
                  padding: '0.65rem 1.6rem',
                  borderRadius: '8px', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem', fontWeight: 500,
                  letterSpacing: '0.04em',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,216,234,0.4)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,216,234,0.2)'; e.currentTarget.style.color = 'rgba(168,216,234,0.7)' }}
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }} className="form-row">
                <input
                  name="from_name"
                  placeholder="Your name"
                  value={form.from_name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputBase,
                    borderColor: focused === 'name' ? 'rgba(79,163,192,0.5)' : 'rgba(168,216,234,0.12)',
                    background: focused === 'name' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                  }}
                />
                <input
                  name="from_email"
                  type="email"
                  placeholder="Your email"
                  value={form.from_email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputBase,
                    borderColor: focused === 'email' ? 'rgba(79,163,192,0.5)' : 'rgba(168,216,234,0.12)',
                    background: focused === 'email' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                  }}
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('msg')}
                onBlur={() => setFocused(null)}
                rows={6}
                style={{
                  ...inputBase,
                  resize: 'vertical',
                  borderColor: focused === 'msg' ? 'rgba(79,163,192,0.5)' : 'rgba(168,216,234,0.12)',
                  background: focused === 'msg' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                }}
              />

              {status === 'error' && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: '#e8856a', fontSize: '0.82rem',
                  textAlign: 'center', letterSpacing: '0.02em',
                }}>
                  Something went wrong — try emailing directly.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status !== 'sending' ? { scale: 1.015, y: -1 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.985 } : {}}
                style={{
                  background: status === 'sending'
                    ? 'rgba(79,163,192,0.3)'
                    : '#0d3b5e',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.92rem 2rem',
                  color: 'white',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.5rem',
                  boxShadow: status !== 'sending' ? '0 4px 20px rgba(13,59,94,0.3)' : 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                  marginTop: '0.3rem',
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#1a5c8a' }}
                onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = '#0d3b5e' }}
              >
                <PaperPlaneRight size={15} weight="duotone" />
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Footer credit */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: 'rgba(168,216,234,0.2)',
          fontSize: '0.75rem', textAlign: 'center',
          marginTop: '5rem', letterSpacing: '0.06em',
        }}>
          Crafted with code & colour by Seema Khatri
        </p>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(168,216,234,0.3);
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
    </section>
  )
}