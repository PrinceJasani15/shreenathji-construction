# PRD – Shreenathji Construction Landing Page

## 1. Project Overview

| Item | Detail |
|---|---|
| Company Name | **Shreenathji Construction** |
| Owner / Contact Person | **Rajeshbhai Jasani** |
| Phone | **+91 99091 10018** |
| Email | info@shreenathjiconstruction.com *(placeholder – replace with real email)* |
| Address | *(placeholder – replace with real address, Gujarat, India)* |
| Services | Residential, Industrial, Villa, Renovation |
| Tech Stack | **HTML5, CSS3, Vanilla JavaScript only** (no frameworks, no build tools) |
| Reference | The attached design image (BUILDCORE Construction landing page) – replicate its layout, style and section order, replacing all branding and content with Shreenathji Construction details |
| Build Tool | OpenCode |

### Goal
Create a modern, professional, fully responsive single-page website that builds trust, showcases services and projects, and generates leads (calls, WhatsApp messages, quote requests) for Shreenathji Construction.

### Target Audience
- Families planning to build a home or villa
- Business owners needing industrial sheds / factories
- Homeowners looking for renovation work

---

## 2. Design System (taken from the reference image)

### Colors
| Token | Value | Usage |
|---|---|---|
| `--primary-dark` | `#0B1623` | Hero overlay, footer, dark cards |
| `--accent` | `#F5A623` | Buttons, highlights, icons, underline accents |
| `--accent-hover` | `#E0951A` | Button hover |
| `--white` | `#FFFFFF` | Backgrounds, text on dark |
| `--light-bg` | `#F7F8FA` | Services strip background |
| `--text-dark` | `#1A1A1A` | Headings on light bg |
| `--text-muted` | `#5A6472` | Paragraphs |

### Typography
- Font: **Rubik** (fallback: Inter, Poppins, sans-serif) via Google Fonts
- Hero heading: 56–64px desktop / 36px mobile, weight 700, uppercase
- Section headings: 32–40px, weight 700
- Body: 16px, line-height 1.6
- Small labels ("ABOUT US", "OUR PROJECTS"): 13–14px, uppercase, letter-spacing 1px, with a short amber line beside them

### UI Elements
- Buttons: rectangular, 4px radius, amber filled (primary) and outlined white (secondary), with arrow icon (→)
- Cards: rounded 8px corners, soft shadow, image zoom on hover
- Icons: line-style icons with amber accent (inline SVG or Font Awesome / Lucide)
- Container max-width: 1200px, side padding 20px

---

## 3. Page Structure & Sections

### 3.1 Header / Navbar (sticky)
- **Left:** Logo (icon of amber building bars + text "SHREENATHJI" with sub-text "CONSTRUCTION")
- **Center links:** Home, About Us, Services, Projects, Why Us, Contact
  - Active link has amber underline
  - Smooth scroll to section on click
- **Right:** "GET A QUOTE" amber button with arrow → opens the Quote Modal
- Becomes solid white with shadow after scrolling 50px
- **Mobile (<992px):** hamburger menu, slide-in drawer, close on link click

### 3.2 Hero Section
- Full-width background image (modern building at dusk with crane) with a dark gradient overlay from left
- Heading (3 lines):
  - `BUILDING` (white)
  - `TOMORROW` (white)
  - `TOGETHER` (**amber**)
- Short amber divider line
- Sub-text: *"We deliver quality construction solutions with integrity, precision, and a commitment to excellence."*
- Two CTA buttons:
  - **OUR SERVICES →** (amber filled, scrolls to Services)
  - **VIEW PROJECTS →** (outlined, scrolls to Projects)
- Fade-in / slide-up animation on load
- Min height: 90vh desktop, 80vh mobile

### 3.3 Services Strip (4 columns)
Light background, 4 equal columns separated by thin vertical dividers (stack to 2×2 on tablet, 1 column on mobile).

| Icon | Title | Description |
|---|---|---|
| House | **Residential** | Building homes that inspire living. |
| Luxury house | **Villa** | Premium villas designed for luxury and comfort. |
| Factory | **Industrial** | Delivering strength and durability. |
| Tools / paint roller | **Renovation** | Giving new life to your existing spaces. |

- Hover: icon lifts slightly, title turns amber
- Each item scrolls to the Services section / opens quote modal

### 3.4 About Us Section
- Two-column layout (text left, image right)
- Label: `ABOUT US` with amber line
- Heading: **Building with Quality & Integrity**
- Paragraph: *"With years of experience, Shreenathji Construction is dedicated to delivering projects on time, within budget, and beyond expectations."*
- Checklist with amber check-circle icons:
  - Skilled Professionals
  - High Quality Materials
  - On-time Project Delivery
- Optional: stats row (Projects Completed, Years of Experience, Happy Clients) with count-up animation on scroll – *use placeholder numbers, owner will confirm*
- Image: two workers in yellow safety vests and helmets looking at a construction site, rounded corners

