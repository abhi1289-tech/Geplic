type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  switch (status) {
    case "draft":
      return (
        <span className="status-badge status-draft">
          Draft
        </span>
      );

    case "pending":
      return (
        <span className="status-badge status-pending">
          Pending Acceptance
        </span>
      );

    case "completed":
      return (
        <span className="status-badge status-completed">
          Completed
        </span>
      );

    case "rejected":
      return (
        <span className="status-badge status-rejected">
          Rejected
        </span>
      );

    case "voided":
      return (
        <span className="status-badge status-voided">
          Voided
        </span>
      );

    default:
      return (
        <span className="status-badge status-default">
          {status}
        </span>
      );
  }
}