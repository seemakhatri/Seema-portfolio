import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #fef9ec 0%, #e8f4f8 60%, #a8d8ea 100%)',
      position: 'relative', overflow: 'hidden', paddingTop: '80px',
    }}>
      {/* Sun */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ marginBottom: '1.5rem' }}
      >
        <div style={{
          width: '90px', height: '90px',
          background: 'radial-gradient(circle, #ffe566, #f7c948, #f5a623)',
          borderRadius: '50%',
          boxShadow: '0 0 60px rgba(247,201,72,0.7), 0 0 120px rgba(247,201,72,0.3)',
          animation: 'pulseSun 4s ease-in-out infinite',
        }} />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{ textAlign: 'center' }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", color: '#4fa3c0', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          ✦ source of my hope ✦
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 300, color: '#0d3b5e', lineHeight: 1.1, marginBottom: '1rem',
        }}>
          I build <em style={{ fontStyle: 'italic', color: '#4fa3c0' }}>beautiful</em><br />things for the web
        </h1>
        <p style={{ color: '#4fa3c0', maxWidth: '400px', lineHeight: 1.6, margin: '0 auto 2rem' }}>
          Angular & Full Stack Developer · Healthcare & Fintech · 3+ Years · Ajmer, Rajasthan
        </p>
        <a href="#about" style={{
          display: 'inline-block', background: '#0d3b5e', color: 'white',
          padding: '0.8rem 2rem', borderRadius: '50px', textDecoration: 'none',
          fontSize: '0.85rem', letterSpacing: '0.05em',
        }}>
          Dive in →
        </a>
      </motion.div>

      <style>{`@keyframes pulseSun { 0%,100%{box-shadow:0 0 60px rgba(247,201,72,.7)} 50%{box-shadow:0 0 100px rgba(247,201,72,.9)} }`}</style>
    </section>
  )
}