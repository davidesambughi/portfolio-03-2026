'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-[90vh] justify-center"
      style={{ backgroundImage: 'var(--gradient-hero)' }}
    >
      <div className="px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-6 py-8">

        {/* ── Left Side: Content (60%) ── */}
        <div className="lg:w-[55%] w-full order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          border border-emerald-500/40 bg-emerald-500/6 mb-7">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Open to opportunities · Jul 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-1">
            Davide Sambughi
          </h1>
          <p
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ backgroundImage: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Full-Stack Developer
          </p>

          {/* Pitch */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            ITS full-stack student on a 5-month internship at a{' '}
            <span className="text-foreground font-medium border-b border-primary/30">Lisbon startup</span>
            {' '}— building multilingual, GEO-optimized web apps with{' '}
            <span className="text-foreground font-medium border-b border-primary/30">Next.js 16</span>
            {' '}and shipping them to production. Career-changer with a business background and no patience for code that doesn't go live.
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

        {/* ── Right Side: Hero Image ── */}
        <div className="lg:w-[45%] w-full order-1 lg:order-2 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            <Image
              src="/images/ai-myself-elegant-light-removebg-preview.png"
              alt="Davide Sambughi"
              width={600}
              height={700}
              className="w-full h-auto"
              priority
            />
          </motion.div>

          {/* Large Radial Glow behind image */}
          <div
            className="absolute inset-0 -z-10 blur-[120px] opacity-25 pointer-events-none"
            style={{ background: 'var(--gradient-brand)' }}
          />
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="px-4 md:px-8 lg:px-12 pb-8 flex items-center gap-3">
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
