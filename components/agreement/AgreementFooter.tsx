import DocumentField from "../document/DocumentField";
import DocumentSection from "../document/DocumentSection";

import {
  APP_NAME,
  DOCUMENT_TITLE,
  DOCUMENT_VERSION,
  VERIFICATION_BASE_URL,
  DEFAULT_TEXT,
} from "@/lib/agreement/constants";

import {
  formatAgreementDate,
} from "@/lib/agreement/date";

type Props = {
  pact: any;
};

export default function AgreementFooter({
  pact,
}: Props) {
  const fingerprint =
    pact.documentHash ||
    pact.hash ||
    DEFAULT_TEXT.unavailable;

  const verificationUrl =
    fingerprint === DEFAULT_TEXT.unavailable
      ? DEFAULT_TEXT.unavailable
      : `${VERIFICATION_BASE_URL}/${fingerprint}`;

  return (
    <DocumentSection title="Verification">

      <div className="verification-grid">

        {/* Generated date */}

        <div className="verification-card verification-generated">
  <DocumentField
    label="Generated On"
    value={formatAgreementDate(
      pact.createdAt?.seconds
    )}
  />
</div>

        {/* Document fingerprint */}

        <section className="verification-card verification-fingerprint">
          <div className="verification-title">
            Document Fingerprint
          </div>

          <div className="verification-fingerprint-value">
            {fingerprint}
          </div>
        </section>

        {/* Verification URL */}

        <section className="verification-card">
          <div className="verification-title">
            Verification URL
          </div>

          <div className="verification-link">
            {verificationUrl}
          </div>
        </section>

      </div>

      <section className="certificate-strip">

        <div>
          Generated securely by

          <span className="document-brand">
            {" "}
            {APP_NAME}
          </span>
        </div>

        <div>
          {DOCUMENT_TITLE} • {DOCUMENT_VERSION}
        </div>

      </section>

    </DocumentSection>
  );
}