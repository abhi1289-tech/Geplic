import { db } from "@/lib/firebase";

import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  DocumentData,
} from "firebase/firestore";

/* -------------------------------------------------------------------------- */
/* Pact */
/* -------------------------------------------------------------------------- */

export async function getPactById(
  pactId: string
): Promise<any> {
  const snap = await getDoc(
    doc(db, "pacts", pactId)
  );

  if (!snap.exists()) {
    throw new Error("Pact not found");
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}

export async function updatePact(
  pactId: string,
  data: Partial<DocumentData>
) {
  await updateDoc(
    doc(db, "pacts", pactId),
    data
  );
}

/* -------------------------------------------------------------------------- */
/* Create Pact */
/* -------------------------------------------------------------------------- */

export async function createPact(
  data: Partial<DocumentData>
) {
  return await addDoc(
    collection(db, "pacts"),
    {
      ...data,
      createdAt:
        data.createdAt ??
        serverTimestamp(),
    }
  );
}


/* -------------------------------------------------------------------------- */
/* Verify Pact */
/* -------------------------------------------------------------------------- */

export async function verifyPact(
  value: string
) {
  const searchValue = value.trim();

  const hashSnap = await getDocs(
    query(
      collection(db, "pacts"),
      where(
        "documentHash",
        "==",
        searchValue
      )
    )
  );

  if (!hashSnap.empty) {
    return {
      id: hashSnap.docs[0].id,
      ...hashSnap.docs[0].data(),
    };
  }

  const pactSnap = await getDoc(
    doc(db, "pacts", searchValue)
  );

  if (!pactSnap.exists()) {
    return null;
  }

  return {
    id: pactSnap.id,
    ...pactSnap.data(),
  };
}

/* -------------------------------------------------------------------------- */
/* Create Party */
/* -------------------------------------------------------------------------- */

export async function createParty(
  data: Partial<DocumentData>
) {
  return await addDoc(
    collection(db, "parties"),
    {
      ...data,
      createdAt:
        data.createdAt ??
        serverTimestamp(),
    }
  );
}


/* -------------------------------------------------------------------------- */
/* Party */
/* -------------------------------------------------------------------------- */

export async function getPartyByEmail(
  pactId: string,
  email: string
) {
  const snap = await getDocs(
    query(
      collection(db, "parties"),
      where("pactId", "==", pactId),
      where("email", "==", email)
    )
  );

  if (snap.empty) {
    return null;
  }

  return snap.docs[0];
}

export async function linkPartyToUser(
  pactId: string,
  email: string,
  uid: string
) {
  const party =
    await getPartyByEmail(
      pactId,
      email
    );

  if (!party) return;

  if (!party.data().userId) {
    await updateDoc(
      party.ref,
      {
        userId: uid,
      }
    );
  }
}