/*!
 * sts-shared.js  |  Streets to Shelters  |  v2.0
 * -------------------------------------------------
 * Add ONCE per page, just before </body>:
 *   <script src="../shared/sts-shared.js"></script>
 *
 * Handles (site-wide):
 *   ✓ Custom cursor + toggle (localStorage-persisted)
 *   ✓ Cursor hides inside iframes, during scroll, on window.blur
 *   ✓ Mobile menu open/close
 *   ✓ Scroll reveal (new .sts-reveal AND all legacy class names)
 *   ✓ Magnetic button effect (.sts-magnetic / .magnetic)
 *   ✓ Scroll progress bar (#sts-progress)
 *   ✓ Header scroll shadow
 *
 * Page-specific JS (carousel, counters, modals, word-split,
 * metaballs, hero tilt) stays in each page's own <script>.
 */
(function () {
  'use strict';

  /* ─── micro-helpers ─── */
  const $   = s  => document.querySelector(s);
  const $$  = s  => [...document.querySelectorAll(s)];
  const on  = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  /* ─── boot ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot () {
    initCursor();
    initMobileMenu();
    initScrollReveal();
    initMagnetic();
    initProgress();
    initHeaderShadow();
  }

  /* ================================================================
     CUSTOM CURSOR
     ================================================================ */
  function initCursor () {
    const dot    = $('.cursor-dot');
    const ring   = $('.cursor-ring');
    const btn    = $('#sts-cursor-btn');
    const isFine = window.matchMedia('(pointer: fine)').matches;

    /* Touch devices: hide toggle, do nothing else */
    if (!isFine) {
      if (btn) btn.style.display = 'none';
      return;
    }
    if (!dot || !ring) return;

    /* ── State ── */
    let enabled   = (localStorage.getItem('sts-cursor') !== 'off');
    let mx = -400, my = -400;
    let rx = -400, ry = -400;
    let dotVisible  = true;
    let inIframe    = false;
    let scrollTid   = null;

    /* ── Apply enabled / disabled ── */
    function applyEnabled () {
      if (enabled) {
        document.body.classList.add('sts-cursor-on');
        dot.style.display  = '';
        ring.style.display = '';
        if (btn) {
          btn.classList.add('is-on');
          btn.setAttribute('title', 'Disable custom cursor');
        }
      } else {
        document.body.classList.remove('sts-cursor-on', 'cursor-hover');
        dot.style.display  = 'none';
        ring.style.display = 'none';
        if (btn) {
          btn.classList.remove('is-on');
          btn.setAttribute('title', 'Enable custom cursor');
        }
      }
    }

    /* ── Show / hide dot+ring ── */
    function showCursor () {
      if (!dotVisible && enabled && !inIframe) {
        dot.classList.remove('sts-hidden');
        ring.classList.remove('sts-hidden');
        dotVisible = true;
      }
    }
    function hideCursor () {
      if (dotVisible) {
        dot.classList.add('sts-hidden');
        ring.classList.add('sts-hidden');
        dotVisible = false;
      }
    }

    /* ── Mouse tracking ── */
    on(window, 'mousemove', e => {
      if (!enabled) return;
      mx = e.clientX; my = e.clientY;
      /* Snap ring to current position before fading back in so it
         doesn't lerp from the old frozen position after a scroll. */
      if (!dotVisible) { rx = mx; ry = my; }
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      showCursor();
      clearTimeout(scrollTid);
    }, { passive: true });

    /* ── Hide during scroll (mousemove stops firing while scrolling) ── */
    on(window, 'scroll', () => {
      clearTimeout(scrollTid);
      scrollTid = setTimeout(hideCursor, 80);
    }, { passive: true });

    /* ── Compositor lerp loop — zero layout cost ── */
    (function loop () {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(loop);
    })();

    /* ── Hover state on interactive elements ── */
    function addHover (el) {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    }
    function scanHovers () {
      $$('a, button, [role="button"], label, select').forEach(addHover);
    }

    /* ── Iframe cursor suppression ──────────────────────────────────
       When the pointer moves into an iframe, the parent document
       stops receiving mousemove events, so the cursor freezes.
       Fix: listen for mouseenter/leave on every iframe, AND for
       the window blur event (same-origin iframe focus steal).
    ─────────────────────────────────────────────────────────────── */
    function onEnterIframe () { inIframe = true;  hideCursor(); }
    function onLeaveIframe () { inIframe = false; if (enabled) showCursor(); }

    function scanIframes () {
      $$('iframe').forEach(fr => {
        fr.removeEventListener('mouseenter', onEnterIframe);
        fr.removeEventListener('mouseleave', onLeaveIframe);
        fr.addEventListener('mouseenter', onEnterIframe);
        fr.addEventListener('mouseleave', onLeaveIframe);
      });
    }

    /* window.blur = focus moved into an (any-origin) iframe */
    on(window, 'blur',  () => { inIframe = true;  hideCursor(); });
    on(window, 'focus', () => { inIframe = false; });

    /* Watch for dynamically injected iframes (modals, etc.) */
    new MutationObserver(scanIframes)
      .observe(document.body, { childList: true, subtree: true });

    /* ── Toggle button (in header) ── */
    if (btn) {
      on(btn, 'click', () => {
        enabled = !enabled;
        localStorage.setItem('sts-cursor', enabled ? 'on' : 'off');
        applyEnabled();
        if (enabled) { scanHovers(); scanIframes(); }
      });
    }

    /* ── Init ── */
    applyEnabled();
    scanHovers();
    scanIframes();
  }

  /* ================================================================
     MOBILE MENU
     ================================================================ */
  function initMobileMenu () {
    const openBtn  = $('#mobile-menu-btn');
    const closeBtn = $('#close-menu-btn');
    const overlay  = $('#mobile-menu-overlay');
    if (!openBtn || !overlay) return;

    const open  = () => overlay.classList.remove('translate-x-full');
    const close = () => overlay.classList.add('translate-x-full');

    on(openBtn, 'click', open);
    on(closeBtn, 'click', close);
    $$('#mobile-menu-overlay a').forEach(a => on(a, 'click', close));
  }

  /* ================================================================
     SCROLL REVEAL
     Handles .sts-reveal (new) AND every legacy class name that
     existed on individual pages so nothing breaks.
     ================================================================ */
  function initScrollReveal () {
    const SELECTOR = [
      '.sts-reveal',
      '.fade-up',
      '.reveal',
      '.reveal-slide',
      '.reveal-hero',
      '.reveal-item',
      '.r-up',
      '.r-left',
      '.r-right',
      '.r-scale',
      '.r-fade',
    ].join(',');

    const els = $$(SELECTOR);
    if (!els.length) return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        /* Add all trigger tokens — each CSS rule listens for its own */
        el.classList.add('in-view', 'is-visible', 'show');
        observer.unobserve(el);
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -32px 0px' });

    els.forEach(el => obs.observe(el));
  }

  /* ================================================================
     MAGNETIC BUTTONS
     ================================================================ */
  function initMagnetic () {
    $$('.sts-magnetic, .magnetic').forEach(btn => {
      on(btn, 'mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const tx = (e.clientX - r.left - r.width  / 2) * 0.28;
        const ty = (e.clientY - r.top  - r.height / 2) * 0.28;
        btn.style.transform = `translate(${tx}px, ${ty}px)`;
      });
      on(btn, 'mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ================================================================
     SCROLL PROGRESS BAR  (#sts-progress must exist in the DOM)
     ================================================================ */
  function initProgress () {
    const bar = $('#sts-progress');
    if (!bar) return;
    on(window, 'scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total * 100) : 0) + '%';
    }, { passive: true });
  }

  /* ================================================================
     HEADER SCROLL SHADOW
     ================================================================ */
  function initHeaderShadow () {
    on(window, 'scroll', () => {
      document.body.classList.toggle('sts-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

})();
