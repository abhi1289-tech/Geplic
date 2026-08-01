import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SectionCard({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`section-card ${className}`}
    >
      {children}
    </section>
  );
}