import DocumentField from "../document/DocumentField";

type Props = {
  pact: any;
};

export default function AgreementCompleted({
  pact,
}: Props) {
  return (
    <section className="agreement-completed">

      <div className="completed-header">

        <div className="completed-indicator" />

        <h2 className="completed-title">
          Agreement Completed
        </h2>

      </div>

      <p className="completed-description">
        This agreement has been digitally completed and verified by the involved parties.
      </p>

      <div className="completed-grid">

        <div className="completed-card">

          <DocumentField
            label="Accepted By"
            value={pact.acceptedByName || "Unknown"}
          />

          <DocumentField
            label="Designation"
            value={pact.acceptedByDesignation || "No designation"}
          />

        </div>

        <div className="completed-card">

          <DocumentField
            label="Completed On"
            value={
              pact.acceptedAt
                ? new Date(
                    pact.acceptedAt.seconds * 1000
                  ).toLocaleString()
                : "Unavailable"
            }
          />

          <DocumentField
            label="Verification"
            value="Hash Verified"
          />

        </div>

      </div>

    </section>
  );
}