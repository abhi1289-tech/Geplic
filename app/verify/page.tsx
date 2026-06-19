"use client";

import { useState } from "react";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";

export default function VerifyPage(){

  const router = useRouter();
  const [hash,setHash] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState<any>(null);
  const [notFound,setNotFound] = useState(false);
  const verificationInfo =
  result
    ? getVerificationStatus(result.status)
    : null;

  async function verifyDocument(){

    if(!hash) return;

    try{

      setLoading(true);
      setNotFound(false);
      setResult(null);

      const q = query(
        collection(db,"pacts"),
        where("documentHash","==",hash.trim())
      );

      const snap = await getDocs(q);

      if(snap.empty){

        setNotFound(true);

      }else{

        const pactDoc = snap.docs[0];

const pact = {
  id: pactDoc.id,
  ...pactDoc.data(),
};

setResult(pact);

      }

    }catch(error){

      console.error(error);

    }finally{

      setLoading(false);

    }

  }
  

function getVerificationStatus(status: string) {

  switch(status){

    case "completed":
      return {
        title: "✅ Agreement Verified",
        color: "green",
        message:
          "This agreement has been completed and verified against Geplic records."
      };

    case "draft":
      return {
        title: "⚠ Agreement Draft",
        color: "yellow",
        message:
          "This agreement exists but has not yet been completed."
      };

    case "pending":
      return {
        title: "⏳ Pending Acceptance",
        color: "yellow",
        message:
          "This agreement has been sent but is still awaiting acceptance."
      };

    case "rejected":
      return {
        title: "❌ Agreement Rejected",
        color: "red",
        message:
          "This agreement was rejected by one of the parties."
      };

    case "voided":
      return {
        title: "🚫 Agreement Voided",
        color: "red",
        message:
          "This agreement was voided by its creator before completion."
      };

    default:
      return {
        title: "ℹ Agreement Found",
        color: "cyan",
        message:
          "Agreement located in Geplic records."
      };

  }

}
return(

<div className="min-h-screen bg-black text-white overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(0,153,255,0.15),transparent_35%)]">
    {/* HEADER */}

    <AppHeader
  rightContent={
    <button
      onClick={() => router.push("/dashboard")}
className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-white/70 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-white"    >
      Dashboard
    </button>
  }
/>

    {/* CONTENT */}

    <main className="mx-auto max-w-6xl px-6 py-12">

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_80px_rgba(0,200,255,0.06)]">

        <h1 className="mb-2 text-3xl font-bold">
          Verify Agreement
        </h1>

        <p className="mb-6 text-white/60">
          Paste the document verification hash below.
        </p>

        <textarea
          value={hash}
          onChange={(e)=>setHash(e.target.value)}
          placeholder="Paste document hash..."
          className="h-36 w-full rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white outline-none transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400/60"
        />

        <button
          onClick={verifyDocument}
          disabled={loading}
          className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.01]"
        >
          {loading ? "Verifying..." : "Verify Document"}
        </button>
        
        {result && (

          <div
  className={`mt-8 rounded-xl p-6 ${
    verificationInfo?.color === "green"
      ? "border border-green-500/30 bg-green-500/10"
      : verificationInfo?.color === "red"
      ? "border border-red-500/30 bg-red-500/10"
      : "border border-yellow-500/30 bg-yellow-500/10"
  }`}
>

            <h2
  className={`mb-2 text-2xl font-semibold ${
    verificationInfo?.color === "green"
      ? "text-green-400"
      : verificationInfo?.color === "red"
      ? "text-red-400"
      : "text-yellow-400"
  }`}
>
  {verificationInfo?.title}
</h2>


            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-300">

              <div className="h-2 w-2 rounded-full bg-green-400" />

              Hash Integrity Verified

            </div>

            <p className="mt-4 text-sm text-white/70">
  {verificationInfo?.message}
</p>

            <div className="mt-6 space-y-2 text-sm">
              <p>
  <strong>Agreement ID:</strong>{" "}
  {result.id || "Unavailable"}
</p>
              <p>
                <strong>Status:</strong> {result.status}
              </p>

              <p>
                <strong>Party A:</strong> {result.creatorEmail}
              </p>

              <p>
                <strong>Party B:</strong> {result.counterpartyEmail}
              </p>

              <p>
                <strong>Accepted By:</strong>{" "}
                {result.acceptedByName || "Unavailable"}
              </p>

              <p>
                <strong>Designation:</strong>{" "}
                {result.acceptedByDesignation || "Unavailable"}
              </p>

              <p>
                <strong>Completed At:</strong>{" "}
                {result.acceptedAt?.seconds
                  ? new Date(
                      result.acceptedAt.seconds * 1000
                    ).toLocaleString()
                  : "Unavailable"}
              </p>

            </div>

          </div>

        )}

        {notFound && (

          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6">

            <h2 className="mb-2 text-2xl font-semibold text-red-400">
              ❌ Verification Failed
            </h2>

            <p className="text-sm text-white/70">
              No agreement found for this hash.
            </p>

          </div>

        )}

      </div>

    </main>

  </div>

);
}
