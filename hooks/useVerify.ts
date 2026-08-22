"use client";

import { useState } from "react";
import { verifyPact } from "@/services/pactService";

export default function useVerify() {

  const [hash, setHash] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [notFound, setNotFound] =
    useState(false);

  async function verifyDocument() {

    if (!hash.trim()) return;

    try {

      setLoading(true);

      setResult(null);

      setNotFound(false);

      const pact =
        await verifyPact(hash);

      if (pact) {

        setResult(pact);

      } else {

        setNotFound(true);

      }

    } catch (error) {

      console.error(
        "Verification Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  return {

    hash,
    setHash,

    loading,

    result,

    notFound,

    verifyDocument,

  };

}