import { type CSSProperties, useEffect, useRef, useState } from "react";
import { FadeUp } from "../../../shared/animations/FadeUp";
import { Reveal } from "../../../shared/animations/Reveal";
import {
  currentFocus,
  expertisePreview,
  homeStats,
  projects,
  timelinePreview,
} from "../../../shared/constants/portfolio";
import { Icon } from "../../../shared/components/Icon";

// ── Hero Showcase Data ────────────────────────────────────────────────────────
// Each slide = one PNG + the skill badges shown as floating chips on that frame

interface ShowcaseSlide {
  label: string;
  src: string;
  alt: string;
  skills: Array<{ name: string; icon: string; pos: CSSProperties }>;
}

const slides: ShowcaseSlide[] = [
  {
    label: "Profile",
    src: "/hero-showcase/profile.png",
    alt: "Cennsei — professional introduction",
    skills: [
      {
        name: "Java",
        icon: "code",
        // left shoulder area
        pos: { top: "18%", left: "4%" },
      },
      {
        name: "Python",
        icon: "code",
        // right side mid-body
        pos: { top: "38%", right: "3%" },
      },
      {
        name: "MySQL",
        icon: "data",
        // lower left near waist
        pos: { bottom: "28%", left: "4%" },
      },
    ],
  },
  {
    label: "Reach",
    src: "/hero-showcase/reach.png",
    alt: "Cennsei — innovation and connection",
    skills: [
      {
        name: "Flutter",
        icon: "rocket",
        // upper right near outstretched hand
        pos: { top: "22%", right: "4%" },
      },
      {
        name: "Supabase",
        icon: "data",
        // lower right
        pos: { bottom: "32%", right: "3%" },
      },
      {
        name: "GitHub",
        icon: "terminal",
        // lower left near hand
        pos: { bottom: "28%", left: "4%" },
      },
    ],
  },
  {
    label: "Approval",
    src: "/hero-showcase/approval.png",
    alt: "Cennsei — confidence and reliability",
    skills: [
      {
        name: "C++",
        icon: "code",
        // upper left shoulder
        pos: { top: "18%", left: "4%" },
      },
      {
        name: "C#",
        icon: "code",
        // upper right
        pos: { top: "18%", right: "4%" },
      },
      {
        name: "VS Code",
        icon: "terminal",
        // lower right
        pos: { bottom: "30%", right: "3%" },
      },
    ],
  },
  {
    label: "Welcome",
    src: "/hero-showcase/welcome.png",
    alt: "Cennsei — approachable collaboration",
    skills: [
      {
        name: "HTML",
        icon: "code",
        // upper left
        pos: { top: "20%", left: "4%" },
      },
      {
        name: "CSS",
        icon: "shield",
        // right mid
        pos: { top: "40%", right: "3%" },
      },
      {
        name: "Git",
        icon: "terminal",
        // lower left
        pos: { bottom: "28%", left: "4%" },
      },
    ],
  },
];

// ── Skill Chip ────────────────────────────────────────────────────────────────

function SkillChip({
  name,
  icon,
  pos,
  visible,
  index,
}: {
  name: string;
  icon: string;
  pos: CSSProperties;
  visible: boolean;
  index: number;
}) {
  return (
    <span
      className="showcase-skill-chip"
      style={{
        ...pos,
        transitionDelay: visible ? `${0.3 + index * 0.1}s` : "0s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)",
      }}
      aria-hidden="true"
    >
      <span className="chip-icon">
        <Icon name={icon} />
      </span>
      {name}
    </span>
  );
}

// ── Hero Showcase ─────────────────────────────────────────────────────────────

