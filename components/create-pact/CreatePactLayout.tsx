"use client";

type Props = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
};

export default function CreatePactLayout({
  children,
  onSubmit,
}: Props) {
  return (
    <main className="create-pact-main">

      <form
        onSubmit={onSubmit}
        className="create-pact-form"
      >

        <header className="create-pact-header">

          <h1 className="create-pact-title">
            Create Agreement
          </h1>

          <p className="create-pact-subtitle">
            Create secure digital agreements in minutes.
          </p>

        </header>

        {children}

      </form>

    </main>
  );
}