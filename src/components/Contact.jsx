import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { EnvelopeSimple, LinkedinLogo, GithubLogo, FilePdf, PaperPlaneRight } from '@phosphor-icons/react'

const EMAILJS_SERVICE_ID  = 'service_kvv0jbq'
const EMAILJS_TEMPLATE_ID = 'template_m7r9z5i'
const EMAILJS_PUBLIC_KEY  = 'arHpYg-dx9GTxtipy'

const LINKS = [
  { icon: <EnvelopeSimple size={16} weight="duotone" />, label: 'Email',    href: 'mailto:khatrisonia566@gmail.com' },
  { icon: <LinkedinLogo   size={16} weight="duotone" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/seema-khatri-514364229/' },
  { icon: <GithubLogo     size={16} weight="duotone" />, label: 'GitHub',   href: 'https://github.com/seemakhatri' },
  { icon: <FilePdf        size={16} weight="duotone" />, label: 'Resume',   href: 'https://drive.google.com/file/d/1sI2nrbgUfQngDti1ga92egUyfs0TSN7T/view?usp=drive_link' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState(null)

  // ─── Floating Particles ───
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }))
    setParticles(newParticles)
  }, [])

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
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(168,216,234,0.08)',
    borderRadius: '12px',
    padding: '0.9rem 1.1rem',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.9rem',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    outline: 'none',
    transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ─── Floating Particles ─── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'rgba(79,163,192,0.15)',
              opacity: p.opacity,
              animation: `floatParticle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ─── Background Glows ─── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Main glow */}
        <div style={{
          position: 'absolute', 
          bottom: '-200px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '700px', 
          height: '700px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.06) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
        {/* Secondary glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        {/* Tertiary glow */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-150px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.02) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem', 
            color: '#4fa3c0',
            letterSpacing: '0.18em', 
            textTransform: 'uppercase',
            fontWeight: 600, 
            display: 'block', 
            marginBottom: '1rem',
          }}>
            Contact
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 800, 
            color: 'white',
            lineHeight: 1.02, 
            letterSpacing: '-0.03em',
            margin: '0 0 0.8rem',
          }}>
            Let's build<br />something<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.92rem', 
            color: 'rgba(168,216,234,0.4)',
            letterSpacing: '0.02em',
          }}>
            Open to roles · freelance · collaboration
          </p>
        </motion.div>

        {/* ─── Content ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ─── Social Links ─── */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  border: '1px solid rgba(168,216,234,0.08)',
                  borderRadius: '10px',
                  color: 'rgba(168,216,234,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.78rem', 
                  letterSpacing: '0.04em',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  background: 'rgba(255,255,255,0.02)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(79,163,192,0.3)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.background = 'rgba(79,163,192,0.08)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,163,192,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(168,216,234,0.08)'
                  e.currentTarget.style.color = 'rgba(168,216,234,0.6)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {l.icon} {l.label}
              </a>
            ))}
          </div>

          {/* ─── Divider ─── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,216,234,0.06)' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem', 
              color: 'rgba(168,216,234,0.2)',
              letterSpacing: '0.12em', 
              textTransform: 'uppercase',
            }}>
              or send a message
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,216,234,0.06)' }} />
          </div>

          {/* ─── Form / Success ─── */}
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', padding: '3.5rem 2rem' }}
            >
              <div style={{
                width: '60px', 
                height: '60px', 
                borderRadius: '50%',
                background: 'rgba(79,163,192,0.1)',
                border: '1px solid rgba(79,163,192,0.2)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.4rem',
                fontSize: '1.8rem',
              }}>
                ✦
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: 'white', 
                fontSize: '1.8rem',
                fontWeight: 700, 
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}>
                Message sent!
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgba(168,216,234,0.5)', 
                fontSize: '0.88rem',
                marginBottom: '1.8rem',
              }}>
                I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(168,216,234,0.12)',
                  color: 'rgba(168,216,234,0.6)',
                  padding: '0.7rem 1.8rem',
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem', 
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.borderColor = 'rgba(79,163,192,0.3)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.background = 'rgba(79,163,192,0.08)'
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.borderColor = 'rgba(168,216,234,0.12)'
                  e.currentTarget.style.color = 'rgba(168,216,234,0.6)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
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
                    borderColor: focused === 'name' ? 'rgba(79,163,192,0.4)' : 'rgba(168,216,234,0.08)',
                    background: focused === 'name' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                    boxShadow: focused === 'name' ? '0 0 0 3px rgba(79,163,192,0.05)' : 'none',
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
                    borderColor: focused === 'email' ? 'rgba(79,163,192,0.4)' : 'rgba(168,216,234,0.08)',
                    background: focused === 'email' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                    boxShadow: focused === 'email' ? '0 0 0 3px rgba(79,163,192,0.05)' : 'none',
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
                  borderColor: focused === 'msg' ? 'rgba(79,163,192,0.4)' : 'rgba(168,216,234,0.08)',
                  background: focused === 'msg' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  boxShadow: focused === 'msg' ? '0 0 0 3px rgba(79,163,192,0.05)' : 'none',
                }}
              />

              {status === 'error' && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: '#e8856a', 
                  fontSize: '0.82rem',
                  textAlign: 'center', 
                  letterSpacing: '0.02em',
                }}>
                  Something went wrong — try emailing directly.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status !== 'sending' ? { scale: 1.015, y: -2 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.985 } : {}}
                style={{
                  background: status === 'sending'
                    ? 'rgba(79,163,192,0.2)'
                    : 'linear-gradient(135deg, #4fa3c0, #2a8fb5)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.95rem 2rem',
                  color: 'white',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center', 
                  gap: '0.6rem',
                  boxShadow: status !== 'sending' ? '0 4px 30px rgba(79,163,192,0.2)' : 'none',
                  transition: 'all 0.3s ease',
                  marginTop: '0.3rem',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
                onMouseEnter={e => { 
                  if (status !== 'sending') {
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(79,163,192,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={e => { 
                  if (status !== 'sending') {
                    e.currentTarget.style.boxShadow = '0 4px 30px rgba(79,163,192,0.2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <PaperPlaneRight size={16} weight="duotone" />
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* ─── HIGHLIGHTED FOOTER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            marginTop: '5rem',
            textAlign: 'center',
            padding: '1.2rem 2rem',
            position: 'relative',
          }}
        >
          {/* Decorative line above footer */}
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(79,163,192,0.2), transparent)',
            margin: '0 auto 1.2rem auto',
          }} />

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            <span style={{ color: 'rgba(168,216,234,0.2)' }}>
              Crafted with 
            </span>
            <span style={{ color: 'rgba(168,216,234,0.2)' }}>
              code &amp; 
            </span>
            <span style={{ 
              color: 'white',
              fontWeight: 500,
              background: 'linear-gradient(135deg, #4fa3c0, #2a8fb5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              colour
            </span>
            <span style={{ color: 'rgba(168,216,234,0.15)' }}>
              {' '}by{' '}
            </span>
            <span style={{ 
              color: 'white',
              fontWeight: 600,
              letterSpacing: '0.04em',
              borderBottom: '1px solid rgba(79,163,192,0.2)',
              paddingBottom: '1px',
            }}>
              Seema Khatri
            </span>
          </p>

          {/* Subtle glow behind the text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '60px',
            background: 'radial-gradient(ellipse, rgba(79,163,192,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: -1,
          }} />
        </motion.div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          25% { 
            transform: translate(30px, -20px) scale(1.2);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-20px, -40px) scale(0.8);
            opacity: 0.2;
          }
          75% { 
            transform: translate(15px, -25px) scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }

        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }

        input::placeholder, 
        textarea::placeholder {
          color: rgba(168,216,234,0.25);
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }

        /* Smooth scroll for modal */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(79,163,192,0.04);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(79,163,192,0.2);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(79,163,192,0.3);
        }
      `}</style>
    </section>
  )
}