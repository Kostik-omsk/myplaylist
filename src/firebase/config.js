import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCuE13nuB1TN5gkdHSlHKj5xBXCk2LrLNQ',
  authDomain: 'music-45c44.firebaseapp.com',
  projectId: 'music-45c44',
  storageBucket: 'music-45c44.appspot.com',
  messagingSenderId: '713854110768',
  appId: '1:713854110768:web:14df4344bc6bcd0425b1f5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const timestamp = serverTimestamp();
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage, timestamp };
