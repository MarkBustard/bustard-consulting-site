/* ──────────────────────────────────────────────────────────
   Bustard Consulting — analytics / privacy notice
   Lightweight, dependency-free, dismissible. Remembers the
   acknowledgement in localStorage so it shows once. Styled to
   the site tokens (warm-white card, bronze accent, hairline).
   ────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var KEY = 'bc-privacy-ack';

  // Already acknowledged → do nothing.
  try {
    if (window.localStorage && localStorage.getItem(KEY) === '1') return;
  } catch (e) { /* private mode / disabled storage — show notice anyway */ }

  var STYLE_ID = 'bc-cookie-notice-style';
  var NOTICE_ID = 'bc-cookie-notice';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = [
      '#' + NOTICE_ID + '{',
      '  position:fixed;left:24px;bottom:24px;z-index:80;width:340px;max-width:calc(100vw - 48px);',
      '  background:var(--warm-white,#F4F2EE);color:var(--charcoal,#2F332E);',
      '  border:1px solid var(--hairline-bronze,rgba(168,134,99,0.35));',
      '  box-shadow:0 10px 34px rgba(47,51,46,0.13);',
      '  padding:18px 20px 16px;',
      '  font-family:var(--font-body,"Inter",system-ui,sans-serif);font-weight:300;',
      '  opacity:0;transform:translateY(14px);',
      '  transition:opacity .42s cubic-bezier(.32,.05,.2,1),transform .42s cubic-bezier(.32,.05,.2,1);',
      '}',
      '#' + NOTICE_ID + '.bc-cn-in{opacity:1;transform:translateY(0);}',
      '#' + NOTICE_ID + ' .bc-cn-eyebrow{',
      '  font-family:var(--font-mono,"DM Mono",monospace);font-size:9px;letter-spacing:.2em;',
      '  text-transform:uppercase;color:var(--bronze,#A88663);',
      '}',
      '#' + NOTICE_ID + ' .bc-cn-text{',
      '  margin-top:10px;font-size:13px;line-height:1.62;color:var(--charcoal,#2F332E);opacity:.85;',
      '}',
      '#' + NOTICE_ID + ' .bc-cn-row{',
      '  margin-top:16px;display:flex;align-items:center;gap:20px;',
      '}',
      '#' + NOTICE_ID + ' .bc-cn-ok{',
      '  appearance:none;-webkit-appearance:none;border:1px solid var(--bronze,#A88663);',
      '  background:transparent;color:var(--bronze,#A88663);cursor:pointer;',
      '  font-family:var(--font-mono,"DM Mono",monospace);font-size:10px;letter-spacing:.18em;',
      '  text-transform:uppercase;padding:10px 26px;line-height:1;',
      '  transition:background .22s ease,color .22s ease;',
      '}',
      '#' + NOTICE_ID + ' .bc-cn-ok:hover,#' + NOTICE_ID + ' .bc-cn-ok:focus-visible{',
      '  background:var(--bronze,#A88663);color:var(--warm-white,#F4F2EE);outline:none;',
      '}',
      '#' + NOTICE_ID + ' .bc-cn-link{',
      '  font-family:var(--font-mono,"DM Mono",monospace);font-size:10px;letter-spacing:.16em;',
      '  text-transform:uppercase;color:var(--charcoal,#2F332E);opacity:.5;text-decoration:none;',
      '  transition:opacity .22s ease;',
      '}',
      '#' + NOTICE_ID + ' .bc-cn-link:hover,#' + NOTICE_ID + ' .bc-cn-link:focus-visible{opacity:.82;outline:none;}',
      '@media (max-width:480px){',
      '  #' + NOTICE_ID + '{left:14px;right:14px;bottom:14px;width:auto;max-width:none;padding:16px 16px 14px;}',
      '  #' + NOTICE_ID + ' .bc-cn-ok{padding:12px 26px;}',
      '}',
      '@media (prefers-reduced-motion: reduce){',
      '  #' + NOTICE_ID + '{transition:none;transform:none;}',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function dismiss() {
    var w = document.getElementById(NOTICE_ID);
    try { if (window.localStorage) localStorage.setItem(KEY, '1'); } catch (e) {}
    if (!w) return;
    w.classList.remove('bc-cn-in');
    window.setTimeout(function () {
      if (w && w.parentNode) w.parentNode.removeChild(w);
    }, 380);
  }

  function build() {
    if (document.getElementById(NOTICE_ID)) return;
    injectStyle();

    var wrap = document.createElement('div');
    wrap.id = NOTICE_ID;
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Privacy notice');

    var eyebrow = document.createElement('div');
    eyebrow.className = 'bc-cn-eyebrow';
    eyebrow.textContent = 'Privacy';

    var text = document.createElement('div');
    text.className = 'bc-cn-text';
    text.textContent = 'This site uses analytics tools to improve performance and user experience.';

    var row = document.createElement('div');
    row.className = 'bc-cn-row';

    var ok = document.createElement('button');
    ok.className = 'bc-cn-ok';
    ok.type = 'button';
    ok.textContent = 'OK';
    ok.addEventListener('click', dismiss);

    var link = document.createElement('a');
    link.className = 'bc-cn-link';
    link.href = 'privacy.html';
    link.textContent = 'Details';

    row.appendChild(ok);
    row.appendChild(link);
    wrap.appendChild(eyebrow);
    wrap.appendChild(text);
    wrap.appendChild(row);
    document.body.appendChild(wrap);

    // Trigger the entrance on the next tick. setTimeout (rather than
    // requestAnimationFrame) so the notice still reveals reliably when the
    // page is loaded in a background / non-visible tab, where rAF is paused.
    window.setTimeout(function () { wrap.classList.add('bc-cn-in'); }, 30);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
