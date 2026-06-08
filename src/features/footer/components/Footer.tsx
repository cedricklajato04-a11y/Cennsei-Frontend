import { contactInfo, navItems, type PageKey } from "../../../shared/constants/portfolio";

export function Footer({ activePage }: { activePage: PageKey }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand column */}
        <div className="footer-brand">
          <a className="brand" href="#home">
            Cennsei<span>.</span>
          </a>
          <p>
            Computer Science Student | Software Developer
          </p>
          <p style={{ marginTop: "8px", fontSize: "0.82rem", color: "var(--text-dim)" }}>
            Building clean, practical, and user-focused digital solutions while continuously
            growing as a developer.
          </p>
          <div className="social-row" aria-label="Social links">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              aria-label="Send email"
            >
              Email
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3>Navigation</h3>
          {navItems.slice(0, 3).map((item) => (
            <a
              className={activePage === item.page ? "active" : ""}
              href={`#${item.page}`}
              key={item.page}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* More links */}
        <div>
          <h3>More</h3>
          {navItems.slice(3).map((item) => (
            <a
              className={activePage === item.page ? "active" : ""}
              href={`#${item.page}`}
              key={item.page}
            >
              {item.label}
            </a>
          ))}
          <a href="/cennsei-resume.pdf" download="Cennsei_Resume.pdf">
            Download Resume
          </a>
        </div>

        {/* Status */}
        <div>
          <h3>Status</h3>
          <div className="status-card">
            <span aria-hidden="true" />
            Available for internships &amp; opportunities
          </div>
          <p className="copyright">© 2026 Cennsei. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
