"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pacts, setPacts] = useState<any[]>([]);

  // 🟦 CATEGORY LABEL MAP
  const CATEGORY_LABELS: Record<string, string> = {
    personal_loan: "PERSONAL LOAN",
    freelance_service: "FREELANCE / SERVICE",
    general_promise: "GENERAL PROMISE",
    general: "GENERAL PROMISE", // backward compatibility
  };

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // 📦 Fetch pacts
  useEffect(() => {
    if (!user || !user.email) return;

    const fetchPacts = async () => {
      const createdQuery = query(
        collection(db, "pacts"),
        where("creatorId", "==", user.uid)
      );

      const receivedQuery = query(
        collection(db, "pacts"),
        where("counterpartyEmail", "==", user.email)
      );

      const [createdSnap, receivedSnap] = await Promise.all([
        getDocs(createdQuery),
        getDocs(receivedQuery),
      ]);

      const created = createdSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const received = receivedSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const allPacts = [
        ...created,
        ...received.filter(r => !created.find(c => c.id === r.id)),
      ];

      // newest first
      allPacts.sort((a: any, b: any) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });

      setPacts(allPacts);
    };

    fetchPacts();
  }, [user]);

  if (loading || !user) {
    return <div className="p-6 text-white">Checking access…</div>;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold">Geplic</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-white/60 hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-xl font-medium">
          Welcome{user.email ? `, ${user.email}` : ""}
        </h2>

        <div className="mt-6 rounded-xl border border-white/10 p-6">
          {pacts.length === 0 ? (
            <div className="text-white/60">
              <p>No pacts yet.</p>
              <p className="mt-2 text-sm">
                Create or accept a pact to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pacts.map((pact) => {
                // ✅ FIX: normalize category first
                const categoryKey = pact.category || "general_promise";
                const categoryLabel =
                  CATEGORY_LABELS[categoryKey] || "GENERAL PROMISE";

                return (
                  <Link
                    key={pact.id}
                    href={`/pacts/${pact.id}`}
                    className="block rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wide text-blue-400">
                        {categoryLabel}
                      </p>
                      <span
                        className={`text-xs ${
                          pact.status === "active"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {pact.status}
                      </span>
                    </div>

                    <h3 className="mt-1 text-base font-medium">
                      {pact.title || "Untitled Pact"}
                    </h3>

                    {pact.amount !== undefined && (
                      <p className="mt-1 text-sm text-white/70">
                        Amount: ₹{pact.amount}
                      </p>
                    )}

                    {pact.description && (
                      <p className="mt-1 text-sm text-white/60 line-clamp-2">
                        {pact.description}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          <button
            onClick={() => router.push("/pacts/new")}
            className="mt-6 rounded-md bg-white px-5 py-2 font-medium text-black"
          >
            Create Pact
          </button>
        </div>
      </main>
    </div>
  );
}
