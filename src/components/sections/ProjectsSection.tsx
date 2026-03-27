'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe, Zap, Lock } from 'lucide-react'

const PROJECTS = [
  {
    icon: Building2,
    hue: '276.97',
    title: 'NIF SaaS',
    slug: 'nif-saas.vercel.app',
    description:
      'Automated Italian tax-code (Codice Fiscale) generation platform with multi-tenant auth, usage-based billing, and full i18n support.',
    tags: ['Next.js 16', 'Supabase', 'Stripe', 'i18n'],
    status: 'LIVE' as const,
  },
  {
    icon: Globe,
    hue: '293.01',
    title: 'SEO / GEO Engine',
    slug: 'geo-engine.vercel.app',
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

  return (
    <section id="projects" className="px-12 py-10">
      <div className="flex flex-col gap-4">
        {PROJECTS.map(({ icon: Icon, hue, title, slug, description, tags, status }) => {
          const isSelected = selectedId === title
          return (
            <motion.article
              key={title}
              onClick={() => setSelectedId(isSelected ? null : title)}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={[
                'group rounded-2xl overflow-hidden bg-card cursor-pointer',
                'border transition-colors duration-300',
                isSelected
                  ? 'border-primary/60 dark:border-electric-400/55 [box-shadow:0_0_0_1px_var(--glow-primary),0_0_36px_var(--glow-primary)]'
                  : 'border-primary/25 dark:border-electric-600/25 [box-shadow:0_0_18px_var(--glow-primary)] hover:border-primary/60 dark:hover:border-electric-400/55 hover:[box-shadow:0_0_0_1px_var(--glow-primary),0_0_36px_var(--glow-primary)]',
              ].join(' ')}
            >
              {/* ── Browser chrome header ── */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-muted/30">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex items-center gap-1.5 px-3 py-1 rounded-md bg-background/60 border border-border min-w-0">
                  <Lock size={10} className="text-muted-foreground/50 shrink-0" />
                  <span className="font-mono text-[11px] text-muted-foreground/60 truncate">{slug}</span>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* ── Browser body ── */}
              <div className="flex">
                {/* Left: content */}
                <div className="flex-1 min-w-0 flex flex-col p-6">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                      style={{ background: `oklch(0.52 0.24 ${hue} / 0.12)`, border: `1px solid oklch(0.52 0.24 ${hue} / 0.28)` }}
                    >
                      <Icon size={14} strokeWidth={1.75} style={{ color: `oklch(0.65 0.24 ${hue})` }} />
                    </span>
                    <h3 className="font-semibold text-base text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-border text-muted-foreground group-hover:border-primary/25 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: screenshot placeholder */}
                <div className="w-[38%] shrink-0 border-l border-border p-3 flex items-center justify-center min-h-[160px]">
                  {/* ↓ Replace with <Image> when ready */}
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center"
                    style={{ background: `oklch(0.52 0.24 ${hue} / 0.06)`, border: `1px dashed oklch(0.52 0.24 ${hue} / 0.25)` }}
                  >
                    <span className="text-[10px] font-mono text-muted-foreground/30 tracking-widest uppercase">
                      screenshot
                    </span>
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
