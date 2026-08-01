type Props = {
  number: number;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
};

export default function TermCard({
  number,
  value,
  editable = false,
  onChange,
  onDelete,
}: Props) {
  return (
    <article className="term">

      <div className="term-number">
        {number}.
      </div>

      <div className="term-body">

        {editable ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="term-textarea"
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
          onClick={onDelete}
          className="term-delete"
          aria-label="Delete term"
        >
          ✕
        </button>
      )}

    </article>
  );
}