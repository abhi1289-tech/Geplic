"use client";

type Props = {
  children: React.ReactNode;
};

export default function VerifyLayout({
  children,
}: Props) {
  return (
    <main className="verify-main">
      {children}
    </main>
  );
}