import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'About', 'Projects', 'Art', 'Blog', 'Contact']

  const handleReload = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => window.location.reload(), 300)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 3rem',
        background: scrolled ? 'rgba(253,248,240,0.96)' : 'rgba(253,248,240,0.88)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(79,163,192,0.18)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>

        {/* SK — Playfair Display 800, matches Hero name exactly */}
        <button
          onClick={handleReload}
          title="Back to top"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.65rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#0d3b5e',
          }}>
            SK<span style={{ color: '#4fa3c0' }}>.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }} className="desktop-nav">
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={{
                  textDecoration: 'none', color: '#7ab3c8',
                  fontSize: '0.76rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontWeight: 500,
                  transition: 'color 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0d3b5e'}
                onMouseLeave={e => e.currentTarget.style.color = '#7ab3c8'}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#0d3b5e', padding: '4px' }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(253,248,240,0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(79,163,192,0.12)',
          padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
        }}>
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none', color: '#0d3b5e',
                fontSize: '1rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(79,163,192,0.1)',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  )
}