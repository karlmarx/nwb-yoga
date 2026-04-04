import { useState, useEffect, useRef, useMemo } from "react";
import { TIERS } from "./data";
import { ANIMATIONS, ANIMATION_ORDER, ANIM_GROUPS } from "./animations";
import "./styles.css";

// ========== Constants ==========
const REF_W = 360;
const TIER_ICONS = { prana: "☽", tapas: "☉", agni: "🔥" };

// ========== Utilities ==========

function parseHoldTime(hold) {
  if (!hold || hold === "—") return 0;
  const s = hold.toLowerCase().trim();
  const setSecRange = s.match(/(\d+)\s*[×x]\s*(\d+)\s*[-–]\s*(\d+)\s*s/);
  if (setSecRange) return +setSecRange[1] * Math.round((+setSecRange[2] + +setSecRange[3]) / 2);
  const secRange = s.match(/(\d+)\s*[-–]\s*(\d+)\s*s\b/);
  if (secRange) return Math.round((+secRange[1] + +secRange[2]) / 2);
  const setsSec = s.match(/(\d+)\s*[×x]\s*(\d+)\s*s\b/);
  if (setsSec) return +setsSec[1] * +setsSec[2];
  const pureSec = s.match(/^(\d+)\s*s$/);
  if (pureSec) return +pureSec[1];
  const minRange = s.match(/(\d+)\s*[-–]\s*(\d+)\s*min/);
  if (minRange) return +minRange[1] * 60;
  const min = s.match(/(\d+)\s*min/);
  if (min) return +min[1] * 60;
  const breathSide = s.match(/(\d+)\s*breaths?\s*\/\s*side/i);
  if (breathSide) return +breathSide[1] * 6 * 2;
  const breathSets = s.match(/(\d+)\s*breaths?\s*[×x]\s*(\d+)/i);
  if (breathSets) return +breathSets[1] * 6 * +breathSets[2];
  const breath = s.match(/(\d+)\s*breaths?/);
  if (breath) return +breath[1] * 6;
  const setsReps = s.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (setsReps) {
    let total = +setsReps[1] * +setsReps[2] * 3 + (+setsReps[1] - 1) * 15;
    if (/\/\s*side/i.test(s)) total *= 2;
    return total;
  }
  if (/\/\s*(side|direction|arm)/i.test(s)) {
    const n = s.match(/(\d+)/);
    return n ? +n[1] * 6 * 2 : 60;
  }
  const rounds = s.match(/(\d+)\s*rounds?/);
  if (rounds) return +rounds[1] * 8;
  if (/max/i.test(s)) {
    const sets = s.match(/(\d+)\s*[×x]/);
    return sets ? +sets[1] * 30 : 30;
  }
  if (/attempts?/i.test(s)) return 90;
  const num = s.match(/(\d+)/);
  if (num) return +num[1] * 6;
  return 30;
}

let audioCtx = null;
function playBell() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.frequency.value = 528; osc.type = "sine";
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    osc.start(now); osc.stop(now + 2.5);
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.connect(gain2); gain2.connect(audioCtx.destination);
    osc2.frequency.value = 396; osc2.type = "sine";
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 3);
    osc2.start(now); osc2.stop(now + 3);
  } catch (e) {}
}

let wakeLock = null;
async function requestWakeLock() {
  try { if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen"); } catch (e) {}
}
function releaseWakeLock() {
  if (wakeLock) { wakeLock.release(); wakeLock = null; }
}

// ========== PoseCanvas ==========
function PoseCanvas({ animationId, paused }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const anim = ANIMATIONS[animationId];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setContainerWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !anim || containerWidth === 0) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = containerWidth;
    const scale = w / REF_W;
    const h = anim.canvasHeight * scale;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      anim.draw(ctx, w, h, t);
      if (!paused) t += 0.05;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [animationId, anim, containerWidth, paused]);

  if (!anim) return null;
  const scale = containerWidth > 0 ? containerWidth / REF_W : 1;
  const canvasHeight = containerWidth > 0 ? anim.canvasHeight * scale : anim.canvasHeight;

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: canvasHeight, display: "block" }} />
    </div>
  );
}

