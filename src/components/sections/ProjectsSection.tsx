'use client'

import Image from 'next/image'
import { useState, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe, Zap, Lock, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PROJECTS = [
  {
    icon: Building2,
    hue: '276.97',
    title: 'NIF SaaS',
    slug: 'raisingkidsinportugal.com',
    image: '/images/NIFSaaS.png',
    url: 'https://raisingkidsinportugal.com/en',
    alt: 'Screenshot of Raising Kids in Portugal platform',
    description:
      'Automated Italian tax-code (Codice Fiscale) generation platform with multi-tenant auth, usage-based billing, and full i18n support.',
    tags: ['Next.js 16', 'Supabase', 'i18n'],
    status: 'LIVE' as const,
  },
  {
    icon: Globe,
    hue: '293.01',
    title: 'SEO / GEO Engine',
    slug: 'geo-engine.vercel.app',
    image: null,
    alt: 'SEO and GEO engine dashboard placeholder',
    description:
      'GEO-optimized content pipeline — entity linking, structured data injection, and programmatic page generation at scale.',
    tags: ['Next.js 16', 'OpenAI', 'Postgres', 'Edge Functions'],
    status: 'WIP' as const,
  },
  {
    icon: Zap,
    hue: '303.90',
    title: 'Vibe Microsite',
    slug: 'vibe.studio',
    image: null,
    alt: 'Vibe Microsite design placeholder',
    description:
      'One-page marketing microsite built with Vibe Coding™ — AI-assisted design iteration, zero-CSS workflow, deployed in under 48 h.',
    tags: ['Next.js 16', 'Framer Motion', 'Tailwind v4'],
    status: 'LIVE' as const,
  },
]

function StatusBadge({ status }: { status: 'LIVE' | 'WIP' }) {
  const isLive = status === 'LIVE'
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full',
        'text-[10px] font-semibold tracking-widest uppercase border shrink-0',
        isLive
          ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/6'
          : 'border-amber-500/40 text-amber-500 bg-amber-500/6',
      ].join(' ')}
    >
      <span className={['w-1.5 h-1.5 rounded-full', isLive ? 'bg-emerald-500' : 'bg-amber-500'].join(' ')} />
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
    <section id="projects" className="px-12 py-10">
      <div className="flex flex-col gap-4">
        {PROJECTS.map(({ icon: Icon, hue, title, slug, description, tags, status, image, alt, url }, index) => {
          const isSelected = selectedId === title
          return (
            <motion.article
              key={title}
              role="button"
              tabIndex={0}
              aria-selected={isSelected}
              onClick={() => handleAction(title, url)}
              onKeyDown={(e) => handleKeyDown(e, title, url)}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={cn(
                "group p-[1px] rounded-2xl overflow-hidden cursor-pointer outline-none transition-all duration-300",
                isSelected 
                  ? "shadow-[0_0_40px_-10px_var(--glow-primary)]" 
                  : "hover:shadow-[0_0_30px_-12px_var(--glow-primary)]"
              )}
              style={{ backgroundImage: 'var(--gradient-brand-h)' }}
            >
              <div className={cn(
                "rounded-[15px] overflow-hidden bg-card/95 h-full transition-all duration-300",
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
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
