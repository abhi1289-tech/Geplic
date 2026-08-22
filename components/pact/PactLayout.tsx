"use client";

type Props = {
  children: React.ReactNode;
};

export default function PactLayout({
  children,
}: Props) {
  return (
    <main className="pact-main">
      {children}
    </main>
  );
}