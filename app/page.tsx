"use client";

import AppHeader from "@/components/AppHeader";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(0,153,255,0.15),transparent_35%)]">

      {/* NAVBAR */}

      <AppHeader
  rightContent={
    user ? (
      <button
        onClick={() => router.push("/dashboard")}
        className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2 font-semibold text-black"
      >
        Dashboard
      </button>
    ) : (
      <>
        <button
          onClick={() => router.push("/login")}
          className="rounded-xl border border-white/10 px-5 py-2"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2 font-semibold text-black"
        >
          Sign Up
        </button>
      </>
    )
  }
/>

      {/* HERO */}

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">

        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
          Create Digital Agreements
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/60">
          Create, negotiate, accept and verify agreements online with
          transparent audit trails and digital verification.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <button
            onClick={() =>
              router.push(
                user ? "/pact/new" : "/login"

              )
            }
            className="rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-4 font-semibold text-black"
          >
            Create Agreement
          </button>

          <button
            onClick={() => router.push("/verify")}
            className="rounded-2xl border border-white/10 px-8 py-4"
          >
            Verify Agreement
          </button>

        </div>

      </section>

      {/* FLOW */}

      <section className="mx-auto max-w-6xl px-6 py-12">

        <h2 className="text-center text-4xl font-bold">
          Agreement Lifecycle
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-6">

          {[
  {
    title:"Create",
    desc:"Create agreement draft"
  },
  {
    title:"Edit",
    desc:"Modify terms before sending"
  },
  {
    title:"Send",
    desc:"Share with counterparty"
  },
  {
    title:"Review",
    desc:"Counterparty reviews terms"
  },
  {
    title:"Accept",
    desc:"Digital acceptance recorded"
  },
  {
    title:"Complete / Void",
    desc:"Finalize or cancel agreement"
  }
].map((step) => (
            <div
  key={step.title}
  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center"
>
  <p className="font-semibold">
    {step.title}
  </p>

  <p className="mt-2 text-sm text-white/50">
    {step.desc}
  </p>
</div>
          ))}

        </div>

      </section>

      {/* AGREEMENT TYPES */}

      <section className="mx-auto max-w-6xl px-6 py-16">

        <h2 className="text-center text-4xl font-bold">
          Agreement Types
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {[
            "Loan Agreement",
            "Freelance Service",
            "General Promise",
            "Rent Agreement",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >
              <h3 className="text-xl font-semibold">
                {item}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="mx-auto max-w-6xl px-6 py-16">

        <h2 className="text-center text-4xl font-bold">
          Why Geplic
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {[
            "Digital Acceptance",
            "Agreement Timeline",
            "Audit Logs",
            "Verification Hash",
            "Cloud Storage",
            "Secure Records",
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >
              <h3 className="font-semibold">
                {feature}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">

        <h2 className="text-4xl font-bold">
          Ready to Create Your First Agreement?
        </h2>

        <p className="mt-4 text-white/60">
          Start documenting commitments with transparent digital records.
        </p>

        <button
          onClick={() =>
            router.push(
              user ? "/pact/new" : "/login"
            )
          }
          className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-4 font-semibold text-black"
        >
          Get Started
        </button>

      </section>
    {/* FOOTER */}

<footer className="mt-24 border-t border-white/10">

  <div className="mx-auto max-w-6xl px-6 py-10">

    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

      <div className="text-center md:text-left">

        <BrandLogo />

        <p className="mt-2 text-sm text-white/50">
          Create, manage and verify digital agreements.
        </p>

      </div>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">

        <button
          onClick={() => router.push("/privacy")}
          className="hover:text-white"
        >
          Privacy Policy
        </button>

        <button
          onClick={() => router.push("/terms")}
          className="hover:text-white"
        >
          Terms
        </button>

      </div>

    </div>

    <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/40">
      © {new Date().getFullYear()} Geplic. All rights reserved.
    </div>

  </div>

</footer>
    </div>
  );
}