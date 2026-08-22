"use client";

import { useParams, useRouter } from "next/navigation";

import AppHeader from "@/components/AppHeader";
import AgreementDocument from "@/components/agreement/AgreementDocument";
import AgreementActions from "@/components/agreement/builder/AgreementActions";
import AgreementBuilderLayout from "@/components/agreement/builder/AgreementBuilderLayout";
import useAgreementBuilder from "@/hooks/useAgreementBuilder";
import StatusPage from "@/components/StatusPage";

export default function AgreementBuilderPage() {

  const router = useRouter();

  const params = useParams();

  const pactId = params?.id as string;

  const {

    loading,

    pact,

    isPartyA,

    canEdit,

    sending,

    downloading,

    templateFields,

    additionalTerms,

    setAdditionalTerms,

    saveContinue,

    sendAgreement,

    voidAgreement,

    downloadPDF,

  } = useAgreementBuilder(pactId);

  if (loading) {
  return (
    <StatusPage
      message="Loading agreement..."
    />
  );
}

if (!pact) {
  return (
    <StatusPage
      message="Agreement not found."
    />
  );
}

  return (

    <div className="agreement-builder-page">

      <AppHeader
        rightContent={
          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="
              btn btn-secondary btn-sm
            "
          >
            Dashboard
          </button>
        }
      />

      <AgreementBuilderLayout>

  <AgreementActions
    canEdit={canEdit}
    isPartyA={isPartyA}
    pact={pact}
    sending={sending}
    downloading={downloading}

    onSave={async () => {

      const saved =
        await saveContinue();

      if (saved) {

        router.push(
          `/pact/${pactId}`
        );

      }

    }}

    onSend={async () => {

      const sent =
        await sendAgreement();

      if (sent) {

        alert(
          "Agreement sent successfully."
        );

        router.push(
          `/pact/${pactId}`
        );

      }

    }}

    onVoid={async () => {

      const success =
        await voidAgreement();

      if (success) {

        alert(
          "Agreement voided."
        );

      }

    }}

    onDownload={downloadPDF}
  />

  <AgreementDocument
    pact={pact}
    pactId={pactId}
    templateFields={templateFields}
    additionalTerms={additionalTerms}
    mode="edit"
    isPartyA={isPartyA}
    setAdditionalTerms={setAdditionalTerms}
  />

</AgreementBuilderLayout>

    </div>

  );

}