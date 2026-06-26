# Awwwards-Level Website Upgrade Research

> Compiled June 2026 from web research across Awwwards, Codrops, Medium, design trend reports, Next.js docs, and real estate industry analysis. Covers what separates "very good" from "award-winning" and the specific techniques used to bridge that gap.

---

## Table of Contents
1. [Awwwards Sites of the Year 2025-2026](#awwwards-sites-of-the-year-2025-2026)
2. [Top Web Design Trends 2026](#top-web-design-trends-2026)
3. [Award-Winning Animation Techniques](#award-winning-animation-techniques)
4. [Luxury Real Estate Design Trends](#luxury-real-estate-design-trends)
5. [Page Transitions (View Transitions API)](#page-transitions-view-transitions-api)
6. [Scroll Storytelling & Pinned Sections](#scroll-storytelling--pinned-sections)
7. [Micro-Interactions & Cursor Effects](#micro-interactions--cursor-effects)
8. [WebGL Image Hover Effects](#webgl-image-hover-effects)
9. [Preloader & Loading Animations](#preloader--loading-animations)
10. [What We Implemented](#what-we-implemented)
11. [Sources](#sources)

---

## Awwwards Sites of the Year 2025-2026

### Winners & Key Techniques

| Site | Award | Key Techniques |
|------|-------|----------------|
| **Messenger** | Site of the Year 2025 | Tiny WebGL planet in browser, GPU-powered rendering, physics/lighting/animation at console-game quality, loads in seconds |
| **Lando Norris** (by OFF+BRAND) | Site of the Year 2025 | Interactive storytelling, scroll-driven narrative, immersive 3D |
| **Bruno Simon** (Portfolio) | Site of the Month Jan 2026 | Browser-based 3D environment, users control a vehicle to explore a virtual world |
| **ERA** | Featured | 5-layer 3D splash, custom WebGL city map, volumetric galleries |
| **Hubtown** | Featured | WebGL + GSAP, storytelling, 3D interaction |
| **Fluid Glass** | Featured | WebGL + Three.js + GLSL shaders, chromatic distortion, liquid glass |

### What Makes Winners Stand Out
- **WebGL is dominant** — the top winners all use GPU-accelerated rendering
- **Interactivity is expected** — passive scroll-through sites don't win anymore
- **Load time matters** — despite heavy visuals, winners load within seconds
- **Motion is narrative** — animations tell a story, not just decorate

---

## Top Web Design Trends 2026

### 1. Layout & Motion Animation
Animation is becoming a defining part of brand identity. Motion visual identity gives brands a living, memorable presence that transforms static branding into something dynamic and expressive. Layout animations where elements move and arrange in different ways are a top trend.

### 2. Interactive 3D Elements
Web design is moving beyond flat screens into lifelike experiences through interactive 3D — shapes that react to scroll, hover, or motion. Designers prefer 3D objects, animated forms, and depth effects over static imagery.

### 3. Typography-Driven Design
Oversized, plain fonts set against solid colors, soft gradients, or black-and-white backdrops create a confident, minimalist feel. Typography takes center stage in 2026 layouts.

### 4. AI Integration
AI-driven layouts, smart chatbots, personalized content feeds, and intelligent property recommendations. Websites using AI chatbots report up to 40% higher lead capture rates.

### 5. Quiet Luxury & Minimalism
"Value over visibility" — generous white space, simple typography, restrained color palettes. Using gold, black, and white in real estate design can raise perceived value of luxury listings by nearly 30%.

### 6. Voice Search Optimization
Over one billion monthly voice searches use conversational, long-tail keywords. Content needs question-based headings with direct answers.

---

## Award-Winning Animation Techniques

### 1. Scroll Tracking & Smooth Scrolling
- GSAP ScrollTrigger for precise scroll-synchronized animations
- Lenis or Locomotive Scroll for fluid scrolling behavior
- Animations precisely synchronized with scroll create polished, captivating experiences
- **Best practice:** `scrub: true` ties animation directly to scroll position, not time

### 2. Text-Splitting Animation
- GSAP SplitText, SplitType, or Splitting.js for character/word/line splitting
- Character-by-character hero reveals, hover effects on individual letters
- The granular control transforms static type into kinetic storytelling
- **Stagger values:** chars 0.025-0.035, words 0.05-0.06

### 3. Micro-Animations
- Small, subtle animations responding to clicks, hovers, form submissions
- Button color shifts, ripple effects, animated logos, icon transformations
- Enhance usability and create intuitive, engaging interfaces
- Rive for state machine-based interactions, LottieFiles for JSON animations

### 4. Transitions & Reveals
- Creative bridges between pages, sections, or states
- Page fades with z-axis depth, morphing/sliding menus
- barba.js for structured page transitions with prefetching
- Next.js View Transitions API for React-based routing animations

### 5. Easing
- **Ease-out** for elements entering the viewport
- **Ease-in** for elements leaving or being dismissed
- **Bounce/elastic** for playful micro-interactions
- **Custom cubic-bezier** for branded motion personalities
- GSAP's Ease Visualizer for experimenting with curves

### 6. SVG and Mask Animations
- Animated masks progressively revealing images/illustrations
- Complex shape morphing between SVG outlines
- Write-on effects using mask animation
- Enables effects "difficult or impossible with traditional CSS"

### 7. 3D Animations
- Spline for user-friendly 3D with web interactivity
- Three.js for integrating 3D models into websites
- Product rotations, interactive exploration, 3D data visualization
- Immersive storytelling with 3D environments

### 8. WebGL & Three.js
- GPU acceleration for 2D/3D graphics and shader effects
- Water ripples, glass distortion, particle systems
- Dynamic 3D backgrounds responding to cursor movement
- Unicorn Studio for no-code WebGL prototyping

### Key Principles
- **Balance:** Not every technique suits every project
- **Accessibility & Performance:** Animations enhance, never create barriers
- **Purpose Over Decoration:** Award-winning animations guide users, tell stories — never purely ornamental

---

## Luxury Real Estate Design Trends

### 1. Quiet Luxury Aesthetics
- Eliminate busy sidebars, flashing banners, dense text
- Align with F- and Z-shaped user scanning patterns
- Gold, black, white color schemes raise perceived listing value ~30%
- Let high-definition photography dominate

### 2. AI-Driven Lead Generation
- 24/7 chatbots handling property questions, scheduling viewings
- Companies using AI lead gen average 3,142 leads/month vs 1,877 without (67.4% increase)
- High-net-worth buyers expect immediate responses

### 3. Personalized Property Search
- ML algorithms tracking browsing patterns for tailored recommendations
- Dynamic feeds based on search history, budget, amenities
- Reduces bounce rates, increases conversion

### 4. 360-Degree Virtual Tours & Drone Footage
- Interactive 360-degree property exploration
- Professional drone videography for exteriors/aerials
- Virtual staging showing different configurations
- Keeps visitors engaged, reduces unqualified in-person viewings

### 5. Micro-Interactions for Real Estate
- Subtle parallax scrolling on property images
- Scroll-triggered animations (elements fade in/slide up)
- Custom cursor effects that change shape on hover
- Buttons with gentle color changes on interaction

### 6. Trust Signals
- "Verified Listing" badges with timestamps
- Agent last-visit confirmation notes
- Particularly important in an era of AI-generated content concerns

### 7. Hyper-Local Niche Pages
- Dedicated pages for specific neighborhoods/property types
- Dynamic IDX feeds showing matching inventory
- Original content about neighborhood lifestyle
- Custom boundary maps with school/landmark proximity

---

## Page Transitions (View Transitions API)

### Overview
The View Transitions API enables smooth, native page transitions in Next.js App Router. Hardware-accelerated, tiny overhead, apps feel 2-3x snappier on low-end devices.

### Implementation in Next.js 16

**Enable in config:**
```ts
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
};
```

**Import React's ViewTransition component:**
```tsx
import { ViewTransition } from 'react';
```

### Four Core Patterns

| Pattern | What it Communicates | How |
|---------|---------------------|-----|
| **Shared element morph** | "Same thing, going deeper" | Same `name` prop on both pages |
| **Suspense reveal** | "Data loaded" | `enter="slide-up"` / `exit="slide-down"` on Suspense |
| **Directional slide** | "Going forward / coming back" | `transitionTypes={['nav-forward']}` on Link |
| **Same-route crossfade** | "Same place, different content" | `key={slug}` change triggers transition |

### Shared Element Morphing
```tsx
// Grid page
<ViewTransition name={`photo-${photo.id}`}>
  <Image src={photo.src} alt={photo.title} />
</ViewTransition>

// Detail page — same name = browser morphs between them
<ViewTransition name={`photo-${photo.id}`}>
  <Image src={photo.src} alt={photo.title} fill />
</ViewTransition>
```

### Directional Navigation
```tsx
// Forward link
<Link href={`/photo/${id}`} transitionTypes={['nav-forward']}>

// Back link
<Link href="/" transitionTypes={['nav-back']}>
```

### CSS Animation Rules
```css
::view-transition-old(.nav-forward) {
  --slide-offset: -60px;
  animation:
    150ms ease-in both fade reverse,
    400ms ease-in-out both slide reverse;
}
::view-transition-new(.nav-forward) {
  --slide-offset: 60px;
  animation:
    210ms ease-out 150ms both fade,
    400ms ease-in-out both slide;
}
```

### Anchoring Elements (e.g., header stays fixed)
```tsx
<header style={{ viewTransitionName: 'site-header' }}>
```
```css
::view-transition-group(site-header) {
  animation: none;
  z-index: 100;
}
::view-transition-old(site-header) { display: none; }
::view-transition-new(site-header) { animation: none; }
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

### Browser Support (2026)
Supported in Chrome, Edge, Safari. Without support, app works normally — transitions just don't animate.

---

## Scroll Storytelling & Pinned Sections

### Scrollytelling Philosophy
Scrolling reveals a story in a specific sequence — text and multimedia guide viewers from one idea to the next. The best sites don't just present information; they reveal it, building rhythm and anticipation.

### Key Techniques

**Stacked/Pinned Cards:**
Cards pin to viewport, each new card slides up on top. Creates narrative "story" through content.
```css
/* CSS sticky approach */
.card {
  position: sticky;
  top: calc(80px + var(--index) * 40px);
}
```
Combined with GSAP for scale/brightness on previous cards:
```js
gsap.to(previousCard, {
  scale: 0.95,
  filter: "brightness(0.92)",
  scrollTrigger: { trigger: nextCard, start: "top bottom", end: "top top", scrub: true }
});
```

**Horizontal Scroll Gallery:**
```js
gsap.to(track, {
  x: -scrollWidth,
  ease: "none",
  scrollTrigger: { trigger: section, pin: true, scrub: 1 }
});
```

**Scroll-Driven Text Reveal (Word Opacity):**
Each word transitions from dim to full opacity as user scrolls through:
```js
gsap.fromTo(split.words,
  { color: "rgba(14, 26, 54, 0.15)" },
  {
    color: "rgb(14, 26, 54)",
    stagger: 0.1,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 40%", scrub: true }
  }
);
```

**Parallax Depth Layers:**
Background/foreground at different speeds. Speed multipliers: 0.3x-0.5x for subtle depth.

### Tools
- GSAP ScrollTrigger — scroll-scrubbing, pinning, parallax
- Lenis / Locomotive Scroll — smooth scrolling
- CSS scroll-snap for simpler implementations

---

## Micro-Interactions & Cursor Effects

### Magnetic Buttons
Elements subtly attracted toward cursor. Used on premium landing pages, portfolios, product sites.
```js
const onMove = (e) => {
  const rect = el.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  gsap.quickTo(el, "x")(dx * 0.3);
  gsap.quickTo(el, "y")(dy * 0.3);
};
const onLeave = () => {
  gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
};
```

### Custom Cursor
- Dual-element: 8px dot + 40px ring
- `mix-blend-mode: difference` for contrast
- Scale changes on interactive elements
- Gate behind `(hover: hover)` media query

### Button Hover Effects
- **Material ripple** — radial expansion from click point
- **Color slide** — background slides diagonally, text moves opposite
- **Border draw** — border draws itself on hover
- **Scale + shadow** — subtle scale with deepened shadow
- **3D rolling text** — `rotateX` with preserve-3d
- **Liquid metal shader** — WebGL fragment shader for metallic effect
- **Per-letter 3D flip** — each letter flips independently on hover

### Scroll Velocity Skew
Elements lean based on scroll speed:
```js
lenis.on("scroll", () => {
  const skew = Math.max(-3, Math.min(3, lenis.velocity * 0.08));
  gsap.to("[data-skew]", { skewY: skew, duration: 0.3, ease: "power3.out" });
});
```

### Film Grain Overlay
Subtle noise texture for analog warmth:
```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9997;
  pointer-events: none;
  opacity: 0.03;
  mix-blend-mode: overlay;
  background-image: url("noise.svg");
  background-size: 200px;
  animation: grain 0.5s steps(6) infinite;
}
```

### Footer Reveal
Footer appears "behind" content, revealed as you scroll past the last section:
```html
<main class="relative z-10">...</main>
<footer class="sticky bottom-0 z-0">...</footer>
```

### Marquee/Ticker Strip
Auto-scrolling text for stats/trust signals. Duplicated content, CSS `translateX` animation, pauses on hover.

---

## WebGL Image Hover Effects

### Liquid Distortion
Displacement map offsets UV coordinates on hover. GSAP easing gives the bulge satisfying elasticity.

### Lens Distortion
Thick magnifying glass effect with RGB split for photographic realism.

### Implementation Pattern
```glsl
// Fragment shader
uniform sampler2D u_image;
uniform float u_intensity;
uniform vec2 u_mouse;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float dist = distance(uv, u_mouse);
  float proximity = 1.0 - smoothstep(0.0, 0.4, dist);

  // Sine-based distortion
  vec2 offset = vec2(
    sin(u_time + uv.y * 8.0) * 0.02,
    cos(u_time + uv.x * 8.0) * 0.02
  );
  uv += offset * u_intensity * proximity;

  // Chromatic aberration
  float r = texture2D(u_image, uv + vec2(0.003, 0.0) * u_intensity * proximity).r;
  float b = texture2D(u_image, uv - vec2(0.003, 0.0) * u_intensity * proximity).b;
  vec4 color = texture2D(u_image, uv);
  color.r = r;
  color.b = b;

  gl_FragColor = color;
}
```

### Performance
- Use `IntersectionObserver` to only init WebGL when visible
- Lazy-load Three.js via dynamic import
- Limit active contexts (browsers allow 8-16)
- Gate behind `(hover: hover)` for touch devices
- `ResizeObserver` for responsive canvas sizing

---

## Preloader & Loading Animations

### Design Principles
- Should be consistent with overall site look and feel
- Provide visual feedback (progress bar, percentage)
- Branded — use site fonts, colors, logo
- Use `sessionStorage` to only show once per session

### Common Patterns
- **Typography animation** — brand name revealed char-by-char with blur/slide
- **Logo morph** — logo draws itself via SVG stroke-dasharray
- **Progress bar** — `scaleX` from 0 to 1 synced with asset loading
- **Clip-path exit** — `inset(0 0 100% 0)` wipes the preloader away

### Implementation
```js
// Wait for fonts + minimum display time
await Promise.all([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 2200))
]);

// Exit animation
gsap.to(overlay, {
  clipPath: "inset(0 0 100% 0)",
  duration: 0.8,
  ease: "power4.inOut"
});
```

### Trending Approaches (2025-2026)
- Pixel-based reveal with dithering effects
- Procedural noise patterns with wave animations
- Interactive loading (cursor affects the animation)
- Cinematic pixel-based directional reveals

---

## What We Implemented

### Features Added to Crestline & Associates

| # | Feature | Tier | Files |
|---|---------|------|-------|
| 1 | **Page Transitions** (View Transitions API) | Highest | `next.config.ts`, `layout.tsx`, `globals.css`, hero components, `Nav.tsx` |
| 2 | **Preloader** (branded loading screen) | Highest | `Preloader.tsx`, `layout.tsx` |
| 3 | **Scroll Text Reveal** (word opacity on scroll) | Highest | `ScrollTextReveal.tsx`, `WhoWeServe.tsx`, `ValuesSection.tsx` |
| 4 | **Magnetic Buttons** (cursor-following) | High | `MagneticElement.tsx`, `Nav.tsx`, `Footer.tsx`, `Button.tsx` |
| 5 | **Image Distortion** (WebGL shader hover) | High | `ImageDistortion.tsx`, `PropertyGallery.tsx`, `Services.tsx`, `WhoWeServe.tsx` |
| 6 | **Stacked Cards** (sticky scroll services) | High | `Services.tsx` (full rewrite) |
| 7 | **Footer Reveal** (footer behind content) | High | `layout.tsx`, `CTASection.tsx`, `Footer.tsx` |
| 8 | **Film Grain** (noise overlay) | Polish | `globals.css` |
| 9 | **Scroll Velocity Skew** (lean on scroll) | Polish | `SmoothScrollProvider.tsx`, `SectionHeading.tsx`, `PropertyGallery.tsx` |
| 10 | **Section Color Transitions** (gradient dividers) | Polish | `AnimatedDivider.tsx`, `page.tsx` |
| 11 | **Enhanced Nav** (progressive blur/padding) | Polish | `Nav.tsx` |
| 12 | **Marquee Ticker** (auto-scrolling stats) | Polish | `Marquee.tsx`, `page.tsx` |

---

## Sources

### Award-Winning Design Analysis
- [Awwwards — Sites of the Year](https://www.awwwards.com/websites/sites_of_the_year/)
- [Awwwards — Best GSAP Websites](https://www.awwwards.com/websites/gsap/)
- [Awwwards — Scroll Animations Collection](https://www.awwwards.com/inspiration/scroll-animations)
- [Awwwards — Storytelling Collection](https://www.awwwards.com/awwwards/collections/storytelling/)
- [Awwwards — Loading Animations](https://www.awwwards.com/awwwards/collections/loading-page/)
- [Awwward-Winning Animation Techniques (Medium)](https://medium.com/design-bootcamp/awwward-winning-animation-techniques-for-websites-cb7c6b5a86ff)

### Web Design Trends
- [Top 10 Web Design Trends 2026 (Really Good Designs)](https://reallygooddesigns.com/web-design-trends-2026/)
- [Best Website Designs 2026 (SPINX Digital)](https://www.spinxdigital.com/blog/best-website-design/)
- [15 Best Website Design Examples 2026 (Wavespace)](https://www.wavespace.agency/blog/best-website-design-examples)
- [Graphic Design Trends 2026 (Really Good Designs)](https://reallygooddesigns.com/graphic-design-trends-2026/)

### Luxury Real Estate
- [7 Luxury Real Estate Design Trends 2026 (DMR Media)](https://www.dmrmedia.org/blog/Real-Estate-Website-Design-Trends)
- [18 Best Real Estate Website Designs (DesignRush)](https://www.designrush.com/best-designs/websites/trends/best-real-estate-website-designs)
- [7 Best Luxury Real Estate Websites (Agent Image)](https://www.agentimage.com/blog/best-luxury-real-estate-website-design/)
- [Award-Winning Real Estate Design (Luxury Presence)](https://www.luxurypresence.com/real-estate-website-design/)

### Animation & GSAP
- [Web Animation 2026: CSS vs GSAP](https://artofstyleframe.com/blog/web-animation-css-vs-gsap-2026/)
- [60+ GSAP ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/)
- [20 GSAP ScrollTrigger Examples](https://animation-addons.com/blog/gsap-scrolltrigger-examples/)
- [Scroll-Revealed WebGL Gallery (Codrops)](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)
- [Animate WebGL Shaders with GSAP (Codrops)](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/)

### Page Transitions
- [View Transitions in Next.js (Official Docs)](https://nextjs.org/docs/app/guides/view-transitions)
- [View Transitions API with Next.js (Noqta)](https://noqta.tn/en/tutorials/view-transitions-api-nextjs-smooth-page-animations-2026)
- [How to Add Page Transitions in Next.js (Glance)](https://glance.thyonix.com/blog/nextjs-page-transitions-app-router)

### WebGL Effects
- [WebGL Liquid Distortion Hover (Dev.to)](https://dev.to/hr21don/webgl-liquid-distortion-image-hover-effect-three-part-setup-5640)
- [WebGL Lens Distortion Hover](https://freefrontend.com/code/webgl-lens-distortion-hover-2026-04-29/)
- [Interactive WebGL Hover Effects (Codrops)](https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/)
- [Motion Hover with Image Distortion (Codrops)](https://tympanus.net/coprints/2019/10/21/how-to-create-motion-hover-effects-with-image-distortions-using-three-js/)

### Micro-Interactions & UI
- [20 Modern CSS Buttons 2026](https://veebilehed24.ee/en/blog/css-effects/20-modern-css-buttons-hover-effects-and-animations-2026/)
- [Magnetic Cursor Effect (GSAP Vault)](https://gsapvault.com/effects/magnetic-cursor)
- [12 Micro Animation Examples 2026 (BricxLabs)](https://bricxlabs.com/blogs/micro-interactions-2025-examples)
- [CSS Micro Animations Guide 2026 (SkillValix)](https://www.skillvalix.com/blog/css-animations-micro-interactions-guide)

### Scrollytelling
- [21 Scrollytelling Website Examples (Really Good Designs)](https://reallygooddesigns.com/scrollytelling-website-examples/)
- [Scrollytelling Guide (Webflow)](https://webflow.com/blog/scrollytelling-guide)
- [10 Best Interactive Websites 2026 (Lovable)](https://lovable.dev/guides/best-interactive-websites)

### Preloaders
- [Top 30 Captivating Preloaders (GlobalDev)](https://globaldev.tech/blog/30-most-captivating-preloaders-for-website)
- [75 Preloader Examples (SVGator)](https://www.svgator.com/blog/best-preloader-examples/)
- [37 Best CSS Loading Animations 2026 (uiCookies)](https://uicookies.com/css-loading-animations/)

---

# Part 2: Element Animations & Advanced Page Transitions Research

> Compiled June 2026. Covers the complete GSAP animation catalog (100+ effects), CSS scroll-driven animations, advanced clip-path transitions, 3D card interactions, GSAP Flip plugin, and creative page transition techniques.

---

## GSAP Animation Catalog (100+ Effects)

### Text & Typography (12 effects)

| Effect | Description | Technique |
|--------|-------------|-----------|
| Stagger Reveal | Letters fade and rise one by one with staggered timing | SplitText + stagger |
| Typewriter | Text types out char by char with blinking cursor | TextPlugin |
| Text Scramble | Random characters cycle rapidly before resolving | ScrambleText |
| Word-by-Word Slide | Each word slides up from below with rotation | SplitText + rotationZ |
| Kinetic Split Lines | Lines split apart and animate from opposing directions | SplitText lines |
| 3D Letter Flip | Each character flips in on Y-axis with perspective | rotateY + perspective |
| Gradient Text Reveal | Text fills with gradient color sweep left to right | background-clip: text |
| Glitch Text | RGB-split clipping and positional jitter | clip-path + x/y offset |
| Matrix Decode | Characters rain as random glyphs then decode | ScrambleText |
| Per-Character Physics Drop | Each char drops with individual gravity and bounce | CustomBounce |
| Liquid Text Wave | Characters undulate in continuous sine wave ripple | y + sine function |

### Cards & Components (9 effects)

| Effect | Description | Technique |
|--------|-------------|-----------|
| Card Hover Lift | Card rises, shadow deepens, subtle scale on hover | y + boxShadow + scale |
| 3D Card Flip | Card rotates 180° on Y-axis to reveal back content | rotateY + backface-visibility |
| Card Expand to Detail | Clicking card expands to full-width detail view | Flip plugin |
| Stacked Card Fan | Stacked cards fan out into spread on hover | rotation + x stagger |
| Card Slide-In Stagger | Cards slide in from alternating sides | x: alternating ±80 |
| Card Background Shift | Background gradient shifts angle/color on hover | backgroundImage |
| Flip Grid Filter | Grid items rearrange with smooth animation on filter | Flip.getState + Flip.from |
| Shared Element Transition | Thumbnail expands seamlessly to hero view | Flip plugin |
| Accordion with Motion | Panels open with surrounding content flowing | height + Flip |

### Image & Gallery (7 effects)

| Effect | Description | Technique |
|--------|-------------|-----------|
| Clip-Path Image Reveal | Image reveals through animated polygon on scroll | clip-path + ScrollTrigger |
| Image Parallax Zoom | Image zooms slightly while scrolling past | scale + scrub |
| Grayscale to Color | Images start desaturated, animate to full color on scroll | filter: grayscale + scrub |
| Masonry Cascade | Grid items cascade from random positions with stagger | x/y random + stagger |
| Image Tilt on Hover | Image tilts toward cursor with 3D perspective | rotateX/Y + perspective |
| Ken Burns Slideshow | Slow pan/zoom with crossfade transitions | scale + x/y + opacity |

### Hover & Interactions (11 effects)

| Effect | Description | Technique |
|--------|-------------|-----------|
| Magnetic Button | Button magnetically follows cursor nearby | quickTo x/y |
| Underline Slide | Underline animates from cursor enter direction | scaleX + transform-origin |
| Hover Border Draw | Border draws around element on hover | stroke-dasharray |
| Ripple Click | Material-style ripple from click point | radial-gradient + scale |
| Icon Morph | Hamburger → X smooth morph | rotation + y translation |
| Button Shimmer | Shimmering light sweep on hover | translateX gradient |
| Elastic Stretch Drag | Element stretches like rubber, snaps back | scaleX/Y + elastic ease |
| Card Deck Toss | Pull top card, toss left/right, next appears | Draggable + x + rotation |
| 3D Cube Drag | Drag to rotate CSS 3D cube showing different faces | rotateX/Y + preserve-3d |

### Physics & Particles (10 effects)

| Effect | Description | Technique |
|--------|-------------|-----------|
| Confetti Cannon | Explosion of shapes with gravity and rotation | Physics2D |
| Gravity Card Drop | Cards fall from above with bounce and settle | CustomBounce |
| Magnetic Repel Grid | Grid of dots repelled by cursor | Physics2D + quickTo |
| Jelly Button | Button squashes on press, bounces back | scaleX/Y + elastic |
| Wobble Card Enter | Cards wobble into view with springy rotation | rotation + elastic.out |
| Springboard Menu | Menu items bounce in with cascading energy loss | y + elastic stagger |

### Loaders & Transitions (5 effects)

| Effect | Description | Technique |
|--------|-------------|-----------|
| Staggered Blinds Reveal | Vertical slats slide away like blinds opening | clip-path polygon stagger |
| Counter Preloader | 0→100% count with progress bar, then content reveals | counter + scaleX |
| Circle Wipe Transition | Expanding circle wipes away old content | clip-path: circle() |
| Skeleton to Content | Skeleton placeholders morph into actual content | Flip plugin |
| Curtain Reveal | Two panels slide apart like theatre curtains | x: ±50% |

---

## CSS Scroll-Driven Animations (Native, No JS)

### The `animation-timeline` Property
Animations progress along a scroll-based timeline instead of the default time-based timeline. No JavaScript needed.

### `view()` Function
Creates a timeline based on when an element enters/exits the viewport. Gold standard for "reveal on scroll" effects.

```css
.reveal-element {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### `scroll()` Function
Ties animation to scroll position of a container. Perfect for progress bars, parallax.

```css
.progress-bar {
  animation: grow-bar linear;
  animation-timeline: scroll();
}
```

### Browser Support (2026)
Universal support across Chrome, Edge, Safari. Can be wrapped in `@supports` for progressive enhancement.

### Key Advantages Over GSAP
- Zero JavaScript bundle cost
- Browser compositor thread (guaranteed 60fps)
- Simpler code for basic reveals
- BUT: lacks timeline sequencing, complex stagger, physics — use GSAP for those

---

## 3D Card Tilt / Perspective Interactions

### Core Technique
```js
// Calculate cursor position relative to card center
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const centerX = rect.width / 2;
const centerY = rect.height / 2;

// Convert to rotation values
const rotateY = ((x - centerX) / centerX) * maxTilt;  // ±8deg typical
const rotateX = -((y - centerY) / centerY) * maxTilt;

gsap.quickTo(card, "rotateX")(rotateX);
gsap.quickTo(card, "rotateY")(rotateY);
```

### Glare Layer (Optional)
Radial gradient overlay that follows cursor, simulating light reflection:
```css
background: radial-gradient(
  circle at var(--mouse-x) var(--mouse-y),
  rgba(255,255,255,0.15) 0%,
  transparent 60%
);
```

### Performance
- Use `will-change: transform` during hover, remove on leave
- `gsap.quickTo` avoids creating new tweens per pixel
- Gate behind `(hover: hover)` media query

---

## GSAP Flip Plugin — Layout Transitions

### How It Works (FLIP = First, Last, Invert, Play)
1. **First**: `Flip.getState(elements)` captures current position/size/rotation
2. **Last**: Make DOM changes (reparent, restyle, reorder)
3. **Invert + Play**: `Flip.from(state, { duration, ease })` — GSAP applies offsets to make elements look unmoved, then animates the removal

### Key Use Cases
- Grid filtering (show/hide categories with smooth rearrangement)
- Card expand to detail view (thumbnail → full-width)
- Layout switching (grid → list → masonry)
- Responsive layout transitions on resize

### Code Pattern
```js
const state = Flip.getState(gridItems);
container.dataset.layout = "list";  // CSS changes layout
Flip.from(state, {
  duration: 0.8,
  ease: "expo.inOut",
  stagger: { amount: 0.3, from: "random" },
  absolute: true,  // positions elements absolutely during animation
  scale: true,     // scale instead of width/height (better perf)
});
```

### `containerAnimation` for Horizontal Scroll
When elements are inside a horizontally scrolling container, use `containerAnimation` to trigger animations based on horizontal position:
```js
const horizontalTween = gsap.to(track, { x: -scrollWidth, ... });
gsap.from(card, {
  scrollTrigger: {
    trigger: card,
    containerAnimation: horizontalTween,
    start: "left 85%",
  }
});
```

---

## Creative Page Transition Techniques

### Clip-Path Transitions
- **Circle wipe**: `circle(0% at 50% 50%)` → `circle(150% at 50% 50%)` — expands from center or click point
- **Inset wipe**: `inset(100%)` → `inset(0%)` — shrinks edges inward
- **Polygon wipe**: `polygon(0 0, 0 0, 0 100%, 0 100%)` → full rectangle — diagonal reveal
- **Diamond**: `polygon(50% 0, 100% 50%, 50% 100%, 0 50%)` — diamond shape expands

### Key Rule
Both start and end states must use the same shape function with the same number of coordinate points for smooth interpolation.

### Directional Navigation
```css
/* Forward: slides left */
::view-transition-old(root):active-transition-type(slide-forward) {
  animation: 500ms ease both slide-out-left;
}
::view-transition-new(root):active-transition-type(slide-forward) {
  animation: 500ms ease both slide-in-right;
}
```

### Click-Position-Aware Transitions
Set CSS custom properties on click, use them in the animation:
```js
document.documentElement.style.setProperty("--click-x", `${x}%`);
document.documentElement.style.setProperty("--click-y", `${y}%`);
```
```css
@keyframes circle-in {
  from { clip-path: circle(0% at var(--click-x) var(--click-y)); }
  to { clip-path: circle(150% at var(--click-x) var(--click-y)); }
}
```

### Theatrical Transitions
- **Curtain/Blinds**: Vertical slats slide away sequentially
- **Book page turn**: 3D rotateY with perspective simulating page flip
- **Ink bleed**: Organic shape expansion using SVG mask
- **Split curtain**: Two halves slide apart from center

### View Transitions API Level 2 — `transitionTypes`
```tsx
// Next.js 16 — set type on Link
<Link href="/about" transitionTypes={["curtain"]}>

// CSS — target by type
::view-transition-old(root):active-transition-type(curtain) { ... }
```

---

## Entrance Animation Categories

### Fade Variants
- **Fade up**: `opacity: 0, y: 30px` → natural — most common
- **Fade down**: `opacity: 0, y: -20px` → for elements entering from above
- **Blur in**: `opacity: 0, filter: blur(8px)` → cinematic, premium
- **Focus pull**: heavy blur to sharp — like camera focusing

### Slide Variants
- **Slide left/right**: `x: ±80px` — cards from alternating sides
- **Slide with blur**: `x: -50px, filter: blur(6px)` — motion blur effect
- **Elastic slide**: Same but with `elastic.out` ease for bounce

### Scale Variants
- **Scale up**: `scale: 0.85, opacity: 0` → natural scale
- **Pop in**: `scale: 0, opacity: 0` with `back.out(2)` — bouncy appearance
- **Grow from center**: `scale: 0` with `transformOrigin: "center"` — circular growth

### 3D Variants
- **Flip in**: `rotateX: -90` or `rotateY: -90` with perspective
- **Rotate in**: `rotation: -5deg, y: 40px` — slight spin with slide
- **Wobble**: `rotation: random(-3, 3)` with `elastic.out` — springy settle

### Clip-Path Variants
- **Circle expand**: `circle(0%)` → `circle(75%)` — organic reveal
- **Inset shrink**: `inset(15%)` → `inset(0%)` — frame expanding
- **Diagonal wipe**: polygon revealing left-to-right diagonally

### Stagger Patterns
- **Linear**: `stagger: 0.1` — simple sequential
- **From center**: `stagger: { from: "center", each: 0.1 }` — radiate outward
- **From edges**: `stagger: { from: "edges", each: 0.1 }` — converge inward
- **Random**: `stagger: { from: "random", each: 0.1 }` — organic feel
- **Grid aware**: `stagger: { grid: [rows, cols], from: "center", each: 0.08 }` — 2D wave

### Timing Reference
- Micro-interactions (hover, click): 200-300ms
- Element reveals (scroll-triggered): 600-900ms
- Page transitions: 400-600ms
- Hero entrance sequences: 1000-1500ms
- Stagger between elements: 30-150ms

### Easing Reference
- `power3.out` — General entrance
- `power4.out` — Hero/headline reveals
- `elastic.out(1, 0.5)` — Wobble/spring card entrance
- `back.out(2)` — Pop-in with overshoot
- `expo.inOut` — Flip layout transitions
- `"none"` — Scrubbed scroll animations

---

## Additional Sources

### Element Animations
- [GSAP Vault — All Effects](https://gsapvault.com/effects)
- [GSAPify — 100+ Effects & Examples](https://gsapify.com/gsap-animations/)
- [Awwwards — Animated Cards on Scroll](https://www.awwwards.com/inspiration/animated-cards-on-scroll-digitalists)
- [Awwwards — Card Hover Effects](https://www.awwwards.com/inspiration/hover-effect-evan-fasquelle-portfolio)
- [Awwwards — 3D Card Interaction](https://www.awwwards.com/inspiration/3d-card-interaction-crazymonkey)
- [60+ GSAP ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/)
- [GSAP Flip Plugin Docs](https://gsap.com/docs/v3/Plugins/Flip/)
- [Animating Responsive Grid with GSAP Flip (Codrops)](https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/)

### Page Transitions
- [Transition.style — clip-path transitions](https://www.transition.style/)
- [CSS Page Transitions (WPDean)](https://wpdean.com/css-page-transitions/)
- [Codrops — Page Transitions](https://tympanus.net/codrops/tag/page-transition/)
- [CSS Transition Effects (CodeFronts)](https://codefronts.com/motion/css-transition-designs/)
- [35+ Cool CSS Page Transitions](https://devsnap.me/css-page-transitions)
- [Animating with Clip-Path (CSS-Tricks)](https://css-tricks.com/animating-with-clip-path/)
- [The Magic of Clip Path (Emil Kowalski)](https://emilkowal.ski/ui/the-magic-of-clip-path)

### CSS Scroll-Driven Animations
- [Scroll-Driven Animations (Josh Comeau)](https://www.joshwcomeau.com/animation/scroll-driven-animations/)
- [Mastering CSS Scroll Timeline 2026 (Dev.to)](https://dev.to/softheartengineer/mastering-css-scroll-timeline-a-complete-guide-to-animation-on-scroll-in-2025-3g7p)
- [CSS Scroll-Driven Animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Creating Complex Scroll-Driven Animations with Pure CSS (Dev.to)](https://dev.to/nickbenksim/creating-complex-scroll-driven-animations-with-pure-css-in-2026-17l)
- [30+ CSS Scroll-Driven Animations](https://freefrontend.com/css-scroll-driven/)
- [2026 CSS Features You Must Know](https://blog.riadkilani.com/2026-css-features-you-must-know/)

### 3D Card Effects
- [3D Card Effect (GitHub)](https://github.com/alexanderuk82/3d-card)
- [3D Card Hover Animation (CodingStella)](https://codingstella.com/how-to-make-3d-card-hover-animation-in-html-css-js/)
- [GSAP Flip Cart Animation (Ryan Mulligan)](https://ryanmulligan.dev/blog/gsap-flip-cart/)
- [20+ JavaScript Reveal Effects](https://freefrontend.com/javascript-reveal-effects/)
