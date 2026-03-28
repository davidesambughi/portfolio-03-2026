'use client'

import Image from 'next/image'
import { useState, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe, Lock, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PROJECTS = [
  {
    icon: Building2,
    hue: '276.97',
    title: 'GetNIF Portugal',
    slug: 'getnifportugal.com',
    image: '/images/getNifPortugal.png',
    url: 'https://nif-saas-nextjs16.vercel.app/en',
    alt: 'Screenshot of GetNIF Portugal platform',
    description:
      'SaaS platform to obtain a Portuguese NIF remotely — Stripe checkout, signed document uploads, realtime admin dashboard, and trilingual support (EN/PT/FR). No Portugal visit required.',
    tags: ['Next.js 16', 'Supabase', 'Stripe', 'Resend', 'i18n'],
    status: 'WIP' as const,
  },
  {
    icon: Globe,
    hue: '293.01',
    title: 'Raising Kids In Portugal',
    slug: 'raisingkidsinportugal.com',
    image: '/images/raisingkidsinportugal.png',
    url: 'https://raisingkidsinportugal.com',
    alt: 'Screenshot of Raising Kids in Portugal platform',
    description:
      '77 schools and 64 neighborhoods indexed for expat families relocating to Portugal — ISR across 6 locales, full JSON-LD suite, and speakable schema targeting AI Overviews.',
    tags: ['Next.js 16', 'next-intl', 'ISR', 'GEO/SEO'],
    status: 'LIVE' as const,
  },
]

const STATUS_STYLES = {
  LIVE:    { dot: 'bg-emerald-500', badge: 'border-emerald-500/40 text-emerald-500 bg-emerald-500/6' },
  WIP:     { dot: 'bg-amber-500',   badge: 'border-amber-500/40 text-amber-500 bg-amber-500/6' },
  SHIPPED: { dot: 'bg-cyan-500',    badge: 'border-cyan-500/40 text-cyan-500 bg-cyan-500/6' },
}

function StatusBadge({ status }: { status: keyof typeof STATUS_STYLES }) {
  const { dot, badge } = STATUS_STYLES[status]
  return (
    <span className={['inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full', 'text-[10px] font-semibold tracking-widest uppercase border shrink-0', badge].join(' ')}>
      <span className={['w-1.5 h-1.5 rounded-full', dot].join(' ')} />
      {status}
    </span>
  )
}

export function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleAction = (title: string, url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      setSelectedId(prev => prev === title ? null : title)
    }
  }

  const handleKeyDown = (e: KeyboardEvent, title: string, url?: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleAction(title, url)
    }
  }

  return (
    <section id="projects" className="px-12 py-10 overflow-hidden">
      <div className="flex flex-col gap-4 py-1">
        {PROJECTS.map(({ icon: Icon, hue, title, slug, description, tags, status, image, alt, url }, index) => {
          const isSelected = selectedId === title
          return (
            <motion.div
              key={title}
              role="button"
              tabIndex={0}
              aria-label={title}
              aria-pressed={isSelected}
              onClick={() => handleAction(title, url)}
              onKeyDown={(e) => handleKeyDown(e, title, url)}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={cn(
                "group rounded-2xl overflow-hidden cursor-pointer outline-none transition-all duration-300",
                "border dark:border-0 dark:p-[1px]",
                isSelected
                  ? "border-primary/35 shadow-[0_0_40px_-10px_var(--glow-primary)]"
                  : "border-primary/15 hover:border-primary/30 hover:shadow-[0_0_30px_-12px_var(--glow-primary)]"
              )}
              style={{ backgroundImage: 'var(--project-card-border)' }}
            >
              <div className={cn(
                "rounded-2xl dark:rounded-[15px] overflow-hidden bg-card/95 h-full transition-all duration-300",
                isSelected ? "bg-card" : "group-hover:bg-card"
              )}>
                {/* ── Browser chrome header ── */}
                <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border/40 bg-muted/30">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 flex items-center gap-1.5 px-3 py-1 rounded-md bg-background/60 border border-border/60 min-w-0">
                    <Lock size={10} className="text-muted-foreground/50 shrink-0" />
                    <span className="font-mono text-[11px] text-muted-foreground/60 truncate">{slug}</span>
                  </div>
                  <StatusBadge status={status} />
                </div>

                {/* ── Browser body ── */}
                <div className="flex min-h-[180px]">
                  {/* Left: content */}
                  <div className="flex-1 min-w-0 flex flex-col p-6">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                        style={{ background: `oklch(0.52 0.24 ${hue} / 0.12)`, border: `1px solid oklch(0.52 0.24 ${hue} / 0.28)` }}
                      >
                        <Icon size={14} strokeWidth={1.75} style={{ color: `oklch(0.65 0.24 ${hue})` }} />
                      </span>
                      <h3 className="font-semibold text-base text-foreground leading-tight group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                        {title}
                        {url && <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className={cn(
                            buttonVariants({ variant: 'outline', size: 'xs' }),
                            "rounded-full font-medium border-border/60 text-muted-foreground group-hover:border-primary/25 transition-colors duration-200"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: screenshot */}
                  <div className="w-[38%] shrink-0 border-l border-border/40 relative overflow-hidden bg-muted/5 min-h-[230px]">
                    {image ? (
                      <motion.div 
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Image
                          src={image}
                          alt={alt || title}
                          fill
                          className="object-cover object-center transition-opacity duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={index === 0}
                        />
                        {/* ── Overlay gradient per profondità ── */}
                        <div className="absolute inset-0 bg-linear-to-t from-background/10 to-transparent pointer-events-none" />
                      </motion.div>
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center p-3"
                        style={{ background: `oklch(0.52 0.24 ${hue} / 0.06)` }}
                      >
                        <div 
                          className="w-full h-full rounded-lg border-2 border-dashed flex items-center justify-center"
                          style={{ borderColor: `oklch(0.52 0.24 ${hue} / 0.25)` }}
                        >
                          <span className="text-[10px] font-mono text-muted-foreground/30 tracking-widest uppercase">
                            screenshot
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
