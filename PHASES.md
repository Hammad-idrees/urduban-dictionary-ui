# Urduban — Code Understanding Phases

Bottom-up order: foundations first, then the things built on them. Each phase
assumes only what came before.

---

## Phase 1 — Boot & build
**Files:** `index.html`, `vite.config.js`, `package.json`, `src/main.jsx`

How a browser request becomes a rendered page. Why there are only two runtime
dependencies, what `StrictMode` actually does, and why the three stylesheet
imports in `main.jsx` are in a fixed order that must not be rearranged.

*Reviewer trap:* "Why no CSS framework?"

---

## Phase 2 — The style system
**Files:** `styles/variables.css`, `styles/reset.css`, `styles/global.css`, `App.css`

Design tokens, why type uses `clamp()` instead of breakpoint overrides, the BEM
naming convention, the `.container` layout primitive, the `.reveal` class, the
single reduced-motion switch, and the z-index scale.

*Reviewer trap:* the z-index scale and stacking contexts — three separate bugs.

---

## Phase 3 — Data layer
**Files:** `data/dictionary.js`, `data/navigation.js`

Why the mock data is shaped like an API response, how `findEntry` and
`searchEntries` work, and the prefix-over-substring ranking.

---

## Phase 4 — App.jsx, the brain
**Files:** `App.jsx`

All shared state lives here. Derived vs stored state, the simulated async
boundary and why every lookup goes through it, the `clearTimeout` race guard,
the language-swap rule, and the three render branches (loading / empty / content).

*Reviewer trap:* "Why no Context or Redux?"

---

## Phase 5 — The three hooks
**Files:** `hooks/useScrollReveal.js`, `useMediaQuery.js`, `useClickOutside.js`

Custom hooks as reusable primitives. `IntersectionObserver` vs scroll listeners,
why the observer disconnects after firing, why `pointerdown` beats `click`, and
when a breakpoint belongs in JS rather than CSS.

---

## Phase 6 — Search cluster
**Files:** `SearchPanel`, `SearchBar`, `LanguageSelector` (+ CSS)

The most logic-dense part. The full combobox keyboard contract,
derived-not-stored suggestions, `onMouseDown` vs `onClick`, controlled
components, and the single `openSide` value that makes "two menus open at once"
impossible.

*Reviewer trap:* the ARIA combobox wiring.

---

## Phase 7 — Content cluster
**Files:** `DefinitionSection`, `ExampleSentences`, `DefinitionSkeleton`,
`ui/Skeleton`, `ui/Card`, `OtherWordsCard`, `AppDownloadCard`

Presentational components. The `isReversed` JSX-order swap and why it isn't CSS
`order`, why the skeleton mirrors the real geometry, and when extracting a
component (`Card`) actually earns its place.

---

## Phase 8 — The two carousels
**Files:** `PromoCarousel`, `CommonWordsCarousel`, `WordCard` (+ CSS)

Two different carousel problems. Auto-rotation with pause-on-hover/focus and
WCAG 2.2.2, `aria-live` timing, then the paging maths: `perView` from JS, layout
maths in CSS via custom properties, and the index-clamping effect.

*Reviewer trap:* the `translateX` calc — be able to derive it on a whiteboard.

---

## Phase 9 — Header & Footer
**Files:** `Header.jsx/css`, `Footer.jsx/css`

The two layout shells. Sticky positioning, the drawer, stacking contexts, the
focus trap, body scroll lock, breakpoint-crossing cleanup, the logo spotlight,
reveal staggering.

*Reviewer trap:* "why does the hamburger need `position: relative`?"

---

## Phase 10 — Scroll UI + cross-cutting review
**Files:** `ReadingProgress`, `ScrollToTop` — then themes across the codebase

The two scroll-driven components, then stepping back: the responsiveness
strategy, a full accessibility inventory, the motion system, performance
choices, and the honest weak spots.
