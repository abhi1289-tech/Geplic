import { useState } from "react";
import { Pact, PactStatus } from "@/models/pact";
import { Party } from "@/models/party";
import { TemplateData } from "@/models/templateData";

export function usePactState(
  initialPact: Pact,
  initialParties: Party[],
  initialTemplate: TemplateData
) {
  const [pactStatus, setPactStatus] = useState<PactStatus>(
    initialPact.status
  );
  const [parties, setParties] = useState<Party[]>(initialParties);
  const [templateData, setTemplateData] =
    useState<TemplateData>(initialTemplate);

  const isLocked =
    pactStatus === "locked" || pactStatus === "signed";

  function updateField<K extends keyof TemplateData>(
    key: K,
    value: TemplateData[K]
  ) {
    if (isLocked) return;

    setTemplateData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function sign(role: "partyA" | "partyB") {
    let updated: Party[] = [];

    setParties((prev) => {
      updated = prev.map((p) =>
        p.role === role && !p.signedAt
          ? { ...p, signedAt: new Date() }
          : p
      );
      return updated;
    });

    if (pactStatus === "draft") {
      setPactStatus("locked");
    }

    const a = updated.find((p) => p.role === "partyA");
    const b = updated.find((p) => p.role === "partyB");

    if (a?.signedAt && b?.signedAt) {
      setPactStatus("signed");
    }
  }

  return {
    pactStatus,
    isLocked,
    parties,
    templateData,
    updateField,
    sign,
  };
}
