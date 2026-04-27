import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    emoji: '📈', title: 'Stock Market Dashboard',
    desc: 'Real-time WebSocket stock feeds, live UK/US prices, dividend tracking, sub-500ms latency.',
    tags: ['Angular', 'WebSockets', 'Node.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #0d3b5e, #4fa3c0)',
    link: 'https://hargreaves-lansdown.onrender.com'
  },
  {
    emoji: '🏥', title: 'Docty Telehealth',
    desc: 'Doctor-patient consultations, ambulance dispatch, pharmacy workflows. 10,000+ users.',
    tags: ['Angular v20', 'NgRx', 'Razorpay', 'Maps API'],
    gradient: 'linear-gradient(135deg, #1a1a2e, #e8856a88)',
    link: '#'
  },
  {
    emoji: '🐾', title: 'Animal Healthcare Mgmt',
    desc: 'Responsive management platform with 95%+ client satisfaction built full-stack.',
    tags: ['Angular', 'RxJS', 'Express', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #0a1628, #2d6a4f)',
    link: '#'
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="projects" ref={ref} style={{ background: 'linear-gradient(180deg,#060f1e 0%,#0a1628 100%)', padding: '6rem 2rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: 'white', fontWeight: 300, textAlign: 'center', marginBottom: '0.3rem' }}>
          Projects
        </h2>
        <p style={{ fontFamily: "'Caveat', cursive", color: '#4fa3c0', textAlign: 'center', fontSize: '1.1rem', marginBottom: '3rem' }}>
          as a big sky — an open giant space ✦
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {projects.map((p, i) => (
            <motion.a key={i} href={p.link} target="_blank" rel="noreferrer"
              whileHover={{ y: -8 }}
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(79,163,192,0.15)',
                borderRadius: '20px', overflow: 'hidden', textDecoration: 'none', display: 'block',
              }}
            >
              <div style={{ height: '160px', background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                {p.emoji}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'white', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(168,216,234,0.7)', lineHeight: 1.6, marginBottom: '1rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      padding: '0.2rem 0.7rem', background: 'rgba(79,163,192,0.15)',
                      border: '1px solid rgba(79,163,192,0.3)', borderRadius: '20px',
                      fontSize: '0.7rem', color: '#a8d8ea', letterSpacing: '0.05em',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}