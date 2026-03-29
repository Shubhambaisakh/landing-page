'use strict';

// ============================================================
// Task 2.2 — Scroll-based nav background toggle
// ============================================================

/**
 * Pure function: returns true if the nav should show the scrolled state.
 * @param {number} scrollY
 * @param {number} heroHeight
 * @returns {boolean}
 */
export function applyNavScrollState(scrollY, heroHeight) {
  return scrollY > heroHeight;
}

// Wire scroll event to toggle .scrolled on #navbar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const hero = document.getElementById('home');
  const heroHeight = hero ? hero.offsetHeight : 0;
  const isScrolled = applyNavScrollState(window.scrollY, heroHeight);
  navbar.classList.toggle('scrolled', isScrolled);
});

// ============================================================
// Task 2.4 — Smooth scroll for nav links and hero CTAs
// ============================================================

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
});

// ============================================================
// Task 2.5 — Hamburger menu toggle
// ============================================================

/**
 * Flips the .nav-open class on the nav element and syncs aria-expanded
 * on the hamburger button.
 * @param {HTMLElement} nav
 */
export function toggleMobileMenu(nav) {
  const isOpen = nav.classList.toggle('nav-open');
  const btn = nav.querySelector('.nav-hamburger');
  if (btn) {
    btn.setAttribute('aria-expanded', String(isOpen));
  }
}

// Wire hamburger button click
const hamburger = document.querySelector('#navbar .nav-hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) toggleMobileMenu(navbar);
  });
}

// ============================================================
// Task 4.1 — Product data and card renderer
// ============================================================

export const PRODUCTS = [
  {
    id: 'herbal-phenyl',
    name: 'Herbal Phenyl',
    category: 'home-hygiene',
    image: 'assets/specialcombo.jpeg',
    icon: null,
    features: ['Kills 99.9% Germs', 'Pine Oil formula', 'Long-lasting fragrance'],
  },
  {
    id: 'toilet-cleaner',
    name: 'Toilet Cleaner',
    category: 'home-hygiene',
    image: 'assets/toilet cleaner.jpeg',
    icon: null,
    features: ['Removes tough stains', 'Deep disinfection', 'Fresh floral scent'],
  },
  {
    id: 'dishwash-liquid',
    name: 'Combo Deal — Best Purchase',
    category: 'home-hygiene',
    image: 'assets/combodeal.jpeg',
    icon: null,
    features: ['Cuts through grease', 'Gentle on hands', 'Lemon-enriched formula'],
  },
  {
    id: 'hand-soap-gel',
    name: 'Dishwash Liquid',
    category: 'home-hygiene',
    image: 'assets/glass clearer.jpeg',
    icon: null,
    features: ['Herbal & Safe', 'pH balanced', 'Moisturising Glycerine formula'],
  },
  {
    id: 'glass-cleaner',
    name: '5L Floor Cleaner',
    category: 'home-hygiene',
    image: 'assets/images/5L floor cleaner.jpeg',
    icon: null,
    features: ['Streak-free finish', 'Fast evaporating', 'Safe on all glass surfaces'],
  },
  {
    id: 'car-bike-wash',
    name: 'Car & Bike Wash',
    category: 'automotive',
    image: 'assets/carrwasher.png',
    icon: null,
    features: ['High-foam formula', 'Safe on all paint types', 'Removes road grime easily'],
  },
  {
    id: 'car-polish-wax',
    name: 'Car Polish & Wax',
    category: 'automotive',
    image: 'assets/carwasher2.png',
    icon: null,
    features: ['Deep gloss shine', 'UV protection layer', 'Easy wipe application'],
  },
];

