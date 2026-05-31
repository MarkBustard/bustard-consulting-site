// Direction C — "Notation / Indexed"
// References: Frieze contents page, Soane Museum site, institutional
// publisher index pages. Index spine, numbered entries, generous
// editorial tempo, sweep only at section transitions.
// ─────────────────────────────────────────────────────────────────

// Seven-Phase Framework — interactive horizontal timeline.
// Reads as methodology, not spreadsheet: a single bronze hairline spine,
// short tick marks dropping down to phase numbers, and an expanding body
// row underneath that shows the active phase's detail. Hover or focus a
// phase to navigate; first phase active on load.
function FrameworkTimeline() {
  const phases = [
    { n: '01', t: 'Concept & Alignment',                short: 'Concept', body: 'Discovery, strategic brief and opportunity assessment. Clarify the opportunity and map delivery routes.' },
    { n: '02', t: 'Structured Development',             short: 'Development', body: 'Creative, technical and financial blueprinting across multi-agency teams.' },
    { n: '03', t: 'Commercial Architecture',            short: 'Commercial', body: 'Business models, CapEx, OpEx, IRR and EBITDA projections. Investor-grade financial structuring.' },
    { n: '04', t: 'Experience & Technical Architecture',short: 'Experience', body: 'Spatial design, real-time pipeline architecture, prototyping and proof-of-concept.' },
    { n: '05', t: 'Programme & Delivery Governance',    short: 'Governance', body: 'Full programme, Risk Register, RACI framework, vendor and partner alignment, procurement and QA.' },
    { n: '06', t: 'Investment & Stakeholder Alignment', short: 'Investment', body: 'Executive Summary, Investor Pack, Information Memorandum, pitch deck and board-level alignment.' },
    { n: '07', t: 'Operational Delivery',               short: 'Delivery', body: 'Senior delivery leadership through build, rehearsal, launch and post-delivery review.' },
  ];
  const [active, setActive] = React.useState(0);

  return (
    <div style={{ marginTop: 56 }}>
      {/* Hairline spine */}
      <div style={{ position: 'relative', height: 1, background: 'var(--hairline-bronze)' }} />

      {/* Seven phase markers along the spine */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {phases.map((p, i) => {
          const isActive = active === i;
          return (
            <button
              key={p.n}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${p.n} — ${p.t}`}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 0,
                padding: '0 10px 8px',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: 'inherit',
              }}
            >
              {/* Tick mark hanging from the spine */}
              <div style={{
                width: 1,
                height: isActive ? 22 : 12,
                background: isActive ? 'var(--bronze)' : 'var(--hairline-bronze)',
                marginBottom: 14,
                transition: 'height 320ms cubic-bezier(0.32,0.05,0.2,1), background 220ms ease',
              }} />
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
                color: isActive ? 'var(--bronze)' : 'var(--charcoal)',
                opacity: isActive ? 1 : 0.4,
                transition: 'color 220ms ease, opacity 220ms ease',
              }}>
                {p.n}
              </div>
              <div style={{
                marginTop: 8,
                fontFamily: 'var(--font-display)',
                fontSize: 14, lineHeight: 1.25,
                color: 'var(--charcoal)',
                opacity: isActive ? 1 : 0.55,
                transition: 'opacity 220ms ease',
              }}>
                {p.short}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanding body row */}
      <div style={{
        marginTop: 28,
        padding: '28px 0 0',
        borderTop: '1px solid var(--hairline-bronze-soft)',
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: 32,
        minHeight: 130,
      }}>
        <div>
          <Mono color="var(--bronze)" size={11}>{phases[active].n}</Mono>
        </div>
        <div>
          <h4 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 24, lineHeight: 1.25, color: 'var(--charcoal)',
            letterSpacing: '-0.004em',
          }}>
            {phases[active].t}
          </h4>
          <p style={{
            marginTop: 12,
            fontSize: 14.5, lineHeight: 1.75,
            color: 'var(--charcoal)', opacity: 0.78,
            maxWidth: 720,
          }}>
            {phases[active].body}
          </p>
        </div>
      </div>
    </div>
  );
}

function DirectionC() {
  const ART_W = 1440;
  const PAD = 88;

  // Index entry row used in hero (table of contents)
  const IndexRow = ({ n, t, sub, side }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '64px 1fr auto auto',
      gap: 28,
      alignItems: 'baseline',
      padding: '22px 0',
      borderTop: '1px solid var(--hairline-bronze-soft)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--bronze)', letterSpacing: '0.05em' }}>{n}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: 'var(--charcoal)' }}>{t}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13, color: 'var(--charcoal)', opacity: 0.6 }}>{sub}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.42 }}>{side}</span>
    </div>
  );

  return (
    <div style={{ width: ART_W, background: 'var(--warm-white)', color: 'var(--charcoal)', fontFamily: 'var(--font-body)', fontWeight: 300, overflow: 'hidden' }}>

      {/* NAV */}
      <header style={{
        height: 76,
        padding: `0 ${PAD}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--hairline-bronze-soft)',
      }}>
        {/* Wordmark — left aligned (replaces the old Vol I marker). */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Wordmark size={140} color="var(--charcoal)" />
        </div>
        <nav style={{ display: 'flex', gap: 36, fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 12 }}>
          <a className="bc-navlink" href="practice.html">Practice</a>
          <a className="bc-navlink" href="services.html">Services</a>
          <a className="bc-navlink" href="experience.html">Experience</a>
          <a className="bc-navlink bc-navlink--accent" href="contact.html">Contact</a>
        </nav>
      </header>

      {/* HERO — index / contents page */}
      <section style={{ padding: `${PAD}px ${PAD}px ${PAD * 0.6}px`, position: 'relative', overflow: 'hidden' }}>
        {/* upper meta row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Mono color="var(--bronze)" size={10}>Contents</Mono>
          <div style={{ textAlign: 'right' }}>
            <Mono color="var(--charcoal)" size={9} track={0.22} style={{ opacity: 0.45 }}>Independent practice · est. 2020</Mono>
          </div>
        </div>

        {/* huge headline phrase */}
        <h1 style={{
          marginTop: 64,
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 96,
          lineHeight: 1.04,
          letterSpacing: '-0.012em',
          color: 'var(--charcoal)',
          maxWidth: 1240,
        }}>
          Strategic advisory and executive<br />
          leadership for live, immersive and<br />
          IP-led audience experiences.
        </h1>

        {/* Architectural sweep — full-width L→R gesture, matches the
            canonical homepage hero. Extends past both the left and right
            padding edges so the line reads as an architectural sketch
            crossing the page rather than a contained ornament. The hero
            section sits within the artboard's overflow: hidden so the
            sweep is cleanly cropped at the artboard edges. */}
        <div className="bc-hero-sweep" style={{
          position: 'relative',
          marginTop: 64,
          marginLeft: -(PAD + 220),    // extends ~220px past the left edge
          width: ART_W + 440,          // and ~220px past the right edge
          color: 'var(--bronze)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}>
          <Sweep variant={3} />
        </div>

        {/* index table */}
        <div style={{ marginTop: 64 }}>
          <IndexRow n="01" t="Practice" sub="About the practice and founder" side="p. 02" />
          <IndexRow n="02" t="Services" sub="Three pillars using one consistent delivery framework" side="p. 03" />
          <IndexRow n="03" t="Experience" sub="Selected projects — a documentary record" side="p. 04" />
          <IndexRow n="04" t="Contact" sub="Engagement enquiries" side="p. 05" />
          <div style={{ height: 1, background: 'var(--hairline-bronze-soft)' }} />
        </div>
      </section>

      {/* BRAND STATEMENT — quiet, serif italic, narrow column.
          A second bronze architectural sweep flows across the section
          below the type — broader gesture than the hero (variant 5),
          extending past both edges so it reads as a continuation of
          the architectural line. */}
      <section style={{ padding: `${PAD * 1.3}px ${PAD}px`, background: 'var(--warm-white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48, position: 'relative', zIndex: 1 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>§ 01</Mono>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
              Statement
            </div>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 60,
              lineHeight: 1.18,
              letterSpacing: '-0.008em',
              color: 'var(--charcoal)',
              maxWidth: 980,
            }}>
              A bridge between creative ambition{' '}
              <br />and operational reality.
            </p>
            <p style={{ marginTop: 40, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.4, color: 'var(--bronze)', maxWidth: 820 }}>
              Structuring complex audience experiences.
            </p>

            {/* Bronze architectural sweep — sits across the lower half
                of the section, extending past the right edge so the
                line reads as an architectural sketch crossing the
                section. Sits below the type via negative z-index. */}
            <div style={{
              position: 'absolute',
              left: PAD - 80,
              right: -(PAD + 180),
              bottom: -40,
              color: 'var(--bronze)',
              opacity: 0.32,
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              <Sweep variant={5} />
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING — editorial spread, image left, text right */}
      <section style={{ padding: `${PAD}px ${PAD}px ${PAD * 1.3}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>§ 02</Mono>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
              Practice
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
            <div style={{
              width: '100%', height: 520,
              backgroundImage: 'url(assets/portrait-duotone.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              backgroundColor: 'var(--warm-grey)',
            }} role="img" aria-label="Mark Bustard portrait" />
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: 'var(--charcoal)', maxWidth: 560 }}>
                Over two decades, <strong style={{ fontStyle: 'normal', fontWeight: 600 }}>Mark Bustard</strong> has led the structuring and delivery of large-scale public events, immersive platforms and IP-led audience experiences spanning London 2012, Super Bowl programmes, London New Year’s Eve, F1 Live and a range of projects involving artists working with real-time and emerging technologies.
              </p>
              <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.8, color: 'var(--charcoal)', opacity: 0.82 }}>
                Bustard Consulting supports brands, rights-holders,
                investors, venues and production partners across feasibility,
                development strategy, governance and delivery architecture.
              </p>

              <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--hairline-bronze)' }}>
                <Mono color="var(--charcoal)" size={9} style={{ opacity: 0.5 }}>Operates at the intersection of</Mono>
                <p style={{
                  marginTop: 14,
                  fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: 'var(--charcoal)',
                }}>
                  Creative<span style={{ color: 'var(--bronze)', margin: '0 12px' }}>×</span>
                  Technical<span style={{ color: 'var(--bronze)', margin: '0 12px' }}>×</span>
                  Commercial<span style={{ color: 'var(--bronze)', margin: '0 12px' }}>×</span>
                  Governance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER — full-bleed warm grey + small sweep */}
      <section style={{ padding: `${PAD}px ${PAD}px`, background: 'var(--warm-grey)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: 20, width: 720, color: 'var(--bronze)', opacity: 0.55, pointerEvents: 'none' }}>
          <Sweep variant={2} />
        </div>
        <div style={{ position: 'relative' }}>
          <Mono color="var(--bronze)" size={10}>§ 03 — Services</Mono>
          <p style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 30, color: 'var(--charcoal)' }}>
            Three pillars. One delivery framework.
          </p>
        </div>
      </section>

      {/* SERVICES — editorial index, more numerical */}
      <section style={{ padding: `${PAD * 1.3}px ${PAD}px ${PAD}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>i.</Mono>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
              Pillars
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56 }}>
            {[
              { n: '01', t: 'Strategic Advisory', body: 'Feasibility, commercial modelling, governance and investor structuring.' },
              { n: '02', t: 'Development Leadership', body: 'Creative, technical and operational blueprinting across multi-agency projects.' },
              { n: '03', t: 'Executive Production', body: 'Programme architecture and delivery oversight.' },
            ].map(p => (
              <div key={p.n}>
                <Mono color="var(--bronze)" size={11}>{p.n}</Mono>
                <h3 style={{ marginTop: 16, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: 'var(--charcoal)', lineHeight: 1.25 }}>{p.t}</h3>
                <p style={{ marginTop: 18, fontSize: 13.5, lineHeight: 1.75, color: 'var(--charcoal)', opacity: 0.72 }}>{p.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, textAlign: 'right' }}>
            <a href="services.html#framework" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)' }}>View framework →</a>
          </div>
        </div>

        {/* phases — seven-phase framework, interactive horizontal timeline.
            Designed to feel like methodology, not a delivery spreadsheet:
            tick marks hang from a single hairline spine; numbers and short
            phase labels read across the page; a body row below expands
            with the active phase. Hover or focus to navigate. */}
        <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>ii.</Mono>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
              Framework
            </div>
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 38, lineHeight: 1.18, letterSpacing: '-0.006em',
              color: 'var(--charcoal)', margin: 0,
            }}>
              Seven-Phase Framework
            </h3>
            <p style={{
              marginTop: 14,
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 17, lineHeight: 1.5, color: 'var(--charcoal)',
              opacity: 0.7, maxWidth: 720,
            }}>
              A scalable methodology — engagements can enter at any phase
              and scale into full development and delivery.
            </p>

            <FrameworkTimeline />
          </div>
        </div>
      </section>

      {/* SELECTED EXPERIENCE PREVIEW */}
      <section style={{ padding: `${PAD * 1.2}px ${PAD}px`, background: 'var(--warm-white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>§ 04</Mono>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
              Experience
            </div>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
              <div>
                {/* Lead — Requiem in Motion */}
                <a href="experience.html" style={{
                  display: 'block',
                  position: 'relative', width: '100%', height: 360,
                  overflow: 'hidden', background: 'var(--charcoal)',
                }}>
                  <img src="assets/experience/requiem-still.jpg" alt="Requiem in Motion" style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  }} />
                </a>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--charcoal)' }}>Requiem in Motion</div>
                    <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bronze)' }}>Executive Producer · JV led by Gideon Berger Studios</div>
                  </div>
                  <Mono size={10} color="var(--charcoal)" style={{ opacity: 0.4 }}>2024</Mono>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 24 }}>
                <div>
                  {/* Terminal 1 · Glastonbury 2025 */}
                  <a href="experience.html" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      position: 'relative', width: '100%', height: 138,
                      overflow: 'hidden', background: 'var(--charcoal)',
                    }}>
                      <img src="assets/experience/terminal-1.jpeg" alt="Terminal 1 · Glastonbury 2025" style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      }} />
                    </div>
                    <div style={{
                      marginTop: 10,
                      fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 400,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'var(--charcoal)',
                    }}>
                      <div>Terminal 1 · Glastonbury 2025</div>
                      <div style={{ marginTop: 2, opacity: 0.6, textTransform: 'none', letterSpacing: '0.02em', fontSize: 10 }}>VR experience and AI video installation</div>
                    </div>
                  </a>
                </div>
                <div>
                  {/* HUMAN — Festival of Immersive Storytelling */}
                  <a href="experience.html" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      position: 'relative', width: '100%', height: 138,
                      overflow: 'hidden', background: 'var(--charcoal)',
                    }}>
                      <img src="assets/experience/human-billboard.jpg" alt="HUMAN" style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      }} />
                    </div>
                    <div style={{
                      marginTop: 10,
                      fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 400,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'var(--charcoal)',
                    }}>
                      <div>HUMAN · 2019 — 2020</div>
                      <div style={{ marginTop: 2, opacity: 0.6, textTransform: 'none', letterSpacing: '0.02em', fontSize: 10 }}>Festival of Immersive Storytelling</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 32, textAlign: 'right' }}>
              <a href="experience.html" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)' }}>View all projects →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS — wider footer band */}
      <section style={{ padding: `${PAD}px ${PAD}px ${PAD * 1.2}px`, background: 'var(--warm-grey)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>§ 05</Mono>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
              Clients
            </div>
          </div>
          <div>
            {/* Section title — matches the reference layout. */}
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 36, lineHeight: 1.22, letterSpacing: '-0.006em',
              color: 'var(--charcoal)', margin: 0, maxWidth: 980,
            }}>
              Trusted by global brands, rights-holders and agencies to
              deliver exceptional live experiences.
            </h2>

            {/* Logo grid — five rows matching the reference (5 / 6 / 6 / 7 / 7).
                Each row is its own grid so column counts can differ row to row
                while logos sit on a consistent vertical rhythm. */}
            <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', rowGap: 8 }}>
              {[
                // Row 1 — 5 marks. Heights tuned to match the reference:
                // wide square / tall composite marks get more height,
                // small wordmarks read smaller.
                [
                  { name: 'GREAT Campaign',     src: 'assets/creds/great-campaign.png',     h: 80 },
                  { name: 'Mayor of London',    src: 'assets/creds/mayor-of-london.png',    h: 36 },
                  { name: 'London & Partners',  src: 'assets/creds-trimmed/london-and-partners.png',h: 48 },
                  { name: 'Live Nation',        src: 'assets/creds-trimmed/live-nation.png',  h: 44 },
                  { name: 'Glastonbury Festival', src: 'assets/creds-trimmed/glastonbury-festival.png', h: 108 },
                ],
                // Row 2 — 6 marks
                [
                  { name: 'Journey',            src: 'assets/creds-trimmed/journey.png',            h: 67 },
                  { name: '59 Productions',     src: 'assets/creds/59-productions.png',     h: 78 },
                  { name: 'Jack Morton',        src: 'assets/creds-trimmed/jack-morton.png',        h: 64 },
                  { name: 'Wasserman',          src: 'assets/creds/wasserman.png',          h: 76 },
                  { name: 'Sela',               src: 'assets/creds/sela.png',               h: 40 },
                  { name: 'M&C Saatchi',        src: 'assets/creds/mc-saatchi.svg',         h: 32 },
                ],
                // Row 3 — 6 marks
                [
                  { name: 'DNEG',               src: 'assets/creds/dneg.svg',               h: 32 },
                  { name: 'Dimension Studio',   src: 'assets/creds/dimension-studio.svg',   h: 32, nx: 16 },
                  { name: 'Marshmallow Laser Feast', src: 'assets/creds/marshmallow-laser-feast.webp', h: 64 },
                  { name: 'Block9',             src: 'assets/creds/block9.webp',            h: 50 },
                  { name: 'BBC',                src: 'assets/creds/bbc.png',                h: 54 },
                  { name: 'Harvey Goldsmith',   src: 'assets/creds/harvey-goldsmith.png',   h: 76 },
                ],
                // Row 4 — 7 marks (rights-holders & federations)
                [
                  { name: 'Formula 1',          src: 'assets/creds/f1.png',                 h: 50 },
                  { name: 'MLB',                src: 'assets/creds-trimmed/mlb.png',                h: 78, noTint: true },
                  { name: 'Premier League',     src: 'assets/creds-trimmed/premier-league.png',     h: 101 },
                  { name: 'FIFA',               src: 'assets/creds/fifa.png',               h: 50 },
                  { name: 'UEFA',               src: 'assets/creds-trimmed/uefa.png',               h: 46 },
                  { name: 'British Olympic Association', src: 'assets/creds/british-olympic.png', h: 90 },
                  { name: 'NFL',                src: 'assets/creds-trimmed/nfl.png',                h: 84 },
                ],
                // Row 5 — 7 marks (brands)
                [
                  { name: 'Spotify',            src: 'assets/creds/spotify.png',            h: 36 },
                  { name: 'Vodafone',           src: 'assets/creds-trimmed/vodafone.png',           h: 108 },
                  { name: "Palace Flipper's Roller Boogie", src: 'assets/creds-trimmed/palace-flippers.png', h: 86 },
                  { name: 'EDF',                src: 'assets/creds/edf.png',                h: 72 },
                  { name: 'Santander',          src: 'assets/creds/santander.png',          h: 54 },
                  { name: 'Verizon',            src: 'assets/creds/verizon.png',            h: 30 },
                  { name: 'OMEGA',              src: 'assets/creds-trimmed/omega.png',              h: 52 },
                ],
              ].map((row, ri) => (
                <div key={ri} style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                  columnGap: 28,
                  alignItems: 'center',
                }}>
                  {row.map(c => <ClientMark key={c.name} name={c.name} src={c.src} logoHeight={c.h} nudgeX={c.nx} noTint={c.noTint} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT — charcoal, single short line */}
      <section style={{
        position: 'relative',
        padding: `${PAD * 1.4}px ${PAD}px`,
        background: 'var(--charcoal)', color: 'var(--warm-white)', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -220, width: 1280, color: 'var(--bronze)', opacity: 0.18, pointerEvents: 'none' }}>
          <Sweep variant={6} />
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48 }}>
          <div>
            <Mono color="var(--bronze)" size={10}>§ 06</Mono>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--warm-white)', opacity: 0.45 }}>
              Contact
            </div>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.3, color: 'var(--warm-white)', maxWidth: 980,
            }}>
              Available for strategic advisory, project development and
              executive production engagements.
            </p>
            <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 56, fontSize: 14 }}>
              <div>
                <Mono color="var(--warm-white)" size={9} style={{ opacity: 0.5 }}>Email</Mono>
                <div style={{ marginTop: 8 }}><a href="mailto:mark@bustard.co.uk" style={{ color: 'var(--bronze)' }}>mark@bustard.co.uk</a></div>
              </div>
              <div>
                <Mono color="var(--warm-white)" size={9} style={{ opacity: 0.5 }}>LinkedIn</Mono>
                <div style={{ marginTop: 8 }}>
                  <a href="https://www.linkedin.com/in/markbustard/"
                     style={{ color: 'var(--bronze)', display: 'inline-flex', alignItems: 'center', gap: 10 }}
                     target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--warm-white)" aria-hidden="true">
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

      {/* FOOTER */}
      <footer style={{
        padding: `28px ${PAD}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--warm-white)',
        borderTop: '1px solid var(--hairline-bronze-soft)',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
          Confidential & Proprietary © Bustard Consulting · MMXXVI
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.45 }}>
          Vol. I — Issue 01
        </div>
      </footer>
    </div>
  );
}

window.DirectionC = DirectionC;
