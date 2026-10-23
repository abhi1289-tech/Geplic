"use client";

import Link from "next/link";
import BrandLogo from "../components/BrandLogo";

export default function NotFound() {
  return (
    <main className="geplic-404">
      <div className="geplic-404-glow geplic-404-glow-one" aria-hidden="true" />
      <div className="geplic-404-glow geplic-404-glow-two" aria-hidden="true" />

      <section className="geplic-404-card" aria-labelledby="geplic-404-title">
        <header className="geplic-404-header">
          <BrandLogo size="lg" />
          <span className="geplic-404-header-label">AGREEMENT WORKSPACE</span>
        </header>

        <div className="geplic-404-hero">
          <div className="geplic-404-copy">
            <div className="geplic-404-number" aria-label="Error 404">404</div>
            <p className="geplic-404-eyebrow">DOCUMENT NOT FOUND</p>
            <h1 id="geplic-404-title">Looks like this page missed the paperwork.</h1>
            <p className="geplic-404-description">
              We couldn’t find the page you requested. It may have moved, or the link may be incorrect.
              Your agreements are still safe.
            </p>
            <div className="geplic-404-actions">
              <Link href="/dashboard" className="btn btn-primary btn-lg">
                <span aria-hidden="true">⌂</span>
                <span>Go to Dashboard</span>
                <span className="geplic-404-arrow" aria-hidden="true">→</span>
              </Link>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign("/dashboard")}
              >
                <span className="geplic-404-arrow" aria-hidden="true">←</span>
                <span>Go Back</span>
              </button>
            </div>
          </div>

          <div className="geplic-404-scene" role="img" aria-label="An animated agreement document with floating pages, a signing pen, and a verification seal">
            <div className="geplic-404-document document-back document-back-one" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="geplic-404-document document-back document-back-two" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            <div className="geplic-404-document document-main" aria-hidden="true">
              <div className="document-heading"><i /><i /></div>
              <div className="document-rule" />
              <div className="document-lines"><i /><i /><i /><i /><i /></div>
              <div className="document-signature"><span>Ag</span><i /></div>
              <div className="document-seal"><span>✓</span></div>
            </div>
            <div className="geplic-404-pen" aria-hidden="true"><span /></div>
            <div className="geplic-404-floating-check" aria-hidden="true">✓</div>
            <div className="geplic-404-scene-caption" aria-hidden="true">
              <span className="caption-icon">✓</span>
              <span><b>GEPLIC</b><small>Agreement protected</small></span>
            </div>
            <span className="geplic-404-spark spark-one" aria-hidden="true">✦</span>
            <span className="geplic-404-spark spark-two" aria-hidden="true">✧</span>
          </div>
        </div>

        <footer className="geplic-404-footer">
          <span className="geplic-404-footer-mark" aria-hidden="true">✓</span>
          <span>Geplic keeps your agreements in order.</span>
        </footer>
      </section>
    </main>
  );
}
