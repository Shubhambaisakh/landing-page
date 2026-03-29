# Requirements Document

## Introduction

A modern, premium landing page for Prabal Herbal (by Asha Industries) — a Bhopal-based manufacturer of home hygiene and automotive cleaning products. The page showcases all products, communicates the brand story and key differentiators, and drives bulk order inquiries and dealership contact. The site must be visually rich, mobile-responsive, and optimized for conversion.

## Glossary

- **Landing_Page**: The single-page website representing the Prabal Herbal brand
- **Hero_Section**: The full-width top section of the Landing_Page with brand headline and CTA
- **Product_Card**: A visual component displaying a single product's image, name, and key features
- **Product_Grid**: The section containing all Product_Cards organized by category
- **Inquiry_Form**: The contact form used for bulk order and dealership inquiries
- **Brand_Story_Section**: The section communicating company background, mission, and differentiators
- **Navigation_Bar**: The sticky top navigation component with links to page sections
- **Image_Gallery**: The section displaying up to 30 brand and product images
- **CTA**: Call-to-action button or link prompting user engagement
- **Visitor**: Any person accessing the Landing_Page via a web browser

## Requirements

---

### Requirement 1: Hero Section

**User Story:** As a Visitor, I want to see a compelling hero section when I land on the page, so that I immediately understand the brand and am motivated to explore further.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a Hero_Section as the first visible section on load.
2. THE Hero_Section SHALL display the brand name "Prabal Herbal" and tagline communicating the brand mission.
3. THE Hero_Section SHALL display a full-width background using one of the 30 available brand images.
4. THE Hero_Section SHALL include at least two CTAs: one for exploring products and one for contacting for bulk orders.
5. WHEN a Visitor clicks a CTA in the Hero_Section, THE Landing_Page SHALL smoothly scroll to the corresponding section.

---

### Requirement 2: Navigation Bar

**User Story:** As a Visitor, I want a clear navigation bar, so that I can jump to any section of the page quickly.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL remain fixed at the top of the viewport while the Visitor scrolls.
2. THE Navigation_Bar SHALL contain links to: Home, Products, About, Gallery, and Contact sections.
3. WHEN a Visitor clicks a Navigation_Bar link, THE Landing_Page SHALL smoothly scroll to the target section within 600ms.
4. WHEN the Visitor scrolls past the Hero_Section, THE Navigation_Bar SHALL apply a solid background to remain legible against page content.
5. THE Navigation_Bar SHALL display the Prabal Herbal brand logo or wordmark.

---

### Requirement 3: Product Showcase

**User Story:** As a Visitor, I want to browse all products organized by category, so that I can quickly find what I need and understand each product's benefits.

#### Acceptance Criteria

1. THE Product_Grid SHALL display all 7 products grouped into two categories: "Home Hygiene Essentials" and "Automotive Care".
2. EACH Product_Card SHALL display the product name, a product image, and at least 3 key feature highlights.
3. THE Product_Grid SHALL be responsive: displaying 3 columns on desktop, 2 columns on tablet, and 1 column on mobile.
4. WHEN a Visitor hovers over a Product_Card on desktop, THE Product_Card SHALL display a visual highlight effect.
5. THE Product_Grid SHALL include the following Home Hygiene products: Herbal Phenyl, Toilet Cleaner, Dishwash Liquid, Hand Soap Gel, and Glass Cleaner.
6. THE Product_Grid SHALL include the following Automotive Care products: Car & Bike Wash and Car Polish & Wax.
7. Home Hygiene Product_Cards SHALL use the available brand images where applicable.
8. Automotive Care Product_Cards SHALL use minimal generic visuals or illustrated icons in the absence of dedicated automotive images.

---

### Requirement 4: Brand Story and Differentiators

**User Story:** As a Visitor, I want to learn about the brand's background and why I should choose Prabal Herbal, so that I can trust the products and make an informed decision.

#### Acceptance Criteria

1. THE Brand_Story_Section SHALL display the company mission: providing high-performance cleaning products that are safe, effective, and affordable.
2. THE Brand_Story_Section SHALL highlight at least 3 key differentiators: Quality Ingredients, Expert Formulation, and Direct from Manufacturer pricing.
3. THE Brand_Story_Section SHALL mention the use of purified water, tested emulsifiers, Glycerine, and Pine Oil as quality markers.
4. THE Brand_Story_Section SHALL include the company name "Asha Industries" and location "Bhopal, M.P." to establish credibility.
5. THE Brand_Story_Section SHALL display each differentiator with a distinct icon and a short descriptive label.

