import firebase from 'firebase/app';
import 'firebase/auth';

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
