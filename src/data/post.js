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
<p>If you've built anything substantial in Angular, you've had that moment — a perfectly logical change isn't reflecting in the UI, or worse, the dreaded <code>TEST_ERROR_TEXT </code>pops up at 11pm before a deadline.</p>
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