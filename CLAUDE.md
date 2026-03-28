# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured.

**Environment** — requires `RESEND_API_KEY` in `.env.local` for the contact form (`src/app/actions/send-email.ts`).

## Architecture

Single-page portfolio built with **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4** + **Framer Motion**.

**Page structure** — `src/app/page.tsx` renders one `<main>` with five sections (`#hero`, `#projects`, `#stack`, `#about`, `#contact`). Navigation is scroll-based via `scrollIntoView`, not route-based.

**Layout shell** — `src/app/layout.tsx`:
- `<Providers>` — `next-themes` ThemeProvider (default: dark, `attribute="class"`)
- `<Sidebar>` — fixed left nav, 56 px collapsed / 220 px expanded, smooth-scrolls to sections, tracks active section via `IntersectionObserver`
- `<ThemeToggle>` — fixed top-right
- `div.flex-1.pl-14` — content area (pl-14 = 56 px = collapsed sidebar width)

**Components** — `src/components/`:
- `layout/` — Sidebar, ThemeToggle, Providers (all `'use client'`)
- `sections/` — one file per page section
- `ui/` — reusable primitives (SectionDivider, button)

**Styling** — `src/app/globals.css` is the single source of truth for the design system. Never define one-off colors outside it.

**Path alias** — `@/` → `src/`.

**Key utilities & libraries**:
- `cn()` — `src/lib/utils.ts`, clsx + tailwind-merge, use for all conditional classNames
- `cva()` — `class-variance-authority`, use for component variants (installed, not `cn`)
- `lucide-react` — icon library; import icons directly from it
- `@base-ui/react` — unstyled UI primitives (use over raw HTML for accessible interactive elements)
- `tw-animate-css` — animation utility classes available via Tailwind
- `shadcn` — installed; `globals.css` imports `shadcn/tailwind.css`, giving access to all shadcn component primitives

**Contact form** — `src/app/actions/send-email.ts` is a Server Action using Resend (email delivery) and Zod (form validation). Input comes from a `FormData` object.

---

## Client vs Server components

Default to **Server Components**. Add `'use client'` only when the component genuinely needs:
- `useState` / `useEffect` / `useRef`
- Browser APIs (`window`, `document`, `IntersectionObserver`)
- Framer Motion hooks (`useScroll`, `useInView`, `useTransform`)
- User event handlers (`onClick`, `onChange`, etc.)

**Hard rule — server→client boundary:** Never pass React components, functions, or class instances as props from a Server Component to a Client Component — they cannot be serialized. Use string identifiers + a client-side lookup map instead.

**When a server/client split isn't worth it:** Static hardcoded data (no DB, no secrets, no `fetch`) gives no real benefit from splitting. Just use `'use client'` on the whole component. The split only pays off when the server side does real server work (DB query, auth check, `fetch` with secrets).

Push `'use client'` as far down the tree as possible — wrap only the interactive leaf, not the whole section.

---

## Design system

### Semantic tokens

`globals.css` defines two token layers. Always use semantic tokens in components; reach for palette primitives only when no semantic token fits.

**Palette primitives** (OKLCH): `--violet-*`, `--electric-*`, `--amber-*`, `--emerald-*`, `--coral-*`, `--cyan-*`, `--neutral-*` (50–1000).

**Semantic tokens** (auto-switch light/dark):

