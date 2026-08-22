const AGREEMENT_TYPES = [
  {
    title: "Loan Agreement",
    description:
      "Document personal loans between friends and family.",
  },
  {
    title: "Freelance Service",
    description:
      "Record services, payments and delivery expectations.",
  },
  {
    title: "General Promise",
    description:
      "Capture commitments and mutual understandings.",
  },
  {
    title: "Rent Agreement",
    description:
      "Track rental terms, deposits and tenancy details.",
  },
];

export default function AgreementTypesSection() {
  return (
    <section className="agreement-types">

      <div className="section-container">

        <h2 className="section-title">
          Agreement Types
        </h2>

        <div className="card-grid card-grid-2">

          {AGREEMENT_TYPES.map((agreement) => (

            <article
              key={agreement.title}
              className="card feature-card"
            >

              <h3 className="card-title">
                {agreement.title}
              </h3>

              <p className="card-description">
                {agreement.description}
              </p>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}