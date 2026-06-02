import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function logAction(
  pactId: string,
  action: string,
  userEmail: string
) {

  try {

    await addDoc(collection(db,"audit_logs"),{

      pactId,
      action,
      userEmail,
      createdAt: serverTimestamp()

    });

  } catch (err) {

    console.error("Audit log failed", err);

  }

}