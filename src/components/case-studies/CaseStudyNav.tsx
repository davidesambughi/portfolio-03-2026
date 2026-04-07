'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_SECTIONS = [
  { id: 'problem',      label: 'Problem'      },
  { id: 'architecture', label: 'Architecture' },
  { id: 'challenges',   label: 'Challenges'   },
  { id: 'decisions',    label: 'Decisions'    },
  { id: 'reflection',   label: 'Reflection'   },
]

export function CaseStudyNav() {
  const [visible, setVisible]   = useState(false)
  const [activeId, setActiveId] = useState('')

  // Show once user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via intersection ratio
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const ratios = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }
        let best = '', bestRatio = -1
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) { bestRatio = ratio; best = id }
        }
        if (best) setActiveId(best)
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    )
    for (const { id } of NAV_SECTIONS) {
      const el = document.getElementById(id)
      if (el) { ratios.set(id, 0); observer.observe(el) }
    }
    return () => observer.disconnect()
  }, [])

  const scrollTo    = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        'fixed right-6 top-1/2 z-40',
        '-translate-y-1/2',
        'hidden lg:flex flex-col items-end gap-1',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 pointer-events-none',
      )}
    >
      {NAV_SECTIONS.map(({ id, label }) => {
        const isActive = id === activeId
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={cn(
              'flex items-center gap-2.5 py-1 cursor-pointer transition-all duration-200',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground/40 hover:text-muted-foreground/70',
            )}
          >
            <span className="text-xs font-medium">{label}</span>
            <span className={cn(
              'h-1.5 rounded-full shrink-0 transition-all duration-300',
              isActive ? 'w-4 bg-primary' : 'w-1.5 bg-border',
            )} />
          </button>
        )
      })}

      <div className="mt-2 pt-2 border-t border-border/30 w-full flex justify-end">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 py-1 cursor-pointer text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-200"
        >
          <span className="text-xs">Top</span>
          <ArrowUp size={11} className="shrink-0" />
        </button>
      </div>
    </nav>
  )
}
