export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.2rem 3rem',
      background: 'rgba(232, 244, 248, 0.85)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(79, 163, 192, 0.2)',
    }}>
      <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: '#0d3b5e', fontWeight: 600 }}>
         SK
      </span>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem' }}>
        {['Home','About','Skills','Projects','Art','Contact'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              textDecoration: 'none', color: '#4fa3c0',
              fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}