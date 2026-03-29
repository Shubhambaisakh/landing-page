# Design Document

## Overview

Prabal Herbal Landing Page is a single-page marketing website for Prabal Herbal (by Asha Industries), a Bhopal-based manufacturer of home hygiene and automotive cleaning products. The goal is a premium, conversion-optimised experience that showcases all 7 products, tells the brand story, and drives bulk order and dealership inquiries.

**Technology stack:** Pure HTML5, CSS3, and vanilla JavaScript — no framework required. This keeps the deliverable dependency-free, fast to load, and easy to hand off. A single `index.html` file is the entry point; styles live in `style.css` and behaviour in `main.js`.

**Visual direction:** Modern, clean aesthetic with a deep-green / white / gold palette that signals natural, premium quality. All 30 available images are hygiene/cleaning focused; they are used creatively across the hero, gallery, and product sections. Automotive Care product cards use illustrated SVG icons instead of photographs.

---

## Architecture

The page is a classic multi-section single-page application (SPA-lite) with no server-side rendering or build step required.

```
index.html          ← single entry point, all sections inline
style.css           ← all styles (custom properties, responsive breakpoints)
main.js             ← all interactivity (nav, lightbox, form validation, scroll)
assets/
  images/           ← 30 brand/hygiene images (img-01.jpg … img-30.jpg)
  icons/            ← SVG icons for differentiators and automotive cards
```

### Section Order (DOM top → bottom)

```
<nav>               Navigation Bar (sticky)
<section#home>      Hero Section
<section#products>  Product Showcase (grid)
<section#about>     Brand Story & Differentiators
<section#gallery>   Image Gallery + Lightbox
<section#contact>   Inquiry Form + Contact Info + Map
<footer>            Footer
```

### Interaction Architecture

```
User Event
    │
    ▼
main.js event listeners
    ├── Scroll → nav background toggle, active link highlight
    ├── Nav link / CTA click → smoothScrollTo(targetId)
    ├── Hamburger click → toggleMobileMenu()
    ├── Gallery image click → openLightbox(index)
    ├── Lightbox arrows / keyboard → navigateLightbox(direction)
    ├── Escape key → closeLightbox()
    └── Form submit → validateForm() → showConfirmation() | showErrors()
```

---

## Components and Interfaces

### 1. Navigation Bar

- Fixed position, `z-index: 1000`, full viewport width.
- Contains: logo/wordmark left, nav links centre-right, hamburger icon (mobile only).
- **Scroll behaviour:** On `window.scroll`, if `scrollY > heroHeight` add class `.scrolled` which applies `background: var(--color-surface)` and `box-shadow`.
- **Mobile menu:** Hamburger toggles class `.nav-open` on `<nav>`; links render as full-width stacked list.
- **Smooth scroll:** All `<a href="#section">` links use `element.scrollIntoView({ behavior: 'smooth' })` via a delegated click handler. Scroll completes within 600 ms (CSS `scroll-behavior: smooth` + JS fallback).

### 2. Hero Section

- Full-viewport-height (`100vh`) section.
- Background: CSS `background-image` using one of the 30 hygiene images, with a dark gradient overlay (`rgba(0,0,0,0.55)`) for strong contrast and text legibility. Text color is always `#ffffff` with `text-shadow` applied to headings for additional readability.
- Content: brand name `<h1>`, tagline `<p>`, two CTA buttons — "Explore Products" (→ `#products`) and "Get Bulk Pricing" (→ `#contact`).
- A secondary banner strip below the hero (or within it) displays the message: **"Bulk Orders & Dealership Available — Contact Us Today"** with a direct link to `#contact`.
- Fully responsive: font sizes use `clamp()`.

### 3. Product Showcase

- Two sub-sections: "Home Hygiene Essentials" (5 products) and "Automotive Care" (2 products).
- Each sub-section has a heading and a CSS Grid container.
- **Product Card structure:**
  ```html
  <article class="product-card">
    <div class="card-image">  <!-- img or SVG icon -->
    <div class="card-body">
      <h3 class="card-title">
      <ul class="card-features">  <!-- 3+ bullet points with key benefit highlights e.g. "Kills 99.9% Germs", "Herbal & Safe" -->
    </div>
  </article>
  ```
