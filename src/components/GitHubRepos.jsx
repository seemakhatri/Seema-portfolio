import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const GITHUB_USERNAME = 'seemakhatri' // 👈 replace this

const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  default: '#4fa3c0',
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork).slice(0, 6))
        } else {
          setError(true)
        }
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(180deg, #0a1628 0%, #060f1e 100%)',
      padding: '6rem 2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem,3.5vw,3rem)',
          color: 'white', fontWeight: 300, textAlign: 'center', marginBottom: '0.3rem',
        }}>
          Open Source
        </h2>
        <p style={{
          fontFamily: "'Caveat', cursive", color: '#4fa3c0',
          textAlign: 'center', fontSize: '1.1rem', marginBottom: '3rem',
        }}>
          live from GitHub · auto-updated ✦
        </p>

        {loading && (
          <div style={{ textAlign: 'center' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                height: '140px', borderRadius: '16px', marginBottom: '1rem',
                background: 'rgba(255,255,255,0.04)',
                animation: 'shimmer 1.5s ease-in-out infinite',
                maxWidth: '900px', margin: '0 auto 1rem',
              }} />
            ))}
            <style>{`
              @keyframes shimmer {
                0%,100% { opacity: 0.4; }
                50% { opacity: 0.8; }
              }
            `}</style>
          </div>
        )}

        {error && (
          <p style={{ textAlign: 'center', color: 'rgba(168,216,234,0.5)', fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}>
            couldn't reach GitHub right now — check back soon 🌊
          </p>
        )}

        {!loading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem', maxWidth: '1000px', margin: '0 auto',
          }}>
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(79,163,192,0.15)',
                  borderRadius: '16px', padding: '1.4rem',
                  textDecoration: 'none', display: 'flex',
                  flexDirection: 'column', gap: '0.6rem',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,163,192,0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(79,163,192,0.15)'}
              >
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem' }}>📁</span>
                  <span style={{
                    fontSize: '0.7rem', color: '#a8d8ea', letterSpacing: '0.08em',
                    textTransform: 'uppercase', opacity: 0.6,
                  }}>
                    {repo.visibility}
                  </span>
                </div>

                {/* Name */}
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem', color: 'white', fontWeight: 400,
                }}>
                  {repo.name.replace(/-/g, ' ')}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.82rem', color: 'rgba(168,216,234,0.65)',
                  lineHeight: 1.6, flexGrow: 1,
                }}>
                  {repo.description || 'no description yet'}
                </p>

                {/* Footer */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.4rem' }}>
                  {repo.language && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'rgba(168,216,234,0.6)' }}>
                      <span style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: LANG_COLORS[repo.language] || LANG_COLORS.default,
                        flexShrink: 0,
                      }} />
                      {repo.language}
                    </span>
                  )}
                  <span style={{ fontSize: '0.78rem', color: 'rgba(168,216,234,0.5)' }}>
                    ⭐ {repo.stargazers_count}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(168,216,234,0.5)' }}>
                    🍴 {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          
           <a href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.7rem 2rem',
              border: '1px solid rgba(168,216,234,0.3)',
              borderRadius: '50px', color: '#a8d8ea',
              textDecoration: 'none', fontSize: '0.85rem',
              letterSpacing: '0.05em',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            view all on GitHub →
          </a>
        </div>
      </motion.div>
    </section>
  )
}