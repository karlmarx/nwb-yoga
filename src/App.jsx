import { useState, useEffect, useRef, Fragment } from "react";
import { TIERS } from "./data";
import { ANIMATIONS, ANIMATION_ORDER } from "./animations";

// ========== PoseCanvas ==========
function PoseCanvas({ animationId }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const anim = ANIMATIONS[animationId];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !anim) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = anim.canvasHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      anim.draw(ctx, w, h, t);
      t += 0.05;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [animationId, anim]);

  if (!anim) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: anim.canvasHeight, display: "block" }}
    />
  );
}

// ========== InlineAnimations ==========
function InlineAnimations({ animationIds }) {
  const [activeIdx, setActiveIdx] = useState(0);
  if (!animationIds || animationIds.length === 0) return null;

  const currentId = animationIds[activeIdx];
  const anim = ANIMATIONS[currentId];
  if (!anim) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: 8,
        background: "white",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {animationIds.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: "8px 10px",
            overflowX: "auto",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {animationIds.map((id, i) => {
            const a = ANIMATIONS[id];
            return (
              <button
                key={id}
                onClick={() => setActiveIdx(i)}
                style={{
                  padding: "4px 10px",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  background: activeIdx === i ? "#2D2D2D" : "rgba(0,0,0,0.04)",
                  color: activeIdx === i ? "white" : "#888",
                  fontSize: 10,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.15s",
                }}
              >
                {a?.name?.split("(")[0]?.split("\u2014")[0]?.trim() || id}
              </button>
            );
          })}
        </div>
      )}
      <PoseCanvas animationId={currentId} />
      <div
        style={{
          padding: "6px 10px 8px",
          fontSize: 11,
          color: "#666",
          lineHeight: 1.4,
          borderTop: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        {anim.safety}
      </div>
    </div>
  );
}

