export type PartyRole =
  | "partyA"
  | "partyB"
  | "broker";

export interface Party {
  userId: string;
  role: PartyRole;
  name: string;
  email: string;
  phone?: string;
  signedAt: Date | null;
}
