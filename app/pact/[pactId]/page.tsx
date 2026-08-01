"use client";

import { useParams, useRouter } from "next/navigation";
import { logAction } from "@/lib/audit";
import BrandLogo from "@/components/BrandLogo";
import { useEffect, useState } from "react";
import AgreementTimeline from "@/components/AgreementTimeline";
import AppHeader from "@/components/AppHeader";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { generateHash } from "@/lib/hash";

export default function PactPage(){

  const router = useRouter();
  
  const [acceptName,setAcceptName] = useState("");
  const [acceptDesignation,setAcceptDesignation] = useState("");
  const [acceptConsent,setAcceptConsent] = useState(false);
  const [showRejectModal,setShowRejectModal] = useState(false);

const [rejectReason,setRejectReason] = useState("");

const [otherReason,setOtherReason] = useState("");
  const params = useParams();
  const pactId = params?.pactId as string;

  const { user } = useAuth();

  const [pact,setPact] = useState<any>(null);
  const [template,setTemplate] = useState<any>(null);
  const [role,setRole] = useState<"partyA" | "partyB" | null>(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{

    async function loadData(){

      if(!user || !pactId) return;

      const uid = user.uid;
      const email = user.email?.toLowerCase();

      const pactRef = doc(db,"pacts",pactId);
      const pactSnap = await getDoc(pactRef);

      if(!pactSnap.exists()){
        router.push("/dashboard");
        return;
      }

      const pactData = pactSnap.data();
      if(user){

  const profileSnap = await getDoc(
    doc(db,"users",user.uid)
  );

  if(profileSnap.exists()){

    const profile = profileSnap.data();

    setAcceptName(profile.fullName || "");
    setAcceptDesignation(profile.designation || "");

  }

}
      if(
        pactData.createdBy !== uid &&
        pactData.counterpartyEmail !== email
      ){
        router.push("/dashboard");
        return;
      }

      setPact({id:pactSnap.id,...pactData});
      if(
  pactData.status !== "draft" &&
  pactData.status !== "completed"
){}

      const emailLower = user.email?.toLowerCase();

      if(pactData.creatorEmail === emailLower){
        setRole("partyA");
      }
      else if(pactData.counterpartyEmail === emailLower){
        setRole("partyB");
      }

      const templateQuery = query(
        collection(db,"templates"),
        where("pactId","==",pactId)
      );

      const templateSnap = await getDocs(templateQuery);

      if(!templateSnap.empty){
        setTemplate(templateSnap.docs[0].data());
      }

      const partyQuery = query(
        collection(db,"parties"),
        where("pactId","==",pactId),
        where("email","==",email)
      );

      const partySnap = await getDocs(partyQuery);

      if(!partySnap.empty){

        const partyDoc = partySnap.docs[0];
        const data = partyDoc.data();

        if(!data.userId){
          await updateDoc(partyDoc.ref,{ userId:uid });
        }

      }

      setLoading(false);

    }

    loadData();

  },[user,pactId,router]);

  async function sendOffer(){

    await updateDoc(
      doc(db,"pacts",pactId),
      {
        status:"pending",
        pendingAt:new Date(),
        agreementLocked:true
      }
    );

    await logAction(
      pactId,
      "OFFER_SENT",
      user?.email || ""
    );

    setPact({
      ...pact,
      status:"pending",
      agreementLocked:true
    });
    await fetch("/api/send-offer-email",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:pact.counterpartyEmail,
        pactId,
        sender:user?.email
      })
});
  router.push(`/pact/${pactId}`);
  }

  async function acceptOffer(){
    if (pact.status === "voided") {

  alert("This agreement has been voided.");

  return;

}
 if (!acceptName.trim()) {

    alert("Full Name is required.");
    return;

  }


    let hash = null;
    const agreementData = {
  creatorEmail: pact.creatorEmail,
  counterpartyEmail: pact.counterpartyEmail,
  category: template?.category,
  fields: template?.fields,

  acceptedByName: acceptName,

  acceptedByDesignation: acceptDesignation,

  acceptedVia: "click_acceptance",
};

hash = await generateHash(agreementData);
    await updateDoc(
  doc(db,"pacts",pactId),
  {
    status:"completed",

    acceptedAt:new Date(),
    counterpartyName: acceptName,

    counterpartyDesignation: acceptDesignation,

    acceptedByName:acceptName,

    acceptedByDesignation:acceptDesignation,

    acceptedVia:"click_acceptance",

    documentHash:hash,

    completedAt:new Date(),

    agreementLocked:true
  }
);

    setPact({
  ...pact,
  status:"completed",
  documentHash:hash,
  acceptedByName:acceptName,
  acceptedByDesignation:acceptDesignation,
  acceptedAt:{
    seconds: Math.floor(Date.now()/1000)
  }
});

    await logAction(
      pactId,
      "AGREEMENT_COMPLETED",
      user?.email || ""
    );

  }
  async function voidAgreement() {

  if (
    pact.status !== "draft" &&
    pact.status !== "pending"
  ) {
    alert("Only draft or pending agreements can be voided.");
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to void this agreement?"
  );

  if (!confirmed) return;

  await updateDoc(
    doc(db, "pacts", pactId),
    {
      status: "voided",
      voidedAt: new Date(),
      agreementLocked: true
    }
  );

  await logAction(
    pactId,
    "AGREEMENT_VOIDED",
    user?.email || ""
  );

  setPact({
    ...pact,
    status: "voided",
    agreementLocked: true
  });
}
  async function rejectOffer(){

  const finalReason =
    rejectReason === "Other"
      ? otherReason
      : rejectReason;

  if(!finalReason){
    alert("Please select a reason");
    return;
  }

  await updateDoc(
    doc(db,"pacts",pactId),
    {
      status:"rejected",
      rejectedAt:new Date(),
      rejectionReason: finalReason,
      rejectedBy:user?.email || "",
      agreementLocked:true
    }
  );

  await logAction(
    pactId,
    "OFFER_REJECTED",
    user?.email || ""
  );

  setPact({
    ...pact,
    status:"rejected",
    rejectionReason: finalReason
  });

  setShowRejectModal(false);
}

  if(loading){
    return <div className="p-6 text-white">Loading pact...</div>;
  }

  const fields = template?.fields || {};
  const category = template?.category;
  function getStatusBadge(status:string){

    const base = "inline-block rounded-full px-3 py-1 text-xs font-semibold";

    if(status === "draft"){
      return <span className={`${base} bg-gray-600 text-white`}>Draft</span>;
    }
    if(status === "pending"){
  return (
    <span
      className={`${base} bg-yellow-500 text-black`}
    >
      Pending Acceptance
    </span>
  );
}

    /*if(status === "signed"){
      return <span className={`${base} bg-green-600 text-white`}>Signed</span>;
    }*/

    if(status === "completed"){
      return <span className={`${base} bg-green-600 text-white`}>Completed</span>;
    }

    if(status === "rejected"){
      return <span className={`${base} bg-red-600 text-white`}>Rejected</span>;
    }
    if(status === "voided"){
  return (
    <span
      className={`${base} bg-red-900 text-red-300`}
    >
      Voided
    </span>
  );
}

    return null;

  }
  return(

    <div className="min-h-screen overflow-x-hidden bg-black text-white bg-[radial-gradient(circle_at_top,rgba(0,153,255,0.12),transparent_35%)]">
      {/* ================= HEADER ================= */}
            <AppHeader
  rightContent={
    <button
      onClick={() => router.push("/dashboard")}
      className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-white/70 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-white"
    >
      Dashboard
    </button>
  }
/>
      <main className="mx-auto max-w-5xl px-4 sm:px-8 py-8 sm:py-12">

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
  Agreement
</h1>

        <div className="mt-3 text-lg text-white/50">
          {getStatusBadge(pact?.status)}
        </div>

        {pact?.status == "pending" && pact?.status !== "voided" && (
          <p className="text-yellow-400 text-sm mt-2">
            🔒 Agreement terms are locked after the offer was sent.
          </p>
        )}
         {pact?.status == "voided" && (
          <p className="text-red-400 text-sm mt-2">
            🚫 Agreement is inactive.
          </p>
        )}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,153,255,0.08)]">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          Agreement Summary
        </h2>
        {template && (

          <div className="mt-6 space-y-3">

            {category==="Loan" && (
              <>
                <p><strong>Loan Amount:</strong> ₹{fields.loanAmount}</p>
                <p><strong>Repayment Date:</strong> {fields.repaymentDate}</p>
                {fields.interestRate && (
                  <p><strong>Interest Rate:</strong> {fields.interestRate}%</p>
                )}
              </>
            )}

            {category==="Freelance / Service" && (
              <>
                <p className="break-words">
  <strong>Service:</strong> {fields.serviceDescription}
</p>
                <p><strong>Payment Amount:</strong> ₹{fields.paymentAmount}</p>
                <p><strong>Delivery Date:</strong> {fields.deliveryDate}</p>
              </>
            )}

            {category==="General Promise" && (
              <p className="break-words">
  {fields.promiseText}
</p>
            )}

            {category==="Rent Agreement" && (
              <>
                <p className="break-words"><strong>Property Address:</strong> {fields.propertyAddress}</p>
                <p><strong>Monthly Rent:</strong> ₹{fields.monthlyRent}</p>
                <p><strong>Security Deposit:</strong> ₹{fields.securityDeposit}</p>
                <p><strong>Start Date:</strong> {fields.startDate}</p>
                <p><strong>Duration:</strong> {fields.durationMonths} months</p>
              </>
            )}

          </div>

        )}
        </div>
        
        {/* SEND OFFER */}

        {pact.status === "draft" && role === "partyA" && (

          <button
            onClick={sendOffer}
            className="mt-8 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          >
              Send Offer  
          </button>

        )}

        {/* ACCEPT / REJECT */}

        {pact.status === "pending" &&
 pact.status !== "voided" &&
 role === "partyB" && (

          <div className="mt-6 space-y-4">

            {role === "partyB" &&
 pact.status === "pending" && (

<div className="mt-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6">

  <h3 className="text-xl font-semibold text-white">
    Agreement Acceptance
  </h3>

  <p className="mt-2 text-sm text-white/50">
    Confirm your identity and accept this agreement.
  </p>

  <div className="mt-6 grid gap-5 md:grid-cols-2">

    <div className="space-y-2">

      <label className="text-sm text-white/60">
        Full Name
      </label>

      <input
        value={acceptName}
        onChange={(e)=>setAcceptName(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400/60"
      />

    </div>

    <div className="space-y-2">

      <label className="text-sm text-white/60">
        Designation / Title
      </label>

      <input
        value={acceptDesignation}
        onChange={(e)=>setAcceptDesignation(e.target.value)}
        placeholder="Optional"
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400/60"
      />

    </div>

  </div>

  <label className="mt-6 flex items-start gap-3 text-sm text-white/70">

    <input
      type="checkbox"
      checked={acceptConsent}
      onChange={(e)=>setAcceptConsent(e.target.checked)}
      className="mt-1"
    />

    <span>
      I confirm that I have reviewed this agreement and voluntarily accept its terms.
    </span>

  </label>

  <button
    onClick={acceptOffer}
    disabled={
  !acceptConsent ||
  !acceptName.trim()
}
    className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Complete Agreement
  </button>
  

</div>

)}
            <button
              onClick={() => setShowRejectModal(true)}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
            >
              Reject Offer
            </button>

          </div>

        )}

       


  <div className="mt-8 flex flex-wrap gap-3">

  {pact.status !== "rejected" &&
   pact.status !== "voided" && (

    <button
      onClick={() =>
        router.push(`/agreement-builder/${pactId}`)
      }
      className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-medium text-white transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06]"
    >
      {
        pact.status === "draft" &&
        role === "partyA"
          ? "Edit Agreement"
          : "View Document"
      }
    </button>

  )}

  {role === "partyA" &&
   (pact.status === "draft" ||
    pact.status === "pending") && (

    <button
      onClick={voidAgreement}
      className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20"
    >
      Void Agreement
    </button>

  )}

</div>

        
        {pact?.status === "completed" && (

  <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 backdrop-blur-xl">

    <div className="flex items-center gap-3">

      <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]" />

      <h2 className="text-2xl font-bold text-white">
        Agreement Completed
      </h2>

    </div>
    

    <p className="mt-3 text-white/50">
      This agreement has been digitally completed and verified by the involved parties.
    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-2">

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

        <p className="text-sm text-white/50">
          Accepted By
        </p>

        <p className="mt-2 text-xl font-semibold text-white">
          {pact.acceptedByName || "Unknown"}
        </p>

        <p className="mt-1 text-cyan-300/80">
          {pact.acceptedByDesignation || "No designation"}
        </p>

      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

        <p className="text-sm text-white/50">
          Completed On
        </p>

        <p className="mt-2 break-words text-base sm:text-xl font-semibold text-white">

          {pact.acceptedAt
            ? new Date(
                pact.acceptedAt.seconds * 1000
              ).toLocaleString()
            : "Unavailable"}

        </p>

        <p className="mt-1 text-emerald-300/80">
          Hash Verified
        </p>

      </div>

    </div>

  </div>

)}
{pact?.status === "rejected" && (

  <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl">

    <div className="flex items-center gap-3">

      <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.9)]" />

      <h2 className="text-2xl font-bold text-white">
        Agreement Rejected
      </h2>

    </div>

    <p className="mt-3 text-white/50">
      This agreement was rejected and is no longer active.
    </p>

    <div className="mt-6 rounded-2xl border border-red-500/20 bg-black/20 p-4">

      <p className="text-sm text-white/50">
        Rejection Reason
      </p>

      <p className="mt-2 break-words whitespace-pre-wrap text-red-300">
  {pact.rejectionReason || "No reason provided"}
