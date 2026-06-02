"use client";

import { logAction } from "@/lib/audit";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Listbox } from "@headlessui/react";

export default function CreatePactPage(){

  const { user } = useAuth();
  const router = useRouter();

  const [category,setCategory] = useState("Loan");
  const [title,setTitle] = useState("");
  const [counterpartyEmail,setCounterpartyEmail] = useState("");

  const [requireSignatures,setRequireSignatures] = useState(false);
  const [loading,setLoading] = useState(false);

  /* LOAN */

  const [loanAmount,setLoanAmount] = useState("");
  const [interestRate,setInterestRate] = useState("");
  const [repaymentDate,setRepaymentDate] = useState("");

  /* FREELANCE */

  const [serviceDescription,setServiceDescription] = useState("");
  const [paymentAmount,setPaymentAmount] = useState("");
  const [deliveryDate,setDeliveryDate] = useState("");

  /* GENERAL PROMISE */

  const [promiseText,setPromiseText] = useState("");

  /* RENT AGREEMENT */

  const [propertyAddress,setPropertyAddress] = useState("");
  const [monthlyRent,setMonthlyRent] = useState("");
  const [securityDeposit,setSecurityDeposit] = useState("");
  const [startDate,setStartDate] = useState("");
  const [durationMonths,setDurationMonths] = useState("");

  async function handleCreate(e:React.FormEvent){

    e.preventDefault();

    if(!user) return;

    try{

      setLoading(true);

      const email = user.email?.toLowerCase() || "";


      const profileSnap = await getDoc(
  doc(db,"users",user.uid)
);

const profile = profileSnap.exists()
  ? profileSnap.data()
  : {};
      /* CREATE PACT */

      const pactRef = await addDoc(collection(db,"pacts"),{
        creatorName: profile.fullName || "",
creatorDesignation: profile.designation || "",

  category,
  contractType: category,
  title,
  createdBy:user.uid,
  creatorEmail:email,
  counterpartyEmail:counterpartyEmail.toLowerCase().trim(),

  requireSignatures,

  status:"draft",

  agreementLocked:false,

  createdAt:serverTimestamp()

});

      const pactId = pactRef.id;

      /* CREATE PARTIES */

      await addDoc(collection(db,"parties"),{

        pactId,
        role:"partyA",
        userId:user.uid,
        email:email,
        signedAt:null,
        createdAt:serverTimestamp()

      });

      await addDoc(collection(db,"parties"),{

        pactId,
        role:"partyB",
        userId:null,
        email:counterpartyEmail.toLowerCase().trim(),
        signedAt:null,
        createdAt:serverTimestamp()

      });

      /* BUILD TEMPLATE FIELDS */

      let fields:any = {};

  if(category==="Loan"){
  fields = {
    loanAmount:Number(loanAmount),
    interestRate,
    repaymentDate
  };
}

if(category==="Freelance / Service"){
  fields = {
    serviceDescription,
    paymentAmount:Number(paymentAmount),
    deliveryDate
  };
}

if(category==="General Promise"){
  fields = {
    promiseText
  };
}

if(category==="Rent Agreement"){
  fields = {
    propertyAddress,
    monthlyRent:Number(monthlyRent),
    securityDeposit:Number(securityDeposit),
    startDate,
    durationMonths:Number(durationMonths)
  };
}

      /* CREATE TEMPLATE */

      await addDoc(collection(db,"templates"),{

        pactId,
        category,
        fields,
        createdAt:serverTimestamp()

      });

      await logAction(
  pactId,
  "PACT_CREATED",
  email
);

/*router.push(`/pact/${pactId}`);*/
router.push(`/agreement-builder/${pactId}`);
    }catch(error){

      console.error(error);
      alert("Failed to create pact");

    }finally{

      setLoading(false);

    }

  }

  return(

    <div className="min-h-screen bg-black text-white bg-[radial-gradient(circle_at_top,#0ea5e920,transparent_35%)]">

      <main className="mx-auto max-w-4xl px-6 py-12 transition-all duration-500 hover:-translate-y-[2px]">

<form
  onSubmit={handleCreate}
  className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(0,200,255,0.08)] hover:shadow-[0_0_120px_rgba(0,200,255,0.12)] transition-all duration-500">

        <div>

  <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
    Create Agreement
  </h1>

  <p className="mt-3 text-lg text-white/50">
    Create secure digital agreements in minutes.
  </p>

</div>

        <div className="space-y-3">

  <label className="text-sm font-medium text-white/60">
    Agreement Type
  </label>

  <Listbox value={category} onChange={setCategory}>

    <div className="relative">

      <Listbox.Button
        className="
          relative
          w-full
          cursor-pointer
          rounded-2xl
          border border-white/10
          bg-[#0A0A0A]
          px-5
          py-4
          text-left
          text-white
          transition-all
          duration-300
          hover:border-cyan-400/30
          focus:outline-none
          focus:border-cyan-400/60
        "
      >

        <span className="block truncate font-medium">
          {category}
        </span>

        <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-white/40">
          ▼
        </span>

      </Listbox.Button>

      <Listbox.Options
        className="
          absolute
          z-50
          mt-3
          max-h-60
          w-full
          overflow-auto
          rounded-2xl
          border border-white/10
          bg-[#0F0F0F]
          p-2
          shadow-2xl
          backdrop-blur-xl
          focus:outline-none
        "
      >

        {[
          "Loan",
          "Freelance / Service",
          "General Promise",
          "Rent Agreement",
        ].map((type) => (

          <Listbox.Option
            key={type}
            value={type}
            className={({ active }) =>
              `
                cursor-pointer
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-white/80"
                }
              `
            }
          >

            {type}

          </Listbox.Option>

        ))}

      </Listbox.Options>

    </div>

  </Listbox>

</div>

  <div className="pt-6">
  <h2 className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-cyan-400">
    <span className="h-px w-8 bg-cyan-400/60"></span>
    Agreement Info
  </h2>
</div>

<div className="grid gap-6 md:grid-cols-2">

  {/* AGREEMENT TITLE */}

  <div className="space-y-2 flex flex-col">

    <label className="text-sm font-medium text-white/70">
      Agreement Title
    </label>

    <input
      placeholder="Agreement title"
      className="h-[64px] w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)]"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      required
    />

  </div>

  {/* OTHER PARTY EMAIL */}

  <div className="space-y-2 flex flex-col">

    <label className="text-sm font-medium text-white/70">
      Other party email
    </label>

    <input
      type="email"
      placeholder="Other party email"
      className="h-[64px] w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)]"
      value={counterpartyEmail}
      onChange={(e)=>setCounterpartyEmail(e.target.value)}
      required
    />

  </div>





  
  

</div>

        {/*LOAN */}

{category==="Loan" &&(

  <div className="space-y-6">

    <div className="pt-2">
      <h2 className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-cyan-400">
        <span className="h-px w-8 bg-cyan-400/60"></span>
        Agreement Details
      </h2>
    </div>

    <div className="grid gap-6 md:grid-cols-2">

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Loan Amount
        </label>

        <input
          type="number"
          placeholder="Loan Amount"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={loanAmount}
          onChange={(e)=>setLoanAmount(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Interest Rate (%)
        </label>

        <input
          type="number"
          placeholder="Interest Rate (%)"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-white/70">
          Repayment Date
        </label>

        <input
          type="date"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={repaymentDate}
          onChange={(e)=>setRepaymentDate(e.target.value)}
        />
      </div>

    </div>

  </div>

)}

        {/* FREELANCE */}

{category==="Freelance / Service" &&(

  <div className="space-y-6">

    <div className="pt-2">
      <h2 className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-cyan-400">
        <span className="h-px w-8 bg-cyan-400/60"></span>
        Agreement Details
      </h2>
    </div>

    <div className="grid gap-6 md:grid-cols-2">

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-white/70">
          Service Description
        </label>

        <textarea
          placeholder="Describe the service agreement"
          className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={serviceDescription}
          onChange={(e)=>setServiceDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Payment Amount
        </label>

        <input
          type="number"
          placeholder="Payment Amount"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={paymentAmount}
          onChange={(e)=>setPaymentAmount(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Delivery Date
        </label>

        <input
          type="date"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={deliveryDate}
          onChange={(e)=>setDeliveryDate(e.target.value)}
        />
      </div>

    </div>

  </div>

)}

        {/* GENERAL PROMISE */}

{category==="General Promise" &&(

  <div className="space-y-6">

    <div className="pt-2">
      <h2 className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-cyan-400">
        <span className="h-px w-8 bg-cyan-400/60"></span>
        Agreement Details
      </h2>
    </div>

    <textarea
      placeholder="Write the promise details"
      className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
      value={promiseText}
      onChange={(e)=>setPromiseText(e.target.value)}
    />

  </div>

)}


        {/* RENT AGREEMENT */}

{category==="Rent Agreement" &&(

  <div className="space-y-6">

    <div className="pt-2">
      <h2 className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-cyan-400">
        <span className="h-px w-8 bg-cyan-400/60"></span>
        Agreement Details
      </h2>
    </div>

    <div className="grid gap-6 md:grid-cols-2">

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-white/70">
          Property Address
        </label>

        <textarea
          placeholder="Property Address"
          className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={propertyAddress}
          onChange={(e)=>setPropertyAddress(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Monthly Rent
        </label>

        <input
          type="number"
          placeholder="Monthly Rent"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={monthlyRent}
          onChange={(e)=>setMonthlyRent(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Security Deposit
        </label>

        <input
          type="number"
          placeholder="Security Deposit"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={securityDeposit}
          onChange={(e)=>setSecurityDeposit(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Start Date
        </label>

        <input
          type="date"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Duration (Months)
        </label>

        <input
          type="number"
          placeholder="Duration (Months)"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_25px_rgba(0,200,255,0.12)] focus:outline-none"
          value={durationMonths}
          onChange={(e)=>setDurationMonths(e.target.value)}
        />
      </div>

    </div>

  </div>

)}
      
        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(120,119,255,0.35)] active:scale-[0.99]"
        >
          <>
          <span className="relative z-10">
            <>
        {loading ? (
        <span className="relative z-10 flex items-center justify-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          Creating Agreement...
        </span>
        ) : (
        <span className="relative z-10">
          Create Agreement
        </span>
        )}

        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-full" />
        </>
          </span>

          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-full" />
          </>
        </button>

      </form>
        </main>
    </div>

  );

}