// ========== InlineAnimations ==========
function InlineAnimations({ animationIds }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchRef = useRef(null);

  if (!animationIds || animationIds.length === 0) return null;
  const currentId = animationIds[activeIdx];
  const anim = ANIMATIONS[currentId];
  if (!anim) return null;

  const onTouchStart = (e) => { touchRef.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchRef.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && activeIdx < animationIds.length - 1) setActiveIdx(activeIdx + 1);
      if (diff > 0 && activeIdx > 0) setActiveIdx(activeIdx - 1);
    }
    touchRef.current = null;
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="inline-anim-container"
    >
      {animationIds.length > 1 && (
        <div className="inline-anim-tabs">
          {animationIds.map((id, i) => {
            const a = ANIMATIONS[id];
            return (
              <button
                key={id}
                onClick={() => setActiveIdx(i)}
                className={`inline-anim-tab ${activeIdx === i ? "active" : ""}`}
              >
                {a?.name?.split("(")[0]?.split("—")[0]?.trim() || id}
              </button>
            );
          })}
        </div>
      )}
      <PoseCanvas animationId={currentId} />
      <div className="inline-anim-safety">{anim.safety}</div>
    </div>
  );
}

// ========== PoseCard ==========
function PoseCard({ pose }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`pose-card ${expanded ? "expanded" : ""}`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div className="pose-name">
            {pose.name}
            {pose.animations && <span className="pose-anim-indicator" />}
          </div>
          {pose.sanskrit && <div className="pose-sanskrit">{pose.sanskrit}</div>}
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
          {pose.hold && pose.hold !== "—" && (
            <span className="pose-hold-badge">{pose.hold}</span>
          )}
          <span className={`pose-expand-icon ${expanded ? "open" : ""}`}>›</span>
        </div>
      </div>

      {expanded && (
        <div className="pose-details">
          {pose.animations && <InlineAnimations animationIds={pose.animations} />}
          {pose.breath && pose.breath !== "—" && (
            <div className="pose-detail-row">
              <span className="pose-detail-label">Breath</span>
              <span className="pose-detail-value">{pose.breath}</span>
            </div>
          )}
          {pose.props && (
            <div className="pose-detail-row">
              <span className="pose-detail-label">Props</span>
              <span className="pose-detail-value">{pose.props}</span>
            </div>
          )}
          {pose.notes && <div className="pose-notes">{pose.notes}</div>}
          {pose.safety && <div className="pose-safety">⚡ {pose.safety}</div>}
        </div>
      )}
    </div>
  );
}

