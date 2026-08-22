"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { logAction } from "@/lib/audit";
import { generateHash } from "@/lib/hash";

import {
  getPactById,
  linkPartyToUser,
  updatePact,
} from "@/services/pactService";
import{ getTemplateByPactId } from "@/services/templateService";
import{ getUserProfile } from "@/services/userService";

export default function usePactState(
  pactId: string
) {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [pact, setPact] =
    useState<any>(null);

  const [template, setTemplate] =
    useState<any>(null);

  const [role, setRole] =
    useState<"partyA" | "partyB" | null>(
      null
    );

  const [acceptName, setAcceptName] =
    useState("");

  const [
    acceptDesignation,
    setAcceptDesignation,
  ] = useState("");

  const [
    acceptConsent,
    setAcceptConsent,
  ] = useState(false);

  const [
    showRejectModal,
    setShowRejectModal,
  ] = useState(false);

  const [
    rejectReason,
    setRejectReason,
  ] = useState("");

  const [
    otherReason,
    setOtherReason,
  ] = useState("");

  
  useEffect(() => {
    if (!user || !pactId) return;

    loadData();
  }, [user, pactId]);
  

  async function loadData() {
    if (!user) return;

    try {
      setLoading(true);

      const uid = user.uid;
      const email =
        user.email?.toLowerCase();

      const pactData =
        await getPactById(pactId);

      if (
        pactData.createdBy !== uid &&
        pactData.counterpartyEmail !==
          email
      ) {
        router.push("/dashboard");
        return;
      }

      setPact(pactData);

      const profile =
        await getUserProfile(uid);

      if (profile) {
        setAcceptName(
          profile.fullName || ""
        );

        setAcceptDesignation(
          profile.designation || ""
        );
      }

      const templateData =
        await getTemplateByPactId(
          pactId
        );

      setTemplate(templateData);

      await linkPartyToUser(
        pactId,
        email!,
        uid
      );

      if (
        pactData.creatorEmail === email
      ) {
        setRole("partyA");
      } else if (
        pactData.counterpartyEmail ===
        email
      ) {
        setRole("partyB");
      }
    } catch (error) {
      console.error(error);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function sendOffer() {
    if (!user || !pact) return;

    await updatePact(
      pactId,
      {
        status: "pending",
        pendingAt: new Date(),
        agreementLocked: true,
      }
    );

    await logAction(
      pactId,
      "OFFER_SENT",
      user.email || ""
    );

    setPact({
      ...pact,
      status: "pending",
      agreementLocked: true,
    });

    await fetch(
      "/api/send-offer-email",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email:
            pact.counterpartyEmail,
          pactId,
          sender: user.email,
        }),
      }
    );

    router.push(`/pact/${pactId}`);
  }
    async function acceptOffer() {
    if (!user || !pact) return;

    if (pact.status === "voided") {
      alert("This agreement has been voided.");
      return;
    }

    if (!acceptName.trim()) {
      alert("Full Name is required.");
      return;
    }

    const agreementData = {
      creatorEmail: pact.creatorEmail,
      counterpartyEmail: pact.counterpartyEmail,
      category: template?.category,
      fields: template?.fields,
      acceptedByName: acceptName,
      acceptedByDesignation: acceptDesignation,
      acceptedVia: "click_acceptance",
    };

    const hash = await generateHash(
      agreementData
    );

    await updatePact(
      pactId,
      {
        status: "completed",

        acceptedAt: new Date(),
        completedAt: new Date(),

        counterpartyName:
          acceptName,
        counterpartyDesignation:
          acceptDesignation,

        acceptedByName:
          acceptName,
        acceptedByDesignation:
          acceptDesignation,

        acceptedVia:
          "click_acceptance",

        documentHash: hash,

        agreementLocked: true,
      }
    );

    await logAction(
      pactId,
      "AGREEMENT_COMPLETED",
      user.email || ""
    );

    setPact({
      ...pact,

      status: "completed",

      documentHash: hash,

      acceptedByName:
        acceptName,

      acceptedByDesignation:
        acceptDesignation,

      acceptedAt: {
        seconds: Math.floor(
          Date.now() / 1000
        ),
      },
    });
  }

  async function rejectOffer() {
    if (!user || !pact) return;

    const finalReason =
      rejectReason === "Other"
        ? otherReason
        : rejectReason;

    if (!finalReason) {
      alert(
        "Please select a reason."
      );
      return;
    }

    await updatePact(
      pactId,
      {
        status: "rejected",

        rejectedAt: new Date(),

        rejectionReason:
          finalReason,

        rejectedBy:
          user.email || "",

        agreementLocked: true,
      }
    );

    await logAction(
      pactId,
      "OFFER_REJECTED",
      user.email || ""
    );

    setPact({
      ...pact,

      status: "rejected",

      rejectionReason:
        finalReason,
    });

    setShowRejectModal(false);
  }

  async function voidAgreement() {
    if (!user || !pact) return;

    if (
      pact.status !== "draft" &&
      pact.status !== "pending"
    ) {
      alert(
        "Only draft or pending agreements can be voided."
      );
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to void this agreement?"
      );

    if (!confirmed) return;

    await updatePact(
      pactId,
      {
        status: "voided",

        voidedAt: new Date(),

        agreementLocked: true,
      }
    );

    await logAction(
      pactId,
      "AGREEMENT_VOIDED",
      user.email || ""
    );

    setPact({
      ...pact,

      status: "voided",

      agreementLocked: true,
    });
  }

  return {
    loading,

    pact,
    setPact,

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
  };

}