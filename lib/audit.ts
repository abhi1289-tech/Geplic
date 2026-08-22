import { serverTimestamp } from "firebase/firestore";
import { createAuditLog } from "@/services/auditService";

export async function logAction(
  pactId: string,
  action: string,
  userEmail: string
) {

  try {

    await createAuditLog({

      pactId,
      action,
      userEmail,
      createdAt: serverTimestamp()

    });

  } catch (err) {

    console.error("Audit log failed", err);

  }

}