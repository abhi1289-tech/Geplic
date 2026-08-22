"use client";

import { useRouter } from "next/navigation";
import BrandLogo from "../BrandLogo";

export default function FooterSection() {

  const router = useRouter();

  return (

    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-brand">

          <BrandLogo />

          <p className="footer-description">

            Create, manage and verify digital agreements.

          </p>

        </div>

        <nav className="footer-nav">

          <button
            onClick={() => router.push("/privacy")}
            className="footer-link"
          >
            Privacy Policy
          </button>

          <button
            onClick={() => router.push("/terms")}
            className="footer-link"
          >
            Terms
          </button>

        </nav>

      </div>

      <div className="footer-copyright">

        © {new Date().getFullYear()} Geplic.
        All rights reserved.

      </div>

    </footer>

  );

}