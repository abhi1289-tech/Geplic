type Props = {
  pact: any;
};

export default function AgreementFooter({ pact }: Props) {
  const verificationUrl = pact.documentHash
    ? `https://geplic.com/verify/${pact.documentHash}`
    : null;

  const generatedDate = pact.createdAt?.seconds
    ? new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(
  new Date(pact.createdAt.seconds * 1000)
)
    : "Not Available";

  return (
    <footer className="agreement-footer">
      <div className="footer-grid">
        {/* Verification */}
        <section className="footer-section">
          <h3 className="footer-title">
            Verification
          </h3>

          <p className="footer-text">
            This agreement was generated and digitally recorded by
            Geplic.
          </p>

          <p className="footer-meta">
            Generated on {generatedDate}
          </p>
        </section>

        {/* Document Verification */}
        <section className="footer-section">
          <h3 className="footer-title">
            Document Hash (SHA-256)
          </h3>

          <code className="document-hash">
            {pact.documentHash || "Not Available"}
          </code>

          <h3 className="footer-title verification-link-title">
            Verification Link
          </h3>

          <p className="verification-link">
            {verificationUrl || "Not Available"}
          </p>
        </section>
      </div>
    </footer>
  );
}