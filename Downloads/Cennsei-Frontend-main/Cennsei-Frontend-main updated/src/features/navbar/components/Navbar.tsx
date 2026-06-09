import { useEffect, useRef, useState } from "react";
import { navItems, type PageKey } from "../../../shared/constants/portfolio";

export function Navbar({ activePage }: { activePage: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close on hash change (page navigation)
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={menuRef}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          Cennsei<span>.</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links" role="list">
          {navItems.map((item) => (
            <a
              role="listitem"
              className={activePage === item.page ? "active" : ""}
              key={item.page}
              href={`#${item.page}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a className="button button-primary button-small nav-cta" href="#contact">
          Contact Me
        </a>

        {/* Mobile hamburger */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              className={activePage === item.page ? "active" : ""}
              key={item.page}
              href={`#${item.page}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="button button-primary"
            href="#contact"
            style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}
            onClick={() => setMenuOpen(false)}
          >
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
}
