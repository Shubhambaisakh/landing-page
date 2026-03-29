import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { PRODUCTS } from '../main.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

let dom;
let document;

beforeAll(() => {
  const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
  dom = new JSDOM(html);
  document = dom.window.document;
});

// ── Hero Section ──────────────────────────────────────────────

describe('Hero section', () => {
  it('is the first <section> in the DOM', () => {
    const sections = document.querySelectorAll('section');
    expect(sections[0].id).toBe('home');
  });

  it('contains text "Prabal Herbal"', () => {
    const hero = document.getElementById('home');
    expect(hero.textContent).toContain('Prabal Herbal');
  });

  it('contains exactly 2 CTA links (.hero-ctas a)', () => {
    const ctas = document.querySelectorAll('.hero-ctas a');
    expect(ctas).toHaveLength(2);
  });
});

// ── Navigation ────────────────────────────────────────────────

describe('Navigation', () => {
  it('contains links to #home, #products, #about, #gallery, #contact', () => {
    const nav = document.querySelector('nav');
    const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('#home');
    expect(hrefs).toContain('#products');
    expect(hrefs).toContain('#about');
    expect(hrefs).toContain('#gallery');
    expect(hrefs).toContain('#contact');
  });

  it('contains brand wordmark text "Prabal Herbal"', () => {
    const nav = document.querySelector('nav');
    expect(nav.textContent).toContain('Prabal Herbal');
  });
});

// ── Products data ─────────────────────────────────────────────

describe('PRODUCTS array', () => {
  it('has exactly 7 items', () => {
    expect(PRODUCTS).toHaveLength(7);
  });

  it('has 5 home-hygiene and 2 automotive items', () => {
    const homeHygiene = PRODUCTS.filter((p) => p.category === 'home-hygiene');
    const automotive = PRODUCTS.filter((p) => p.category === 'automotive');
    expect(homeHygiene).toHaveLength(5);
    expect(automotive).toHaveLength(2);
  });

  it('contains all 7 expected product IDs', () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(ids).toContain('herbal-phenyl');
    expect(ids).toContain('toilet-cleaner');
    expect(ids).toContain('dishwash-liquid');
    expect(ids).toContain('hand-soap-gel');
    expect(ids).toContain('glass-cleaner');
    expect(ids).toContain('car-bike-wash');
    expect(ids).toContain('car-polish-wax');
  });
});

// ── About section ─────────────────────────────────────────────

describe('About section', () => {
  it('contains "Asha Industries" and "Bhopal"', () => {
    const about = document.getElementById('about');
    expect(about.textContent).toContain('Asha Industries');
    expect(about.textContent).toContain('Bhopal');
  });

  it('text includes "Glycerine" and "Pine Oil"', () => {
    const about = document.getElementById('about');
    expect(about.textContent).toContain('Glycerine');
    expect(about.textContent).toContain('Pine Oil');
  });
});

// ── Inquiry Form ──────────────────────────────────────────────

describe('Inquiry form', () => {
  it('has all 6 fields (fullName, phone, email, city, inquiryType, message)', () => {
    const form = document.getElementById('inquiry-form');
    expect(form.querySelector('[name="fullName"]')).not.toBeNull();
    expect(form.querySelector('[name="phone"]')).not.toBeNull();
    expect(form.querySelector('[name="email"]')).not.toBeNull();
    expect(form.querySelector('[name="city"]')).not.toBeNull();
    expect(form.querySelector('[name="inquiryType"]')).not.toBeNull();
    expect(form.querySelector('[name="message"]')).not.toBeNull();
  });

  it('fullName, phone, and inquiryType have required attribute', () => {
    const form = document.getElementById('inquiry-form');
    expect(form.querySelector('[name="fullName"]').required).toBe(true);
    expect(form.querySelector('[name="phone"]').required).toBe(true);
    expect(form.querySelector('[name="inquiryType"]').required).toBe(true);
  });

  it('inquiryType select defaults to "bulk-order"', () => {
    const select = document.querySelector('#inquiryType');
    expect(select.value).toBe('bulk-order');
  });
});

// ── Contact section ───────────────────────────────────────────

describe('Contact section', () => {
  it('has tel:+916263245502 href', () => {
    const contact = document.getElementById('contact');
    const tel = contact.querySelector('a[href="tel:+916263245502"]');
    expect(tel).not.toBeNull();
  });

  it('has mailto:prabalherbal16@gmail.com href', () => {
    const contact = document.getElementById('contact');
    const mail = contact.querySelector('a[href="mailto:prabalherbal16@gmail.com"]');
    expect(mail).not.toBeNull();
  });
});

// ── Footer ────────────────────────────────────────────────────

describe('Footer', () => {
  it('has links to #products, #about, #contact', () => {
    const footer = document.getElementById('footer');
    const hrefs = Array.from(footer.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('#products');
    expect(hrefs).toContain('#about');
    expect(hrefs).toContain('#contact');
  });
});
