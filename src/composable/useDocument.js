import { ref } from 'vue';
import { db } from '../firebase/config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = doc(db, collection, id);

  const deletDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await deleteDoc(docRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  const myUpdateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    let docRef = doc(db, collection, id);
    try {
      const res = await updateDoc(docRef, updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, isPending, deletDoc, myUpdateDoc };
};
export default useDocument;
