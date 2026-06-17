"use client";

import { useEffect, useRef, useState } from "react";
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
import { generateAgreementTemplate } from "@/lib/templates";
import { logAction } from "@/lib/audit";
import { auth } from "@/lib/firebase";
import html2pdf from "html2pdf.js";
import BrandLogo from "@/components/BrandLogo";
import AppHeader from "@/components/AppHeader";

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
const isPartyB =
  currentUser?.email?.toLowerCase() ===
  pact?.counterpartyEmail?.toLowerCase();
  
  const [terms, setTerms] = useState<string[]>([]);
  const [templateFields, setTemplateFields] =
  useState<any>({});

  const documentRef = useRef<any>(null);

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

let promiseText = "";
let loanAmount = "";
let interestRate = "";
let repaymentDate = "";
let serviceDescription = "";
let paymentAmount = "";

let deliveryDate = "";

let propertyAddress = "";
let monthlyRent = "";
let securityDeposit = "";
let startDate = "";
let durationMonths = "";
let clauses: string[] = [];

if (!templateSnap.empty) {

  const templateData = templateSnap.docs[0].data();
  setTemplateFields(
  templateData?.fields || {}
);
  const defaultClauses =
  templateData?.fields?.clauses || [];

  const savedTerms =
  templateData?.fields?.clauses || [];

setTerms(savedTerms);

  promiseText =
    templateData?.fields?.promiseText || "";

  loanAmount =
    templateData?.fields?.loanAmount || "";

  interestRate =
    templateData?.fields?.interestRate || "";

  repaymentDate =
    templateData?.fields?.repaymentDate || "";

  serviceDescription =
    templateData?.fields?.serviceDescription || "";

  paymentAmount =
    templateData?.fields?.paymentAmount || "";

  deliveryDate =
    templateData?.fields?.deliveryDate || "";

  propertyAddress =
    templateData?.fields?.propertyAddress || "";

  monthlyRent =
    templateData?.fields?.monthlyRent || "";

  securityDeposit =
    templateData?.fields?.securityDeposit || "";

  startDate =
    templateData?.fields?.startDate || "";

  durationMonths =
    templateData?.fields?.durationMonths || "";
  
  clauses =
    templateData?.fields?.clauses || [];
}
const agreementDate =
  data.createdAt?.seconds
    ? new Date(
        data.createdAt.seconds * 1000
      ).toLocaleDateString()
    : "Not Available";
const generatedTemplate =
  generateAgreementTemplate(
  data.contractType,
  {
    partyA: data.creatorEmail,
    partyB: data.counterpartyEmail,

    agreementDate,

    promiseText,

    loanAmount,
    interestRate,
    repaymentDate,

    serviceDescription,
    paymentAmount,
    deliveryDate,

    propertyAddress,
    monthlyRent,
    securityDeposit,
    startDate,
    durationMonths,
    clauses,
  }
)


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

  const templateData =
    templateDoc.data();

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
    if (!documentRef.current) return;

    const opt = {
      margin: 0.5,

      filename: `${pact?.title || "agreement"}.pdf`,

      image: {
        type: "jpeg" as "jpeg",
        quality: 1,
      },

      html2canvas: {
        scale: 2,
      },

      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait" as "portrait",
      },
    };

    await html2pdf()
      .set(opt)
      .from(documentRef.current)
      .save();
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

          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
            {isPartyA && pact.status === "draft" && (
            <button
              onClick={saveContinue}
              className="rounded-xl border border-white/10 px-3 sm:px-5 py-2 text-sm transition hover:border-cyan-400/20 hover:text-cyan-300"
            >
              Save & Continue
            </button>)}

            <button
              onClick={downloadPDF}
              className="rounded-xl border border-white/10 px-3 sm:px-5 py-2 text-sm transition hover:border-cyan-400/20 hover:text-cyan-300"
            >
              Download PDF
            </button>
           
            {isPartyA && pact.status === "draft" && (
              <button
  onClick={sendAgreement}
  disabled={sending}
  className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-3 sm:px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
>
  {sending ? "Sending..." : "Send Agreement"}
</button>
            )}
            {isPartyA &&
 (pact.status === "draft" ||
  pact.status === "pending") && (

<button
  onClick={voidAgreement}
  className="rounded-xl border border-red-500/40 px-3 sm:px-5 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
>
  Void Agreement
</button>

)}

            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border border-white/10 px-3 sm:px-5 py-2 text-sm transition hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-white"
            >
              Dashboard
            </button>
          </div>
      
}
/>

      {/* DOCUMENT */}

      <main className="mx-auto max-w-6xl px-2 sm:px-6 py-4 sm:py-10">
        <div 
          ref={documentRef}
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

          <div className="relative z-10 mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                Party A
              </p>

              <h2 className="mt-4 break-words text-xl sm:text-2xl font-bold">
  {pact.creatorName || pact.creatorEmail}
