/* =========================================================
   THE LAB CAFFÈ — main.js
   Logica generale: navbar, scroll progress, menu mobile
   ========================================================= */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const progress = document.getElementById('scrollProgress');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const overlayClose = document.getElementById('overlayClose');
  const ctaBar = document.getElementById('mobileCtaBar');

  /* ---------- Navbar background + scroll progress ---------- */
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;

    // Navbar diventa scura dopo 80px
    if (navbar) navbar.classList.toggle('scrolled', y > 80);

    // Barra di progresso
    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }

    // Barra CTA mobile: compare dopo aver superato la hero
    if (ctaBar) ctaBar.classList.toggle('visible', y > window.innerHeight * 0.75);
  }

  // rAF throttle
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Menu mobile (overlay fullscreen) ---------- */
  function openMenu() {
    if (!overlay) return;
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (overlayClose) overlayClose.addEventListener('click', closeMenu);

  // Chiudi cliccando un link o premendo ESC
  if (overlay) {
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Mappa: attiva l'interazione solo dopo un tap (no scroll-hijack) ---------- */
  const mapWrap = document.querySelector('.map-wrap');
  const mapGuard = document.querySelector('.map-guard');
  if (mapWrap && mapGuard) {
    mapGuard.addEventListener('click', function () {
      mapWrap.classList.add('active');
    });
  }

  /* ---------- Scrollspy: evidenzia il link della sezione attiva ---------- */
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    const map = {};
    navLinks.forEach(function (link) {
      const id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        const sec = document.querySelector(id);
        if (sec) map[sec.id] = link;
      }
    });

    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          map[entry.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    Object.keys(map).forEach(function (id) {
      spy.observe(document.getElementById(id));
    });
  }

})();
