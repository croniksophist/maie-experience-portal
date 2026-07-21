// theme-init.js — LAYER 0.5 theme seed
// Must be loaded synchronously in <head>, BEFORE maie-tokens.css, so
// data-theme is on <html> before the browser applies [data-theme="light"]
// rules. Do not defer/async this file or move it after the stylesheet link.
//
// Sole writer of the "maie-theme" localStorage key on read; the nav
// toggle (see nav-component.html) is the sole writer on user interaction.
// Default is "dark" — matches every page's previous hardcoded fallback.
(function () {
  try {
    var stored = localStorage.getItem('maie-theme');
    document.documentElement.setAttribute('data-theme', stored === 'light' ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
