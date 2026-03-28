# Portfolio Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all issues found in the deep code audit: security (XSS), SEO, accessibility, code conventions, and UX completeness.

**Architecture:** All fixes are isolated to existing files — no new abstractions, no restructuring. Each task is independent and can be committed individually. Verification uses `npm run lint` + `npm run build` (no test suite configured).

**Tech Stack:** Next.js 16.2.1, React 19, Tailwind CSS v4, Framer Motion 12, TypeScript strict mode.

---

## File Map

| File | Tasks that touch it |
|------|-------------------|
| `src/app/actions/send-email.ts` | 1, 7 |
| `src/components/sections/ContactSection.tsx` | 2 |
| `src/app/layout.tsx` | 3, 7 |
| `src/components/sections/ProjectsSection.tsx` | 4 |
| `src/components/sections/AboutSection.tsx` | 5 |
| `src/components/layout/Sidebar.tsx` | 6, 7 |
| `src/components/layout/ThemeToggle.tsx` | 6, 7 |
| `src/app/error.tsx` | 8 (create) |
| `src/app/not-found.tsx` | 8 (create) |
| `src/app/robots.ts` | 9 (create) |
| `src/app/sitemap.ts` | 9 (create) |
| `src/app/globals.css` | 10 |

---

## Task 1: Fix XSS vulnerability in email server action

**Files:**
- Modify: `src/app/actions/send-email.ts`

**Why:** User-supplied `name`, `email`, and `message` are interpolated directly into an HTML string without escaping. A message containing `<script>` or other HTML is injected verbatim into the email.

- [ ] **Step 1: Add `escapeHtml` helper and apply it to the HTML template**

Replace the entire file:

```ts
'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function sendEmail(formData: FormData) {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return { error: "Invalid form data. Please check your inputs." }
  }

  const { name, email, message } = validatedFields.data

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['davidesambughi@gmail.com'],
      subject: `New message from ${escapeHtml(name)} via Portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { error: "Failed to send email. Please try again later." }
    }

    return { success: true }
  } catch (err) {
    console.error('System error:', err)
    return { error: "A server error occurred. Please try again later." }
  }
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

Expected: clean output, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/actions/send-email.ts
git commit -m "fix: escape HTML entities in email template to prevent XSS"
```

---

## Task 2: Replace placeholder social URLs in ContactSection

**Files:**
- Modify: `src/components/sections/ContactSection.tsx` (lines ~179, ~185)

**Why:** Both links contain `vostro-username` (Italian for "your username") — unfilled placeholders that are live in production.

- [ ] **Step 1: Replace the two `href` values with real URLs**

In `ContactSection.tsx`, locate the two `<a>` tags inside the social `<Button>` components and update:

```tsx
// GitHub button (~line 179)
<a href="https://github.com/YOUR_ACTUAL_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="GitHub">

// LinkedIn button (~line 185)
<a href="https://linkedin.com/in/YOUR_ACTUAL_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
```

> Replace `YOUR_ACTUAL_HANDLE` with the real slugs before committing.

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

Click both buttons in the browser — confirm they navigate to the correct profiles.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ContactSection.tsx
git commit -m "fix: replace placeholder social URLs with real profile links"
```

---

## Task 3: Fix page metadata and `lang` attribute

**Files:**
- Modify: `src/app/layout.tsx`

**Why:** `title: "Portfolio"` and `description: "My portfolio"` are generic. `lang="it"` declares the page as Italian, but all content is English. No Open Graph tags means bare link previews on social/chat.

- [ ] **Step 1: Replace the `metadata` export, update `lang`, fix the Italian inline comment**

