# Shelf — Brand Guidelines

> Version 1.0 · April 2026 · Assimetria

---

## 1. Brand Overview

**Shelf** is a digital content library platform for curious minds. It helps users save, organize, and rediscover web content — articles, links, newsletters, and resources — through an organized, visually calm, and intelligent interface.

### Brand Positioning
Shelf sits at the intersection of **discipline and discovery**. It's the tool that transforms chaotic browser tabs and forgotten bookmarks into an organized, searchable personal knowledge library.

### Brand Personality
- **Organized** — structured, purposeful, every pixel in its place
- **Warm** — inviting orange energy, not cold productivity software
- **Intelligent** — surfaces the right content at the right moment
- **Minimal** — removes friction, never adds noise

### Tagline
> *Your digital content, beautifully organized.*

---

## 2. Logo System

### Logo Mark
The Shelf logo mark is a stylized bookshelf: three horizontal bars (shelves) in descending width and opacity from top to bottom, with an indigo vertical support pillar on the left. Decorative book-spine items in indigo rest on each shelf.

**Design intent:** The three shelves represent hierarchy and organization. The items on each shelf suggest living, useful content — not static storage. The indigo accent creates depth and sophistication against the warm orange primary.

### Logo Variants

| File | Use case | Background |
|------|----------|------------|
| `logo-mark.svg` | App icon, favicon, profile pictures | Any |
| `logo.svg` | Default full logo (mark + wordmark) | Light |
| `logo-dark.svg` | Full logo for dark backgrounds | Dark |
| `logo-white.svg` | Full logo on branded/colored backgrounds | Dark / colored |
| `logo-wordmark.svg` | Horizontal compact logo | Light |
| `logo-wordmark-dark.svg` | Horizontal compact logo | Dark |
| `logo.png` | Raster export for platforms requiring PNG | Light |
| `logo-white-on-dark.png` | Raster white-on-dark | Dark |
| `logo-accent-on-dark.png` | Raster accent-on-dark | Dark |

### Clear Space
Maintain clear space equal to the height of the letter "S" in the wordmark around all sides of the logo. Never crowd the logo with other elements.

### Minimum Sizes
- Logo mark only: 16px minimum (digital), 8mm (print)
- Full wordmark: 80px minimum width (digital), 30mm (print)

### Logo Don'ts
- Do not rotate the logo
- Do not change the logo colors to anything outside the approved palette
- Do not add drop shadows, outlines, or effects
- Do not place the light logo on light backgrounds
- Do not stretch or distort the logo
- Do not use the wordmark at a different weight than the defined Inter Bold

---

## 3. Color System

### Primary Brand Color

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand` | `#F97316` | Primary CTA buttons, key highlights, logo shelves |
| `--brand-light` | `#FB923C` | Hover states, gradient endpoints |
| `--brand-dark` | `#EA6A0A` | Active states, pressed buttons |

**Orange** is the heart of Shelf. It's warm, energetic, and optimistic — it signals action and discovery without feeling aggressive.

### Accent Color

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#6366F1` | Indigo accent, logo support pillar, secondary elements |
| `--accent-light` | `#818CF8` | Hover states, gradient endpoints |
| `--accent-bg` | `rgba(99,102,241,0.10)` | Subtle accent backgrounds |

**Indigo** provides depth and sophistication. It balances the warmth of orange with calm intelligence.

### Background & Surface (Dark Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0a0a12` | App background |
| `--surface` | `#111120` | Cards, sidebar, panels |
| `--surface-2` | `#1a1a2e` | Elevated surfaces, hover states |
| `--surface-3` | `#212136` | Deepest surfaces, inputs |
| `--border` | `rgba(255,255,255,0.08)` | Default borders |
| `--border-strong` | `rgba(255,255,255,0.14)` | Emphasized borders |

### Background & Surface (Light Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#f8f9fc` | App background |
| `--surface` | `#ffffff` | Cards, sidebar, panels |
| `--surface-2` | `#f1f3f7` | Elevated surfaces |
| `--border` | `rgba(0,0,0,0.08)` | Default borders |

### Text Colors

| Token | Dark mode | Light mode | Usage |
|-------|-----------|------------|-------|
| `--text` | `#f9fafb` | `#111827` | Primary text |
| `--text-muted` | `#9ca3af` | `#6b7280` | Secondary text |
| `--text-dim` | `#4b5563` | `#9ca3af` | Placeholder, metadata |

### Status Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#34D399` | Confirmation, positive states |
| Warning | `#FBBF24` | Caution, pending states |
| Error | `#F87171` | Errors, destructive actions |
| Info | `#60A5FA` | Informational states |

---

## 4. Typography

### Primary Font: Inter

Shelf uses **Inter** as its sole typeface. Inter is a humanist sans-serif designed for digital screens — optimized for legibility at small sizes and beautiful at large display sizes.

**Load via Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Type Scale

| Name | Size | Weight | Letter-spacing | Usage |
|------|------|--------|----------------|-------|
| Display | 48–72px | 800 | -0.03em | Hero headlines |
| H1 | 32–40px | 800 | -0.02em | Page titles |
| H2 | 24–28px | 700–800 | -0.02em | Section headings |
| H3 | 18–20px | 700 | -0.01em | Card titles, feature heads |
| Body Large | 17–18px | 400 | 0 | Hero copy |
| Body | 15–16px | 400 | 0 | Standard body |
| Body Small | 13–14px | 400 | 0 | Secondary content |
| Caption | 11–12px | 500–600 | +0.04em | Labels, metadata |
| Label | 10–11px | 700 | +0.08em | Uppercase section labels |

