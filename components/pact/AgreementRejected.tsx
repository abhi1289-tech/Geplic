import DocumentField from "../document/DocumentField";

type Props = {
  pact: any;
};

export default function AgreementRejected({
  pact,
}: Props) {
  return (
    <section className="agreement-rejected">

      <div className="rejected-header">

        <div className="rejected-indicator" />

        <h2 className="rejected-title">
          Agreement Rejected
        </h2>

      </div>

      <p className="rejected-description">
        This agreement was rejected and is no longer active.
      </p>

      <div className="rejected-card">

        <DocumentField
          label="Rejection Reason"
          value={
            <div className="rejection-reason">
              {pact.rejectionReason || "No reason provided"}
            </div>
          }
        />

      </div>

    </section>
  );
}