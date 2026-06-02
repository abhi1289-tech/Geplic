"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { logAction } from "@/lib/audit";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function AgreementDocument(){

  const router = useRouter();
  const params = useParams();
  const pactId = params?.pactId as string;

  const { user } = useAuth();

  const [partyA,setPartyA] = useState<any>(null);
  const [partyB,setPartyB] = useState<any>(null);
  const [pact,setPact] = useState<any>(null);
  const [template,setTemplate] = useState<any>(null);
  const [loading,setLoading] = useState(true);

  const viewLogged = useRef(false);

  useEffect(()=>{

    async function loadDocument(){

      if(!user || !pactId) return;

      const pactRef = doc(db,"pacts",pactId);
      const pactSnap = await getDoc(pactRef);

      if(!pactSnap.exists()){
        router.push("/dashboard");
        return;
      }

      const pactData = pactSnap.data();

      if(
        pactData.createdBy !== user.uid &&
        pactData.counterpartyEmail !== user.email
      ){
        router.push("/dashboard");
        return;
      }

      setPact({id:pactSnap.id,...pactData});

      const templateQuery = query(
        collection(db,"templates"),
        where("pactId","==",pactId)
      );

      const templateSnap = await getDocs(templateQuery);

      if(!templateSnap.empty){
        setTemplate(templateSnap.docs[0].data());
      }

      /* DOCUMENT VIEW LOGIC */

      const viewKey = `doc_view_logged_${pactId}`;
      const partiesQuery = query(
  collection(db,"parties"),
  where("pactId","==",pactId)
);

const partiesSnap = await getDocs(partiesQuery);

partiesSnap.forEach(doc=>{

  const data:any = doc.data();

  if(data.role === "partyA"){
    setPartyA(data);
  }

  if(data.role === "partyB"){
    setPartyB(data);
  }

});

/* Prevent duplicate logs immediately */

if(!viewLogged.current && !sessionStorage.getItem(viewKey)){

  viewLogged.current = true;
  sessionStorage.setItem(viewKey,"true");

  await logAction(
    pactId,
    "DOCUMENT_VIEWED",
    user?.email || ""
  );

}

      setLoading(false);
    }

    loadDocument();

  },[user,pactId,router]);

  async function downloadPDF(){

    await logAction(
      pactId,
      "PDF_DOWNLOADED",
      user?.email || ""
    );

    window.print();

  }

  function getExecutionBanner(){

    if(!pact) return "";

    if(pact.status==="signed"){
      return "DIGITALLY EXECUTED AGREEMENT";
    }

    return "THIS AGREEMENT IS NOT LEGALLY EXECUTED UNTIL BOTH PARTIES SIGN";
  }

  if(loading){
    return <div className="p-6">Loading agreement...</div>;
  }

  const fields = template?.fields || {};
  const category = template?.category;

  return(

    <div className="min-h-screen bg-white text-black">

      <main className="mx-auto max-w-3xl px-8 py-12">

        {/* BACK BUTTON */}

        <button
          onClick={()=>router.back()}
          className="mb-6 text-sm text-gray-500 hover:text-black"
        >
          ← Back
        </button>

        <div className="text-center mb-6">

          <p className="text-sm font-semibold text-red-600 mb-4">
            {getExecutionBanner()}
          </p>

          <h1 className="text-3xl font-bold">
            {category === "personal_loan" && "PERSONAL LOAN AGREEMENT"}
            {category === "freelance_service" && "FREELANCE SERVICE AGREEMENT"}
            {category === "general_promise" && "PROMISE AGREEMENT"}
            {category === "rent_agreement" && "RENT AGREEMENT"}
          </h1>

        </div>

        <p className="mb-6">
          This Agreement is made between the following parties:
        </p>

        <p>
          <strong>Party A:</strong> {pact?.creatorEmail}
        </p>

        <p className="mb-6">
          <strong>Party B:</strong> {pact?.counterpartyEmail}
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Agreement Terms
        </h2>

        {category==="personal_loan" &&(

          <div className="space-y-2">
            <p><strong>Loan Amount:</strong> ₹{fields.loanAmount}</p>
            <p><strong>Interest Rate:</strong> {fields.interestRate}%</p>
            <p><strong>Repayment Date:</strong> {fields.repaymentDate}</p>
          </div>

        )}

        {category==="freelance_service" &&(

          <div className="space-y-2">
            <p><strong>Service:</strong> {fields.serviceDescription}</p>
            <p><strong>Payment Amount:</strong> ₹{fields.paymentAmount}</p>
            <p><strong>Delivery Date:</strong> {fields.deliveryDate}</p>
          </div>

        )}

        {category==="general_promise" &&(
          <p>{fields.promiseText}</p>
        )}

        {category==="rent_agreement" &&(

          <div className="space-y-2">
            <p><strong>Property Address:</strong> {fields.propertyAddress}</p>
            <p><strong>Monthly Rent:</strong> ₹{fields.monthlyRent}</p>
            <p><strong>Security Deposit:</strong> ₹{fields.securityDeposit}</p>
            <p><strong>Start Date:</strong> {fields.startDate}</p>
            <p><strong>Duration:</strong> {fields.durationMonths} months</p>
          </div>

        )}

       {pact?.requireSignatures && (

  <div className="mt-16 flex justify-between">

    <div>

      {partyA?.signature
        ? <img src={partyA.signature} width={150}/>
        : "_________________"}

      <p>Party A Signature</p>

    </div>

    <div>

      {partyB?.signature
        ? <img src={partyB.signature} width={150}/>
        : "_________________"}

      <p>Party B Signature</p>

    </div>

  </div>

)}

        <div className="mt-10">

          <button
            onClick={downloadPDF}
            className="border px-4 py-2"
          >
            Download PDF
          </button>

        </div>

        {/* DOCUMENT HASH */}

        {pact?.documentHash &&(

          <div className="mt-12 border-t pt-6 text-xs text-gray-500 break-all">

            <p className="font-semibold">
              Document Verification Hash
            </p>

            <p>{pact.documentHash}</p>

          </div>

        )}

      </main>

    </div>

  );
}