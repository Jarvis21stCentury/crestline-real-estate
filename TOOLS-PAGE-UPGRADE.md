# Tools Page Premium Upgrade — Research & Implementation

> Research, analysis, and design decisions from the tools page upgrade. Documents the gap analysis between the tools page and the rest of the site, the animation/interaction patterns chosen, and the technical implementation of each new component.

---

## Table of Contents
1. [Gap Analysis](#gap-analysis)
2. [Site Animation System Audit](#site-animation-system-audit)
3. [New Components Architecture](#new-components-architecture)
4. [Hero Background Research](#hero-background-research)
5. [Custom Slider Design](#custom-slider-design)
6. [Visual Data Components](#visual-data-components)
7. [Animation Patterns Applied](#animation-patterns-applied)
8. [Glass-Morphism Card Design](#glass-morphism-card-design)
9. [Implementation Map](#implementation-map)

---

## Gap Analysis

### Before: What the Tools Page Had
| Feature | Tools Page | Rest of Site |
|---------|-----------|--------------|
| Hero background | Flat `bg-oxford` color | 35,000-particle Three.js torus knot canvas with mouse-interactive repulsion |
| Range sliders | Default HTML `<input type="range">` with `accent-oxford` | N/A (no sliders elsewhere, but all interactive elements are heavily styled) |
| Result values | Static text, no animation | `AnimatedCounter` with GSAP tweening on scroll |
| Tab navigation | Basic rounded pill buttons | Desktop nav has sliding GSAP indicator bar following hover |
| Data visualization | None (text-only breakdowns) | N/A |
| Scroll animations | None | `ScrollReveal` (7 animation types), `TextReveal` (word-by-word), `AnimatedDivider` |
| Card design | `rounded-2xl border border-mercury/30 bg-bone/50` | Glass-morphism, backdrop-blur, multi-layer shadows throughout |
| Micro-interactions | None | Custom cursor, magnetic buttons, hover states, per-letter flip |
| Section dividers | None | `AnimatedDivider` with GSAP `scaleX` reveal |

### Core Issues Identified
1. **Hero is the weakest on the site** — every other page has either a particle canvas (home), generative scene (chat), or styled hero section (about, contact)
2. **Default HTML inputs** — the sliders look like browser defaults, breaking the premium feel
3. **Static results** — numbers just appear, no animation when values change
4. **No visual data** — financial calculators scream for charts/graphs but have none
5. **Code duplication** — `InputSlider`/`SliderInput` and `ResultRow`/`Row` duplicated across all 3 calculators with slight variations
6. **Missing scroll animations** — the only page that doesn't use `ScrollReveal` or `AnimatedDivider`

---

## Site Animation System Audit

### Existing Animation Infrastructure (Available for Reuse)

**GSAP Setup** (`src/lib/gsap-init.ts`)
- Plugins registered: `ScrollTrigger`, `SplitText`
- Server-safe with `typeof window` check
- Exported for use across all client components

**Smooth Scroll Provider** (`src/components/providers/SmoothScrollProvider.tsx`)
- Lenis with `lerp: 0.1`, respects `prefers-reduced-motion`
- Connected to GSAP ticker for synchronized updates
- Wraps entire app via layout

**Reusable Components**
| Component | File | Animation Type |
|-----------|------|---------------|
| `ScrollReveal` | `src/components/ui/ScrollReveal.tsx` | 7 presets: fade-in, fade-up, slide-left/right, rotate-in, scale-up, blur-left |
| `ScrollFadeIn` | `src/components/ui/ScrollFadeIn.tsx` | Simple y:30 + opacity fade |
| `TextReveal` | `src/components/ui/TextReveal.tsx` | SplitText word-by-word blur reveal |
| `AnimatedCounter` | `src/components/ui/AnimatedCounter.tsx` | GSAP counter from 0→target on scroll |
| `AnimatedDivider` | `src/components/ui/AnimatedDivider.tsx` | scaleX: 0→1, 1.2s, origin-center |
| `CustomCursor` | `src/components/ui/CustomCursor.tsx` | 8px dot + 40px ring, mix-blend-difference |
| `ScrollProgress` | `src/components/ui/ScrollProgress.tsx` | 2px bar scaling with scroll |

**Design Tokens**
```
Colors: oxford (#0E1A36), oxford-light (#162044), mercury (#C8CCD1), platinum (#E5E4E2), bone (#F0EFEC)
Fonts: font-cormorant (serif), font-bebas (uppercase display), font-body (libre body), font-playfair
Easing: power4.out (primary), power3.out (secondary), power2.out (reveals)
Stagger: 0.025 (chars), 0.06 (words), 0.08-0.1 (cards/items)
Trigger: "top 85%" standard for scroll reveals
```

**Installed Libraries**
- `gsap` 3.15.0 + `@gsap/react` 2.1.2
- `three` 0.184.0
- `@paper-design/shaders` 0.0.76
- `lenis` 1.3.24

---

## New Components Architecture

### Shared Foundation Components

#### `ToolSlider` (`src/components/tools/ToolSlider.tsx`)
Replaces 3 duplicated slider components across calculators.

**Design Decisions:**
- **Kept native `<input type="range">`** for accessibility (keyboard, screen reader, mobile touch) — the native input is invisible but positioned on top for interaction
- **Custom visual layer underneath**: separate divs for track, fill, and thumb rendered via absolute positioning
- **Fill percentage** computed inline as `((value - min) / (max - min)) * 100`
- **Floating tooltip** appears on group hover, positioned at fill percentage with CSS transform
- **Track hover fattening**: `group-hover:scale-y-150` on the track for tactile feedback
- **Thumb styling**: 20px circle, border-2 oxford, white fill, multi-layer box-shadow for depth + glow

**Why not a fully custom div-based slider?**
Custom div sliders require reimplementing: keyboard arrows, touch drag, accessibility labels, and mobile interaction zones. The native input handles all of this. We just hide its visuals and overlay our own.

#### `ResultRow` (`src/components/tools/ResultRow.tsx`)
Unified row component with:
- Accepts `value: number | string` — auto-formats numbers as currency
- `bold` prop for emphasized values
- `highlight` prop adds a small oxford dot indicator
- Hover state: `hover:bg-oxford/[0.03]` with rounded padding
- `data-cursor` attribute for custom cursor interaction

#### `LoanTermSelector` (`src/components/tools/LoanTermSelector.tsx`)
Extracted from Mortgage + Affordability calculators:
- GSAP `scale` micro-animation on selection change (`back.out(2)` ease)
- Active state adds `shadow-[0_4px_12px_rgba(14,26,54,0.2)]`
- `data-cursor` for cursor interaction

#### `ToolAnimatedValue` (`src/components/tools/ToolAnimatedValue.tsx`)
**Why not reuse `AnimatedCounter`?**
- `AnimatedCounter` uses ScrollTrigger — fires once when element enters viewport
- Calculator values need to re-animate on every input change
- Different API: accepts raw numbers, not strings like "500+" or "$2M"

**Implementation:**
- Tracks previous value in a ref
- On value change, GSAP tweens from previous → new over 0.6s
- `power2.out` easing for smooth deceleration
- `onUpdate` callback formats and sets display state each frame
- `tabular-nums` CSS for stable digit widths during animation

---

## Hero Background Research

### Options Considered

| Approach | Pros | Cons | Chosen? |
|----------|------|------|---------|
| Particle torus knot (like home) | Proven, premium | Duplicates home page identity | No |
| Animated gradient mesh | Lightweight, no Three.js | Too simple, doesn't match site quality | No |
| **Wireframe grid plane** | Evokes data/precision, thematic for financial tools, distinctive | Requires Three.js shader | **Yes** |
| Shader-only effect (@paper-design) | Already in project | Better for small elements (buttons), not backgrounds | No |
| Icosahedron wireframe (like chat) | Proven | Duplicates chat page identity | No |

### Chosen: Animated Wireframe Grid (`ToolsHeroCanvas`)

**Concept:** A flat plane subdivided into a dense grid, with vertices displaced by simplex noise, rendered as wireframe. Evokes a data landscape — topographic, precise, analytical. Thematically perfect for financial tools.

**Technical Details:**
- `PlaneGeometry(14, 9, 44, 28)` rotated to horizontal
- Vertex shader: dual-layer simplex noise displacement
  - Layer 1: `snoise(pos * 0.4, time * 0.25) * 0.5` — large undulations
  - Layer 2: `snoise(pos * 0.8, time * 0.15) * 0.2` — finer detail
- Fragment shader: height-based color gradient (oxford-light → mercury) with radial edge fade
- Wireframe rendering for grid aesthetic
- Mouse parallax: camera position offset tracks mouse with `0.02` lerp

**Simplex Noise:** Reused the exact GLSL `snoise()` function from `GenerativeScene.tsx` (the chat page's icosahedron uses the same noise).

**Performance:**
- `setPixelRatio(Math.min(devicePixelRatio, 2))` caps retina rendering
- Rendered at `opacity: 0.2` so it's a subtle background
- Proper cleanup: cancelAnimationFrame, dispose geometry/material/renderer, remove event listeners

**Layering in hero section:**
```
z-0: ToolsHeroCanvas (wireframe grid, opacity 0.2)
z-0: hero-gradient-animate overlay (opacity 0.3)
z-10: Text content (eyebrow, headline, description)
```

---

## Custom Slider Design

### CSS Strategy

The native `<input type="range">` is made fully transparent using:
```css
.tool-slider-input {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}
.tool-slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  background: transparent; /* invisible — our custom thumb is underneath */
}
```

Custom visuals are rendered as sibling divs positioned absolutely within the same container:
1. **Track**: `h-1 bg-mercury/30 rounded-full` — fattens on hover via `group-hover:scale-y-150`
2. **Fill**: child div inside track, width set by `fillPercent%`, `bg-oxford`
3. **Thumb**: 20px circle at `left: fillPercent%`, styled with border + shadow + glow
4. **Tooltip**: positioned above thumb, shows formatted value, visible on `group-hover`

The native input sits on `z-20` (invisible but interactive), custom visuals on lower z-indexes.

---

## Visual Data Components

### DonutChart (`src/components/tools/DonutChart.tsx`)
**Used in:** Mortgage Calculator — shows P&I / Tax / Insurance breakdown

**Implementation: SVG `<circle>` segments**
- `viewBox="0 0 200 200"`, center at `(100, 100)`, radius 70
- Each segment is a `<circle>` with:
  - `stroke-dasharray`: segment length + gap
  - `stroke-dashoffset`: negative cumulative offset (rotates segment start)
  - `transform: rotate(-90 100 100)` — starts segments from 12 o'clock
  - `stroke-linecap: round` — rounded segment ends
- Background ring: `text-mercury/20` for empty donut
- Center text: overlaid HTML div with `absolute inset-0 flex items-center justify-center`

**Why SVG over Canvas?**
- Direct GSAP animation of `stroke-dashoffset` attributes
- DOM-based for accessibility (screen readers can parse)
- No chart library dependency needed (data is only 3 segments)

**Animation:** GSAP `from` on each `[data-segment]` circle, animating `strokeDashoffset` from full circumference to computed value.

**Colors:**
- P&I: `#0E1A36` (oxford) — dominant segment
- Tax: `#C8CCD1` (mercury) — secondary
- Insurance: `#E5E4E2` (platinum) — tertiary

### DTIProgressBar (`src/components/tools/DTIProgressBar.tsx`)
**Used in:** Affordability Calculator — replaces the basic progress bar

**Upgrades over original:**
| Feature | Before | After |
|---------|--------|-------|
| Height | 12px (`h-3`) | 16px (`h-4`) |
| Fill color | Flat `bg-oxford` | Color-coded gradient: green (<28%), amber (28-36%), red (>36%) |
| Thresholds | None | Vertical markers at 28% and 36% with labels |
| Value label | Text above, separate | Floating label at bar end |
| Animation | CSS `transition-all` | GSAP `gsap.to` with `power2.out` |
| Glow | None | Pulsing white glow at bar end (`yoyo, repeat: -1`) |
| Zone legend | None | Color-coded dots with labels below |

### ComparisonBar (`src/components/tools/ComparisonBar.tsx`)
**Used in:** Rent vs Buy Calculator — visual cost comparison

**Design:**
- Two horizontal bars stacked vertically (Renting vs Buying)
- Width proportional to value relative to the larger amount
- Winner bar gets: pulsing dot indicator + `shadow-[0_0_20px_rgba(14,26,54,0.12)]`
- GSAP `from` animation: bars grow from width 0 on value change
- Minimum width 2% to keep bars visible even at small values

---

## Animation Patterns Applied

### Tab Navigation Sliding Indicator
**Pattern:** Same as desktop nav hover indicator from `Nav.tsx`

**Implementation:**
- `tabRefs` array stores refs to each button
- `indicatorRef` points to a 2px-high absolute div at bottom of tab bar
- On tab change, GSAP animates `left` and `width` to match active button's position:
```js
gsap.to(indicatorRef, {
  left: buttonRect.left - containerRect.left,
  width: buttonRect.width,
  duration: 0.4,
  ease: "power3.out",
});
```

### Tab Content Transition Enhancement
**Before:** `{ opacity: 0, y: 20, duration: 0.35 }`
**After:** `{ opacity: 0, y: 20, filter: "blur(4px)", duration: 0.5 }` — adds blur-fade matching site-wide reveal pattern

### Verdict Text Animation (Rent vs Buy)
When "Buying Wins" ↔ "Renting Wins" toggles:
```js
gsap.fromTo(verdictRef,
  { y: 10, opacity: 0, filter: "blur(4px)" },
  { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
);
```
Triggered by `dependencies: [buyingWins]` — animates every time the verdict changes.

### Scroll Animations Added
- `ScrollReveal animation="fade-up"` wrapping the entire calculator section
- `AnimatedDivider` between hero and calculator sections (scaleX reveal from center)

---

## Glass-Morphism Card Design

### Before
```
rounded-2xl border border-mercury/30 bg-bone/50 p-8
```

### After
```
rounded-2xl border border-white/60 bg-white/70 p-8
backdrop-blur-md
shadow-[0_8px_32px_rgba(14,26,54,0.06),0_2px_8px_rgba(14,26,54,0.04)]
transition-shadow duration-300
hover:shadow-[0_12px_40px_rgba(14,26,54,0.10),0_4px_12px_rgba(14,26,54,0.06)]
```

**Key Changes:**
- `bg-white/70` + `backdrop-blur-md` = frosted glass effect
- `border-white/60` = subtle frost edge
- Multi-layer box shadow for realistic depth (ambient + direct light)
- Hover state deepens shadow for interactive feedback

---

## Implementation Map

### Files Created (8 new)
| File | Lines | Purpose |
|------|-------|---------|
| `src/components/tools/ToolSlider.tsx` | ~85 | Premium custom range slider |
| `src/components/tools/ResultRow.tsx` | ~45 | Shared result row with hover |
| `src/components/tools/LoanTermSelector.tsx` | ~50 | Shared term buttons with GSAP |
| `src/components/tools/ToolAnimatedValue.tsx` | ~45 | Value counter re-animating on change |
| `src/components/tools/DonutChart.tsx` | ~95 | SVG ring chart |
| `src/components/tools/DTIProgressBar.tsx` | ~95 | Color-coded DTI gauge |
| `src/components/tools/ComparisonBar.tsx` | ~65 | Horizontal bar comparison |
| `src/components/tools/ToolsHeroCanvas.tsx` | ~130 | Three.js wireframe grid |

### Files Modified (5 existing)
| File | Changes |
|------|---------|
| `src/app/tools/page.tsx` | Hero canvas + gradient overlay, sliding tab indicator, enhanced tab transition, ScrollReveal wrap, AnimatedDivider |
| `src/components/tools/MortgageCalculator.tsx` | Shared components, DonutChart, ToolAnimatedValue, glass cards, deleted local helpers |
| `src/components/tools/AffordabilityCalculator.tsx` | Shared components, DTIProgressBar, ToolAnimatedValue, glass cards, deleted local helpers |
| `src/components/tools/RentVsBuyCalculator.tsx` | Shared components, ComparisonBar, ToolAnimatedValue, verdict animation, glass cards, deleted local helpers |
| `src/app/globals.css` | Custom `.tool-slider-input` pseudo-element styles |

### Existing Components Reused (no changes)
- `ScrollReveal`, `AnimatedDivider`, `Container`, `formatCurrency`, `cn`
- `gsap`, `SplitText`, `ScrollTrigger` from gsap-init
- Simplex noise GLSL copied from `GenerativeScene.tsx`
