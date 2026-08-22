"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const router = useRouter();
  const { user } = useAuth();

  function createAgreement() {
    router.push(user ? "/pact/new" : "/login");
  }

  function verifyAgreement() {
    router.push("/verify");
  }

  return (
    <section className="hero">
      <div className="hero-container">

        <h1 className="hero-title">
          Create Agreements.
          <br />
          Track Acceptance.
          <br />
          Verify Authenticity.
        </h1>

        <p className="hero-description">
          Create, send, accept and verify digital
          agreements with audit trails,
          acceptance records and secure
          document verification.
        </p>

        <div className="hero-actions">

          <button
            className="btn btn-primary btn-lg"
            onClick={createAgreement}
          >
            Create Agreement
          </button>

          <button
            className="btn btn-secondary btn-lg"
            onClick={verifyAgreement}
          >
            Verify Agreement
          </button>

        </div>

      </div>
    </section>
  );
}