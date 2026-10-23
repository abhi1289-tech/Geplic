import { adminDb } from "@/lib/firebase-admin";

export async function getPrintableAgreement(
  pactId: string
) {
  // These reads are independent: run them concurrently so the print route does
  // not pay for the pact read and template query serially on every PDF request.
  const [pactDoc, templateSnap] = await Promise.all([
    adminDb.collection("pacts").doc(pactId).get(),
    adminDb
      .collection("templates")
      .where("pactId", "==", pactId)
      .limit(1)
      .get(),
  ]);

  if (!pactDoc.exists) {
    return null;
  }

  let templateFields = {};
  let additionalTerms: string[] = [];

  if (!templateSnap.empty) {
    const template = templateSnap.docs[0].data();
    templateFields = template.fields || {};
    additionalTerms = template.fields?.additionalTerms || [];
  }

  return {
    pact: pactDoc.data(),
    templateFields,
    additionalTerms,
  };
}