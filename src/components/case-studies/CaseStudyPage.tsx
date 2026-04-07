import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/lib/button-variants'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { CaseStudyNav } from '@/components/case-studies/CaseStudyNav'
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
    <div className="relative flex items-center mb-5">
      <h2 className="relative z-10 pr-4 bg-background text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50 dark:text-primary/70">
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundImage: 'var(--gradient-brand-h)' }} />
    </div>
  )
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <>
      {/* ── Client island: fixed right-side section nav ── */}
      <CaseStudyNav />

      <main id="main" className="max-w-6xl mx-auto px-4 md:px-8 py-10 pb-24">

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

        {/* ── Hero: text left (1fr), screenshot right (2fr) ── */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-10 md:items-start">
          <div>
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{study.title}</h1>
              <StatusBadge status={study.status} />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-5">{study.pitch}</p>
            <div className="flex flex-wrap gap-2">
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
              {/* ── Live site button — gradient brand ── */}
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundImage: 'var(--gradient-brand)' }}
              >
                View live site
                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* ── Hero screenshot — glow border ── */}
          <div className="rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_32px_-8px_var(--glow-primary)] bg-muted/10">
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
        <section id="problem" className="mt-14">
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
        <section id="architecture" className="mt-14">
          <SectionHeader title="Architecture" />
          <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-6 md:gap-8 md:items-center">
            <div className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                {study.architectureCaption}
              </p>
              {study.architecturePoints && (
                <ul className="space-y-3">
                  {study.architecturePoints.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-border/80 mt-0.5 shrink-0 select-none">—</span>
                      <InlineCode text={point} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {study.architectureDiagram ? (
              <div className="rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_28px_-8px_var(--glow-primary)] bg-muted/10">
                <Image
                  src={study.architectureDiagram}
                  alt="Architecture diagram"
                  width={900}
                  height={560}
                  className="w-full object-contain"
                />
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/50 bg-muted/10 flex items-center justify-center py-16">
                <span className="text-[11px] font-mono text-muted-foreground/30 tracking-widest uppercase">
                  Diagram — coming soon
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── Engineering Challenges ── */}
        <section id="challenges" className="mt-14">
          <SectionHeader title="Engineering Challenges" />
          <div className="space-y-3">
            {study.challenges.map((challenge, i) => (
              // Gradient border wrapper — same pattern as project cards
              <div
                key={i}
                className="rounded-xl border dark:border-0 dark:p-[1px] border-border/50 transition-shadow duration-300 hover:shadow-[0_0_28px_-8px_var(--glow-primary)]"
                style={{ backgroundImage: 'var(--project-card-border)' }}
              >
                <div className="rounded-xl dark:rounded-[11px] bg-card p-5">

                  {/* Text left, diagram right on md+ — stacked on mobile */}
                  <div className={cn(
                    'mb-4',
                    challenge.diagram && 'grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6',
                  )}>
                    <div className="space-y-3">
                      <h3 className="text-base font-semibold text-foreground">
                        {challenge.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        <InlineCode text={challenge.description} />
                      </p>
                      {challenge.points && (
                        <ul className="space-y-2.5">
                          {challenge.points.map((point, j) => (
                            <li key={j} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                              <span className="text-border/80 mt-0.5 shrink-0 select-none">—</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {challenge.diagram && (
                      <div className="rounded-lg overflow-hidden border border-border/40 bg-muted/10 self-center">
                        <Image
                          src={challenge.diagram}
                          alt={`Diagram: ${challenge.title}`}
                          width={600}
                          height={400}
                          className="w-full object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border/40 pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-medium text-primary mr-1.5">Resolution —</span>
                      <InlineCode text={challenge.resolution} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Decisions ── */}
        <section id="decisions" className="mt-14">
          <SectionHeader title="Key Decisions" />
          <div className="space-y-3">
            {study.decisions.map((decision, i) => (
              // Gradient border wrapper — same pattern as project cards
              <div
                key={i}
                className="rounded-xl border dark:border-0 dark:p-[1px] border-border/50 transition-shadow duration-300 hover:shadow-[0_0_28px_-8px_var(--glow-primary)]"
                style={{ backgroundImage: 'var(--project-card-border)' }}
              >
                <div className="rounded-xl dark:rounded-[11px] bg-card p-5">
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
              </div>
            ))}
          </div>
        </section>

        {/* ── Reflection ── */}
        <section id="reflection" className="mt-14">
          <SectionHeader title="What I'd Do Differently" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <InlineCode text={study.reflection} />
          </p>
        </section>

        {/* ── Footer nav ── */}
        <div className="mt-14 mb-0">
          <div className="h-px w-full" style={{ backgroundImage: 'var(--gradient-brand-h)' }} />
        </div>
        <div className="flex items-center justify-between pt-10">
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
            className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundImage: 'var(--gradient-brand)' }}
          >
            View live site
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </main>
    </>
  )
}
