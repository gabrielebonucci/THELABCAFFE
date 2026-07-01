/* =========================================================
   THE LAB CAFFÈ — menu.js
   Sistema tab interattivo del menu
   ========================================================= */

(function () {
  'use strict';

  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  if (!tabs.length || !panels.length) return;

  function activate(name) {
    tabs.forEach(function (tab) {
      const isActive = tab.dataset.tab === name;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      const isActive = panel.dataset.panel === name;
      // toggle .active per far ripartire l'animazione fadeInPanel
      if (isActive) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.dataset.tab);

      // Su mobile, centra la tab attiva nella barra scrollabile
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

})();