---

### Requirement 5: Image Gallery

**User Story:** As a Visitor, I want to view brand and product images in a gallery, so that I can visually assess the product quality and brand presentation.

#### Acceptance Criteria

1. THE Image_Gallery SHALL support display of up to 30 brand images, all of which are focused on floor cleaning, house cleaning, and general hygiene visuals.
2. THE Image_Gallery SHALL arrange images in a responsive grid: 4 columns on desktop, 2 columns on tablet, 1 column on mobile.
3. WHEN a Visitor clicks an image in the Image_Gallery, THE Landing_Page SHALL display the image in a full-screen lightbox overlay.
4. WHEN the lightbox is open, THE Landing_Page SHALL allow the Visitor to navigate to the next or previous image using arrow controls.
5. WHEN the Visitor presses the Escape key while the lightbox is open, THE Landing_Page SHALL close the lightbox.
6. THE Image_Gallery SHALL prioritize home cleaning and hygiene-focused visuals in its layout and ordering.

---

### Requirement 6: Bulk Order and Dealership Inquiry Form

**User Story:** As a business buyer or potential dealer, I want to submit an inquiry directly from the page, so that I can request pricing or dealership information without leaving the site.

#### Acceptance Criteria

1. THE Inquiry_Form SHALL include the following fields: Full Name, Phone Number, Email Address, City, Inquiry Type (Bulk Order / Dealership), and Message.
2. THE Inquiry_Form SHALL mark Full Name, Phone Number, and Inquiry Type as required fields.
3. WHEN a Visitor submits the Inquiry_Form with all required fields filled, THE Landing_Page SHALL display a confirmation message indicating the inquiry was received.
4. WHEN a Visitor submits the Inquiry_Form with one or more required fields empty, THE Inquiry_Form SHALL display an inline validation error for each missing required field.
5. WHEN a Visitor enters a Phone Number that does not match a 10-digit numeric format, THE Inquiry_Form SHALL display an inline error message.
6. WHEN a Visitor enters an Email Address that does not match a valid email format, THE Inquiry_Form SHALL display an inline error message.
7. THE Inquiry_Form SHALL pre-select "Bulk Order" as the default Inquiry Type.

---

### Requirement 7: Contact Information Section

**User Story:** As a Visitor, I want to see the company's contact details clearly, so that I can reach out directly by phone, email, or visit.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a dedicated contact section containing: phone number (+91 62632-45502), email (prabalherbal16@gmail.com), and address (63, Katara Hills Road, Bhopal M.P. 462043).
2. WHEN a Visitor clicks the phone number, THE Landing_Page SHALL initiate a phone call using the device's native dialer via a `tel:` link.
3. WHEN a Visitor clicks the email address, THE Landing_Page SHALL open the device's default email client via a `mailto:` link.
4. THE Landing_Page SHALL embed a Google Maps iframe or link showing the company address location.

---

### Requirement 8: Responsive Design and Performance

**User Story:** As a Visitor on any device, I want the page to load quickly and display correctly, so that I have a smooth browsing experience regardless of screen size.

#### Acceptance Criteria

1. THE Landing_Page SHALL be fully responsive across viewport widths from 320px to 2560px.
2. THE Landing_Page SHALL achieve a Lighthouse performance score of 80 or above on mobile.
3. THE Landing_Page SHALL use lazy loading for all images below the fold.
4. THE Landing_Page SHALL display all text content in a legible font size of at least 14px on mobile viewports.
5. WHEN the Landing_Page is viewed on a mobile device, THE Navigation_Bar SHALL collapse into a hamburger menu.
6. WHEN a Visitor taps the hamburger menu icon, THE Navigation_Bar SHALL expand to show all navigation links as a full-width dropdown.

---

### Requirement 9: Footer

**User Story:** As a Visitor, I want a footer with essential links and brand info, so that I can find key information at the bottom of the page.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a footer containing: brand name, tagline, contact details, and copyright notice.
2. THE Landing_Page SHALL display the copyright notice as "© [current year] Asha Industries. All rights reserved."
3. THE Footer SHALL include quick links to the Products, About, and Contact sections.
