import { type FormEvent, useEffect, useState } from "react";
import { FadeUp } from "../../../shared/animations/FadeUp";
import { apiClient } from "../../../services/api-client";
import { contactInfo } from "../../../shared/constants/portfolio";

function getTime() {
  return new Intl.DateTimeFormat("en-PH", {
    hour:     "2-digit",
    minute:   "2-digit",
    second:   "2-digit",
    hour12:   false,
    timeZone: "Asia/Manila",
  }).format(new Date());
}

type FormState = "idle" | "loading" | "success" | "error";

export function ContactPage() {
  const [time, setTime]   = useState(getTime);
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name") as HTMLInputElement).value,
      email:   (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      await apiClient.post("/api/contact", data);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="page-shell contact-page">
      <section className="section page-hero">
        <div className="container">
          <FadeUp>
            <p className="eyebrow pill">Available for new opportunities</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1>
              Let&apos;s Build Something <span>Great Together.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p>
              Interested in collaborating, discussing projects, or connecting professionally?
              Feel free to reach out — I&apos;d love to hear from you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Quick-action cards */}
      <section className="container contact-actions">
        <FadeUp>
          <a
            className="glass-card contact-action"
            href={contactInfo.github}
            rel="noreferrer"
            target="_blank"
          >
            <span className="contact-action-icon" aria-hidden="true">GH</span>
            <strong>GitHub</strong>
            View Source
          </a>
        </FadeUp>
        <FadeUp delay={0.06}>
          <a
            className="glass-card contact-action"
            href={contactInfo.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            <span className="contact-action-icon" aria-hidden="true">in</span>
            <strong>LinkedIn</strong>
            Connect
          </a>
        </FadeUp>
        <FadeUp delay={0.12}>
          <a className="glass-card contact-action" href="/cennsei-resume.pdf" download="Cennsei_Resume.pdf">
            <span className="contact-action-icon" aria-hidden="true">CV</span>
            <strong>Resume</strong>
            Download PDF
          </a>
        </FadeUp>
      </section>

      {/* Contact grid */}
      <section className="container contact-grid">
        <FadeUp>
          <aside className="glass-card direct-contact">
            <h2>Direct Contact</h2>
            <div>
              <strong>Email Address</strong>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div>
              <strong>Phone Number</strong>
              <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
            </div>
            <div>
              <strong>Location</strong>
              <span>{contactInfo.location}</span>
            </div>
            <div className="time-card">
              <strong>Current Time (PHT)</strong>
              <span>{time}</span>
            </div>
          </aside>
        </FadeUp>

        <FadeUp delay={0.08}>
          <form
            className="glass-card contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <label htmlFor="cf-name">
              Full Name
              <input
                id="cf-name"
                name="name"
                type="text"
                placeholder="e.g. Juan dela Cruz"
                required
                autoComplete="name"
              />
            </label>

            <label htmlFor="cf-email">
              Email Address
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="juan@example.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="wide" htmlFor="cf-message">
              Your Message
              <textarea
                id="cf-message"
                name="message"
                placeholder="Tell me about your project, goals, or just say hi..."
                rows={6}
                required
                minLength={10}
              />
            </label>

            {status === "success" && (
              <p className="form-feedback success wide" role="status">
                ✓ Message sent! I&apos;ll get back to you within 24 hours.
              </p>
            )}

            {status === "error" && (
              <p className="form-feedback error wide" role="alert">
                ✕ {errorMsg}
              </p>
            )}

            <button
              className="button button-primary wide"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>

            <p className="wide" style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "0.82rem" }}>
              Typical response time: less than 24 hours
            </p>
          </form>
        </FadeUp>
      </section>
    </div>
  );
}
