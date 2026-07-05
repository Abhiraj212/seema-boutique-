/**
 * SR Fashion — Catalog filtering
 * Filters the suit grid by data-category using the filter chips.
 * Currently filters static markup; swap loadCatalog() for a Firestore
 * query later without touching the filtering logic below.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var chips = document.querySelectorAll('.filter-chip');
    var cards = document.querySelectorAll('[data-category]');
    if (!chips.length || !cards.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', 'false');
        });
        chip.setAttribute('aria-pressed', 'true');

        var filter = chip.getAttribute('data-filter');
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  });

  // Placeholder for future Firestore-backed catalog loading.
  // function loadCatalog() {
  //   return window.srDb.collection('suits').get().then(function (snapshot) {
  //     return snapshot.docs.map(function (doc) { return doc.data(); });
  //   });
  // }
})();
