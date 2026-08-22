import { db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export type Template = {
  id: string;

  pactId: string;

  category: string;

  fields: Record<string, any>;

  [key: string]: any;
};

/* -------------------------------- */
/* Get Template */
/* -------------------------------- */

export async function getTemplateByPactId(
  pactId: string
): Promise<Template | null> {

  const snap = await getDocs(
    query(
      collection(db, "templates"),
      where("pactId", "==", pactId)
    )
  );

  if (snap.empty) {
    return null;
  }

  return ({
    id: snap.docs[0].id,
    ...(snap.docs[0].data()as Omit<Template, "id">),
  }) as Template;

}

/* -------------------------------- */
/* Create Template */
/* -------------------------------- */

export async function createTemplate(
  data: Partial<DocumentData>
) {

  return await addDoc(
    collection(db, "templates"),
    data
  );

}

/* -------------------------------- */
/* Update Template */
/* -------------------------------- */

export async function updateTemplate(
  templateId: string,
  data: Partial<DocumentData>
) {

  await updateDoc(
    doc(db, "templates", templateId),
    data
  );

}

/* -------------------------------- */
/* Delete Template */
/* -------------------------------- */

export async function deleteTemplate(
  templateId: string
) {

  await deleteDoc(
    doc(db, "templates", templateId)
  );

}