type Props = {
  pact: any;
};

export default function AgreementAcceptance({ pact }: Props) {
  const accepted =
    pact.status === "completed";

  return (
    <section className="agreement-acceptance">

      <header className="section-header">
        <h2 className="section-title">
          Digital Acceptance
        </h2>
      </header>

      <div className="acceptance-grid">

        {/* Party A */}

        <article className="acceptance-card">

          <span className="acceptance-label">
            Agreement Creator
          </span>

          <h3 className="acceptance-name">
            {pact.creatorName || "Unavailable"}
          </h3>

          <p className="acceptance-role">
            {pact.creatorDesignation || "No designation"}
          </p>

          <div className="acceptance-status verified">
            Identity verified through Geplic account
          </div>

        </article>

        {/* Party B */}

        <article className="acceptance-card">

          <span className="acceptance-label">
            Counterparty
          </span>

          {accepted ? (
            <>
              <h3 className="acceptance-name">
                {pact.acceptedByName || "Unavailable"}
              </h3>

              <p className="acceptance-role">
                {pact.acceptedByDesignation || "No designation"}
              </p>

              <div className="acceptance-status accepted">
                Agreement accepted digitally
              </div>

              <p className="acceptance-time">
                {pact.acceptedAt?.seconds
                  ? new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}).format(
  new Date(pact.acceptedAt.seconds * 1000)
)
                  : "Timestamp unavailable"}
              </p>
            </>
          ) : (
            <div className="acceptance-pending">
              Waiting for counterparty acceptance
            </div>
          )}

        </article>

      </div>

    </section>
  );
}