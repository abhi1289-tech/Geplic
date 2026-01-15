"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function PactDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [pact, setPact] = useState<any>(null);
  const [loadingPact, setLoadingPact] = useState(true);

  // 🔹 Fetch pact
  useEffect(() => {
    if (loading) return;
    if (!user || !id) return;

    const fetchPact = async () => {
      const ref = doc(db, "pacts", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        router.replace("/dashboard");
        return;
      }

      const data = snap.data();

      // Bind counterparty UID once
      if (user.email === data.counterpartyEmail && !data.counterpartyId) {
        await updateDoc(ref, { counterpartyId: user.uid });
      }

      // Access control
      if (
        data.creatorId !== user.uid &&
        data.counterpartyEmail !== user.email
      ) {
        router.replace("/dashboard");
        return;
      }

      setPact({ id: snap.id, ...data });
      setLoadingPact(false);
    };

    fetchPact();
  }, [user, loading, id, router]);

  const update = async (data: any) => {
    const ref = doc(db, "pacts", id as string);
    await updateDoc(ref, data);
    setPact((p: any) => ({ ...p, ...data }));
  };

  if (loading || loadingPact) {
    return <div className="p-6 text-white">Loading pact…</div>;
  }

  if (!pact) return null;

  const isCreator = user?.uid === pact.creatorId;
  const isCounterparty = user?.email === pact.counterpartyEmail;

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-3xl px-6 py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm text-white/60 hover:text-white"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold">{pact.title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Status:{" "}
          <span
            className={
              pact.status === "active"
                ? "text-green-400"
                : "text-yellow-400"
            }
          >
            {pact.status}
          </span>
        </p>

        {pact.status === "active" && (
          <p className="mt-2 text-sm text-green-400">
            🔒 This pact is active and locked.
          </p>
        )}

        {/* Creator action */}
        {pact.status === "draft" && isCreator && (
          <button
            onClick={() => update({ status: "active" })}
            className="mt-6 rounded-md bg-green-500 px-5 py-2 font-medium text-black"
          >
            Activate Pact
          </button>
        )}

        {/* Counterparty decision */}
        {pact.status === "active" &&
          pact.counterpartyStatus === "pending" &&
          isCounterparty && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => update({ counterpartyStatus: "accepted" })}
                className="rounded-md bg-green-500 px-4 py-2 font-medium text-black"
              >
                Accept
              </button>
              <button
                onClick={() => update({ counterpartyStatus: "rejected" })}
                className="rounded-md bg-red-500 px-4 py-2 font-medium text-black"
              >
                Reject
              </button>
            </div>
          )}

        {/* Waiting state */}
        {pact.status === "active" &&
          pact.counterpartyStatus === "pending" &&
          isCreator && (
            <p className="mt-4 text-sm text-yellow-400">
              ⏳ Waiting for the other party to respond.
            </p>
          )}

        {/* Accepted / Rejected */}
        {pact.counterpartyStatus === "accepted" && (
          <p className="mt-4 text-sm text-green-400">
            ✅ Pact accepted by the other party.
          </p>
        )}
        {pact.counterpartyStatus === "rejected" && (
          <p className="mt-4 text-sm text-red-400">
            ❌ Pact rejected by the other party.
          </p>
        )}

        {/* Consent blocks */}
        {pact.status === "active" &&
          pact.counterpartyStatus === "accepted" &&
          ((isCreator && !pact.creatorConsented) ||
            (isCounterparty && !pact.counterpartyConsented)) && (
            <div className="mt-6 rounded-lg border border-white/10 p-4">
              <p className="text-sm text-white/80">
                Please confirm that you agree to the terms of this pact.
              </p>
              <button
                onClick={() =>
                  update(
                    isCreator
                      ? {
                          creatorConsented: true,
                          creatorConsentedAt: new Date(),
                        }
                      : {
                          counterpartyConsented: true,
                          counterpartyConsentedAt: new Date(),
                        }
                  )
                }
                className="mt-3 rounded-md bg-white px-4 py-2 font-medium text-black"
              >
                I Agree
              </button>
            </div>
          )}

        {/* Completed */}
        {pact.creatorConsented && pact.counterpartyConsented && (
          <>
            <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="font-medium text-green-400">
                ✅ Free Pact completed with mutual consent.
              </p>
              <p className="mt-1 text-sm text-green-300">
                This agreement is digitally recorded.
              </p>
            </div>

            <button
              onClick={() => router.push(`/pacts/${id}/document`)}
              className="mt-4 rounded-md bg-white px-4 py-2 text-black"
            >
              View Agreement Document
            </button>
          </>
        )}

        {/* Details */}
        <div className="mt-8 space-y-2 text-white/80">
          <p><strong>Amount:</strong> ₹{pact.amount}</p>
          <p><strong>Description:</strong> {pact.description}</p>
          <p className="text-sm text-white/60">
            Other party: {pact.counterpartyEmail}
          </p>
        </div>
      </main>
    </div>
  );
}
