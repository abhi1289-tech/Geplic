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
import AppHeader from "@/components/AppHeader";
import AgreementDocument from "@/components/agreement/AgreementDocument";
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
  
  const [additionalTerms, setAdditionalTerms] = useState<string[]>([]);
  const [downloading, setDownloading] = useState(false);
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
templateData?.fields?.additionalTerms || [];

setAdditionalTerms(savedTerms);
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
      "fields.additionalTerms": additionalTerms,
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
  if (downloading) return;

  try {
    setDownloading(true);

    window.open(`/api/pdf/${pactId}`, "_blank");
  } finally {
    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  }
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
  downloading={downloading}
  onSave={saveContinue}
  onDownload={downloadPDF}
  onSend={sendAgreement}
  onVoid={voidAgreement}
/>

      {/* DOCUMENT */}

      <main className="mx-auto max-w-6xl px-2 sm:px-6 py-6 sm:py-10">

  <AgreementDocument
  pact={pact}
  pactId={pactId}
  templateFields={templateFields}
  additionalTerms={additionalTerms}
  mode="edit"
  isPartyA={isPartyA}
  setAdditionalTerms={setAdditionalTerms}
/>

</main>
    </div>
  );
}