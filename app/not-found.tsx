"use client";

import Link from "next/link";
import BrandLogo from "../components/BrandLogo";

export default function NotFound() {
  return (
    <main className="geplic-404">
      <div className="geplic-404-glow geplic-404-glow-one" />
      <div className="geplic-404-glow geplic-404-glow-two" />

      <section className="geplic-404-card">

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="geplic-404-brand">
          <BrandLogo size="lg" />
        </div>


        {/* =====================================================
            DOCUMENT VISUAL
        ===================================================== */}

        <div
          className="geplic-404-document"
          aria-hidden="true"
        >
          <div className="geplic-404-document-paper">

            <div className="geplic-404-document-fold" />

            <div className="geplic-404-document-line large" />
            <div className="geplic-404-document-line" />
            <div className="geplic-404-document-line short" />

            <div className="geplic-404-document-sign">
              <span />
              <span />
            </div>

          </div>

          <div className="geplic-404-number">
            404
          </div>
        </div>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="geplic-404-content">

          <p className="geplic-404-eyebrow">
            PAGE NOT FOUND
          </p>

          <h1>
            This page doesn’t exist.
          </h1>

          <p className="geplic-404-description">
            The page or agreement you’re looking for may have been
            moved, deleted, or the link may no longer be valid.
          </p>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="geplic-404-actions">

            <Link
              href="/dashboard"
              className="btn btn-primary btn-lg"
            >
              <span>Go to Dashboard</span>
              <span className="geplic-404-arrow">
                →
              </span>
            </Link>


            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => window.history.back()}
            >
              <span className="geplic-404-arrow">
                ←
              </span>

              <span>
                Go Back
              </span>
            </button>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="geplic-404-footer">

          <span>
            Geplic
          </span>

          <span className="geplic-404-footer-dot">
            •
          </span>

          <span>
            Digital Agreements
          </span>

        </footer>

      </section>
    </main>
  );
}