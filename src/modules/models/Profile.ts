import firebase, { getCurrentUser } from '../firebase';

export type Profile = {
  name: string;
  sex: 'man' | 'woman';
  icon: string;
  miniIcon: string;
  profile: string;
  simpleProf: string;
  author?: string;
  createdAt?: firebase.firestore.Timestamp;
};

export async function createProfile(profile: Profile) {
  const db = firebase.firestore();
  const docId = db.collection('timeline').doc().id;
  const currentUser = await getCurrentUser();
  if (currentUser === null) throw new Error();
  await db
    .collection('timeline')
    .doc(docId)
    .set({
      ...profile,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: currentUser.uid,
    });
  return profile;
}

type TimeLineSearchOption = {
  limit: number;
};
export async function getTimeLine(option: TimeLineSearchOption) {
  const db = firebase.firestore();
  const result = await db.collection('timeline').orderBy('createdAt').limit(option.limit).get();
  return result.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    return data as Profile;
  });
}
