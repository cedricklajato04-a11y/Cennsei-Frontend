import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const languages = [
  { name: "Java",       icon: "code" },
  { name: "Python",     icon: "data_object" },
  { name: "Dart",       icon: "flutter_dash" },
  { name: "TypeScript", icon: "javascript" },
  { name: "C++",        icon: "settings_ethernet" },
  { name: "C#",         icon: "terminal" },
];

const databases = [
  { name: "PostgreSQL", icon: "storage" },
  { name: "Supabase",   icon: "cloud" },
  { name: "REST API",   icon: "api" },
  { name: "GraphQL",    icon: "hub" },
  { name: "MySQL",      icon: "dns" },
];

const tools = [
  "Git & GitHub", "VS Code", "NetBeans IDE", "Cursor",
  "Kiro", "Figma", "Vercel", "Docker",
];

const competencies = [
  "Distributed Systems Design",
  "CI/CD Pipeline Automation",
  "Agile & Scrum Leadership",
  "Security-First Architecture",
];

const roadmap = [
  {
    title:    "Web3 & Smart Contracts",
    desc:     "Deep diving into Solidity and Ethereum ecosystem for decentralized applications.",
    badge:    "Current Focus",
    active:   true,
    align:    "left" as const,
  },
  {
    title:    "Machine Learning Ops",
    desc:     "Mastering the deployment and lifecycle management of ML models at scale.",
    badge:    "Q3 2026",
    active:   false,
    align:    "right" as const,
  },
  {
    title:    "Advanced Rust Systems",
    desc:     "Exploring low-level kernel development and high-performance networking with Rust.",
    badge:    "Upcoming",
    active:   false,
    align:    "left" as const,
  },
];

