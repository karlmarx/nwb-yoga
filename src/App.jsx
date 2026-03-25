import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import { TIERS } from "./data";
import { ANIMATIONS, ANIMATION_ORDER, ANIM_GROUPS } from "./animations";

// ========== Constants ==========
const REF_W = 360;

// ========== Utilities ==========

function parseHoldTime(hold) {
  if (!hold || hold === "\u2014") return 0;
  const s = hold.toLowerCase().trim();
  // "3 × 15–20s"
  const setSecRange = s.match(/(\d+)\s*[×x]\s*(\d+)\s*[-–]\s*(\d+)\s*s/);
  if (setSecRange) return +setSecRange[1] * Math.round((+setSecRange[2] + +setSecRange[3]) / 2);
  // "60s", "15–20s"
  const secRange = s.match(/(\d+)\s*[-–]\s*(\d+)\s*s\b/);
  if (secRange) return Math.round((+secRange[1] + +secRange[2]) / 2);
  // "3 × 20s"
  const setsSec = s.match(/(\d+)\s*[×x]\s*(\d+)\s*s\b/);
  if (setsSec) return +setsSec[1] * +setsSec[2];
  // "60s"
  const pureSec = s.match(/^(\d+)\s*s$/);
  if (pureSec) return +pureSec[1];
  // "3–5 min"
  const minRange = s.match(/(\d+)\s*[-–]\s*(\d+)\s*min/);
  if (minRange) return +minRange[1] * 60;
  // "5 min"
  const min = s.match(/(\d+)\s*min/);
  if (min) return +min[1] * 60;
  // "5 breaths / side"
  const breathSide = s.match(/(\d+)\s*breaths?\s*\/\s*side/i);
  if (breathSide) return +breathSide[1] * 6 * 2;
  // "5 breaths × 3"
  const breathSets = s.match(/(\d+)\s*breaths?\s*[×x]\s*(\d+)/i);
  if (breathSets) return +breathSets[1] * 6 * +breathSets[2];
  // "5 breaths"
  const breath = s.match(/(\d+)\s*breaths?/);
  if (breath) return +breath[1] * 6;
  // "3 × 10", "3 × 5 / side"
  const setsReps = s.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (setsReps) {
    let total = +setsReps[1] * +setsReps[2] * 3 + (+setsReps[1] - 1) * 15;
    if (/\/\s*side/i.test(s)) total *= 2;
    return total;
  }
  // "5 / direction / arm" or "5 / side"
  if (/\/\s*(side|direction|arm)/i.test(s)) {
    const n = s.match(/(\d+)/);
    return n ? +n[1] * 6 * 2 : 60;
  }
  // "8 rounds", "5 rounds"
  const rounds = s.match(/(\d+)\s*rounds?/);
  if (rounds) return +rounds[1] * 8;
  // "max"
  if (/max/i.test(s)) {
    const sets = s.match(/(\d+)\s*[×x]/);
    return sets ? +sets[1] * 30 : 30;
  }
  // "3–5 attempts"
  if (/attempts?/i.test(s)) return 90;
  // Fallback
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
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 528;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    osc.start(now);
    osc.stop(now + 2.5);
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.frequency.value = 396;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 3);
    osc2.start(now);
    osc2.stop(now + 3);
  } catch (e) {}
}

let wakeLock = null;
async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen");
  } catch (e) {}
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
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: canvasHeight, display: "block" }}
      />
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
      style={{
        marginTop: 8, background: "white", borderRadius: 10,
        overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {animationIds.length > 1 && (
        <div style={{
          display: "flex", gap: 4, padding: "8px 10px",
          flexWrap: "wrap", justifyContent: "center",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
        }}>
          {animationIds.map((id, i) => {
            const a = ANIMATIONS[id];
            return (
              <button key={id} onClick={() => setActiveIdx(i)} style={{
                padding: "4px 10px", border: "none", borderRadius: 12, cursor: "pointer",
                background: activeIdx === i ? "#2D2D2D" : "rgba(0,0,0,0.04)",
                color: activeIdx === i ? "white" : "#888",
                fontSize: 10, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
                transition: "all 0.15s",
              }}>
                {a?.name?.split("(")[0]?.split("\u2014")[0]?.trim() || id}
              </button>
            );
          })}
        </div>
      )}
      <PoseCanvas animationId={currentId} />
      <div style={{
        padding: "6px 10px 8px", fontSize: 11, color: "#666",
        lineHeight: 1.4, borderTop: "1px solid rgba(0,0,0,0.04)",
      }}>
        {anim.safety}
      </div>
    </div>
  );
}

