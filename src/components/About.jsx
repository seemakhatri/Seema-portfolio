import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const RESUME_URL = 'https://drive.google.com/file/d/1413w3rPTB3ujp22X1RHwe1xe38dmUk_R/view?usp=drive_link'

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['Angular v16–v20', 'Angular Signals', 'React', 'Next.js App Router', 'TypeScript', 'RxJS'],
  },
  {
    category: 'State & Data',
    skills: ['NgRx', 'Redux Toolkit', 'TanStack Query', 'Recharts', 'D3.js'],
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'WebSockets', 'REST', 'Razorpay', 'Google Maps API'],
  },
  {
    category: 'DB & DevOps',
    skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Docker', 'CI/CD', 'Git'],
  },
  {
    category: 'Data Science',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Jupyter'],
  },
  {
    category: 'UI & Design',
    skills: ['Tailwind CSS', 'shadcn/ui', 'Figma-to-Code', 'HTML5', 'CSS3'],
  },
]

const timeline = [
  {
    period: 'Sep 2025 – Feb 2026',
    role: 'Angular & Full-Stack Developer',
    company: 'Docty Inc.',
    note: 'Telehealth platform · 10,000+ users · 5 apps',
  },
  {
    period: 'Oct 2024 – Aug 2025',
    role: 'Full-Stack Software Developer',
    company: 'Arka Information Systems',
    note: 'Fintech · NgRx state management · Docker CI/CD',
  },
  {
    period: 'Jan 2023 – Jun 2024',
    role: 'Full-Stack Developer',
    company: 'MainStream Soft',
    note: 'Angular · React · TypeScript · Node.js',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: '#fdf8f0',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background arcs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-120px', right: '-160px',
          width: '520px', height: '520px',
          border: '1px solid rgba(79,163,192,0.1)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-100px',
          width: '320px', height: '320px',
          border: '1px solid rgba(79,163,192,0.07)',
          borderRadius: '50%',
        }} />
      </div>

      <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section label + heading */}
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
            About
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 800, color: '#0d3b5e',
            lineHeight: 1.02, letterSpacing: '-0.03em',
            margin: 0,
          }}>
            The person behind<br />the code<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
        </motion.div>

        {/* Two-column */}
        <div className="about-cols" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '5.5rem',
          alignItems: 'start',
        }}>

          {/* LEFT — Story + Timeline + Resume */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Bio paragraphs */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem', color: '#4a7a92',
              lineHeight: 1.88, marginBottom: '1.3rem',
            }}>
              I'm a Full Stack Developer with{' '}
              <strong style={{ color: '#0d3b5e', fontWeight: 600 }}>3+ years</strong>{' '}
              shipping production applications in healthcare and fintech. I specialize in Angular,
              TypeScript, and real-time systems — building platforms that serve thousands of real
              users every single day.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.97rem', color: '#6a9ab0',
              lineHeight: 1.88, marginBottom: '1.3rem',
            }}>
              Right now I'm going deep on <strong style={{ color: '#0d3b5e', fontWeight: 500 }}>Angular's advanced architecture</strong> —
              Signals, Zoneless Change Detection, performance profiling — and simultaneously strengthening
              my expertise in <strong style={{ color: '#0d3b5e', fontWeight: 500 }}>React and Next.js</strong> to be truly full-spectrum on the frontend.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.97rem', color: '#6a9ab0',
              lineHeight: 1.88, marginBottom: '2.8rem',
            }}>
              Beyond web, I'm doing a deep study of{' '}
              <strong style={{ color: '#0d3b5e', fontWeight: 500 }}>Data Science with Python</strong> —
              not just casually, but because it genuinely fascinates me. The intersection of data and
              product is where I think the most interesting problems live. And apart from all of this —
              I paint. That creative practice quietly shapes every interface I build.
            </p>

            {/* Experience timeline */}
            <div style={{ marginBottom: '2.8rem' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.68rem', color: '#4fa3c0',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                fontWeight: 600, marginBottom: '1.6rem',
              }}>
                Experience
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {timeline.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}
                  >
                    {/* Dot + line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5px', flexShrink: 0 }}>
                      <div style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: i === 0 ? '#4fa3c0' : 'white',
                        border: `2px solid ${i === 0 ? '#4fa3c0' : 'rgba(79,163,192,0.4)'}`,
                        flexShrink: 0,
                        boxShadow: i === 0 ? '0 0 0 3px rgba(79,163,192,0.15)' : 'none',
                      }} />
                      {i < timeline.length - 1 && (
                        <div style={{ width: '1px', height: '52px', background: 'rgba(79,163,192,0.18)', marginTop: '3px' }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < timeline.length - 1 ? '0' : '0', marginBottom: i < timeline.length - 1 ? '0' : '0' }}>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.65rem', color: '#9ac4d4',
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        marginBottom: '0.2rem', fontWeight: 500,
                      }}>{t.period}</p>
                      <p style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.97rem', fontWeight: 700,
                        color: '#0d3b5e', marginBottom: '0.12rem',
                        letterSpacing: '-0.01em',
                      }}>{t.role}</p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.8rem', color: '#4fa3c0', fontWeight: 500,
                        marginBottom: '0.12rem',
                      }}>{t.company}</p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.75rem', color: '#9ac4d4',
                        marginBottom: i < timeline.length - 1 ? '0' : '0',
                      }}>{t.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume CTA */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#0d3b5e',
                color: 'white', padding: '0.78rem 1.9rem',
                borderRadius: '8px', textDecoration: 'none',
                fontSize: '0.82rem', letterSpacing: '0.05em',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                boxShadow: '0 4px 20px rgba(13,59,94,0.2)',
                transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1a5c8a'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(13,59,94,0.28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0d3b5e'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,59,94,0.2)'
              }}
            >
              View Resume →
            </a>
          </motion.div>

          {/* RIGHT — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.68rem', color: '#4fa3c0',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              fontWeight: 600, marginBottom: '1.8rem',
            }}>
              Skills & Tools
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.28 + gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.68rem', color: '#0d3b5e',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    fontWeight: 700, marginBottom: '0.7rem',
                  }}>
                    {group.category}
                    {group.category === 'Data Science' && (
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.6rem', color: '#4fa3c0',
                        background: 'rgba(79,163,192,0.1)',
                        border: '1px solid rgba(79,163,192,0.25)',
                        borderRadius: '4px', padding: '0.1rem 0.45rem',
                        letterSpacing: '0.08em', verticalAlign: 'middle',
                      }}>
                        Learning
                      </span>
                    )}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {group.skills.map(skill => (
                      <span key={skill} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.76rem',
                        color: '#2a6a8a',
                        background: 'rgba(79,163,192,0.07)',
                        border: '1px solid rgba(79,163,192,0.18)',
                        borderRadius: '6px',
                        padding: '0.3rem 0.78rem',
                        fontWeight: 400,
                        transition: 'background 0.2s, border-color 0.2s',
                        cursor: 'default',
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(79,163,192,0.14)'
                          e.currentTarget.style.borderColor = 'rgba(79,163,192,0.35)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(79,163,192,0.07)'
                          e.currentTarget.style.borderColor = 'rgba(79,163,192,0.18)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {gi < skillGroups.length - 1 && (
                    <div style={{ height: '1px', background: 'rgba(79,163,192,0.09)', marginTop: '1.6rem' }} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-cols { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }
      `}</style>
    </section>
  )
}