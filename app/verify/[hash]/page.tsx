"use client";

import { useParams } from "next/navigation";
import VerifyPage from "../page";

export default function VerifyByHashPage() {
  const params = useParams<{ hash: string }>();
  const hash = Array.isArray(params.hash) ? params.hash[0] : params.hash;

  return <VerifyPage initialHash={decodeURIComponent(hash ?? "")} />;
}
