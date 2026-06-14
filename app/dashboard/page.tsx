"use client";

import { useAuth } from "@/context/AuthContext";
import BrandLogo from "@/components/BrandLogo";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function DashboardPage() {

  // ⚔️ Auth + Router
  const { user, loading, profile } = useAuth();
  const router = useRouter();

  // ⚔️ Dashboard States
  const [pacts, setPacts] = useState<any[]>([]);
  const [pactsLoading, setPactsLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // ⚔️ User initials fallback
  const initials =
    profile?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  // ⚔️ Category Labels
  const CATEGORY_LABELS: Record<string, string> = {
    personal_loan: "PERSONAL LOAN",
    freelance_service: "FREELANCE / SERVICE",
    general_promise: "GENERAL PROMISE",
    general: "GENERAL PROMISE", // backward compatibility
  };

  // 🔐 Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // 📦 Fetch agreements
  useEffect(() => {

    if (!user || !user.email) {
      setPactsLoading(false);
      return;
    }

    const fetchPacts = async () => {

      try {

        setPactsLoading(true);

        // ⚔️ Agreements created by current user
        const createdQuery = query(
          collection(db, "pacts"),
          where("createdBy", "==", user.uid)
        );

        // ⚔️ Agreements where current user is counterparty
        const receivedQuery = query(
          collection(db, "pacts"),
          where("counterpartyEmail", "==", user.email)
        );

        // ⚔️ Fetch both simultaneously
        const [createdSnap, receivedSnap] = await Promise.all([
          getDocs(createdQuery),
          getDocs(receivedQuery),
        ]);

        // ⚔️ Normalize created agreements
        const created = createdSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ⚔️ Normalize received agreements
        const received = receivedSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ⚔️ Remove duplicates
        const allPacts = [
          ...created,
          ...received.filter(
            (r) => !created.find((c) => c.id === r.id)
          ),
        ];

        // ⚔️ Sort newest first
        allPacts.sort((a: any, b: any) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

        setPacts(allPacts);

      } catch (err) {

        console.error("Fetch Pacts Error:", err);

      } finally {

        setPactsLoading(false);

      }
    };

    fetchPacts();

  }, [user]);

  // ⚔️ Loading screen
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Checking access...
      </div>
    );
  }

  // 🚪 Logout
  const handleLogout = async () => {

    // ⚔️ Prevent multiple clicks
    if (logoutLoading) return;

    try {

      setLogoutLoading(true);

      await signOut(auth);

      router.replace("/login");

    } catch (err) {

      console.error("Logout Error:", err);

    } finally {

      setLogoutLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[radial-gradient(circle_at_top,rgba(0,153,255,0.12),transparent_35%)]">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

         <BrandLogo />

<div className="flex items-center gap-3">

  <button
    onClick={() => router.push("/profile")}
    className="rounded-full border border-cyan-400/20 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-400/50"
  >
    Profile
  </button>

  <button
    onClick={handleLogout}
    disabled={logoutLoading}
    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan-400/30 hover:text-cyan-300"
  >
    {logoutLoading ? "Logging out..." : "Logout"}
  </button>

</div>
</div>

      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-6xl px-8 py-12">

        {/* ================= HERO SECTION ================= */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">

          <div className="space-y-4">

            <div className="flex items-start gap-5">

              {/* ⚔️ Avatar */}
              <button
  onClick={() => router.push("/profile")}
  className="mt-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-xl font-bold text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.12)] transition hover:scale-105 hover:border-cyan-400/50"
>
  {initials}
</button>
              {/* ⚔️ Welcome */}
              <div>

                <h2 className="text-4xl font-black leading-[1.05] tracking-tight">

                  Welcome back,
                  <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                    {" "}
                    {profile?.fullName || "Captain"}
                  </span>

                </h2>

                {profile?.designation && (
                  <p className="mt-2 text-lg text-cyan-300/80">
                    {profile.designation}
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mt-12 flex flex-wrap gap-4">

          <button
            onClick={() => router.push("/pact/new")}
            className="rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,200,255,0.18)] active:scale-[0.98]"
          >
            Create Pact
          </button>

          <button
            onClick={() => router.push("/verify")}
            className="rounded-2xl border border-white/10 bg-black/30 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.03]"
          >
            Verify Agreement
          </button>

        </div>

        {/* ================= STATS ================= */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

          {/* Total */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <p className="text-sm leading-snug text-white/50">
              Total Agreements
            </p>

            <p className="mt-3 text-4xl font-bold text-white">
              {pacts.length}
            </p>

          </div>

          {/* Draft */}
          <div className="rounded-3xl border border-white/10 bg-yellow-500/5 p-5">

            <p className="text-sm text-yellow-200/70">
              Draft
            </p>

            <p className="mt-3 text-4xl font-bold text-yellow-300">
              {pacts.filter((p) => p.status === "draft").length}
            </p>

          </div>

          {/* Pending */}
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-5">

            <p className="text-sm text-yellow-200/70">
              Pending
            </p>

            <p className="mt-3 text-4xl font-bold text-yellow-300">
              {pacts.filter((p) => p.status === "pending").length}
            </p>

          </div>

          {/* Completed */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <p className="text-sm text-emerald-200/70">
              Completed
            </p>

            <p className="mt-3 text-4xl font-bold text-emerald-300">
              {
                pacts.filter(
                  (p) =>
                    p.status === "signed" ||
                    p.status === "completed"
                ).length
              }
            </p>

          </div>

        </div>

        {/* ================= AGREEMENTS HEADER ================= */}
        <div className="mb-5 mt-14 flex items-center justify-between">

          <h3 className="text-xl font-semibold tracking-tight text-white">
            Your Agreements
          </h3>

          <p className="text-sm text-white/40">
            {pacts.length} total
          </p>

        </div>

        {/* ================= AGREEMENTS CONTAINER ================= */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,153,255,0.05)] transition-all duration-300 hover:border-cyan-400/20 hover:shadow-[0_0_60px_rgba(0,153,255,0.08)]">

          {/* ⚔️ Loading state */}
          {pactsLoading ? (

            <div className="flex items-center justify-center py-20 text-white/50">
              Loading agreements...
            </div>

          ) : pacts.length === 0 ? (

            /* ⚔️ Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center">

              <div className="mb-6 rounded-full border border-white/10 bg-white/[0.03] p-5 text-4xl">
                📄
              </div>

              <h3 className="text-2xl font-semibold text-white">
                No agreements yet
              </h3>

              <p className="mt-3 max-w-md text-white/50">
                Create your first digital agreement and start building verified trust.
              </p>

              <button
                onClick={() => router.push("/pact/new")}
                className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
              >
                Create First Pact
              </button>

            </div>

          ) : (

            /* ⚔️ Agreements list */
            <div className="space-y-4">

              {pacts.map((pact) => {

                // ⚔️ Normalize category
                const categoryKey =
                  pact.category || "general_promise";

                const categoryLabel =
                  CATEGORY_LABELS[categoryKey] ||
                  "GENERAL PROMISE";

                // ⚔️ Safe created date
                const createdDate =
                  pact.createdAt
                    ? formatDistanceToNow(
                        pact.createdAt.toDate(),
                        { addSuffix: true }
                      )
                    : "Unknown date";

                return (

                  <Link
                    key={pact.id}
                    href={`/pact/${pact.id}`}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(0,153,255,0.08)]"
                  >

                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-4">

                      {/* Category */}
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                        {categoryLabel}
                      </p>

                      {/* Status */}
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]
                       ${
  pact.status === "completed" ||
  pact.status === "signed"
    ? "border border-green-500/20 bg-green-500/10 text-green-400"
    : pact.status === "pending"
    ? "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
    : pact.status === "proposed"
    ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
    : pact.status === "rejected"
    ? "border border-red-500/20 bg-red-500/10 text-red-400"
    : pact.status === "voided"
    ? "border border-red-500/20 bg-red-500/10 text-red-400"
    : "border border-white/10 bg-white/5 text-white/70"
}`}
                      >

                        <span
                          className={`h-2 w-2 rounded-full
                          ${
  pact.status === "completed" ||
  pact.status === "signed"
    ? "bg-green-400"
    : pact.status === "pending"
    ? "bg-yellow-300"
    : pact.status === "proposed"
    ? "bg-cyan-300"
    : pact.status === "rejected"
    ? "bg-red-400"
    : pact.status === "voided"
    ? "bg-red-400"
    : "bg-white/50"
}`}
                        />

                        {pact.status}

                      </span>

                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-cyan-100">
                      {pact.title || "Untitled Pact"}
                    </h3>

                    {/* Counterparty */}
                    {pact.counterpartyEmail && (
                      <p className="mt-2 text-sm text-white/50">
                        Counterparty: {pact.counterpartyEmail}
                      </p>
                    )}

                    {/* Amount */}
                    {pact.amount !== undefined && (
                      <p className="mt-2 text-sm text-white/70">
                        Amount: ₹{pact.amount}
                      </p>
                    )}

                    {/* Description */}
                    {pact.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-white/60">
                        {pact.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between">

                      <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                        {createdDate}
                      </p>

                      <span className="text-sm text-cyan-200 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-90">
                        View Agreement →
                      </span>

                    </div>

                  </Link>

                );
              })}

            </div>

          )}

        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div className="mt-14">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-white">
              Recent Activity
            </h2>

            <span className="text-sm text-white/40">
              Live audit trail
            </span>

          </div>

          {/* ⚔️ Temporary activity card */}
          <div className="space-y-4">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyan-400/20">

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div className="mt-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                  <div>

                    <p className="font-medium text-white">
                      Dashboard Ready
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Real audit trail system will appear here in future updates.
                    </p>

                  </div>

                </div>

                <span className="text-sm text-white/30">
                  Beta
                </span>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}