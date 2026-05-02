import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { posts } from '../data/post'

// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO ADD POSTS:
//  Add an object to the `posts` array below.
//  Fields: id, title, date, readTime, tags[], excerpt, content (HTML string)
//  When you have 5+ posts → move to /src/data/posts.js and import here.
//  For a full admin panel → see BLOG_ADMIN_GUIDE.md
// ─────────────────────────────────────────────────────────────────────────────



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
  const post = selected !== null ? posts[selected] : null

  return (
    <section
      id="blog"
      ref={ref}
      style={{
        background: '#fdf8f0',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-120px',
          width: '400px', height: '400px',
          border: '1px solid rgba(79,163,192,0.08)',
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
            fontWeight: 800, color: '#0d3b5e',
            lineHeight: 1.02, letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Thoughts on code<br />&amp; craft<span style={{ color: '#4fa3c0' }}>.</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {posts.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(i)}
              style={{
                background: 'white',
                border: '1px solid rgba(13,59,94,0.07)',
                borderRadius: '16px',
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                boxShadow: '0 2px 16px rgba(13,59,94,0.05)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(13,59,94,0.12)'
                e.currentTarget.style.borderColor = 'rgba(79,163,192,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(13,59,94,0.05)'
                e.currentTarget.style.borderColor = 'rgba(13,59,94,0.07)'
              }}
            >
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem', color: '#4fa3c0',
                    background: 'rgba(79,163,192,0.08)',
                    border: '1px solid rgba(79,163,192,0.2)',
                    borderRadius: '5px', padding: '0.2rem 0.6rem',
                    letterSpacing: '0.07em', fontWeight: 500, textTransform: 'uppercase',
                  }}>{t}</span>
                ))}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem', color: '#0d3b5e',
                fontWeight: 700, lineHeight: 1.3,
                letterSpacing: '-0.02em', margin: 0,
              }}>
                {p.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.87rem', color: '#6a9ab0',
                lineHeight: 1.72, flexGrow: 1, margin: 0,
              }}>
                {p.excerpt}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(79,163,192,0.1)',
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', color: '#9ac4d4',
                  letterSpacing: '0.04em',
                }}>
                  {p.readTime} read · {p.date}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem', color: '#4fa3c0',
                  fontWeight: 500, letterSpacing: '0.02em',
                }}>
                  Read →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
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
              background: 'rgba(6,15,30,0.75)',
              backdropFilter: 'blur(12px)',
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
                background: '#fdf8f0',
                borderRadius: '20px',
                maxWidth: '680px', width: '100%',
                padding: '3rem',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                maxHeight: '90vh', overflowY: 'auto',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  background: 'rgba(13,59,94,0.07)',
                  border: '1px solid rgba(13,59,94,0.12)',
                  color: '#0d3b5e', width: '36px', height: '36px',
                  borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif",
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,59,94,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,59,94,0.07)'}
              >
                ✕
              </button>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                {post.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem', color: '#4fa3c0',
                    background: 'rgba(79,163,192,0.08)',
                    border: '1px solid rgba(79,163,192,0.2)',
                    borderRadius: '5px', padding: '0.2rem 0.6rem',
                    letterSpacing: '0.07em', fontWeight: 500, textTransform: 'uppercase',
                  }}>{t}</span>
                ))}
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800, color: '#0d3b5e',
                lineHeight: 1.18, letterSpacing: '-0.03em',
                marginBottom: '0.6rem',
              }}>
                {post.title}
              </h2>

              {/* Meta */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem', color: '#9ac4d4',
                marginBottom: '2.2rem', letterSpacing: '0.04em',
              }}>
                {post.readTime} read · {post.date}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(79,163,192,0.15)', marginBottom: '2.2rem' }} />

              {/* Content */}
              <PostContent html={post.content} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .post-body {
          font-family: 'DM Sans', sans-serif;
          color: #4a7a92;
          line-height: 1.85;
          font-size: 0.95rem;
        }
        .post-body h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #0d3b5e;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 2rem 0 0.7rem;
        }
        .post-body p { margin-bottom: 1rem; }
        .post-body pre {
          background: rgba(13,59,94,0.05);
          border: 1px solid rgba(79,163,192,0.2);
          border-radius: 10px;
          padding: 1rem 1.2rem;
          overflow-x: auto;
          margin: 1.2rem 0;
        }
        .post-body code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.83rem;
          color: #0d3b5e;
        }
        .post-body ul, .post-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .post-body li { margin-bottom: 0.4rem; }
        .post-body strong { color: #0d3b5e; font-weight: 600; }
        .post-body em { font-style: italic; color: #4fa3c0; }
      `}</style>
    </section>
  )
}