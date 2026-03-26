'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, House, FolderOpen, Layers, User, Mail } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero',     label: 'Home',     icon: House      },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'stack',    label: 'Stack',    icon: Layers     },
  { id: 'about',    label: 'About',    icon: User       },
  { id: 'contact',  label: 'Contact',  icon: Mail       },
]

const SIDEBAR_COLLAPSED = 56   // px
const SIDEBAR_EXPANDED  = 220  // px

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')

  useEffect(() => {
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }
        // Pick the section with the highest visible ratio
        let best = ''
        let bestRatio = -1
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) { bestRatio = ratio; best = id }
        }
        if (best) setActiveId(best)
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    )

    for (const { id } of NAV_ITEMS) {
      const el = document.getElementById(id)
      if (el) { ratios.set(id, 0); observer.observe(el) }
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{ backgroundImage: 'var(--gradient-sidebar)' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col bg-sidebar overflow-hidden"
    >
      {/* ── Right border — gradient glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-px opacity-60"
        style={{ background: 'var(--gradient-brand-v)' }}
      />

      {/* ── Toggle ── */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Chiudi sidebar' : 'Apri sidebar'}
        className="group flex items-center justify-center h-14 w-14 shrink-0
                   text-sidebar-foreground/30 hover:text-sidebar-primary
                   transition-colors duration-150 cursor-pointer"
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex group-hover:[filter:drop-shadow(0_0_6px_var(--glow-secondary))]
                     transition-[filter] duration-150"
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </motion.span>
      </button>

      {/* ── Separatore ── */}
      <div
        className="mx-3 h-px shrink-0"
        style={{ background: 'var(--gradient-sep)', boxShadow: '0 0 8px var(--glow-secondary)' }}
      />

      {/* ── Navigazione ── */}
      <nav className="flex flex-col gap-0.5 pt-3 px-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = id === activeId
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={[
                'group flex items-center gap-3 h-10 px-3 rounded-lg w-full',
                'transition-all duration-200 cursor-pointer',
                isActive
                  ? 'text-sidebar-foreground border border-transparent'
                  : 'text-sidebar-foreground/40 hover:text-sidebar-foreground border border-transparent hover:border-sidebar-border hover:bg-sidebar-accent',
              ].join(' ')}
              style={undefined}
            >
              <Icon
                size={17}
                strokeWidth={1.75}
                className={[
                  'shrink-0 transition-all duration-200',
                  isActive
                    ? 'text-sidebar-primary [filter:drop-shadow(0_0_5px_var(--glow-secondary))]'
                    : 'group-hover:text-sidebar-primary group-hover:[filter:drop-shadow(0_0_5px_var(--glow-secondary))]',
                ].join(' ')}
              />

              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </nav>
    </motion.aside>
  )
}
