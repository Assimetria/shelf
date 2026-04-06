# Shelf Brand Guidelines

**Version 1.0 — April 2026**

Shelf is a digital library product for knowledge workers. These guidelines define how the Shelf brand should look and feel across all touchpoints — product, marketing, and communications.

---

## Brand Identity

### Mission
Shelf gives knowledge workers a single organized home for everything they save — links, documents, notes, videos, and files — so they can find and use what matters when they need it.

### Positioning
- **Category**: Digital knowledge library / Bookmarking and personal knowledge management (PKM)
- **Target audience**: Developers, designers, product managers, researchers, and founders who consume large amounts of content and struggle to find it again
- **Tone**: Calm, organized, reliable. Professional but never corporate. Clear and direct.

### Brand personality
- **Organized** — Every visual element has a purpose and a place
- **Warm** — Orange as the primary brand color communicates approachability and energy
- **Focused** — Minimal decoration; content is king
- **Confident** — Bold typography, clear hierarchy, strong contrast

---

## Logo

The Shelf logo mark depicts a stylized bookshelf: three horizontal shelves in descending gradient opacity (orange), supported by a vertical indigo pillar on the left, with small colored blocks representing books or items resting on the shelves.

### Logo variants

| File | Usage |
|------|-------|
| `logo-mark.svg` | Icon-only mark. Use in favicons, app icons, profile pictures, square contexts |
| `logo-dark.svg` | Full wordmark (mark + logotype) for dark backgrounds. Primary usage |
| `logo-white.svg` | Full wordmark on white/light backgrounds |
| `logo-white-on-dark.png` | Rasterized white logotype on dark, for email templates and social posts |
| `logo-accent-on-dark.png` | Rasterized orange+indigo mark on dark, for hero banners and OG images |
| `logo.png` | Rasterized standard logo, for contexts where SVG is unsupported |

### Clear space
Always maintain a minimum clear space around the logo equal to the height of the lowercase "e" in the wordmark on all sides. Never place the logo on busy backgrounds.

### Don'ts
- Do not rotate or skew the logo
- Do not recolor individual elements
- Do not apply drop shadows or gradients to the wordmark text
- Do not use the wordmark below 16px height (use mark-only below 24px)
- Do not place the orange logo on a red or pink background

---

## Color System

### Primary palette

| Name | Hex | Usage |
|------|-----|-------|
| Orange | `#F97316` | Primary brand color. CTAs, active states, highlights, shelf color accents |
| Orange Light | `#FB923C` | Hover states, gradients |
| Orange Pale | `#FED7AA` | Subtle backgrounds, empty state illustrations |
| Indigo | `#6366F1` | Secondary accent. Logo pillar, code, technical elements |
| Indigo Light | `#818CF8` | Indigo hover, gradient ends |

### Background palette (dark mode — default)

| Name | Hex | Role |
|------|-----|------|
| Background | `#0a0a12` | App canvas |
| Surface | `#111120` | Cards, panels, sidebar |
| Surface 2 | `#1a1a2e` | Input fields, hover states |
| Surface 3 | `#20203a` | Nested elements, chips |
| Border | `#1e1e30` | Default borders |
| Border Light | `#2a2a42` | Active/hover borders |

### Background palette (light mode)

| Name | Hex | Role |
|------|-----|------|
| Background | `#f8fafc` | App canvas |
| Surface | `#ffffff` | Cards, panels, sidebar |
| Surface 2 | `#f1f5f9` | Input fields, hover states |
| Border | `#e2e8f0` | Default borders |

### Text

| Name | Hex | Usage |
|------|-----|-------|
| Text | `#f1f5f9` (dark) / `#0f172a` (light) | Body copy, headings |
| Text muted | `#94a3b8` | Secondary labels, descriptions |
| Text subtle | `#64748b` | Timestamps, placeholders, tertiary info |

### Semantic colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#10b981` | Connected integrations, positive states |
| Warning | `#f59e0b` | Caution states, read-later items |
| Danger | `#ef4444` | Errors, destructive actions, delete |

---

## Typography

### Primary typeface: Inter

Shelf uses **Inter** exclusively across all product surfaces and marketing materials. Inter is available from Google Fonts.

