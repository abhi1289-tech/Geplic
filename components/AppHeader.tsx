"use client";

import { useRouter } from "next/navigation";
import BrandLogo from "./BrandLogo";

type AppHeaderProps = {
  rightContent?: React.ReactNode;
};

export default function AppHeader({
  rightContent,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <div
          className="cursor-pointer"
          onClick={() => router.push("/")}
        >
          <BrandLogo />
        </div>

        <div className="flex items-center gap-3">
          {rightContent}
        </div>

      </div>
    </header>
  );
}