type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AgreementPage({
  children,
  className = "",
}: Props) {
  return (
    <section className={`agreement-page ${className}`}>
      {children}
    </section>
  );
}