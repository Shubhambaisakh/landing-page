# Implementation Plan: Prabal Herbal Landing Page

## Overview

Build a pure HTML5 / CSS3 / vanilla JS single-page marketing website for Prabal Herbal (by Asha Industries). No framework, no build step. Entry point is `index.html`; styles in `style.css`; behaviour in `main.js`; assets under `assets/images/` and `assets/icons/`.

## Tasks

- [x] 1. Scaffold project structure and define CSS custom properties
  - Create `index.html` with all section stubs (`<nav>`, `#home`, `#products`, `#about`, `#gallery`, `#contact`, `<footer>`)
  - Create `style.css` with CSS custom properties: `--color-primary` (deep green), `--color-accent` (gold), `--color-surface` (white), base reset, and typography scale using `clamp()`
  - Create `main.js` as an empty module with `'use strict'`
  - Create `assets/images/` and `assets/icons/` placeholder directories (add a `.gitkeep`)
  - _Requirements: 1.1, 8.1, 8.4_

- [x] 2. Implement Navigation Bar
  - [x] 2.1 Build sticky nav with logo/wordmark and section links
    - Add `<nav>` with brand wordmark, links to `#home`, `#products`, `#about`, `#gallery`, `#contact`, and a hamburger button (mobile only)
    - Style: `position: fixed`, `z-index: 1000`, full-width, deep-green background on `.scrolled`
    - _Requirements: 2.1, 2.2, 2.5_

  - [x] 2.2 Implement scroll-based nav background toggle in `main.js`
    - Export `applyNavScrollState(scrollY, heroHeight)` — adds/removes `.scrolled` on `<nav>`; wire to `window.scroll` event
    - _Requirements: 2.4_

  - [ ]* 2.3 Write property test for nav scroll toggle (Property 1)
    - **Property 1: Nav background toggles on scroll**
    - **Validates: Requirements 2.4**

  - [x] 2.4 Implement smooth scroll for nav links and CTAs
    - Delegated click handler on `<nav>` and hero CTAs; calls `element.scrollIntoView({ behavior: 'smooth' })`
    - _Requirements: 2.3, 1.5_

  - [x] 2.5 Implement hamburger menu toggle
    - Export `toggleMobileMenu(nav)` — flips `.nav-open` class on `<nav>`; wire hamburger button click
    - Mobile styles: links render as full-width stacked list when `.nav-open`
    - _Requirements: 8.5, 8.6_

  - [ ]* 2.6 Write property test for hamburger toggle idempotency (Property 11)
    - **Property 11: Hamburger menu toggle is idempotent per call**
    - **Validates: Requirements 8.6**

- [x] 3. Implement Hero Section
  - [x] 3.1 Build hero HTML and CSS
    - `<section id="home">` with `height: 100vh`, `background-image` using `img-01.jpg`, dark overlay `rgba(0,0,0,0.55)` via `::before` pseudo-element
    - `<h1>` with `text-shadow`, tagline `<p>`, two CTA `<a>` buttons: "Explore Products" → `#products`, "Get Bulk Pricing" → `#contact`
    - Banner strip: "Bulk Orders & Dealership Available — Contact Us Today" with link to `#contact`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 3.2 Write unit tests for hero section structure
    - Hero is first `<section>` in DOM; contains "Prabal Herbal"; contains exactly 2 CTA links
    - _Requirements: 1.1, 1.2, 1.4_

