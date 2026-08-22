import DocumentField from "../document/DocumentField";
type Props = {
  result: any;
};

type VerificationColor =
  | "green"
  | "yellow"
  | "red"
  | "cyan";

type VerificationStatus = {
  title: string;
  color: VerificationColor;
  message: string;
};

function getVerificationStatus(
  status: string
): VerificationStatus {
  switch (status) {
    case "completed":
      return {
        title: "Agreement Verified",
        color: "green",
        message:
          "This agreement has been completed and successfully verified against Geplic records.",
      };

    case "draft":
      return {
        title: "Agreement Draft",
        color: "yellow",
        message:
          "This agreement exists but is still in draft state.",
      };

    case "pending":
      return {
        title: "Pending Acceptance",
        color: "yellow",
        message:
          "This agreement has been sent and is awaiting acceptance.",
      };

    case "rejected":
      return {
        title: "Agreement Rejected",
        color: "red",
        message:
          "This agreement was rejected by one of the parties.",
      };

    case "voided":
      return {
        title: "Agreement Voided",
        color: "red",
        message:
          "This agreement was voided before completion.",
      };

    default:
      return {
        title: "Agreement Found",
        color: "cyan",
        message:
          "Agreement located in Geplic records.",
      };
  }
}

export default function VerificationResult({
  result,
}: Props) {

  const verification =
    getVerificationStatus(result.status);

  const createdDate =
    result.createdAt?.seconds
      ? new Date(
          result.createdAt.seconds * 1000
        ).toLocaleString()
      : "Unavailable";

  const completedDate =
    result.acceptedAt?.seconds
      ? new Date(
          result.acceptedAt.seconds * 1000
        ).toLocaleString()
      : "Unavailable";

  return (

    <section
      className={`verification-result verification-${
        verification.color
      }`}
    >

      <h2
        className="verification-title"
      >
        {verification.title}
      </h2>

      <p className="verification-message">
        {verification.message}
      </p>

      <section className="verification-banner">

        <div className="verification-banner-content">

          <div className="verification-banner-icon" />

          <span className="verification-banner-text">
            Hash Integrity Verified
          </span>

        </div>

      </section>

      <section className="verification-grid">

        <DocumentField
          label="Agreement ID"
          value={result.id}
        />

        <DocumentField
          label="Agreement Type"
          value={result.contractType}
        />

        <DocumentField
          label="Status"
          value={result.status}
        />

        <DocumentField
          label="Created On"
          value={createdDate}
        />

        <DocumentField
          label="Party A"
          value={result.creatorEmail}
        />

        <DocumentField
          label="Party B"
          value={result.counterpartyEmail}
        />

        <DocumentField
          label="Accepted By"
          value={
            result.acceptedByName ||
            "Unavailable"
          }
        />

        <DocumentField
          label="Completed On"
          value={completedDate}
        />

      </section>

      <section className="verification-fingerprint">
        <DocumentField
        label="Document Fingerprint"
        value={
        <div className="verification-fingerprint-value">
            {result.documentHash || "Unavailable"}
        </div>
    }
/>

      </section>

    </section>

  );

}
