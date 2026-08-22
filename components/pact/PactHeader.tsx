import StatusBadge from "./StatusBadge";

type Props = {
  status: string;
};

export default function PactHeader({
  status,
}: Props) {
  return (
    <header className="pact-header">

      <h1 className="pact-title">
        Agreement
      </h1>

      <StatusBadge status={status} />

      {status === "pending" && (
        <p className="pact-notice pact-notice-warning">
          🔒 Agreement terms are locked after the offer was sent.
        </p>
      )}

      {status === "voided" && (
        <p className="pact-notice pact-notice-danger">
          🚫 Agreement is inactive.
        </p>
      )}

    </header>
  );
}