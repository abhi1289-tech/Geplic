"use client";

import { logAction } from "@/lib/audit";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import { serverTimestamp } from "firebase/firestore";
import {
  createPact,
  createParty,
} from "@/services/pactService";

import { createTemplate } from "@/services/templateService";

import { getUserProfile } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AgreementCategorySelector from "@/components/create-pact/AgreementCategorySelector";
import AgreementInfoForm from "@/components/create-pact/AgreementInfoForm";
import LoanAgreementForm from "@/components/create-pact/LoanAgreementForm";
import FreelanceAgreementForm from "@/components/create-pact/FreelanceAgreementForm";
import GeneralPromiseForm from "@/components/create-pact/GeneralPromiseForm";
import RentAgreementForm from "@/components/create-pact/RentAgreementForm";
import CreateAgreementButton from "@/components/create-pact/CreateAgreementButton";
import CreatePactLayout from "@/components/create-pact/CreatePactLayout";


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

  const selfInvite =
  user?.email?.toLowerCase() ===
  counterpartyEmail.trim().toLowerCase();

  async function handleCreate(e:React.FormEvent){

    e.preventDefault();
    if (repaymentDate) {

  const dateRegex =
    /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(repaymentDate)) {

    alert("Invalid repayment date");

    setLoading(false);

    return;
  }

}
if (startDate) {

  const dateRegex =
    /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(startDate)) {

    alert("Invalid start date");

    setLoading(false);

    return;
  }

}
if (deliveryDate) {

  const dateRegex =
    /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(deliveryDate)) {

    alert("Invalid delivery date");

    setLoading(false);

    return;
  }

}
/* REQUIRED FIELD VALIDATION */

if (!title.trim()) {
  alert("Agreement title is required");
  return;
}

if (!counterpartyEmail.trim()) {
  alert("Other party email is required");
  return;
}

if (category === "Loan") {

  if (!loanAmount) {
    alert("Loan amount is required");
    return;
  }

  if (!interestRate) {
    alert("Interest rate is required");
    return;
  }

  if (!repaymentDate) {
    alert("Repayment date is required");
    return;
  }

}

if (category === "Freelance / Service") {

  if (!serviceDescription.trim()) {
    alert("Service description is required");
    return;
  }

  if (!paymentAmount) {
    alert("Payment amount is required");
    return;
  }

  if (!deliveryDate) {
    alert("Delivery date is required");
    return;
  }

}

if (category === "General Promise") {

  if (!promiseText.trim()) {
    alert("Promise details are required");
    return;
  }

}

if (category === "Rent Agreement") {

  if (!propertyAddress.trim()) {
    alert("Property address is required");
    return;
  }

  if (!monthlyRent) {
    alert("Monthly rent is required");
    return;
  }

  if (!securityDeposit) {
    alert("Security deposit is required");
    return;
  }

  if (!startDate) {
    alert("Start date is required");
    return;
  }

  if (!durationMonths) {
    alert("Duration is required");
    return;
  }

}
    if(!user) return;

    try{

      setLoading(true);

      const email = user.email?.toLowerCase() || "";
      const counterparty =
  counterpartyEmail
    .toLowerCase()
    .trim();

if (email === counterparty) {

  alert(
    "You cannot create an agreement with yourself."
  );

  setLoading(false);

  return;

}
      if (category === "Loan" && repaymentDate) {

  const selectedDate = new Date(repaymentDate);

  const today = new Date();
  today.setHours(0,0,0,0);

  if (selectedDate < today) {

    alert("Repayment date cannot be in the past");

    setLoading(false);

    return;
  }
}


    const profile = await getUserProfile(user.uid);

      /* CREATE PACT */

      const pactRef = await createPact({
        creatorName: profile?.fullName || "",
creatorDesignation: profile?.designation || "",

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

      await createParty({

        pactId,
        role:"partyA",
        userId:user.uid,
        email:email,
        signedAt:null,
        createdAt:serverTimestamp()

      });

      await createParty({

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
    repaymentDate,

    additionalTerms:[]
  };

}
if(category==="Freelance / Service"){

  fields = {
    serviceDescription,
    paymentAmount:Number(paymentAmount),
    deliveryDate,

    additionalTerms:[]
  };

}

if(category==="General Promise"){
  fields = {
    promiseText,

    additionalTerms:[]
  };
}

if(category==="Rent Agreement"){

  fields = {
    propertyAddress,
    monthlyRent:Number(monthlyRent),
    securityDeposit:Number(securityDeposit),
    startDate,
    durationMonths:Number(durationMonths),

    additionalTerms:[]
  };

}

      /* CREATE TEMPLATE */

      await createTemplate({

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

    <div className="create-pact-page">
      <AppHeader
  rightContent={
    <button
      onClick={() => {

        const confirmed = window.confirm(
          "Leave this page? Any information entered will be lost."
        );

        if (confirmed) {
          router.push("/dashboard");
        }

      }}
      className="btn btn-secondary btn-sm"
    >
      Dashboard
    </button>
  }
/>
  <CreatePactLayout
  onSubmit={handleCreate}
>

  <AgreementCategorySelector
    category={category}
    setCategory={setCategory}
  />

  <AgreementInfoForm
    title={title}
    setTitle={setTitle}
    counterpartyEmail={counterpartyEmail}
    setCounterpartyEmail={setCounterpartyEmail}
    selfInvite={selfInvite}
  />

  {category === "Loan" && (
    <LoanAgreementForm
      loanAmount={loanAmount}
      setLoanAmount={setLoanAmount}
      interestRate={interestRate}
      setInterestRate={setInterestRate}
      repaymentDate={repaymentDate}
      setRepaymentDate={setRepaymentDate}
    />
  )}

  {category === "Freelance / Service" && (
    <FreelanceAgreementForm
      serviceDescription={serviceDescription}
      setServiceDescription={setServiceDescription}
      paymentAmount={paymentAmount}
      setPaymentAmount={setPaymentAmount}
      deliveryDate={deliveryDate}
      setDeliveryDate={setDeliveryDate}
    />
  )}

  {category === "General Promise" && (
    <GeneralPromiseForm
      promiseText={promiseText}
      setPromiseText={setPromiseText}
    />
  )}

  {category === "Rent Agreement" && (
    <RentAgreementForm
      propertyAddress={propertyAddress}
      setPropertyAddress={setPropertyAddress}
      monthlyRent={monthlyRent}
      setMonthlyRent={setMonthlyRent}
      securityDeposit={securityDeposit}
      setSecurityDeposit={setSecurityDeposit}
      startDate={startDate}
      setStartDate={setStartDate}
      durationMonths={durationMonths}
      setDurationMonths={setDurationMonths}
    />
  )}

  <CreateAgreementButton
    loading={loading}
    disabled={loading || selfInvite}
  />

</CreatePactLayout>
    </div>

  );

}