/** SVG icons for automotive products */
const AUTOMOTIVE_ICONS = {
  'car-wash': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- Car body -->
    <path d="M10 48 L16 32 Q18 26 26 26 L54 26 Q62 26 64 32 L70 48 Z" fill="currentColor" opacity="0.15" stroke="currentColor"/>
    <rect x="10" y="48" width="60" height="12" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor"/>
    <!-- Wheels -->
    <circle cx="24" cy="60" r="7" fill="white" stroke="currentColor" stroke-width="3"/>
    <circle cx="56" cy="60" r="7" fill="white" stroke="currentColor" stroke-width="3"/>
    <!-- Windows -->
    <path d="M28 26 L24 40 L56 40 L52 26 Z" fill="white" opacity="0.6" stroke="currentColor" stroke-width="2"/>
    <!-- Water drops -->
    <path d="M30 14 Q30 10 33 10 Q36 10 36 14 Q36 18 33 20 Q30 18 30 14 Z" fill="currentColor" opacity="0.5"/>
    <path d="M42 10 Q42 6 45 6 Q48 6 48 10 Q48 14 45 16 Q42 14 42 10 Z" fill="currentColor" opacity="0.5"/>
    <path d="M18 16 Q18 12 21 12 Q24 12 24 16 Q24 20 21 22 Q18 20 18 16 Z" fill="currentColor" opacity="0.5"/>
  </svg>`,
  'car-polish': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- Spray bottle body -->
    <rect x="30" y="28" width="22" height="36" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor"/>
    <!-- Bottle neck -->
    <rect x="34" y="20" width="10" height="10" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor"/>
    <!-- Trigger -->
    <path d="M30 36 L18 36 Q14 36 14 40 L14 46 L30 46" fill="currentColor" opacity="0.1" stroke="currentColor"/>
    <!-- Nozzle -->
    <line x1="18" y1="36" x2="10" y2="28"/>
    <!-- Spray mist -->
    <path d="M6 24 Q4 22 6 20" stroke="currentColor" opacity="0.6" stroke-width="2"/>
    <path d="M10 20 Q8 17 10 15" stroke="currentColor" opacity="0.6" stroke-width="2"/>
    <path d="M14 17 Q13 14 15 12" stroke="currentColor" opacity="0.6" stroke-width="2"/>
    <!-- Shine stars on car surface -->
    <path d="M56 20 L57 16 L58 20 L62 21 L58 22 L57 26 L56 22 L52 21 Z" fill="currentColor" opacity="0.5"/>
    <path d="M64 34 L65 31 L66 34 L69 35 L66 36 L65 39 L64 36 L61 35 Z" fill="currentColor" opacity="0.4"/>
  </svg>`,
};

/**
 * Creates a product card element for the given product.
 * @param {Object} product
 * @returns {HTMLElement}
 */
export function renderProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';

  // Card image area
  const imageDiv = document.createElement('div');
  imageDiv.className = 'card-image';

  if (product.image) {
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy';
    imageDiv.appendChild(img);
  } else {
    imageDiv.innerHTML = AUTOMOTIVE_ICONS[product.icon] || '';
  }

  // Card body
  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = product.name;

  const featureList = document.createElement('ul');
  featureList.className = 'card-features';
  product.features.forEach((feat) => {
    const li = document.createElement('li');
    li.textContent = feat;
    featureList.appendChild(li);
  });

  body.appendChild(title);
  body.appendChild(featureList);

  article.appendChild(imageDiv);
  article.appendChild(body);

  return article;
}

// ============================================================
// Task 4.5 — Render product grids
// ============================================================

/**
 * Filters PRODUCTS by category and appends rendered cards to the
 * #home-hygiene-grid and #automotive-grid elements.
 */
export function renderProductGrids() {
  const homeGrid = document.getElementById('home-hygiene-grid');
  const autoGrid = document.getElementById('automotive-grid');

  if (homeGrid) {
    PRODUCTS
      .filter((p) => p.category === 'home-hygiene')
      .forEach((p) => homeGrid.appendChild(renderProductCard(p)));
  }

  if (autoGrid) {
    PRODUCTS
      .filter((p) => p.category === 'automotive')
      .forEach((p) => autoGrid.appendChild(renderProductCard(p)));
  }
}

