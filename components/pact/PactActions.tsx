type Props = {
  pact: any;

  role: "partyA" | "partyB" | null;

  pactId: string;

  onSendOffer: () => void;

  onVoidAgreement: () => void;

  onReject: () => void;

  onViewDocument: () => void;
};

export default function PactActions({
  pact,
  role,
  onSendOffer,
  onVoidAgreement,
  onReject,
  onViewDocument,
}: Props) {
  return (
    <div className="pact-actions">

      {/* =====================================================
          DRAFT ACTION
      ===================================================== */}

      {pact.status === "draft" &&
        role === "partyA" && (
          <div className="pact-action-group">

            <button
              type="button"
              onClick={onSendOffer}
              className="btn btn-primary btn-md"
            >
              Send Offer
            </button>

          </div>
        )}


      {/* =====================================================
          PENDING ACTION
      ===================================================== */}

      {pact.status === "pending" &&
        role === "partyB" && (
          <div className="pact-action-group">

            <button
              type="button"
              onClick={onReject}
              className="btn btn-danger btn-md"
            >
              Reject Offer
            </button>

          </div>
        )}


      {/* =====================================================
          SECONDARY ACTIONS
      ===================================================== */}

      <div className="pact-action-group">

        {pact.status !== "rejected" &&
          pact.status !== "voided" && (

            <button
              type="button"
              onClick={onViewDocument}
              className="btn btn-secondary btn-md"
            >
              {pact.status === "draft" &&
              role === "partyA"
                ? "Edit Agreement"
                : "View Document"}
            </button>

          )}


        {role === "partyA" &&
          (pact.status === "draft" ||
            pact.status === "pending") && (

            <button
              type="button"
              onClick={onVoidAgreement}
              className="btn btn-danger btn-md"
            >
              Void Agreement
            </button>

          )}

      </div>

    </div>
  );
}