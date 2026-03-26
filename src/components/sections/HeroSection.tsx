'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="flex flex-col"
      style={{ backgroundImage: 'var(--gradient-hero)' }}
    >
      <div className="px-12 pt-20 pb-14 max-w-2xl">

        {/* ── Badge ── */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                        border border-emerald-500/40 bg-emerald-500/6 mb-7">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Available for projects
          </span>
        </div>

        {/* ── Headline ── */}
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground mb-1">
          Davide Sambughi
        </h1>
        <p
          className="text-5xl font-bold leading-tight tracking-tight mb-6"
          style={{ backgroundImage: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          Full-Stack Developer
        </p>

        {/* ── Pitch ── */}
        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
          Specializing in{' '}
          <span className="text-foreground font-medium">Next.js 16</span> and{' '}
          <span className="text-foreground font-medium">Vibe Coding™</span>
          {' '}— building high-performance, GEO-optimized web apps that rank, load fast, and convert.
        </p>

        {/* ── CTAs ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white
                       transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ backgroundImage: 'var(--gradient-brand)' }}
          >
            View Work ↓
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold
                       border border-border text-foreground bg-transparent
                       hover:bg-accent/10 hover:border-primary/40
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Get in Touch
          </button>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="px-12 pb-8 flex items-center gap-3">
        <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-muted-foreground/35 shrink-0">
          Scroll to explore
        </span>

        {/* Track — w-32 = 128px, segment = 1/5 = ~26px */}
        <div className="relative w-32 h-px bg-border overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/5 rounded-full"
            style={{ backgroundImage: 'var(--gradient-brand-h)' }}
            animate={{ x: ['-100%', '500%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          />
        </div>
      </div>

    </section>
  )
}
