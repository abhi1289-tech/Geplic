import { WATERMARKS } from "./constants";

export function getAgreementWatermark(
  status?: string
): string {
  if (!status) return "GEPLIC";

  return WATERMARKS[status] ?? "GEPLIC";
}