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

**Page structure** — `src/app/page.tsx` renders one `<main>` with five full-screen sections (`#hero`, `#projects`, `#stack`, `#about`, `#contact`). Navigation is scroll-based, not route-based.

**Layout shell** — `src/app/layout.tsx` wraps every page with:
- `<Providers>` — `next-themes` ThemeProvider (default: dark, attribute: `class`)
- `<Sidebar>` — fixed left nav (56 px collapsed / 220 px expanded) that smooth-scrolls to sections
- `<ThemeToggle>` — fixed top-right dark/light toggle
- A `div.flex-1.pl-14` content area (pl-14 = 56 px = collapsed sidebar width)

**Components** live in `src/components/`:
- `layout/` — `Sidebar.tsx`, `ThemeToggle.tsx`, `Providers.tsx` (all `'use client'`)
- `ui/` — shadcn-style primitives (currently only `button.tsx`)

**Styling** — `src/app/globals.css` defines the entire design system:
- Custom OKLCH primitive palettes: `--violet-*` (brand), `--amber-*` (accent), `--emerald-*` (success), `--coral-*` (destructive), `--cyan-*` (info), `--neutral-*` (gray, H:265°)
- Semantic tokens (`--background`, `--foreground`, `--primary`, etc.) for both light and dark modes mapped to the primitives
- Shadow, z-index, animation duration/easing, and typography scale tokens
- `@theme inline` block bridges all tokens to Tailwind v4 utilities (`bg-primary`, `text-foreground`, etc.)

**Path alias** — `@/` maps to `src/`.

## Key conventions

- **Tailwind v4** is used (not v3). Config is CSS-first via `@theme inline` in `globals.css`, not `tailwind.config.*`.
- Dark mode is toggled by `.dark` class on `<html>` (managed by `next-themes`).
- Sidebar width offsets must stay in sync: `SIDEBAR_COLLAPSED = 56px` in `Sidebar.tsx` matches `pl-14` in `layout.tsx`.
- New sections added to `page.tsx` need a matching entry in `NAV_ITEMS` in `Sidebar.tsx`.
- All layout components are Client Components (`'use client'`) due to interactivity; section content components should default to Server Components.
