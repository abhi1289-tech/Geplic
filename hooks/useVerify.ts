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

  async function verifyDocument(value?: string): Promise<boolean> {

    const searchValue = (value ?? hash).trim();
    if (!searchValue) return false;

    try {

      setLoading(true);

      setResult(null);

      setNotFound(false);

      const pact =
        await verifyPact(searchValue);

      if (pact) {

        setResult(pact);
        return true;

      } else {

        setNotFound(true);
        return false;

      }

    } catch (error) {

      console.error(
        "Verification Error:",
        error
      );
      setNotFound(true);
      return false;

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