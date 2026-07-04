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
  {
    id: 4,
    title: 'Building Thumbnail Roast AI with Gemini Vision',
    date: 'June 2025',
    readTime: '6 min',
    tags: ['AI', 'Gemini', 'React', 'Vision API'],
    excerpt: 'I built a tool that roasts YouTube thumbnails using Google\'s Gemini Vision model. Here\'s what I learned about prompt engineering, image analysis, and building useful AI products.',
    content: `
<h3>The Problem: Thumbnails Are Hard</h3>
<p>Every YouTuber knows the struggle — you spend hours on a thumbnail, but you're too close to it to know if it actually works. What if an AI could give you brutally honest feedback?</p>
<p>That's exactly what <strong>Thumbnail Roast AI</strong> does. Upload any thumbnail, and Gemini Vision analyzes it across multiple dimensions and gives you actionable feedback.</p>
<h3>Why Gemini Over GPT-4 Vision?</h3>
<p>I initially built this with OpenAI's GPT-4 Vision, but switched to <strong>Google's Gemini</strong> for a few reasons:</p>
<ul>
  <li><strong>Better multimodal understanding</strong> — Gemini handles images and text natively</li>
  <li><strong>Faster response times</strong> — ~2-3 seconds vs 5-7 seconds</li>
  <li><strong>More cost-effective</strong> — Gemini is significantly cheaper for vision tasks</li>
  <li><strong>Excellent prompt adherence</strong> — follows structured output instructions well</li>
</ul>
<h3>Technical Approach</h3>
<p>I built this with <strong>React and TypeScript</strong> on the frontend, and used Google's Gemini Vision API for the analysis. The prompt engineering was critical — I had to teach the model what makes a "good" thumbnail and how to give constructive, specific feedback.</p>
<p>Key dimensions the AI evaluates:</p>
<ul>
  <li><strong>Composition</strong> — Is the focal point clear?</li>
  <li><strong>Contrast</strong> — Will it stand out in a crowded feed?</li>
  <li><strong>Readability</strong> — Can you read the text at a glance?</li>
  <li><strong>Emotional Impact</strong> — Does it trigger curiosity or emotion?</li>
  <li><strong>CTR Potential</strong> — Would this make you click?</li>
</ul>
<h3>Key Learnings</h3>
<ul>
  <li>Vision models need specific prompts — "roast this" works better than "analyze this"</li>
  <li>Response time matters — I optimized the API calls with caching</li>
  <li>Users want actionable feedback, not just ratings or scores</li>
  <li>The best feedback is specific: "move the face to the left" not "the composition is bad"</li>
</ul>
<h3>What's Next</h3>
<p>I'm planning to add A/B testing capabilities — let users upload multiple thumbnails and get comparative analysis. Also considering a Chrome extension for creators.</p>
    `,
  },
  {
    id: 5,
    title: 'Supabase vs Firebase: What I Learned After Building 3 Apps',
    date: 'May 2025',
    readTime: '8 min',
    tags: ['Supabase', 'Firebase', 'Database', 'Auth'],
    excerpt: 'After building production apps with both Supabase and Firebase, here\'s my honest take on which one to choose — and why I switched to Supabase for new projects.',
    content: `
<h3>The Context</h3>
<p>Over the last year, I've built three production applications using different backend solutions: Nozomi AI (Supabase + PostgreSQL), a stock dashboard (MongoDB), and a telehealth platform (Firebase). Each taught me something different about what "good" backend looks like.</p>
<h3>Firebase: The Good and The Ugly</h3>
<p>Firebase is <strong>incredibly easy to start</strong>. Authentication, Firestore, Storage — it's all there, and it works. But the real-time database is a blessing and a curse. The data model is denormalized by design, which feels great initially, but becomes a nightmare when your schema evolves.</p>
<p>The querying is limited. You can't do joins. You can't do complex aggregations. And the pricing model — reads, writes, deletes — adds up fast when you have 10,000+ users.</p>
<h3>Supabase: The Sweet Spot</h3>
<p>Supabase is <strong>PostgreSQL with a nice API wrapper</strong>. You get proper relational data modeling, full SQL, row-level security, and real-time subscriptions built on top of Postgres' logical replication.</p>
<p>What I love:</p>
<ul>
  <li><strong>Real SQL</strong> — you can write complex queries with joins, aggregations, window functions</li>
  <li><strong>Better pricing</strong> — one flat rate, no surprise bills</li>
  <li><strong>Database-first</strong> — your database is your source of truth, not an abstraction</li>
</ul>
<h3>When to Choose Each</h3>
<p>Choose <strong>Firebase</strong> if you're building a prototype, need Firestore's real-time sync, or are deeply in the Google ecosystem.</p>
<p>Choose <strong>Supabase</strong> if you're building something that will scale, need complex queries, or want to avoid vendor lock-in.</p>
<p>I've moved all new projects to Supabase. The flexibility and power of Postgres is worth the slightly steeper learning curve.</p>
    `,
  },
  {
    id: 6,
    title: 'From Angular to React: What I Wish I Knew Earlier',
    date: 'April 2025',
    readTime: '6 min',
    tags: ['Angular', 'React', 'Frontend', 'Career'],
    excerpt: 'After 3 years of Angular, I started building with React. Here\'s what surprised me, what frustrated me, and what I actually prefer now.',
    content: `
<h3>The Background</h3>
<p>I've been building with Angular since v16 — state management with NgRx, complex forms, real-time WebSocket integrations. Angular is my comfort zone. But when I started building AI products like Nozomi AI and Thumbnail Roast, I chose React.</p>
<h3>What Surprised Me</h3>
<p><strong>The simplicity.</strong> React is just JavaScript. No decorators, no dependency injection, no module imports. You write functions that return UI. It's refreshingly straightforward.</p>
<p><strong>The ecosystem.</strong> Every problem has 5 solutions. That's both a blessing and a curse. In Angular, you do things "the Angular way." In React, you figure out your own way.</p>
<h3>What Frustrated Me</h3>
<ul>
  <li><strong>No built-in state management</strong> — you have to choose: Redux, Zustand, Context, Jotai...</li>
  <li><strong>Re-renders everywhere</strong> — memo, useMemo, useCallback become essential</li>
  <li><strong>Too much choice</strong> — analysis paralysis is real</li>
</ul>
<h3>What I Prefer</h3>
<p>Angular for <strong>complex enterprise apps</strong> with multiple teams. React for <strong>startups and AI products</strong> where speed and flexibility matter more.</p>
<p>I now work in both, and I'm better for it. Learning React made me a better Angular developer, and vice versa.</p>
    `,
  },
  {
    id: 7,
    title: 'How I Built Nozomi AI — A Perplexity-Style Search Assistant',
    date: 'March 2025',
    readTime: '7 min',
    tags: ['AI', 'React', 'Supabase', 'DeepSeek'],
    excerpt: 'Nozomi AI is my take on Perplexity — an AI search assistant with citations. Here\'s how I built it with React, Bun, Supabase, and DeepSeek.',
    content: `
<h3>The Idea</h3>
<p>Perplexity AI is impressive. But I wanted to build my own version — a search assistant that gives you answers with sources, not just a chat interface.</p>
<h3>Tech Stack</h3>
<ul>
  <li><strong>React + TypeScript</strong> — Frontend</li>
  <li><strong>Bun</strong> — Runtime (faster than Node.js)</li>
  <li><strong>Supabase</strong> — Auth + PostgreSQL database</li>
  <li><strong>DeepSeek</strong> — LLM API through OpenRouter</li>
  <li><strong>Vercel</strong> — Hosting</li>
</ul>
<h3>The Architecture</h3>
<p>I used a RAG (Retrieval-Augmented Generation) pattern:</p>
<ol>
  <li>User asks a question</li>
  <li>Search is performed (using the LLM's knowledge + search tool)</li>
  <li>Sources are retrieved and cited</li>
  <li>LLM synthesizes an answer with citations</li>
  <li>Chat history is saved to PostgreSQL</li>
</ol>
<h3>What I Learned</h3>
<ul>
  <li>Tool calling is the key to making LLMs actually useful</li>
  <li>Streaming responses feels 10x better than waiting for the full response</li>
  <li>Supabase Auth is incredibly easy to set up with OAuth</li>
  <li>Bun is genuinely faster than Node.js — I'm never going back</li>
</ul>
<h3>Try It</h3>
<p>It's live at <a href="https://nozomi-ai.vercel.app" target="_blank">nozomi-ai.vercel.app</a>. Give it a try!</p>
    `,
  },
  {
    id: 8,
    title: 'My Journey into Data Science: From Angular to Python',
    date: 'February 2025',
    readTime: '5 min',
    tags: ['Python', 'Data Science', 'Career', 'Learning'],
    excerpt: 'I\'m a web developer who fell in love with data science. Here\'s why I started learning Python, pandas, and scikit-learn — and how it\'s making me a better engineer.',
    content: `
<h3>Why Data Science?</h3>
<p>I've been building web apps for 3+ years. I'm comfortable with Angular, React, Node.js. But I kept bumping into problems that required more than just CRUD operations.</p>
<p>The stock dashboard needed predictions. The telehealth platform needed patient analytics. The groundwater project needed classification models.</p>
<p>So I started learning data science.</p>
<h3>The Learning Path</h3>
<ul>
  <li><strong>Python first</strong> — it's not hard when you already know JavaScript</li>
  <li><strong>pandas + numpy</strong> — data manipulation that would take hours in SQL</li>
  <li><strong>scikit-learn</strong> — machine learning without the deep learning complexity</li>
  <li><strong>matplotlib + seaborn</strong> — visualizations that actually tell a story</li>
</ul>
<h3>Real Applications</h3>
<p>I've applied this to:</p>
<ul>
  <li><strong>AquaSentinel</strong> — groundwater crisis prediction using Random Forest</li>
  <li><strong>Stock dashboard</strong> — trend analysis and anomaly detection</li>
  <li><strong>Patient analytics</strong> — predicting no-shows and resource allocation</li>
</ul>
<h3>What I've Learned</h3>
<p>Data science has made me a better software engineer. I think about data differently. I structure APIs better. I understand the business value of what I'm building.</p>
<p>I'm still learning. But the intersection of web development and data science is where I want to be.</p>
    `,
  },
  {
    id: 9,
    title: 'The Art of Code: Lessons from 3 Years of Painting',
    date: 'January 2025',
    readTime: '4 min',
    tags: ['Creativity', 'Reflection', 'Career'],
    excerpt: 'I\'ve been painting for 3 years. I\'ve been coding for 4. Here\'s what art has taught me about writing better code.',
    content: `
<h3>Both Are Craft</h3>
<p>Painting and coding feel surprisingly similar. You start with a blank canvas (or empty file). You make a mark. You step back. You adjust. Repeat.</p>
<h3>Lesson 1: Iteration Over Perfection</h3>
<p>No painting looks good after the first layer. You lay down color, it looks wrong, you adjust. Code is the same. Write it, refactor it, ship it.</p>
<h3>Lesson 2: Negative Space</h3>
<p>In art, what you don't paint is as important as what you do. In code, simplicity is the ultimate sophistication.</p>
<h3>Lesson 3: Know When to Stop</h3>
<p>A painting can always be improved. A codebase can always be refactored. The skill is knowing when it's done.</p>
<h3>Lesson 4: Develop Your Voice</h3>
<p>Every artist has a style. Every developer has a way of working. Embrace yours.</p>
    `,
  },
  {
    id: 10,
    title: 'What I Learned Shipping 5 Production Apps in 3 Years',
    date: 'December 2024',
    readTime: '6 min',
    tags: ['Career', 'Reflection', 'Productivity'],
    excerpt: '5 apps. 10,000+ users. 3 years. Here are the 5 most important lessons I learned along the way.',
    content: `
<h3>Lesson 1: Start With The User, Not The Tech</h3>
<p>My first app was built with the "cool" tech stack. Nobody used it. I learned that users don't care about your stack. They care about their problem being solved.</p>
<h3>Lesson 2: Real-time Features Are Hard (But Worth It)</h3>
<p>WebSockets, RxJS, state management — it's complex. But real-time features are what users actually notice. The stock dashboard, the telehealth consultations — these features made the product.</p>
<h3>Lesson 3: State Management Matters</h3>
<p>NgRx, Redux, signals — choose one and commit. My early apps had inconsistent state. My later apps have predictable state flows. Night and day difference.</p>
<h3>Lesson 4: Test The Sad Path</h3>
<p>Every app works when everything works. The difference between a good app and a great app is what happens when things break. Test the error states. Test the edge cases. Test the disconnections.</p>
<h3>Lesson 5: Ship Early, Ship Often</h3>
<p>Perfection is the enemy of shipping. I used to wait until everything was "perfect." Now I ship early, get feedback, and iterate. Users tell you what actually matters.</p>
    `,
  },
];