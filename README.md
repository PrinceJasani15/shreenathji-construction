# Shreenathji Construction — Landing Page

A modern, fully responsive single-page website for **Shreenathji Construction** built with plain **HTML5, CSS3 and vanilla JavaScript**. No frameworks, no build tools.

## Quick Start

No installation or build step is required.

1. Open the project folder.
2. Double-click `index.html`, or open it in any modern browser (Chrome, Edge, Firefox, Safari).

Optional: serve it locally for the best experience (some browsers restrict features on `file://`):

```powershell
# Using Python
python -m http.server 8080

# Then visit http://localhost:8080
```

## Project Structure

```
shreenathji-construction/
├── index.html          # Page markup (all sections)
├── css/
│   └── style.css       # Design system + responsive styles
├── js/
│   └── script.js       # All interactions (vanilla JS)
├── images/
│   ├── logo.png        # Gold logo (navbar, footer and favicon)
│   ├── hero.jpg        # Hero video poster / fallback image
│   ├── about.jpg       # About section image
│   ├── project-1.jpg   # Modern Residence
│   ├── project-2.jpg   # Luxury Villa
│   ├── project-3.jpg   # Industrial Facility
│   └── project-4.jpg   # Renovation Project
├── videos/
│   └── hero.mp4        # Hero background video (H.264 MP4)
└── README.md
```

## Sections

1. Sticky header with smooth-scroll navigation and mobile drawer
2. Hero — "Building Tomorrow Together" with background video and dual CTAs
3. Services strip — Residential, Villa, Industrial, Renovation
4. About Us with checklist and count-up stats
5. Our Projects with image lightbox
6. Why Us
7. Contact / Get a Quote form (sends enquiry via WhatsApp)
8. Footer with brand, links, services, contact and CTA box

## Features

- Sticky black header that gains a shadow on scroll
- Full-cover hero video with poster fallback (paused off-screen, respects reduced motion)
- Active-link highlighting while scrolling
- Mobile hamburger drawer (closes on link click)
- "Get a Quote" modal with client-side validation
- Contact form validation with WhatsApp handoff and "Send by Email" mailto fallback (no backend)
- Project image lightbox
- Mobile-first layout tested from 320px to 1440px with safe-area support
- Staggered scroll-reveal animations, scroll progress bar and animated counters
- Subtle hero, navbar, card and button motion with `prefers-reduced-motion` support
- Floating WhatsApp (all devices) and Call (mobile) buttons
- Back-to-top button after 400px scroll
- Lazy-loaded images below the fold
- All footer social icons currently link to the official Instagram profile

## Replacing Content

| What | Where |
|---|---|
| Business email / address | `index.html` (Contact section + footer + JSON-LD) |
| Project names / photos | `index.html` project cards + `images/project-*.jpg` |
| Stats numbers | `index.html` `data-count` attributes |
| Social links | See **Social Links** below |
| Hero / about images | Replace `images/hero.jpg` and `images/about.jpg` (keep filenames) |
| Logo | Replace `images/logo.png` (keep the filename) |
| Hero video | Add `videos/hero.mp4` (see **Logo & Hero Video** below) |

Images are free stock photos from Unsplash and Pexels. Replace them with real project photos of the same aspect ratio (hero ≈ 3:2, about 3:2, projects 4:3) to keep the layout intact.

## Logo & Hero Video

### Logo (`images/logo.png`)

1. Put the logo file at **`images/logo.png`** (PNG with a black background works best).
2. It is used in three places automatically: the navbar, the footer and the browser favicon.
3. Recommended artwork: a wide horizontal lockup, roughly **3:1** (for example 2172 × 724 px), with the icon on the left and the text on the right.
4. The CSS sizes it by height (`50px` navbar desktop, `42px` navbar mobile, `60px` footer) with `width: auto` and `object-fit: contain`, so it is never stretched. A high-resolution source stays sharp on all screens.

### Hero video (`videos/hero.mp4`)

1. Create a **`videos`** folder in the project root if it does not exist.
2. Put the video at **`videos/hero.mp4`** (H.264 MP4 is the safest format for all browsers).
3. Keep a matching still image at **`images/hero.jpg`** — it is the poster shown while the video loads and the fallback if the video is missing or cannot play.
4. The video is muted, loops, plays inline and autoplays. It automatically pauses when the hero scrolls out of view.
5. With **prefers-reduced-motion** enabled, the video is hidden and only the poster image is shown.

## Favicon

Favicon files are generated from the gold building icon in `images/logo.png` and referenced with absolute paths for Vercel:

- `favicon.ico` — project root, contains 16×16, 32×32 and 48×48 sizes
- `images/favicon-32x32.png` — 32×32 PNG
- `images/favicon-16x16.png` — 16×16 PNG
- `images/apple-touch-icon.png` — 180×180 Apple touch icon

## Social Links

All four social URLs are kept in a clearly marked comment block at the top of the `<footer>` in `index.html`:

```html
<!--
  Instagram : https://www.instagram.com/shreenathji_construction_/
  Facebook  : https://www.instagram.com/shreenathji_construction_/
  LinkedIn  : https://www.instagram.com/shreenathji_construction_/
  YouTube   : https://www.instagram.com/shreenathji_construction_/
-->
```

All four icons currently point to the official Instagram profile. Update the matching `href` attributes in the `.socials` list directly below that comment when other platform profiles become available. Links open in a new tab with `rel="noopener noreferrer"`.



## Browser Support

Latest Chrome, Edge, Firefox and Safari. The layout is tested at 320px, 360px, 390px, 414px, 768px, 1024px and 1440px widths.