// ========== PoseCard ==========
function PoseCard({ pose }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: "12px 14px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        cursor: "pointer",
        background: expanded ? "rgba(0,0,0,0.02)" : "transparent",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#1a1a1a",
              lineHeight: 1.3,
            }}
          >
            {pose.name}
            {pose.animations && (
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 10,
                  color: "#A0522D",
                  verticalAlign: "middle",
                }}
              >
                ▶
              </span>
            )}
          </div>
          {pose.sanskrit && (
            <div
              style={{
                fontSize: 12,
                color: "#888",
                fontStyle: "italic",
                marginTop: 2,
                fontFamily: "'Newsreader', Georgia, serif",
              }}
            >
              {pose.sanskrit}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          {pose.hold && pose.hold !== "\u2014" && (
            <span
              style={{
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 4,
                background: "rgba(0,0,0,0.06)",
                color: "#555",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              {pose.hold}
            </span>
          )}
          <span
            style={{
              fontSize: 14,
              color: "#aaa",
              transform: expanded ? "rotate(90deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            ›
          </span>
        </div>
      </div>

      {expanded && (
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {pose.animations && (
            <InlineAnimations animationIds={pose.animations} />
          )}

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
            <div
              style={{
                fontSize: 13,
                color: "#444",
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              {pose.notes}
            </div>
          )}
          {pose.safety && (
            <div
              style={{
                fontSize: 12,
                color: "#8B4513",
                background: "rgba(139,69,19,0.06)",
                padding: "8px 10px",
                borderRadius: 6,
                marginTop: 4,
                lineHeight: 1.5,
                borderLeft: "3px solid rgba(139,69,19,0.3)",
              }}
            >
              ⚡ {pose.safety}
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
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 16px",
          cursor: "pointer",
          background: open ? tierColor : "white",
          color: open ? "white" : "#1a1a1a",
          borderRadius: open ? "10px 10px 0 0" : 10,
          transition: "all 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          {section.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 4,
              background: open
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.06)",
              fontFamily: "monospace",
            }}
          >
            {section.time}
          </span>
          <span
            style={{
              fontSize: 18,
              transform: open ? "rotate(90deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            ›
          </span>
        </div>
      </div>
      {open && (
        <div
          style={{
            background: "white",
            borderRadius: "0 0 10px 10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {section.poses.map((pose, i) => (
            <PoseCard key={i} pose={pose} />
          ))}
        </div>
      )}
    </div>
  );
}

// ========== AnimationGuide ==========
function AnimationGuide() {
  const [active, setActive] = useState(0);
  const anim = ANIMATIONS[ANIMATION_ORDER[active]];

  return (
    <div style={{ padding: "0 16px 32px" }}>
      {/* Color legend */}
      <div
        style={{
          fontSize: 12,
          color: "#999",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        <span style={{ color: "#2D2D2D", fontWeight: 600 }}>●</span> Active
        &nbsp;
        <span style={{ color: "#C0392B", fontWeight: 600 }}>●</span> Left leg
        (passive) &nbsp;
        <span style={{ color: "#2E8B57", fontWeight: 600 }}>●</span> Glute
        activation
      </div>

      {/* Pose selector pills */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "0 0 12px",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {ANIMATION_ORDER.map((id, i) => (
          <button
            key={id}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 14px",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              background: active === i ? "#2D2D2D" : "white",
              color: active === i ? "white" : "#666",
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow:
                active === i
                  ? "0 2px 8px rgba(0,0,0,0.2)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
            }}
          >
            {ANIMATIONS[id].name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div
        style={{
          background: "white",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <PoseCanvas animationId={ANIMATION_ORDER[active]} />
      </div>

      {/* Info card */}
      <div
        style={{
          padding: "16px 18px",
          background: "white",
          borderRadius: 14,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: 6,
          }}
        >
          {anim.name}
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#444",
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          {anim.desc}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#8B4513",
            background: "rgba(139,69,19,0.05)",
            padding: "10px 12px",
            borderRadius: 8,
            lineHeight: 1.5,
            borderLeft: "3px solid rgba(139,69,19,0.25)",
          }}
        >
          ⚡ {anim.safety}
        </div>
      </div>

      {/* Flow sequence */}
      <div
        style={{
          padding: "14px 16px",
          background: "rgba(0,0,0,0.03)",
          borderRadius: 12,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 1.5,
            color: "#999",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Full Vinyasa Flow Sequence
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {ANIMATION_ORDER.slice(0, 6).map((id, i) => (
            <Fragment key={id}>
              <button
                onClick={() => setActive(i)}
                style={{
                  padding: "4px 10px",
                  border:
                    active === i
                      ? "2px solid #2D2D2D"
                      : "1px solid #ddd",
                  borderRadius: 6,
                  background: active === i ? "#2D2D2D" : "white",
                  color: active === i ? "white" : "#666",
                  fontSize: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {i + 1}.{" "}
                {ANIMATIONS[id].name
                  .split("(")[0]
                  .split("\u2014")[0]
                  .trim()}
              </button>
              {i < 5 && (
                <span style={{ color: "#ccc", fontSize: 12 }}>
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Equipment poses */}
      <div
        style={{
          padding: "14px 16px",
          background: "rgba(0,0,0,0.03)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 1.5,
            color: "#999",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Bonus: Equipment Poses
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {ANIMATION_ORDER.slice(6).map((id, i) => (
            <button
              key={id}
              onClick={() => setActive(i + 6)}
              style={{
                flex: 1,
                padding: "8px",
                border:
                  active === i + 6
                    ? "2px solid #2D2D2D"
                    : "1px solid #ddd",
                borderRadius: 8,
                background: active === i + 6 ? "#2D2D2D" : "white",
                color: active === i + 6 ? "white" : "#666",
                fontSize: 11,
                cursor: "pointer",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {ANIMATIONS[id].name
                .split("(")[0]
                .split("\u2014")[0]
                .trim()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== Main App ==========
export default function App() {
  const [view, setView] = useState("practice");
  const [activeTier, setActiveTier] = useState("tapas");
  const tier = TIERS.find((t) => t.id === activeTier);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F0EB",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ padding: "28px 20px 12px", textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 3,
            color: "#999",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          NWB Practice
        </div>
        <h1
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: 32,
            fontWeight: 400,
            color: "#1a1a1a",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Yoga Without Ground
        </h1>
        <div
          style={{
            fontSize: 12,
            color: "#999",
            marginTop: 8,
            lineHeight: 1.5,
            maxWidth: 300,
            margin: "8px auto 0",
          }}
        >
          Left femoral neck stress fracture protocol. Strict NWB · Zero
          left hip flexor activation.
        </div>
      </div>

      {/* View Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          padding: "8px 16px 16px",
        }}
      >
        {[
          { id: "practice", label: "Practice" },
          { id: "guide", label: "Pose Guide" },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            style={{
              padding: "8px 20px",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              background: view === v.id ? "#2D2D2D" : "transparent",
              color: view === v.id ? "white" : "#888",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === "practice" ? (
        <>
          {/* Tier Selector */}
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "0 16px",
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                style={{
                  flex: 1,
                  maxWidth: 130,
                  padding: "12px 8px",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  background:
                    activeTier === t.id ? t.color : "white",
                  color: activeTier === t.id ? "white" : "#555",
                  boxShadow:
                    activeTier === t.id
                      ? `0 4px 12px ${t.color}44`
                      : "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "all 0.25s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>
                  {t.duration}
                </div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>
                  {t.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* Tier Description */}
          <div
            style={{
              margin: "0 16px 16px",
              padding: "12px 16px",
              borderRadius: 10,
              background: `${tier.color}0D`,
              border: `1px solid ${tier.color}22`,
              fontSize: 13,
              color: "#555",
              lineHeight: 1.5,
              fontFamily: "'Newsreader', Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {tier.description}
          </div>

          {/* Sections */}
          <div style={{ padding: "0 16px 32px" }}>
            {tier.sections.map((section, i) => (
              <Section key={i} section={section} tierColor={tier.color} />
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              padding: "0 20px 40px",
              fontSize: 11,
              color: "#bbb",
              lineHeight: 1.6,
            }}
          >
            <div style={{ marginBottom: 4 }}>
              Hard constraints: NWB left · No active left iliopsoas
            </div>
            <div>
              Soft notes: bilateral FAI/labral tears — hip flexion past
              90° at practitioner's discretion
            </div>
          </div>
        </>
      ) : (
        <AnimationGuide />
      )}
    </div>
  );
}
