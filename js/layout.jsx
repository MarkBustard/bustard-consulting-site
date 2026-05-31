// Shared site layout — Notation / Indexed direction.
// SiteNav (no favicon, no descriptor), PageHeader (indexed),
// PageSection (spine + body), SiteFooter.
// ─────────────────────────────────────────────────────────────────

const PAD = 96;
const SPINE_W = 120;
const SPINE_GAP = 56;

function SiteNav({ active }) {
  const items = [
    ['practice.html', 'Practice'],
    ['services.html', 'Services'],
    ['experience.html', 'Experience'],
    ['contact.html', 'Contact'],
  ];
  return (
    <header style={{
      height: 80,
      padding: `0 ${PAD}px`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid var(--hairline-bronze-soft)',
      background: 'var(--warm-white)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <a href="index.html" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
        <Wordmark size={170} color="var(--charcoal)" />
      </a>
      <nav style={{ display: 'flex', gap: 44, fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13 }}>
        {items.map(([href, label]) => (
          <a key={href} href={href}
             className={'bc-navlink' + (active === label.toLowerCase() ? ' bc-navlink--accent' : '')}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// Indexed page header — number + label on left spine, title + lede right.
// Sweep stays clear of the wordmark area (which lives in the sticky nav).
function PageHeader({ number, label, title, lede, sweep = null }) {
  return (
    <section style={{
      position: 'relative',
      padding: `${PAD * 1.2}px ${PAD}px ${PAD * 0.9}px`,
      borderBottom: '1px solid var(--hairline-bronze-soft)',
      overflow: 'hidden',
    }}>
      {sweep && (
        <div style={{ position: 'absolute', top: -60, right: -220, width: 760, color: 'var(--bronze)', opacity: 0.35, pointerEvents: 'none' }}>
          <Sweep variant={sweep} />
        </div>
      )}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `${SPINE_W}px 1fr`, gap: SPINE_GAP }}>
        <div>
          <Mono color="var(--bronze)" size={10}>{number}</Mono>
          {label && (
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.5 }}>
              {label}
            </div>
          )}
        </div>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 64,
            lineHeight: 1.08, letterSpacing: '-0.012em',
            color: 'var(--charcoal)', maxWidth: 1100,
          }}>{title}</h1>
          {lede && (
            <p style={{
              marginTop: 28,
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontWeight: 400, fontSize: 22, lineHeight: 1.45,
              color: 'var(--charcoal)', opacity: 0.7,
              maxWidth: 760,
            }}>{lede}</p>
          )}
        </div>
      </div>
    </section>
  );
}

// Notation-style section with left spine (number + label) and right body.
function PageSection({ number, label, children, background = 'var(--warm-white)', spacing = 1.2, sweep = null, sweepProps = {} }) {
  return (
    <section style={{ position: 'relative', background, padding: `${PAD * spacing}px ${PAD}px`, overflow: 'hidden' }}>
      {sweep && (
        <div style={{
          position: 'absolute',
          top: sweepProps.top ?? 40, right: sweepProps.right ?? -120,
          width: sweepProps.width ?? 720,
          color: sweepProps.color ?? 'var(--bronze)',
          opacity: sweepProps.opacity ?? 0.5,
          pointerEvents: 'none',
        }}>
          <Sweep variant={sweep} />
        </div>
      )}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `${SPINE_W}px 1fr`, gap: SPINE_GAP }}>
        <div>
          {number && <Mono color="var(--bronze)" size={10}>{number}</Mono>}
          {label && (
            <div style={{ marginTop: number ? 14 : 0, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: background === 'var(--charcoal)' ? 'var(--warm-white)' : 'var(--charcoal)', opacity: 0.5 }}>
              {label}
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <>
      <section style={{
        position: 'relative',
        padding: `${PAD * 1.3}px ${PAD}px`,
        background: 'var(--charcoal)',
        color: 'var(--warm-white)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -180, width: 1100, color: 'var(--bronze)', opacity: 0.22, pointerEvents: 'none' }}>
          <Sweep variant={1} />
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `${SPINE_W}px 1fr`, gap: SPINE_GAP }}>
          <div>
            <Mono color="var(--bronze)" size={10}>§ 06</Mono>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--warm-white)', opacity: 0.45 }}>
              Engage
            </div>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36,
              lineHeight: 1.25, color: 'var(--warm-white)', maxWidth: 880,
            }}>
              Available for strategic advisory, project development and
              executive production.
            </p>
            <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 56, fontSize: 14 }}>
              <div>
                <Mono color="var(--warm-white)" size={9} style={{ opacity: 0.5 }}>Email</Mono>
                <div style={{ marginTop: 8 }}><a href="mailto:mark@bustard.co.uk" style={{ color: 'var(--bronze)', fontFamily: 'var(--font-display)', fontSize: 18 }}>mark@bustard.co.uk</a></div>
              </div>
              <div>
                <Mono color="var(--warm-white)" size={9} style={{ opacity: 0.5 }}>LinkedIn</Mono>
                <div style={{ marginTop: 8 }}>
                  <a href="https://www.linkedin.com/in/markbustard/"
                     style={{ color: 'var(--bronze)', fontFamily: 'var(--font-display)', fontSize: 18, display: 'inline-flex', alignItems: 'center', gap: 10 }}
                     target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--warm-white)" aria-hidden="true" style={{ pointerEvents: 'none' }}>
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    /in/markbustard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer style={{
        padding: `28px ${PAD}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--warm-white)',
        borderTop: '1px solid var(--hairline-bronze-soft)',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
          Confidential & Proprietary © Bustard Consulting · MMXXVI
        </div>
        <div style={{ display: 'flex', gap: 28, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.5 }}>
          <a href="practice.html" style={{ color: 'inherit' }}>Practice</a>
          <a href="services.html" style={{ color: 'inherit' }}>Services</a>
          <a href="experience.html" style={{ color: 'inherit' }}>Experience</a>
          <a href="contact.html" style={{ color: 'inherit' }}>Contact</a>
        </div>
      </footer>
    </>
  );
}

Object.assign(window, { SiteNav, PageHeader, PageSection, SiteFooter });
