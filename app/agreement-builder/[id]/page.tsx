"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { logAction } from "@/lib/audit";
import { auth } from "@/lib/firebase";
import { pdf } from "@react-pdf/renderer";
import AgreementPDF from "@/components/pdf/AgreementPDF";
import AppHeader from "@/components/AppHeader";
import AgreementParties from "@/components/agreement/AgreementParties";
import AgreementAcceptance from "@/components/agreement/AgreementAcceptance";
import AgreementFooter from "@/components/agreement/AgreementFooter";
import AgreementTermsEditor
from "@/components/agreement/AgreementTermsEditor";
import AgreementActions from "@/components/agreement/AgreementActions";

export default function AgreementBuilderPage() {
  const params = useParams();
  const router = useRouter();
  
  const [sending, setSending] = useState(false);

  const pactId = params?.id as string;

  const [loading, setLoading] = useState(true);

  const currentUser = auth.currentUser;

  const [pact, setPact] = useState<any>(null);
const isPartyA =
  currentUser?.email?.toLowerCase() ===
  pact?.creatorEmail?.toLowerCase();
  const canEdit =
  isPartyA && pact?.status === "draft";
  
  const [terms, setTerms] = useState<string[]>([]);
  const [templateFields, setTemplateFields] =
  useState<any>({});
  useEffect(() => {
    async function fetchPact() {
      if (!pactId) return;

      try {
        const pactRef = doc(db, "pacts", pactId);

        const pactSnap = await getDoc(pactRef);

        if (pactSnap.exists()) {
          const data = pactSnap.data();

          setPact(data);
         const templateQuery = query(
  collection(db, "templates"),
  where("pactId", "==", pactId)
);

const templateSnap = await getDocs(templateQuery);

if (!templateSnap.empty) {

  const templateData = templateSnap.docs[0].data();
  setTemplateFields(
  templateData?.fields || {}
);

  const savedTerms =
  templateData?.fields?.clauses || [];

setTerms(savedTerms);
}
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPact();
  }, [pactId]);

  
  async function saveContinue() {

  if (!pactId) return;

  const templateQuery = query(
    collection(db, "templates"),
    where("pactId", "==", pactId)
  );

  const templateSnap = await getDocs(
    templateQuery
  );

  if (templateSnap.empty) {

    alert("Template not found");
    return;

  }

  const templateDoc =
    templateSnap.docs[0];

  await updateDoc(
    doc(
      db,
      "templates",
      templateDoc.id
    ),
    {
      "fields.clauses": terms,
      updatedAt: serverTimestamp(),
    }
  );

  router.push(`/pact/${pactId}`);

}

  

  async function sendAgreement() {

  if (!pactId || sending) return;

  try {

    setSending(true);

    await updateDoc(doc(db, "pacts", pactId), {
      status: "pending",
      lockedAt: serverTimestamp(),
    });

    await logAction(
      pactId,
      "OFFER_SENT",
      pact.creatorEmail
    );

    setPact((prev: any) => ({
      ...prev,
      status: "pending",
    }));

    alert("Agreement sent successfully.");

    router.push(`/pact/${pactId}`);

  } finally {

    setSending(false);

  }
}
async function voidAgreement() {

  if (!pactId) return;

  const confirmed = confirm(
    "Are you sure you want to void this agreement?"
  );

  if (!confirmed) return;

  await updateDoc(
    doc(db, "pacts", pactId),
    {
      status: "voided",
      voidedAt: serverTimestamp(),
    }
  );

  await logAction(
    pactId,
    "AGREEMENT_VOIDED",
    pact.creatorEmail
  );

  setPact((prev:any) => ({
    ...prev,
    status: "voided",
  }));

  alert("Agreement voided.");

}
  


 async function downloadPDF() {

  const blob = await pdf(
    <AgreementPDF
  pact={{
    ...pact,
    agreementId: pactId,
  }}
  templateFields={templateFields}
  terms={terms}
/>
  ).toBlob();

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
  `Geplic-${pact.contractType}-${pactId}.pdf`;

  a.click();

  URL.revokeObjectURL(url);

}
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading agreement...
      </div>
    );
  }

  if (!pact) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Agreement not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white bg-[radial-gradient(circle_at_top,rgba(0,153,255,0.12),transparent_35%)]">
      {/* TOP BAR */}

      <AppHeader
  rightContent={
    <button
      onClick={() => router.push("/dashboard")}
      className="
      rounded-xl
      border
      border-white/10
      px-5
      py-2
      text-sm
      transition
      hover:border-cyan-400/40
      hover:bg-white/[0.06]
      hover:text-white
      "
    >
      Dashboard
    </button>
  }
/>

<AgreementActions
  canEdit={canEdit}
  isPartyA={isPartyA}
  pact={pact}
  sending={sending}
  onSave={saveContinue}
  onDownload={downloadPDF}
  onSend={sendAgreement}
  onVoid={voidAgreement}
/>

      {/* DOCUMENT */}

      <main className="mx-auto max-w-6xl px-2 sm:px-6 py-6 sm:py-10">
        <div 
          style={{ backgroundColor: "#F7FFF7", backgroundImage:
      "repeating-linear-gradient(45deg, rgba(16,185,129,0.015) 0px, rgba(16,185,129,0.015) 2px, transparent 2px, transparent 12px)"}}
          
          className="relative overflow-hidden rounded-[20px] sm:rounded-[32px] border border-white/10 bg-white p-4 sm:p-12 text-black shadow-2xl"
        >
          {/* WATERMARK */}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
           <h1 className="
  rotate-[-30deg]
  text-[180px]
  font-black
  tracking-[1rem]
  text-emerald-600
  opacity-[0.05]
  select-none
  ">
              {
  pact.status === "draft"
    ? "DRAFT"

    : pact.status === "pending"
    ? "PENDING"

    : pact.status === "completed"
    ? "GEPLIC VERIFIED"

    : pact.status === "voided"
? "VOID"

    : "GEPLIC"
}
            </h1>
          </div>

          {/* DOCUMENT HEADER */}

          <div className="relative z-10 border-b border-gray-200 pb-8">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight break-words">
              DIGITAL AGREEMENT
            </h1>

            <p className="mt-4 text-lg text-black/60">
              Agreement ID: {pactId}
            </p>

            <p className="mt-2 text-black/60">
              Status:{" "}
              <span
  className={`font-semibold uppercase ${
    pact.status === "voided"
      ? "text-red-600"
      : ""
  }`}
>
  {pact.status || "draft"}
</span>
            </p>
          </div>

          {/* PARTIES */}

          <AgreementParties pact={pact} />



{/* AGREEMENT DETAILS */}


  <AgreementTermsEditor
    pact={pact}
    isPartyA={isPartyA}
    templateFields={templateFields}
    terms={terms}
    setTerms={setTerms}
/>


         

          {/* DIGITAL ACCEPTANCE */}
<AgreementAcceptance pact={pact} />

          {/* FOOTER */}

<AgreementFooter pact={pact} />
        </div>
      </main>
    </div>
  );
}