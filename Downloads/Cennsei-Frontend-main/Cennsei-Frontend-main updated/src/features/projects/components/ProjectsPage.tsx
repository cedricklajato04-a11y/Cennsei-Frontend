import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FadeUp } from "../../../shared/animations/FadeUp";
import { projectPrinciples, projects } from "../../../shared/constants/portfolio";

// ── Background class per project ─────────────────────────────────────────────
const visualClasses = [
  "payroll-photo",
  "attendance-photo",
  "event-photo",
  "emergency-photo",
];

// Typed cubic-bezier tuples for Framer Motion v12
const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FAST_EASE:   [number, number, number, number] = [0.4, 0, 1, 1];

// ── Animation variants ────────────────────────────────────────────────────────
const cardVariants: Variants = {
  collapsed: {
    height: 300,
    transition: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
  },
  expanded: {
    height: 480,
    transition: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 },
  },
};

const defaultContentVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: SPRING_EASE },
  },
  hidden: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.18, ease: FAST_EASE },
  },
};

const expandedContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const expandedItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: SPRING_EASE },
  },
};

// ── Project Card ──────────────────────────────────────────────────────────────
interface CardProps {
  project: typeof projects[number];
  visualClass: string;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ProjectCard({
  project,
  visualClass,
  index,
  isHovered,
  anyHovered,
  onMouseEnter,
  onMouseLeave,
}: CardProps) {
  return (
    <motion.article
      className={`pgrid-card pgrid-card--motion${isHovered ? " pgrid-card--hovered" : ""}${anyHovered && !isHovered ? " pgrid-card--dimmed" : ""}`}
      tabIndex={0}
      aria-label={project.title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      variants={cardVariants}
      animate={isHovered ? "expanded" : "collapsed"}
      initial="collapsed"
    >
      {/* Background visual */}
      <div className={`pgrid-bg ${visualClass}`} aria-hidden="true" />

      {/* Dark gradient overlay */}
      <div className="pgrid-gradient" aria-hidden="true" />

      {/* ── Collapsed: title + short desc ── */}
      <motion.div
        className="pgrid-default"
        aria-hidden={isHovered}
        variants={defaultContentVariants}
        animate={isHovered ? "hidden" : "visible"}
        initial="visible"
        style={{ pointerEvents: isHovered ? "none" : "auto" }}
      >
        <span className="pgrid-num">0{index + 1}</span>
        <h3 className="pgrid-card-title">{project.title}</h3>
        <p className="pgrid-card-desc">{project.description}</p>
      </motion.div>

      {/* ── Expanded: full project info, shown on hover ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pgrid-expanded pgrid-expanded--motion"
            variants={expandedContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Status · Year */}
            <motion.p className="pgrid-exp-eyebrow" variants={expandedItemVariants}>
              {project.status.toUpperCase()} · {project.year}
            </motion.p>

            {/* Title */}
            <motion.h3 className="pgrid-exp-title" variants={expandedItemVariants}>
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p className="pgrid-exp-desc" variants={expandedItemVariants}>
              {project.description}
            </motion.p>

            {/* Key Features */}
            <motion.ul className="pgrid-exp-features" variants={expandedItemVariants}>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </motion.ul>

            {/* Stack Tags */}
            <motion.div className="pgrid-exp-tags" variants={expandedItemVariants}>
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              className="button button-primary pgrid-exp-cta"
              href="#contact"
              variants={expandedItemVariants}
            >
              Inquire About This Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="page-shell">

      {/* Hero */}
      <section className="section page-hero">
        <div className="container">
          <FadeUp>
            <p className="eyebrow pill">My Projects</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1>
              Featured <span>Projects</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p>
              Software solutions built through academic study, self-learning, and hands-on
              development. Each project represents a real problem solved.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 2×2 Hover-Expand Grid ────────────────────────────────────────── */}
      <section className="section pgrid-section">
        <div className="container">
          <div className="pgrid-track pgrid-track--motion">
            {projects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 0.07} className="pgrid-fadewrap">
                <ProjectCard
                  project={project}
                  visualClass={visualClasses[i]}
                  index={i}
                  isHovered={hoveredIndex === i}
                  anyHovered={hoveredIndex !== null}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section philosophy">
        <div className="container centered-heading">
          <FadeUp>
            <p className="eyebrow">Principles</p>
            <h2>Project Philosophy</h2>
          </FadeUp>
        </div>
        <div className="container principle-grid">
          {projectPrinciples.map(([title, description], i) => (
            <FadeUp key={title} delay={i * 0.08}>
              <article className="glass-card" style={{ padding: "34px" }}>
                <h3>{title}</h3>
                <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>{description}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container page-cta">
          <FadeUp>
            <h2>Interested in Collaborating?</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p>I am open to new challenges, academic collaborations, and learning opportunities.</p>
          </FadeUp>
          <FadeUp delay={0.14}>
            <a className="button button-primary" href="#contact">
              Get In Touch
            </a>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
