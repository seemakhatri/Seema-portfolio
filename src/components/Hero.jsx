import { motion } from 'framer-motion'
import profilePhoto from '../assets/seema.jpg'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const tags = ['Angular v16–v20', 'React · Next.js', 'TypeScript', 'Node.js']

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fdf8f0 0%, #eef6fb 55%, #daeef7 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* ── Background decorations ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-220px', right: '-220px',
          width: '700px', height: '700px',
          border: '1.5px solid rgba(79,163,192,0.1)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '-140px', right: '-140px',
          width: '520px', height: '520px',
          border: '1px solid rgba(79,163,192,0.07)',
          borderRadius: '50%',
        }} />
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <div key={`${row}-${col}`} style={{
              position: 'absolute',
              top: `${80 + row * 80}px`,
              left: `${40 + col * 90}px`,
              width: '3px', height: '3px',
              borderRadius: '50%',
              background: 'rgba(79,163,192,0.18)',
            }} />
          ))
        )}
        <div style={{
          position: 'absolute', bottom: '8%', left: '-30px',
          width: '180px', height: '180px',
          background: 'rgba(168,216,234,0.15)',
          borderRadius: '40px',
          transform: 'rotate(20deg)',
        }} />
      </div>

      {/* ── Main grid ── */}
      <div
        className="hero-grid"
        style={{
          maxWidth: '1180px',
          width: '100%',
          margin: '0 auto',
          padding: '4rem 3rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── LEFT ── */}
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Open to work pill */}
          <motion.div variants={item}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(79,163,192,0.1)',
              border: '1px solid rgba(79,163,192,0.28)',
              borderRadius: '50px',
              padding: '0.3rem 0.9rem',
              fontSize: '0.72rem',
              color: '#2a8fb5',
              letterSpacing: '0.08em',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              marginBottom: '2rem',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#4fa3c0',
                animation: 'blink 2s ease-in-out infinite',
              }} />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)',
            fontWeight: 800,
            color: '#0d3b5e',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Seema
          </motion.h1>
          <motion.h1 variants={item} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)',
            fontWeight: 800,
            color: '#0d3b5e',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            margin: '0 0 1.4rem 0',
          }}>
            Khatri<span style={{ color: '#4fa3c0' }}>.</span>
          </motion.h1>

          {/* Role */}
          <motion.div variants={item} style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            marginBottom: '1.6rem',
          }}>
            <div style={{ width: '28px', height: '2px', background: '#4fa3c0', borderRadius: '2px', flexShrink: 0 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem',
              color: '#4fa3c0',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              Full Stack Developer · Healthcare & Fintech
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            color: '#4a7a92',
            lineHeight: 1.8,
            maxWidth: '430px',
            marginBottom: '2rem',
          }}>
            3+ years building production apps that serve thousands of real users.
            I blend engineering precision with an artist's sensibility — clean architecture,
            real-time systems, interfaces that feel alive.
          </motion.p>

          {/* Tech tags */}
          <motion.div variants={item} style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '2.4rem' }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.7rem',
                color: '#0d3b5e',
                background: 'rgba(13,59,94,0.06)',
                border: '1px solid rgba(13,59,94,0.1)',
                borderRadius: '6px',
                padding: '0.28rem 0.7rem',
                letterSpacing: '0.04em',
                fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: '#0d3b5e',
                color: 'white',
                padding: '0.82rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                fontWeight: 500,
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a5c8a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0d3b5e'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View Projects →
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'transparent',
                color: '#0d3b5e',
                padding: '0.82rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                fontWeight: 500,
                border: '1.5px solid rgba(13,59,94,0.22)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0d3b5e'; e.currentTarget.style.background = 'rgba(13,59,94,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,59,94,0.22)'; e.currentTarget.style.background = 'transparent' }}
            >
              Let's talk
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} style={{
            display: 'flex', gap: '2.5rem', marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(79,163,192,0.18)',
          }}>
            {[
              { n: '3+', l: 'Years' },
              { n: '10k+', l: 'Users' },
              { n: '5', l: 'Apps shipped' },
            ].map(s => (
              <div key={s.l}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.9rem', fontWeight: 700,
                  color: '#0d3b5e', lineHeight: 1,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem', color: '#7ab3c8',
                  marginTop: '0.25rem', letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Blob behind photo */}
          <div style={{
            position: 'absolute',
            width: '88%', height: '88%',
            background: 'linear-gradient(135deg, rgba(168,216,234,0.5), rgba(79,163,192,0.18))',
            borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
            top: '6%', left: '6%',
            animation: 'blobMorph 8s ease-in-out infinite',
          }} />

          {/* Floating card — location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              position: 'absolute', bottom: '10%', left: '-6%', zIndex: 10,
              background: 'white',
              borderRadius: '14px',
              padding: '0.8rem 1.1rem',
              boxShadow: '0 8px 30px rgba(13,59,94,0.12)',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: '0.55rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>📍</span>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#7ab3c8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Based in</div>
              <div style={{ fontSize: '0.8rem', color: '#0d3b5e', fontWeight: 600, marginTop: '1px' }}>Ajmer, Rajasthan</div>
            </div>
          </motion.div>

          {/* Floating card — experience badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            style={{
              position: 'absolute', top: '4%', right: '-4%', zIndex: 10,
              background: '#0d3b5e',
              borderRadius: '14px',
              padding: '0.9rem 1.2rem',
              boxShadow: '0 8px 30px rgba(13,59,94,0.28)',
              fontFamily: "'DM Sans', sans-serif",
              color: 'white',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, color: 'white',
            }}>3+</div>
            <div style={{
              fontSize: '0.65rem', color: 'rgba(168,216,234,0.75)',
              marginTop: '0.3rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>Years exp.</div>
          </motion.div>

          {/* Photo with organic shape */}
          <div
            className="hero-photo"
            style={{
              position: 'relative', zIndex: 2,
              width: '380px', height: '460px',
              borderRadius: '42% 58% 52% 48% / 40% 48% 52% 60%',
              overflow: 'hidden',
              border: '4px solid rgba(255,255,255,0.85)',
              boxShadow: '0 24px 60px rgba(13,59,94,0.16)',
              animation: 'photoFloat 6s ease-in-out infinite',
            }}
          >
            <img
              src={profilePhoto}
              alt="Seema Khatri"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 55%, rgba(13,59,94,0.12) 100%)',
            }} />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2rem',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.65rem', color: 'rgba(79,163,192,0.5)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        scroll
        <div style={{
          width: '1px', height: '30px',
          background: 'linear-gradient(180deg, rgba(79,163,192,0.5), transparent)',
          animation: 'lineGrow 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes blobMorph {
          0%,100% { border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%; }
          33%      { border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%; }
          66%      { border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; }
        }
        @keyframes photoFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes lineGrow {
          0%,100% { opacity: 0.35; transform: scaleY(0.55); transform-origin: top; }
          50%      { opacity: 1; transform: scaleY(1); }
        }

        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 2rem 1.5rem !important; }
          .hero-photo { width: 260px !important; height: 320px !important; }
        }
      `}</style>
    </section>
  )
}