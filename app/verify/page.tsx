"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import VerificationResult from "@/components/verify/VerificationResult";
import useVerify from "@/hooks/useVerify";
import VerificationNotFound from "@/components/verify/VerificationNotFound";
import VerifyForm from "@/components/verify/VerifyForm";
import VerifyLayout from "@/components/verify/VerifyLayout";

type VerifyPageProps = {
  initialHash?: string;
};

export default function VerifyPage({ initialHash = "" }: VerifyPageProps) {

  const router = useRouter();

  const {
    hash,
    setHash,
    loading,
    result,
    notFound,
    verifyDocument,
  } = useVerify();

  useEffect(() => {
    if (!initialHash) return;
    setHash(initialHash);
    void verifyDocument(initialHash);
    // A URL hash is verified once when this route is opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialHash]);

  async function handleVerify() {
    const value = hash.trim();
    if (!value) return;

    const verified = await verifyDocument(value);
    if (verified) {
      router.replace(`/verify/${encodeURIComponent(value)}`);
    }
  }

  return (
    <div className="verify-page">

      <AppHeader
        rightContent={
          <button
            onClick={() => router.push("/dashboard")}
            className="btn btn-secondary btn-sm"
          >
            Dashboard
          </button>
        }
      />
<VerifyLayout>

    <VerifyForm
        hash={hash}
        setHash={setHash}
        loading={loading}
        onVerify={handleVerify}
    />

    {result && (
        <VerificationResult
            result={result}
        />
    )}

    {notFound && (
        <VerificationNotFound />
    )}

</VerifyLayout>


    </div>
  );
}