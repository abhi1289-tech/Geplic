import LegalLayout from "@/components/legal/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">

      <p className="legal-paragraph">
        Geplic collects only the information necessary
        to create and manage digital agreements.
      </p>

      <h2 className="legal-heading">
        Information We Collect
      </h2>

      <ul className="legal-list">
        <li>Name</li>
        <li>Email Address</li>
        <li>Agreement Data</li>
        <li>Audit Trail Records</li>
      </ul>

      <h2 className="legal-heading">
        How We Use Information
      </h2>

      <ul className="legal-list">
        <li>Create agreements</li>
        <li>Verify participants</li>
        <li>Maintain audit logs</li>
        <li>Improve platform security</li>
      </ul>

      <h2 className="legal-heading">
        Data Security
      </h2>

      <p className="legal-paragraph">
        Geplic uses industry-standard security
        measures to protect user information.
      </p>

      <h2 className="legal-heading">
        Contact
      </h2>

      <p className="legal-paragraph">
        For privacy-related questions, contact us
        through Geplic support.
      </p>

    </LegalLayout>
  );
}