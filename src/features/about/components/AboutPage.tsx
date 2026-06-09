import { motion } from "framer-motion";
import { aboutMetrics, foundations, vision } from "../../../shared/constants/portfolio";

// ── Shared styles ─────────────────────────────────────────────────────────────

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 14,
  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
};

// ── Metric icon map ───────────────────────────────────────────────────────────

const iconMap: Record<string, string> = {
  school:        "school",
  terminal:      "terminal",
  rocket:        "rocket_launch",
  "rocket_launch": "rocket_launch",
  award:         "military_tech",
  military_tech: "military_tech",
};

function resolveIcon(name: string): string {
  return iconMap[name] ?? name;
}

// ── FadeUp ────────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Portrait ──────────────────────────────────────────────────────────────────

function PortraitCard() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 400, marginInline: "auto" }}>

      {/* Deep green radial glow behind the card */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: "-10% -15%",
        zIndex: 0,
        borderRadius: 999,
        background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.22) 0%, transparent 70%)",
        filter: "blur(48px)",
        animation: "showcase-breathe 6s ease-in-out infinite",
      }} />

      {/* Corner accent lines — top-left */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -2, left: -2,
        width: 48, height: 48,
        borderTop: "2px solid #22c55e",
        borderLeft: "2px solid #22c55e",
        borderRadius: "12px 0 0 0",
        zIndex: 3,
        pointerEvents: "none",
      }} />
      {/* Corner accent lines — bottom-right */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -2, right: -2,
        width: 48, height: 48,
        borderBottom: "2px solid #22c55e",
        borderRight: "2px solid #22c55e",
        borderRadius: "0 0 12px 0",
        zIndex: 3,
        pointerEvents: "none",
      }} />

      {/* Card frame */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 16,
          overflow: "hidden",
          background: "#0a0f0a",
          boxShadow: "0 0 0 1px rgba(34,197,94,0.15), 0 24px 64px -16px rgba(0,0,0,0.7), 0 0 40px -8px rgba(34,197,94,0.12)",
        }}
      >
        {/* Image */}
        <img
          src="/profile_shades.jpg"
          alt="Professional portrait of Cennsei"
          style={{
            width: "100%",
            display: "block",
            objectFit: "cover",
            objectPosition: "center top",
            aspectRatio: "3 / 4",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0% 72%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 0% 72%, transparent 100%)",
          }}
        />

        {/* Subtle inner top highlight */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 120,
          background: "linear-gradient(to bottom, rgba(34,197,94,0.06) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </motion.div>

      {/* Floating status badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 28,
          left: -16,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(10,15,10,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 999,
          padding: "8px 16px 8px 10px",
          boxShadow: "0 8px 24px -6px rgba(0,0,0,0.5)",
        }}
      >
        {/* Pulsing green dot */}
        <span style={{ position: "relative", width: 10, height: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 10, height: 10,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.4)",
              display: "block",
            }}
          />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "block", position: "relative" }} />
        </span>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e2e2e8", whiteSpace: "nowrap" }}>
          Open to opportunities
        </span>
      </motion.div>

      {/* Floating tech badge — top right */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 24,
          right: -14,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(10,15,10,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 10,
          padding: "8px 12px",
          boxShadow: "0 8px 24px -6px rgba(0,0,0,0.5)",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#22c55e" }}>code</span>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#f8fafc" }}>CS Student</span>
      </motion.div>

    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Atmospheric glow */}
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-5%", "5%", "-5%"], y: ["-5%", "5%", "-5%"], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-10%", left: "-10%",
          width: "120%", height: "60%",
          background: "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.07) 0%, transparent 55%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ── Hero ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "48px 24px 32px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 40, alignItems: "center" }}>

          {/* Copy */}
          <div>
            <FadeUp>
              <p style={{ color: "#22c55e", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                The Architect
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 18px", color: "#f8fafc" }}>
                Cennsei: Bridging Logic and Creativity.
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <blockquote style={{
                borderLeft: "4px solid #22c55e",
                background: "linear-gradient(90deg, rgba(34,197,94,0.1) 0%, transparent 100%)",
                padding: "16px 20px",
                borderRadius: "0 10px 10px 0",
                margin: "0 0 20px",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "#e2e2e8",
                lineHeight: 1.7,
              }}>
                "I am a software designer and computer science student focused on building
                high-performance systems with aesthetic precision. Code is not just
                functional — it's a medium for craftsmanship."
              </blockquote>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.7, margin: "0 0 10px" }}>
                Over the past few years, I've dedicated myself to the intersection of robust
                backend engineering and human-centric design. My work is defined by a commitment
                to efficiency, scalability, and a relentless pursuit of technical excellence.
              </p>
            </FadeUp>
            <FadeUp delay={0.26}>
              <p style={{ fontSize: "0.9rem", color: "#607060", lineHeight: 1.7, margin: "0 0 24px" }}>
                Currently pursuing a Bachelor of Science in Computer Science while continuously
                improving through academic projects, self-learning, and practical development.
              </p>
            </FadeUp>

            {/* Download CV */}
            <FadeUp delay={0.32}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <motion.a
                  href="/cennsei-resume.pdf"
                  download="Cennsei_Resume.pdf"
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 24px -6px rgba(34,197,94,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#22c55e", color: "#001a0a",
                    fontWeight: 700, fontSize: "0.88rem",
                    padding: "11px 22px", borderRadius: 999,
                    textDecoration: "none", transition: "box-shadow 0.3s ease",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
                  Download CV
                </motion.a>
                <motion.a
                  href="mailto:cedricklajato04@gmail.com"
                  whileHover={{ scale: 1.04, borderColor: "rgba(34,197,94,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e2e2e8",
                    fontWeight: 600, fontSize: "0.88rem",
                    padding: "11px 22px", borderRadius: 999,
                    textDecoration: "none", transition: "border-color 0.3s ease",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>alternate_email</span>
                  Get in Touch
                </motion.a>
              </div>
            </FadeUp>
          </div>

          {/* Portrait */}
          <FadeUp delay={0.12}>
            <div style={{ padding: "16px 24px" }}>
              <PortraitCard />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section style={{ padding: "0 24px 32px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {aboutMetrics.map(([icon, value, label], i) => (
            <FadeUp key={label} delay={i * 0.07}>
              <motion.div
                style={{ ...glassCard, padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                whileHover={{ borderColor: "rgba(34,197,94,0.45)", boxShadow: "0 10px 28px -10px rgba(34,197,94,0.2)", y: -4 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "rgba(34,197,94,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 12, color: "#22c55e",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                    {resolveIcon(icon)}
                  </span>
                </motion.div>
                <strong style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1.1, display: "block", marginBottom: 4 }}>
                  {value}
                </strong>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: 0 }}>
                  {label}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Academic Panel ── */}
      <section style={{ padding: "0 24px 32px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <FadeUp>
          <div style={{
            background: "#1a1c20",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          }}>
            {/* Copy side */}
            <div style={{ padding: "36px 36px" }}>
              <p style={{ color: "#22c55e", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                Foundations
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, margin: "0 0 14px", color: "#f8fafc" }}>
                Academic Excellence
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, margin: "0 0 22px" }}>
                Currently a 3rd year Computer Science student. My academic focus lies in the
                core principles of computation — deep understanding of low-level systems is
                essential for creating high-level innovations.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {foundations.map(([title, description], i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.09 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "default" }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#22c55e", fontSize: 20, marginTop: 2, flexShrink: 0 }}>
                      check_circle
                    </span>
                    <div>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 2px" }}>{title}</h4>
                      <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0, lineHeight: 1.55 }}>{description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image side */}
            <div style={{ position: "relative", minHeight: 280, overflow: "hidden" }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhUMQb_uuTCmCjimp764OLVLU1vmNfbMRsbUZPpYPlK6f7-vkgS4iWlvnGwcn7eZW6lv6g19DBCgbfFM1LUrKWaFMmNi2tEXvrQzdkSDLzCbCCzEKhdxbJyqrmx_XuGwRLaYeKYF3nZ6wycisriIRKSDNp42hCsFEigkIx0FDCPJBN9SIfGaeiBChQyWqFu5tbwcPhDIHQFK6KyD_Zf4u1zF8g2a7aaX6YOFuzJFJ17or-qZQxy5OtqWC15zE1Rmi8qLkd2wtvAlb6"
                alt="Code workstation"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) opacity(0.5)", transition: "transform 1s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Overlay fade */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, #1a1c20 0%, rgba(26,28,32,0.2) 40%, transparent 100%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Vision / Career Goals ── */}
      <section style={{ padding: "0 24px 32px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ color: "#22c55e", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              Trajectory
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, margin: 0, color: "#f8fafc" }}>
              The Vision of a Developer
            </h2>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
          {vision.map((item, i) => (
            <FadeUp key={item.number} delay={i * 0.08}>
              <motion.div
                style={{ ...glassCard, padding: "28px 26px", height: "100%" }}
                whileHover={{ borderColor: "rgba(34,197,94,0.4)", background: "rgba(255,255,255,0.05)", y: -4 }}
              >
                <motion.div
                  initial={{ color: "rgba(34,197,94,0.25)" }}
                  whileHover={{ color: "#22c55e" }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1, marginBottom: 14 }}
                >
                  {item.number}
                </motion.div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>
                  {item.description}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 48px", maxWidth: "min(1280px, calc(100vw - 48px))", margin: "0 auto" }}>
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
            }}
          >
            {/* Top-right glow blob */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 280, height: 280,
              background: "rgba(34,197,94,0.05)",
              filter: "blur(80px)",
              transform: "translate(40%, -40%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 10px", color: "#f8fafc", position: "relative" }}>
              Curious about the stack?
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", maxWidth: 440, margin: "0 auto 22px", lineHeight: 1.6, position: "relative" }}>
              Dive into the technical details of the frameworks, languages, and tools
              I use to bring these ideas to life.
            </p>
            <motion.a
              href="#expertise"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#22c55e", color: "#001a0a",
                fontWeight: 700, fontSize: "0.9rem",
                padding: "12px 28px", borderRadius: 999,
                textDecoration: "none", position: "relative",
              }}
            >
              View My Expertise
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </motion.a>
          </motion.div>
        </FadeUp>
      </section>

    </div>
  );
}
