import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { journeyMilestones } from "../../../shared/constants/portfolio";

// ── Data ──────────────────────────────────────────────────────────────────────

const milestones = journeyMilestones.map((m, i) => ({
  ...m,
  icon: (["terminal", "database", "rocket_launch", "architecture"] as const)[i] ?? "terminal",
  visual: i === 2 ? ("chip" as const) : null,
  achievements: i === 1
    ? ["Built Payroll Management System with C# & .NET WinForms.", "Designed normalized database schemas for academic projects."]
    : null,
  stats: i === 3
    ? [{ value: "3+", label: "Projects Built" }, { value: "2026", label: "Graduating Year" }]
    : null,
}));

const lessons = [
  {
    title: "Simplicity is Scalability",
    desc: "Complex problems don't always need complex solutions. The most robust systems are often the most elegant ones.",
  },
  {
    title: "Testing is Communication",
    desc: "Tests are documentation for future engineers. They describe intent better than any README ever could.",
  },
  {
    title: "User First, Code Second",
    desc: "Beautiful code is worthless if it doesn't solve the core user pain point. Design for empathy.",
  },
];

const goals = [
  { label: "Decentralized Systems Mastery", pct: 85 },
  { label: "Open Source Stewardship", pct: 60 },
  { label: "AI Ethics Framework Development", pct: 40 },
];

// ── Shared styles ─────────────────────────────────────────────────────────────

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
};

const tag: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  padding: "2px 10px",
  fontSize: "11px",
  fontFamily: "monospace",
  color: "#94a3b8",
};

// ── Milestone Card ────────────────────────────────────────────────────────────

function MilestoneCard({
  item,
  index,
}: {
  item: (typeof milestones)[number];
  index: number;
}) {
  const isLeft = item.side === "left";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Left slot */}
      <div style={{ paddingRight: 20, textAlign: "right" }}>
        {isLeft ? (
          <motion.div
            style={glassCard}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: "rgba(34,197,94,0.4)", boxShadow: "0 8px 24px -8px rgba(34,197,94,0.2)" }}
          >
            <CardContent item={item} isLeft />
          </motion.div>
        ) : (
          <span style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 900,
            color: "rgba(34,197,94,0.06)",
            userSelect: "none",
            lineHeight: 1,
          }}>
            {item.year}
          </span>
        )}
      </div>

      {/* Node */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.05 + 0.15, type: "spring", stiffness: 200, damping: 16 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "999px",
            border: "2px solid #22c55e",
            background: "#0f1115",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 0 rgba(34,197,94,0.4)",
            animation: "pulse-node 2.5s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 16 }}>
            {item.icon}
          </span>
        </motion.div>
      </div>

      {/* Right slot */}
      <div style={{ paddingLeft: 20, textAlign: "left" }}>
        {!isLeft ? (
          <motion.div
            style={glassCard}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: "rgba(34,197,94,0.4)", boxShadow: "0 8px 24px -8px rgba(34,197,94,0.2)" }}
          >
            <CardContent item={item} isLeft={false} />
          </motion.div>
        ) : (
          <span style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 900,
            color: "rgba(34,197,94,0.06)",
            userSelect: "none",
            lineHeight: 1,
          }}>
            {item.year}
          </span>
        )}
      </div>
    </div>
  );
}