Replace the full file:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Providers } from "@/components/layout/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Davide Sambughi — Full-Stack Developer",
  description:
    "Portfolio of Davide Sambughi, a full-stack developer specializing in Next.js 16, GEO-optimized web apps, and AI-assisted development.",
  openGraph: {
    title: "Davide Sambughi — Full-Stack Developer",
    description:
      "Full-stack developer specializing in Next.js 16, GEO-optimized web apps, and AI-assisted development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davide Sambughi — Full-Stack Developer",
    description:
      "Full-stack developer specializing in Next.js 16, GEO-optimized web apps, and AI-assisted development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex bg-background text-foreground">
        <Providers>
          <Sidebar />
          <ThemeToggle />
          {/* pl-14 = 56px — collapsed sidebar width, must match SIDEBAR_COLLAPSED in Sidebar.tsx */}
          <div className="flex-1 pl-14">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

In browser source: confirm `<html lang="en">` and `<title>Davide Sambughi — Full-Stack Developer</title>`.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: personalize metadata, add Open Graph tags, fix lang=en"
```

---

## Task 4: Fix semantic HTML in ProjectsSection

**Files:**
- Modify: `src/components/sections/ProjectsSection.tsx` (~line 92)

**Why:** `<motion.article role="button">` stacks an explicit `role="button"` on top of the implicit `article` role — screen readers announce a contradiction. `<motion.div role="button">` has no implicit role conflict.

- [ ] **Step 1: Change `motion.article` → `motion.div`, add `aria-label`**

Find the outer animated element (around line 92). Change the opening and closing tags and add `aria-label`:

```tsx
// Before
<motion.article
  key={title}
  role="button"
  tabIndex={0}
  aria-selected={isSelected}
  onClick={...}
  onKeyDown={...}
  ...
>
  ...
</motion.article>

// After
<motion.div
  key={title}
  role="button"
  tabIndex={0}
  aria-label={title}
  aria-selected={isSelected}
  onClick={...}
  onKeyDown={...}
  ...
>
  ...
</motion.div>
```

All other props, className, and children stay identical.

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

In browser: cards render, hover animations work, Tab → Enter/Space triggers the action.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProjectsSection.tsx
git commit -m "fix: replace motion.article+role=button with motion.div for valid ARIA semantics"
```

---

## Task 5: Remove unused `'use client'` and `motion` import from AboutSection

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`

**Why:** `AboutSection` has `'use client'` and imports `motion` from `framer-motion`, but contains zero `<motion.*>` elements. It is a pure Server Component.

- [ ] **Step 1: Delete lines 1–3 (the directive and the import)**

```tsx
// DELETE these three lines at the top of the file:
'use client'

import { motion } from 'framer-motion'
```

The remaining import line (`import { cn } from '@/lib/utils'`) stays. Everything else is unchanged.

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

Expected: no errors. The About section renders identically — there are no animations to break.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "fix: remove unused use client and motion import from AboutSection"
```

---

## Task 6: Fix Italian aria-labels

**Files:**
- Modify: `src/components/layout/Sidebar.tsx` (~line 71)
- Modify: `src/components/layout/ThemeToggle.tsx` (~line 22)

**Why:** Aria-labels are read aloud by screen readers. Italian labels on an English-language page are confusing to English-speaking assistive technology users.

- [ ] **Step 1: Fix `Sidebar.tsx` toggle button**

```tsx
// Before
aria-label={open ? 'Chiudi sidebar' : 'Apri sidebar'}

// After
aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
```

- [ ] **Step 2: Fix `ThemeToggle.tsx` button**

```tsx
// Before
aria-label={isDark ? 'Passa a light mode' : 'Passa a dark mode'}

// After
aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/components/layout/ThemeToggle.tsx
git commit -m "fix: translate Italian aria-labels to English"
```

---

## Task 7: Translate remaining Italian code comments to English

**Files:**
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/components/layout/ThemeToggle.tsx`

**Why:** `CLAUDE.md` convention: *"Comments — English only."*

- [ ] **Step 1: Fix `Sidebar.tsx` JSX comments**

```tsx
{/* ── Separatore ── */}    →    {/* ── Separator ── */}
{/* ── Navigazione ── */}  →    {/* ── Navigation ── */}
```

The `// Pick the section with the highest visible ratio` comment is already English — leave it.

- [ ] **Step 2: Fix `ThemeToggle.tsx` inline comment**

```tsx
// Evita hydration mismatch — renderizza solo dopo il mount
// →
// Avoid hydration mismatch — only render after mount
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/components/layout/ThemeToggle.tsx
git commit -m "fix: translate Italian code comments to English per CLAUDE.md convention"
```

---

## Task 8: Add error.tsx and not-found.tsx

**Files:**
- Create: `src/app/error.tsx`
- Create: `src/app/not-found.tsx`

**Why:** Without these, any unhandled error or unknown URL shows Next.js's default system UI, visually inconsistent with the portfolio.

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] gap-6 px-12 text-center">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground/40">
        404
      </p>
      <h1 className="text-4xl font-bold text-foreground tracking-tight">
        Page not found
      </h1>
      <p className="text-muted-foreground text-base max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild variant="outline">
        <a href="/">Go home</a>
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/error.tsx`**

`error.tsx` must be a Client Component — Next.js requires it to receive `error` and `reset` props.

```tsx
'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] gap-6 px-12 text-center">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground/40">
        Error
      </p>
      <h1 className="text-4xl font-bold text-foreground tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground text-base max-w-sm">
        An unexpected error occurred. Try refreshing the page.
      </p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

Start `npm run dev` and navigate to `localhost:3000/nonexistent` — confirm the 404 page uses the portfolio's design system.

- [ ] **Step 4: Commit**

```bash
git add src/app/not-found.tsx src/app/error.tsx
git commit -m "feat: add branded error.tsx and not-found.tsx pages"
```

---

## Task 9: Add robots.ts and sitemap.ts

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

**Why:** Tells crawlers what to index and helps search engines discover the page. Generated automatically by Next.js App Router file conventions.

