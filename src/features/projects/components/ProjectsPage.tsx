import { FadeUp } from "../../../shared/animations/FadeUp";
import { projectPrinciples, projects } from "../../../shared/constants/portfolio";

const visualClasses = ["payroll-photo", "tuition-photo", "task-photo"];

export function ProjectsPage() {
  return (
    <div className="page-shell">
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

      {/* Featured Project — Payroll */}
      <section className="container portfolio-list">
        <FadeUp>
          <article className="glass-card featured-project">
            <div className="project-photo payroll-photo" aria-hidden="true" />
            <div className="featured-copy">
              <p className="eyebrow">{projects[0].status} · {projects[0].year}</p>
              <h2>{projects[0].title}</h2>
              <p>{projects[0].description}</p>
              <ul className="feature-list">
                {projects[0].features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="tag-cloud" style={{ marginTop: "20px" }}>
                {projects[0].stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="action-row">
                <a className="button button-primary" href="#contact">
                  Inquire About This Project
                </a>
                {projects[0].githubUrl && (
                  <a
                    className="button button-secondary"
                    href={projects[0].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        </FadeUp>

        {/* Remaining Projects */}
        <div className="project-page-grid">
          {projects.slice(1).map((project, index) => (
            <FadeUp key={project.slug} delay={index * 0.1}>
              <article className="glass-card project-page-card">
                <div
                  className={`project-photo ${visualClasses[index + 1]}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="eyebrow">{project.status} · {project.year}</p>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <ul className="feature-list">
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="tag-cloud" style={{ marginTop: "20px" }}>
                    {project.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="action-row">
                    <a className="button button-primary" href="#contact">
                      Learn More
                    </a>
                    {project.githubUrl && (
                      <a
                        className="button button-secondary"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
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
