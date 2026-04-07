'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const STACK_DATA = [
  {
    category: 'CORE',
    techs: ['Next.js 16', 'TypeScript', 'React 19'],
  },
  {
    category: 'STYLING',
    techs: ['Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
  },
  {
    category: 'BACKEND',
    techs: ['Supabase', 'Drizzle ORM', 'Zod'],
  },
  {
    category: 'PAYMENTS & EMAIL',
    techs: ['Stripe', 'Resend'],
  },
  {
    category: 'INFRA',
    techs: ['Vercel', 'PostgreSQL'],
  },
  {
    category: 'SEO / GEO',
    techs: ['JSON-LD', 'Speakable Schema', 'ISR', 'next-intl', 'llms.txt', 'robots.txt'],
  },
  {
    category: 'AI TOOLING',
    techs: ['Claude Code', 'Gemini CLI', 'Cursor', 'Kiro', 'MCP', 'Agentic AI', 'Prompt Engineering', 'RAG', 'AI-assisted Development', 'LLM Integration'],
    fullRow: true,
  },
]

export function StackSection() {
  return (
    <section id="stack" className="px-4 md:px-8 lg:px-12 py-16 md:py-24" aria-labelledby="stack-title">
      {/* Hidden heading for SEO/Accessibility */}
      <h2 id="stack-title" className="sr-only">Tech Stack & Methodology</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STACK_DATA.map((item, idx) => (
          <motion.article
            key={item.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "group p-[1px] rounded-xl overflow-hidden transition-all duration-300",
              item.fullRow && "md:col-span-2 lg:col-span-3"
            )}
            style={{ backgroundImage: 'var(--gradient-brand-h)' }}
          >
            {item.fullRow ? (
              /* ── Full-row horizontal layout for AI TOOLING ── */
              <div className="px-6 py-4 rounded-[11px] bg-card/90 h-full transition-all duration-300 group-hover:bg-card flex flex-wrap items-center gap-x-6 gap-y-3">
                <h3 className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/40 uppercase shrink-0">
                  {item.category}
                </h3>
                <div className="flex-1 flex flex-wrap justify-between gap-y-2">
                  {item.techs.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-medium tracking-tight transition-all duration-200",
                        "bg-muted/40 text-muted-foreground border border-transparent",
                        "group-hover:text-foreground group-hover:border-white/10 group-hover:bg-muted"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Standard vertical layout ── */
              <div className="p-6 rounded-[11px] bg-card/90 h-full transition-all duration-300 group-hover:bg-card">
                <h3 className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/40 mb-5 uppercase">
                  {item.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.techs.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-medium tracking-tight transition-all duration-200",
                        "bg-muted/40 text-muted-foreground border border-transparent",
                        "group-hover:text-foreground group-hover:border-white/10 group-hover:bg-muted"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
