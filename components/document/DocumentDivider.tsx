type Props = {
  className?: string;
};

export default function DocumentDivider({
  className = "",
}: Props) {
  return (
    <hr
      className={`document-divider ${className}`.trim()}
      aria-hidden="true"
    />
  );
}