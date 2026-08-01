import AgreementDetails from "../AgreementDetails";
import SectionCard from "./SectionCard";

type Props = {
  pact: any;
  templateFields: any;
};

export default function AgreementSummary({
  pact,
  templateFields,
}: Props) {
  return (
    <SectionCard className="agreement-summary">

      <h2 className="agreement-type">
        {pact.contractType?.toUpperCase()} AGREEMENT
      </h2>

      <div className="summary-grid">

        <div className="summary-item">
          <span className="summary-label">Party A</span>
          <span className="summary-value">
            {pact.creatorName || pact.creatorEmail}
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Party B</span>
          <span className="summary-value">
            {pact.counterpartyName || pact.counterpartyEmail}
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-label">
            Agreement Date
          </span>

          <span className="summary-value">
            {pact.createdAt?.seconds
              ? new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(
  new Date(pact.createdAt.seconds * 1000)
)
              : "Not Available"}
          </span>

          

          {pact.contractType === "General Promise" && (
  <>
    <div className="summary-item">
      <span className="summary-label">
        Promise
      </span>

      <span className="summary-value">
        {templateFields.promiseText || "Not Available"}
      </span>
    </div>
  </>
)}
        </div>

      </div>

      <hr className="section-divider" />

      <AgreementDetails
        category={pact.contractType}
        fields={templateFields}
      />

    </SectionCard>
  );
}