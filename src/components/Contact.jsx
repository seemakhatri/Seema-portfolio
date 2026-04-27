import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

// 👇 paste your EmailJS credentials here
const EMAILJS_SERVICE_ID  = 'your_service_id'
const EMAILJS_TEMPLATE_ID = 'your_template_id'
const EMAILJS_PUBLIC_KEY  = 'your_public_key'

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(168,216,234,0.2)',
  borderRadius: '10px', padding: '0.85rem 1rem',
  color: 'white', fontSize: '0.95rem',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none', transition: 'border-color 0.3s',
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const formRef = useRef(null)

  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.from_name || !form.from_email || !form.message) return
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const links = [
    { label: '📧 Email', href: 'mailto:khatrisonia566@gmail.com' },
    { label: '💼 LinkedIn', href: 'https://linkedin.com' },
    { label: '🐙 GitHub', href: 'https://github.com' },
    { label: '📄 Resume', href: '#' },
  ]

  return (
    <section id="contact" ref={ref} style={{ background: '#0d3b5e', padding: '7rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem,4vw,3rem)', color: 'white',
          fontWeight: 300, textAlign: 'center', marginBottom: '0.5rem',
        }}>
          Let's build something
        </h2>
        <p style={{
          fontFamily: "'Caveat', cursive", color: '#a8d8ea',
          fontSize: '1.1rem', textAlign: 'center', marginBottom: '3rem',
        }}>
          goal to solve problems and moving out ✦
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              padding: '0.6rem 1.3rem',
              border: '1px solid rgba(168,216,234,0.3)',
              borderRadius: '50px', color: '#a8d8ea',
              textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.05em',
            }}>{l.label}</a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(168,216,234,0.15)' }} />
          <span style={{ fontFamily: "'Caveat', cursive", color: 'rgba(168,216,234,0.5)', fontSize: '0.9rem' }}>or send a message</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(168,216,234,0.15)' }} />
        </div>

        {/* Form */}
        {status === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '3rem 2rem' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌊</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: 'white', fontSize: '1.8rem', fontWeight: 300, marginBottom: '0.5rem' }}>
              Message sent!
            </h3>
            <p style={{ color: '#a8d8ea', fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}>
              I'll get back to you soon ✦
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{
                marginTop: '1.5rem', background: 'transparent',
                border: '1px solid rgba(168,216,234,0.3)',
                color: '#a8d8ea', padding: '0.6rem 1.5rem',
                borderRadius: '50px', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
              }}
            >
              send another →
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                name="from_name"
                placeholder="Your name"
                value={form.from_name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle, borderColor: focused === 'name' ? 'rgba(79,163,192,0.6)' : 'rgba(168,216,234,0.2)' }}
              />
              <input
                name="from_email"
                type="email"
                placeholder="Your email"
                value={form.from_email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle, borderColor: focused === 'email' ? 'rgba(79,163,192,0.6)' : 'rgba(168,216,234,0.2)' }}
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused('msg')}
              onBlur={() => setFocused(null)}
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical',
                borderColor: focused === 'msg' ? 'rgba(79,163,192,0.6)' : 'rgba(168,216,234,0.2)',
              }}
            />

            {status === 'error' && (
              <p style={{ color: '#e8856a', fontFamily: "'Caveat', cursive", fontSize: '1rem', textAlign: 'center' }}>
                something went wrong — try emailing directly 🌊
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: status === 'sending'
                  ? 'rgba(79,163,192,0.4)'
                  : 'linear-gradient(135deg, #4fa3c0, #0d3b5e)',
                border: 'none', borderRadius: '50px',
                padding: '0.9rem 2rem', color: 'white',
                fontSize: '0.9rem', letterSpacing: '0.05em',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'opacity 0.3s',
              }}
            >
              {status === 'sending' ? 'sending...' : 'send message →'}
            </motion.button>
          </form>
        )}
      </motion.div>

      <p style={{
        fontFamily: "'Inter', inter",
        color: 'rgba(168,216,234,0.3)',
        fontSize: '0.9rem', textAlign: 'center', marginTop: '4rem',
      }}>
        ✦ crafted with code & colour by Seema Khatri  ✦
      </p>
    </section>
  )
}