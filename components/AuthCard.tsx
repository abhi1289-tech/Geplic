type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AuthCard({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`auth-card ${className}`.trim()}
    >
      {children}
    </section>
  );
}