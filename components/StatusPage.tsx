"use client";

import { useRouter } from "next/navigation";

type Props = {
  message: string;
  showNavigation?: boolean;
};

export default function StatusPage({
  message,
  showNavigation = false,
}: Props) {
  const router = useRouter();
  const isLoading = /loading/i.test(message);

  function goBack() {
    // Keep the user inside Geplic when there is no useful in-app history.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <main
      className={`status-page${isLoading ? " status-page-loading" : ""}`}
      role={isLoading ? "status" : undefined}
      aria-live={isLoading ? "polite" : undefined}
      aria-busy={isLoading ? true : undefined}
    >
      <section className="status-page-content" aria-label={isLoading ? "Loading" : "Page status"}>
        {isLoading && (
          <span className="status-page-spinner" aria-hidden="true" />
        )}
        <p className="status-page-message">{message}</p>
        {showNavigation && !isLoading && (
          <nav className="status-page-actions" aria-label="Recovery navigation">
            <button type="button" className="btn btn-secondary" onClick={goBack}>
              <span aria-hidden="true">←</span> Go Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => router.replace("/dashboard")}>
              <span aria-hidden="true">⌂</span> Go to Dashboard
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
