import { cn } from '@/lib/utils'

export function AboutSection() {
  return (
    <section id="about" className="px-12 py-16" aria-labelledby="about-title">
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
                Full-Stack Developer / Next.js 16 / Vibe Coding™ Specialist
              </p>
            </div>
          </div>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground/80">
            <p>
              I specialize in building <span className="text-foreground font-semibold">GEO-optimized</span> digital products and high-performance engines. My approach combines the latest in the <span className="text-primary/80 font-medium">Next.js 16</span> ecosystem with a strategic focus on automation and scalability.
            </p>
            <p>
              By embracing <span className="text-foreground font-semibold italic">Vibe Coding™</span>, I leverage AI-first methodologies to compress development cycles, moving from concept to production-ready deployments in record time without compromising on code quality or technical integrity.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/20">
              Identity & Vision
            </span>
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
