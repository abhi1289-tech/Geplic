type Props = {
  title: string;
  children: React.ReactNode;
};

export default function LegalLayout({
  title,
  children,
}: Props) {
  return (
    <main className="legal-page">

      <div className="legal-container">

        <h1 className="legal-title">
          {title}
        </h1>

        {children}

      </div>

    </main>
  );
}