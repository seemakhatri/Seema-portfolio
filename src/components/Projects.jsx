import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Stock Market Dashboard',
    desc: 'Real-time WebSocket stock feeds with sub-500ms latency. Live UK/US prices, dividend tracking, corporate action alerts, and interactive Recharts visualisations with historical overlays.',
    tags: ['Angular', 'WebSockets', 'Node.js', 'MongoDB', 'Recharts'],
    accent: '#4fa3c0',
    accentBg: 'linear-gradient(135deg, #0d3b5e 0%, #1a5c8a 60%, #4fa3c0 100%)',
    label: 'Fintech',
    link: 'https://hargreaves-lansdown.onrender.com',
    live: true,
  },
  {
    title: 'Docty Telehealth',
    desc: 'Pixel-perfect UI across 5 user-type apps — Patient, Doctor, Pharmacy, Driver, Operator. Real-time consultations, ambulance dispatch, and Razorpay payments at 99.5% success rate.',
    tags: ['Angular v20', 'Next.js', 'NgRx', 'Razorpay', 'Maps API'],
    accent: '#e8856a',
    accentBg: 'linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 60%, #4a2040 100%)',
    label: 'Healthcare',
    link: '#',
    live: false,
  },
  {
    title: 'Animal Healthcare Mgmt',
    desc: 'Full-stack responsive management platform across the complete Agile lifecycle. NgRx entity adapters reduced state-related bugs by 40%. 95%+ client satisfaction.',
    tags: ['Angular', 'RxJS', 'Express', 'PostgreSQL'],
    accent: '#4ade80',
    accentBg: 'linear-gradient(135deg, #0a1628 0%, #0f2d1a 60%, #1a4d2e 100%)',
    label: 'Healthcare',
    link: '#',
    live: false,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #060f1e 0%, #0a1628 100%)',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '800px',
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
            Work
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 800, color: 'white',
            lineHeight: 1.02, letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Selected projects<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={p.link}
                target={p.live ? '_blank' : '_self'}
                rel="noreferrer"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '280px 1fr',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(79,163,192,0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                  cursor: p.live ? 'pointer' : 'default',
                }}
                className="project-card"
                onMouseEnter={e => {
                  if (!p.live) return
                  e.currentTarget.style.borderColor = 'rgba(79,163,192,0.3)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(79,163,192,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Left: colour band */}
                <div style={{
                  background: p.accentBg,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', justifyContent: 'flex-end',
                  padding: '2rem',
                  minHeight: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Subtle texture */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    fontWeight: 600, marginBottom: '0.5rem', position: 'relative',
                  }}>
                    {p.label}
                  </span>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.2rem', fontWeight: 800,
                    color: 'rgba(255,255,255,0.12)',
                    lineHeight: 1, letterSpacing: '-0.03em',
                    position: 'relative',
                  }}>
                    0{i + 1}
                  </div>
                </div>

                {/* Right: content */}
                <div style={{ padding: '2rem 2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.35rem', color: 'white',
                        fontWeight: 700, letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                      }}>
                        {p.title}
                      </h3>
                      {p.live && (
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.65rem', color: '#4ade80',
                          background: 'rgba(74,222,128,0.1)',
                          border: '1px solid rgba(74,222,128,0.25)',
                          borderRadius: '50px', padding: '0.2rem 0.65rem',
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          fontWeight: 500, flexShrink: 0, marginLeft: '1rem',
                          display: 'flex', alignItems: 'center', gap: '0.35rem',
                        }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }} />
                          Live
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.88rem', color: 'rgba(168,216,234,0.65)',
                      lineHeight: 1.75, marginBottom: '1.5rem',
                    }}>
                      {p.desc}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(79,163,192,0.08)',
                        border: '1px solid rgba(79,163,192,0.18)',
                        borderRadius: '6px',
                        fontSize: '0.7rem', color: '#7ab3c8',
                        letterSpacing: '0.04em', fontWeight: 500,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .project-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}