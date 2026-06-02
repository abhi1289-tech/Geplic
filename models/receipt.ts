export interface Receipt {
  pactId: string;
  payerRole: "partyA" | "partyB";
  serviceFee: number;
  govtFee: number;
  brokerFee?: number;
  total: number;
  createdAt: Date;
}
