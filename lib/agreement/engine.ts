import { agreementTemplates } from "./templates";
import { renderTemplate } from "./renderer";
import { generateAgreementHash } from "./hash";

type AgreementCategory =
  | "Loan"
  | "Freelance / Service"
  | "Rent Agreement"
  | "General Promise";

export function generateAgreement(
  category: AgreementCategory,
  data: Record<string, any>
) {

  let template = "";

  switch (category) {

    case "Loan":
      template = agreementTemplates.loan;
      break;

    case "Freelance / Service":
      template = agreementTemplates.freelance;
      break;

    case "Rent Agreement":
      template = agreementTemplates.rent;
      break;

    case "General Promise":
      template = agreementTemplates.promise;
      break;

    default:
      throw new Error("Unknown agreement type");

  }

  const content = renderTemplate(
    template,
    data
  );

  const hash =
    generateAgreementHash(content);

  return {

    content,

    hash,

  };

}