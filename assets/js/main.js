/**
 * SR Fashion — Main
 * Site-wide progressive enhancements. Everything here is defensive:
 * if an element isn't on the page, the related code is skipped.
 */
(function () {
  'use strict';

  // ---- Page load veil ----
  window.addEventListener('load', function () {
    var veil = document.querySelector('.page-veil');
    if (veil) {
      requestAnimationFrame(function () {
        veil.classList.add('is-hidden');
        setTimeout(function () {
          veil.remove();
        }, 800);
      });
    }
  });

  // ---- Footer year ----
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });

  // ---- Scroll reveal + stitch divider draw ----
  document.addEventListener('DOMContentLoaded', function () {
    var revealTargets = document.querySelectorAll('.reveal, .stitch-divider');
    if (!('IntersectionObserver' in window) || revealTargets.length === 0) {
      revealTargets.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  });

  // ---- Sticky header shadow on scroll ----
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var lastState = false;
    window.addEventListener(
      'scroll',
      function () {
        var scrolled = window.scrollY > 12;
        if (scrolled !== lastState) {
          header.style.boxShadow = scrolled
            ? '0 10px 30px -20px rgba(0,0,0,0.4)'
            : 'none';
          lastState = scrolled;
        }
      },
      { passive: true }
    );
  });

  // ---- Service worker registration (PWA) ----
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('[SR Fashion] Service worker registration failed:', err);
      });
    });
  }
})();