// ========== PoseCard ==========
function PoseCard({ pose }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={() => setExpanded(!expanded)} style={{
      padding: "12px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)",
      cursor: "pointer", background: expanded ? "rgba(0,0,0,0.02)" : "transparent",
      transition: "background 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Newsreader', Georgia, serif", fontSize: 16,
            fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3,
          }}>
            {pose.name}
            {pose.animations && (
              <span style={{ marginLeft: 6, fontSize: 10, color: "#A0522D", verticalAlign: "middle" }}>
                {"\u25B6"}
              </span>
            )}
          </div>
          {pose.sanskrit && (
            <div style={{
              fontSize: 12, color: "#888", fontStyle: "italic", marginTop: 2,
              fontFamily: "'Newsreader', Georgia, serif",
            }}>
              {pose.sanskrit}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
          {pose.hold && pose.hold !== "\u2014" && (
            <span style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 4,
              background: "rgba(0,0,0,0.06)", color: "#555",
              fontFamily: "monospace", whiteSpace: "nowrap",
            }}>
              {pose.hold}
            </span>
          )}
          <span style={{
            fontSize: 14, color: "#aaa",
            transform: expanded ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
          }}>
            {"\u203A"}
          </span>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {pose.animations && <InlineAnimations animationIds={pose.animations} />}
          {pose.breath && pose.breath !== "\u2014" && (
            <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
              <span style={{ color: "#999", minWidth: 55 }}>Breath</span>
              <span style={{ color: "#444" }}>{pose.breath}</span>
            </div>
          )}
          {pose.props && (
            <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
              <span style={{ color: "#999", minWidth: 55 }}>Props</span>
              <span style={{ color: "#444" }}>{pose.props}</span>
            </div>
          )}
          {pose.notes && (
            <div style={{ fontSize: 13, color: "#444", marginTop: 4, lineHeight: 1.5 }}>
              {pose.notes}
            </div>
          )}
          {pose.safety && (
            <div style={{
              fontSize: 12, color: "#8B4513", background: "rgba(139,69,19,0.06)",
              padding: "8px 10px", borderRadius: 6, marginTop: 4, lineHeight: 1.5,
              borderLeft: "3px solid rgba(139,69,19,0.3)",
            }}>
              {"\u26A1"} {pose.safety}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ========== Section ==========
function Section({ section, tierColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 16px", cursor: "pointer",
        background: open ? tierColor : "white", color: open ? "white" : "#1a1a1a",
        borderRadius: open ? "10px 10px 0 0" : 10,
        transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 17, fontWeight: 600 }}>
          {section.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 12, padding: "2px 8px", borderRadius: 4,
            background: open ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)",
            fontFamily: "monospace",
          }}>
            {section.time}
          </span>
          <span style={{
            fontSize: 18, transform: open ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
          }}>
            {"\u203A"}
          </span>
        </div>
      </div>
      {open && (
        <div style={{
          background: "white", borderRadius: "0 0 10px 10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)", overflow: "hidden",
        }}>
          {section.poses.map((pose, i) => (
            <PoseCard key={i} pose={pose} />
          ))}
        </div>
      )}
    </div>
  );
}

