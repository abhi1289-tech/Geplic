import { adminDb } from "@/lib/firebase-admin";

export async function getPrintableAgreement(
  pactId: string
) {
  const pactDoc = await adminDb
    .collection("pacts")
    .doc(pactId)
    .get();

  if (!pactDoc.exists) {
    return null;
  }

  const templateSnap = await adminDb
    .collection("templates")
    .where("pactId", "==", pactId)
    .limit(1)
    .get();

  let templateFields = {};
  let additionalTerms: string[] = [];

  if (!templateSnap.empty) {

    const template =
      templateSnap.docs[0].data();

    templateFields =
      template.fields || {};

    additionalTerms =
      template.fields?.additionalTerms || [];

  }

  return {
    pact: pactDoc.data(),
    templateFields,
    additionalTerms,
  };
}