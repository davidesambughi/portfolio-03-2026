'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { ChevronRight, House, FolderOpen, Layers, User, Mail, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const [mobileOpen, setMobileOpen] = useState(false)

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

  // Close mobile overlay on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll while mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <MotionConfig reducedMotion="user">
      <>
        {/* ── Desktop sidebar (hidden on mobile) ── */}
        <motion.aside
          initial={false}
          animate={{ width: open ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundImage: open ? undefined : 'var(--gradient-sidebar)' }}
          className={cn(
            "hidden md:flex fixed left-0 top-0 h-screen z-50 flex-col overflow-hidden",
            open
              ? "bg-sidebar/40 backdrop-blur-xl"
              : "bg-sidebar"
          )}
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

        {/* ── Mobile hamburger button ── */}
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-card/80 backdrop-blur-sm border border-border/60 text-foreground transition-colors duration-200 hover:bg-card cursor-pointer"
        >
          {mobileOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
        </button>

        {/* ── Mobile nav overlay ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-2"
            >
              {NAV_ITEMS.map(({ id, label, icon: Icon }, index) => {
                const isActive = id === activeId
                return (
                  <button
                    key={id}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={index === 0}
                    onClick={() => { scrollTo(id); setMobileOpen(false) }}
                    className={[
                      'flex items-center gap-3 px-8 py-3.5 rounded-xl text-lg font-medium w-52',
                      'transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'text-foreground bg-primary/8'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40',
                    ].join(' ')}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className={isActive ? 'text-primary [filter:drop-shadow(0_0_5px_var(--glow-secondary))]' : ''}
                    />
                    {label}
                  </button>
                )
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </>
    </MotionConfig>
  )
}
