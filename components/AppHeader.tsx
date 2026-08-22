"use client";

import { useRouter } from "next/navigation";
import BrandLogo from "./BrandLogo";

type Props = {
  rightContent?: React.ReactNode;
};

export default function AppHeader({
  rightContent,
}: Props) {
  const router = useRouter();

  function navigateHome() {
    router.push("/");
  }

  return (
    <header className="app-header">
      <div className="app-header-container">

        <button
          type="button"
          className="app-logo-button"
          onClick={navigateHome}
          aria-label="Go to home page"
        >
          <BrandLogo size="lg" />
        </button>

        <nav
          className="app-header-actions"
          aria-label="Primary Navigation"
        >
          {rightContent}
        </nav>

      </div>
    </header>
  );
}