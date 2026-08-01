import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  const snapshot = await adminDb.collection("pacts").limit(1).get();

  return NextResponse.json({
    count: snapshot.size,
  });
}