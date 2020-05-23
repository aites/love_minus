import { db } from '../firebase';

export type ContactInfo = {
  name: string;
  mail: string;
  message: string;
};

export async function submitContact(contactInfo: ContactInfo) {
  const docId = db.collection('contactInfo').doc().id;
  await db
    .collection('contactInfo')
    .doc(docId)
    .set({
      ...contactInfo,
    });
  return contactInfo;
}
