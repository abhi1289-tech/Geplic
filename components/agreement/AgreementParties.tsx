type Props = {
  pact: any;
};

export default function AgreementParties({ pact }: Props) {
  return (
    <section className="agreement-parties">

      <article className="party-card">

        <span className="party-label">
          Party A
        </span>

        <h2 className="party-name">
          {pact.creatorName || pact.creatorEmail}
        </h2>

        <p className="party-role">
          {pact.creatorDesignation || "Agreement Creator"}
        </p>

      </article>

      <article className="party-card">

        <span className="party-label">
          Party B
        </span>

        <h2 className="party-name">
          {pact.counterpartyName || pact.counterpartyEmail}
        </h2>

        <p className="party-role">
          {pact.counterpartyDesignation || "Counterparty"}
        </p>

      </article>

    </section>
  );
}