// ========== Section ==========
function Section({ section, tierColor, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="section-wrapper" style={{ animationDelay: `${index * 0.05}s` }}>
      <div
        onClick={() => setOpen(!open)}
        className="section-header"
        style={{
          background: open ? tierColor : "white",
          color: open ? "white" : "#1a1a1a",
          borderRadius: open ? "12px 12px 0 0" : 12,
          boxShadow: open
            ? `0 4px 16px ${tierColor}33`
            : "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="section-title">{section.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="section-time"
            style={{
              background: open ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
            }}
          >
            {section.time}
          </span>
          <span className={`section-chevron ${open ? "open" : ""}`}>›</span>
        </div>
      </div>
      {open && (
        <div className="section-content">
          {section.poses.map((pose, i) => (
            <PoseCard key={i} pose={pose} />
          ))}
        </div>
      )}
    </div>
  );
}

// ========== CircularCountdown ==========
function CircularCountdown({ remaining, total, playing }) {
  const size = 172, sw = 6;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const progress = total > 0 ? remaining / total : 1;
  const offset = circ * (1 - progress);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className={`countdown-container ${playing ? "playing" : ""}`}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(0,0,0,0.04)" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="#A0522D" strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }} />
      </svg>
      <div className="countdown-time">
        {mins}:{secs.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

// ========== TimerMode ==========
function TimerMode({ tier, onExit }) {
  const allPoses = useMemo(() => {
    const poses = [];
    tier.sections.forEach((section) => {
      section.poses.forEach((pose) => {
        poses.push({ ...pose, section: section.title });
      });
    });
    return poses;
  }, [tier]);

  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const pose = allPoses[idx];

  useEffect(() => {
    const t = parseHoldTime(pose?.hold) || 15;
    setTimeLeft(t);
    setTotalTime(t);
  }, [idx, pose?.hold]);

  useEffect(() => {
    if (playing) requestWakeLock();
    return () => releaseWakeLock();
  }, [playing]);

  useEffect(() => {
    if (!playing || timeLeft <= 0) return;
    const id = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playBell();
          setTimeout(() => {
            if (idx < allPoses.length - 1) setIdx((i) => i + 1);
            else setPlaying(false);
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(id);
  }, [playing, timeLeft, idx, allPoses.length]);

  if (!pose) return null;

  const skip = (dir) => {
    const next = idx + dir;
    if (next >= 0 && next < allPoses.length) setIdx(next);
  };

  const togglePlay = () => {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    setPlaying((p) => !p);
  };

  return (
    <div className="timer-overlay">
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      <div className="timer-header">
        <div className="timer-section-label">{pose.section}</div>
        <button onClick={onExit} className="timer-close-btn">✕</button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 20px" }}>
        <CircularCountdown remaining={timeLeft} total={totalTime} playing={playing} />

        <div className="timer-pose-name">{pose.name}</div>
        {pose.sanskrit && <div className="timer-sanskrit">{pose.sanskrit}</div>}

        {pose.animations && pose.animations.length > 0 && (
          <div className="timer-canvas-wrapper">
            <PoseCanvas animationId={pose.animations[0]} />
          </div>
        )}

        <div style={{ width: "100%", maxWidth: 400, marginTop: 20 }}>
          {pose.breath && pose.breath !== "—" && (
            <div className="pose-detail-row" style={{ marginBottom: 6 }}>
              <span className="pose-detail-label">Breath</span>
              <span className="pose-detail-value">{pose.breath}</span>
            </div>
          )}
          {pose.notes && <div className="pose-notes">{pose.notes}</div>}
          {pose.safety && <div className="pose-safety" style={{ marginTop: 10 }}>⚡ {pose.safety}</div>}
        </div>
      </div>

      <div className="timer-controls">
        <div className="timer-transport">
          <button onClick={() => skip(-1)} disabled={idx === 0} className="timer-skip-btn">⏮</button>
          <button
            onClick={togglePlay}
            className="timer-play-btn"
            style={{
              background: tier.color,
              boxShadow: `0 4px 16px ${tier.color}44`,
            }}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button onClick={() => skip(1)} disabled={idx >= allPoses.length - 1} className="timer-skip-btn">⏭</button>
        </div>
        <div className="timer-progress-label">
          Pose {idx + 1} of {allPoses.length}
        </div>
        <div className="timer-progress-bar">
          <div
            className="timer-progress-fill"
            style={{
              background: tier.color,
              width: `${((idx + 1) / allPoses.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ========== AnimationGuide ==========
function AnimationGuide() {
  const [active, setActive] = useState(0);
  const anim = ANIMATIONS[ANIMATION_ORDER[active]];

  return (
    <div className="anim-guide">
      <div className="anim-legend">
        <span className="anim-legend-dot" style={{ background: "#2D2D2D" }} /> Active{" "}
        <span className="anim-legend-dot" style={{ background: "#C0392B" }} /> Left leg (passive){" "}
        <span className="anim-legend-dot" style={{ background: "#2E8B57" }} /> Glute activation
      </div>

      <div className="anim-tabs">
        {ANIMATION_ORDER.map((id, i) => (
          <button
            key={id}
            onClick={() => setActive(i)}
            className={`anim-tab ${active === i ? "active" : ""}`}
          >
            {ANIMATIONS[id].name.split("(")[0].split("—")[0].trim()}
          </button>
        ))}
      </div>

      <div className="anim-canvas-wrapper">
        <PoseCanvas animationId={ANIMATION_ORDER[active]} />
      </div>

      <div className="anim-info-card">
        <div className="anim-info-name">{anim.name}</div>
        <div className="anim-info-desc">{anim.desc}</div>
        <div className="anim-info-safety">⚡ {anim.safety}</div>
      </div>

      {ANIM_GROUPS.map((group) => (
        <div key={group.title} className="anim-group">
          <div className="anim-group-title">{group.title}</div>
          <div className="anim-group-btns">
            {group.ids.map((id) => {
              const i = ANIMATION_ORDER.indexOf(id);
              return (
                <button
                  key={id}
                  onClick={() => setActive(i)}
                  className={`anim-group-btn ${active === i ? "active" : ""}`}
                >
                  {ANIMATIONS[id].name.split("(")[0].split("—")[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ========== Footer ==========
function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-disclaimer">
        <strong>Medical Disclaimer:</strong> Confirm all exercises with your PT/Orthopedic Surgeon.
        Groin pain = Absolute Stop. This app does not replace medical advice.
      </div>
      <div className="footer-constraints">
        <div style={{ marginBottom: 4 }}>Hard constraints: NWB left · No active left iliopsoas</div>
        <div style={{ marginBottom: 12 }}>Soft notes: bilateral FAI/labral tears — hip flexion past 90° at practitioner's discretion</div>
      </div>
      <div className="footer-links">
        <a href="https://nfit.93.fyi" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-primary">
          NWB Fit →
        </a>
        <a href="https://github.com/karlmarx/nwb-yoga" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-secondary">
          GitHub
        </a>
      </div>
    </div>
  );
}

// ========== Main App ==========
export default function App() {
  const [view, setView] = useState("practice");
  const [activeTier, setActiveTier] = useState("tapas");
  const [timerTier, setTimerTier] = useState(null);
  const tier = TIERS.find((t) => t.id === activeTier);

  return (
    <div className="app-shell">
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {timerTier && <TimerMode tier={timerTier} onExit={() => setTimerTier(null)} />}

      {/* Header */}
      <div className="app-header">
        <div className="header-eyebrow">NWB Practice</div>
        <h1 className="header-title">Yoga</h1>
        <div className="header-subtitle">
          Left femoral neck stress fracture protocol. Strict NWB · Zero left hip flexor activation.
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        {[
          { id: "practice", label: "Practice" },
          { id: "guide", label: "Pose Guide" },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`view-toggle-btn ${view === v.id ? "active" : ""}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === "practice" ? (
        <>
          {/* Tier Selector */}
          <div className="tier-selector">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={`tier-card ${activeTier === t.id ? "active" : ""}`}
                style={{
                  background: activeTier === t.id ? t.color : undefined,
                  boxShadow: activeTier === t.id ? `0 6px 20px ${t.color}44` : undefined,
                  "--tier-color": t.color,
                }}
              >
                <div className="tier-icon">{TIER_ICONS[t.id]}</div>
                <div className="tier-name">{t.name}</div>
                <div className="tier-duration">{t.duration}</div>
                <div className="tier-subtitle">{t.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Tier Description */}
          <div
            key={activeTier}
            className="tier-description"
            style={{
              background: `${tier.color}0D`,
              border: `1px solid ${tier.color}22`,
            }}
          >
            {tier.description}
          </div>

          {/* Start Button */}
          <button
            onClick={() => setTimerTier(tier)}
            className="start-practice-btn"
            style={{
              background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`,
              boxShadow: `0 4px 16px ${tier.color}44`,
            }}
          >
            Start {tier.name} Practice ▶
          </button>

          {/* Sections */}
          <div style={{ padding: "0 16px 16px" }}>
            {tier.sections.map((section, i) => (
              <Section key={`${activeTier}-${i}`} section={section} tierColor={tier.color} index={i} />
            ))}
          </div>

          <Footer />
        </>
      ) : (
        <>
          <AnimationGuide />
          <Footer />
        </>
      )}
    </div>
  );
}
