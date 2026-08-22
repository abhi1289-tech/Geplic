"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CTASection() {

  const router = useRouter();
  const { user } = useAuth();

  function handleStart() {
    router.push(
      user ? "/pact/new" : "/login"
    );
  }

  return (

    <section className="cta-section">

      <div className="cta-container">

        <h2 className="section-title">

          Ready to Create Your First Agreement?

        </h2>

        <p className="section-description">

          Start documenting commitments with
          transparent digital records.

        </p>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleStart}
        >
          Get Started
        </button>

      </div>

    </section>

  );

}