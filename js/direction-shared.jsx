// Shared bits used across all 3 homepage directions
// ─────────────────────────────────────────────────

// Inline-SVG loader — fetches the SVG markup once, caches it, and
// drops it into the DOM so `fill="currentColor"` picks up the parent's
// `color` property. Lets us recolour the brand-supplied silhouettes.
const _svgCache = {};
function InlineSVG({ src, style, className, ...rest }) {
  const [html, setHtml] = React.useState(_svgCache[src] || null);
  React.useEffect(() => {
    if (_svgCache[src]) return;
    let cancelled = false;
    fetch(src).then(r => r.text()).then(t => {
      _svgCache[src] = t;
      if (!cancelled) setHtml(t);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [src]);
  return (
    <div className={className} style={style}
         dangerouslySetInnerHTML={html ? { __html: html } : undefined}
         {...rest} />
  );
}

// Wordmark — real Bustard Consulting wordmark SVG (custom cut from
// FreightDisp Pro Medium). `size` sets WIDTH in px; height auto.
// When `descriptor` is true, swaps to the wordmark+descriptor SVG so
// the descriptor sits within the wordmark artwork (per brand guidance),
// not as separate HTML text.
function Wordmark({ size = 240, color = 'var(--charcoal)', descriptor = false }) {
  const src = descriptor ? 'assets/wordmark-descriptor.svg' : 'assets/wordmark.svg';
  return (
    <InlineSVG src={src}
               style={{ width: size, height: 'auto', color, lineHeight: 0, display: 'inline-block' }} />
  );
}

// Small mono caption used everywhere (section numbers, eyebrows, metadata)
function Mono({ children, color = 'var(--bronze)', size = 10, track = 0.2, style = {} }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: size, fontWeight: 400,
      letterSpacing: `${track}em`,
      textTransform: 'uppercase',
      color, ...style,
    }}>{children}</span>
  );
}

// Hairline rule
function Rule({ color = 'var(--hairline-bronze)', width = '100%', style = {} }) {
  return <div style={{ width, height: 1, background: color, ...style }} />;
}

// Sweep — real Bustard Consulting architectural sweep, inlined SVG so
// `fill="currentColor"` picks up the parent's colour.
function Sweep({ variant = 1, color = 'var(--bronze)', opacity = 1, width = '100%', style = {}, ariaLabel = 'Architectural sweep' }) {
  const n = String(variant).padStart(2, '0');
  return (
    <InlineSVG src={`assets/sweeps/${n}.svg`}
               aria-label={ariaLabel} role="img"
               style={{ width, color, opacity, lineHeight: 0, ...style }} />
  );
}

// BC favicon monogram (per guidelines — used as corner marker on covers/sigs)
function BCMark({ size = 32, bg = 'var(--olive)', fg = 'var(--warm-white)', style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}>
      <InlineSVG src="assets/favicon.svg"
                 style={{ width: size * 0.56, height: 'auto', color: fg, lineHeight: 0 }} />
    </div>
  );
}

// Documentary-style image placeholder (subtle stripes + mono caption).
// Tone follows the brief: process-led, infrastructural, not theatrical.
function ImgSlot({ label = '', subtitle = '', height = 320, tone = 'warm', ratio, style = {} }) {
  const tones = {
    warm:    { bg: 'rgba(74,79,69,0.08)', stripe: 'rgba(74,79,69,0.04)', fg: 'rgba(47,51,46,0.55)' },
    olive:   { bg: 'rgba(244,242,238,0.07)', stripe: 'rgba(244,242,238,0.04)', fg: 'rgba(244,242,238,0.55)' },
    charcoal:{ bg: 'rgba(244,242,238,0.06)', stripe: 'rgba(244,242,238,0.03)', fg: 'rgba(244,242,238,0.5)' },
  };
  const t = tones[tone] || tones.warm;
  const h = ratio ? undefined : height;
  return (
    <div style={{
      width: '100%',
      ...(ratio ? { aspectRatio: ratio } : { height: h }),
      background: `repeating-linear-gradient(135deg, ${t.bg} 0 2px, ${t.stripe} 2px 14px)`,
      position: 'relative',
      ...style,
    }}>
      <div style={{
        position: 'absolute', left: 16, bottom: 14,
        fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 400,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: t.fg, maxWidth: '80%', lineHeight: 1.5,
      }}>
        {label && <div style={{ color: t.fg, opacity: 1 }}>{label}</div>}
        {subtitle && <div style={{ marginTop: 2, opacity: 0.6, textTransform: 'none', letterSpacing: '0.02em', fontSize: 10 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// Client logo tile — when a `src` or `slug` is provided, renders the artwork
// from assets/creds/<slug>.svg tinted to a neutral dark grey. With no source
// (the current state — Creds folder still being collected), falls back to a
// typeset wordmark in the same dark-grey tone so the grid composition is
// stable. Avoids 404 noise from probing non-existent files.
//
// Sizing — all logos render at the same fixed height (so visual weight is
// uniform across the strip); width is auto by aspect ratio. The outer tile
// is taller than the logo so wide wordmarks and tall roundels can coexist
// without colliding visually.
function ClientMark({ name, slug, src, logoHeight = 60, nudgeX = 0, noTint = false }) {
  const url = src || (slug ? `assets/creds/${slug}.svg` : null);
  const [failed, setFailed] = React.useState(!url);
  return (
    <div title={name} style={{
      height: 160,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '4px 8px',
      transform: nudgeX ? `translateX(${nudgeX}px)` : undefined,
    }}>
      {!failed ? (
        <img src={url} alt={name}
             onError={() => setFailed(true)}
             style={{
               height: logoHeight,
               width: 'auto',
               maxWidth: '100%',
               objectFit: 'contain',
               display: 'block',
               // Tint any source to a neutral dark grey, unless the image
               // is already pre-tinted (noTint passed for logos with
               // knock-out interiors that the filter would flatten).
               filter: noTint ? 'none' : 'brightness(0) saturate(100%) invert(18%) sepia(6%) saturate(420%) hue-rotate(60deg) brightness(95%) contrast(90%)',
               opacity: 0.78,
             }} />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: '0.02em',
          color: '#3A3F38', // dark grey (matches tinted-logo target tone)
          opacity: 0.78,
          textAlign: 'center',
          lineHeight: 1.2,
        }}>{name}</span>
      )}
    </div>
  );
}

Object.assign(window, { InlineSVG, Wordmark, Mono, Rule, Sweep, BCMark, ImgSlot, ClientMark });