### Type Rules
- Always use `-webkit-font-smoothing: antialiased` on the body
- Display text: weight 800, tight letter-spacing (-0.03em)
- Never set body text below 13px for readability
- Line-height for body text: 1.6–1.7
- Line-height for headings: 1.1–1.2

---

## 5. Spacing & Grid

### Base Unit
All spacing uses a **4px base unit**. Common values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.

### Layout Grid
- Desktop: 12-column grid, 1200px max-width, 24px gutters
- Tablet: 8-column grid, 16px gutters
- Mobile: 4-column grid, 16px gutters, 16px margins

### Component Spacing
- Card padding: 20–24px (1.25–1.5rem)
- Button padding: vertical 10–12px, horizontal 16–20px
- Section spacing: 80–96px (5–6rem) between major sections
- Item spacing in lists: 8–12px gap

---

## 6. UI Components

### Buttons

**Primary (Orange)**
- Background: `#F97316`
- Text: `#ffffff`
- Hover: `#FB923C` + `translateY(-1px)`
- Border-radius: 8–10px
- Box-shadow on CTA: `0 4px 24px rgba(249,115,22,0.3)`

**Ghost / Outline**
- Background: transparent
- Border: 1px solid `rgba(255,255,255,0.08)` (dark) / `rgba(0,0,0,0.08)` (light)
- Hover: border becomes `rgba(255,255,255,0.2)`

**Destructive**
- Use sparingly. Background: `#EF4444`. Always require confirmation.

### Cards
- Background: `var(--surface)`
- Border: 1px solid `var(--border)`
- Border-radius: 12–16px
- Hover: border-color strengthens + subtle `translateY(-1px)` + `box-shadow`

### Form Inputs
- Background: `var(--surface-2)`
- Border: 1px solid `var(--border)`
- Border-radius: 8px
- Focus ring: `box-shadow: 0 0 0 3px rgba(249,115,22,0.08)` + `border-color: rgba(249,115,22,0.4)`
- Height: 40–44px

### Tags & Badges
- Inline tags: pill shape (`border-radius: 100px`), 12px font, 600 weight
- Color coding: orange for AI/Tech, indigo for Design, green for Product, purple for Engineering

---

## 7. Icon System

Shelf uses **Lucide React** icons exclusively. Do not mix with other icon libraries.

**Default spec:**
- Size: 15–16px for UI elements, 20–24px for feature icons
- Stroke width: 2px
- Color: `currentColor` (inherits from parent)

**Icon usage rules:**
- Always use icons at even pixel sizes (14, 16, 18, 20, 24)
- Pair icons with text whenever possible for clarity
- Standalone icons must have `title` or `aria-label` for accessibility

---

## 8. Illustration & Imagery Style

### Brand Illustrations
- Geometric, minimal
- Use brand colors (orange + indigo) for primary illustration elements
- Dark backgrounds: `#0a0a12` with radial gradient glows
- No photorealistic imagery in brand materials

### UI Screenshots
- Always show real, content-filled UI — never empty states or placeholder text
- Use dark theme as the primary showcase theme
- Frame in browser chrome mockup when showing the full product

### OG Images / Social Cards
- Dimensions: 1200×630px
- Background: `#0a0a12` (very dark)
- Left column: product name + tagline + key feature
- Right column: product mark / UI panel
- Subtle radial gradient at center: `rgba(249,115,22,0.08)`

---

## 9. Voice & Tone

### Brand Voice
Shelf speaks like a **knowledgeable friend who loves learning** — warm, direct, never condescending. We're enthusiastic about knowledge without being preachy.

### Tone Principles

**Clear over clever**
Write to be understood immediately. Avoid jargon, metaphors that need unpacking, or jokes that fall flat.

**Active over passive**
"Save articles in one click" not "Articles can be saved with a single click."

**Specific over generic**
"Search 247 saved articles in under 50ms" not "Find content fast."

**Human over formal**
"You're all set" not "The operation completed successfully."

### Content Do's and Don'ts

| Do | Don't |
|----|-------|
| "Save anything from the web" | "Leverage content aggregation capabilities" |
| "Your library, organized" | "A comprehensive knowledge management solution" |
| "Find it in seconds" | "Rapid retrieval functionality" |
| "12,400 people use Shelf" | "A growing user base relies on our platform" |

---

## 10. Brand Applications

### App Icon
Use `logo-mark.svg` at 1024×1024px with `#F97316` as the background fill. Apply 22.5% border-radius for iOS, 0% for Android adaptive icons.

### Favicon
Use `favicon.svg` — the simplified three-bar mark in orange. Provide both SVG and ICO formats.

### Email
- Brand signature: Wordmark (`logo-wordmark-dark.svg`) at 120px wide
- Background: white or `#f8f9fc` for email body
- Primary accent: `#F97316` for CTAs and links

### Social Media
- Profile picture: `logo-mark.svg` on `#0a0a12` background, circular crop
- Cover images: 1584×396px (LinkedIn) / 1500×500px (Twitter) — dark background, wordmark centered

---

*Last updated: April 2026 — Shelf v1.0 Brand System*
