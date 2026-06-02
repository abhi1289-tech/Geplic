import { PactStatus } from "@/models/pact";

export function PactStatusBadge({ status }: { status: PactStatus }) {
  if (status === "draft") return <>🟡 Draft – Editable</>;
  if (status === "locked") return <>🔒 Locked – Awaiting Signature</>;
  return <>✅ Fully Signed</>;
}
