/**
 * SR Fashion — Theme
 * Applies saved theme (or system preference) before first paint via the
 * inline script in <head>; this file only wires up the toggle button.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'sr-fashion-theme';

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage unavailable — theme just won't persist */
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0d1321' : '#ede7da');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    toggle.setAttribute('aria-pressed', currentTheme() === 'dark' ? 'true' : 'false');
  });
})();
