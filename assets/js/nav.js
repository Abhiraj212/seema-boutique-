/**
 * SR Fashion — Navigation
 * Mobile menu open/close, scrim, escape-to-close, and closing on link tap.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var burger = document.querySelector('.nav-burger');
    var links = document.querySelector('.nav-links');
    var scrim = document.querySelector('.nav-scrim');
    if (!burger || !links) return;

    function openMenu() {
      burger.setAttribute('aria-expanded', 'true');
      links.setAttribute('data-open', 'true');
      if (scrim) scrim.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      burger.setAttribute('aria-expanded', 'false');
      links.setAttribute('data-open', 'false');
      if (scrim) scrim.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    if (scrim) scrim.addEventListener('click', closeMenu);

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Mark current page link for styling + a11y
    var current = window.location.pathname.split('/').pop() || 'index.html';
    links.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === current) {
        link.setAttribute('aria-current', 'page');
      }
    });
  });
})();