```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

### Type scale

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Display | 2.5rem / 40px | 800 | Hero headings on landing |
| H1 | 1.75rem / 28px | 700 | Page titles |
| H2 | 1.25rem / 20px | 700 | Section headings |
| H3 | 1rem / 16px | 700 | Card titles |
| Body | 0.875rem / 14px | 400–500 | Body copy |
| Small | 0.78rem / 12.5px | 400–500 | Metadata, timestamps |
| Label | 0.7rem / 11px | 600–700 | Tags, badges, uppercase labels |

### Monospace: JetBrains Mono

Used for code snippets, API keys, keyboard shortcuts, and technical strings.

```
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## Spacing & Layout

### Base unit
`4px`. All spacing uses multiples of 4px.

### Border radius scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Chips, tags, badges |
| `--radius` | `10px` | Buttons, input fields |
| `--radius-lg` | `16px` | Cards, panels, modals |
| `--radius-xl` | `24px` | Large surface containers |

### Shadows
Shadows should be subtle. Use `0 4px 16px rgba(0,0,0,0.2)` for hover elevation on cards. Avoid heavy drop shadows.

---

## Component Patterns

### Buttons

- **Primary**: Background `#F97316`, white text, 8px border radius. Use for main CTAs.
- **Secondary**: Surface background, muted text, 1px border. Use for secondary actions.
- **Destructive**: 10% red background, red text, red border. Use only for delete/remove.

Button text should always be sentence case (not all-caps). Icon buttons use a 36×36px target area minimum.

### Cards

Standard card style:
- Background: `var(--surface)` (`#111120`)
- Border: `1px solid var(--border)` (`#1e1e30`)
- Border radius: `16px`
- Padding: `1.25rem` / `20px`
- Hover: Lift with `transform: translateY(-2px)` and `border-color: #F97316`

### Shelf color strips
Each shelf has a user-assigned color. Display it as a 4px top-border strip on shelf cards. Shelf tags in the item list use a 10% opacity version of the shelf color as a tinted chip background.

### Status badges
Use pill-shaped badges with:
- Connected: `#10b981` with small green dot prefix
- Error: `#ef4444` with small red dot prefix
- Disconnected/Neutral: Surface-3 background with muted text

---

## Iconography

Shelf uses **lucide-react** icons throughout the product UI. Icon size defaults:
- Sidebar icons: 16×16
- Toolbar/button icons: 14×14
- Stat card icons: 18×18
- Empty state icons: 24×24

Always use `stroke-width: 2` (the lucide default). Do not fill icons.

---

## Motion

Shelf animations are quick and purposeful. No decorative animations.

| Action | Duration | Easing |
|--------|----------|--------|
| Hover (color, border) | 150ms | `ease` |
| Hover (elevation/transform) | 150ms | `ease` |
| Theme toggle | 200ms | `ease` |
| Panel/modal open | 200ms | `ease-out` |
| Toast notification | 300ms | `ease-out` |

Never use `transition: all`. Always target specific properties.

---

## Voice & Tone

### Writing principles
1. **Be direct**: "Add item" not "Click here to begin adding a new item to your collection"
2. **Be specific**: "342 items" not "many items"
3. **Be human**: "Your library is empty. Save something you love." not "No records found."
4. **No jargon**: "Save" not "Ingest". "Shelves" not "Collections" (we own that word).

### Empty states
Always include:
- A brief, human description of why it's empty
- A single clear CTA
- An icon that relates to the context

### Error messages
Explain what went wrong + what the user can do. Never say just "Error" or "Something went wrong."

---

## Favicon

The favicon uses the logo mark SVG at 32×32. Use `<link rel="icon" href="/brands/shelf/favicons/favicon.svg" type="image/svg+xml">` as the primary favicon declaration. For legacy browser support, also include a 32×32 PNG fallback.

---

## OG Image

The OG image (`og-image.png`) is 1200×630px. It uses:
- Background: `#0a0a12` with a subtle radial gradient in the center
- Left column: Product name, tagline, and URL in white/muted text
- Right panel: Dashboard UI illustration
- Logo mark in the top-left corner

---

*These guidelines are maintained by the Shelf design team. Last updated: April 2026.*
