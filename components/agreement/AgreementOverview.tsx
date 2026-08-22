import DocumentBadge from "../document/DocumentBadge";
import DocumentField from "../document/DocumentField";
import DocumentSection from "../document/DocumentSection";

import { DOCUMENT_TITLE } from "@/lib/agreement/constants";
import { DEFAULT_TEXT } from "@/lib/agreement/constants";
import { formatAgreementDate } from "@/lib/agreement/date";

type Props = {
  pact: any;
  templateFields: any;
  mode: "view" | "edit";
  isPartyA?: boolean;
};

function getAgreementTitle(type?: string) {
  if (!type) return DOCUMENT_TITLE;

  const upper = type.toUpperCase();

  return upper.endsWith("AGREEMENT")
    ? upper
    : `${upper} AGREEMENT`;
}

export default function AgreementOverview({
  pact,
  templateFields,
  mode,
  isPartyA = false,
}: Props) {

  const canEdit =
    mode === "edit" &&
    pact.status === "draft" &&
    isPartyA;

  return (

    <DocumentSection>

      {!canEdit && (

  <div className="agreement-lock">

    <DocumentBadge
      variant={
        pact.status === "voided"
          ? "danger"
          : pact.status === "draft"
            ? "default"
            : "warning"
      }
    >
      {pact.status === "voided"
        ? "Agreement Voided"
        : pact.status === "draft"
          ? "Draft"
          : "Agreement Locked"}
    </DocumentBadge>

    <p className="lock-text">
      {pact.status === "voided"
        ? "This agreement has been permanently voided."
        : pact.status === "draft"
          ? "This document is currently a draft and can be edited before it is proposed."
          : "Editing has been disabled because this agreement has already been proposed or completed."}
    </p>

  </div>

)}

      <h2 className="agreement-type">
        {getAgreementTitle(
          pact.contractType
        )}
      </h2>

      <div className="summary-grid">

        <DocumentField
          label="Party A"
          value={
            pact.creatorName ||
            pact.creatorEmail ||
            DEFAULT_TEXT.unavailable
          }
        />

        <DocumentField
          label="Party B"
          value={
            pact.counterpartyName ||
            pact.counterpartyEmail ||
            DEFAULT_TEXT.unavailable
          }
        />

        <DocumentField
          label="Agreement Date"
          value={formatAgreementDate(
            pact.createdAt?.seconds
          )}
        />

        {pact.contractType ===
          "General Promise" && (

          <DocumentField
            label="Promise"
            value={
              templateFields.promiseText ||
              DEFAULT_TEXT.unavailable
            }
          />

        )}

      </div>

    </DocumentSection>

  );
}