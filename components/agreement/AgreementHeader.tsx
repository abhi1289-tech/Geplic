import DocumentBadge from "../document/DocumentBadge";
import DocumentField from "../document/DocumentField";

type Props = {
  pact: any;
  pactId: string;
};

function getBadgeVariant(status: string) {
  switch (status) {
    case "completed":
      return "success";

    case "pending":
      return "warning";

    case "voided":
      return "danger";

    default:
      return "default";
  }
}

export default function AgreementHeader({
  pact,
  pactId,
}: Props) {
  return (
    <header className="agreement-header">
      <h1 className="document-title">
        DIGITAL AGREEMENT
      </h1>

      <div className="agreement-meta">

        <DocumentField
  className="agreement-id-field"
  label="Agreement ID"
  value={pactId}
/>

        <DocumentField
  className="agreement-status-field"
  label="Status"
  value={
    <DocumentBadge
      variant={getBadgeVariant(pact.status)}
    >
      {String(pact.status).toUpperCase()}
    </DocumentBadge>
  }
/>

        <DocumentField
          label="Created"
          value={
            pact.createdAt
              ? new Date(
                  pact.createdAt.seconds
                    ? pact.createdAt.seconds * 1000
                    : pact.createdAt
                ).toLocaleDateString()
              : "—"
          }
        />

        {pact.hash && (
          <DocumentField
            label="Document Hash"
            value={pact.hash}
          />
        )}

      </div>
    </header>
  );
}