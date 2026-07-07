# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing website for **The Lab Caffè**, a bar/café in San Martino in Trignano, Spoleto (Italy). It's a static site: one `index.html`, no build step, no framework, no package manager. Content and copy are in Italian.

## Running locally

There's no dev server dependency — open `index.html` directly, or serve it:

```
py -m http.server 5599 --directory .
```

(This matches the preconfigured launch target in `.claude/launch.json`, named `thelab-static`, serving on port 5599.)

There is no build, lint, or test tooling in this repo — no `package.json`, no bundler, no test suite. Changes to HTML/CSS/JS are live on refresh.

## Architecture

Everything lives in three flat files plus assets:

- `index.html` — the entire page, all sections inline (navbar, hero, servizi, cornetti, social proof, menu, cta-final, info/mappa, live-lab, footer). Sections are marked with `<!-- ============ SECTION ============ -->` comment banners — use those to navigate rather than searching for class names.
- `css/style.css` — main stylesheet, organized in banner-commented blocks in the same order as the HTML sections (Scroll Progress → Navbar → Hero → Servizi → Cornetti → Social Proof → Menu → CTA Finale → Info+Mappa → Live dal Lab → Footer → Mobile CTA bar → Responsive → Print). Design tokens (colors, fonts, radius, easing) are CSS custom properties in `:root` at the top — always reuse these vars (`--accent`, `--notte`, `--gesso`, `--fumo`, `--ease`, etc.) instead of hardcoding colors.
- `css/animations.css` — scroll-reveal and micro-interaction keyframes/classes (`.reveal`, `.fade-in-up`, `.stagger-parent`, etc.), paired with `js/animations.js`.
- `js/main.js` — navbar scroll state, scroll-progress bar, mobile hamburger overlay, map tap-to-activate guard, scrollspy (IntersectionObserver highlighting the active nav link).
- `js/menu.js` — tab/panel switcher for the `#menu` section (Colazione / Pranzo / Aperitivo / Cocktail / Vini / Pinse).
- `js/animations.js` — IntersectionObserver-driven reveal animations for `.reveal` elements and the star-rating reveal, with a `prefers-reduced-motion` fallback that shows everything immediately.

Each JS file is a self-contained IIFE with no shared state or module system — they attach independently to DOM elements by ID/class and no-op safely if those elements aren't present.

## Content conventions

- **Menu data** (`#menu` section in `index.html`) is hand-authored HTML — each item is a `.menu-item` with a `<span>` name and `.price` span. There's no data file or templating; adding/editing menu items means editing the markup directly inside the relevant `.menu-panel[data-panel="..."]`.
- **Structured data**: the `<script type="application/ld+json">` block in `<head>` (schema.org `FoodEstablishment`/`BarOrPub`) mirrors NAP (name/address/phone), hours, rating, and menu URL — keep it in sync if any of that info changes elsewhere on the page.
- Real business details are load-bearing: phone `+390743522753`, address Viale Cerquestrette 36, San Martino in Trignano, 06049 Spoleto (PG), digital menu at `menudigitale.io/thelabcaffe`, Instagram `@the_lab_caffe`, booking via Tally form (`tally.so/r/kdx0bM`). Don't invent placeholder contact info.
- There are outstanding `TODO` comments in `index.html` (og-image asset, Partita IVA, real Instagram photos for the `#live` tiles) — check surrounding comments before assuming these are finished.
- `assets/logo.png` / `assets/logo.webp` are used everywhere via `<picture>` (webp source + png fallback); keep both in sync if the logo changes.

## Notes

- `graphify-out/` is generated tooling output (from the graphify skill), not project content — ignore it unless specifically working with graphify.
- No linter/formatter is configured, so match the existing indentation (2 spaces) and comment-banner style when editing.
