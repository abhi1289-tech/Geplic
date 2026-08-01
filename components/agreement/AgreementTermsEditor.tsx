import AgreementDetails from "./AgreementDetails";

type Props = {
  pact: any;
  templateFields: any;
  isPartyA: boolean;
  terms: string[];
  setTerms: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function AgreementTermsEditor({
  pact,
  templateFields,
  isPartyA,
  terms,
  setTerms,
}: Props) {
  const canEdit =
  pact?.status === "draft" && isPartyA;

  return (
    <div className="relative z-10 mt-12">
      <h2 className="text-3xl font-bold tracking-tight">
        Agreement Terms
      </h2>

      <div
        className={`mt-6 rounded-3xl border p-4 sm:p-8 transition-all ${
          pact.status === "draft"
            ? "border-gray-200 bg-gray-50"
            : "border-emerald-200 bg-emerald-50/40"
        }`}
      >
        {!canEdit && (
          <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4">
            <p className="font-semibold text-emerald-700">
              Agreement Locked
            </p>

            <p className="mt-1 text-sm text-emerald-600">
              {pact.status === "voided"
                ? "This agreement has been voided and can no longer be used."
                : "This agreement can no longer be edited because it has already been proposed or completed."}
            </p>
          </div>
        )}

        {/* Agreement Summary */}

        <div className="rounded-2xl border border-emerald-200 bg-white p-6">
          <h3 className="text-center text-2xl font-bold">
            {pact.contractType?.toUpperCase()} AGREEMENT
          </h3>

          <div className="mt-6 space-y-3">
            <p>
              <strong>Party A:</strong>{" "}
              {pact.creatorName || pact.creatorEmail}
            </p>

            <p>
              <strong>Party B:</strong>{" "}
              {pact.counterpartyName || pact.counterpartyEmail}
            </p>

            <p>
              <strong>Agreement Date:</strong>{" "}
              {pact.createdAt?.seconds
  ? new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(
      new Date(pact.createdAt.seconds * 1000)
    )
  : "Not Available"}
                
            </p>
            {/* Agreement Details */}

        <AgreementDetails
          category={pact.contractType}
          fields={templateFields}
        />
          </div>
        </div>

        

        {/* Terms */}

        <div className="mt-8 space-y-4">
          {terms.map((term, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <div className="mt-3 text-lg font-bold">
                {index + 1}.
              </div>

              <div className="flex-1">
                <textarea
                  value={term}
                  disabled={!canEdit}
                  onChange={(e) => {
                    const updated = [...terms];
                    updated[index] = e.target.value;
                    setTerms(updated);
                  }}
                  className="
                    min-h-[80px]
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-emerald-200
                    bg-white
                    p-4
                    outline-none
                  "
                />
              </div>

              {canEdit && terms.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setTerms(
                      terms.filter(
                        (_, i) => i !== index
                      )
                    )
                  }
                  className="
                    rounded-xl
                    border
                    border-red-300
                    px-3
                    py-2
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {canEdit && (
            <button
              onClick={() =>
                setTerms([...terms, ""])
              }
              className="
                rounded-xl
                border
                border-cyan-500/30
                px-5
                py-3
                text-cyan-600
              "
            >
              + Add New Term
            </button>
          )}
        </div>

        {/* Acknowledgement */}

        <div className="mt-10 rounded-2xl border border-emerald-200 bg-white p-6">
          <h3 className="text-xl font-bold">
            Acknowledgement
          </h3>

          <p className="mt-4">
            Both parties acknowledge that they have carefully reviewed, understood, and agreed to all terms and conditions contained in this agreement.
          </p>
        </div>
      </div>
    </div>
  );
}