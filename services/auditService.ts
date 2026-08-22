import { db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  DocumentData,
} from "firebase/firestore";

export type AuditLog = {
  id: string;
  pactId: string;
  action: string;
  userEmail: string;
  createdAt: any;

  [key: string]: any;
};

/* -------------------------------- */
/* Get Audit Logs */
/* -------------------------------- */

export async function getAuditLogs(
  pactId: string
): Promise<AuditLog[]> {

  const snap = await getDocs(
    query(
      collection(db, "audit_logs"),
      where("pactId", "==", pactId),
      orderBy("createdAt", "asc")
    )
  );

  return snap.docs.map(
    doc =>
      ({
        id: doc.id,
        ...(doc.data() as Omit<AuditLog, "id">),
      }) as AuditLog
  );

}

/* -------------------------------- */
/* Create Audit Log */
/* -------------------------------- */

export async function createAuditLog(
  data: Partial<DocumentData>
) {

  return await addDoc(
    collection(db, "audit_logs"),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );

}