</h2>
              <p className="mt-2 text-black/60">
  {pact.creatorDesignation || "Agreement Creator"}
</p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                Party B
              </p>

              <h2 className="mt-4 break-words text-xl sm:text-2xl font-bold">
                {pact.counterpartyName || pact.counterpartyEmail}
              </h2>
              <p className="mt-2 text-black/60">
  {pact.counterpartyDesignation || "Counterparty"}
</p>
            </div>
          </div>

          {/* AGREEMENT */}

          <div 
          className="relative z-10 mt-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Agreement Terms
            </h2>
            

            <div
  className={`mt-6 rounded-3xl border p-4 sm:p-8 transition-all ${
    pact.status === "draft"
      ? "border-gray-200 bg-gray-50"
      : "border-emerald-200 bg-emerald-50/40"
  }`}
>
  
    {(pact.status !== "draft" || !isPartyA) && (

  <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4">

    <p className="font-semibold text-emerald-700">
      Agreement Locked
    </p>

    <p className="mt-1 text-sm text-emerald-600">
      {pact.status === "voided"
 ? "This agreement has been voided and can no longer be used."
 : "This agreement can no longer be edited because it has already been proposed or completed."
}
    </p>

  </div>

)}


              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-200 bg-white p-6">

  <h3 className="text-2xl font-bold text-center">
    {pact.contractType?.toUpperCase()} AGREEMENT
  </h3>

  <div className="mt-6 space-y-3">

    <p>
      <strong>Party A:</strong>{" "}
      {pact.creatorName || pact.creatorEmail}
    </p>

    <p>
      <strong>Party B:</strong>{" "}
      {pact.counterpartyName || pact.counterpartyEmail}
    </p>

    <p>
      <strong>Agreement Date:</strong>{" "}
      {pact.createdAt?.seconds
        ? new Date(
            pact.createdAt.seconds * 1000
          ).toLocaleDateString()
        : "Not Available"}
    </p>

  </div>

</div>
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

  <span className="
    rotate-[-30deg]
    text-[120px]
    font-black
    tracking-[1rem]
    text-gray-200
    opacity-30
  ">
    {pact.status === "draft"
      ? "DRAFT"
      : pact.status === "pending"
      ? "PENDING"
      : pact.status === "completed"
      ? "VERIFIED"
      : "VOID"}
  </span>

</div>
{/* AGREEMENT DETAILS */}

<div className="mb-8 rounded-2xl border border-emerald-200 bg-white p-6">

  <h3 className="text-xl font-bold mb-4">
    Agreement Details
  </h3>

{pact.contractType === "Loan" && ( <div className="space-y-2"> <p><strong>Loan Amount:</strong> ₹{templateFields.loanAmount}</p> <p><strong>Interest Rate:</strong> {templateFields.interestRate}%</p> <p><strong>Repayment Date:</strong> {templateFields.repaymentDate}</p> </div>
)}

{pact.contractType === "Freelance / Service" && ( <div className="space-y-2"> <p><strong>Service Description:</strong> {templateFields.serviceDescription}</p> <p><strong>Payment Amount:</strong> ₹{templateFields.paymentAmount}</p> <p><strong>Delivery Date:</strong> {templateFields.deliveryDate}</p> </div>
)}

{pact.contractType === "Rent Agreement" && ( <div className="space-y-2"> <p><strong>Property Address:</strong> {templateFields.propertyAddress}</p> <p><strong>Monthly Rent:</strong> ₹{templateFields.monthlyRent}</p> <p><strong>Security Deposit:</strong> ₹{templateFields.securityDeposit}</p> <p><strong>Start Date:</strong> {templateFields.startDate}</p> <p><strong>Duration:</strong> {templateFields.durationMonths} Months</p> </div>
)}

{pact.contractType === "General Promise" && ( <div className="space-y-2"> <p>{templateFields.promiseText}</p> </div>
)}

