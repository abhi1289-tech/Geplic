"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function PactDocumentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [pact, setPact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const AGREEMENT_LABELS: Record<string, string> = {
    general_promise: "General Promise",
    personal_loan: "Personal Loan",
    freelance_service: "Freelance / Service",
    };

  useEffect(() => {
    if (!user || !id) return;

    const fetchPact = async () => {
      const ref = doc(db, "pacts", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        router.replace("/dashboard");
        return;
      }

      const data = snap.data();

      // Access check
      if (
        data.creatorId !== user.uid &&
        data.counterpartyEmail !== user.email
      ) {
        router.replace("/dashboard");
        return;
      }

      setPact(data);
      setLoading(false);
    };

    fetchPact();
  }, [user, id, router]);

  if (loading) {
    return <div className="p-6">Loading document...</div>;
  }

  if (!pact) return null;

  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-500 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-center mb-8">
        AGREEMENT DOCUMENT
      </h1>

      <section className="mb-6">
        <p>
          <strong>Agreement Type:</strong>{" "}
          {AGREEMENT_LABELS[pact.category] || "General Agreement"}
        </p>

        <p><strong>Date:</strong> {pact.createdAt?.toDate?.().toDateString()}</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="font-semibold mb-2">PARTIES</h2>
        <p><strong>Party A (Creator):</strong>{" "}{pact.creatorEmail || "Email not available"}</p>

        <p><strong>Party B (Counterparty):</strong> {pact.counterpartyEmail}</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="font-semibold mb-2">TERMS & DESCRIPTION</h2>
        <p className="whitespace-pre-wrap">{pact.description}</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="font-semibold mb-2">FINANCIAL DETAILS</h2>
        <p><strong>Amount:</strong> ₹{pact.amount}</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="font-semibold mb-2">CONSENT STATUS</h2>
        <p>Creator Consent: {pact.creatorConsented ? "Yes" : "No"}</p>
        <p>Counterparty Consent: {pact.counterpartyConsented ? "Yes" : "No"}</p>
      </section>

      <hr className="my-6" />

      <section className="text-sm text-gray-600">
        <p>
          This is a digitally recorded free pact. It reflects mutual consent
          between the involved parties. This agreement identifies parties by
          their registered email addresses. This agreement is not legally enforceable in court.
        </p>
      </section>
    </div>
  );
}
