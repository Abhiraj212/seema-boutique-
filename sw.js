/**
 * SR Fashion — Service Worker
 * Caches the app shell (markup, styles, scripts, icons) so repeat visits
 * are fast and the site degrades gracefully offline.
 * Bump CACHE_NAME whenever shell assets change to bust old caches.
 */

const CACHE_NAME = 'sr-fashion-shell-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/catalog.html',
  '/contact.html',
  '/login.html',
  '/register.html',
  '/offline.html',
  '/manifest.json',
  '/assets/css/variables.css',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/css/animations.css',
  '/assets/js/firebase-config.js',
  '/assets/js/theme.js',
  '/assets/js/nav.js',
  '/assets/js/whatsapp.js',
  '/assets/js/main.js',
  '/assets/js/catalog.js',
  '/assets/js/auth.js',
  '/assets/icons/favicon.svg',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Network-first for navigations (fresh content when online, cached shell
// or offline page when not); cache-first for static assets.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const isNavigation = request.mode === 'navigate';

  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
