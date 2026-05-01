import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO ADD POSTS:
//  Add an object to the `posts` array below.
//  Fields: id, title, date, readTime, tags[], excerpt, content (HTML string)
//  When you have 5+ posts → move to /src/data/posts.js and import here.
//  For a full admin panel → see BLOG_ADMIN_GUIDE.md
// ─────────────────────────────────────────────────────────────────────────────

export const posts = [
  {
    id: 1,
    title: 'Angular Signals: Why I Stopped Dreading Change Detection',
    date: 'April 2025',
    readTime: '5 min',
    tags: ['Angular', 'Signals', 'Performance'],
    excerpt: 'After years of debugging ExpressionChangedAfterItHasBeenCheckedError, Angular Signals felt like a breath of fresh air. Here\'s what changed.',
    content: `
<h3>The Problem With Zone.js</h3>
<p>If you've built anything substantial in Angular, you've had that moment — a perfectly logical change isn't reflecting in the UI, or worse, the dreaded <code>ExpressionChangedAfterItHasBeenCheckedError</code> pops up at 11pm before a deadline.</p>
<p>Zone.js wraps every async operation and triggers change detection broadly. It works — until it doesn't, and then debugging it feels like archaeology.</p>
<h3>Enter Signals</h3>
<p>Angular Signals (stable in v17+) are reactive primitives. Instead of Angular watching everything, you declare exactly what's reactive:</p>
<pre><code>const count = signal(0);
const doubled = computed(() => count() * 2);
// In template: {{ doubled() }}</code></pre>
<p>The UI only updates when the signal changes. No Zone.js. No magic. Just data flow you can trace with your eyes.</p>
<h3>What Changed In Production</h3>
<p>On our stock dashboard at Arka, we had a deeply nested component tree re-rendering on every WebSocket tick. After migrating the price feed to signals:</p>
<ul>
  <li>Reduced unnecessary re-renders by ~60%</li>
  <li>Debuggability improved dramatically — the reactivity graph is explicit</li>
  <li>New devs understood the data flow on day one</li>
</ul>
<h3>Should You Migrate Now?</h3>
<p>If you're on Angular 17+, start with new features using signals. Don't rewrite everything — that's expensive and risky. Introduce signals at leaf components and work inward. The future is Zoneless Angular. Signals are how you get there incrementally.</p>
    `,
  },
  {
    id: 2,
    title: 'Building Real-Time Features Without Losing Your Mind',
    date: 'March 2025',
    readTime: '7 min',
    tags: ['WebSockets', 'RxJS', 'Architecture'],
    excerpt: 'WebSockets are powerful but messy to manage at scale. Here\'s the architecture pattern I use in production — with reconnection logic and clean teardown.',
    content: `
<h3>The Naive Approach (And Why It Breaks)</h3>
<p>Most tutorials show you how to open a WebSocket connection. Few show you what happens when the connection drops, the server restarts, or the user navigates away and back.</p>
<p>I learned this the hard way building a live stock dashboard. Users would lose data silently when connections dropped — no error, no reload, just stale prices.</p>
<h3>The Pattern I Use</h3>
<p>Wrap your WebSocket in an RxJS Observable with retry logic:</p>
<pre><code>function createReconnectingWS(url: string) {
  return new Observable(observer => {
    const ws = new WebSocket(url);
    ws.onmessage = e => observer.next(JSON.parse(e.data));
    ws.onerror = e => observer.error(e);
    ws.onclose = () => observer.complete();
    return () => ws.close();
  }).pipe(
    retry({ delay: 3000 }),
    share()
  );
}</code></pre>
<h3>Key Principles</h3>
<ul>
  <li><strong>Always unsubscribe</strong> — use <code>takeUntilDestroyed()</code> in Angular 16+</li>
  <li><strong>Show connection state</strong> — users deserve to know if data is live</li>
  <li><strong>Buffer on reconnect</strong> — don't show stale data, show a loading state</li>
  <li><strong>Test the sad path</strong> — kill your server mid-session and see what happens</li>
</ul>
<h3>In Production</h3>
<p>For Docty, real-time consultation status updates couldn't afford to drop. We combined the reconnecting WebSocket with an NgRx action queue that replayed missed events on reconnection. Zero data loss in 6 months of production.</p>
    `,
  },
  {
    id: 3,
    title: 'Why I Paint — And How It Makes Me a Better Developer',
    date: 'February 2025',
    readTime: '4 min',
    tags: ['Creativity', 'Craft', 'Reflection'],
    excerpt: 'There\'s something about standing in front of a blank canvas that rewires how you approach a blank codebase. My theory on why creative hobbies make better engineers.',
    content: `
<h3>The Blank Canvas Problem</h3>
<p>When I paint, the hardest moment is the first brushstroke. Not because I don't know what I want to make — but because that first mark commits you to a direction. Code is the same. The first component, the first data model — it shapes everything that follows.</p>
<h3>Painting Teaches Iteration</h3>
<p>No painting looks like the reference after the first layer. You lay down a wash of colour, step back, see what's wrong, and adjust. Layer by layer, it converges on something good.</p>
<p>I used to want my code to be perfect on the first pass. Painting broke me of that. Now I write a working version first, then refactor — and I'm faster for it.</p>
<h3>Negative Space</h3>
<p>In art school they teach you to paint what's <em>around</em> the object, not the object itself. The negative space defines the form.</p>
<p>In UI design, whitespace is the negative space. Most junior developers pack too much onto a screen. Painting taught me that what you leave out matters as much as what you put in.</p>
<h3>On This Portfolio</h3>
<p>This site is my attempt to merge both worlds. The ocean theme, the deep blues, the handwritten-style accents — they come from the same place as my paintings. I wanted a portfolio that felt like a person made it, not a template.</p>
    `,
  },
]

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