// Experience page — interactive components
// ─────────────────────────────────────────────────
// Carousel, Lightbox, FeaturedCase, ArchiveCard,
// DetailModal, FilterBar.
//
// All components share styling vocabulary with the rest of the
// site: charcoal/bronze/warm-grey, mono small caps for meta,
// display serif for titles. Interactions are restrained —
// editorial fade/translate, no playful animation.

const { useState, useEffect, useCallback, useRef } = React;

// ────────────────────────────────────────────────────────────
// Carousel — image strip with arrows, dots, lightbox-on-click
// ────────────────────────────────────────────────────────────
function ExpCarousel({ images, ratio = '4 / 3', onOpenLightbox, tall }) {
  const [i, setI] = useState(0);
  const total = images.length;
  const wrap = (n) => ((n % total) + total) % total;
  const go = (n) => setI(wrap(n));

  // Keyboard nav when the carousel is focused
  const ref = useRef(null);
  const onKey = (e) => {
    if (e.key === 'ArrowLeft')  go(i - 1);
    if (e.key === 'ArrowRight') go(i + 1);
  };

  return (
    <div ref={ref} tabIndex={0} onKeyDown={onKey} style={{ position: 'relative', outline: 'none' }}>
      {/* Image / video stage */}
      <div
        onClick={() => onOpenLightbox && onOpenLightbox(i)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: ratio,
          background: 'var(--charcoal)',
          overflow: 'hidden',
          cursor: onOpenLightbox ? 'zoom-in' : 'default',
        }}>
        {images.map((m, idx) => (
          <ExpMediaFrame key={idx} item={m} active={idx === i} />
        ))}
        {/* index pill (bottom-left) */}
        {total > 1 && (
          <div style={{
            position: 'absolute', left: 16, bottom: 14,
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--warm-white)', opacity: 0.7,
            mixBlendMode: 'difference',
          }}>
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        )}
        {/* Video badge (top-right) when current slide is a video */}
        {images[i] && images[i].type === 'video' && (
          <div style={{
            position: 'absolute', right: 14, top: 12,
            padding: '4px 8px',
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--warm-white)', opacity: 0.85,
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 999,
          }}>
            ▶ Video
          </div>
        )}
      </div>

      {/* Controls row */}
      {total > 1 && (
        <div style={{
          marginTop: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {images.map((_, idx) => (
              <button key={idx}
                      onClick={(e) => { e.stopPropagation(); go(idx); }}
                      aria-label={`Slide ${idx + 1}`}
                      style={{
                        appearance: 'none', border: 0, padding: 0,
                        width: 22, height: 1.5,
                        background: idx === i ? 'var(--bronze)' : 'var(--hairline-charcoal)',
                        cursor: 'pointer',
                        transition: 'background 220ms',
                      }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <button onClick={(e) => { e.stopPropagation(); go(i - 1); }}
                    aria-label="Previous"
                    style={{ appearance: 'none', background: 'transparent', border: 0, color: 'var(--charcoal)', padding: 0, cursor: 'pointer', font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}>
              ← Prev
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(i + 1); }}
                    aria-label="Next"
                    style={{ appearance: 'none', background: 'transparent', border: 0, color: 'var(--bronze)', padding: 0, cursor: 'pointer', font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}>
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Media frame — renders either an <img> or a <video>.
// Used inside the carousel; layers all slides absolutely and
// fades opacity between active/inactive states.
//
// For video items, supports `clipStart` and `clipEnd` (seconds)
// so the source file can be a longer cut and only a segment is
// shown. The video pauses, resets to `clipStart` and replays on
// loop within the clip range. When the slide is inactive the
// video is paused to save bandwidth and CPU.
// ────────────────────────────────────────────────────────────
function ExpMediaFrame({ item, active }) {
  const isVideo = item.type === 'video';
  const videoRef = useRef(null);
  const baseStyle = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    objectPosition: item.position || 'center',
    opacity: active ? 1 : 0,
    transition: 'opacity 600ms cubic-bezier(0.32,0.05,0.2,1)',
    display: 'block',
    // Inactive layer should not capture interactions
    pointerEvents: active ? 'auto' : 'none',
  };

  // Active/clipStart sync for videos: when this frame becomes active,
  // seek to clipStart and play; when inactive, pause.
  useEffect(() => {
    if (!isVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      const start = item.clipStart || 0;
      try { if (Math.abs(v.currentTime - start) > 0.05) v.currentTime = start; } catch {}
      const playPromise = v.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => {});
    } else {
      try { v.pause(); } catch {}
    }
  }, [active, isVideo, item.clipStart]);

  if (isVideo) {
    const onTimeUpdate = () => {
      const v = videoRef.current;
      if (!v) return;
      if (item.clipEnd != null && v.currentTime >= item.clipEnd) {
        try { v.currentTime = item.clipStart || 0; } catch {}
      }
    };
    return (
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        playsInline
        loop={item.clipEnd == null}
        preload={active ? 'auto' : 'metadata'}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={(e) => {
          if (item.clipStart != null) {
            try { e.currentTarget.currentTime = item.clipStart; } catch {}
          }
        }}
        style={baseStyle}
      />
    );
  }

  return <img src={item.src} alt="" style={baseStyle} />;
}

// ────────────────────────────────────────────────────────────
// Lightbox — fullscreen overlay with arrows + close
// ────────────────────────────────────────────────────────────
function ExpLightbox({ images, startIdx = 0, onClose }) {
  const [i, setI] = useState(startIdx);
  const total = images.length;
  const wrap = (n) => ((n % total) + total) % total;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  setI(p => wrap(p - 1));
      if (e.key === 'ArrowRight') setI(p => wrap(p + 1));
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [total, onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15, 15, 14, 0.96)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'expFade 220ms ease',
    }}>
      <style>{`@keyframes expFade { from { opacity: 0; } to { opacity: 1; } }`}</style>

      {/* Media — video or image */}
      {images[i] && images[i].type === 'video' ? (
        <LightboxVideo key={`video-${i}`} item={images[i]} />
      ) : (
        <img src={images[i].src} alt=""
             onClick={(e) => e.stopPropagation()}
             style={{
               maxWidth: 'calc(100vw - 200px)',
               maxHeight: 'calc(100vh - 160px)',
               objectFit: 'contain',
               boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
             }} />
      )}
      {/* Top bar: counter + close */}
      <div style={{
        position: 'absolute', top: 22, left: 32, right: 32,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: 'var(--warm-white)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase',
      }}>
        <span style={{ opacity: 0.6 }}>{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <button onClick={onClose}
                aria-label="Close"
                style={{ appearance: 'none', background: 'transparent', border: 0, color: 'inherit', font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', cursor: 'pointer' }}>
          Close ✕
        </button>
      </div>

      {/* Side arrows */}
      {total > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setI(p => wrap(p - 1)); }}
                  aria-label="Previous"
                  style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', appearance: 'none', background: 'transparent', border: 0, color: 'var(--warm-white)', opacity: 0.65, fontSize: 40, lineHeight: 1, padding: 12, cursor: 'pointer' }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); setI(p => wrap(p + 1)); }}
                  aria-label="Next"
                  style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', appearance: 'none', background: 'transparent', border: 0, color: 'var(--warm-white)', opacity: 0.65, fontSize: 40, lineHeight: 1, padding: 12, cursor: 'pointer' }}>›</button>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Lightbox video — full-bleed player with native controls.
// Honours `clipStart`/`clipEnd` so the user can scrub freely
// but auto-loop resets to start when end is reached.
// ────────────────────────────────────────────────────────────
function LightboxVideo({ item }) {
  const ref = useRef(null);
  const onTimeUpdate = () => {
    const v = ref.current;
    if (!v) return;
    if (item.clipEnd != null && v.currentTime >= item.clipEnd) {
      try { v.currentTime = item.clipStart || 0; } catch {}
    }
  };
  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      autoPlay
      controls
      muted
      playsInline
      preload="auto"
      onClick={(e) => e.stopPropagation()}
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={(e) => {
        if (item.clipStart != null) {
          try { e.currentTarget.currentTime = item.clipStart; } catch {}
        }
      }}
      style={{
        maxWidth: 'calc(100vw - 200px)',
        maxHeight: 'calc(100vh - 160px)',
        objectFit: 'contain',
        boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
        background: '#000',
      }}
    />
  );
}

// ────────────────────────────────────────────────────────────
// Tag chip
// ────────────────────────────────────────────────────────────
function ExpTag({ children, on, onClick, dark }) {
  const palette = dark
    ? { fg: on ? 'var(--bronze)' : 'rgba(244,242,238,0.65)', border: on ? 'var(--bronze)' : 'rgba(244,242,238,0.2)' }
    : { fg: on ? 'var(--bronze)' : 'var(--charcoal)', border: on ? 'var(--bronze)' : 'var(--hairline-bronze)' };
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none',
        background: 'transparent',
        padding: '6px 12px',
        marginRight: 6, marginBottom: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 9.5,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: palette.fg,
        opacity: onClick ? 1 : 0.78,
        border: '1px solid ' + palette.border,
        borderRadius: 999,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'color 220ms, border-color 220ms, opacity 220ms',
      }}>
      {children}
    </button>
  );
}

// ────────────────────────────────────────────────────────────
// Featured Case — large image-led module
// All cards left-align the carousel for a consistent rhythm.
// (No more alternating flip — the eye lands on imagery first,
// every time, which feels closer to an archive than a magazine.)
// ────────────────────────────────────────────────────────────
function FeaturedCase({ project, index, onOpen, onOpenLightbox }) {
  return (
    <article style={{
      padding: '64px 96px',
      borderTop: '1px solid var(--hairline-bronze-soft)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Index strip */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 36,
        }}>
          <Mono color="var(--bronze)" size={10}>{`§ 0${index + 1}`}</Mono>
          <Mono color="var(--charcoal)" size={9} style={{ opacity: 0.4 }}>{`Featured · ${project.label}`}</Mono>
        </div>

        <div style={{
          display: 'grid',
          // minmax(0, …) so the grid honors the 7:5 ratio even when a
          // column's intrinsic min-content (e.g. long unbroken tag strings,
          // wide media inside the copy column) would otherwise force it
          // wider. Without this RTPS expanded to 882px / 301px instead of
          // 690px / 493px.
          gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
          gap: 64,
          alignItems: 'start',
        }}>
          {/* Carousel column — always left-aligned */}
          <div>
            <ExpCarousel images={project.images} ratio="16 / 10"
                          onOpenLightbox={(idx) => onOpenLightbox(project.images, idx)} />
          </div>

          {/* Copy column — strategic-led, role-forward */}
          <div>
            {/* Project-type chip — sits above title for instant classification */}
            {project.projectType && (
              <div style={{ marginBottom: 18 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: 9.5,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--bronze)',
                  border: '1px solid var(--bronze)',
                  borderRadius: 999,
                }}>{project.projectType}</span>
              </div>
            )}

            <h2 style={{
              margin: 0,
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 40, lineHeight: 1.1,
              letterSpacing: '-0.008em',
              color: 'var(--charcoal)',
            }}>{project.title}</h2>

            {/* Role — promoted to a prominent strapline, not metadata */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--hairline-bronze)' }}>
              <Mono color="var(--bronze)" size={9}>Role</Mono>
              <div style={{
                marginTop: 6,
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 19, lineHeight: 1.3, color: 'var(--charcoal)',
                letterSpacing: '-0.002em',
              }}>
                {project.role}
              </div>
            </div>

            <p style={{
              marginTop: 24,
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 18, lineHeight: 1.5,
              color: 'var(--charcoal)', opacity: 0.88,
            }}>{project.tagline}</p>

            {/* Strategic Scope — visible indexed list (only if provided) */}
            {project.scope && project.scope.length > 0 && (
              <div style={{
                marginTop: 28, padding: '20px 22px',
                background: 'var(--warm-grey)',
                borderLeft: '2px solid var(--bronze)',
              }}>
                <Mono color="var(--bronze)" size={9}>Strategic Scope</Mono>
                <ul style={{
                  marginTop: 12, padding: 0,
                  listStyle: 'none',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 18, rowGap: 6,
                }}>
                  {project.scope.map(s => (
                    <li key={s} style={{
                      position: 'relative', paddingLeft: 14,
                      fontSize: 13.5, lineHeight: 1.5, color: 'var(--charcoal)',
                    }}>
                      <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--bronze)' }}>·</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meta rows — Client / Agency / Year (Role moved above) */}
            <div style={{
              marginTop: 28, paddingTop: 22,
              borderTop: '1px solid var(--hairline-bronze)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {[
                ['Client', project.client],
                project.agency ? ['Agency', project.agency] : null,
                ['Year',   project.year],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', columnGap: 18 }}>
                  <Mono color="var(--bronze)" size={9}>{k}</Mono>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--charcoal)' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* View project */}
            <button onClick={() => onOpen(project)}
                    style={{
                      marginTop: 28,
                      appearance: 'none', background: 'transparent',
                      border: 0, padding: 0, cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', fontSize: 10.5,
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: 'var(--bronze)',
                    }}>
              View project →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────
// Archive Card — thumb + small meta, click opens detail
// ────────────────────────────────────────────────────────────
function ArchiveCard({ project, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: 'none', background: 'transparent', border: 0, padding: 0,
        textAlign: 'left', cursor: 'pointer',
        fontFamily: 'inherit', color: 'inherit',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        background: 'var(--charcoal)',
      }}>
        <img src={(project.images.find(im => im.type !== 'video') || project.images[0]).src} alt=""
             style={{
               position: 'absolute', inset: 0,
               width: '100%', height: '100%',
               objectFit: 'cover',
               filter: hover ? 'none' : 'grayscale(60%)',
               transform: hover ? 'scale(1.02)' : 'scale(1)',
               transition: 'filter 420ms, transform 620ms cubic-bezier(0.32,0.05,0.2,1)',
             }} />
        {/* Year tag */}
        <div style={{
          position: 'absolute', right: 14, bottom: 12,
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--warm-white)', opacity: 0.85,
          mixBlendMode: 'difference',
        }}>{project.year}</div>
      </div>
      <div style={{ marginTop: 16 }}>
        <h4 style={{
          margin: 0,
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 19, lineHeight: 1.2, color: 'var(--charcoal)',
        }}>{project.title}</h4>
        <div style={{
          marginTop: 6,
          fontSize: 12.5, lineHeight: 1.45,
          color: 'var(--charcoal)', opacity: 0.65,
        }}>{project.client}</div>
        <div style={{
          marginTop: 8,
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--bronze)', opacity: 0.85,
        }}>{project.discipline}</div>
      </div>
    </button>
  );
}

// ────────────────────────────────────────────────────────────
// Detail Modal — slide-in panel from the right
// ────────────────────────────────────────────────────────────
function DetailModal({ project, onClose, onOpenLightbox }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 900,
      background: 'rgba(15,15,14,0.55)',
      display: 'flex', justifyContent: 'flex-end',
      animation: 'expFadeBg 240ms ease',
    }}>
      <style>{`
        @keyframes expFadeBg { from { background: rgba(15,15,14,0); } to { background: rgba(15,15,14,0.55); } }
        @keyframes expSlideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
      <aside onClick={(e) => e.stopPropagation()} style={{
        width: 'min(880px, 92vw)',
        height: '100vh',
        background: 'var(--warm-white)',
        overflowY: 'auto',
        animation: 'expSlideIn 420ms cubic-bezier(0.32,0.05,0.2,1)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.18)',
      }}>
        {/* Sticky header bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 2,
          background: 'var(--warm-white)',
          padding: '20px 40px',
          borderBottom: '1px solid var(--hairline-bronze-soft)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Mono color="var(--charcoal)" size={9} style={{ opacity: 0.5 }}>
            {project.discipline || project.label} · {project.year}
          </Mono>
          <button onClick={onClose}
                  style={{ appearance: 'none', background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
                           fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
                           textTransform: 'uppercase', color: 'var(--bronze)' }}>
            Close ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '48px 56px 80px' }}>
          {/* Project-type chip */}
          {project.projectType && (
            <div style={{ marginBottom: 18 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)', fontSize: 9.5,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--bronze)',
                border: '1px solid var(--bronze)',
                borderRadius: 999,
              }}>{project.projectType}</span>
            </div>
          )}

          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 44, lineHeight: 1.08,
            letterSpacing: '-0.008em',
            color: 'var(--charcoal)',
            maxWidth: 700,
          }}>{project.title}</h2>

          {/* Role — prominent strapline */}
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--hairline-bronze)' }}>
            <Mono color="var(--bronze)" size={9}>Role</Mono>
            <div style={{
              marginTop: 6,
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 22, lineHeight: 1.3, color: 'var(--charcoal)',
              letterSpacing: '-0.002em',
            }}>
              {project.role}
            </div>
          </div>

          <p style={{
            marginTop: 24,
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 20, lineHeight: 1.45,
            color: 'var(--charcoal)', opacity: 0.88,
            maxWidth: 680,
          }}>{project.tagline}</p>

          {/* Strategic Scope — visible indexed list */}
          {project.scope && project.scope.length > 0 && (
            <div style={{
              marginTop: 28, padding: '22px 26px',
              background: 'var(--warm-grey)',
              borderLeft: '2px solid var(--bronze)',
            }}>
              <Mono color="var(--bronze)" size={9}>Strategic Scope</Mono>
              <ul style={{
                marginTop: 12, padding: 0,
                listStyle: 'none',
                display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20, rowGap: 6,
              }}>
                {project.scope.map(s => (
                  <li key={s} style={{
                    position: 'relative', paddingLeft: 14,
                    fontSize: 14, lineHeight: 1.5, color: 'var(--charcoal)',
                  }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--bronze)' }}>·</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Carousel */}
          <div style={{ marginTop: 36 }}>
            <ExpCarousel images={project.images} ratio="16 / 9"
                          onOpenLightbox={(idx) => onOpenLightbox(project.images, idx)} />
          </div>

          {/* Outcome — culminating intent statement */}
          {project.outcome && (
            <div style={{ marginTop: 36 }}>
              <Mono color="var(--bronze)" size={9}>Outcome</Mono>
              <p style={{
                marginTop: 10,
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 19, lineHeight: 1.5,
                color: 'var(--charcoal)',
                maxWidth: 720,
              }}>{project.outcome}</p>
            </div>
          )}

          {/* Body copy */}
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            {project.body.map((p, i) => (
              <p key={i} style={{
                margin: 0,
                fontSize: 15.5, lineHeight: 1.78,
                color: 'var(--charcoal)', opacity: 0.85,
              }}>{p}</p>
            ))}
          </div>

          {/* External link block — optional. Used for projects with a
              dedicated public-facing site (e.g. Requiem in Motion). */}
          {project.link && (
            <div style={{
              marginTop: 28, paddingTop: 22,
              borderTop: '1px solid var(--hairline-bronze)',
              maxWidth: 720,
            }}>
              {project.link.note && (
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontSize: 15.5, lineHeight: 1.6,
                  color: 'var(--charcoal)', opacity: 0.82,
                }}>{project.link.note}</p>
              )}
              <a href={project.link.href}
                 target="_blank" rel="noopener noreferrer"
                 style={{
                   marginTop: project.link.note ? 14 : 0,
                   display: 'inline-block',
                   fontFamily: 'var(--font-mono)', fontSize: 10.5,
                   letterSpacing: '0.22em', textTransform: 'uppercase',
                   color: 'var(--bronze)',
                 }}>
                {project.link.label || 'Visit project website'} ↗
              </a>
            </div>
          )}

          {/* Meta block — Client / Agency / Year (Role promoted above) */}
          <div style={{
            marginTop: 40, paddingTop: 24,
            borderTop: '1px solid var(--hairline-bronze)',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            {[
              ['Client', project.client],
              project.agency ? ['Agency', project.agency] : null,
              ['Year',   project.year],
            ].filter(Boolean).map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', columnGap: 20, alignItems: 'baseline' }}>
                <Mono color="var(--bronze)" size={9}>{k}</Mono>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--charcoal)' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <Mono color="var(--bronze)" size={9} style={{ marginBottom: 12, display: 'block' }}>Discipline tags</Mono>
              <div>{project.tags.map(t => <ExpTag key={t}>{t}</ExpTag>)}</div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Filter bar — sticky chip strip
// ────────────────────────────────────────────────────────────
function FilterBar({ disciplines, active, onChange }) {
  return (
    <div style={{
      position: 'sticky',
      top: 76, // sits below SiteNav
      zIndex: 5,
      background: 'var(--warm-white)',
      borderTop: '1px solid var(--hairline-bronze-soft)',
      borderBottom: '1px solid var(--hairline-bronze-soft)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '18px 96px',
        display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
      }}>
        <Mono color="var(--bronze)" size={9} style={{ marginRight: 4 }}>Filter</Mono>
        <div>
          <ExpTag on={active === 'All'} onClick={() => onChange('All')}>All</ExpTag>
          {disciplines.map(d => (
            <ExpTag key={d} on={active === d} onClick={() => onChange(d)}>{d}</ExpTag>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ExpCarousel, ExpLightbox, ExpTag, FeaturedCase, ArchiveCard, DetailModal, FilterBar });
