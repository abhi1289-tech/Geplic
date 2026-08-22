import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

export type Pact = {
  id: string;
  status: string;
  createdAt?: {
    seconds: number;
  };

  [key: string]: any;
};

function toPact(
  doc: QueryDocumentSnapshot<DocumentData>
): Pact {
  const data = doc.data();

  return {
    id: doc.id,
    status: data.status ?? "draft",
    ...data,
  };
}

export async function getDashboardPacts(
  uid: string,
  email: string
): Promise<Pact[]> {
  const createdQuery = query(
    collection(db, "pacts"),
    where("createdBy", "==", uid)
  );

  const receivedQuery = query(
    collection(db, "pacts"),
    where("counterpartyEmail", "==", email)
  );

  const [
    createdSnap,
    receivedSnap,
  ] = await Promise.all([
    getDocs(createdQuery),
    getDocs(receivedQuery),
  ]);

  const created = createdSnap.docs.map(toPact);

  const received = receivedSnap.docs.map(toPact);

  const merged = [
    ...created,
    ...received.filter(
      (item) =>
        !created.some(
          (p) => p.id === item.id
        )
    ),
  ];

  merged.sort((a, b) => {
    const first =
      a.createdAt?.seconds ?? 0;

    const second =
      b.createdAt?.seconds ?? 0;

    return second - first;
  });

  return merged;
}