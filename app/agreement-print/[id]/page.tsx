import { adminDb } from "@/lib/firebase-admin";
import "../../styles/print.css";
import AgreementDocument from "@/components/agreement/AgreementDocument";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AgreementPrintPage({
  params,
}: Props) {
  const { id } = await params;

  // Fetch agreement
  const pactDoc = await adminDb
    .collection("pacts")
    .doc(id)
    .get();

  if (!pactDoc.exists) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Agreement not found.
      </div>
    );
  }

  const pact = pactDoc.data();

  // Fetch template
  const templateSnap = await adminDb
    .collection("templates")
    .where("pactId", "==", id)
    .limit(1)
    .get();

  let templateFields = {};
  let additionalTerms: string[] = [];

  if (!templateSnap.empty) {
  const template = templateSnap.docs[0].data();

  templateFields = template.fields || {};

  additionalTerms =
    template.fields?.additionalTerms || [];
    
}

  return (
    
  <main className="agreement-print">
    <AgreementDocument
      pact={pact}
      pactId={id}
      templateFields={templateFields}
      additionalTerms={additionalTerms}
      mode="view"
    />
  </main>
);
}