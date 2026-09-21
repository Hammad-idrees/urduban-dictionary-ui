# Urduban

A responsive English to Urdu dictionary interface, built from a Figma design.

**Live:** https://urduban-dictionary-ui.vercel.app
**Repository:** https://github.com/Hammad-idrees/urduban-dictionary-ui

Built as a frontend assessment. The brief required React with plain CSS only, no
CSS frameworks or component libraries.

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 |
| Build | Vite 8 |
| Styling | Plain CSS with BEM naming and CSS custom properties |
| State | React hooks only |
| Dependencies | `react`, `react-dom` (no UI, CSS or state libraries) |

## Getting started

Requires Node.js 20.19 or newer (or 22.12 and above), as specified by Vite 8.

```bash
npm install
npm run dev      # start the dev server on http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
├── assets/            # icons and images exported from the design
├── components/
│   ├── layout/        # Header (with mobile drawer), Footer
│   ├── search/        # SearchPanel, SearchBar, LanguageSelector
│   ├── definitions/   # DefinitionSection, ExampleSentences, DefinitionSkeleton
│   ├── sidebar/       # AppDownloadCard, PromoCarousel, OtherWordsCard
│   ├── commonWords/   # CommonWordsCarousel, WordCard
│   └── ui/            # Card, Skeleton, ReadingProgress, ScrollToTop
├── data/              # dictionary entries and navigation links
├── hooks/             # useScrollReveal, useMediaQuery, useClickOutside
├── styles/            # variables.css, reset.css, global.css
├── App.jsx            # page composition and shared state
└── main.jsx           # entry point
```

Each component is a folder holding its own `.jsx` and `.css` file, so a
component and its styles move or get deleted together.

## Features

- Word search with live suggestions, full keyboard support (arrow keys to move,
  Enter to select, Escape to dismiss)
- Language selector with a swap control that reorders the English and Urdu
  columns
- Paged carousel of common phrases with dismissible cards
- Auto-rotating sidebar ad carousel that pauses on hover and focus, with dots
  and an explicit pause control
- Clickable related words that trigger a new lookup
- Explicit empty state when a search returns no match
- Skeleton placeholders while a lookup resolves, shaped to match the real
  content so nothing reflows when it arrives
- Worked example sentences for each entry, English above Urdu
- Scroll reveal animations, reading progress bar, back to top control

## Implementation notes

**Design tokens.** Every colour, font size, space and duration lives in
`src/styles/variables.css`. Components reference tokens instead of literal
values, so the whole theme changes from one file.

**Fluid typography.** Type scales with `clamp()` rather than being overridden at
each breakpoint, which keeps media queries limited to layout changes.

**State.** All shared state is held in `App.jsx` and passed down. With one page
and a handful of consumers, a context or store would add indirection without
removing meaningful prop passing.

**Data layer.** `src/data/dictionary.js` is shaped like an API response, and
every lookup already goes through an async boundary in `App.jsx` with a loading
state around it. Swapping the local data for a real `fetch` is a change to one
function, with no component or markup changes.

**Bilingual text.** Urdu content carries `lang="ur"` and `dir="rtl"`. Inter has
no Urdu glyphs, so Noto Naskh Arabic is loaded separately. Without it the
browser picks an arbitrary fallback and the differing line heights break the
alignment between the two columns.

**Animation.** Reveal transitions use `IntersectionObserver` rather than scroll
listeners. A single `prefers-reduced-motion` block disables all motion for users
who have asked their system to reduce it.

## Responsive behaviour

| Breakpoint | Change |
|------------|--------|
| 1024px | Sidebar moves below the article and splits into two columns |
| 900px | Navigation collapses into a hamburger drawer |
| 768px | English and Urdu definition columns stack |
| 700px | Sidebar becomes a single column |
| 600px | Carousel shows one card per page, footer centres |

## Accessibility

- Semantic landmarks (`header`, `main`, `aside`, `footer`, `nav`)
- Skip link to main content
- Combobox semantics on search (`aria-expanded`, `aria-activedescendant`)
- Visible `:focus-visible` rings, hidden controls removed from the tab order
- Icon-only buttons labelled with `aria-label`
- Carousel updates announced through `aria-live`

## Performance

Lighthouse results for the live deployment at
https://urduban-dictionary-ui.vercel.app

| Device  | Performance | Accessibility | Best Practices | SEO |
|---------|-------------|---------------|----------------|-----|
| Desktop | 98          | 100           | 100            | 100 |
| Mobile  | 86          | 100           | 100            | 100 |

Key mobile metrics: FCP 1.9s, LCP 4.0s, TBT 20ms, CLS 0.

Tests were run with Lighthouse 13 in Chrome DevTools against the production
build.

## Assets

Icons and the logo were exported from the Figma source. Store badges come from
Apple's and Google's official developer badge resources. Advertisement creatives
are original artwork and carry no third party branding.
