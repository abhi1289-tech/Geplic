"use client";

import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import VerificationResult from "@/components/verify/VerificationResult";
import useVerify from "@/hooks/useVerify";
import VerificationNotFound from "@/components/verify/VerificationNotFound";
import VerifyForm from "@/components/verify/VerifyForm";
import VerifyLayout from "@/components/verify/VerifyLayout";

export default function VerifyPage() {

  const router = useRouter();

  const {
    hash,
    setHash,
    loading,
    result,
    notFound,
    verifyDocument,
  } = useVerify();

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
        onVerify={verifyDocument}
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