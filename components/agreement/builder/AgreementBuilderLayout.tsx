"use client";

type Props = {
  children: React.ReactNode;
};

export default function AgreementBuilderLayout({
  children,
}: Props) {
  return (
    <main className="agreement-builder-main">
      {children}
    </main>
  );
}