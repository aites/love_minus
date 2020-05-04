import firebase from '../firebase';

export type Profile = {
  name: string;
  sex: number;
  icon: string;
  miniIcon: string;
  profile: string;
  simpleProf: string;
  author?: string;
  createdAt?: firebase.firestore.FieldValue;
};

export async function createProfile(profile: Profile) {
  profile.author = firebase.auth().currentUser?.uid || '';
  profile.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  const db = firebase.firestore();
  const docId = db.collection('timeline').doc().id;
  await db.collection('timeline').doc(docId).set(profile);
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
