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

### Color pattern — light vs dark

The same semantic pattern repeats across every element:

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
