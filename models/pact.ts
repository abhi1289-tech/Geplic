export type PactStatus =
  | "draft"
  | "payment_pending"
  | "locked"
  | "signed";

export type PactType =
  | "rent"
  | "loan"
  | "freelance";

export interface Pact {
  id: string;
  type: PactType;
  status: PactStatus;
  createdBy: string;
  payerRole: "partyA" | "partyB" | null;
  lockedAt: Date | null;
  createdAt: Date;
}
