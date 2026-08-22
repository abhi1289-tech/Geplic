import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";

export type UserProfile = {
  uid: string;
  fullName?: string;
  designation?: string;
  email?: string;

  [key: string]: any;
};

/* -------------------------------- */
/* Get User */
/* -------------------------------- */

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {

  const snap = await getDoc(
    doc(db, "users", uid)
  );

  if (!snap.exists()) {
    return null;
  }

  return {
    uid: snap.id,
    ...(snap.data() as Omit<UserProfile, "uid">),
  };

}

/* -------------------------------- */
/* Create User */
/* -------------------------------- */

export async function createUserProfile(
  uid: string,
  data: Partial<DocumentData>
) {
  await setDoc(
    doc(db, "users", uid),
    data
  );
}

/* -------------------------------- */
/* Update User */
/* -------------------------------- */

export async function updateUserProfile(
  uid: string,
  data: Partial<DocumentData>
) {
  await updateDoc(
    doc(db, "users", uid),
    data
  );
}