'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { CaseStudy } from '@/data/case-studies/types'

// Renders text with `backtick` spans as inline code elements
function InlineCode({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="text-[0.82em] font-mono bg-muted px-1.5 py-0.5 rounded text-foreground/80"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50 mb-5">
      {title}
    </h2>
  )
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main id="main" className="max-w-2xl mx-auto px-4 md:px-6 py-10 pb-24">

      {/* ── Back link ── */}
      <Link
        href="/#projects"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          '-ml-2 mb-10 gap-1.5 text-muted-foreground hover:text-foreground',
        )}
      >
        <ArrowLeft size={14} />
        Portfolio
      </Link>

      {/* ── Hero ── */}
      <section>
        <div className="flex flex-wrap items-start gap-3 mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{study.title}</h1>
          <StatusBadge status={study.status} />
        </div>

        <p className="text-muted-foreground leading-relaxed mb-5">{study.pitch}</p>

        <div className="flex flex-wrap items-center gap-2 mb-7">
          {study.tags.map(tag => (
            <span
              key={tag}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'xs' }),
                'rounded-full border-border/60 text-muted-foreground pointer-events-none',
              )}
            >
              {tag}
            </span>
          ))}
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'ml-auto gap-1.5',
            )}
          >
            View live site
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/10">
          <Image
            src={study.screenshot}
            alt={study.screenshotAlt}
            width={1200}
            height={750}
            className="w-full object-contain object-top"
            priority
          />
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="mt-14">
        <SectionHeader title="Problem" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {study.problem.summary}
        </p>
        <ul className="space-y-2.5">
          {study.problem.constraints.map((constraint, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-border/80 mt-0.5 shrink-0 select-none">—</span>
              <InlineCode text={constraint} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Architecture ── */}
      <section className="mt-14">
        <SectionHeader title="Architecture" />
        {study.architectureDiagram ? (
          <Image
            src={study.architectureDiagram}
            alt="Architecture diagram"
            width={900}
            height={560}
            className="w-full rounded-xl"
          />
        ) : (
          <div className="rounded-xl border border-dashed border-border/50 bg-muted/10 flex items-center justify-center py-16">
            <span className="text-[11px] font-mono text-muted-foreground/30 tracking-widest uppercase">
              Diagram — coming soon
            </span>
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground/60 leading-relaxed">
          {study.architectureCaption}
        </p>
      </section>

      {/* ── Engineering Challenges ── */}
      <section className="mt-14">
        <SectionHeader title="Engineering Challenges" />
        <div className="space-y-3">
          {study.challenges.map((challenge, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-card p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                <InlineCode text={challenge.description} />
              </p>
              <div className="border-t border-border/40 pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-primary mr-1.5">Resolution —</span>
                  <InlineCode text={challenge.resolution} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Decisions ── */}
      <section className="mt-14">
        <SectionHeader title="Key Decisions" />
        <div className="space-y-3">
          {study.decisions.map((decision, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-card p-5"
            >
              <p className="text-sm text-muted-foreground mb-1">Chose</p>
              <p className="text-sm font-semibold text-foreground mb-3">
                <InlineCode text={decision.chosen} />
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <span className="text-[11px] text-muted-foreground/50 mr-0.5">
                  Considered:
                </span>
                {decision.alternatives.map((alt, j) => (
                  <span
                    key={j}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'xs' }),
                      'rounded-full border-border/40 text-muted-foreground/60 pointer-events-none',
                    )}
                  >
                    {alt}
                  </span>
                ))}
              </div>
              <div className="border-t border-border/40 pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-primary mr-1.5">Why —</span>
                  <InlineCode text={decision.rationale} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reflection ── */}
      <section className="mt-14">
        <SectionHeader title="What I'd Do Differently" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <InlineCode text={study.reflection} />
        </p>
      </section>

      {/* ── Footer nav ── */}
      <div className="flex items-center justify-between pt-10 mt-14 border-t border-border/40">
        <Link
          href="/#projects"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'gap-1.5 text-muted-foreground',
          )}
        >
          <ArrowLeft size={14} />
          Portfolio
        </Link>
        <a
          href={study.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
        >
          View live site
          <ExternalLink size={12} />
        </a>
      </div>
    </main>
  )
}
