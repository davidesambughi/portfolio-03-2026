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
    techs: ['Supabase', 'Vercel', 'Edge'],
  },
  {
    category: 'AUTOMATION',
    techs: ['n8n', 'Resend', 'Stripe'],
  },
  {
    category: 'SEO / GEO',
    techs: ['Schema.org', 'llms.txt', 'i18n'],
  },
  {
    category: 'METHODOLOGY',
    techs: ['Vibe Coding™', 'AI-First'],
  },
]

export function StackSection() {
  return (
    <section id="stack" className="px-12 py-10" aria-labelledby="stack-title">
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
            className="group p-[1px] rounded-xl overflow-hidden transition-all duration-300"
            style={{ backgroundImage: 'var(--gradient-brand-h)' }}
          >
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
          </motion.article>
        ))}
      </div>
    </section>
  )
}