function CardContent({
  item,
  isLeft,
}: {
  item: (typeof milestones)[number];
  isLeft: boolean;
}) {
  return (
    <div style={{ padding: "20px 22px" }}>
      <span style={{ fontFamily: "monospace", color: "#22c55e", fontSize: 11, display: "block", marginBottom: 4 }}>
        {item.eyebrow}
      </span>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2, color: "#f8fafc" }}>
        {item.title}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 12px" }}>
        {item.description}
      </p>

      {/* Achievements */}
      {item.achievements && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 6 }}>
          {item.achievements.map((a) => (
            <li key={a} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8rem", color: "#94a3b8" }}>
              <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 15, flexShrink: 0 }}>check_circle</span>
              {a}
            </li>
          ))}
        </ul>
      )}

      {/* AI chip visual */}
      {item.visual === "chip" && (
        <div style={{
          height: 120,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 12,
          background: "linear-gradient(135deg, #1e2423, #33352c 48%, #0b0d10)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: 80,
            height: 80,
            border: "1px solid rgba(255,208,112,0.35)",
            borderRadius: 7,
            background: "linear-gradient(135deg, #5b4b2a, #1d2120)",
            transform: "rotate(-12deg)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }} />
        </div>
      )}

      {/* Stats */}
      {item.stats && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
          {item.stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 9,
                padding: "10px 12px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#22c55e", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tags */}
      {item.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: isLeft ? "flex-end" : "flex-start" }}>
          {item.tags.map((t) => (
            <span key={t} style={tag}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function JourneyPage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start center", "end center"],
  });

  const spineHeight = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "50%",
          top: "4%",
          width: 500,
          height: 400,
          borderRadius: "999px",
          background: "radial-gradient(circle, rgba(34,197,94,0.1), transparent 68%)",
          filter: "blur(70px)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Hero ── */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 48, paddingBottom: 24, textAlign: "center" }}>
        <div style={{ maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto", padding: "0 24px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ color: "#22c55e", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}
          >
            Evolution &amp; Growth
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(2.8rem,8vw,5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 12px", color: "#f8fafc" }}
          >
            The Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}
          >
            Tracing the trajectory from lines of code to complex system architectures —
            a chronicle of technical evolution and professional milestones.
          </motion.p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "8px 24px 40px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <div
          ref={wrapRef}
          style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Spine — bounded strictly to this flex container */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              background: "rgba(255,255,255,0.06)",
              transform: "translateX(-50%)",
              borderRadius: 999,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <motion.div
              style={{
                width: "100%",
                scaleY: spineHeight,
                transformOrigin: "top center",
                height: "100%",
                background: "linear-gradient(to bottom, #22c55e, #4be277)",
                borderRadius: 999,
                boxShadow: "0 0 18px rgba(34,197,94,0.4)",
              }}
            />
          </div>

          {/* Milestone rows */}
          {milestones.map((item, i) => (
            <MilestoneCard key={item.year} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── Growth grid ── */}
      <section style={{ padding: "0 24px 40px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,420px),1fr))", gap: 20 }}>

          {/* Lessons Learned */}
          <motion.div
            style={{ ...glassCard, padding: "24px 26px", overflow: "hidden", position: "relative" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, padding: 16, opacity: 0.06, pointerEvents: "none" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 90, color: "#22c55e" }}>psychology</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 16 }}>history_edu</span>
              </span>
              Lessons Learned
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {lessons.map((l, i) => (
                <motion.div
                  key={l.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ paddingLeft: 14, borderLeft: "2px solid rgba(34,197,94,0.4)" }}
                >
                  <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#f8fafc", margin: "0 0 3px" }}>{l.title}</h4>
                  <p style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.55, margin: 0 }}>{l.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Goals */}
          <motion.div
            style={{ ...glassCard, padding: "24px 26px", overflow: "hidden", position: "relative" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, padding: 16, opacity: 0.06, pointerEvents: "none" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 90, color: "#4de082" }}>near_me</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(77,224,130,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: "#4de082", fontSize: 16 }}>track_changes</span>
              </span>
              Future Goals
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {goals.map((g, i) => (
                <div key={g.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, fontSize: "0.8rem" }}>
                    <span style={{ fontWeight: 700, color: "#f8fafc" }}>{g.label}</span>
                    <span style={{ color: "#4de082", fontWeight: 700 }}>{g.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.1, ease: "easeOut" }}
                      style={{ height: "100%", background: "linear-gradient(90deg, #22c55e, #4ade80)", borderRadius: 999, boxShadow: "0 0 10px rgba(34,197,94,0.4)" }}
                    />
                  </div>
                </div>
              ))}
              <p style={{ fontSize: "0.78rem", fontStyle: "italic", color: "#607060", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 12, margin: 0, lineHeight: 1.6 }}>
                "The goal is not to be better than the other man, but your previous self."
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 48px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          style={{
            ...glassCard,
            padding: "40px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "radial-gradient(circle at 50% 0, rgba(34,197,94,0.1), transparent 24rem), rgba(255,255,255,0.03)",
          }}
        >
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px", color: "#f8fafc" }}>
            Ready to build something{" "}
            <span style={{ color: "#22c55e" }}>legendary?</span>
          </h2>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#22c55e",
              color: "#001a0a",
              fontWeight: 700,
              fontSize: "0.9rem",
              padding: "12px 28px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Let&apos;s Connect →
          </motion.a>
        </motion.div>
      </section>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse-node {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
        }
      `}</style>
    </div>
  );
}