</p>


    </div>

  </div>

)}
{pact?.status === "voided" && (

<div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl">

  <div className="flex items-center gap-3">

    <div className="h-3 w-3 rounded-full bg-red-400" />

    <h2 className="text-2xl font-bold text-white">
      Agreement Voided
    </h2>

  </div>

  <p className="mt-3 text-white/50">
    This agreement was voided by the creator before completion.
  </p>

</div>

)}
{showRejectModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

  <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111] p-6">

    <h3 className="text-xl font-bold">
      Reject Agreement
    </h3>

    <select
      value={rejectReason}
      onChange={(e)=>setRejectReason(e.target.value)}
      className="mt-5 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
    >
      <option value="">
        Select reason
      </option>

      <option>
        Agreement terms are unclear
      </option>

      <option>
        Incorrect amount/value
      </option>

      <option>
        Incorrect dates
      </option>

      <option>
        Incorrect party information
      </option>

      <option>
        Need additional terms
      </option>

      <option>
        Legal concerns
      </option>

      <option>
        Other
      </option>
    </select>

    {rejectReason === "Other" && (

      <textarea
        maxLength={500}
        value={otherReason}
        onChange={(e)=>
          setOtherReason(e.target.value)
        }
        placeholder="Enter reason"
        className="mt-4 w-full rounded-xl border border-white/10 bg-black p-4"
      />

    )}

    <div className="mt-6 flex gap-3">

      <button
        onClick={() =>
          setShowRejectModal(false)
        }
        className="flex-1 rounded-xl border border-white/10 py-3"
      >
        Cancel
      </button>

      <button
        onClick={rejectOffer}
        className="flex-1 rounded-xl bg-red-600 py-3 font-semibold"
      >
        Reject
      </button>

    </div>

  </div>

</div>

)}
<AgreementTimeline pactId={pactId} />

      </main>

    </div>

  );

}