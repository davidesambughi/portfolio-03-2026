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
          {/* Badge + Social links */}
          <div className="flex items-center gap-3 mb-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                            border border-emerald-500/40 bg-emerald-500/6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                Open to opportunities · Jul 2026
              </span>
            </div>

            <a
              href="https://github.com/davidesambughi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                         border border-primary/40 text-primary bg-primary/5
                         hover:border-primary hover:bg-primary/10
                         transition-all duration-200"
            >
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/davide-sambughi-358b903aa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                         border border-primary/40 text-primary bg-primary/5
                         hover:border-primary hover:bg-primary/10
                         transition-all duration-200"
            >
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.98 0 1.775-.773 1.775-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
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
            {' '}and shipping them to production. Career-changer with a business background who treats every project as a lesson — in a field that moves this fast, staying curious isn't optional, it's the job.
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