- Home Hygiene cards: `<img>` pointing to available brand images, `loading="lazy"`.
- Automotive Care cards: inline SVG icon (car silhouette / polish bottle) — no photograph needed.
- Hover effect: CSS `transform: translateY(-6px)` + `box-shadow` transition on `.product-card:hover`.
- Grid breakpoints: 3 cols ≥ 1024 px, 2 cols ≥ 600 px, 1 col < 600 px.

### 4. Brand Story & Differentiators

- Two-column layout on desktop (story text left, differentiators right); single column on mobile.
- Differentiator cards: icon (SVG) + bold label + short description. Three minimum: Quality Ingredients, Expert Formulation, Direct from Manufacturer.
- Mentions Asha Industries, Bhopal M.P., and key ingredients (purified water, emulsifiers, Glycerine, Pine Oil).

### 5. Image Gallery + Lightbox

- Responsive CSS Grid: 4 cols ≥ 1024 px, 2 cols ≥ 600 px, 1 col < 600 px.
- All 30 images rendered with `loading="lazy"` and `object-fit: cover` in fixed-aspect-ratio containers.
- Images ordered to prioritise floor/house cleaning visuals first.
- **Lightbox:** A `<div id="lightbox">` overlay (fixed, full-screen, `z-index: 2000`) with:
  - `<img>` for the active image
  - Previous / Next arrow buttons
  - Close button (×)
  - Keyboard: `ArrowLeft`, `ArrowRight`, `Escape`

### 6. Inquiry Form

- Fields: Full Name (`text`, required), Phone Number (`tel`, required), Email Address (`email`, optional-validated), City (`text`), Inquiry Type (`select`: Bulk Order [default] / Dealership, required), Message (`textarea`).
- Validation runs on submit (and optionally on blur for phone/email).
- On success: form hidden, `<div class="confirmation">` shown with a thank-you message.
- On error: inline `<span class="field-error">` shown beneath each invalid field.
- Phone validation regex: `/^\d{10}$/`
- Email validation regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### 7. Contact Information

- Displays phone (`<a href="tel:+916263245502">`), email (`<a href="mailto:prabalherbal16@gmail.com">`), and address.
- Google Maps embed via `<iframe>` pointing to the Katara Hills Road, Bhopal address.

### 8. Footer

- Brand name + tagline, quick links (Products, About, Contact), contact summary, copyright `© [year] Asha Industries. All rights reserved.` (year injected by JS).

---

## Data Models

The page is static — there is no backend or database. The following describes the in-memory data structures used by `main.js`.

### Product Data

```js
const PRODUCTS = [
  // Home Hygiene Essentials
  {
    id: 'herbal-phenyl',
    name: 'Herbal Phenyl',
    category: 'home-hygiene',
    image: 'assets/images/img-01.jpg',
    features: ['Pine Oil formula', 'Long-lasting fragrance', 'Kills 99.9% germs']
  },
  {
    id: 'toilet-cleaner',
    name: 'Toilet Cleaner',
    category: 'home-hygiene',
    image: 'assets/images/img-02.jpg',
    features: ['Thick gel formula', 'Removes tough stains', 'Fresh fragrance']
  },
  {
    id: 'dishwash-liquid',
    name: 'Dishwash Liquid',
    category: 'home-hygiene',
    image: 'assets/images/img-03.jpg',
    features: ['Grease-cutting formula', 'Gentle on hands', 'Concentrated — lasts longer']
  },
  {
    id: 'hand-soap-gel',
    name: 'Hand Soap Gel',
    category: 'home-hygiene',
    image: 'assets/images/img-04.jpg',
    features: ['Glycerine enriched', 'Moisturises while cleaning', 'pH balanced']
  },
  {
    id: 'glass-cleaner',
    name: 'Glass Cleaner',
    category: 'home-hygiene',
    image: 'assets/images/img-05.jpg',
    features: ['Streak-free finish', 'Fast evaporating', 'Safe on all glass surfaces']
  },
  // Automotive Care
  {
    id: 'car-bike-wash',
    name: 'Car & Bike Wash',
    category: 'automotive',
    image: null,           // no photo — SVG icon used
    icon: 'car-wash',
    features: ['High-foam formula', 'Safe on all paint types', 'Removes road grime']
  },
  {
    id: 'car-polish-wax',
    name: 'Car Polish & Wax',
    category: 'automotive',
    image: null,           // no photo — SVG icon used
    icon: 'car-polish',
    features: ['Deep shine finish', 'UV protection layer', 'Easy wipe application']
  }
];
```

