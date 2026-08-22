"use client";

import { useRouter } from "next/navigation";

type Props = {
  fullName?: string;
  designation?: string;
  initials: string;
};

export default function DashboardHero({
  fullName,
  designation,
  initials,
}: Props) {
  const router = useRouter();

  return (
    <section className="dashboard-hero">

      <div className="dashboard-hero-content">

        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="dashboard-avatar"
        >
          {initials}
        </button>

        <div className="dashboard-user">

          <h1 className="dashboard-title">

            <span>
            Welcome back,
            </span>

            <span>
              {" "}
              {fullName || "Captain"}
            </span>

          </h1>

          {designation && (
            <p className="dashboard-designation">
              {designation}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}