| Token | Light | Dark | Use for |
|---|---|---|---|
| `--background` / `--foreground` | white / neutral-950 | neutral-1000 / neutral-50 | page surface & body text |
| `--card` / `--card-foreground` | neutral-50 | neutral-950 | card surfaces |
| `--primary` / `--primary-foreground` | violet-500ish | violet-400 | primary buttons, active states |
| `--secondary` | neutral-100 | neutral-900 | secondary buttons |
| `--muted` / `--muted-foreground` | neutral-100 / neutral-500 | neutral-800 / neutral-400 | placeholder, disabled, captions |
| `--accent` / `--accent-foreground` | electric-600 | electric-400 | highlights, focus rings |
| `--border` / `--input` | neutral-200 | neutral-800 | borders, form inputs |
| `--ring` | violet-500 | violet-400 | focus outlines |
| `--destructive` | coral-500 | coral-400 | errors, delete actions |
| `--success` | emerald-500 | emerald-400 | success states |
| `--warning` | amber-600 | amber-400 | warnings |
| `--info` | cyan-500 | cyan-400 | info messages |
| `--radius` | `0.5rem` | same | base border radius |

### Color pattern — light vs dark

The same glow/gradient pattern repeats across interactive elements:

| Role | Light mode | Dark mode |
|---|---|---|
| Brand / buttons / borders | Purple gradient (`--gradient-brand`, `--primary`) | Neon electric (`--electric-*`) |
| Glow | `--glow-primary` (purple) | `--glow-primary` (electric cyan, auto-switches via CSS cascade) |
| Separator | `--gradient-sep` | `--gradient-sep` (neon version) |
| Sidebar tint | `--gradient-sidebar` | `--gradient-sidebar` (neon version) |

`var(--glow-primary)` and `var(--gradient-*)` tokens automatically return the correct value per theme — no `dark:` duplication needed for glow/gradient values. Use `dark:` only for solid color utilities (e.g. `dark:border-electric-400/55`).

### Gradient borders

CSS `border-color` does not accept gradients. Two valid approaches:
1. **Box-shadow layering** — `[box-shadow:0_0_0_1px_var(--glow-primary),0_0_24px_var(--glow-primary)]`
2. **Inline `backgroundImage`** — use `style={{ backgroundImage: 'var(--gradient-brand)' }}` on the element (works for backgrounds, not borders)

### Tailwind v4

Config is CSS-first via `@theme inline` in `globals.css` — no `tailwind.config.*`. All custom tokens must be registered there to be available as utilities.

---

## Conventions

- **Comments** — English only. Only comment where logic isn't self-evident. Section headers use `{/* ── Label ── */}`.
- **Sections** — each section gets its own file in `src/components/sections/`. The section component owns its `id`, padding, and background. `SectionDivider` is placed between sections in `page.tsx`.
- **New sections** — must add a matching entry to `NAV_ITEMS` in `Sidebar.tsx`.
- **Sidebar sync** — `SIDEBAR_COLLAPSED = 56px` in `Sidebar.tsx` must match `pl-14` in `layout.tsx`.
- **No one-off abstractions** — don't create helpers for things used once. Shared primitives go in `src/components/ui/`.
- **Images** — use `next/image` with explicit `width`/`height` or `fill` + `sizes`. Never raw `<img>`.

---

## Performance

- **Server Components first** — reduces JS bundle. Client components are SSR'd but still ship JS to the client.
- **Lazy-load heavy client sections** — use `dynamic(() => import(...), { ssr: false })` for sections with large client dependencies (e.g. 3D, charts) that don't need SSR.
- **CSS over JS animations** — prefer CSS transitions/`@keyframes` for simple effects. Use Framer Motion only when JS-driven values are necessary (`useScroll`, `useTransform`, spring physics). A looping `transform: translateX` is GPU-composited and free.
- **`next/image` always** — never raw `<img>`. Provides automatic WebP conversion, lazy loading, and layout shift prevention.
- **No premature optimization** — don't add `useMemo`/`useCallback` speculatively. Add them only when a profiler shows a real problem.

## Proactive guidance

Always flag before implementing — don't wait to be asked:
- A request that would hurt performance or SEO (e.g. making a server component client unnecessarily, adding heavy JS for something CSS can do)
- Passing non-serializable values across the server/client boundary
- Hardcoding colors instead of using design tokens
- A server/client split with no real server-side work
- Anything where there's a simpler or more idiomatic approach
