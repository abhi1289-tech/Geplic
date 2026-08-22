"use client";

import { useRouter } from "next/navigation";

import AppHeader from "@/components/AppHeader";

import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardActions from "@/components/dashboard/DashboardActions";
import DashboardStats from "@/components/dashboard/DashboardStats";
import AgreementList from "@/components/dashboard/AgreementList";
import EmptyState from "@/components/dashboard/EmptyState";
import RecentActivity from "@/components/dashboard/RecentActivity";

import useDashboard from "@/hooks/useDashboard";

export default function DashboardPage() {

  const router = useRouter();

  const {
    user,
    profile,
    loading,
    initials,

    pacts,
    pactsLoading,

    logoutLoading,
    logout,

    stats,
  } = useDashboard();

  if (loading || !user) {
    return (
      <div className="dashboard-loading">
        Checking access...
      </div>
    );
  }

  return (

    <div className="dashboard-page">

      <AppHeader 
        rightContent={
          <>

            <button
              onClick={() => router.push("/profile")}
              className="btn btn-secondary btn-sm"
            >
              Profile
            </button>

            <button
              onClick={logout}
              disabled={logoutLoading}
              className="btn btn-secondary btn-sm"
            >
              {logoutLoading
                ? "Logging out..."
                : "Logout"}
            </button>

          </>
        }
      />

      <main className="dashboard-main">

        <DashboardHero
          initials={initials}
          fullName={profile?.fullName}
          designation={profile?.designation}
        />

        <DashboardActions
          onCreatePact={() =>
            router.push("/pact/new")
          }
          onVerifyAgreement={() =>
            router.push("/verify")
          }
        />

        <DashboardStats
          total={stats.total}
          draft={stats.draft}
          pending={stats.pending}
          completed={stats.completed}
        />

        <section className="dashboard-section">

          <header className="dashboard-section-header">

            <h2 className="dashboard-section-title">
              Your Agreements
            </h2>

            <span className="dashboard-section-count">
              {stats.total} total
            </span>

          </header>

          <div className="dashboard-panel">

            {pactsLoading ? (

              <div className="dashboard-loading">
                Loading agreements...
              </div>

            ) : pacts.length === 0 ? (

              <EmptyState
                onCreate={() =>
                  router.push("/pact/new")
                }
              />

            ) : (

              <AgreementList
                pacts={pacts}
              />

            )}

          </div>

        </section>

        <RecentActivity />

      </main>

    </div>

  );

}