### Gallery State

```js
const galleryState = {
  images: [
    { src: 'assets/images/img-01.jpg', alt: 'Floor cleaning product' },
    // … up to img-30.jpg
  ],
  currentIndex: 0,   // active lightbox image
  isOpen: false
};
```

### Form State

```js
const formState = {
  fields: {
    fullName:    { value: '', valid: null, required: true },
    phone:       { value: '', valid: null, required: true },
    email:       { value: '', valid: null, required: false },
    city:        { value: '', valid: null, required: false },
    inquiryType: { value: 'bulk-order', valid: null, required: true },
    message:     { value: '', valid: null, required: false }
  },
  submitted: false
};
```

### Validation Rules

```js
const VALIDATORS = {
  phone: (v) => /^\d{10}$/.test(v),
  email: (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  required: (v) => v.trim().length > 0
};
```


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Nav background toggles on scroll

*For any* scroll position greater than the hero section's height, the navigation bar element should have the `.scrolled` CSS class applied; for any scroll position at or below the hero height, the class should be absent.

**Validates: Requirements 2.4**

---

### Property 2: Every product card contains required display elements

*For any* product object in the PRODUCTS array, rendering it as a product card should produce an element that contains: the product name text, at least one visual element (an `<img>` with a non-empty `src` for home hygiene products, or an SVG icon element for automotive products), and at least 3 feature list items.

**Validates: Requirements 3.2**

---

### Property 3: Product image/icon assignment matches category

*For any* product in the PRODUCTS data array, if its category is `'home-hygiene'` then its `image` field must be non-null and its `icon` field must be absent/null; if its category is `'automotive'` then its `image` field must be null and its `icon` field must be a non-empty string.

**Validates: Requirements 3.7, 3.8**

---

### Property 4: Every differentiator item contains an icon and a label

*For any* differentiator item rendered in the Brand Story section, the resulting DOM element should contain both an icon element (SVG or `<img>`) and a non-empty label text node.

**Validates: Requirements 4.5**

---

### Property 5: Lightbox opens at the correct index

*For any* valid image index `i` (where `0 ≤ i < galleryState.images.length`), calling `openLightbox(i)` should set `galleryState.isOpen` to `true` and `galleryState.currentIndex` to `i`.

**Validates: Requirements 5.3**

---

### Property 6: Lightbox navigation wraps correctly

*For any* open lightbox with `n` total images and current index `i`, navigating "next" should set `currentIndex` to `(i + 1) % n`, and navigating "previous" should set `currentIndex` to `(i - 1 + n) % n`. This holds for all valid indices including the boundary cases `i = 0` and `i = n - 1`.

**Validates: Requirements 5.4**

---

### Property 7: Valid form submission produces confirmation

*For any* form submission where all required fields (Full Name, Phone Number, Inquiry Type) are non-empty and the Phone Number matches `/^\d{10}$/`, the form validation function should return `true` and the confirmation message should be displayed.

**Validates: Requirements 6.3**

---

### Property 8: Missing required fields produce inline errors

*For any* form submission where at least one required field (Full Name, Phone Number, or Inquiry Type) is empty or whitespace-only, the validation function should return `false` and each empty required field should have a corresponding visible error element.

**Validates: Requirements 6.4**

---

### Property 9: Format-invalid field values produce inline errors

*For any* non-empty phone string that does not match `/^\d{10}$/`, the phone validator should return `false`. *For any* non-empty email string that does not match the email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, the email validator should return `false`. In both cases the corresponding field error element should be shown.

**Validates: Requirements 6.5, 6.6**

---

### Property 10: Below-fold images use lazy loading

*For any* `<img>` element in the product cards or gallery (i.e., not the hero background), the element should have the attribute `loading="lazy"`.

**Validates: Requirements 8.3**

---

### Property 11: Hamburger menu toggle is idempotent per call

*For any* initial nav state (open or closed), calling `toggleMobileMenu()` once should flip the `.nav-open` class; calling it a second time should restore the original state. The toggle is a pure state flip with no side effects beyond the class change.

**Validates: Requirements 8.6**

---

## Error Handling

