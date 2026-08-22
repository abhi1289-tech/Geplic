"use client";

type Props = {
  children: React.ReactNode;
};

export default function ProfileLayout({
  children,
}: Props) {
  return (
    <main className="profile-main">

      <section className="profile-card">

        {children}

      </section>

    </main>
  );
}