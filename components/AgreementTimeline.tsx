"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function AgreementTimeline({ pactId }:{ pactId:string }){

  const [logs,setLogs] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    async function loadLogs(){

      const q = query(
        collection(db,"audit_logs"),
        where("pactId","==",pactId),
        orderBy("createdAt","asc")
      );

      const snap = await getDocs(q);

      const items:any[] = [];

      snap.forEach(doc=>{
        items.push({id:doc.id,...doc.data()});
      });
      const filteredLogs = items.filter(
  (item) =>
    item.action !== "AGREEMENT_VIEWED"
);
      
      setLogs(filteredLogs);
      setLoading(false);

    }

    loadLogs();

  },[pactId]);

  if(loading){
    return (
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
        Loading agreement timeline...
      </div>
    );
  }

  return(

  <div className="mt-14">

    <div className="mb-6 flex items-center gap-3">

      <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
  Agreement Timeline
</h2>

    </div>
    {logs.length === 0 && (

  <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-white/40">
    No agreement activity yet.
  </div>

)}
    <div className="relative space-y-5 border-l border-white/10 pl-4 sm:pl-6">

      {logs.map((log:any,index:number)=>(

        <div
          key={index}
          className="relative w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
        >

          <div
  className={`
    absolute
    -left-[31px]
    top-6
    h-4
    w-4
    rounded-full
    border-4
    border-black

    ${
      log.action === "PACT_CREATED"
        ? "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.9)]"
        : ""
    }

    ${
      log.action === "PACT_EDITED"
        ? "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.9)]"
        : ""
    }

    ${
      log.action === "OFFER_SENT"
      ? "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.9)]"
      : ""
    }

    ${
      log.action === "OFFER_ACCEPTED"
        ? "bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]"
        : ""
    }

    ${
      log.action === "OFFER_REJECTED"
        ? "bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.9)]"
        : ""
    }

    ${
      log.action === "AGREEMENT_COMPLETED"
        ? "bg-violet-400 shadow-[0_0_15px_rgba(192,132,252,0.9)]"
        : ""
    }
    ${
  log.action === "AGREEMENT_VOIDED"
    ? "bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.9)]"
    : ""
}
  `}
/>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

            <div>

              <p className="text-base sm:text-lg font-semibold text-white">

                {log.action === "PACT_CREATED" && "Pact Created"}

{log.action === "PACT_EDITED" && "Agreement Edited"}

{log.action === "OFFER_SENT" && "Offer Sent"}

{log.action === "OFFER_ACCEPTED" && "Offer Accepted"}

{log.action === "OFFER_REJECTED" && "Offer Rejected"}

{log.action === "AGREEMENT_COMPLETED" && "Agreement Completed"}
{log.action === "AGREEMENT_VOIDED" && "Agreement Voided"}

              </p>

              <p className="mt-1 break-all text-sm text-white/50">
  {log.userEmail}
</p>

            </div>

            <div className="
  rounded-full
  border
  border-white/10
  bg-black/40
  px-3
  py-1
  text-xs
  text-white/50
  self-start
  break-words
">
  {new Date(
    log.createdAt?.seconds * 1000
  ).toLocaleString()}
</div>

          </div>

        </div>

      ))}

    </div>

  </div>

);

}