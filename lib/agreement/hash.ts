import { generateHash } from "@/lib/hash";

export function generateAgreementHash(text: string) {
  return generateHash(text);
}