- [x] 4. Implement Product Showcase
  - [x] 4.1 Define `PRODUCTS` array and `renderProductCard(product)` in `main.js`
    - All 7 products with `id`, `name`, `category`, `image`/`icon`, and `features[]`
    - `renderProductCard` returns an `<article class="product-card">` with `.card-image` (img or SVG), `.card-title`, `.card-features` (≥3 `<li>`)
    - Home hygiene `<img>` elements must have `loading="lazy"`
    - _Requirements: 3.1, 3.2, 3.5, 3.6, 3.7, 3.8_

  - [ ]* 4.2 Write property test for product card required elements (Property 2)
    - **Property 2: Every product card contains required display elements**
    - **Validates: Requirements 3.2**

  - [ ]* 4.3 Write property test for product image/icon category assignment (Property 3)
    - **Property 3: Product image/icon assignment matches category**
    - **Validates: Requirements 3.7, 3.8**

  - [ ]* 4.4 Write property test for lazy loading on product images (Property 10)
    - **Property 10: Below-fold images use lazy loading**
    - **Validates: Requirements 8.3**

  - [x] 4.5 Render product grid into DOM and add hover effect CSS
    - Two sub-sections: "Home Hygiene Essentials" and "Automotive Care" with CSS Grid
    - Breakpoints: 3 cols ≥ 1024 px, 2 cols ≥ 600 px, 1 col < 600 px
    - Hover: `transform: translateY(-6px)` + `box-shadow` transition on `.product-card:hover`
    - _Requirements: 3.3, 3.4_

  - [ ]* 4.6 Write unit tests for product data and grid
    - PRODUCTS has exactly 7 items (5 home hygiene + 2 automotive); all 7 product ids present; grid renders correct count
    - _Requirements: 3.1, 3.5, 3.6_

- [x] 5. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Brand Story & Differentiators Section
  - [x] 6.1 Build about section HTML and CSS
    - `<section id="about">` with two-column desktop layout (story text left, differentiators right); single column on mobile
    - Story text mentions Asha Industries, Bhopal M.P., purified water, emulsifiers, Glycerine, Pine Oil
    - _Requirements: 4.1, 4.3, 4.4_

  - [x] 6.2 Define `DIFFERENTIATORS` array and `renderDifferentiator(diff)` in `main.js`
    - At least 3 items: Quality Ingredients, Expert Formulation, Direct from Manufacturer
    - Each rendered element contains an SVG icon and a `.diff-label` text node
    - _Requirements: 4.2, 4.5_

  - [ ]* 6.3 Write property test for differentiator icon + label (Property 4)
    - **Property 4: Every differentiator item contains an icon and a label**
    - **Validates: Requirements 4.5**

  - [ ]* 6.4 Write unit tests for about section content
    - Contains "Asha Industries" and "Bhopal"; contains at least 3 differentiator items; text includes "Glycerine" and "Pine Oil"
    - _Requirements: 4.2, 4.3, 4.4_

- [x] 7. Implement Image Gallery and Lightbox
  - [x] 7.1 Build gallery grid HTML and CSS
    - `<section id="gallery">` with CSS Grid: 4 cols ≥ 1024 px, 2 cols ≥ 600 px, 1 col < 600 px
    - Up to 30 `<img>` elements with `loading="lazy"` and `object-fit: cover` in fixed-aspect-ratio containers
    - Images ordered with floor/house cleaning visuals first
    - _Requirements: 5.1, 5.2, 5.6, 8.3_

  - [x] 7.2 Implement `openLightbox(index)` and `closeLightbox()` in `main.js`
    - `<div id="lightbox">` overlay (fixed, full-screen, `z-index: 2000`) with active `<img>`, prev/next arrows, close button
    - `openLightbox(i)` sets `galleryState.isOpen = true` and `galleryState.currentIndex = i`; guard: return early if no images
    - `closeLightbox()` sets `galleryState.isOpen = false`; hides overlay
    - Wire gallery image clicks to `openLightbox`
    - _Requirements: 5.3_

  - [ ]* 7.3 Write property test for lightbox opens at correct index (Property 5)
    - **Property 5: Lightbox opens at the correct index**
    - **Validates: Requirements 5.3**

  - [x] 7.4 Implement `navigateLightbox(direction, index, total)` and keyboard navigation
    - Returns `(index + 1) % total` for `'next'`; `(index - 1 + total) % total` for `'prev'`
    - Wire prev/next arrow buttons and `keydown` listener: `ArrowLeft` → prev, `ArrowRight` → next, `Escape` → close
    - _Requirements: 5.4, 5.5_

  - [ ]* 7.5 Write property test for lightbox navigation wrap-around (Property 6)
    - **Property 6: Lightbox navigation wraps correctly**
    - **Validates: Requirements 5.4**

  - [ ]* 7.6 Write unit tests for lightbox keyboard behaviour
    - Escape key closes lightbox; gallery renders up to 30 img elements
    - _Requirements: 5.1, 5.5_

