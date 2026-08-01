import { STANDARD_TERMS } from "@/lib/agreement-terms";
import AgreementClause from "./AgreementClause";

type Props = {
  additionalTerms: string[];
  editable: boolean;
  onChange?: (index: number, value: string) => void;
  onDelete?: (index: number) => void;
  onAdd?: () => void;
};

export default function AdditionalTerms({
  additionalTerms,
  editable,
  onChange,
  onDelete,
  onAdd,
}: Props) {
  return (
    <section className="agreement-section">

      <header className="section-header">

        <h3 className="section-title">
          Additional Terms
        </h3>

        {editable && (
          <button
            type="button"
            onClick={onAdd}
            className="add-term-button"
          >
            + Add Additional Term
          </button>
        )}

      </header>

      {additionalTerms.length === 0 ? (
        <p className="empty-state">
          {editable
            ? "No additional terms yet. Click “Add Additional Term” to include custom terms."
            : "No additional terms were added to this agreement."}
        </p>
      ) : (
        <div className="terms-list">
          {additionalTerms.map((term, index) => (
            <AgreementClause
              key={index}
              number={index + 1}
              value={term}
              editable={editable}
              onChange={(value) => onChange?.(index, value)}
              onDelete={() => onDelete?.(index)}
            />
          ))}
        </div>
      )}

    </section>
  );
}