- [ ] **Step 1: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://YOUR_DOMAIN/sitemap.xml',
  }
}
```

> Replace `YOUR_DOMAIN` with the actual deployed domain before committing.

- [ ] **Step 2: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://YOUR_DOMAIN'

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

> Replace `YOUR_DOMAIN` with the actual deployed domain before committing.

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

With `npm run dev` running:
- `localhost:3000/robots.txt` → plain-text robots file
- `localhost:3000/sitemap.xml` → valid XML sitemap

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "feat: add robots.ts and sitemap.ts for SEO"
```

---

## Task 10: Translate Italian comments in globals.css (cosmetic)

**Files:**
- Modify: `src/app/globals.css`

**Why:** `CLAUDE.md`: *"Comments — English only."* ~30 Italian section headers appear throughout the 625-line file. No behavior changes — comments only.

- [ ] **Step 1: Find and replace Italian section headers**

Search for each Italian string and replace with the English equivalent:

| Italian | English |
|---------|---------|
| `PALETTE PRIMITIVA` | `PRIMITIVE PALETTE` |
| `brand primario` | `primary brand` |
| `accento caldo` | `warm accent` |
| `successo` | `success` |
| `distruttivo` | `destructive` |
| `informativo` | `informational` |
| `grigio leggermente freddo` | `slightly cool gray` |
| `TOKEN SEMANTICI` | `SEMANTIC TOKENS` |
| `Superfici` | `Surfaces` |
| `Primario` | `Primary` |
| `Secondario` | `Secondary` |
| `Accento — electric blue (sostituisce amber nell'UI)` | `Accent — electric blue` |
| `Stato` | `State` |
| `Bordi & input` | `Borders & input` |
| `Grafici — uno per palette` | `Charts — one per palette` |
| `Primario — vivid violet sul fondo nero` | `Primary — vivid violet on black background` |
| `Accento — neon electric cyan` | `Accent — neon electric cyan` |
| `Bordi & input — semitrasparenti sul fondo nero` | `Borders & input — semi-transparent on black background` |
| `TOKEN OMBRE` | `SHADOW TOKENS` |
| `Glow colorati` | `Colored glows` |
| `TOKEN GRADIENTI & GLOW` | `GRADIENT & GLOW TOKENS` |
| `TOKEN ANIMAZIONE` | `ANIMATION TOKENS` |
| `Durate` | `Durations` |
| `Curve di easing` | `Easing curves` |
| `TOKEN Z-INDEX` | `Z-INDEX TOKENS` |
| `TOKEN TIPOGRAFIA` | `TYPOGRAPHY TOKENS` |
| `Scale dimensioni (Major Third — ×1.25)` | `Size scale (Major Third — ×1.25)` |
| `Interlinea` | `Line heights` |
| `Spaziatura lettere` | `Letter spacing` |
| `Pesi` | `Font weights` |
| `Mappa i CSS custom properties alle utility Tailwind` | `Maps CSS custom properties to Tailwind utilities` |
| `Colori — superfici` | `Colors — surfaces` |
| `Colori — semantici` | `Colors — semantic` |
| `Colori — grafici` | `Colors — charts` |
| `Colori — palette Violet` | `Colors — Violet palette` |
| `Colori — palette Amber` | `Colors — Amber palette` |
| `Colori — palette Emerald` | `Colors — Emerald palette` |
| `Colori — palette Coral` | `Colors — Coral palette` |
| `Colori — palette Electric (neon cyan, H:198°)` | `Colors — Electric palette (neon cyan, H:198°)` |
| `Colori — palette Cyan` | `Colors — Cyan palette` |
| `Colori — palette Neutral` | `Colors — Neutral palette` |
| `Ombre custom` | `Custom shadows` |
| `Gradienti brand (usabili via bg-[var(--gradient-brand)] ecc.)` | `Brand gradients (usable via bg-[var(--gradient-brand)] etc.)` |
| `Sidebar tint — violet dominant, electric hint al centro` | `Sidebar tint — violet dominant, electric hint at center` |

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

CSS comment changes cannot affect rendering, but the build must still be clean.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: translate Italian comments in globals.css to English"
```

---

## Summary

| # | Task | Priority | Risk |
|---|------|----------|------|
| 1 | Fix XSS in email HTML | Critical | Low — adds escaping, no behavior change |
| 2 | Replace placeholder social URLs | High | Low — content only |
| 3 | Fix metadata & `lang="en"` | High | Low — metadata only |
| 4 | Fix semantic HTML in ProjectsSection | High | Low — tag name change |
| 5 | Remove unused `'use client'` from AboutSection | Medium | Low — removes dead code |
| 6 | Fix Italian aria-labels | Medium | Low — string values |
| 7 | Translate Italian comments (Sidebar, ThemeToggle) | Low | None — comments only |
| 8 | Add `error.tsx` and `not-found.tsx` | Low | Low — new files only |
| 9 | Add `robots.ts` and `sitemap.ts` | Low | Low — new files only |
| 10 | Translate Italian in `globals.css` | Low (cosmetic) | None — comments only |
