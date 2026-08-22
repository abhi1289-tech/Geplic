"use client";

import { useParams, useRouter } from "next/navigation";

import AppHeader from "@/components/AppHeader";
import AgreementTimeline from "@/components/AgreementTimeline";

import PactHeader from "@/components/pact/PactHeader";
import PactActions from "@/components/pact/PactActions";
import AgreementSummary from "@/components/pact/AgreementSummary";
import AgreementAcceptance from "@/components/pact/AgreementAcceptance";
import AgreementCompleted from "@/components/pact/AgreementCompleted";
import AgreementRejected from "@/components/pact/AgreementRejected";
import AgreementVoided from "@/components/pact/AgreementVoided";
import RejectAgreementModal from "@/components/pact/RejectAgreementModal";
import PactLayout from "@/components/pact/PactLayout";

import usePactState from "@/hooks/usePactState";

export default function PactPage() {
  const router = useRouter();

  const params = useParams();

  const pactId = params?.pactId as string;

  const {
    loading,

    pact,
    template,
    role,

    acceptName,
    setAcceptName,

    acceptDesignation,
    setAcceptDesignation,

    acceptConsent,
    setAcceptConsent,

    showRejectModal,
    setShowRejectModal,

    rejectReason,
    setRejectReason,

    otherReason,
    setOtherReason,

    sendOffer,
    acceptOffer,
    rejectOffer,
    voidAgreement,
  } = usePactState(pactId);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading pact...
      </div>
    );
  }

  const fields = template?.fields || {};

  const category = template?.category;

  return (
    <div className="pact-page">

      <AppHeader
        rightContent={
          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="btn btn-secondary btn-sm"
          >
            Dashboard
          </button>
        }
      />

      <PactLayout> 

        <PactHeader
          status={pact.status}
        />

        <AgreementSummary
          category={category}
          fields={fields}
        />

        <PactActions
          pact={pact}
          role={role}
          pactId={pactId}
          onSendOffer={sendOffer}
          onVoidAgreement={voidAgreement}
          onReject={() =>
            setShowRejectModal(true)
          }
          onViewDocument={() =>
            router.push(
              `/agreement-builder/${pactId}`
            )
          }
        />
                {pact.status === "pending" &&
          role === "partyB" && (
            <AgreementAcceptance
              acceptName={acceptName}
              setAcceptName={setAcceptName}
              acceptDesignation={
                acceptDesignation
              }
              setAcceptDesignation={
                setAcceptDesignation
              }
              acceptConsent={
                acceptConsent
              }
              setAcceptConsent={
                setAcceptConsent
              }
              onAccept={
                acceptOffer
              }
            />
        )}

        {pact.status ===
          "completed" && (
          <AgreementCompleted
            pact={pact}
          />
        )}

        {pact.status ===
          "rejected" && (
          <AgreementRejected
            pact={pact}
          />
        )}

        {pact.status ===
          "voided" && (
          <AgreementVoided />
        )}

        <RejectAgreementModal
          open={showRejectModal}
          rejectReason={
            rejectReason
          }
          setRejectReason={
            setRejectReason
          }
          otherReason={
            otherReason
          }
          setOtherReason={
            setOtherReason
          }
          onReject={
            rejectOffer
          }
          onClose={() =>
            setShowRejectModal(
              false
            )
          }
        />        
        <AgreementTimeline
          pactId={pactId}
        />

      </PactLayout>

    </div>

  );
}