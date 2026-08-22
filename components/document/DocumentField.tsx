type Props = {
  label: string;
  value: React.ReactNode;
  className?: string;
};

export default function DocumentField({
  label,
  value,
  className = "",
}: Props) {
  const isEmpty =
    value === undefined ||
    value === null ||
    (typeof value === "string" &&
      value.trim() === "");

  if (isEmpty) {
    return null;
  }

  return (
    <div
      className={`document-field ${className}`.trim()}
    >
      <div className="document-field-label">
        {label}
      </div>

      <div className="document-field-value">
        {value}
      </div>
    </div>
  );
}