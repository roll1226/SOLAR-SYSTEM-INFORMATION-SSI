# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Solar System Information (SSI) is a static web application built as a school event project (HAL EVENT WEEK). It renders an interactive 3D solar system in the browser using Three.js, with per-planet detail pages and A-Frame VR views.

**Important:** Three.js loads textures via relative paths, which requires a local server (e.g., XAMPP). Opening HTML files directly via `file://` will cause textures to fail due to CORS restrictions.

## Running the Project

Serve the project root from a local web server:
```
# Example using Python
python3 -m http.server 8080
# Then open http://localhost:8080/html/index.html
```

Or use XAMPP/MAMP by placing the repo under the server's `htdocs` directory and visiting `http://localhost/SOLAR-SYSTEM-INFORMATION-SSI/html/index.html`.

There is no build step. JS/CSS is vanilla or vendored in `js/` and `css/`.

## Testing

Unit tests use Jest. Run with:
```
npm test
```

Test files live in `tests/`. Pure utility functions and base classes are covered:
- `tests/utils.test.js` — `getNow`, `getToday`, `navigateToPlanet`, `planetInbg`, `PLANET_ROUTES`, `SPEECH_MAP`
- `tests/planet.test.js` — `planet`, `ring`, `Cloud`, `initLoadingAnimation` classes/functions

**After creating or editing JS logic, run `npm test` to verify nothing is broken.**

## Architecture

### Page Structure

- `html/index.html` — Main solar system view (Three.js interactive 3D scene)
- `html/<planet>.html` — Individual planet detail pages (earth, mercury, venus, mars, moon, jupiter, saturn, uranus, neptune, sun)
- `vr/<planet>vr.html` — A-Frame VR versions of each planet page

Each page has a corresponding CSS file in `css/` and JS file in `js/`.

### JavaScript Architecture

- `js/all.js` / `js/all.min.js` — Main script for `index.html`. Handles:
  - Three.js scene setup (solar system with orbiting planets, raycasting for click detection)
  - Vue.js instances for loading screen, operation guide, user info, speech button, VR button, QR code display
  - Web Speech API integration for voice-controlled planet navigation
  - Keyboard shortcuts (S=sun, Me=mercury, V=venus, E=earth, Mo=moon, Ma=mars, J=jupiter, Sa=saturn, U=uranus, N=neptune)
  - Page transition animations with `planetInbg()` → `location.href`

- `js/planet.js` — Shared base classes and utilities for planet pages:
  - `planet` class — Three.js sphere with texture
  - `ring` class — Three.js torus for ring planets (Saturn, Uranus)
  - `Cloud` class — Transparent sphere layer for cloud overlay (Earth)
  - `initLoadingAnimation(delays?)` — page-in loading animation (defaults: ani=700, title=1400, bg=2200ms)
  - `createPlanetScene()` — creates renderer, scene, camera, controls, light and returns them
  - `startRenderLoop(scene, camera, controls, renderer, onTick)` — starts requestAnimationFrame loop

- `js/<planet>.js` — Per-planet scripts. Each sets up a Three.js scene with OrbitControls (locked distance) and a Vue.js instance for the info panel (2-page content with prev/next navigation).

- `js/audioManager.min.js`, `js/vue.min.js`, `js/three.min.js`, `js/orbitcontrols.js`, `js/preloadjs-min.js` — Vendored libraries (do not modify).

### VR Pages (`vr/`)

Built with A-Frame. Each VR page is standalone: an `<a-scene>` with the planet sphere, sky sphere, and gaze-based cursor. VR JS files in `vr/js/` handle rotation animation and back-button behavior.

### CSS Architecture

- `css/ress.min.css` — CSS reset (vendored)
- `css/bg.css` — Shared starfield background styles
- `css/index.css` — Main page styles (imports bg.css and ress.min.css)
- `css/<planet>.css` — Per-planet page styles

### Images

- `images/` — Root-level planet textures used by Three.js (e.g., `earth.jpg`, `crowd.png`)
- `images/planet/` — Images embedded in Vue.js HTML strings for the info panels
- `images/qr/` — QR code images for VR page links (one per planet)

### Vue.js Usage Pattern

Vue is used for reactive UI overlays, not as a full SPA framework. Each `new Vue({ el: "#some-div", data: { ... } })` call controls a single DOM section. HTML content is often passed as template literal strings in `v-html` bindings.

## Key Constraints

- **Chrome only** — Web Speech API and some rendering features require Chrome.
- **Internet required** — Google Fonts and Font Awesome are loaded from CDN; Web Speech API requires Google's servers.
- **No back navigation** — Planet pages use `window.location.hash = "#noback"` with `onhashchange` to prevent browser back button.
- **`all.min.js` is the production build** of `all.js` — when editing `all.js`, also update `all.min.js` (manually or via a minifier), as `index.html` loads `all.min.js`.
