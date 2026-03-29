'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita hydration mismatch — renderizza solo dopo il mount
  // next-themes: intentional setState in effect to suppress hydration mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Passa a light mode' : 'Passa a dark mode'}
      className={cn(
        "fixed top-4 right-4 z-50",
        "flex items-center justify-center h-9 w-9 rounded-lg",
        "bg-card shadow-sm hover:shadow-md transition-colors duration-150 cursor-pointer",
        isDark
          ? "border-2 border-neutral-400 text-neutral-100 hover:border-neutral-200"
          : "border-2 border-neutral-600 text-neutral-800 hover:border-neutral-900"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0,   scale: 1   }}
          exit={{    opacity: 0, rotate:  30, scale: 0.8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="flex"
        >
          {isDark
            ? <Sun  size={16} strokeWidth={2.25} />
            : <Moon size={16} strokeWidth={2.25} />
          }
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