### 3.5 Our Projects Section
- Label: `OUR PROJECTS` with amber line; right side link "VIEW ALL PROJECTS →"
- 4-card grid (2×2 on tablet, 1 column on mobile)
- Each card: image with dark gradient at bottom and title text overlay

| Card | Title |
|---|---|
| 1 | Modern Residence |
| 2 | Luxury Villa |
| 3 | Industrial Facility |
| 4 | Renovation Project |

- Hover: image zoom + amber bottom border
- Click: opens lightbox with larger image

### 3.6 Quote / Contact Section (added for lead generation)
- Dark background section above the footer
- Left: heading "Let's Build Something Great Together", contact details (Rajeshbhai Jasani, phone, email, address)
- Right: enquiry form
  - Fields: Full Name*, Phone Number*, Service Type* (dropdown: Residential / Villa / Industrial / Renovation), Message
  - Client-side JS validation (name required, phone 10-digit Indian number, service required)
  - On submit: show success message and open WhatsApp with pre-filled message to +91 99091 10018 *(no backend required)*

### 3.7 Footer (dark navy)
4 columns + bottom bar:
1. **Brand:** Logo, short line *"Building structures that stand the test of time with quality, safety, and trust."*, social icons (Facebook, Instagram, LinkedIn, YouTube)
2. **Quick Links:** About Us, Services, Projects, Why Us, Contact
3. **Services:** Residential Construction, Villa Construction, Industrial Construction, Renovation
4. **Contact Us:** Phone +91 99091 10018, email, address
5. **CTA box:** headset icon + "Let's Build Something Great Together" + amber **CONTACT US →** button
- Bottom bar: `© 2026 Shreenathji Construction. All rights reserved.`

### 3.8 Floating Elements
- **WhatsApp floating button** (bottom-right) → `https://wa.me/919909110018?text=Hello, I am interested in your construction services`
- **Call button** (bottom-left, mobile only) → `tel:+919909110018`
- **Back-to-top** button appearing after 400px scroll

---

## 4. Functional Requirements

| ID | Requirement |
|---|---|
| F1 | Smooth scrolling navigation with active-link highlighting on scroll |
| F2 | Sticky header that changes style on scroll |
| F3 | Mobile hamburger menu with open/close toggle |
| F4 | "Get a Quote" modal with form validation |
| F5 | Contact form sends enquiry through WhatsApp link (no backend) |
| F6 | Project image lightbox |
| F7 | Scroll-reveal animations (IntersectionObserver) |
| F8 | Count-up animation for stats |
| F9 | Click-to-call and click-to-WhatsApp links |
| F10 | Lazy loading for all images below the fold |

## 5. Non-Functional Requirements
- Fully responsive: 360px, 768px, 1024px, 1440px breakpoints (mobile-first CSS)
- Lighthouse score target: Performance 90+, Accessibility 90+, SEO 95+
- Semantic HTML5 (`header, nav, main, section, footer`), alt text on all images, proper heading hierarchy (single H1)
- Cross-browser: latest Chrome, Edge, Firefox, Safari
- CSS custom properties for the theme; no CSS or JS frameworks
- Clean, commented, well-organized code

## 6. SEO & Meta
- `<title>`: Shreenathji Construction | Residential, Villa, Industrial & Renovation Services
- Meta description: *Shreenathji Construction – trusted builders for residential homes, villas, industrial buildings and renovation. Call Rajeshbhai Jasani at +91 99091 10018.*
- Open Graph tags, favicon, theme-color `#F5A623`
- JSON-LD `LocalBusiness` schema with name, telephone, address

## 7. Folder Structure

```
shreenathji-construction/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── logo.svg
│   ├── hero.jpg
│   ├── about.jpg
│   ├── project-1.jpg
│   ├── project-2.jpg
│   ├── project-3.jpg
│   └── project-4.jpg
└── README.md
```

## 8. Assets
- Use free stock images (Unsplash/Pexels) or placeholders matching the reference image mood: modern concrete/glass buildings at dusk, cranes, workers in safety gear.
- Owner will later replace them with real project photos – keep image paths simple and documented in README.
- Logo: simple amber "building bars" icon + "SHREENATHJI CONSTRUCTION" text (SVG).

## 9. Placeholders to Confirm with Owner
- Business email and full address
- Real project photos and project names
- Years of experience / projects completed / happy clients numbers
- Social media links
- Logo (if the company already has one)

## 10. Acceptance Criteria
1. Page visually matches the reference image layout, order and style with Shreenathji branding.
2. Services shown are exactly: Residential, Villa, Industrial, Renovation.
3. Rajeshbhai Jasani and +91 99091 10018 appear in contact section, footer, and call/WhatsApp buttons.
4. All links, buttons, modal, form validation and menu work on desktop and mobile.
5. No horizontal scroll at any screen width; no console errors.
6. Built using only HTML, CSS and JavaScript.

## 11. Prompt for OpenCode
> Read PRD.md and build the complete landing page in plain HTML, CSS and JavaScript following the folder structure and design system exactly. Match the attached reference image layout. Make it responsive, add all interactions listed, and create a README.md with run instructions.
