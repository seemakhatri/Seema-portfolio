import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { posts } from '../data/post'

function PostContent({ html }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="post-body"
    />
  )
}

export default function Blog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)
  const [visibleCount, setVisibleCount] = useState(3)
  const post = selected !== null ? posts[selected] : null
  const hasMore = visibleCount < posts.length
  const visiblePosts = posts.slice(0, visibleCount)

  return (
    <section
      id="blog"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #0a1628 0%, #060f1e 100%)',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-120px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translateX(-50%)',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(79,163,192,0.02) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        {/* Subtle ring */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-120px',
          width: '400px', height: '400px',
          border: '1px solid rgba(79,163,192,0.04)',
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
            Writing
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 800, color: 'white',
            lineHeight: 1.02, letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Thoughts on code<br />&amp; craft<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem',
            color: 'rgba(168,216,234,0.4)',
            marginTop: '0.8rem',
            letterSpacing: '0.02em',
          }}>
            Articles on Angular, real-time systems, and the intersection of code & creativity.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {visiblePosts.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(i)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(79,163,192,0.06)',
                borderRadius: '16px',
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)'
                e.currentTarget.style.borderColor = 'rgba(79,163,192,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)'
                e.currentTarget.style.borderColor = 'rgba(79,163,192,0.06)'
              }}
            >
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.6rem', color: 'rgba(168,216,234,0.6)',
                    background: 'rgba(79,163,192,0.06)',
                    border: '1px solid rgba(79,163,192,0.1)',
                    borderRadius: '4px', padding: '0.2rem 0.6rem',
                    letterSpacing: '0.07em', fontWeight: 500, textTransform: 'uppercase',
                  }}>{t}</span>
                ))}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem', color: 'white',
                fontWeight: 700, lineHeight: 1.3,
                letterSpacing: '-0.02em', margin: 0,
              }}>
                {p.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.87rem', color: 'rgba(168,216,234,0.5)',
                lineHeight: 1.72, flexGrow: 1, margin: 0,
              }}>
                {p.excerpt}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(79,163,192,0.06)',
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem', color: 'rgba(168,216,234,0.3)',
                  letterSpacing: '0.04em',
                }}>
                  {p.readTime} read · {p.date}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem', color: '#4fa3c0',
                  fontWeight: 500, letterSpacing: '0.02em',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  Read →
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ─── VIEW MORE BUTTON ─── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '3rem',
            }}
          >
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 3, posts.length))}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'rgba(79,163,192,0.06)',
                border: '1px solid rgba(79,163,192,0.12)',
                color: 'rgba(168,216,234,0.7)',
                padding: '0.8rem 2.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(79,163,192,0.12)'
                e.currentTarget.style.borderColor = 'rgba(79,163,192,0.25)'
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,163,192,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(79,163,192,0.06)'
                e.currentTarget.style.borderColor = 'rgba(79,163,192,0.12)'
                e.currentTarget.style.color = 'rgba(168,216,234,0.7)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>↓</span>
              View More Posts ({posts.length - visibleCount} remaining)
            </button>
          </motion.div>
        )}

        {/* ─── SHOWING COUNT ─── */}
        {visibleCount > 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              color: 'rgba(168,216,234,0.2)',
              textAlign: 'center',
              marginTop: '1.2rem',
              letterSpacing: '0.06em',
            }}
          >
            Showing {visibleCount} of {posts.length} posts
          </motion.p>
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {post && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(6,15,30,0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
              overflowY: 'auto',
            }}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0a1628',
                borderRadius: '20px',
                maxWidth: '680px', width: '100%',
                padding: '3rem',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                border: '1px solid rgba(79,163,192,0.06)',
                maxHeight: '90vh', overflowY: 'auto',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.4)', width: '36px', height: '36px',
                  borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                }}
              >
                ✕
              </button>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                {post.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.6rem', color: 'rgba(168,216,234,0.6)',
                    background: 'rgba(79,163,192,0.06)',
                    border: '1px solid rgba(79,163,192,0.1)',
                    borderRadius: '4px', padding: '0.2rem 0.6rem',
                    letterSpacing: '0.07em', fontWeight: 500, textTransform: 'uppercase',
                  }}>{t}</span>
                ))}
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800, color: 'white',
                lineHeight: 1.18, letterSpacing: '-0.03em',
                marginBottom: '0.6rem',
              }}>
                {post.title}
              </h2>

              {/* Meta */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem', color: 'rgba(168,216,234,0.3)',
                marginBottom: '2.2rem', letterSpacing: '0.04em',
              }}>
                {post.readTime} read · {post.date}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(79,163,192,0.06)', marginBottom: '2.2rem' }} />

              {/* Content */}
              <PostContent html={post.content} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .post-body {
          font-family: 'DM Sans', sans-serif;
          color: rgba(168,216,234,0.7);
          line-height: 1.85;
          font-size: 0.95rem;
        }
        .post-body h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: white;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 2rem 0 0.7rem;
        }
        .post-body p { 
          margin-bottom: 1rem; 
        }
        .post-body a {
          color: #4fa3c0;
          text-decoration: none;
          border-bottom: 1px solid rgba(79,163,192,0.2);
          transition: border-color 0.2s;
        }
        .post-body a:hover {
          border-color: #4fa3c0;
        }
        .post-body pre {
          background: rgba(79,163,192,0.04);
          border: 1px solid rgba(79,163,192,0.08);
          border-radius: 10px;
          padding: 1rem 1.2rem;
          overflow-x: auto;
          margin: 1.2rem 0;
        }
        .post-body code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.83rem;
          color: #4fa3c0;
        }
        .post-body ul, .post-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .post-body li { 
          margin-bottom: 0.4rem; 
        }
        .post-body strong { 
          color: white; 
          font-weight: 600; 
        }
        .post-body em { 
          font-style: italic; 
          color: #4fa3c0; 
        }
        .post-body blockquote {
          border-left: 3px solid rgba(79,163,192,0.3);
          padding-left: 1.2rem;
          margin: 1.2rem 0;
          color: rgba(168,216,234,0.5);
          font-style: italic;
        }
        /* Scrollbar styling */
        .post-body ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .post-body ::-webkit-scrollbar-track {
          background: rgba(79,163,192,0.04);
          border-radius: 3px;
        }
        .post-body ::-webkit-scrollbar-thumb {
          background: rgba(79,163,192,0.2);
          border-radius: 3px;
        }
        .post-body ::-webkit-scrollbar-thumb:hover {
          background: rgba(79,163,192,0.3);
        }
      `}</style>
    </section>
  )
}