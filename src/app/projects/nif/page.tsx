import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { FadeIn } from './_components/FadeIn'

export const metadata: Metadata = {
  title: 'GetNIF Portugal — Case Study | Davide Sambughi',
  description:
    'How I built a production SaaS for remote Portuguese NIF registration — Next.js 16, Supabase, Stripe, Gemini AI, and trilingual support.',
  openGraph: {
    title: 'GetNIF Portugal — Case Study',
    description:
      'Production SaaS for remote Portuguese NIF registration. Full breakdown: architecture, Stripe webhook idempotency, AI document review, and Supabase Realtime.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GetNIF Portugal',
  url: 'https://getnifportugal.com',
  applicationCategory: 'BusinessApplication',
  description:
    'SaaS platform to obtain a Portuguese tax ID remotely. Stripe checkout, signed document uploads, AI document review, realtime admin dashboard, and trilingual support.',
  author: {
    '@type': 'Person',
    name: 'Davide Sambughi',
    url: 'https://davidesambughi.com',
  },
  programmingLanguage: ['TypeScript'],
  runtimePlatform: 'Vercel',
  operatingSystem: 'Web',
}

const TECH_STACK = [
  'Next.js 16', 'Supabase', 'Stripe', 'Resend',
  'Gemini AI', 'next-intl', 'Drizzle ORM', 'TypeScript',
]

const HIGHLIGHTS = [
  {
    title: 'Webhook Idempotency',
    problem:
      'Stripe can deliver the same webhook event more than once. Under concurrent Vercel worker invocations, a duplicate can be processed simultaneously before the first request completes.',
    solution:
      'Two independent guards run in sequence: an atomic INSERT INTO processed_webhook_events ... ON CONFLICT DO NOTHING that returns 0 rows if the event was already processed, causing immediate exit; then a status guard that checks the order is still in pending_payment before any state transition.',
    impact:
      'Prevents double-charges and double-emails even under concurrent worker invocations — a real edge case in serverless environments where the same function can run in parallel.',
  },
  {
    title: 'Document Upload + AI Review',
    problem:
      'Routing file uploads through the Next.js server wastes bandwidth and memory. Running AI review synchronously would block the customer flow if the service is unavailable.',
    solution:
      'The server issues a signed URL — a time-limited token granting temporary write access to private storage. The browser uploads directly to Supabase Storage, bypassing Next.js entirely. After upload, Gemini 2.0 Flash reviews the document with a soft-failure design: any error marks the document for manual review instead of crashing the flow.',
    impact:
      'The server never handles file bytes. AI failures degrade gracefully. A Gemini outage never blocks customers from submitting their documents.',
  },
  {
    title: 'Realtime Order Dashboard',
    problem:
      'Customers need live order status updates. HTTP polling is wasteful — most requests return nothing new and add unnecessary server load.',
    solution:
      'A Server Component fetches the initial order list and renders it to HTML. A RealtimeDashboard Client Component subscribes to Supabase Realtime on INSERT events on the status_updates table. When the admin advances an order, the browser receives the push and re-renders without a page refresh.',
    impact:
      'Demonstrates the Server/Client boundary in a production context: the Server Component handles the initial data fetch, the Client Component handles the live subscription. Each layer does exactly one thing.',
  },
]

const DECISIONS = [
  {
    question: 'Why Next.js?',
    answer: 'Full-stack in one repo. Server Actions mean no separate API server for mutations.',
  },
  {
    question: 'Why Supabase?',
    answer: 'Postgres + auth + storage + realtime in one managed service — right-sized for an early-stage product.',
  },
  {
    question: 'Why Drizzle ORM?',
    answer: 'Type-safe queries — schema changes surface as TypeScript errors at compile time, not runtime bugs.',
  },
  {
    question: 'Why Stripe?',
    answer: 'Industry standard, excellent webhook system, built-in fraud tools, handles PCI compliance.',
  },
  {
    question: 'Why text not jsonb for AI notes?',
    answer: "We never query inside the JSON from SQL — we only read the whole blob. jsonb adds power we don't need.",
  },
  {
    question: 'Why httpOnly cookies?',
    answer: "Browser JavaScript can't read them — protects against XSS attacks stealing the session token.",
  },
  {
    question: 'Why two idempotency layers on the webhook?',
    answer: 'Defense in depth. The atomic INSERT is the primary guard. The status check catches anything that slips through.',
  },
]

export default function NifCaseStudy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="py-16">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* ── Header ── */}
            <div>
              {/* Back link */}
              <Link
                href="/#projects"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mb-8 group animate-fade-in-up [animation-fill-mode:both]"
              >
                <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to portfolio
              </Link>

              {/* WIP badge */}
              <div className="flex items-center gap-3 mb-4 animate-fade-in-up [animation-delay:50ms] [animation-fill-mode:both]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border border-amber-500/40 text-amber-500 bg-amber-500/6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  WIP
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3 animate-fade-in-up [animation-delay:100ms] [animation-fill-mode:both]">
                GetNIF Portugal
              </h1>

              {/* Tagline */}
              <p className="text-lg text-muted-foreground/80 leading-relaxed mb-8 animate-fade-in-up [animation-delay:150ms] [animation-fill-mode:both]">
                A production SaaS that lets non-residents obtain a Portuguese tax ID (NIF) remotely — Stripe checkout, signed document uploads, realtime admin dashboard, and trilingual support. No Portugal visit required.
              </p>

              {/* Action row: live link + tech chips */}
              <div className="flex flex-wrap items-center gap-3 mb-10 animate-fade-in-up [animation-delay:200ms] [animation-fill-mode:both]">
                <a
                  href="https://getnifportugal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundImage: 'var(--gradient-brand)' }}
                >
                  View live site
                  <ExternalLink size={13} />
                </a>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-border/60 text-muted-foreground bg-muted/30 hover:border-primary/40 hover:text-foreground transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/40 mb-12 animate-fade-in-up [animation-delay:250ms] [animation-fill-mode:both]" />

              {/* ── Overview ── */}
              <FadeIn className="mb-14">
                <section aria-labelledby="overview-title">
                  <h2 id="overview-title" className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                    What It Does
                  </h2>

                  {/* Step flow */}
                  <div className="overflow-x-auto rounded-xl border border-border/40 mb-8">
                    <table className="w-full text-sm">
                      <tbody>
                        {[
                          ['1. Order', 'Customer fills in personal details and selects a service tier'],
                          ['2. Payment', 'Stripe Checkout collects payment'],
                          ['3. Documents', 'Customer uploads passport + proof of address via signed URLs'],
                          ['4. Processing', 'Admin submits to Finanças (Portuguese tax authority) manually'],
                          ['5. Delivery', 'NIF issued via admin panel → customer receives email with NIF number'],
                        ].map(([step, what]) => (
                          <tr key={step} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors duration-150">
                            <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap w-[140px]">{step}</td>
                            <td className="px-4 py-3 text-muted-foreground/80">{what}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Service tiers */}
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40 mb-3">
                    Service Tiers
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-border/40">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Tier</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Price</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Includes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Essential', '€79', 'NIF only'],
                          ['Standard', '€129', 'NIF + 1-year fiscal representative'],
                          ['Premium', '€199', 'NIF + 2-year fiscal rep + 48h express processing'],
                        ].map(([tier, price, includes]) => (
                          <tr key={tier} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors duration-150">
                            <td className="px-4 py-3 font-medium text-foreground">{tier}</td>
                            <td className="px-4 py-3 font-mono text-primary font-semibold">{price}</td>
                            <td className="px-4 py-3 text-muted-foreground/80">{includes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </FadeIn>

              {/* ── Architecture ── */}
              <FadeIn delay={0.05} className="mb-14">
                <section aria-labelledby="architecture-title">
                  <h2 id="architecture-title" className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                    Architecture
                  </h2>

                  <pre className="bg-muted/30 border border-border/40 rounded-xl px-5 py-4 font-mono text-xs text-muted-foreground/70 overflow-x-auto mb-6 leading-relaxed">
{`Pages/Components  →  Modules (Server Actions)  →  Repositories (Drizzle)  →  PostgreSQL
                                ↓
                     Services (pure business logic: payments, email)
                     Lib (SDK singletons: supabase, stripe, resend, env)`}
                  </pre>

                  <ul className="space-y-3">
                    {[
                      ['Components never touch the database directly', 'prevents scattered queries and missed security checks across the codebase'],
                      ['Repositories are the single source of truth', 'change a query once and everywhere benefits — no hunting for duplicate logic'],
                      ['Services are pure functions with no Next.js imports', 'callable from both Server Actions and the Stripe webhook Route Handler'],
                      ['Each layer has one job', 'the principle of separation of concerns, applied end to end'],
                    ].map(([point, detail]) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <span className="font-mono text-primary/50 shrink-0 mt-0.5">›</span>
                        <span>
                          <span className="text-foreground font-medium">{point}</span>
                          <span className="text-muted-foreground/70"> — {detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeIn>

              {/* ── Engineering Highlights ── */}
              <FadeIn className="mb-14">
                <section aria-labelledby="highlights-title">
                  <h2 id="highlights-title" className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                    Engineering Highlights
                  </h2>

                  <div className="space-y-4">
                    {HIGHLIGHTS.map(({ title, problem, solution, impact }) => (
                      <div
                        key={title}
                        className="rounded-xl border border-border/40 bg-card/40 p-6 hover:border-primary/30 hover:bg-muted/20 transition-all duration-300"
                      >
                        <h3 className="text-base font-semibold text-foreground mb-4">{title}</h3>
                        <div className="space-y-3 text-sm leading-relaxed">
                          <div className="flex gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40 shrink-0 mt-0.5 w-16">
                              Problem
                            </span>
                            <p className="text-muted-foreground/80">{problem}</p>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40 shrink-0 mt-0.5 w-16">
                              Solution
                            </span>
                            <p className="text-muted-foreground/80">{solution}</p>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40 shrink-0 mt-0.5 w-16">
                              Why
                            </span>
                            <p className="text-muted-foreground/60 italic">{impact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
