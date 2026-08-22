const BADGE_VARIANTS = [
  "default",
  "success",
  "warning",
  "danger",
] as const;

type BadgeVariant =
  (typeof BADGE_VARIANTS)[number];

type Props = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function DocumentBadge({
  children,
  variant = "default",
  className = "",
}: Props) {
  return (
    <span
      className={`document-badge badge-${variant} ${className}`.trim()}
    >
      {children}
    </span>
  );
}