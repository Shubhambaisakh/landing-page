import { describe, it } from 'vitest';
import fc from 'fast-check';
import {
  applyNavScrollState,
  navigateLightbox,
  validateForm,
  VALIDATORS,
} from '../main.js';

// ── Property 1: applyNavScrollState ──────────────────────────
// Feature: prabal-herbal-landing-page, Property 1: Nav background toggles on scroll

describe('Property 1 — applyNavScrollState', () => {
  it('returns true iff scrollY > heroHeight', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }),
        fc.integer({ min: 100, max: 800 }),
        (scrollY, heroHeight) => {
          const result = applyNavScrollState(scrollY, heroHeight);
          return scrollY > heroHeight ? result === true : result === false;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 6: navigateLightbox wraps correctly ──────────────
// Feature: prabal-herbal-landing-page, Property 6: Lightbox navigation wraps correctly

describe('Property 6 — navigateLightbox', () => {
  it('wraps correctly for next and prev', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 29 }),
        fc.integer({ min: 1, max: 30 }),
        (index, total) => {
          const nextIndex = navigateLightbox('next', index, total);
          const prevIndex = navigateLightbox('prev', index, total);
          return (
            nextIndex === (index + 1) % total &&
            prevIndex === (index - 1 + total) % total
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 7: validateForm returns valid:true for valid inputs
// Feature: prabal-herbal-landing-page, Property 7: Valid form submission produces confirmation

describe('Property 7 — validateForm valid inputs', () => {
  it('returns valid:true when fullName non-empty, phone 10 digits, inquiryType non-empty', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        fc.stringMatching(/^\d{10}$/),
        fc.constantFrom('bulk-order', 'dealership'),
        (fullName, phone, inquiryType) => {
          const result = validateForm({
            fullName,
            phone,
            inquiryType,
            email: '',
            city: 'TestCity',
            message: '',
          });
          return result.valid === true && result.errors.length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 8: validateForm returns valid:false when required field empty
// Feature: prabal-herbal-landing-page, Property 8: Missing required fields produce inline errors

describe('Property 8 — validateForm missing required fields', () => {
  it('returns valid:false when any required field is empty', () => {
    fc.assert(
      fc.property(
        fc
          .record({
            fullName: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
            phone: fc.oneof(fc.constant(''), fc.stringMatching(/^\d{10}$/)),
            inquiryType: fc.oneof(fc.constant(''), fc.constant('bulk-order')),
          })
          .filter((d) => !d.fullName || !d.phone || !d.inquiryType),
        (data) => {
          const result = validateForm({
            ...data,
            email: '',
            city: '',
            message: '',
          });
          return result.valid === false && result.errors.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 9: VALIDATORS.phone / VALIDATORS.email reject invalid values
// Feature: prabal-herbal-landing-page, Property 9: Format-invalid field values produce inline errors

describe('Property 9 — VALIDATORS', () => {
  it('VALIDATORS.phone returns false for non-10-digit strings', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.length > 0 && !/^\d{10}$/.test(s)),
        (invalidPhone) => VALIDATORS.phone(invalidPhone) === false
      ),
      { numRuns: 100 }
    );
  });

  it('VALIDATORS.email returns false for malformed emails', () => {
    fc.assert(
      fc.property(
        fc
          .string()
          .filter((s) => s.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)),
        (invalidEmail) => VALIDATORS.email(invalidEmail) === false
      ),
      { numRuns: 100 }
    );
  });
});
