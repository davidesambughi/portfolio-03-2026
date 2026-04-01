import { cn } from '@/lib/utils'

const LEARNING = [
  { topic: 'n8n', detail: 'workflow automation — implementing now in the NIF project' },
  { topic: 'Architecture & Design Systems', detail: 'structured component design, token-based theming' },
  { topic: 'Product Thinking', detail: 'from feature request to user outcome' },
]

export function AboutSection() {
  return (
    <section id="about" className="px-4 md:px-8 lg:px-12 py-16" aria-labelledby="about-title">
      <h2 id="about-title" className="sr-only">About Davide Sambughi</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* ── Left Side: Identity & Bio (65%) ── */}
        <div className="lg:w-[65%] space-y-10 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar Badge */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-glow-primary shrink-0"
              style={{ background: 'var(--gradient-brand)' }}
            >
              DS
            </div>

            <div className="space-y-1.5">
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                Davide Sambughi
              </h3>
              <p className="text-sm font-medium text-muted-foreground/60 leading-relaxed uppercase tracking-[0.2em]">
                Full-Stack Developer · InspectOs Intern · Lisbon, PT
              </p>
            </div>
          </div>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground/80">
            <p>
              I&apos;m currently finishing a two-year{' '}
              <span className="text-foreground font-medium">ITS diploma in full-stack development</span> (graduating July 2026)
              and five months into an international internship at{' '}
              <span className="text-foreground font-medium">InspectOs</span>, a Lisbon-based real estate startup,
              where I build SEO and GEO-optimized multilingual web applications with Next.js 16.
            </p>
            <p>
              Before code, five years across <span className="text-foreground font-medium">Australia</span> — hospitality,
              construction, agriculture — taught me to operate in environments where adaptability isn&apos;t optional
              and no one hands you the answer. Before that, a decade managing the client side of our{' '}
              <span className="text-foreground font-medium">family insurance business</span> taught me something
              most junior developers take years to learn: how to understand what someone actually needs before
              they know how to ask for it.
            </p>
            <p>
              The journey is just starting — and I&apos;m aware of how much there is still to learn. What I already
              know is that I work best when there&apos;s something real at stake: a{' '}
              <span className="text-foreground font-semibold">real codebase, a real deadline, a real product</span>.
              The projects here were built during an internship, not a tutorial — and that difference
              shows up in every edge case I had to figure out on my own.
            </p>
          </div>

          {/* Currently Learning */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border/40" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/30">
                Currently Learning
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>
            <ul className="space-y-2.5">
              {LEARNING.map(({ topic, detail }) => (
                <li key={topic} className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-primary/50 shrink-0">›</span>
                  <span>
                    <span className="text-foreground font-medium">{topic}</span>
                    <span className="text-muted-foreground/60"> — {detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right Side: Photo Carousel Placeholder (35%) ── */}
        <div className="lg:w-[35%] w-full min-h-[350px] relative group">
          <div className={cn(
            "w-full h-full rounded-2xl border-2 border-dashed border-border/40 bg-muted/5",
            "flex flex-col items-center justify-center gap-4 transition-colors duration-300 group-hover:border-primary/20"
          )}>
            <div className="flex flex-col items-center gap-2 text-center p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/30">
                Photo Carousel
              </span>
              <span className="text-[10px] text-muted-foreground/20 leading-tight">
                Your portrait / photos will fit here perfectly
              </span>
            </div>

            {/* Pagination Indicators Placeholder */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    i === 0 ? "bg-primary w-4" : "bg-border/60"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Decorative Glow behind placeholder */}
          <div
            className="absolute inset-0 -z-10 blur-[80px] opacity-10 pointer-events-none scale-75"
            style={{ background: 'var(--gradient-brand)' }}
          />
        </div>
      </div>
    </section>
  )
}
