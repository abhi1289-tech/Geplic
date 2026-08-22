type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function BrandLogo({
  className = "",
  size = "md",
}: Props) {
  return (
    <h1
      className={`
        brand-logo
        brand-logo-${size}
        ${className}
      `.trim()}
    >
      Geplic
    </h1>
  );
}