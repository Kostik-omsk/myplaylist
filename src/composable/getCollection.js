import { ref, watchEffect } from 'vue';
import { db } from '../firebase/config';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const getCollection = (myCollection, swings) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = collection(db, myCollection);
  let q = query(collectionRef, orderBy('createdAt'));
  if (swings) {
    q = query(collectionRef, where(...swings));
  }
  const unsub = onSnapshot(
    q,
    (querySnapshot) => {
      const results = [];
      querySnapshot.forEach(
        (doc) =>
          doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      );
      documents.value = results;
      error.value = null;
    },
    (err) => {
      documents.value = null;
      error.value = err.message;
    }
  );
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });
  return { documents, error };
};
export default getCollection;
