/* Jinkun Liao — site behaviour: language switch, mobile menu, section highlight, BibTeX. */
(function () {
  'use strict';

  var root = document.documentElement;
  var LANG_TAGS = { en: 'en', zh: 'zh-CN', ja: 'ja' };
  var STORAGE_KEY = 'preferredLanguage';

  /* ---------- Language ---------- */
  function setLang(lang, remember) {
    if (!LANG_TAGS[lang]) lang = 'en';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', LANG_TAGS[lang]);
    if (remember) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    }
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
  }

  setLang(root.getAttribute('data-lang') || 'en', false);

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-set-lang]');
    if (button) setLang(button.getAttribute('data-set-lang'), true);
  });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Highlight the section in view ---------- */
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = sectionLinks.map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  });

  function updateActiveLink() {
    var marker = window.innerHeight * 0.35;
    var current = -1;
    sections.forEach(function (section, i) {
      if (section && section.getBoundingClientRect().top <= marker) current = i;
    });
    // At the very bottom the last (short) section may never reach the marker.
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && current >= 0) current = sections.length - 1;
    sectionLinks.forEach(function (link, i) {
      if (i === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if (sectionLinks.length) {
    // Four sections: cheap enough to recompute on every scroll event.
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();
  }

  /* ---------- BibTeX: show / copy ---------- */
  var bibToggles = document.querySelectorAll('[data-bib-toggle]');
  Array.prototype.forEach.call(bibToggles, function (button) {
    var panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    });
  });

  var copyButtons = document.querySelectorAll('[data-copy]');
  Array.prototype.forEach.call(copyButtons, function (button) {
    button.addEventListener('click', function () {
      var source = document.getElementById(button.getAttribute('data-copy'));
      if (!source) return;
      var text = source.textContent;

      function done() {
        button.classList.add('is-copied');
        setTimeout(function () { button.classList.remove('is-copied'); }, 1800);
      }
      function selectFallback() {
        var range = document.createRange();
        range.selectNodeContents(source);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        try { if (document.execCommand('copy')) done(); } catch (e) { /* text stays selected */ }
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, selectFallback);
      } else {
        selectFallback();
      }
    });
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
