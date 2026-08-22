export function formatAgreementValue(
  key: string,
  value: any
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "";
  }

  switch (key) {

    case "loanAmount":
    case "paymentAmount":
    case "monthlyRent":
    case "securityDeposit":
      return `₹${value}`;

    case "interestRate":
      return `${value}%`;

    case "durationMonths":
      return `${value} Months`;

    default:
      return value;
  }
}

export function formatAgreementDate(
  value: any
) {
  if (!value) {
    return "—";
  }

  const date =
    value.seconds
      ? new Date(value.seconds * 1000)
      : new Date(value);

  return date.toLocaleDateString();
}

export function getBadgeVariant(
  status?: string
):
  | "default"
  | "success"
  | "warning"
  | "danger" {

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