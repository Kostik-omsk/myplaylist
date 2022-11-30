import { ref, watchEffect } from 'vue';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const getDocument = (myCollection, id) => {
  const document = ref(null);
  const error = ref(null);

  let documentRef = doc(db, myCollection, id);

  const unsub = onSnapshot(
    documentRef,
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = 'документ не найден';
      }
    },
    (err) => {
      document.value = null;
      error.value = err.message;
    }
  );
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });
  return { document, error };
};
export default getDocument;
