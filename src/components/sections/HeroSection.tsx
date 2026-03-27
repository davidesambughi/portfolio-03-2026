'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-[90vh] justify-center"
      style={{ backgroundImage: 'var(--gradient-hero)' }}
    >
      <div className="px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">
        
        {/* ── Left Side: Content (60%) ── */}
        <div className="flex-1 max-w-2xl order-2 lg:order-1">
          {/* Badge */}
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

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground mb-1">
            Davide Sambughi
          </h1>
          <p
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ backgroundImage: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Full-Stack Developer
          </p>

          {/* Pitch */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Specializing in{' '}
            <span className="text-foreground font-medium border-b border-primary/30">Next.js 16</span> and{' '}
            <span className="text-foreground font-medium border-b border-primary/30">Vibe Coding™</span>
            {' '}— building high-performance, GEO-optimized web apps that rank, load fast, and convert.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white
                         transition-all duration-300 hover:opacity-95 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-glow-primary"
              style={{ backgroundImage: 'var(--gradient-brand)' }}
            >
              View Work ↓
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-lg text-sm font-semibold
                         border border-border text-foreground bg-card/40 backdrop-blur-sm
                         hover:bg-accent/10 hover:border-primary/40
                         transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* ── Right Side: Visual Placeholder (40%) ── */}
        <div className="lg:w-[40%] w-full aspect-square relative order-1 lg:order-2 group">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "w-full h-full rounded-3xl border-2 border-dashed border-border/40 bg-card/20 backdrop-blur-[2px]",
              "flex flex-col items-center justify-center gap-4 transition-all duration-500",
              "group-hover:border-primary/30 group-hover:bg-card/30"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl border border-border/60 bg-muted/40 flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 rounded-full bg-primary/20 blur-[4px]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/30">
                Visual Concept
              </span>
            </div>

            {/* Geometric accents inside placeholder */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-border/20 rounded-tl-lg" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-border/20 rounded-br-lg" />
          </motion.div>
          
          {/* Large Radial Glow behind placeholder */}
          <div 
            className="absolute inset-0 -z-10 blur-[120px] opacity-20 pointer-events-none scale-110"
            style={{ background: 'var(--gradient-brand)' }}
          />
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="px-12 pb-8 flex items-center gap-3">
        <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-muted-foreground/35 shrink-0">
          Scroll to explore
        </span>

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
