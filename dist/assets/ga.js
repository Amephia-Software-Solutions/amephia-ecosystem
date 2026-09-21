/**
 * Google Analytics 4 — cargador compartido para las páginas HTML estáticas
 * (brochure, 404, pitch, manuales). El SPA usa src/lib/analytics.ts.
 *
 * Fuente única del Measurement ID: si cambia, se cambia aquí y en
 * index.html / .env (VITE_GA_MEASUREMENT_ID).
 */
(function () {
  var GA_MEASUREMENT_ID = 'G-0WTCDH7SYM';

  if (window.__amephiaGaLoaded) return;
  window.__amephiaGaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  (document.head || document.documentElement).appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });

  /**
   * Helper de eventos para las páginas estáticas.
   * Seguro de llamar aunque gtag aún no haya cargado: dataLayer hace de buffer.
   */
  window.ameTrack = function (eventName, params) {
    if (!eventName) return;
    gtag('event', eventName, params || {});
  };
})();
