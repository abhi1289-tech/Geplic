export function addAgreementTerm(
  terms: string[]
) {
  return [...terms, ""];
}

export function updateAgreementTerm(
  terms: string[],
  index: number,
  value: string
) {
  const updated = [...terms];
  updated[index] = value;
  return updated;
}

export function deleteAgreementTerm(
  terms: string[],
  index: number
) {
  return terms.filter(
    (_, i) => i !== index
  );
}