function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [chipsVisible, setChipsVisible] = useState(true);
  const touchStart = useRef<number | null>(null);

  // Auto-cycle every 4 seconds
  useEffect(() => {
    const id = window.setInterval(() => goTo((active + 1) % slides.length), 4000);
    return () => window.clearInterval(id);
  }, [active]);

  function goTo(index: number) {
    if (index === active) return;
    // Briefly hide chips on the outgoing slide before switching
    setChipsVisible(false);
    window.setTimeout(() => {
      setPrevActive(active);
      setActive(index);
      window.setTimeout(() => setChipsVisible(true), 60);
    }, 200);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0
        ? (active + 1) % slides.length
        : (active - 1 + slides.length) % slides.length);
    }
    touchStart.current = null;
  }

  const slide = slides[active];

  return (
    <aside
      className="hero-showcase"
      aria-label="Interactive profile showcase"
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient glow behind image */}
      <div className="showcase-ambient" aria-hidden="true" />

      {/* Image frame */}
      <div className="showcase-frame">
        {slides.map((s, i) => (
          <img
            key={s.label}
            src={s.src}
            alt={s.alt}
            className={`showcase-img${i === active ? " active" : i === prevActive ? " prev" : ""}`}
            draggable={false}
          />
        ))}

        {/* Skill chips — float around active image */}
        {slide.skills.map((chip, i) => (
          <SkillChip
            key={chip.name}
            name={chip.name}
            icon={chip.icon}
            pos={chip.pos}
            visible={chipsVisible}
            index={i}
          />
        ))}

        {/* Bottom gradient fade */}
        <div className="showcase-fade" aria-hidden="true" />
      </div>

      {/* Dot / tab navigation */}
      <div className="showcase-dots" role="tablist" aria-label="Profile image tabs">
        {slides.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={i === active}
            aria-label={s.label}
            className={`showcase-dot${i === active ? " active" : ""}`}
            onClick={() => goTo(i)}
            onMouseEnter={() => goTo(i)}
            type="button"
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Name badge at bottom of image */}
      <div className="showcase-badge" aria-hidden="true">
        <span className="showcase-badge-dot" />
        <strong>Cennsei</strong>
        <span>Available for opportunities</span>
      </div>
    </aside>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <div className="page-shell">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero section" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <FadeUp>
              <p className="eyebrow line">Computer Science Student &amp; Software Developer</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1>
                Building Modern Software Experiences That Solve{" "}
                <span>Real Problems.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="hero-text">
                I&apos;m Cennsei, a Computer Science student passionate about software
                development, web technologies, databases, and creating meaningful digital
                solutions through continuous learning and hands-on development.
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <div className="action-row">
                <a className="button button-primary" href="#projects">
                  View Projects
                </a>
                <a
                  className="button button-secondary"
                  href="/cennsei-resume.pdf"
                  download="Cennsei_Resume.pdf"
                  aria-label="Download resume PDF"
                >
                  Download Resume
                </a>
              </div>
            </FadeUp>
          </div>

          <Reveal direction="right" delay={0.1}>
            <HeroShowcase />
          </Reveal>
        </div>
      </section>

      {/* ── Current Focus ────────────────────────────────── */}
      <section className="section current-focus-band">
        <div className="container">
          <FadeUp>
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: "28px" }}>
              Currently Exploring
            </p>
          </FadeUp>
          <div className="focus-pills">
            {currentFocus.map((item, i) => (
              <FadeUp key={item} delay={i * 0.06}>
                <span className="focus-pill">{item}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Teaser ─────────────────────────────────── */}
      <section className="section about" id="home-about">
        <div className="container split-grid">
          <FadeUp>
            <div>
              <p className="eyebrow">About Me</p>
              <h2>
                Always learning. <span>Always building.</span>
              </h2>
              <p style={{ marginTop: "22px", color: "var(--text-muted)" }}>
                I am currently pursuing a Bachelor of Science in Computer Science while
                continuously improving my technical, analytical, and problem-solving abilities
                through academic projects, self-learning, and practical development experience.
              </p>
              <a className="text-link" href="#about">
                Learn More <span>{"→"}</span>
              </a>
            </div>
          </FadeUp>
          <div className="stats-grid">
            {homeStats.map(([value, label]) => (
              <FadeUp key={label}>
                <article className="stat-card">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise Preview ────────────────────────────── */}
      <section className="section expertise-band" id="home-expertise">
        <div className="container section-heading">
          <FadeUp>
            <div>
              <p className="eyebrow">Stack</p>
              <h2>Core Expertise</h2>
            </div>
          </FadeUp>
          <a className="quiet-link" href="#expertise">
            Full Expertise →
          </a>
        </div>
        <div className="container expertise-row">
          {expertisePreview.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.07}>
              <article className="glass-card expertise-card">
                <span className="card-icon">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Projects Preview ─────────────────────────────── */}
      <section className="section" id="home-projects">
        <div className="container centered-heading">
          <FadeUp>
            <p className="eyebrow">Portfolio</p>
            <h2>Featured Projects</h2>
          </FadeUp>
        </div>
        <div className="container home-projects-grid">
          {projects.map((project, i) => (
            <FadeUp key={project.slug} delay={i * 0.08}>
              <article className="glass-card home-project-card">
                <div className={`home-project-visual proj-visual-${i + 1}`} aria-hidden="true" />
                <div className="home-project-body">
                  <p className="eyebrow">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-cloud">
                    {project.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
        <div className="center-action">
          <a className="button button-secondary" href="#projects">
            View All Projects
          </a>
        </div>
      </section>

      {/* ── Journey Preview ──────────────────────────────── */}
      <section className="section journey" id="home-journey">
        <div className="container journey-grid">
          <FadeUp>
            <div className="journey-intro">
              <p className="eyebrow">Journey</p>
              <h2>
                The Path <span>Traveled</span>
              </h2>
              <p>From first lines of code to building real software systems.</p>
              <a className="text-link" href="#journey">
                Full Journey →
              </a>
            </div>
          </FadeUp>
          <ol className="timeline">
            {timelinePreview.map((item, index) => (
              <li
                key={item.period}
                style={{
                  opacity: 0,
                  animation: `fadeUp 0.55s ${0.1 + index * 0.12}s cubic-bezier(0.16,1,0.3,1) forwards`,
                }}
              >
                <span className="timeline-dot" />
                <p className="eyebrow">{item.period}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────── */}
      <section className="section contact" id="home-contact">
        <div className="container">
          <FadeUp>
            <div className="contact-panel">
              <p className="eyebrow">Connect</p>
              <h2>
                Let&apos;s Build Something <span>Great Together.</span>
              </h2>
              <p>
                Interested in collaborating, discussing projects, or connecting professionally?
                Feel free to reach out.
              </p>
              <div className="action-row centered">
                <a className="button button-primary" href="#contact">
                  Get In Touch
                </a>
                <a
                  className="button button-secondary"
                  href="mailto:cedricklajato04@gmail.com"
                >
                  cedricklajato04@gmail.com
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
