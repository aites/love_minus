import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1PDuNnQlxlRdWB8aH0_fMUh07ek-BOhA',
  authDomain: 'loveminus-61d4d.firebaseapp.com',
  databaseURL: 'https://loveminus-61d4d.firebaseio.com',
  projectId: 'loveminus-61d4d',
  storageBucket: 'loveminus-61d4d.appspot.com',
  messagingSenderId: '223924320236',
  appId: '1:223924320236:web:b871a51f8bfa86b2c772c9',
  measurementId: 'G-DXGHQV5NX9',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const db = firebase.firestore();
export const timestampToString = (timestamp?: firebase.firestore.Timestamp) => {
  if (!timestamp) return '';
  const diff = firebase.firestore.Timestamp.now().seconds - timestamp.seconds;
  if (diff <= 60) return '1分以内';
  if (diff <= 5 * 60) return '5分以内';
  if (diff <= 60 * 60) return '1時間以内';
  if (diff <= 6 * 60 * 60) return '6時間以内';
  if (diff <= 12 * 60 * 60) return '12時間以内';
  if (diff <= 24 * 60 * 60) return '24時間以内';
  return '24時間以上前';
};

let currentUser: firebase.User | null;
export const resetCurrentUser = () => {
  currentUser = null;
};
export const getCurrentUser = async () => {
  if (currentUser) return currentUser;
  console.log('getCurrentUser');
  currentUser = await new Promise<firebase.User | null>((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('getCurrentUser', user);
      resolve(user);
    });
  });
  return currentUser;
};
