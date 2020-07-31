import firebase, { getCurrentUser, db } from '../firebase';

export type Profile = {
  profileId?: string;
  name: string;
  sex: 'man' | 'woman';
  icon: string;
  miniIcon: string;
  profile: string;
  simpleProf: string;
  author?: string;
  createdAt?: firebase.firestore.Timestamp;
};

type TimelineLog = {
  joinUsers: string[];
};

export async function createProfile(profile: Profile) {
  const docId = db.collection('timeline').doc().id;
  const currentUser = await getCurrentUser();
  if (currentUser === null) throw new Error();

  await db
    .collection('timeline')
    .doc(docId)
    .set({
      ...profile,
      joinUsers: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: currentUser.uid,
    });
  await db
    .collection('timelinelog')
    .doc(docId)
    .set({
      joinUsers: [],
    } as TimelineLog);
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
    return { profileId: doc.id, ...data } as Profile;
  });
}

export async function getProfile(profileId: string) {
  const timelineDoc = await db.collection('timeline').doc(profileId).get();
  if (!timelineDoc.exists) return null;
  const data = timelineDoc.data();
  return { profileId: timelineDoc.id, ...data } as Profile;
}
