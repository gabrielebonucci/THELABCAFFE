/* =========================================================
   THE LAB CAFFÈ — animations.js
   IntersectionObserver per animazioni scroll-triggered
   ========================================================= */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.reveal');
  const starGroups = document.querySelectorAll('.stars-anim');

  // Fallback: se reduced-motion o niente IntersectionObserver, mostra tutto
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    starGroups.forEach(function (el) { el.classList.add('lit'); });
    return;
  }

  /* ---------- Reveal generico (threshold 0.15) ---------- */
  const revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Stelle: si accendono una alla volta ---------- */
  const starObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('lit');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  starGroups.forEach(function (el) { starObserver.observe(el); });

})();