| Scenario | Handling |
|---|---|
| Form submitted with empty required fields | Inline `<span class="field-error">` shown beneath each invalid field; form not submitted |
| Phone number not 10 digits | Inline error: "Please enter a valid 10-digit phone number" |
| Email address malformed | Inline error: "Please enter a valid email address" |
| Image fails to load (broken src) | CSS `object-fit: cover` container maintains layout; browser default broken-image icon shown; no JS crash |
| Lightbox opened with 0 images | Guard clause: `if (!galleryState.images.length) return;` — lightbox does not open |
| Lightbox navigation at boundary | Modulo arithmetic ensures wrap-around; no out-of-bounds access |
| Google Maps iframe blocked (CSP / network) | Fallback: plain text address link to `https://maps.google.com/?q=...` shown if iframe fails to load |
| JavaScript disabled | All content (products, about, contact info) is visible in plain HTML; form submits via native browser validation; lightbox and smooth scroll degrade gracefully |

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:
- Unit tests catch concrete bugs in specific scenarios and verify exact outputs.
- Property-based tests verify universal correctness across a wide range of generated inputs.

### Unit Tests (specific examples and edge cases)

Use any standard JS test runner (e.g., **Vitest** or **Jest**).

Concrete examples to cover:

- Hero section exists and is the first `<section>` in the DOM
- Hero section contains text "Prabal Herbal"
- Hero section contains exactly 2 CTA buttons/links
- Nav contains links to `#home`, `#products`, `#about`, `#gallery`, `#contact`
- Nav contains brand wordmark text
- PRODUCTS array contains exactly 7 items: 5 home hygiene + 2 automotive
- PRODUCTS array contains all 7 named products by `id`
- About section contains "Asha Industries" and "Bhopal"
- About section contains at least 3 differentiator items
- About section text includes "Glycerine" and "Pine Oil"
- Gallery renders up to 30 `<img>` elements
- Escape key closes lightbox (simulate keydown event)
- Form select defaults to `"bulk-order"`
- Form contains all 6 specified fields
- Full Name, Phone, Inquiry Type have `required` attribute
- Contact section contains `tel:+916263245502` href
- Contact section contains `mailto:prabalherbal16@gmail.com` href
- Contact section contains a maps iframe or link
- Footer contains copyright text with current year
- Footer contains links to `#products`, `#about`, `#contact`

### Property-Based Tests

Use **fast-check** (JavaScript property-based testing library).
Configure each test to run a minimum of **100 iterations**.

Each test is tagged with a comment in the format:
`// Feature: prabal-herbal-landing-page, Property N: <property_text>`

**Property 1 — Nav scroll class toggle**
```js
// Feature: prabal-herbal-landing-page, Property 1: Nav background toggles on scroll
fc.assert(fc.property(
  fc.integer({ min: 0, max: 5000 }),  // scrollY
  fc.integer({ min: 100, max: 800 }), // heroHeight
  (scrollY, heroHeight) => {
    const hasScrolled = applyNavScrollState(scrollY, heroHeight);
    return scrollY > heroHeight ? hasScrolled === true : hasScrolled === false;
  }
), { numRuns: 100 });
```

**Property 2 — Every product card has required elements**
```js
// Feature: prabal-herbal-landing-page, Property 2: Every product card contains required display elements
fc.assert(fc.property(
  fc.constantFrom(...PRODUCTS),
  (product) => {
    const card = renderProductCard(product);
    const hasName = card.querySelector('.card-title')?.textContent === product.name;
    const hasVisual = product.image
      ? card.querySelector('img')?.src.includes(product.image)
      : card.querySelector('svg') !== null;
    const featureCount = card.querySelectorAll('.card-features li').length;
    return hasName && hasVisual && featureCount >= 3;
  }
), { numRuns: 100 });
```

**Property 3 — Product image/icon assignment matches category**
```js
// Feature: prabal-herbal-landing-page, Property 3: Product image/icon assignment matches category
fc.assert(fc.property(
  fc.constantFrom(...PRODUCTS),
  (product) => {
    if (product.category === 'home-hygiene') {
      return product.image !== null && !product.icon;
    } else {
      return product.image === null && typeof product.icon === 'string' && product.icon.length > 0;
    }
  }
), { numRuns: 100 });
```