</div>

  {terms.map((term, index) => (

    <div
  key={index}
  className="flex items-start gap-3"
>

  <div className="mt-3 text-lg font-bold">
    {index + 1}.
  </div>

  <div className="flex-1">

    <textarea
      value={term}
      disabled={
        pact.status !== "draft" ||
        !isPartyA
      }
      onChange={(e) => {

        const updated = [...terms];

        updated[index] =
          e.target.value;

        setTerms(updated);

      }}
      className="
        min-h-[80px]
        w-full
        resize-none
        rounded-2xl
        border
        border-emerald-200
        bg-white
        p-4
        outline-none
      "
    />

  </div>

  {pact.status === "draft" &&
   isPartyA &&
   terms.length > 1 && (

    <button
      type="button"
      onClick={() => {

        const updated =
          terms.filter(
            (_, i) => i !== index
          );

        setTerms(updated);

      }}
      className="
        rounded-xl
        border
        border-red-300
        px-3
        py-2
        text-red-600
        hover:bg-red-50
      "
    >
      ✕
    </button>

  )}
    </div>

  ))}

  {pact.status === "draft" &&
    isPartyA && (

    <button
      onClick={() =>
        setTerms([
          ...terms,
          ""
        ])
      }
      className="
        rounded-xl
        border
        border-cyan-500/30
        px-5
        py-3
        text-cyan-600
      "
    >
      + Add New Term
    </button>

  )}

</div>
<div className="mt-10 rounded-2xl border border-emerald-200 bg-white p-6">

  <h3 className="text-xl font-bold">
    Acknowledgement
  </h3>

  <p className="mt-4">
    Both parties acknowledge that they have
    reviewed and accepted the terms of this
    Loan Agreement.
  </p>

</div>
            </div>
          </div>
         

          {/* DIGITAL ACCEPTANCE */}

<div className="relative z-10 mt-14 border-t border-emerald-200 pt-10">

  <h2 className="text-3xl font-bold tracking-tight">
    Digital Acceptance
  </h2>

  <div className="mt-8 grid gap-8 md:grid-cols-2">

    {/* PARTY A */}

    <div className="rounded-3xl border border-gray-200 p-4 sm:p-6">

      <p className="text-sm uppercase tracking-[0.3em] text-black/50">
        Agreement Creator
      </p>

      <div className="mt-5">

        <h3 className="text-2xl font-bold">
          {pact.creatorName || "Unavailable"}
        </h3>

        <p className="mt-2 text-black/60">
          {pact.creatorDesignation || "No designation"}
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">

          <p className="font-semibold text-emerald-700">
            Identity Verified Through Geplic Account
          </p>

        </div>

      </div>

    </div>

    {/* PARTY B */}

    <div className="rounded-3xl border border-gray-200 p-4 sm:p-6">

      <p className="text-sm uppercase tracking-[0.3em] text-black/50">
        Counterparty Acceptance
      </p>

      {pact.status === "completed" ? (

        <div className="mt-5">

          <h3 className="text-2xl font-bold">
            {pact.acceptedByName || "Unavailable"}
          </h3>

          <p className="mt-2 text-black/60">
            {pact.acceptedByDesignation || "No designation"}
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">

            <p className="font-semibold text-emerald-700">
              Agreement Accepted Digitally
            </p>

            <p className="mt-2 text-sm text-emerald-600">
              {pact.acceptedAt?.seconds
                ? new Date(
                    pact.acceptedAt.seconds * 1000
                  ).toLocaleString()
                : "Timestamp unavailable"}
            </p>

          </div>

        </div>

      ) : (

        <div className="mt-6 flex h-40 items-center justify-center rounded-2xl border border-dashed border-emerald-200 text-black/40">

          Waiting for counterparty acceptance

        </div>

      )}

    </div>

  </div>

</div>

          <div className="relative z-10 mt-14 border-t border-emerald-200 pt-8">

  <div className="grid md:grid-cols-3 items-center gap-8">

    {/* LEFT */}

    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">
        Verification
      </p>

      <p className="mt-2 text-sm text-black/70">
        Verified on Geplic
      </p>
      <p className="mt-1 text-xs text-black/50">
  Generated on {new Date().toLocaleDateString()}
</p>
    </div>

    {/* CENTER SEAL */}
    

    

  <div className="flex justify-center">

    <div className="
      relative
      h-40
      w-40
      rounded-full
      border-[6px]
      border-emerald-300
      flex
      items-center
      justify-center
      bg-emerald-50
    ">

      <div
        className="
          absolute
          inset-2
          rounded-full
          border-2
          border-emerald-400
        "
      />

      <div className="text-center">

        <div className="text-4xl">
          ✓
        </div>

        <p className="text-xs font-bold tracking-wider text-emerald-700">
          GEPLIC VERIFIED
        </p>

      </div>

    </div>

  </div>



    {/* RIGHT */}

    <div className="text-right">

      <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">
        SHA-256 Hash
      </p>

      <p className="mt-2 break-all text-sm text-black/70">
        {pact.documentHash || "Not Available"}
      </p>

      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-emerald-700">
        Verification Link
      </p>

      <p className="mt-2 break-all text-sm text-black/70">
        https://geplic.com/verify/{pact.documentHash}
      </p>

    </div>

  </div>

</div>
        </div>
      </main>
    </div>
  );
}