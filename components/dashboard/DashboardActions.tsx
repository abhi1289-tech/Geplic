type Props = {
  onCreatePact: () => void;
  onVerifyAgreement: () => void;
};

export default function DashboardActions({
  onCreatePact,
  onVerifyAgreement,
}: Props) {
  return (
    <section className="dashboard-actions">

      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={onCreatePact}
      >
        Create Agreement
      </button>

      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={onVerifyAgreement}
      >
        Verify Agreement
      </button>

    </section>
  );
}