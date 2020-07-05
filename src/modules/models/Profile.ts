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
  filter?: {
    userId?: string;
    sex?: 'man' | 'woman' | '';
  };
};
export async function getTimeLine(option: TimeLineSearchOption) {
  const db = firebase.firestore();
  console.log(option);
  let collectionRef:
    | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    | firebase.firestore.Query<firebase.firestore.DocumentData> = db.collection('timeline');
  if (option.filter?.userId) {
    collectionRef = collectionRef.where('author', '==', option.filter.userId);
  }
  if (option.filter?.sex) {
    collectionRef = collectionRef.where('sex', '==', option.filter.sex);
  }
  const result = await collectionRef.orderBy('createdAt').limit(option.limit).get();
  return result.docs.map((doc) => {
    const data = doc.data();
    return data as Profile;
  });
}
