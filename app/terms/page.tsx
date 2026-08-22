import LegalLayout from "@/components/legal/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">

      <p className="legal-paragraph">
        By using Geplic, you agree to these terms.
      </p>

      <h2 className="legal-heading">
        Service Description
      </h2>

      <p className="legal-paragraph">
        Geplic provides digital agreement tools
        that help users document mutual consent.
      </p>

      <h2 className="legal-heading">
        User Responsibilities
      </h2>

      <ul className="legal-list">
        <li>Provide accurate information.</li>
        <li>Use the platform lawfully.</li>
        <li>Respect agreements entered into.</li>
      </ul>

      <h2 className="legal-heading">
        Disclaimer
      </h2>

      <p className="legal-paragraph">
        Geplic Free Pacts are intended to record
        mutual consent and may not be legally
        enforceable in all jurisdictions.
      </p>

      <h2 className="legal-heading">
        Limitation of Liability
      </h2>

      <p className="legal-paragraph">
        Geplic is not responsible for disputes
        arising between parties.
      </p>

    </LegalLayout>
  );
}