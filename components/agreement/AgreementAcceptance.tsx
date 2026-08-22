import DocumentBadge from "../document/DocumentBadge";
import DocumentField from "../document/DocumentField";
import DocumentSection from "../document/DocumentSection";

import {
  DEFAULT_TEXT,
} from "@/lib/agreement/constants";

import {
  formatAgreementDateTime,
} from "@/lib/agreement/date";

type Props = {
  pact: any;
};

export default function AgreementAcceptance({
  pact,
}: Props) {

  const accepted =
    pact.status === "completed";

  return (

    <DocumentSection title="Acceptance">

      <div className="acceptance-grid">

        {/* Agreement Creator */}

        <section className="acceptance-column">

          <DocumentField
            label="Agreement Creator"
            value={
              pact.creatorName ||
              pact.creatorEmail ||
              DEFAULT_TEXT.unavailable
            }
          />

          <DocumentField
            label="Designation"
            value={
              pact.creatorDesignation ||
              DEFAULT_TEXT.creatorRole
            }
          />

          <DocumentField
            label="Identity"
            value={
              <DocumentBadge variant="success">
                Verified
              </DocumentBadge>
            }
          />

        </section>

        {/* Counterparty */}

        <section className="acceptance-column">

          <DocumentField
            label="Counterparty"
            value={
              accepted
                ? (
                    pact.acceptedByName ||
                    pact.counterpartyName ||
                    pact.counterpartyEmail ||
                    DEFAULT_TEXT.unavailable
                  )
                : DEFAULT_TEXT.pendingAcceptance
            }
          />

          <DocumentField
            label="Designation"
            value={
              accepted
                ? (
                    pact.acceptedByDesignation ||
                    pact.counterpartyDesignation ||
                    DEFAULT_TEXT.counterpartyRole
                  )
                : "—"
            }
          />

          <DocumentField
            label="Status"
            value={
              accepted ? (
                <DocumentBadge variant="success">
                  Accepted
                </DocumentBadge>
              ) : (
                <DocumentBadge variant="warning">
                  Awaiting Acceptance
                </DocumentBadge>
              )
            }
          />

          {accepted && (

            <DocumentField
              label="Accepted On"
              value={formatAgreementDateTime(
                pact.acceptedAt?.seconds
              )}
            />

          )}

        </section>

      </div>

    </DocumentSection>

  );

}