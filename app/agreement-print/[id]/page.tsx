import "@/app/styles/print.css";
import StatusPage from "@/components/StatusPage";
import AgreementDocument
from "@/components/agreement/AgreementDocument";

import {
  getPrintableAgreement,
} from "@/services/adminPactService";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AgreementPrintPage({
  params,
}: Props) {

  const { id } = await params;

  const agreement =
    await getPrintableAgreement(id);

  if (!agreement) {
  return (
    <StatusPage
      message="Agreement not found."
    />
  );
}

  return (

    <main className="agreement-builder-page agreement-print">

      <AgreementDocument
        pact={agreement.pact}
        pactId={id}
        templateFields={agreement.templateFields}
        additionalTerms={agreement.additionalTerms}
        mode="view"
      />

    </main>

  );

}