- [x] 8. Implement Inquiry Form with Validation
  - [x] 8.1 Build form HTML inside `<section id="contact">`
    - 6 fields: Full Name (`text`, required), Phone Number (`tel`, required), Email Address (`email`), City (`text`), Inquiry Type (`select` defaulting to `bulk-order`, required), Message (`textarea`)
    - Each field has a sibling `<span class="field-error">` (hidden by default)
    - Confirmation `<div class="confirmation">` hidden by default
    - _Requirements: 6.1, 6.2, 6.7_

  - [x] 8.2 Implement `VALIDATORS` and `validateForm(data)` in `main.js`
    - `VALIDATORS.phone`: `/^\d{10}$/`; `VALIDATORS.email`: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (empty string passes); `VALIDATORS.required`: `v.trim().length > 0`
    - `validateForm(data)` returns `{ valid: boolean, errors: string[] }`
    - On submit: if valid → hide form, show `.confirmation`; if invalid → show inline `.field-error` per failing field
    - _Requirements: 6.3, 6.4, 6.5, 6.6_

  - [ ]* 8.3 Write property test for valid submission produces confirmation (Property 7)
    - **Property 7: Valid form submission produces confirmation**
    - **Validates: Requirements 6.3**

  - [ ]* 8.4 Write property test for missing required fields produce errors (Property 8)
    - **Property 8: Missing required fields produce inline errors**
    - **Validates: Requirements 6.4**

  - [ ]* 8.5 Write property test for format-invalid values produce errors (Property 9)
    - **Property 9: Format-invalid field values produce inline errors**
    - **Validates: Requirements 6.5, 6.6**

  - [ ]* 8.6 Write unit tests for form structure and defaults
    - Form contains all 6 fields; Full Name, Phone, Inquiry Type have `required` attribute; select defaults to `"bulk-order"`
    - _Requirements: 6.1, 6.2, 6.7_

- [x] 9. Implement Contact Information Section
  - [x] 9.1 Add contact details and Google Maps embed to `<section id="contact">`
    - Phone: `<a href="tel:+916263245502">`, email: `<a href="mailto:prabalherbal16@gmail.com">`, address text
    - Google Maps `<iframe>` for Katara Hills Road, Bhopal; fallback plain-text link to `https://maps.google.com/?q=...`
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 9.2 Write unit tests for contact section links
    - Contains `tel:+916263245502` href; contains `mailto:prabalherbal16@gmail.com` href; contains maps iframe or link
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement Footer
  - [x] 11.1 Build footer HTML and inject current year via JS
    - Brand name, tagline, quick links to `#products`, `#about`, `#contact`, contact summary
    - Copyright: `© [year] Asha Industries. All rights reserved.` — year set by `new Date().getFullYear()` in `main.js`
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ]* 11.2 Write unit tests for footer
    - Contains copyright text with current year; contains links to `#products`, `#about`, `#contact`
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 12. Wire everything together and final polish
  - [x] 12.1 Wire all `main.js` modules into a single `DOMContentLoaded` initialiser
    - Call `renderProductCard` for all products, `renderDifferentiator` for all differentiators, populate gallery, set footer year, attach all event listeners
    - _Requirements: 1.5, 2.3, 3.1, 5.3, 6.3_

  - [x] 12.2 Set up Vitest (or Jest) + fast-check test environment
    - Add `package.json` with `vitest` and `fast-check` dev dependencies; configure `jsdom` environment for DOM tests
    - Create `tests/` directory with `unit.test.js` and `property.test.js` stubs importing helpers from `main.js`
    - _Requirements: (testing infrastructure)_

  - [ ]* 12.3 Write remaining unit tests not covered in earlier tasks
    - Nav contains links to all 5 sections and brand wordmark; hero is first `<section>`
    - _Requirements: 2.2, 2.5, 1.1_

- [x] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with a minimum of 100 iterations per property
- Unit tests use Vitest (or Jest) with jsdom for DOM assertions
- Exported functions (`applyNavScrollState`, `toggleMobileMenu`, `openLightbox`, `navigateLightbox`, `validateForm`, `VALIDATORS`, `renderProductCard`, `renderDifferentiator`, `PRODUCTS`, `DIFFERENTIATORS`) must be importable by the test suite
