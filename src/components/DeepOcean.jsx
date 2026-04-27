import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useRef as useCanvasRef } from 'react'

// Floating particles (bubbles rising)
const bubbles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${8 + Math.random() * 10}s`,
  size: `${3 + Math.random() * 6}px`,
  opacity: 0.2 + Math.random() * 0.5,
}))

// Ocean creatures data
const creatures = [
  {
    id: 'jellyfish1',
    emoji: null,
    svg: 'jellyfish',
    left: '8%', top: '15%',
    size: 80,
    animDuration: 7,
    animDelay: 0,
    color: '#a78bfa',
  },
  {
    id: 'jellyfish2',
    emoji: null,
    svg: 'jellyfish',
    left: '78%', top: '55%',
    size: 55,
    animDuration: 9,
    animDelay: 3,
    color: '#67e8f9',
  },
  {
    id: 'fish1',
    emoji: null,
    svg: 'fish',
    left: '15%', top: '65%',
    size: 50,
    animDuration: 12,
    animDelay: 1,
    color: '#34d399',
    dir: 1,
  },
  {
    id: 'fish2',
    emoji: null,
    svg: 'fish',
    left: '60%', top: '25%',
    size: 35,
    animDuration: 9,
    animDelay: 5,
    color: '#fbbf24',
    dir: -1,
  },
  {
    id: 'fish3',
    emoji: null,
    svg: 'fish',
    left: '85%', top: '78%',
    size: 42,
    animDuration: 14,
    animDelay: 2,
    color: '#f472b6',
    dir: 1,
  },
  {
    id: 'coral1',
    svg: 'coral',
    left: '0%', top: '72%',
    size: 110,
    color: '#f87171',
  },
  {
    id: 'coral2',
    svg: 'coral',
    left: '82%', top: '75%',
    size: 90,
    color: '#c084fc',
  },
  {
    id: 'coral3',
    svg: 'coral',
    left: '40%', top: '80%',
    size: 70,
    color: '#fb923c',
  },
  {
    id: 'seaweed1',
    svg: 'seaweed',
    left: '25%', top: '68%',
    size: 100,
    color: '#4ade80',
    animDuration: 4,
    animDelay: 0,
  },
  {
    id: 'seaweed2',
    svg: 'seaweed',
    left: '55%', top: '70%',
    size: 80,
    color: '#22d3ee',
    animDuration: 5,
    animDelay: 1.5,
  },
  {
    id: 'turtle',
    svg: 'turtle',
    left: '45%', top: '18%',
    size: 65,
    animDuration: 18,
    animDelay: 0,
    color: '#86efac',
  },
  {
    id: 'starfish',
    svg: 'starfish',
    left: '70%', top: '82%',
    size: 40,
    color: '#fde68a',
  },
]

// SVG creature renderers
function Jellyfish({ size, color }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" fill="none">
      {/* Bell */}
      <ellipse cx="30" cy="28" rx="26" ry="22"
        fill={color} fillOpacity="0.25"
        stroke={color} strokeOpacity="0.7" strokeWidth="1.5" />
      {/* Inner glow */}
      <ellipse cx="30" cy="26" rx="16" ry="13"
        fill={color} fillOpacity="0.15" />
      {/* Highlight */}
      <ellipse cx="22" cy="18" rx="7" ry="4"
        fill="white" fillOpacity="0.2" />
      {/* Tentacles */}
      {[18, 23, 28, 33, 38, 42].map((x, i) => (
        <path key={i}
          d={`M${x} 48 Q${x + (i % 2 === 0 ? -5 : 5)} ${56 + i * 3} ${x + (i % 2 === 0 ? 3 : -3)} ${68 + i * 2}`}
          stroke={color} strokeOpacity="0.5" strokeWidth="1.2"
          fill="none" strokeLinecap="round" />
      ))}
    </svg>
  )
}

function Fish({ size, color, dir = 1 }) {
  return (
    <svg width={size * 1.6} height={size} viewBox="0 0 80 50"
      fill="none" style={{ transform: dir === -1 ? 'scaleX(-1)' : 'none' }}>
      {/* Body */}
      <ellipse cx="38" cy="25" rx="28" ry="16"
        fill={color} fillOpacity="0.7" />
      {/* Tail */}
      <path d="M10 25 L0 10 L0 40 Z"
        fill={color} fillOpacity="0.5" />
      {/* Fin top */}
      <path d="M30 10 Q38 2 46 9"
        stroke={color} strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
      {/* Stripe */}
      <ellipse cx="42" cy="25" rx="8" ry="10"
        fill="white" fillOpacity="0.12" />
      {/* Eye */}
      <circle cx="58" cy="22" r="4" fill="white" fillOpacity="0.9" />
      <circle cx="59" cy="22" r="2" fill="#1a1a2e" />
      <circle cx="60" cy="21" r="0.8" fill="white" />
      {/* Scales hint */}
      <path d="M35 18 Q40 22 35 26" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <path d="M42 17 Q47 22 42 27" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
    </svg>
  )
}

function Coral({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M40 75 L40 45" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 55 Q25 45 20 30 Q18 20 25 15 Q32 10 35 20 Q37 30 40 45"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 60 Q55 50 60 35 Q63 22 56 17 Q49 12 46 22 Q43 33 40 45"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 50 Q30 38 28 25" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M40 52 Q52 42 54 30" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Tips */}
      {[[20,15],[25,10],[60,17],[55,12],[28,24],[54,29]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill={color} fillOpacity="0.8" />
      ))}
    </svg>
  )
}

function Seaweed({ size, color }) {
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 20 100" fill="none">
      <path d="M10 95 Q2 80 10 65 Q18 50 10 35 Q2 20 10 5"
        stroke={color} strokeWidth="3" strokeLinecap="round"
        fill="none" strokeOpacity="0.7" />
      <path d="M10 85 Q18 75 15 62" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
      <path d="M10 60 Q2 50 5 38" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
    </svg>
  )
}

function Turtle({ size, color }) {
  return (
    <svg width={size * 1.3} height={size} viewBox="0 0 90 70" fill="none">
      {/* Shell */}
      <ellipse cx="45" cy="35" rx="28" ry="22"
        fill={color} fillOpacity="0.5"
        stroke={color} strokeOpacity="0.8" strokeWidth="1.5" />
      {/* Shell pattern */}
      <ellipse cx="45" cy="35" rx="18" ry="14" stroke={color} strokeOpacity="0.4" strokeWidth="1" fill="none" />
      <line x1="45" y1="21" x2="45" y2="49" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
      <line x1="27" y1="35" x2="63" y2="35" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
      {/* Head */}
      <circle cx="70" cy="30" r="9"
        fill={color} fillOpacity="0.7" />
      <circle cx="73" cy="27" r="2.5" fill="#1a1a2e" />
      <circle cx="74" cy="26" r="1" fill="white" />
      {/* Flippers */}
      <ellipse cx="25" cy="20" rx="10" ry="5" fill={color} fillOpacity="0.5"
        transform="rotate(-30 25 20)" />
      <ellipse cx="25" cy="50" rx="10" ry="5" fill={color} fillOpacity="0.5"
        transform="rotate(30 25 50)" />
      <ellipse cx="63" cy="18" rx="8" ry="4" fill={color} fillOpacity="0.4"
        transform="rotate(-20 63 18)" />
      <ellipse cx="63" cy="52" rx="8" ry="4" fill={color} fillOpacity="0.4"
        transform="rotate(20 63 52)" />
      {/* Tail */}
      <path d="M18 35 Q8 38 4 35" stroke={color} strokeWidth="3"
        strokeLinecap="round" fill="none" strokeOpacity="0.6" />
    </svg>
  )
}

function Starfish({ size, color }) {
  const points = Array.from({ length: 5 }, (_, i) => {
    const outer = (i * 72 - 90) * Math.PI / 180
    const inner = ((i * 72 + 36) - 90) * Math.PI / 180
    const ox = 20 + 18 * Math.cos(outer)
    const oy = 20 + 18 * Math.sin(outer)
    const ix = 20 + 7 * Math.cos(inner)
    const iy = 20 + 7 * Math.sin(inner)
    return `${ox},${oy} ${ix},${iy}`
  }).join(' ')
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <polygon points={points}
        fill={color} fillOpacity="0.7"
        stroke={color} strokeWidth="1" strokeOpacity="0.9" />
      <circle cx="20" cy="20" r="5" fill={color} fillOpacity="0.9" />
    </svg>
  )
}

function renderCreature(c) {
  switch (c.svg) {
    case 'jellyfish': return <Jellyfish size={c.size} color={c.color} />
    case 'fish': return <Fish size={c.size} color={c.color} dir={c.dir} />
    case 'coral': return <Coral size={c.size} color={c.color} />
    case 'seaweed': return <Seaweed size={c.size} color={c.color} />
    case 'turtle': return <Turtle size={c.size} color={c.color} />
    case 'starfish': return <Starfish size={c.size} color={c.color} />
    default: return null
  }
}

export default function DeepOcean() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(180deg, #1a6b8a 0%, #0d3b5e 40%, #060f1e 100%)',
      padding: '10rem 2rem 14rem',
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
    }}>

      {/* ── Light rays from above ── */}
      {[15, 30, 50, 68, 82].map((left, i) => (
        <div key={i} style={{
          position: 'absolute', top: 0, left: `${left}%`,
          width: `${30 + i * 8}px`,
          height: '55%',
          background: `linear-gradient(180deg, rgba(168,216,234,${0.06 + i * 0.01}) 0%, transparent 100%)`,
          transform: `rotate(${-8 + i * 4}deg)`,
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Rising bubbles ── */}
      {bubbles.map(b => (
        <div key={b.id} style={{
          position: 'absolute', left: b.left,
          bottom: 0,
          width: b.size, height: b.size,
          borderRadius: '50%',
          border: `1px solid rgba(168,216,234,${b.opacity})`,
          background: `rgba(168,216,234,0.04)`,
          animation: `rise ${b.duration} ${b.delay} linear infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Ocean creatures ── */}
      {creatures.map(c => {
        const isAnimate = ['jellyfish', 'fish', 'seaweed', 'turtle'].includes(c.svg)
        const isSwimmer = ['fish', 'turtle'].includes(c.svg)
        const isWave = c.svg === 'seaweed'

        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0 }}
            animate={inView
              ? {
                  opacity: 1,
                  y: isAnimate && !isSwimmer && !isWave
                    ? [0, -18, 0]       // jellyfish bob
                    : 0,
                  x: isSwimmer
                    ? [0, 30, 0]        // fish/turtle drift
                    : 0,
                  rotate: isWave
                    ? [-6, 6, -6]       // seaweed sway
                    : 0,
                }
              : {}}
            transition={{
              opacity: { duration: 1.2, delay: Math.random() * 1.5 },
              y: { duration: c.animDuration || 6, repeat: Infinity, ease: 'easeInOut', delay: c.animDelay || 0 },
              x: { duration: c.animDuration || 12, repeat: Infinity, ease: 'easeInOut', delay: c.animDelay || 0 },
              rotate: { duration: c.animDuration || 4, repeat: Infinity, ease: 'easeInOut', delay: c.animDelay || 0 },
            }}
            style={{
              position: 'absolute',
              left: c.left, top: c.top,
              pointerEvents: 'none',
              filter: `drop-shadow(0 0 8px ${c.color}55)`,
            }}
          >
            {renderCreature(c)}
          </motion.div>
        )
      })}

      {/* ── Sandy floor hint ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(194,154,108,0.12) 60%, rgba(194,154,108,0.22) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Center text ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          maxWidth: '700px', margin: '0 auto',
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}
      >
      
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
          color: 'white', fontWeight: 300, lineHeight: 1.3, marginBottom: '1.5rem',
        }}>
          Sharing the inner<br />creative child
        </h2>
        <p style={{
          color: 'rgba(168,216,234,0.9)', lineHeight: 1.8,
          maxWidth: '540px', margin: '0 auto',
        }}>
          Every project is a dive into the deep. I specialize in Angular architecture,
          real-time systems, and UI that makes users feel something. Currently upskilling in
          Angular Signals, Zoneless Change Detection & Cloud fundamentals.
        </p>
      </motion.div>

      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0)   translateX(0);   opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateY(-45vh) translateX(12px); }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-95vh) translateX(-8px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}