// ── Shared styles ─────────────────────────────────────────────────────────────

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#22c55e", marginBottom: 10 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 26 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e" }}>
        {label}
      </span>
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Infinite scrolling carousel
function SkillCarousel({ items }: { items: typeof languages }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", padding: "20px 0" }} aria-hidden="true">
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "expertise-scroll 30s linear infinite",
          gap: 40,
          paddingInline: 16,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "default",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
              <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 20 }}>
                {item.icon}
              </span>
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "1rem", color: "#e2e2e8", whiteSpace: "nowrap" }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ExpertisePage() {
  const roadmapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start center", "end center"],
  });

  const spineHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", left: "50%", top: "2%",
          width: 700, height: 500, borderRadius: "999px",
          background: "radial-gradient(circle, rgba(34,197,94,0.1), transparent 68%)",
          filter: "blur(80px)", transform: "translateX(-50%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ── Hero ── */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 48, paddingBottom: 24, textAlign: "center" }}>
        <div style={{ maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "4px 14px", borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: 14,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8" }}>
                Technical Arsenal
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 style={{ fontSize: "clamp(2.8rem,8vw,5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 12px", color: "#f8fafc" }}>
              Expertise <span style={{ color: "#22c55e" }}>Evolved</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              A curated showcase of my engineering stack, from low-level systems to
              high-performance cloud architectures.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Content ── */}
      <div style={{ maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto", padding: "0 24px 48px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Programming Languages — carousel */}
        <FadeUp>
          <motion.div
            style={glassCard}
            whileHover={{ borderColor: "rgba(34,197,94,0.35)", boxShadow: "0 20px 50px -16px rgba(0,0,0,0.5)" }}
          >
            <div style={{ padding: "28px 28px 0" }}>
              <SectionLabel icon="terminal" label="Foundation" />
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 6px", color: "#f8fafc" }}>Programming Languages</h2>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
                Building with type safety, performance, and scalability in mind across diverse paradigms.
              </p>
            </div>
            <SkillCarousel items={languages} />
          </motion.div>
        </FadeUp>

        {/* Database & Backend — icon grid */}
        <FadeUp delay={0.06}>
          <motion.div
            style={glassCard}
            whileHover={{ borderColor: "rgba(34,197,94,0.35)", boxShadow: "0 20px 50px -16px rgba(0,0,0,0.5)" }}
          >
            <div style={{ padding: 28 }}>
              <SectionLabel icon="database" label="Infrastructure" />
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 6px", color: "#f8fafc" }}>Database &amp; Backend</h2>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "0 0 22px" }}>
                Architecting high-availability systems with robust data management and efficient query patterns.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
                {databases.map((db, i) => (
                  <motion.div
                    key={db.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -4, borderColor: "rgba(34,197,94,0.5)", background: "rgba(255,255,255,0.06)" }}
                    style={{
                      padding: "18px 12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      textAlign: "center",
                      cursor: "default",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 28, display: "block", marginBottom: 8 }}>
                      {db.icon}
                    </span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e2e2e8" }}>{db.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeUp>

        {/* Tools + Competencies — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,380px),1fr))", gap: 20 }}>

          {/* Tools */}
          <FadeUp delay={0.04}>
            <motion.div
              style={{ ...glassCard, padding: 24, height: "100%" }}
              whileHover={{ borderColor: "rgba(34,197,94,0.35)" }}
            >
              <SectionLabel icon="construction" label="Ecosystem" />
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 16px", color: "#f8fafc" }}>Tools &amp; Ecosystem</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tools.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ borderColor: "rgba(34,197,94,0.5)", color: "#22c55e", y: -2 }}
                    style={{
                      padding: "6px 14px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: 8,
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      cursor: "default",
                      transition: "all 0.25s ease",
                      display: "inline-block",
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </FadeUp>

          {/* Core Competencies */}
          <FadeUp delay={0.08}>
            <motion.div
              style={{ ...glassCard, padding: 24, height: "100%" }}
              whileHover={{ borderColor: "rgba(34,197,94,0.35)" }}
            >
              <SectionLabel icon="psychology" label="Soft Skills" />
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 16px", color: "#f8fafc" }}>Core Competencies</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {competencies.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem", color: "#94a3b8" }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 18, flexShrink: 0 }}>check_circle</span>
                    {c}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </FadeUp>
        </div>

        {/* ── Learning Roadmap ── */}
        <FadeUp delay={0.04}>
          <div style={{ padding: "32px 0 0", textAlign: "center" }}>
            <p style={{ color: "#22c55e", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
              Always Growing
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, margin: "0 0 10px", color: "#f8fafc" }}>
              Learning <span style={{ color: "#22c55e" }}>Roadmap</span>
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", maxWidth: 480, margin: "0 auto 32px" }}>
              Exploring the frontiers of technology to stay at the cutting edge of engineering.
            </p>
          </div>

          {/* Roadmap items */}
          <div
            ref={roadmapRef}
            style={{ position: "relative", maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}
          >
            {/* Spine */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute", left: "50%", top: 0, bottom: 0,
                width: 2, background: "rgba(255,255,255,0.06)",
                transform: "translateX(-50%)", borderRadius: 999, overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <motion.div
                style={{
                  width: "100%", height: "100%", scaleY: spineHeight,
                  transformOrigin: "top center",
                  background: "linear-gradient(to bottom, #22c55e, #4be277)",
                  borderRadius: 999, boxShadow: "0 0 14px rgba(34,197,94,0.4)",
                }}
              />
            </div>

            {roadmap.map((item, i) => {
              const isLeft = item.align === "left";
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 48px 1fr",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  {/* Left slot */}
                  <div style={{ paddingRight: 20, textAlign: "right" }}>
                    {isLeft ? (
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 6px" }}>{item.title}</h3>
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0, lineHeight: 1.55 }}>{item.desc}</p>
                      </div>
                    ) : (
                      <span style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: 6,
                        background: item.active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)",
                        color: item.active ? "#22c55e" : "#94a3b8",
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        animation: item.active ? "pulse-dot 2s ease-in-out infinite" : "none",
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Node */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 + 0.1, type: "spring", stiffness: 200, damping: 16 }}
                      style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "#111317",
                        border: `2px solid ${item.active ? "#22c55e" : "rgba(255,255,255,0.15)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: item.active ? "0 0 14px rgba(34,197,94,0.35)" : "none",
                        animation: item.active ? "pulse-node 2.5s cubic-bezier(0.455,0.03,0.515,0.955) infinite" : "none",
                        zIndex: 2, flexShrink: 0,
                      }}
                    >
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: item.active ? "#22c55e" : "rgba(255,255,255,0.2)",
                      }} />
                    </motion.div>
                  </div>

                  {/* Right slot */}
                  <div style={{ paddingLeft: 20, textAlign: "left" }}>
                    {!isLeft ? (
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 6px" }}>{item.title}</h3>
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0, lineHeight: 1.55 }}>{item.desc}</p>
                      </div>
                    ) : (
                      <span style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: 6,
                        background: item.active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)",
                        color: item.active ? "#22c55e" : "#94a3b8",
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeUp>

        {/* ── CTA ── */}
        <FadeUp delay={0.04}>
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
              marginTop: 12,
            }}
          >
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 10px", color: "#f8fafc" }}>
              Ready to see these skills in <span style={{ color: "#22c55e" }}>action?</span>
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", maxWidth: 440, margin: "0 auto 22px", lineHeight: 1.6 }}>
              I translate technical proficiency into tangible business value. Browse my portfolio to see real-world implementations.
            </p>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#22c55e", color: "#001a0a",
                fontWeight: 700, fontSize: "0.9rem",
                padding: "12px 28px", borderRadius: 999,
                textDecoration: "none",
              }}
            >
              Explore Projects
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </motion.a>
          </motion.div>
        </FadeUp>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes expertise-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-node {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
