import { DEFAULT_TEXT } from "@/lib/agreement/constants";

type Props = {
  number: number;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
};

export default function AgreementTerm({
  number,
  value,
  editable = false,
  onChange,
  onDelete,
}: Props) {

  return (

    <article className="agreement-term">

      <div className="term-number">
        {number}.
      </div>

      <div className="term-content">

        {editable ? (

          <textarea
            className="term-textarea"
            value={value}
            placeholder={
              DEFAULT_TEXT.termPlaceholder
            }
            spellCheck={false}
            onChange={(e) =>
              onChange?.(e.target.value)
            }
          />

        ) : (

          <p className="term-text">
            {value}
          </p>

        )}

      </div>

      {editable && (

        <button
          type="button"
          className="term-delete"
          aria-label={`Delete term ${number}`}
          title={DEFAULT_TEXT.deleteTerm}
          onClick={onDelete}
        >
          ✕
        </button>

      )}

    </article>

  );

}