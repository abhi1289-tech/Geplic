import { STANDARD_TERMS } from "@/lib/agreement-terms";
import TermCard from "./AgreementClause";

export default function StandardTerms() {
  return (
    <section className="agreement-section">

      <header className="section-header">
        <h3 className="section-title">
          Standard Terms
        </h3>
      </header>

      <div className="terms-list">
        {STANDARD_TERMS.map((term, index) => (
          <TermCard
            key={index}
            number={index + 1}
            value={term}
          />
        ))}
      </div>

    </section>
  );
}