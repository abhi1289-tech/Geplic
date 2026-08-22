export function formatAgreementDate(
  value?: any
) {
  if (!value) {
    return "Not Available";
  }

  const seconds =
    typeof value === "number"
      ? value
      : value.seconds;

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(seconds * 1000)
  );
}

export function formatAgreementDateTime(
  seconds?: number
) {

  if (!seconds) {
    return "Timestamp unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(
    new Date(seconds * 1000)
  );

}