import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const skills = [
  { icon: '⚡', name: 'Angular', level: 'Expert · v16–v20' },
  { icon: '🔷', name: 'TypeScript', level: 'Expert' },
  { icon: '🌊', name: 'RxJS', level: 'Advanced' },
  { icon: '🗃️', name: 'NgRx', level: 'Advanced' },
  { icon: '🟢', name: 'Node.js', level: 'Proficient' },
  { icon: '🍃', name: 'MongoDB', level: 'Proficient' },
  { icon: '🐳', name: 'Docker', level: 'Working' },
  { icon: '🔌', name: 'WebSockets', level: 'Advanced' },
]

export default function Skills() {
  const carouselRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const scroll = (dir) => carouselRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })

  return (
    <section id="skills" ref={ref} style={{ background: '#060f1e', padding: '6rem 2rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,3vw,2.8rem)', color: 'white', fontWeight: 300, textAlign: 'center', marginBottom: '0.3rem' }}>
          Skills
        </h2>
        <p style={{ fontFamily: "'Caveat', cursive", color: '#4fa3c0', textAlign: 'center', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
          keeping on scroll →
        </p>

        <div ref={carouselRef} style={{
          display: 'flex', gap: '1.5rem', overflowX: 'auto', padding: '1rem 2rem',
          scrollSnapType: 'x mandatory', scrollbarWidth: 'none',
          maxWidth: '900px', margin: '0 auto',
        }}>
          {skills.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} style={{
              flex: '0 0 180px', scrollSnapAlign: 'center',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(79,163,192,0.2)',
              borderRadius: '16px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'white', marginBottom: '0.3rem' }}>{s.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#a8d8ea', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.level}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          {['‹', '›'].map((ch, i) => (
            <button key={i} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '1px solid rgba(79,163,192,0.4)', background: 'transparent',
              color: '#a8d8ea', cursor: 'pointer', fontSize: '1.2rem',
            }}>{ch}</button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}