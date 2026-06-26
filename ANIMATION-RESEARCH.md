# Award-Winning Web Animation Research Reference

> Compiled from Awwwards, CSS Design Awards, FWA, Codrops, YouTube tutorials, and industry research. Use this as a reference when building any luxury/premium animated website.

---

## Table of Contents
1. [Text Animations](#text-animations)
2. [Image Animations](#image-animations)
3. [Scroll-Driven Animations](#scroll-driven-animations)
4. [Typing & Chat Animations](#typing--chat-animations)
5. [Micro-Interactions & UI](#micro-interactions--ui)
6. [Award-Winning Sites & Techniques](#award-winning-sites--techniques)
7. [Recommended Stack](#recommended-stack)
8. [Timing & Easing Reference](#timing--easing-reference)
9. [Key Resources & URLs](#key-resources--urls)

---

## Text Animations

### Tier 1: Must-Have for Luxury Sites

**Split Text with Staggered Reveal**
The single most common technique on Awwwards winners. Text is split into characters/words/lines using GSAP SplitText, then each element animates in with staggered delays.
```js
const split = SplitText.create(el, { type: "chars,words" });
gsap.from(split.chars, {
  y: 80, opacity: 0, filter: "blur(12px)",
  stagger: 0.025, duration: 1.2, ease: "power4.out"
});
```

**Slide Up Reveal (Masked)**
Text slides upward from behind an invisible mask using `overflow: hidden` on parent and `yPercent: 100` on child. Extremely clean and premium. Used by Motto, Sundae Creative, most Awwwards winners.

**Blur In (Focus Pull)**
Text clarifies from a heavily blurred state. Creates an elegant, cinematic effect.
```js
gsap.from(el, { filter: "blur(20px)", opacity: 0, duration: 1.2, ease: "power3.out" });
```

**Cinema Title**
Letter-spacing expands dramatically with fade-in, mimicking luxury brand title cards.
```js
gsap.from(el, { letterSpacing: "0.5em", opacity: 0, duration: 1.5, ease: "power4.out" });
```

**Clip-Path Wipe (Eyebrows/Labels)**
```js
gsap.fromTo(el,
  { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8, ease: "power2.out" }
);
```

### Tier 2: Highly Effective

**Scroll Highlight / Color Wash**
Words colorize progressively based on scroll position using ScrollTrigger scrub. Text starts gray, turns white/gold as you scroll.
```js
split.words.forEach(word => {
  gsap.fromTo(word,
    { color: "rgba(200,204,209,0.35)" },
    { color: "#FFFFFF", scrollTrigger: { trigger: word, start: "top 82%", end: "top 55%", scrub: true } }
  );
});
```

**Text Scramble / Binary Decode**
Characters randomize through symbols before settling. Uses GSAP ScrambleTextPlugin.
```js
gsap.to(el, { duration: 1, scrambleText: { text: "NEW TEXT", chars: "XO!#", revealDelay: 0.5 } });
```

**Flip Board**
Letters flip downward sequentially like airport departure boards.
```js
gsap.from(chars, { rotationX: -90, opacity: 0, stagger: 0.04, duration: 0.6 });
```

**Curtain Reveal / Wipe**
Content appears through expanding clipPath.
```js
gsap.from(el, { clipPath: "inset(0 50% 0 50%)", duration: 1, ease: "power3.inOut" });
```

### Tier 3: Accent Techniques

- **Typewriter Effect** — Characters appear sequentially via GSAP TextPlugin
- **Kinetic Typography** — Text moves/scales/transforms on scroll or time; 2026 trend with variable fonts
- **Neon Flicker** — Text flickers on with glow; good for dark themes
- **3D Cylinder Rotation** — Text rotates around invisible cylinder using `rotateX` + trig
- **Dual-Wave Sine Animation** — Two text columns move in synchronized wave patterns

---

## Image Animations

### Image Reveal Effects

**Clip-Path Reveals** — The dominant technique for luxury image reveals.
```js
gsap.from(img, {
  clipPath: "inset(100% 0 0 0)", // bottom-up reveal
  duration: 1.2, ease: "power3.out",
  scrollTrigger: { trigger: img, start: "top 80%" }
});
```
Variations: `inset(0 100% 0 0)` (left-right), `circle(0% at 50% 50%)` (circular).

**WebGL Distortion Hover** — Images ripple, warp, or dissolve on hover using fragment shaders:
- Liquid distortion (images melt between states)
- Lens distortion (fish-eye from cursor position)
- Chromatic aberration (RGB channels separate/recombine)
- Ripple displacement (concentric waves from cursor)

**Scale-on-Scroll** — Images scale from 0.8→1.0 as they enter viewport. Combined with opacity fade.
```js
gsap.from(img, { scale: 0.85, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: {...} });
```

**Parallax Image Layers** — Multiple layers at different scroll speeds. Speed differences of 0.2-0.5 feel natural; above 0.7 causes motion sickness.
```js
gsap.to(img, { yPercent: -10, ease: "none", scrollTrigger: { scrub: true, start: "top bottom", end: "bottom top" } });
```

**Inner Image Parallax** — Image moves slower than its container (overflow: hidden), creating depth.
```css
.container { overflow: hidden; }
.image { scale: 1.1; } /* Extra size for parallax room */
```

### Image Transition Effects

- **Horizontal Scroll Pinned Gallery** — Section pins while images scroll horizontally
- **Animated Product Grid with Clip-Path** — Grid items expand/contract on interaction
- **SVG Mask Reveals** — Videos/images revealed through animated SVG masks on scroll

---

## Scroll-Driven Animations

### Two Fundamental Types

1. **Scroll-Triggered** — Animations fire when elements enter/exit viewport (IntersectionObserver or ScrollTrigger)
2. **Scroll-Linked (Scrubbed)** — Animation progress tied to scroll position. Plays forward on scroll down, reverses on up.

### Essential Techniques

**Smooth Scrolling (Lenis)** — The single biggest quality upgrade. Physics-based smooth scroll.
```js
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Pinned Sections** — Sections stick while content animates within.
```js
ScrollTrigger.create({ trigger: section, pin: true, start: "top top", end: "+=2000", scrub: 1 });
```

**Horizontal Scroll Galleries**
```js
const scrollWidth = track.scrollWidth - track.offsetWidth;
gsap.to(track, { x: -scrollWidth, ease: "none",
  scrollTrigger: { trigger: section, pin: true, end: `+=${scrollWidth}`, scrub: 1 }
});
```

**Scroll Progress Indicator**
```js
gsap.to(progressBar, { scaleX: 1, transformOrigin: "left", ease: "none",
  scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.3 }
});
```

**Parallax Depth Layers** — Speed multipliers: 0.3x background, 0.4x midground, 0.5x foreground.

### Critical Bug Fix: `immediateRender: false`

When using `gsap.from()` with ScrollTrigger, ALWAYS add `immediateRender: false`. Without it, elements inside ScrollTrigger-controlled timelines get set to their "from" state (opacity: 0, etc.) immediately, making them invisible before the trigger fires.

```js
// WRONG — elements start invisible
gsap.from(el, { opacity: 0, scrollTrigger: { trigger: el } });

// CORRECT — elements stay visible until trigger fires
gsap.from(el, { opacity: 0, immediateRender: false, scrollTrigger: { trigger: el } });
```

This is especially critical for timeline children:
```js
const tl = gsap.timeline({ scrollTrigger: { trigger: section } });
tl.from(card, { opacity: 0, immediateRender: false }); // MUST add this
```

---

## Typing & Chat Animations

### Blur-In Word Streaming (Best for AI Chat)
Words emerge from blur as AI responds. 200-300ms per word, elegant and modern.
```js
// For each new word span as it appears:
gsap.from(wordSpan, { opacity: 0, filter: "blur(4px)", y: 6, duration: 0.25, ease: "power2.out" });
```
- Buffer tokens in a ref, flush every 40-50ms to state
- Split rendered text into `<span className="inline-block">` per word
- Track animated count to only animate new words
- Add glowing cursor `|` at end while streaming

### Character-by-Character with Glow Cursor
```js
// 80-120ms per character feels natural
// ChatGPT uses ~5ms per char (200 chars/sec) for fast streaming
gsap.to(el, { duration: 2, text: "New text" }); // GSAP TextPlugin
```

### Scramble/Decode Reveal
```js
gsap.to(el, { scrambleText: { text: "TARGET", chars: "lowerCase", revealDelay: 0.5, speed: 0.3 } });
```

### Message Entrance Animations
```js
// User messages from right, assistant from left
gsap.from(el, { x: role === "user" ? 30 : -30, opacity: 0, duration: 0.4, ease: "power3.out" });
```

### Thinking/Loading Indicators
- **Particle orbit** — Three.js particles orbiting in a small canvas (24 particles, 2-3 elliptical orbits, additive blending)
- **Shimmer skeleton** — Placeholder lines that shimmer, matching expected response shape
- **Animated SVG stroke** — Path with `stroke-dasharray` animation

### Key Libraries
| Library | Purpose | Size |
|---------|---------|------|
| GSAP TextPlugin | Typewriter effects | Part of GSAP (free) |
| GSAP ScrambleTextPlugin | Decode/cipher effects | Part of GSAP (free) |
| Streamdown | Markdown streaming animation (fadeIn/blurIn/slideUp) | Lightweight |
| TypeIt | Versatile typewriter, chainable API | ~4kb |

---

## Micro-Interactions & UI

### Magnetic Buttons
Button follows cursor when hovering nearby, snaps back on leave.
```js
const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
el.addEventListener("mousemove", (e) => {
  const { left, top, width, height } = el.getBoundingClientRect();
  xTo((e.clientX - left - width / 2) * 0.35);
  yTo((e.clientY - top - height / 2) * 0.35);
});
el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
```
Disable on touch: `window.matchMedia("(hover: hover)").matches`

### Custom Cursor
Small dot (8px) + lagging outer ring (40px) with `mix-blend-mode: difference`.
```js
const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2" });
const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2" });
const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
```
- Scale up on interactive elements (buttons, links)
- Hidden on touch devices (`@media (hover: none)`)

### Nav Menu Animations
- **Mobile overlay**: Circular clip-path reveal: `circle(0% at 95% 3%)` → `circle(150% at 95% 3%)`
- **Menu items**: Stagger in with `{ y: 40, opacity: 0, stagger: 0.08 }`
- **Desktop**: Sliding hover indicator between nav links using `gsap.to(indicator, { x, width })`

### Button Hover Effects
- **Material Ripple** — Ripple from click point
- **Color/Background Slide** — Background slides in on hover
- **Border Draw** — Border traces around button via SVG stroke-dashoffset
- **Scale + Shadow** — Subtle 1.02-1.05 scale with expanding shadow
- **3D Rolling Text** — Per-letter flip using `rotateX` + perspective

### Form Interactions
- **Field stagger entrance**: `gsap.from(fields, { x: -40, opacity: 0, stagger: 0.08 })`
- **Focus glow**: `gsap.to(input, { boxShadow: "0 0 0 3px rgba(14,26,54,0.08)", duration: 0.3 })`
- **Success state**: `gsap.from(el, { scale: 0.8, opacity: 0, ease: "back.out(1.7)" })`

### Statistics / Counters
```js
const counter = { value: 0 };
gsap.to(counter, {
  value: target, duration: 2, ease: "power2.out",
  onUpdate: () => setDisplay(format(counter.value)),
  scrollTrigger: { trigger: el, start: "top 80%" }
});
```

---

## Award-Winning Sites & Techniques

### Top Real Estate / Luxury / Architecture Winners

| Site | Studio | Key Techniques |
|------|--------|---------------|
| ERA | Vide Infra | 5-layer animated 3D splash, custom WebGL city map, volumetric galleries |
| Hubtown | Unseen Studio | WebGL + GSAP, storytelling, 3D interaction design |
| Fluid Glass | Exo Ape | WebGL + Three.js + GLSL shaders, chromatic distortion, liquid glass |
| MERSI Architecture | — | Portfolio with smooth transitions |
| Vaulk | — | Developer Award winner |
| AIR | Vide Infra | Developer Award winner |

### What Makes Animations "Luxury"

1. **Restraint over excess** — Fewer, more polished animations
2. **Slow, confident easing** — `power4.out` or custom bezier, never linear or bouncy
3. **Generous whitespace** — Animations that breathe, 600-1000ms durations
4. **Scroll as narrative** — Every animation is intentional and tied to scroll
5. **Performance** — 60fps via GPU-accelerated properties (transform, opacity, filter)
6. **Dark themes with gold/cream accents** — Most luxury winners use dark backgrounds

### Categories to Browse
- [Awwwards Real Estate](https://www.awwwards.com/websites/real-estate/)
- [Awwwards Architecture](https://www.awwwards.com/websites/architecture/)
- [Awwwards Parallax](https://www.awwwards.com/websites/parallax/)
- [Awwwards GSAP](https://www.awwwards.com/websites/gsap/)

---

## Recommended Stack

| Tool | Purpose | Notes |
|------|---------|-------|
| **GSAP 3.12+** | Core animation engine | Free including ScrollTrigger, SplitText, ScrambleText |
| **@gsap/react** | React integration | `useGSAP` hook for proper cleanup |
| **Lenis** | Smooth scrolling | Connect to GSAP ticker, 5KB |
| **Three.js** | 3D effects, particles, shaders | For hero canvases, loading effects |
| **@paper-design/shaders** | Liquid metal shader effects | For premium button effects |
| **Next.js** | Framework | All GSAP code in `"use client"` components |

### GSAP Plugin Registration Pattern
```typescript
// src/lib/gsap-init.ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}
export { gsap, ScrollTrigger, SplitText };
```

### Lenis + GSAP Integration Pattern
```typescript
// src/components/providers/SmoothScrollProvider.tsx
const lenis = new Lenis({ lerp: prefersReducedMotion ? 1 : 0.1, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## Timing & Easing Reference

### Durations
| Animation Type | Duration | Notes |
|---------------|----------|-------|
| Micro-interactions (hover, click) | 200-300ms | Quick feedback |
| Element reveals (scroll-triggered) | 600-900ms | Comfortable pace |
| Page transitions | 400-600ms | Smooth but not slow |
| Hero entrance sequences | 1000-1500ms | Cinematic impact |
| Stagger between elements | 30-150ms | Visible wave, not blur |
| Scroll-scrubbed | N/A | Tied to scroll position |

### Easing Functions
| Easing | Use Case |
|--------|----------|
| `power3.out` | General entrance animations |
| `power4.out` | Hero/headline reveals (fast in, slow settle) |
| `power2.out` | Counters, subtle movements |
| `power3.inOut` | Accordion open/close |
| `back.out(1.7)` | Success states, celebration (slight overshoot) |
| `"none"` | Scrubbed animations (scroll controls timing) |
| `cubic-bezier(0.16, 1, 0.3, 1)` | CSS equivalent of power3.out |

### Stagger Values
| Context | Value |
|---------|-------|
| SplitText chars | 0.025-0.035 |
| SplitText words | 0.05-0.06 |
| Cards in grid | 0.1-0.15 |
| Form fields | 0.08-0.1 |
| Menu items | 0.08 |
| FAQ items | 0.08 |

---

## Key Resources & URLs

### Tutorials & Guides
- [GSAPify — 100+ GSAP Text Animations](https://gsapify.com/gsap-text-animations/)
- [Codrops — 3D Scroll-Driven Text Animations](https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/)
- [Codrops — WebGL Shaders with GSAP](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/)
- [Codrops — Mastering Carousels with GSAP](https://tympanus.net/codrops/2025/04/21/mastering-carousels-with-gsap-from-basics-to-advanced-animation/)
- [Codrops — Sticky Grid Scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- [Codrops — Infinite Scroll with GSAP + Lenis](https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/)
- [Frontend Horse — GSAP Animation Techniques](https://frontend.horse/articles/amazing-animation-techniques-with-gsap/)
- [Made With GSAP](https://madewithgsap.com/)
- [Next.js + Lenis + GSAP Guide](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)
- [Olivier Larose — Magnetic Button Tutorial](https://blog.olivierlarose.com/tutorials/magnetic-button)

### Chat & Typing Specific
- [Smooth Streaming in AI SDK v5 (Upstash)](https://upstash.com/blog/smooth-streaming)
- [Streamdown — Markdown Streaming Animation](https://streamdown.ai/docs/animation)
- [Vercel AI Elements](https://elements.ai-sdk.dev/)
- [AI UI Patterns (patterns.dev)](https://www.patterns.dev/react/ai-ui-patterns/)
- [AI Chat UI Best Practices (TheFrontKit)](https://thefrontkit.com/blogs/ai-chat-ui-best-practices)

### Inspiration
- [Awwwards Real Estate](https://www.awwwards.com/websites/real-estate/)
- [Awwwards Animation Collections](https://www.awwwards.com/awwwards/collections/animation/)
- [Awwwards Chat UI](https://www.awwwards.com/inspiration/chat-ui)
- [Dribbble AI Chat UI](https://dribbble.com/search/ai-chat-ui)
- [60+ ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/)

### Official Docs
- [GSAP](https://gsap.com/) — [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/)
- [Lenis](https://github.com/darkroomengineering/lenis)
- [Three.js](https://threejs.org/)
