import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const useCollection = (collections) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDocument = async (doc) => {
    error.value = null;
    isPending.value = true;
    try {
      const res = await addDoc(collection(db, collections), doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };
  return { addDocument, error, isPending };
};

export default useCollection;