**Property 4 — Every differentiator has icon and label**
```js
// Feature: prabal-herbal-landing-page, Property 4: Every differentiator item contains an icon and a label
fc.assert(fc.property(
  fc.constantFrom(...DIFFERENTIATORS),
  (diff) => {
    const el = renderDifferentiator(diff);
    return el.querySelector('svg, img') !== null &&
           el.querySelector('.diff-label')?.textContent.trim().length > 0;
  }
), { numRuns: 100 });
```

**Property 5 — Lightbox opens at correct index**
```js
// Feature: prabal-herbal-landing-page, Property 5: Lightbox opens at the correct index
fc.assert(fc.property(
  fc.integer({ min: 0, max: 29 }),
  (index) => {
    openLightbox(index);
    return galleryState.isOpen === true && galleryState.currentIndex === index;
  }
), { numRuns: 100 });
```

**Property 6 — Lightbox navigation wraps correctly**
```js
// Feature: prabal-herbal-landing-page, Property 6: Lightbox navigation wraps correctly
fc.assert(fc.property(
  fc.integer({ min: 0, max: 29 }),
  fc.integer({ min: 1, max: 30 }),
  (index, total) => {
    const nextIndex = navigateLightbox('next', index, total);
    const prevIndex = navigateLightbox('prev', index, total);
    return nextIndex === (index + 1) % total &&
           prevIndex === (index - 1 + total) % total;
  }
), { numRuns: 100 });
```

**Property 7 — Valid form submission produces confirmation**
```js
// Feature: prabal-herbal-landing-page, Property 7: Valid form submission produces confirmation
fc.assert(fc.property(
  fc.string({ minLength: 1 }),                          // fullName
  fc.stringMatching(/^\d{10}$/),                        // phone
  fc.constantFrom('bulk-order', 'dealership'),          // inquiryType
  (fullName, phone, inquiryType) => {
    const result = validateForm({ fullName, phone, inquiryType, email: '', city: '', message: '' });
    return result.valid === true && result.errors.length === 0;
  }
), { numRuns: 100 });
```

**Property 8 — Missing required fields produce errors**
```js
// Feature: prabal-herbal-landing-page, Property 8: Missing required fields produce inline errors
fc.assert(fc.property(
  fc.record({
    fullName: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
    phone: fc.oneof(fc.constant(''), fc.stringMatching(/^\d{10}$/)),
    inquiryType: fc.oneof(fc.constant(''), fc.constant('bulk-order'))
  }).filter(d => !d.fullName || !d.phone || !d.inquiryType),
  (data) => {
    const result = validateForm({ ...data, email: '', city: '', message: '' });
    return result.valid === false && result.errors.length > 0;
  }
), { numRuns: 100 });
```

**Property 9 — Format-invalid values produce errors**
```js
// Feature: prabal-herbal-landing-page, Property 9: Format-invalid field values produce inline errors
fc.assert(fc.property(
  fc.string().filter(s => s.length > 0 && !/^\d{10}$/.test(s)),
  (invalidPhone) => VALIDATORS.phone(invalidPhone) === false
), { numRuns: 100 });

fc.assert(fc.property(
  fc.string().filter(s => s.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)),
  (invalidEmail) => VALIDATORS.email(invalidEmail) === false
), { numRuns: 100 });
```

**Property 10 — Below-fold images use lazy loading**
```js
// Feature: prabal-herbal-landing-page, Property 10: Below-fold images use lazy loading
fc.assert(fc.property(
  fc.constantFrom(...PRODUCTS.filter(p => p.image)),
  (product) => {
    const card = renderProductCard(product);
    return card.querySelector('img')?.getAttribute('loading') === 'lazy';
  }
), { numRuns: 100 });
```

**Property 11 — Hamburger toggle is idempotent per call**
```js
// Feature: prabal-herbal-landing-page, Property 11: Hamburger menu toggle is idempotent per call
fc.assert(fc.property(
  fc.boolean(), // initial state: open or closed
  (initiallyOpen) => {
    const nav = createMockNav(initiallyOpen);
    toggleMobileMenu(nav);
    const afterOne = nav.classList.contains('nav-open');
    toggleMobileMenu(nav);
    const afterTwo = nav.classList.contains('nav-open');
    return afterOne === !initiallyOpen && afterTwo === initiallyOpen;
  }
), { numRuns: 100 });
```
