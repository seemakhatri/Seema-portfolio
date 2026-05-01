import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import painting1 from '../assets/paintings/Painting-1.jpeg'
import painting2 from '../assets/paintings/Painting-2.jpeg'
import painting3 from '../assets/paintings/Painting-3.jpeg'
import painting4 from '../assets/paintings/Painting-4.jpeg'
import painting5 from '../assets/paintings/Painting-5.jpeg'

const paintings = [
  { img: painting1, label: 'Ocean Dreams',  medium: 'Acrylic on Canvas' },
  { img: painting2, label: 'Golden Hour',   medium: 'Watercolour' },
  { img: painting3, label: 'Dusk Shores',   medium: 'Oil on Canvas' },
  { img: painting4, label: 'Sand & Sea',    medium: 'Mixed Media' },
  { img: painting5, label: 'Midnight Deep', medium: 'Digital' },
]

export default function ArtGallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected === null) return
    const handler = e => {
      if (e.key === 'ArrowRight') setSelected(i => (i + 1) % paintings.length)
      if (e.key === 'ArrowLeft')  setSelected(i => (i - 1 + paintings.length) % paintings.length)
      if (e.key === 'Escape')     setSelected(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <section
      id="art"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #060f1e 0%, #0a1628 100%)',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-150px', right: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem', color: '#4fa3c0',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontWeight: 600, display: 'block', marginBottom: '1rem',
          }}>
            Art
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 800, color: 'white',
            lineHeight: 1.02, letterSpacing: '-0.03em',
            margin: 0,
          }}>
            My paintings<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem', color: 'rgba(168,216,234,0.5)',
            marginTop: '0.8rem', letterSpacing: '0.02em',
          }}>
            Click any painting to view it in full.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '0.9rem',
          }}
          className="art-grid"
        >
          {paintings.map((p, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 0.985 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'zoom-in',
                position: 'relative',
                gridRow: i === 0 ? 'span 2' : 'auto',
                minHeight: i === 0 ? '380px' : '180px',
                background: '#0a1628',
                border: '1px solid rgba(79,163,192,0.1)',
              }}
            >
              <img
                src={p.img}
                alt={p.label}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 45%, rgba(6,15,30,0.8) 100%)',
                transition: 'opacity 0.3s',
              }} />
              {/* Label */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.2rem 1rem 0.9rem',
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.95rem', fontWeight: 600,
                  color: 'white', letterSpacing: '-0.01em',
                  marginBottom: '0.15rem',
                }}>
                  {p.label}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem', color: 'rgba(168,216,234,0.6)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {p.medium}
                </p>
              </div>
              {/* Expand icon */}
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                background: 'rgba(6,15,30,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'white',
                borderRadius: '8px',
                width: '30px', height: '30px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem',
              }}>
                ⤢
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Full-screen Modal ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 400,
              background: 'rgba(6,15,30,0.94)',
              backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); setSelected(i => (i - 1 + paintings.length) % paintings.length) }}
              style={navBtnStyle}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,163,192,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              ‹
            </button>

            {/* Image panel */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}
            >
              <div style={{
                width: 'min(82vw, 560px)',
                height: 'min(68vh, 500px)',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <img
                  src={paintings[selected].img}
                  alt={paintings[selected].label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Caption */}
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem', fontWeight: 700,
                  color: 'white', letterSpacing: '-0.02em',
                }}>
                  {paintings[selected].label}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem', color: 'rgba(168,216,234,0.55)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginTop: '0.3rem',
                }}>
                  {paintings[selected].medium}
                </p>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {paintings.map((_, i) => (
                  <div
                    key={i}
                    onClick={e => { e.stopPropagation(); setSelected(i) }}
                    style={{
                      width: selected === i ? '22px' : '7px',
                      height: '7px', borderRadius: '4px',
                      background: selected === i ? '#4fa3c0' : 'rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); setSelected(i => (i + 1) % paintings.length) }}
              style={{ ...navBtnStyle, right: '1.5rem', left: 'auto' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,163,192,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              ›
            </button>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'white', width: '40px', height: '40px',
                borderRadius: '10px', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              ✕
            </button>

            {/* Keyboard hint */}
            <p style={{
              position: 'absolute', bottom: '1.5rem',
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(168,216,234,0.25)',
              fontSize: '0.72rem', letterSpacing: '0.06em',
            }}>
              ← → to navigate · esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .art-grid { grid-template-columns: 1fr 1fr !important; }
          .art-grid > div:first-child { grid-row: auto !important; min-height: 180px !important; }
        }
      `}</style>
    </section>
  )
}

const navBtnStyle = {
  position: 'absolute',
  left: '1.5rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'white',
  width: '50px', height: '50px',
  borderRadius: '50%',
  fontSize: '1.6rem',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 0.2s',
  zIndex: 10,
  fontFamily: "'DM Sans', sans-serif",
}