// ============================================================
// Task 6.2 — Differentiators data and renderer
// ============================================================

export const DIFFERENTIATORS = [
  {
    id: 'quality-ingredients',
    label: 'Quality Ingredients',
    description: 'Purified water, tested emulsifiers, Glycerine and Pine Oil for consistent, safe performance.',
    icon: 'leaf',
  },
  {
    id: 'expert-formulation',
    label: 'Expert Formulation',
    description: 'Scientifically balanced formulas that are tough on dirt yet gentle on surfaces and skin.',
    icon: 'flask',
  },
  {
    id: 'direct-manufacturer',
    label: 'Direct from Manufacturer',
    description: 'High-quality products at competitive industrial pricing — straight from our Bhopal facility.',
    icon: 'factory',
  },
];

/** SVG icons for differentiator cards */
const DIFF_ICONS = {
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 9-9 1 5-1 9-4 11"/>
    <path d="M4 13c3-1 6-1 8 2"/>
  </svg>`,
  flask: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 3h6"/>
    <path d="M10 3v6l-4 9a1 1 0 0 0 .9 1.5h10.2a1 1 0 0 0 .9-1.5L14 9V3"/>
    <path d="M8.5 15h7"/>
  </svg>`,
  factory: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2 20V10l6-4v4l6-4v4l6-4v14H2z"/>
    <path d="M6 20v-4h4v4"/>
    <path d="M14 20v-6h4v6"/>
  </svg>`,
};

/**
 * Creates a differentiator card element.
 * @param {Object} diff
 * @returns {HTMLElement}
 */
export function renderDifferentiator(diff) {
  const card = document.createElement('div');
  card.className = 'diff-card';

  card.innerHTML = DIFF_ICONS[diff.icon] || '';

  const content = document.createElement('div');
  content.className = 'diff-content';

  const label = document.createElement('span');
  label.className = 'diff-label';
  label.textContent = diff.label;

  const desc = document.createElement('p');
  desc.textContent = diff.description;

  content.appendChild(label);
  content.appendChild(desc);
  card.appendChild(content);

  return card;
}

/**
 * Selects #differentiators-grid and appends all rendered differentiator cards.
 * Called from DOMContentLoaded in task 12.1.
 */
export function renderDifferentiators() {
  const grid = document.getElementById('differentiators-grid');
  if (!grid) return;
  DIFFERENTIATORS.forEach((diff) => grid.appendChild(renderDifferentiator(diff)));
}

// ============================================================
// Task 7.2 — Gallery state, lightbox open/close, initGallery
// ============================================================

export const galleryState = {
  images: [],
  currentIndex: 0,
  isOpen: false,
};

/**
 * Opens the lightbox at the given index.
 * @param {number} index
 */
export function openLightbox(index) {
  if (galleryState.images.length === 0) return;
  galleryState.currentIndex = index;
  galleryState.isOpen = true;
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = lightbox.querySelector('.lightbox-img');
  if (img) {
    img.src = galleryState.images[index].src;
    img.alt = galleryState.images[index].alt;
  }
  lightbox.removeAttribute('hidden');
}

/**
 * Closes the lightbox.
 */
export function closeLightbox() {
  galleryState.isOpen = false;
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.setAttribute('hidden', '');
}

/**
 * Populates the gallery grid and wires up lightbox interactions.
 * @param {{ src: string, alt: string }[]} images
 */
export function initGallery(images) {
  galleryState.images = images;
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  images.forEach((imgData, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = imgData.src;
    img.alt = imgData.alt;
    img.loading = 'lazy';
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });

  const closeBtn = document.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
}

// ============================================================
// Task 7.4 — Lightbox navigation (prev/next + keyboard)
// ============================================================

/**
 * Pure function: returns the next index given a direction.
 * @param {'next'|'prev'} direction
 * @param {number} index
 * @param {number} total
 * @returns {number}
 */
export function navigateLightbox(direction, index, total) {
  if (direction === 'next') return (index + 1) % total;
  return (index - 1 + total) % total;
}

/** Updates the lightbox image to the current galleryState.currentIndex. */
function updateLightboxImage() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = lightbox.querySelector('.lightbox-img');
  if (img) {
    img.src = galleryState.images[galleryState.currentIndex].src;
    img.alt = galleryState.images[galleryState.currentIndex].alt;
  }
}

const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (!galleryState.isOpen || galleryState.images.length === 0) return;
    galleryState.currentIndex = navigateLightbox('prev', galleryState.currentIndex, galleryState.images.length);
    updateLightboxImage();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (!galleryState.isOpen || galleryState.images.length === 0) return;
    galleryState.currentIndex = navigateLightbox('next', galleryState.currentIndex, galleryState.images.length);
    updateLightboxImage();
  });
}

document.addEventListener('keydown', (e) => {
  if (!galleryState.isOpen) return;
  if (e.key === 'ArrowRight') {
    galleryState.currentIndex = navigateLightbox('next', galleryState.currentIndex, galleryState.images.length);
    updateLightboxImage();
  } else if (e.key === 'ArrowLeft') {
    galleryState.currentIndex = navigateLightbox('prev', galleryState.currentIndex, galleryState.images.length);
    updateLightboxImage();
  } else if (e.key === 'Escape') {
    closeLightbox();
  }
});

// ============================================================
// Task 8.2 — Form validators, validateForm, and initForm
// ============================================================

export const VALIDATORS = {
  phone: (v) => /^\d{10}$/.test(v),
  email: (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  required: (v) => v.trim().length > 0,
};

/**
 * Validates the inquiry form data.
 * @param {{ fullName: string, phone: string, email: string, city: string, inquiryType: string, message: string }} data
 * @returns {{ valid: boolean, errors: Array<{ field: string, message: string }> }}
 */
export function validateForm(data) {
  const errors = [];

  if (!VALIDATORS.required(data.fullName)) {
    errors.push({ field: 'fullName', message: 'Full name is required.' });
  }

  if (!VALIDATORS.required(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required.' });
  } else if (!VALIDATORS.phone(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number must be exactly 10 digits.' });
  }

  if (data.email && !VALIDATORS.email(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address.' });
  }

  if (data.city !== undefined && !VALIDATORS.required(data.city)) {
    errors.push({ field: 'city', message: 'City is required.' });
  }

  if (!VALIDATORS.required(data.inquiryType)) {
    errors.push({ field: 'inquiryType', message: 'Please select an inquiry type.' });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Wires up the inquiry form: validates on submit, shows confirmation or inline errors.
 * Called from DOMContentLoaded in task 12.1.
 */
export function initForm() {
  const form = document.querySelector('#inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.field-error').forEach((span) => {
      span.textContent = '';
    });
    form.querySelectorAll('.invalid').forEach((el) => {
      el.classList.remove('invalid');
    });

    const data = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      city: form.city.value,
      inquiryType: form.inquiryType.value,
      message: form.message.value,
    };

    const { valid, errors } = validateForm(data);

    if (valid) {
      form.hidden = true;
      const confirmation = form.closest('.contact-form-wrapper').querySelector('.confirmation');
      if (confirmation) confirmation.removeAttribute('hidden');
    } else {
      errors.forEach(({ field, message }) => {
        const errorSpan = document.getElementById(`${field}-error`);
        if (errorSpan) errorSpan.textContent = message;
        const input = form.querySelector(`[name="${field}"]`);
        if (input) input.classList.add('invalid');
      });
    }
  });
}

// ============================================================
// Task 11.1 — Footer year injection
// ============================================================

/**
 * Sets the current year in #footer-year.
 * Called from DOMContentLoaded in task 12.1.
 */
export function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ============================================================
// Task 12.1 — DOMContentLoaded initialiser (merged below)
// ============================================================

// ============================================================
// Enhancements — Stats counter, fade-in, scroll-to-top, badges
// ============================================================

/** Animate a number from 0 to target over ~1.2s */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 16);
}

/** Kick off all stat counters when the stats bar enters the viewport */
function initStatsCounter() {
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statsBar.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

/** Fade-in sections on scroll */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => observer.observe(el));
}

/** Scroll-to-top button visibility + click */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  btn.removeAttribute('hidden');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/** Product badge map */
const PRODUCT_BADGES = {
  'herbal-phenyl':  { text: 'Best Seller', cls: 'badge-bestseller' },
  'hand-soap-gel':  { text: 'Herbal',      cls: 'badge-herbal' },
  'glass-cleaner':  { text: 'New',         cls: 'badge-new' },
  'dishwash-liquid':{ text: 'Herbal',      cls: 'badge-herbal' },
};

/** Inject badges into already-rendered product cards */
function injectProductBadges() {
  document.querySelectorAll('.product-card').forEach((card) => {
    const titleEl = card.querySelector('.card-title');
    if (!titleEl) return;
    const name = titleEl.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    const match = Object.entries(PRODUCT_BADGES).find(([id]) =>
      name.includes(id.replace(/-/g, ' ').split(' ')[0])
    );
    if (match) {
      const [, badge] = match;
      const span = document.createElement('span');
      span.className = `card-badge ${badge.cls}`;
      span.textContent = badge.text;
      titleEl.before(span);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductGrids();
  renderDifferentiators();

  // Init gallery with actual brand images — shuffled to avoid same/similar images adjacent
  const galleryImages = [
    { src: 'assets/carrwasher.png',         alt: 'Prabal Herbal Car Washer' },
    { src: 'assets/specialcombo.jpeg',      alt: 'Prabal Herbal Special Combo' },
    { src: 'assets/image2.jpeg',            alt: 'Prabal Herbal Product' },
    { src: 'assets/toilet cleaner.jpeg',    alt: 'Prabal Herbal Toilet Cleaner' },
    { src: 'assets/image 6.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/combodeal.jpeg',         alt: 'Prabal Herbal Combo Deal' },
    { src: 'assets/image7.jpeg',            alt: 'Prabal Herbal Product' },
    { src: 'assets/dishwasher.jpeg',        alt: 'Prabal Herbal Dishwash Liquid' },
    { src: 'assets/image8.jpeg',            alt: 'Prabal Herbal Product' },
    { src: 'assets/glass clearer.jpeg',     alt: 'Prabal Herbal Floor Cleaner' },
    { src: 'assets/image10.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/image20.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/image 12.jpeg',          alt: 'Prabal Herbal Product' },
    { src: 'assets/one1.jpeg',              alt: 'Prabal Herbal Product' },
    { src: 'assets/imsge 4.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/image21.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/imsge5.jpeg',            alt: 'Prabal Herbal Product' },
    { src: 'assets/image 16.jpeg',          alt: 'Prabal Herbal Product' },
    { src: 'assets/imagww11.jpeg',          alt: 'Prabal Herbal Product' },
    { src: 'assets/imsge15.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/image 19.jpeg',          alt: 'Prabal Herbal Product' },
    { src: 'assets/carrwasher.png',         alt: 'Prabal Herbal Car Washer' },
    { src: 'assets/carwasher2.png',         alt: 'Prabal Herbal Car Cleaner' },
    { src: 'assets/image23.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/image14.jpeg',           alt: 'Prabal Herbal Product' },
    { src: 'assets/image22.jpeg',           alt: 'Prabal Herbal Product' },
  ];
  initGallery(galleryImages);

  initForm();
  setFooterYear();

  // Enhancements
  injectProductBadges();
  initStatsCounter();
  initFadeIn();
  initScrollTop();
});
