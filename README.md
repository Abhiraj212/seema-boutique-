# SR Fashion — Bespoke Tailoring Platform

A modern, mobile-first, production-ready front end for a tailoring business, built with plain HTML/CSS/JS, Firebase, and PWA support. No build step required.

## Project structure

```
sr-fashion/
├── index.html              Home
├── about.html               About
├── services.html            Services
├── catalog.html              Suit Catalog
├── contact.html               Contact
├── login.html                  Login (Firebase Auth)
├── register.html                Register (Firebase Auth)
├── offline.html                Offline fallback (used by the service worker)
├── manifest.json                 PWA manifest
├── sw.js                          Service worker (app-shell caching)
├── robots.txt                      Crawler directives
├── sitemap.xml                      Search engine sitemap
├── README.md
└── assets/
    ├── css/
    │   ├── variables.css     Design tokens (colors, type scale, spacing) + light/dark theme
    │   ├── base.css          Reset, typography, layout utilities
    │   ├── components.css    Nav, buttons, cards, forms, footer, WhatsApp button, hero
    │   └── animations.css    Keyframes, page-load veil, scroll reveal, skeleton shimmer
    ├── js/
    │   ├── firebase-config.js  Firebase init (add your project keys here)
    │   ├── auth.js              Login / Register form logic
    │   ├── theme.js              Dark/light mode toggle + persistence
    │   ├── nav.js                 Mobile menu behavior
    │   ├── main.js                 Page veil, scroll reveals, service worker registration
    │   ├── whatsapp.js              WhatsApp floating button config
    │   └── catalog.js               Catalog filter chips
    ├── icons/    App icons + favicon (generated placeholders — swap for your brand mark)
    └── images/   og-cover.jpg placeholder for social sharing previews
```

## Design system

- **Palette:** "Navy & Brass" dark theme, "Bone & Ink" light theme — inspired by worsted wool, brass buttons and basting thread.
- **Type:** Fraunces (display), Work Sans (body), JetBrains Mono (labels, prices, UI chrome).
- **Signature element:** an animated dashed "stitch line" divider that draws itself on scroll, echoing a tailor's basting stitch.
- Every color, spacing and type value lives in `assets/css/variables.css` as a CSS custom property — change the theme in one place.

## Firebase setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication → Email/Password**.
3. Enable **Firestore Database** (start in test mode for development, then lock down rules before launch).
4. Copy your web app config and paste it into `assets/js/firebase-config.js`, replacing the placeholder values.
5. Firebase is loaded via CDN `<script>` tags (compat SDK) at the bottom of every page — no bundler needed.

Until real keys are added, the site runs fully as a static site; the login/register forms will show a friendly message instead of throwing errors.

## PWA

- `manifest.json` + `sw.js` make the site installable and cache the app shell for fast repeat loads.
- The service worker uses network-first for page navigations (so content stays fresh) and cache-first for static assets, falling back to `offline.html` when there's no connection.
- Icons were generated as placeholders (`assets/icons/`) — replace with your real logo at the same sizes (192, 512, maskable 512, apple-touch 180) when ready.

## Theming

Dark/light mode is controlled by a `data-theme` attribute on `<html>`, set before first paint (inline script in `<head>`) to avoid a flash of the wrong theme, and toggled via the button in the header. Preference persists in `localStorage` and otherwise falls back to the visitor's OS setting.

## What's included vs. what's next

This build covers structure, design system, and static content for all seven pages, plus working Firebase Authentication wiring for Login/Register and a Firestore-ready contact form. Deliberately **not** yet built (by request): a user dashboard/account area, real Firestore-backed catalog data, payment/checkout, order tracking, and admin tooling — ready to layer on top of this foundation whenever you'd like.