// ========== CircularCountdown ==========
function CircularCountdown({ remaining, total }) {
  const size = 160, sw = 8;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const progress = total > 0 ? remaining / total : 1;
  const offset = circ * (1 - progress);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(0,0,0,0.06)" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="#A0522D" strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
      </svg>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Newsreader', Georgia, serif",
        fontSize: 36, fontWeight: 300, color: "#1a1a1a",
      }}>
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
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "#F5F0EB", zIndex: 1000, overflowY: "auto",
      display: "flex", flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 8px" }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: "#999", textTransform: "uppercase" }}>
          {pose.section}
        </div>
        <button onClick={onExit} style={{
          background: "none", border: "none", fontSize: 20, color: "#999",
          cursor: "pointer", padding: "4px 8px",
        }}>{"\u2715"}</button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 20px" }}>
        <CircularCountdown remaining={timeLeft} total={totalTime} />

        <div style={{
          fontFamily: "'Newsreader', Georgia, serif", fontSize: 22, fontWeight: 600,
          color: "#1a1a1a", textAlign: "center", marginTop: 16, lineHeight: 1.2,
        }}>
          {pose.name}
        </div>
        {pose.sanskrit && (
          <div style={{
            fontFamily: "'Newsreader', Georgia, serif", fontSize: 14,
            color: "#888", fontStyle: "italic", marginTop: 4,
          }}>
            {pose.sanskrit}
          </div>
        )}

        {pose.animations && pose.animations.length > 0 && (
          <div style={{
            width: "100%", maxWidth: 400, marginTop: 16, borderRadius: 12,
            overflow: "hidden", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <PoseCanvas animationId={pose.animations[0]} />
          </div>
        )}

        <div style={{ width: "100%", maxWidth: 400, marginTop: 16 }}>
          {pose.breath && pose.breath !== "\u2014" && (
            <div style={{ display: "flex", gap: 8, fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: "#999", minWidth: 55 }}>Breath</span>
              <span style={{ color: "#444" }}>{pose.breath}</span>
            </div>
          )}
          {pose.notes && (
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginTop: 4 }}>
              {pose.notes}
            </div>
          )}
          {pose.safety && (
            <div style={{
              fontSize: 12, color: "#8B4513", background: "rgba(139,69,19,0.06)",
              padding: "8px 10px", borderRadius: 6, marginTop: 8, lineHeight: 1.5,
              borderLeft: "3px solid rgba(139,69,19,0.3)",
            }}>
              {"\u26A1"} {pose.safety}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "12px 20px 28px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, marginBottom: 12 }}>
          <button onClick={() => skip(-1)} disabled={idx === 0} style={{
            background: "none", border: "none", fontSize: 22, cursor: "pointer",
            color: idx === 0 ? "#ddd" : "#888", padding: 8,
          }}>{"\u23EE"}</button>
          <button onClick={togglePlay} style={{
            width: 56, height: 56, borderRadius: "50%", border: "none",
            background: tier.color, color: "white", fontSize: 20, cursor: "pointer",
            boxShadow: `0 4px 12px ${tier.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{playing ? "\u23F8" : "\u25B6"}</button>
          <button onClick={() => skip(1)} disabled={idx >= allPoses.length - 1} style={{
            background: "none", border: "none", fontSize: 22, cursor: "pointer",
            color: idx >= allPoses.length - 1 ? "#ddd" : "#888", padding: 8,
          }}>{"\u23ED"}</button>
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: "#999", marginBottom: 8 }}>
          Pose {idx + 1} of {allPoses.length}
        </div>
        <div style={{ height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", background: tier.color, borderRadius: 2,
            width: `${((idx + 1) / allPoses.length) * 100}%`,
            transition: "width 0.3s",
          }} />
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
    <div style={{ padding: "0 16px 32px" }}>
      <div style={{ fontSize: 12, color: "#999", textAlign: "center", marginBottom: 12 }}>
        <span style={{ color: "#2D2D2D", fontWeight: 600 }}>{"\u25CF"}</span> Active{" "}
        <span style={{ color: "#C0392B", fontWeight: 600 }}>{"\u25CF"}</span> Left leg (passive){" "}
        <span style={{ color: "#2E8B57", fontWeight: 600 }}>{"\u25CF"}</span> Glute activation
      </div>

      <div style={{
        display: "flex", gap: 6, padding: "0 0 12px",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {ANIMATION_ORDER.map((id, i) => (
          <button key={id} onClick={() => setActive(i)} style={{
            padding: "8px 14px", border: "none", borderRadius: 20, cursor: "pointer",
            background: active === i ? "#2D2D2D" : "white",
            color: active === i ? "white" : "#666",
            fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
            boxShadow: active === i ? "0 2px 8px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}>
            {ANIMATIONS[id].name.split("(")[0].split("\u2014")[0].trim()}
          </button>
        ))}
      </div>

      <div style={{
        background: "white", borderRadius: 14,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden", marginBottom: 12,
      }}>
        <PoseCanvas animationId={ANIMATION_ORDER[active]} />
      </div>

      <div style={{
        padding: "16px 18px", background: "white", borderRadius: 14,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: 12,
      }}>
        <div style={{
          fontFamily: "'Newsreader', Georgia, serif", fontSize: 20,
          fontWeight: 600, color: "#1a1a1a", marginBottom: 6,
        }}>
          {anim.name}
        </div>
        <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6, marginBottom: 12 }}>
          {anim.desc}
        </div>
        <div style={{
          fontSize: 13, color: "#8B4513", background: "rgba(139,69,19,0.05)",
          padding: "10px 12px", borderRadius: 8, lineHeight: 1.5,
          borderLeft: "3px solid rgba(139,69,19,0.25)",
        }}>
          {"\u26A1"} {anim.safety}
        </div>
      </div>

      {ANIM_GROUPS.map((group) => (
        <div key={group.title} style={{
          padding: "14px 16px", background: "rgba(0,0,0,0.03)",
          borderRadius: 12, marginBottom: 8,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: 1.5, color: "#999",
            textTransform: "uppercase", marginBottom: 8,
          }}>
            {group.title}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {group.ids.map((id) => {
              const i = ANIMATION_ORDER.indexOf(id);
              return (
                <button key={id} onClick={() => setActive(i)} style={{
                  padding: "6px 12px",
                  border: active === i ? "2px solid #2D2D2D" : "1px solid #ddd",
                  borderRadius: 8,
                  background: active === i ? "#2D2D2D" : "white",
                  color: active === i ? "white" : "#666",
                  fontSize: 11, cursor: "pointer", fontWeight: 600,
                }}>
                  {ANIMATIONS[id].name.split("(")[0].split("\u2014")[0].trim()}
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
    <div style={{ padding: "16px 20px 40px", textAlign: "center" }}>
      <div style={{
        padding: "12px 16px", borderRadius: 10,
        background: "rgba(139,69,19,0.06)", border: "1px solid rgba(139,69,19,0.15)",
        fontSize: 12, color: "#8B4513", lineHeight: 1.6, marginBottom: 16,
      }}>
        <strong>Medical Disclaimer:</strong> Confirm all exercises with your PT/Orthopedic Surgeon.
        Groin pain = Absolute Stop. This app does not replace medical advice.
      </div>

      <div style={{ fontSize: 11, color: "#999", lineHeight: 1.8 }}>
        <div style={{ marginBottom: 4 }}>
          Hard constraints: NWB left {"\u00B7"} No active left iliopsoas
        </div>
        <div style={{ marginBottom: 8 }}>
          Soft notes: bilateral FAI/labral tears {"\u2014"} hip flexion past 90{"\u00B0"} at practitioner's discretion
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <a href="https://nwbfit.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            color: "#A0522D", textDecoration: "none", fontWeight: 600,
          }}>
            NWB Fit {"\u2192"}
          </a>
          <a href="https://github.com/karlmarx/nwb-yoga" target="_blank" rel="noopener noreferrer" style={{
            color: "#888", textDecoration: "none",
          }}>
            GitHub
          </a>
        </div>
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
    <div style={{
      minHeight: "100vh", background: "#F5F0EB",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {timerTier && (
        <TimerMode tier={timerTier} onExit={() => setTimerTier(null)} />
      )}

      <div style={{ padding: "28px 20px 12px", textAlign: "center" }}>
        <div style={{
          fontSize: 11, letterSpacing: 3, color: "#999",
          textTransform: "uppercase", marginBottom: 6,
        }}>
          NWB Practice
        </div>
        <h1 style={{
          fontFamily: "'Newsreader', Georgia, serif", fontSize: 32,
          fontWeight: 400, color: "#1a1a1a", margin: 0, lineHeight: 1.1,
        }}>
          NWB Yoga
        </h1>
        <div style={{
          fontSize: 12, color: "#999", marginTop: 8, lineHeight: 1.5,
          maxWidth: 300, margin: "8px auto 0",
        }}>
          Left femoral neck stress fracture protocol. Strict NWB {"\u00B7"} Zero left hip flexor activation.
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "center", gap: 4, padding: "8px 16px 16px",
      }}>
        {[
          { id: "practice", label: "Practice" },
          { id: "guide", label: "Pose Guide" },
        ].map((v) => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            padding: "8px 20px", border: "none", borderRadius: 20, cursor: "pointer",
            background: view === v.id ? "#2D2D2D" : "transparent",
            color: view === v.id ? "white" : "#888",
            fontSize: 13, fontWeight: 600, transition: "all 0.2s",
          }}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "practice" ? (
        <>
          <div style={{
            display: "flex", gap: 6, padding: "0 16px", marginBottom: 20,
            justifyContent: "center",
          }}>
            {TIERS.map((t) => (
              <button key={t.id} onClick={() => setActiveTier(t.id)} style={{
                flex: 1, maxWidth: 130, padding: "12px 8px", border: "none",
                borderRadius: 10, cursor: "pointer",
                background: activeTier === t.id ? t.color : "white",
                color: activeTier === t.id ? "white" : "#555",
                boxShadow: activeTier === t.id ? `0 4px 12px ${t.color}44` : "0 1px 3px rgba(0,0,0,0.06)",
                transition: "all 0.25s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              }}>
                <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 18, fontWeight: 600 }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{t.duration}</div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>{t.subtitle}</div>
              </button>
            ))}
          </div>

          <div style={{
            margin: "0 16px 12px", padding: "12px 16px", borderRadius: 10,
            background: `${tier.color}0D`, border: `1px solid ${tier.color}22`,
            fontSize: 13, color: "#555", lineHeight: 1.5,
            fontFamily: "'Newsreader', Georgia, serif", fontStyle: "italic",
          }}>
            {tier.description}
          </div>

          {/* Start Practice button */}
          <div style={{ padding: "0 16px 16px", textAlign: "center" }}>
            <button onClick={() => setTimerTier(tier)} style={{
              padding: "10px 28px", border: `2px solid ${tier.color}`,
              borderRadius: 24, background: "transparent",
              color: tier.color, fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
              fontFamily: "'Newsreader', Georgia, serif",
            }}>
              Start {tier.name} Practice {"\u25B6"}
            </button>
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            {tier.sections.map((section, i) => (
              <Section key={i} section={section} tierColor={tier.color} />
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
