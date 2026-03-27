'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { sendEmail } from '@/app/actions/send-email'

const GITHUB_SVG = (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LINKEDIN_SVG = (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.98 0 1.775-.773 1.775-1.729V1.729C24 .774 23.205 0 22.225 0z" />
  </svg>
)

export function ContactSection() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('idle')
    setErrorMsg(null)

    startTransition(async () => {
      const result = await sendEmail(formData)
      if (result.success) {
        setStatus('success')
        form.reset()
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMsg(result.error || "Something went wrong.")
      }
    })
  }

  return (
    <section id="contact" className="px-12 py-20" aria-labelledby="contact-title">
      <h2 id="contact-title" className="sr-only">Contact Me</h2>

      <div className="max-w-4xl">
        <form 
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* ── Top Row: Name & Email ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                disabled={isPending}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-border bg-card/40 outline-none transition-all duration-200",
                  "focus:border-primary/50 focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground/40",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                disabled={isPending}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-border bg-card/40 outline-none transition-all duration-200",
                  "focus:border-primary/50 focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground/40",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
                required
              />
            </div>
          </div>

          {/* ── Middle Row: Message ── */}
          <div className="space-y-2">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              rows={6}
              disabled={isPending}
              className={cn(
                "w-full px-4 py-3 rounded-xl border border-border bg-card/40 outline-none transition-all duration-200 resize-none",
                "focus:border-primary/50 focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground/40",
                isPending && "opacity-50 cursor-not-allowed"
              )}
              required
            />
          </div>

          {/* ── Bottom Row: Submit & Socials ── */}
          <div className="flex flex-col gap-8 pt-2">
            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2 text-emerald-500 text-sm font-medium bg-emerald-500/5 px-4 py-2 rounded-lg border border-emerald-500/20"
                >
                  <CheckCircle2 size={16} />
                  Email sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2 text-red-400 text-sm font-medium bg-red-400/5 px-4 py-2 rounded-lg border border-red-400/20"
                >
                  <AlertCircle size={16} />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "group flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white",
                  "transition-all duration-300 shadow-glow-primary relative overflow-hidden",
                  isPending ? "opacity-90 cursor-not-allowed" : "hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]"
                )}
                style={{ backgroundImage: 'var(--gradient-brand)' }}
              >
                {isPending ? (
                  <>
                    Sending...
                    <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="w-10 h-10 p-0 rounded-xl border-border bg-card/40 hover:bg-card/60 text-muted-foreground hover:text-foreground transition-all duration-300"
                asChild
              >
                <a href="https://github.com/vostro-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  {GITHUB_SVG}
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="w-10 h-10 p-0 rounded-xl border-border bg-card/40 hover:bg-card/60 text-muted-foreground hover:text-foreground transition-all duration-300"
                asChild
              >
                <a href="https://linkedin.com/in/vostro-username" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  {LINKEDIN_SVG}
                </a>
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* ── Background Detail ── */}
      <div 
        className="fixed -z-10 bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.03] pointer-events-none"
        style={{ background: 'var(--gradient-brand)' }}
      />
    </section>
  )
}
