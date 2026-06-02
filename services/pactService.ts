import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getPactById(pactId: string) {
  const ref = doc(db, "pacts", pactId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Pact not found");
  }

  return snap.data();
}
