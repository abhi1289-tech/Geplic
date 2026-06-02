import { generalPromiseTemplate } from "./generalPromise";
import { LoanTemplate } from "./loan";
import { FreelanceTemplate } from "./freelance";
import { RentTemplate } from "./rent";

export function generateAgreementTemplate(
  type: string,
  data: any
) {
  switch (type) {

    case "Loan":
      return LoanTemplate(data);

    case "Freelance / Service":
      return FreelanceTemplate(data);

    case "Rent Agreement":
      return RentTemplate(data);

    case "General Promise":
      return generalPromiseTemplate(data);

    default:
      return generalPromiseTemplate(data);
  }
}