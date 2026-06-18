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
          Create Agreements.
Track Acceptance.
Verify Authenticity.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/60">
          Create, send, accept and verify digital agreements with audit trails, acceptance records and document verification.
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
      
      <section className="mx-auto max-w-6xl px-6 py-24">

  <div className="mx-auto max-w-4xl text-center">

    <h2 className="text-4xl font-bold">
      Everyday Agreements Are Easy To Forget
    </h2>

    <p className="mt-8 text-lg leading-8 text-white/60">

      People lend money.

      Freelancers take projects.

      Friends make commitments.

      Landlords and tenants agree on terms.

    </p>

    <p className="mt-6 text-lg leading-8 text-white/60">

      Most of these agreements happen through chats,
      calls and verbal conversations.

      Months later, details become unclear.

    </p>

    <p className="mt-6 text-lg leading-8 text-cyan-300">

      Geplic helps document those commitments with
      digital records, acceptance history,
      audit trails and verification.

    </p>

  </div>

</section>

      {/* FLOW */}

      <section className="mx-auto max-w-6xl px-6 py-12">

  <h2 className="text-center text-4xl font-bold">
    Agreement Lifecycle
  </h2>

  <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

    {[
      {
        title:"Draft",
        color:"border-gray-500/30 bg-gray-500/10 text-gray-300",
        desc:"Agreement created and editable"
      },
      {
        title:"Pending Acceptance",
        color:"border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
        desc:"Offer sent to counterparty"
      },
      {
        title:"Completed",
        color:"border-green-500/30 bg-green-500/10 text-green-300",
        desc:"Agreement digitally accepted"
      },
      {
        title:"Voided",
        color:"border-red-500/30 bg-red-500/10 text-red-300",
        desc:"Agreement cancelled"
      }
    ].map((step) => (
      <div
  key={step.title}
  className={`
    min-h-[200px]
    rounded-3xl
    border
    p-8
    flex
    flex-col
    justify-center
    items-center
    text-center
    transition-all
    hover:-translate-y-1
    hover:shadow-xl
    ${step.color}
  `}
>
        <h3 className="text-xl font-bold">
          {step.title}
        </h3>

        <p className="mt-3 text-sm opacity-80">
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
            {
title:"Loan Agreement",
desc:"Document personal loans between friends and family."
},
            {
title:"Freelance Service",
desc:"Record services, payments and delivery expectations."
},
            {
title:"General Promise",
desc:"Capture commitments and mutual understandings."
},
            {
title:"Rent Agreement",
desc:"Track rental terms, deposits and tenancy details."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >
              <h3 className="text-xl font-semibold text-center text-cyan-300">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-center text-white/50">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </section>
      <section className="mx-auto max-w-6xl px-6 py-20">

<h2 className="text-center text-4xl font-bold">
Why Use Geplic?
</h2>

<div className="mt-12 overflow-hidden rounded-3xl border border-white/10">

<table className="w-full">

<thead>
<tr className="border-b border-white/10">
<th className="p-5 text-center">WhatsApp</th>
<th className="p-5 text-center">Geplic</th>
</tr>
</thead>

<tbody>

<tr className="border-b border-white/10">
<td className="p-5 text-center text-white/50">
Messages can be deleted
</td>

<td className="p-5 text-center text-cyan-300">
Permanent audit trail
</td>
</tr>

<tr className="border-b border-white/10">
<td className="p-5 text-center text-white/50">
No agreement verification
</td>

<td className="p-5 text-center text-cyan-300">
Hash verification
</td>
</tr>

<tr className="border-b border-white/10">
<td className="p-5 text-center text-white/50">
Hard to track approvals
</td>

<td className="p-5 text-center text-cyan-300">
Digital acceptance records
</td>
</tr>

</tbody>

</table>

</div>

</section>

      {/* FEATURES */}

      <section className="mx-auto max-w-6xl px-6 py-16">

        <h2 className="text-center text-4xl font-bold">
          Platform Features
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
              <h3 className="font-semibold text-center text-cyan-300">
                {feature}
              </h3>
            </div>
          ))}

        </div>

      </section>
<section className="mx-auto max-w-6xl px-6 py-20">

<h2 className="text-center text-4xl font-bold">
Coming Soon
</h2>

<div className="mt-12 grid gap-6 md:grid-cols-2">

<div className="rounded-3xl border border-white/10 p-8 text-center text-cyan-300">
Legally Executable Agreements
</div>

<div className="rounded-3xl border border-white/10 p-8 text-center text-cyan-300">
eSign Integration
</div>

<div className="rounded-3xl border border-white/10 p-8 text-center text-cyan-300">
Stamp Duty Support
</div>

<div className="rounded-3xl border border-white/10 p-8 text-center text-cyan-300">
Business Agreements
</div>

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