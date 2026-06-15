
# ForgeKit / WatchForge — Phase 1 Build Plan

Building Phase 1 (P0 + select P1) per the PRD. Watch-modding build planner with a configurator, live cost calc, local save, and tip jar embed. No backend yet — pure frontend + localStorage, which keeps it shippable in one session and matches the PRD's Phase 1 scope.

## Scope (this build)

In scope:
- Landing page (hero, what it does, CTA to start a build)
- Build Configurator (the core product)
- Live cost calculator (sticky footer with part count + total)
- Part compatibility hints (inline warnings on tiles)
- Save build to localStorage (auto-save + named build)
- Build name + freeform notes
- Vendor links per part (Namoki, Secondhand Mods, etc.)
- Learn page (glossary of part categories + beginner tips)
- Support/About page with Buy Me a Coffee link
- Seeded parts JSON (movements, cases, dials, hands, bezel, crystal, strap) using real examples from the PRD

Out of scope (later phases): Supabase auth/cloud save, public gallery, purchase-status tracking, cost-vs-retail savings, affiliate tracking, PDF export, multi-build switching.

## Design direction

Per PRD §9: dark-mode-first, premium/technical "tool not toy" feel.
- Background `#0F172A`, cards `#1E293B`, accent amber `#F59E0B`
- Tokens exposed as `--forge-*` CSS variables in styles.css so the same codebase reskins for the future Gumroad template
- Typography: technical sans (Inter for body, Space Grotesk for display) loaded via `<link>` in `__root.tsx`
- Mobile-first stacked cards; collapsible category cards with option tiles inside

## Screens / routes

- `/` — Landing: hero, 4-step loop (Learn → Plan → Execute → Track), "Start a build" CTA
- `/build` — Configurator: collapsible category cards, sticky footer (build name editable inline, parts count, total, save indicator), notes panel
- `/learn` — Glossary of part categories + compatibility tips
- `/support` — About + BMAC embed + (future) Gumroad template link
- Shared top nav + footer with persistent tip jar link

## Data model (Phase 1, local JSON)

`src/data/parts.ts` — array of parts seeded from PRD §5.2:
```ts
type Part = {
  id: string;
  category: 'movement'|'case'|'dial'|'hands'|'bezel'|'crystal'|'strap';
  name: string;
  brand: string;
  priceUsd: number;          // midpoint of PRD range
  priceRange: [number, number];
  description: string;
  vendorUrl?: string;
  vendorName?: string;
  compatibility?: string[];  // tags e.g. 'nh35-feet', 'lug-20mm'
  requires?: string[];       // tags this part needs from others
}
```

Build state in localStorage:
```ts
type Build = {
  name: string;
  notes: string;
  selections: Partial<Record<Category, string /* partId */>>;
  updatedAt: string;
}
```
Custom hook `useBuild()` wraps load/save/update with debounced persistence.

Compatibility: simple tag intersection — when a selected part declares `requires: ['nh35-feet']` and another selected part lacks that in its `compatibility`, surface an inline amber warning on the conflicting tile and a summary chip in the footer. Lightweight, no solver.

## File plan

- `src/styles.css` — add `--forge-*` token layer, map to Tailwind `@theme inline`, dark default
- `src/routes/__root.tsx` — load Inter + Space Grotesk via `<link>`, update meta, add shared nav + footer shell with `<Outlet />`
- `src/routes/index.tsx` — landing page
- `src/routes/build.tsx` — configurator page
- `src/routes/learn.tsx` — glossary
- `src/routes/support.tsx` — about + BMAC
- `src/components/forge/SiteNav.tsx`, `SiteFooter.tsx`, `TipJar.tsx`
- `src/components/forge/CategoryCard.tsx`, `PartTile.tsx`, `StickyBuildFooter.tsx`, `CompatibilityBadge.tsx`, `BuildNotes.tsx`
- `src/data/parts.ts` — seeded parts
- `src/data/categories.ts` — category metadata (label, icon, order, helper copy)
- `src/data/glossary.ts` — Learn content
- `src/lib/build-storage.ts` — localStorage helpers
- `src/hooks/use-build.ts` — build state hook
- `src/hooks/use-compatibility.ts` — derive warnings

## Technical notes

- Pure client-side; no Lovable Cloud yet. (Cloud sync is explicitly Phase 3.)
- Use existing shadcn primitives (card, collapsible, button, badge, dialog, input, textarea, sonner) — no new deps.
- BMAC embed = simple anchor link styled as a button (their script embed isn't necessary for v1 and avoids third-party script weight). The link URL is a placeholder the user can swap.
- Vendor URLs in seed data are placeholder-safe (linking to vendor homepages, not affiliate-tagged).
- Build only Phase 1 features; do not scaffold auth, gallery, or purchase tracking — those bloat context per PRD §10.

## Questions before building

I'll proceed with sensible defaults unless you say otherwise:
1. BMAC handle — placeholder `your-handle`, you swap later. OK?
2. Vendor URLs — generic homepage links (Namoki.com etc.), no affiliate params. OK?
3. Brand name shown on site — "WatchForge" (with small "by ForgeKit" tag). OK?

Approve and I'll build it.
