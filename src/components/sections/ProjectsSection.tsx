import { Building2, Globe, Zap } from 'lucide-react'

type Status = 'LIVE' | 'WIP'

const PROJECTS = [
  {
    icon: Building2,
    hue: '276.97',
    title: 'NIF SaaS',
    slug: 'nif-saas.vercel.app',
    description:
      'Automated Italian tax-code (Codice Fiscale) generation platform with multi-tenant auth, usage-based billing, and full i18n support.',
    tags: ['Next.js 16', 'Supabase', 'Stripe', 'i18n'],
    status: 'LIVE' as Status,
  },
  {
    icon: Globe,
    hue: '293.01',
    title: 'SEO / GEO Engine',
    slug: 'geo-engine.vercel.app',
    description:
      'GEO-optimized content pipeline — entity linking, structured data injection, and programmatic page generation at scale.',
    tags: ['Next.js 16', 'OpenAI', 'Postgres', 'Edge Functions'],
    status: 'WIP' as Status,
  },
  {
    icon: Zap,
    hue: '303.90',
    title: 'Vibe Microsite',
    slug: 'vibe.studio',
    description:
      'One-page marketing microsite built with Vibe Coding™ — AI-assisted design iteration, zero-CSS workflow, deployed in under 48 h.',
    tags: ['Next.js 16', 'Framer Motion', 'Tailwind v4'],
    status: 'LIVE' as Status,
  },
]

function StatusBadge({ status }: { status: Status }) {
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

function BrowserMockup({ hue }: { hue: string }) {
  return (
    <div className="rounded-xl overflow-hidden h-full border border-border bg-card">
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/40">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      {/* Wireframe */}
      <div className="p-3 flex flex-col gap-2.5">
        {/* Hero placeholder box */}
        <div
          className="w-full h-14 rounded-md"
          style={{
            background: `oklch(0.52 0.24 ${hue} / 0.15)`,
            border: `1px solid oklch(0.52 0.24 ${hue} / 0.28)`,
          }}
        />
        {/* Content lines */}
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 rounded-full bg-muted w-4/5" />
          <div className="h-1.5 rounded-full bg-muted w-3/5" />
          <div className="h-1.5 rounded-full bg-muted w-2/3" />
        </div>
        {/* Button placeholder */}
        <div
          className="h-5 w-16 rounded-md mt-1"
          style={{ background: `oklch(0.52 0.24 ${hue} / 0.20)` }}
        />
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="px-12 py-10">
      <div className="flex flex-col gap-4">
        {PROJECTS.map(({ icon: Icon, hue, title, slug, description, tags, status }) => (
          <article
            key={title}
            className="group relative flex gap-6 p-6 rounded-2xl
                       border border-electric-700/25 dark:border-electric-600/20
                       bg-card
                       transition-all duration-300 ease-out
                       hover:border-electric-400/55
                       hover:[box-shadow:0_0_0_1px_oklch(0.795_0.215_198_/_0.25),0_0_32px_oklch(0.795_0.215_198_/_0.12)]"
          >
            {/* ── Left: Content ~70% ── */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Icon */}
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                    style={{
                      background: `oklch(0.52 0.24 ${hue} / 0.12)`,
                      border: `1px solid oklch(0.52 0.24 ${hue} / 0.28)`,
                    }}
                  >
                    <Icon size={14} strokeWidth={1.75} style={{ color: `oklch(0.65 0.24 ${hue})` }} />
                  </span>
                  <h3 className="font-semibold text-base text-foreground leading-tight group-hover:text-primary transition-colors duration-200 truncate">
                    {title}
                  </h3>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Slug */}
              <p className="font-mono text-[11px] text-muted-foreground/55 mb-3 ml-9 tracking-wide">
                {slug}
              </p>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium
                               border border-border text-muted-foreground
                               group-hover:border-electric-500/30 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: Browser mockup ~30% ── */}
            <div className="w-[36%] shrink-0 self-stretch">
              <BrowserMockup hue={hue} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
