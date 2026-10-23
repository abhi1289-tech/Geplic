"use client";

import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { logAction } from "@/lib/audit";

import {
  getPactById,
  updatePact,
} from "@/services/pactService";

import {
  getTemplateByPactId,
  updateTemplate,
} from "@/services/templateService";

export default function useAgreementBuilder(
  pactId: string
) {

  const currentUser = auth.currentUser;

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [downloading, setDownloading] =
    useState(false);

  const [pact, setPact] =
    useState<any>(null);

  const [templateFields, setTemplateFields] =
    useState<any>({});

  const [additionalTerms, setAdditionalTerms] =
    useState<string[]>([]);

  useEffect(() => {

    if (!pactId) return;

    fetchAgreement();

  }, [pactId]);

  async function fetchAgreement() {

    try {

      const pactData =
        await getPactById(pactId);

      setPact(pactData);

      const template =
        await getTemplateByPactId(
          pactId
        );

      if (template) {

        setTemplateFields(
          template.fields || {}
        );

        setAdditionalTerms(
          template.fields
            ?.additionalTerms || []
        );

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  const isPartyA =
    currentUser?.email?.toLowerCase() ===
    pact?.creatorEmail?.toLowerCase();

  const canEdit =
    isPartyA &&
    pact?.status === "draft";
      async function saveContinue() {

    if (!pactId) return;

    const template =
      await getTemplateByPactId(
        pactId
      );

    if (!template) {

      alert("Template not found");

      return;

    }

    await updateTemplate(
      template.id,
      {
        "fields.additionalTerms":
          additionalTerms,
      }
    );

    return true;

  }

  async function sendAgreement() {

    if (
      !pactId ||
      !pact ||
      sending
    ) {
      return false;
    }

    try {

      setSending(true);

      await updatePact(
        pactId,
        {
          status: "pending",
          lockedAt: new Date(),
        }
      );

      await logAction(
        pactId,
        "OFFER_SENT",
        pact.creatorEmail
      );

      setPact((prev: any) => ({
        ...prev,
        status: "pending",
      }));

      return true;

    } finally {

      setSending(false);

    }

  }

  async function voidAgreement() {

    if (!pactId || !pact) {
      return false;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to void this agreement?"
      );

    if (!confirmed) {
      return false;
    }

    await updatePact(
      pactId,
      {
        status: "voided",
        voidedAt: new Date(),
      }
    );

    await logAction(
      pactId,
      "AGREEMENT_VOIDED",
      pact.creatorEmail
    );

    setPact((prev: any) => ({
      ...prev,
      status: "voided",
    }));

    return true;

  }

  async function downloadPDF() {
    if (!pactId || downloading) return;

    setDownloading(true);

    try {
      // Keep the user on the agreement page while the PDF is generated. This
      // preserves the existing Dashboard navigation and avoids a blank new tab.
      const response = await fetch(`/api/pdf/${encodeURIComponent(pactId)}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        let message = "Unable to generate the PDF. Please try again.";
        try {
          const body = await response.json();
          if (typeof body?.error === "string" && body.error.trim()) {
            message = body.error;
          }
        } catch {
          // Keep the friendly fallback when the server did not return JSON.
        }
        throw new Error(message);
      }

      const pdfBlob = await response.blob();
      if (!pdfBlob.size) {
        throw new Error("The generated PDF was empty. Please try again.");
      }

      const objectUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `agreement-${pactId}.pdf`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch (error) {
      console.error("Agreement PDF download failed:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to download the PDF. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  }

  return {

    loading,

    pact,

    isPartyA,

    canEdit,

    sending,

    downloading,

    templateFields,

    additionalTerms,

    setAdditionalTerms,

    saveContinue,

    sendAgreement,

    voidAgreement,

    downloadPDF,

  };

}