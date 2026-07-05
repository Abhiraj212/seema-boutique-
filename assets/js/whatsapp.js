/**
 * SR Fashion — WhatsApp floating button
 * Update WHATSAPP_NUMBER (with country code, no + or spaces) and the
 * default message here — every page picks it up automatically.
 */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '911234567890'; // TODO: replace with real number
  var DEFAULT_MESSAGE = 'Hello SR Fashion! I would like to enquire about a custom suit.';

  document.addEventListener('DOMContentLoaded', function () {
    var fab = document.querySelector('.whatsapp-fab');
    if (!fab) return;
    var url =
      'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(DEFAULT_MESSAGE);
    fab.setAttribute('href', url);
    fab.setAttribute('target', '_blank');
    fab.setAttribute('rel', 'noopener noreferrer');
  });
})();
